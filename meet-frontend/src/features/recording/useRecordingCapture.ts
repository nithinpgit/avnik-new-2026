import { useCallback, useEffect, useRef, type RefObject } from 'react'
import { useAppSelector } from '../../app/hooks'
import { useMediasoupMedia } from '../mediasoup/MediasoupMediaProvider'
import { selectSessionRecordingId } from '../meetingSession/meetingSessionSlice'
import {
  isAutomatedRecorder,
  resolveRecorderApiBase,
  selectIsRecorderView,
  setRecordingStatus,
} from './recordingRuntime'
import {
  buildCompositeStream,
  RECORDING_CHUNK_MS,
  waitForPaintableRemoteVideo,
  waitForRemoteVideo,
} from './recordingCompositor'

const MIN_CHUNK_BYTES = 128

function pickMimeType(stream: MediaStream): string {
  const hasAudio = stream.getAudioTracks().length > 0
  const candidates = hasAudio
    ? ['video/webm;codecs=vp8,opus', 'video/webm;codecs=vp9,opus', 'video/webm']
    : ['video/webm;codecs=vp8', 'video/webm;codecs=vp9', 'video/webm']
  for (const type of candidates) {
    if (typeof MediaRecorder !== 'undefined' && MediaRecorder.isTypeSupported(type)) {
      return type
    }
  }
  return 'video/webm'
}

async function uploadChunkHttp(recordingId: string, sequence: number, blob: Blob): Promise<void> {
  const base = resolveRecorderApiBase()
  const url = `${base}/api/recordings/${encodeURIComponent(recordingId)}/chunks/raw?sequence=${sequence}`
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/octet-stream' },
    body: blob,
  })
  if (!res.ok) {
    throw new Error(`Chunk upload failed (${res.status})`)
  }
}

async function tryTabCapture(timeoutMs = 4000): Promise<MediaStream | null> {
  if (isAutomatedRecorder() || navigator.webdriver) {
    return null
  }
  if (!navigator.mediaDevices?.getDisplayMedia) {
    return null
  }
  try {
    const stream = await Promise.race([
      navigator.mediaDevices.getDisplayMedia({
        video: { displaySurface: 'browser' } as MediaTrackConstraints,
        audio: true,
        preferCurrentTab: true,
      } as DisplayMediaStreamOptions),
      new Promise<null>((resolve) => window.setTimeout(() => resolve(null), timeoutMs)),
    ])
    return stream instanceof MediaStream ? stream : null
  } catch {
    return null
  }
}

export function useRecordingCapture(rootRef: RefObject<HTMLElement | null>, ready: boolean) {
  const recordingId = useAppSelector(selectSessionRecordingId)
  const { remoteStreams } = useMediasoupMedia()
  const remoteStreamsRef = useRef(remoteStreams)
  remoteStreamsRef.current = remoteStreams

  const recorderRef = useRef<MediaRecorder | null>(null)
  const sequenceRef = useRef(0)
  const streamStopRef = useRef<(() => void) | null>(null)
  const startedRef = useRef(false)
  const pendingUploadsRef = useRef<Set<Promise<void>>>(new Set())

  const stopCapture = useCallback(async () => {
    const recorder = recorderRef.current
    if (recorder && recorder.state !== 'inactive') {
      await new Promise<void>((resolve) => {
        recorder.addEventListener('stop', () => resolve(), { once: true })
        try {
          recorder.stop()
        } catch {
          resolve()
        }
      })
    }
    recorderRef.current = null
    streamStopRef.current?.()
    streamStopRef.current = null
    await Promise.allSettled([...pendingUploadsRef.current])
    pendingUploadsRef.current.clear()
    startedRef.current = false
    setRecordingStatus('stopped')
  }, [])

  useEffect(() => {
    const prev = window.__MEET_STOP_RECORDING__
    window.__MEET_STOP_RECORDING__ = async () => {
      await stopCapture()
      await prev?.()
    }
    return () => {
      window.__MEET_STOP_RECORDING__ = prev
    }
  }, [stopCapture])

  useEffect(() => {
    return () => {
      void stopCapture()
    }
  }, [recordingId, stopCapture])

  useEffect(() => {
    if (!ready || !recordingId || startedRef.current) return
    if (!isAutomatedRecorder() && !selectIsRecorderView()) return

    const root = rootRef.current
    if (!root) return

    let cancelled = false

    const start = async () => {
      try {
        setRecordingStatus('initializing')

        const hasRemote = await waitForRemoteVideo(() => remoteStreamsRef.current, 45_000)
        if (cancelled) return
        if (!hasRemote) {
          console.warn('[recording] no remote video tracks yet — starting anyway')
        } else {
          console.info('[recording] remote video tracks ready')
        }

        const tabStream = await tryTabCapture()
        let stream: MediaStream
        let stopStream: () => void

        if (tabStream) {
          console.info('[recording] using tab capture (getDisplayMedia)')
          stream = tabStream
          stopStream = () => tabStream.getTracks().forEach((t) => t.stop())
        } else {
          console.info('[recording] using canvas compositor + VideoFrame pumps')
          const compositor = buildCompositeStream(root, () => remoteStreamsRef.current)
          stream = compositor.stream
          stopStream = compositor.stop

          const painted = await waitForPaintableRemoteVideo(60_000)
          if (cancelled) {
            stopStream()
            return
          }
          if (painted) {
            console.info('[recording] participant video frames painting')
          } else {
            console.warn('[recording] no decoded video frames yet — recording anyway')
          }
        }

        if (cancelled) {
          stopStream()
          return
        }

        if (stream.getVideoTracks().length === 0) {
          throw new Error('No video track available for recording')
        }

        streamStopRef.current = stopStream
        const mimeType = pickMimeType(stream)
        const recorder = new MediaRecorder(stream, {
          mimeType,
          videoBitsPerSecond: 950_000,
          ...(stream.getAudioTracks().length > 0 ? { audioBitsPerSecond: 128_000 } : {}),
        })
        recorderRef.current = recorder

        recorder.ondataavailable = (event) => {
          if (!event.data.size || event.data.size < MIN_CHUNK_BYTES) return
          const seq = sequenceRef.current
          sequenceRef.current += 1
          console.info('[recording] chunk', seq, event.data.size)
          const upload = uploadChunkHttp(recordingId, seq, event.data).catch((err) => {
            console.error('[recording] chunk upload failed', err)
            void window.__meetRecorderSignalError?.(String(err))
          })
          pendingUploadsRef.current.add(upload)
          void upload.finally(() => {
            pendingUploadsRef.current.delete(upload)
          })
        }

        recorder.onerror = () => {
          void window.__meetRecorderSignalError?.('MediaRecorder error')
        }

        recorder.start(RECORDING_CHUNK_MS)
        startedRef.current = true
        setRecordingStatus('recording')
        console.info('[recording] MediaRecorder started', mimeType, `${RECORDING_CHUNK_MS}ms timeslice`)
        await window.__meetRecorderSignalReady?.()
      } catch (err) {
        console.error('[recording] start failed', err)
        setRecordingStatus('failed')
        await window.__meetRecorderSignalError?.(String(err))
      }
    }

    const timer = window.setTimeout(() => {
      void start()
    }, 1500)

    return () => {
      cancelled = true
      window.clearTimeout(timer)
    }
  }, [ready, rootRef, recordingId])

  return null
}
