import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { io, type Socket } from 'socket.io-client'
import { Device } from 'mediasoup-client'
import type {
  Consumer,
  DtlsParameters,
  IceCandidate,
  IceParameters,
  Producer,
  RtpParameters,
  Transport,
} from 'mediasoup-client/types'
import { useAppSelector } from '../../app/hooks'
import { store } from '../../app/store'
import { useMeetingSocket } from '../meetingRoom/MeetingSocketProvider'
import { selectUserModeration } from '../participantControls/participantModerationSlice'
import {
  selectPrivateMeetingPartnerId,
  selectPrivateMeetingSync,
  PRIVATE_MEETING_CHANNEL,
} from '../privateMeeting/privateMeetingSlice'
import { parsePrivateMeetingSync, shouldConsumePeerMedia } from '../privateMeeting/privateMeetingTypes'
import { SCREEN_SHARE_SYNC_CHANNEL } from '../screenShare/screenShareSync'
import { selectScreenShareSync } from '../screenShare/selectScreenShareSync'
import {
  selectMeetingDisplayName,
  selectMeetingRoomId,
  selectMeetingUserId,
} from '../meetingSession/meetingSessionSlice'
import { selectIsMeetingLive, selectSfuSessionKey } from '../meeting/meetingLifecycleSlice'
import { selectSessionLeftForReview } from '../externalApi/externalModalsSlice'
import { liveMediaTrack } from '../preMeeting/mediaDeviceUtils'
import {
  selectLocalStream,
  selectVisibleParticipants,
} from '../videoConference/videoConferenceSlice'
import { MediaSignaling } from './MediaSignaling'
import { resolveMediaSocketBaseUrl, resolveMediaSocketOptions } from './resolveMediaSocketUrl'
import { createMediasoupDevice } from './createMediasoupDevice'
import { filterRecorderIceCandidates } from './filterRecorderIceCandidates'
import { resolveTurnIceServers, type TurnIceServer } from './turnIceServers'

export type MediaTrackSource = 'camera' | 'mic' | 'screen' | 'screen-audio'

type LocalProducers = {
  audio?: Producer
  video?: Producer
  screenVideo?: Producer
  screenAudio?: Producer
}

export type MediasoupMediaContextValue = {
  /** Remote camera/mic per Socket.IO peer id (SFU). */
  remoteStreams: Readonly<Record<string, MediaStream>>
  /** Bumped when a remote camera track mute/unmute/ended changes (for tile re-render). */
  remoteMediaRevisions: Readonly<Record<string, number>>
  /** True when the remote camera SFU producer is paused (cam off). */
  remoteVideoPaused: Readonly<Record<string, boolean>>
  /** Remote screen share (video + optional tab audio) per peer id. */
  remoteScreenStreams: Readonly<Record<string, MediaStream>>
  /** Peer currently presenting screen share (null = hide remote stage). */
  remoteScreenPresenterId: string | null
  localScreenStream: MediaStream | null
  isScreenSharing: boolean
  sfuStatus: 'idle' | 'connecting' | 'connected' | 'error'
  sfuError: string | null
  /** Swap camera/mic tracks on active producers without reconnecting the SFU session. */
  syncLocalMedia: (stream: MediaStream | null) => Promise<void>
  startScreenShare: () => Promise<void>
  stopScreenShare: () => void
}

const MediasoupMediaContext = createContext<MediasoupMediaContextValue | null>(null)

export function useMediasoupMedia(): MediasoupMediaContextValue {
  const ctx = useContext(MediasoupMediaContext)
  if (!ctx) {
    throw new Error('useMediasoupMedia must be used within MediasoupMediaProvider')
  }
  return ctx
}

const liveTrack = liveMediaTrack

/** Host disabling publish must not turn off the user's local camera preview. */
function preserveLocalCameraPreview(stream: MediaStream | null) {
  const vt = stream?.getVideoTracks().find((t) => t.kind === 'video')
  if (vt) vt.enabled = true
}

async function syncVideoProducerPublish(
  producers: LocalProducers,
  stream: MediaStream | null,
  hostCamPublishAllowed: boolean,
  pubVideo: boolean,
) {
  if (!producers.video) return
  const vt = pubVideo ? liveTrack(stream, 'video') : undefined
  if (!vt) {
    await producers.video.pause()
    return
  }
  await producers.video.replaceTrack({ track: vt })
  if (!hostCamPublishAllowed) {
    await producers.video.pause()
    preserveLocalCameraPreview(stream)
    return
  }
  if (vt.enabled) {
    await producers.video.resume()
  } else {
    await producers.video.pause()
  }
}

function isHostCamPublishAllowed(userId: string | undefined): boolean {
  if (!userId) return true
  return selectUserModeration(userId)(store.getState()).camAllowed
}

function isScreenSource(source: string): boolean {
  return source === 'screen' || source === 'screen-audio'
}

function mergeRemoteTrack(
  prev: Record<string, MediaStream>,
  producerPeerId: string,
  track: MediaStreamTrack,
): Record<string, MediaStream> {
  const existing = prev[producerPeerId]
  const next = { ...prev }
  if (existing) {
    for (const t of existing.getTracks()) {
      if (t.kind === track.kind && t.id !== track.id) {
        existing.removeTrack(t)
        t.stop()
      }
    }
    if (!existing.getTracks().some((t) => t.id === track.id)) {
      existing.addTrack(track)
    }
    next[producerPeerId] = existing
  } else {
    next[producerPeerId] = new MediaStream([track])
  }
  return next
}

export function MediasoupMediaProvider({
  children,
  consumeOnly = false,
}: {
  children: ReactNode
  consumeOnly?: boolean
}) {
  const { presenceJoined, emitRoomSync, socket } = useMeetingSocket()
  const screenShareSync = useAppSelector(selectScreenShareSync)
  const meetingLive = useAppSelector(selectIsMeetingLive)
  const sessionLeftForReview = useAppSelector(selectSessionLeftForReview)
  const sfuSessionKey = useAppSelector(selectSfuSessionKey)
  const localStream = useAppSelector(selectLocalStream)
  const roomId = useAppSelector(selectMeetingRoomId)
  const userId = useAppSelector(selectMeetingUserId)
  const displayName = useAppSelector(selectMeetingDisplayName)
  const participants = useAppSelector(selectVisibleParticipants)
  const selfModeration = useAppSelector(selectUserModeration(userId ?? ''))
  const privateMeetingSync = useAppSelector(selectPrivateMeetingSync)
  const privatePartnerId = useAppSelector(selectPrivateMeetingPartnerId)
  const privateMeetingActive = privateMeetingSync.active
  const privateMeetingParticipantsKey = privateMeetingSync.participants.join('|')
  const privateMeetingJoinedKey = privateMeetingSync.joined.join('|')

  const [remoteStreams, setRemoteStreams] = useState<Record<string, MediaStream>>({})
  const [remoteMediaRevisions, setRemoteMediaRevisions] = useState<Record<string, number>>({})
  const [remoteVideoPaused, setRemoteVideoPaused] = useState<Record<string, boolean>>({})
  const remoteTrackListenersRef = useRef(
    new Map<string, { track: MediaStreamTrack; cleanup: () => void }>(),
  )
  const [remoteScreenStreams, setRemoteScreenStreams] = useState<Record<string, MediaStream>>({})
  const [remoteScreenPresenterId, setRemoteScreenPresenterId] = useState<string | null>(null)
  const [localScreenStream, setLocalScreenStream] = useState<MediaStream | null>(null)
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [sfuStatus, setSfuStatus] = useState<MediasoupMediaContextValue['sfuStatus']>('idle')
  const [sfuError, setSfuError] = useState<string | null>(null)
  const [sfuReconnectNonce, setSfuReconnectNonce] = useState(0)

  const teardownRef = useRef<(() => void) | null>(null)
  const upsertRemoteRef = useRef<(peerId: string, track: MediaStreamTrack) => void>(() => undefined)
  const upsertRemoteScreenRef =
    useRef<(peerId: string, track: MediaStreamTrack, source: string) => void>(() => undefined)
  const clearRemoteScreenShareRef = useRef<(peerId: string) => void>(() => undefined)
  const bumpRemoteMediaRef = useRef<(peerId: string) => void>(() => undefined)
  const producersRef = useRef<LocalProducers>({})
  const sendTransportRef = useRef<Transport | null>(null)
  const screenStreamRef = useRef<MediaStream | null>(null)
  const stopScreenShareRef = useRef<() => void>(() => undefined)
  const applyPrivateMediaFilterRef = useRef<(() => Promise<void>) | null>(null)
  const privateMediaFilterRef = useRef({
    sync: privateMeetingSync,
    partnerId: privatePartnerId,
    userId: userId ?? null,
  })

  const broadcastScreenShare = useCallback(
    (active: boolean) => {
      if (!userId) return
      emitRoomSync(SCREEN_SHARE_SYNC_CHANNEL, {
        active,
        presenterId: active ? userId : null,
        presenterName: active ? displayName || undefined : undefined,
      })
    },
    [emitRoomSync, userId, displayName],
  )

  const syncLocalMedia = useCallback(async (stream: MediaStream | null) => {
    const producers = producersRef.current
    const sendTransport = sendTransportRef.current
    const mode = store.getState().preMeeting.lastMediaMode ?? 'both'
    const pubVideo = mode === 'both' || mode === 'webcam_only'
    const pubAudio = mode === 'both' || mode === 'mic_only'

    if (producers.video) {
      const hostCamAllowed = isHostCamPublishAllowed(store.getState().meetingSession.userId ?? undefined)
      await syncVideoProducerPublish(producers, stream, hostCamAllowed, pubVideo)
    } else if (pubVideo && sendTransport) {
      const vt = liveTrack(stream, 'video')
      if (vt) {
        producersRef.current.video = await sendTransport.produce({
          track: vt,
          appData: { source: 'camera' },
        })
      }
    }

    if (producers.audio) {
      const at = pubAudio ? liveTrack(stream, 'audio') : undefined
      if (at) {
        await producers.audio.replaceTrack({ track: at })
      } else {
        producers.audio.pause()
      }
    } else if (pubAudio && sendTransport) {
      const at = liveTrack(stream, 'audio')
      if (at) {
        producersRef.current.audio = await sendTransport.produce({
          track: at,
          appData: { source: 'mic' },
        })
      }
    }
  }, [])

  const applyHostMediaPolicy = useCallback(
    async (policy: { micAllowed?: boolean; camAllowed?: boolean }) => {
      const producers = producersRef.current
      const stream = store.getState().videoConference.localStream

      if (policy.micAllowed === false) {
        try {
          await producers.audio?.pause()
        } catch {
          /* ignore */
        }
      } else if (policy.micAllowed === true) {
        try {
          await producers.audio?.resume()
        } catch {
          /* ignore */
        }
      }

      if (policy.camAllowed === false) {
        const vt = liveTrack(stream, 'video')
        try {
          if (producers.video && vt) {
            await producers.video.replaceTrack({ track: vt })
            await producers.video.pause()
          } else {
            await producers.video?.pause()
          }
        } catch {
          /* ignore */
        }
        preserveLocalCameraPreview(stream)
      } else if (policy.camAllowed === true) {
        const vt = liveTrack(stream, 'video')
        try {
          if (producers.video && vt && vt.enabled) {
            await producers.video.replaceTrack({ track: vt })
            await producers.video.resume()
          }
        } catch {
          /* ignore */
        }
      }
    },
    [],
  )

  const stopScreenShare = useCallback(() => {
    broadcastScreenShare(false)
    const producers = producersRef.current
    try {
      producers.screenVideo?.close()
    } catch {
      /* ignore */
    }
    try {
      producers.screenAudio?.close()
    } catch {
      /* ignore */
    }
    delete producers.screenVideo
    delete producers.screenAudio
    screenStreamRef.current?.getTracks().forEach((t) => t.stop())
    screenStreamRef.current = null
    setLocalScreenStream(null)
    setIsScreenSharing(false)
    setRemoteScreenPresenterId(null)
  }, [broadcastScreenShare])

  stopScreenShareRef.current = stopScreenShare

  useEffect(() => {
    privateMediaFilterRef.current = {
      sync: privateMeetingSync,
      partnerId: privatePartnerId,
      userId: userId ?? null,
    }
    void applyPrivateMediaFilterRef.current?.()
  }, [privateMeetingActive, privateMeetingParticipantsKey, privateMeetingJoinedKey, privatePartnerId, privateMeetingSync, userId])

  useEffect(() => {
    if (!socket) return
    const onRoomSync = (payload: { channel: string; payload: unknown }) => {
      if (payload.channel !== PRIVATE_MEETING_CHANNEL) return
      privateMediaFilterRef.current = {
        sync: parsePrivateMeetingSync(payload.payload),
        partnerId: store.getState().privateMeeting.local.partnerId,
        userId: userId ?? null,
      }
      void applyPrivateMediaFilterRef.current?.()
    }
    socket.on('room_sync', onRoomSync)
    return () => {
      socket.off('room_sync', onRoomSync)
    }
  }, [socket, userId])

  useEffect(() => {
    if (sfuStatus !== 'connected') return
    void applyHostMediaPolicy({
      micAllowed: selfModeration.micAllowed,
      camAllowed: selfModeration.camAllowed,
    })
  }, [selfModeration.micAllowed, selfModeration.camAllowed, sfuStatus, applyHostMediaPolicy])

  useEffect(() => {
    if (!socket) return
    const onPolicy = (payload: { micAllowed?: boolean; camAllowed?: boolean }) => {
      void applyHostMediaPolicy(payload)
    }
    socket.on('participant_media_policy', onPolicy)
    return () => {
      socket.off('participant_media_policy', onPolicy)
    }
  }, [socket, applyHostMediaPolicy])

  const startScreenShare = useCallback(async () => {
    if (isScreenSharing) {
      stopScreenShare()
      return
    }
    const sendTransport = sendTransportRef.current
    if (!sendTransport || sfuStatus !== 'connected') {
      throw new Error('Connect to the meeting before sharing your screen')
    }
    const stream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
      audio: true,
    })
    const videoTrack = stream.getVideoTracks()[0]
    if (!videoTrack) {
      stream.getTracks().forEach((t) => t.stop())
      throw new Error('No screen video track')
    }
    screenStreamRef.current = stream
    videoTrack.onended = () => stopScreenShareRef.current()

    const producers = producersRef.current
    producers.screenVideo = await sendTransport.produce({
      track: videoTrack,
      appData: { source: 'screen' },
    })

    const audioTrack = stream.getAudioTracks()[0]
    if (audioTrack) {
      producers.screenAudio = await sendTransport.produce({
        track: audioTrack,
        appData: { source: 'screen-audio' },
      })
    }

    const previewTracks = [videoTrack, ...(audioTrack ? [audioTrack] : [])]
    setLocalScreenStream(new MediaStream(previewTracks))
    setIsScreenSharing(true)
    broadcastScreenShare(true)
  }, [isScreenSharing, sfuStatus, stopScreenShare, broadcastScreenShare])

  const bumpRemoteMedia = useCallback((peerId: string) => {
    setRemoteMediaRevisions((prev) => ({
      ...prev,
      [peerId]: (prev[peerId] ?? 0) + 1,
    }))
  }, [])

  const wireRemoteCameraTrack = useCallback(
    (peerId: string, track: MediaStreamTrack) => {
      if (track.kind !== 'video') return
      const key = `${peerId}:${track.id}`
      const existing = remoteTrackListenersRef.current.get(key)
      if (existing?.track === track) return
      existing?.cleanup()

      const onChange = () => {
        const paused = track.muted || !track.enabled
        setRemoteVideoPaused((prev) => {
          if (prev[peerId] === paused) return prev
          return { ...prev, [peerId]: paused }
        })
        bumpRemoteMedia(peerId)
      }
      onChange()
      track.addEventListener('mute', onChange)
      track.addEventListener('unmute', onChange)
      track.addEventListener('ended', onChange)
      remoteTrackListenersRef.current.set(key, {
        track,
        cleanup: () => {
          track.removeEventListener('mute', onChange)
          track.removeEventListener('unmute', onChange)
          track.removeEventListener('ended', onChange)
        },
      })
    },
    [bumpRemoteMedia],
  )

  const upsertRemote = useCallback(
    (producerPeerId: string, track: MediaStreamTrack) => {
      setRemoteStreams((prev) => mergeRemoteTrack(prev, producerPeerId, track))
      wireRemoteCameraTrack(producerPeerId, track)
    },
    [wireRemoteCameraTrack],
  )

  const clearRemoteScreenShare = useCallback((peerId: string) => {
    setRemoteScreenPresenterId((prev) => (prev === peerId ? null : prev))
    setRemoteScreenStreams((prev) => {
      const stream = prev[peerId]
      if (!stream) return prev
      const next = { ...prev }
      for (const t of stream.getTracks()) {
        t.stop()
      }
      delete next[peerId]
      return next
    })
  }, [])

  const upsertRemoteScreen = useCallback(
    (producerPeerId: string, track: MediaStreamTrack, source: string) => {
      if (source === 'screen') {
        setRemoteScreenPresenterId(producerPeerId)
      }
      setRemoteScreenStreams((prev) => mergeRemoteTrack(prev, producerPeerId, track))
    },
    [],
  )

  upsertRemoteRef.current = upsertRemote
  upsertRemoteScreenRef.current = upsertRemoteScreen
  clearRemoteScreenShareRef.current = clearRemoteScreenShare
  bumpRemoteMediaRef.current = bumpRemoteMedia

  useEffect(() => {
    if (!presenceJoined || !meetingLive || sessionLeftForReview) return
    if (sfuStatus === 'connected' || sfuStatus === 'connecting') return
    const timer = window.setTimeout(() => {
      setSfuReconnectNonce((n) => n + 1)
    }, 1500)
    return () => window.clearTimeout(timer)
  }, [presenceJoined, meetingLive, sessionLeftForReview, sfuStatus])

  useEffect(() => {
    if (screenShareSync?.active) return
    setRemoteScreenPresenterId(null)
    setRemoteScreenStreams((prev) => {
      if (Object.keys(prev).length === 0) return prev
      const next = { ...prev }
      for (const stream of Object.values(next)) {
        for (const t of stream.getTracks()) {
          t.stop()
        }
      }
      return {}
    })
  }, [screenShareSync?.active, screenShareSync?.presenterId])

  useEffect(() => {
    const ids = new Set(participants.map((p) => p.id))
    const prune = (prev: Record<string, MediaStream>) => {
      let changed = false
      const next = { ...prev }
      for (const id of Object.keys(next)) {
        if (!ids.has(id)) {
          for (const t of next[id].getTracks()) {
            t.stop()
          }
          delete next[id]
          changed = true
        }
      }
      return changed ? next : prev
    }
    setRemoteStreams(prune)
    setRemoteScreenStreams(prune)
    setRemoteMediaRevisions((prev) => {
      let changed = false
      const next = { ...prev }
      for (const id of Object.keys(next)) {
        if (!ids.has(id)) {
          delete next[id]
          changed = true
        }
      }
      return changed ? next : prev
    })
    setRemoteVideoPaused((prev) => {
      let changed = false
      const next = { ...prev }
      for (const id of Object.keys(next)) {
        if (!ids.has(id)) {
          delete next[id]
          changed = true
        }
      }
      return changed ? next : prev
    })
    for (const [key, entry] of remoteTrackListenersRef.current) {
      const peerId = key.split(':')[0]
      if (peerId && !ids.has(peerId)) {
        entry.cleanup()
        remoteTrackListenersRef.current.delete(key)
      }
    }
  }, [participants])

  useEffect(() => {
    if (sfuStatus !== 'connected') return
    void syncLocalMedia(localStream)
  }, [localStream, sfuStatus, syncLocalMedia])

  useEffect(() => {

    if (!presenceJoined || !meetingLive || sessionLeftForReview || !roomId || !userId) {
      return
    }

    // Always connect to SFU for remote media; publish when tracks are available inside run().
    let cancelled = false
    const consumers = new Map<string, Consumer>()
    const producers: LocalProducers = {}
    let sendTransport: Transport | null = null
    let recvTransport: Transport | null = null
    let sig: MediaSignaling | null = null
    let mediaSocket: Socket | null = null
    let unlistenSignalingPush: (() => void) | null = null
    let joinGeneration = 0
    const consumedProducerIds = new Set<string>()
    const producerMetaByProducerId = new Map<
      string,
      { peerId: string; source: string; kind: 'audio' | 'video' }
    >()
    let sfuDevice: Device | null = null

    const canConsumePeer = (peerId: string) => {
      const { sync, partnerId, userId: uid } = privateMediaFilterRef.current
      if (!uid) return true
      return shouldConsumePeerMedia(uid, peerId, sync, partnerId)
    }

    const dropRemoteScreenPeer = (peerId: string) => {
      clearRemoteScreenShareRef.current(peerId)
    }

    const teardownSession = (clearRemoteState = true) => {
      unlistenSignalingPush?.()
      unlistenSignalingPush = null
      for (const c of consumers.values()) {
        try {
          c.close()
        } catch {
          /* ignore */
        }
      }
      consumers.clear()
      consumedProducerIds.clear()
      try {
        producers.audio?.close()
      } catch {
        /* ignore */
      }
      try {
        producers.video?.close()
      } catch {
        /* ignore */
      }
      try {
        producers.screenVideo?.close()
      } catch {
        /* ignore */
      }
      try {
        producers.screenAudio?.close()
      } catch {
        /* ignore */
      }
      stopScreenShareRef.current()
      try {
        sendTransport?.close()
      } catch {
        /* ignore */
      }
      try {
        recvTransport?.close()
      } catch {
        /* ignore */
      }
      sendTransport = null
      recvTransport = null
      sfuDevice = null
      sendTransportRef.current = null
      producersRef.current = {}
      sig?.dispose()
      sig = null
      if (clearRemoteState) {
        setRemoteStreams({})
        setRemoteScreenStreams({})
        setRemoteScreenPresenterId(null)
        setRemoteMediaRevisions({})
        setRemoteVideoPaused({})
        for (const entry of remoteTrackListenersRef.current.values()) {
          entry.cleanup()
        }
        remoteTrackListenersRef.current.clear()
      }
    }

    const teardown = () => {
      cancelled = true
      applyPrivateMediaFilterRef.current = null
      teardownSession(true)
      try {
        mediaSocket?.removeAllListeners()
        mediaSocket?.disconnect()
      } catch {
        /* ignore */
      }
      mediaSocket = null
    }

    teardownRef.current?.()
    teardownRef.current = teardown

    const removeRemotePeerTracks = (producerPeerId: string, track?: MediaStreamTrack) => {
      setRemoteStreams((prev) => {
        const existing = prev[producerPeerId]
        if (!existing) return prev
        const next = { ...prev }
        if (track) {
          if (existing.getTracks().includes(track)) {
            existing.removeTrack(track)
            track.stop()
          }
          if (existing.getTracks().length === 0) {
            delete next[producerPeerId]
          }
        } else {
          for (const t of existing.getTracks()) {
            t.stop()
          }
          delete next[producerPeerId]
        }
        return next
      })
      setRemoteVideoPaused((prev) => {
        if (!(producerPeerId in prev)) return prev
        const next = { ...prev }
        delete next[producerPeerId]
        return next
      })
      bumpRemoteMediaRef.current(producerPeerId)
    }

    const releaseProducer = (
      producerId: string,
      producerPeerId: string,
      source: string,
      track?: MediaStreamTrack,
    ) => {
      for (const [consumerId, consumer] of consumers) {
        if (consumer.producerId !== producerId) continue
        try {
          consumer.close()
        } catch {
          /* ignore */
        }
        consumers.delete(consumerId)
      }
      consumedProducerIds.delete(producerId)
      producerMetaByProducerId.delete(producerId)

      if (!isScreenSource(source)) {
        removeRemotePeerTracks(producerPeerId, track)
        return
      }

      if (source === 'screen') {
        dropRemoteScreenPeer(producerPeerId)
        return
      }

      if (track) {
        setRemoteScreenStreams((prev) => {
          const existing = prev[producerPeerId]
          if (!existing) return prev
          const next = { ...prev }
          if (existing.getTracks().includes(track)) {
            existing.removeTrack(track)
            track.stop()
          }
          return next
        })
      }
    }

    async function consumeProducer(
      device: Device,
      recvT: Transport,
      signaling: MediaSignaling,
      producerId: string,
      sourceHint?: string,
      producerPeerIdHint?: string,
    ): Promise<void> {
      if (cancelled) return
      if (consumedProducerIds.has(producerId)) return

      const existingMeta = producerMetaByProducerId.get(producerId)
      const peerForFilter = producerPeerIdHint ?? existingMeta?.peerId
      if (peerForFilter && !canConsumePeer(peerForFilter)) {
        return
      }

      let data: {
        id: string
        producerPeerId: string
        kind: 'audio' | 'video'
        rtpParameters: unknown
        producerId: string
        source?: string
        producerPaused?: boolean
      }
      try {
        data = (await signaling.request('consume', {
        transportId: recvT.id,
        producerId,
          rtpCapabilities: device.rtpCapabilities,
        })) as typeof data
      } catch {
        return
      }
      if (cancelled) return
      const consumer = await recvT.consume({
        id: data.id,
        producerId: data.producerId,
        kind: data.kind,
        rtpParameters: data.rtpParameters as RtpParameters,
      })
      consumers.set(consumer.id, consumer)
      await signaling.request('resumeConsumer', { consumerId: consumer.id })
      if (cancelled) return
      consumedProducerIds.add(producerId)
      const source =
        data.source ?? sourceHint ?? (data.kind === 'audio' ? 'mic' : 'camera')
      producerMetaByProducerId.set(producerId, {
        peerId: data.producerPeerId,
        source,
        kind: data.kind,
      })
      if (isScreenSource(source)) {
        upsertRemoteScreenRef.current(data.producerPeerId, consumer.track, source)
        if (source === 'screen') {
          consumer.track.addEventListener('ended', () => {
            dropRemoteScreenPeer(data.producerPeerId)
          })
        }
      } else {
        const peerId = data.producerPeerId
        upsertRemoteRef.current(peerId, consumer.track)
        if (consumer.kind === 'video' && source === 'camera' && data.producerPaused) {
          setRemoteVideoPaused((prev) => ({ ...prev, [peerId]: true }))
          bumpRemoteMediaRef.current(peerId)
        }
      }

      const release = () => {
        releaseProducer(producerId, data.producerPeerId, source, consumer.track)
      }
      consumer.on('trackended', release)
    }

    async function applyPrivateMediaFilter(): Promise<void> {
      if (cancelled || !recvTransport || !sig || !sfuDevice) return
      const signaling = sig
      const recvT = recvTransport
      const device = sfuDevice

      for (const consumer of consumers.values()) {
        const meta = producerMetaByProducerId.get(consumer.producerId)
        if (!meta || canConsumePeer(meta.peerId)) continue
        releaseProducer(consumer.producerId, meta.peerId, meta.source, consumer.track)
      }

      setRemoteStreams((prev) => {
        let changed = false
        const next = { ...prev }
        for (const peerId of Object.keys(next)) {
          if (canConsumePeer(peerId)) continue
          for (const t of next[peerId].getTracks()) {
            t.stop()
          }
          delete next[peerId]
          changed = true
        }
        return changed ? next : prev
      })
      setRemoteMediaRevisions((prev) => {
        let changed = false
        const next = { ...prev }
        for (const peerId of Object.keys(prev)) {
          if (canConsumePeer(peerId)) continue
          next[peerId] = (next[peerId] ?? 0) + 1
          changed = true
        }
        return changed ? next : prev
      })
      setRemoteVideoPaused((prev) => {
        let changed = false
        const next = { ...prev }
        for (const peerId of Object.keys(prev)) {
          if (canConsumePeer(peerId)) continue
          delete next[peerId]
          changed = true
        }
        return changed ? next : prev
      })

      try {
        const list = (await signaling.request('listProducers')) as {
          producers: { peerId: string; producerId: string; kind: string; source?: string }[]
        }
        for (const row of list.producers ?? []) {
          if (cancelled) return
          if (row.peerId === userId) continue
          if (!canConsumePeer(row.peerId)) continue
          if (isScreenSource(row.source ?? '') && row.kind === 'audio') {
            const hasScreenVideo = (list.producers ?? []).some(
              (p) => p.peerId === row.peerId && p.source === 'screen',
            )
            if (!hasScreenVideo) continue
          }
          await consumeProducer(device, recvT, signaling, row.producerId, row.source, row.peerId)
        }
      } catch {
        /* ignore filter refresh errors */
      }
    }

    applyPrivateMediaFilterRef.current = applyPrivateMediaFilter

    async function joinSfu(): Promise<void> {
      if (cancelled || !mediaSocket?.connected) return
      const generation = ++joinGeneration
      teardownSession(true)
      setSfuStatus('connecting')
      setSfuError(null)

      try {
        await MediaSignaling.waitReady(mediaSocket)
        if (cancelled || generation !== joinGeneration || !mediaSocket.connected) return

        sig = new MediaSignaling(mediaSocket)
        const signaling = sig

        const caps = (await signaling.request('getRouterRtpCapabilities')) as Parameters<
          Device['load']
        >[0]['routerRtpCapabilities']
        if (cancelled || generation !== joinGeneration) return

        const device = createMediasoupDevice()
        await device.load({ routerRtpCapabilities: caps })
        if (cancelled || generation !== joinGeneration) return
        sfuDevice = device

        const iceServerPayload = (await signaling.request('getIceServers')) as {
          iceServers?: unknown
        }
        const iceServers: TurnIceServer[] = resolveTurnIceServers(iceServerPayload)
        const transportIceOptions =
          iceServers.length > 0 ? { iceServers: iceServers as RTCIceServer[] } : {}

        const sendParams = consumeOnly
          ? null
          : ((await signaling.request('createWebRtcTransport', {
              producing: true,
              consuming: false,
            })) as {
              id: string
              iceParameters: unknown
              iceCandidates: unknown
              dtlsParameters: unknown
            })

        if (sendParams) {
          sendTransport = device.createSendTransport({
            id: sendParams.id,
            iceParameters: sendParams.iceParameters as IceParameters,
            iceCandidates: sendParams.iceCandidates as IceCandidate[],
            dtlsParameters: sendParams.dtlsParameters as DtlsParameters,
            ...transportIceOptions,
          })
          sendTransportRef.current = sendTransport

          sendTransport.on(
            'connect',
            (
              { dtlsParameters }: { dtlsParameters: DtlsParameters },
              callback: () => void,
              errback: (e: Error) => void,
            ) => {
              void signaling
                .request('connectTransport', { transportId: sendTransport!.id, dtlsParameters })
                .then(() => callback())
                .catch(errback)
            },
          )

          sendTransport.on(
            'produce',
            (
              {
                kind,
                rtpParameters,
                appData,
              }: { kind: 'audio' | 'video'; rtpParameters: RtpParameters; appData?: Record<string, unknown> },
              callback: (o: { id: string }) => void,
              errback: (e: Error) => void,
            ) => {
              void signaling
                .request('produce', {
                  transportId: sendTransport!.id,
                  kind,
                  rtpParameters,
                  appData,
                })
                .then((created) => callback({ id: (created as { id: string }).id }))
                .catch(errback)
            },
          )
        }

        const recvParams = (await signaling.request('createWebRtcTransport', {
          producing: false,
          consuming: true,
        })) as {
          id: string
          iceParameters: unknown
          iceCandidates: unknown
          dtlsParameters: unknown
        }

        recvTransport = device.createRecvTransport({
          id: recvParams.id,
          iceParameters: recvParams.iceParameters as IceParameters,
          iceCandidates: filterRecorderIceCandidates(recvParams.iceCandidates as IceCandidate[]),
          dtlsParameters: recvParams.dtlsParameters as DtlsParameters,
          ...transportIceOptions,
        })

        const recvT = recvTransport

        recvT.on(
          'connect',
          (
            { dtlsParameters }: { dtlsParameters: DtlsParameters },
            callback: () => void,
            errback: (e: Error) => void,
          ) => {
            void signaling
              .request('connectTransport', { transportId: recvT.id, dtlsParameters })
              .then(() => callback())
              .catch(errback)
          },
        )

        const stream = store.getState().videoConference.localStream
        const publishMode = store.getState().preMeeting.lastMediaMode ?? 'both'

        const pubVideo = publishMode === 'both' || publishMode === 'webcam_only'
        const pubAudio = publishMode === 'both' || publishMode === 'mic_only'

        if (sendTransport && pubVideo) {
          const vt = liveTrack(stream, 'video')
          if (vt) {
            const p = await sendTransport.produce({ track: vt, appData: { source: 'camera' } })
            producers.video = p
          }
        }
        if (sendTransport && pubAudio) {
          const at = liveTrack(stream, 'audio')
          if (at) {
            const p = await sendTransport.produce({ track: at, appData: { source: 'mic' } })
            producers.audio = p
          }
        }
        producersRef.current = producers

        const mod = selectUserModeration(userId ?? '')(store.getState())
        if (sendTransport && !mod.micAllowed) {
          try {
            await producers.audio?.pause()
          } catch {
            /* ignore */
          }
        }
        if (sendTransport && !mod.camAllowed) {
          try {
            await producers.video?.pause()
          } catch {
            /* ignore */
          }
          preserveLocalCameraPreview(stream)
        }

        const list = (await signaling.request('listProducers')) as {
          producers: { peerId: string; producerId: string; kind: string; source?: string }[]
        }
        for (const row of list.producers ?? []) {
          if (cancelled || generation !== joinGeneration) return
          if (row.peerId === userId) continue
          if (!canConsumePeer(row.peerId)) continue
          if (isScreenSource(row.source ?? '') && row.kind === 'audio') {
            const hasScreenVideo = (list.producers ?? []).some(
              (p) => p.peerId === row.peerId && p.source === 'screen',
            )
            if (!hasScreenVideo) continue
          }
          await consumeProducer(device, recvT, signaling, row.producerId, row.source, row.peerId)
        }

        unlistenSignalingPush = signaling.onPush((msg) => {
          if (msg.t === 'newProducer') {
            const d = msg.data as { peerId?: string; producerId?: string; source?: string }
            if (!d.producerId || d.peerId === userId) return
            if (d.peerId && !canConsumePeer(d.peerId)) return
            void consumeProducer(device, recvT, signaling, d.producerId, d.source, d.peerId)
            return
          }
          if (msg.t === 'producerClosed') {
            const d = msg.data as {
              peerId?: string
              producerId?: string
              source?: string
            }
            if (!d.producerId || !d.peerId) return
            releaseProducer(d.producerId, d.peerId, d.source ?? 'camera')
            return
          }
          if (msg.t === 'producerPaused' || msg.t === 'producerResumed') {
            const d = msg.data as { peerId?: string; source?: string; paused?: boolean }
            if (!d.peerId || d.source !== 'camera') return
            setRemoteVideoPaused((prev) => {
              const paused = msg.t === 'producerPaused'
              if (prev[d.peerId!] === paused) return prev
              return { ...prev, [d.peerId!]: paused }
            })
            bumpRemoteMediaRef.current(d.peerId)
          }
        })

        if (!cancelled && generation === joinGeneration) {
          setSfuStatus('connected')
          applyPrivateMediaFilterRef.current = applyPrivateMediaFilter
          void applyPrivateMediaFilter()
        }
      } catch (e) {
        if (!cancelled && generation === joinGeneration) {
          setSfuStatus('error')
          setSfuError(e instanceof Error ? e.message : String(e))
        }
      }
    }

    async function start(): Promise<void> {
      try {
        if (cancelled) return

        const session = store.getState().meetingSession
        const mediaCredentials = {
          roomId: roomId!,
          peerId: userId!,
          name: session.displayName || undefined,
        }

        const mediaOrigin = resolveMediaSocketBaseUrl()
        mediaSocket = mediaOrigin
          ? io(mediaOrigin, resolveMediaSocketOptions(mediaCredentials))
          : io(resolveMediaSocketOptions(mediaCredentials))

        mediaSocket.on('connect', () => {
          if (cancelled) return
          void joinSfu()
        })

        mediaSocket.on('disconnect', (reason) => {
          if (cancelled) return
          teardownSession(true)
          if (reason !== 'io client disconnect') {
            setSfuStatus('connecting')
          }
        })

        mediaSocket.on('connect_error', (err) => {
          if (cancelled) return
          setSfuStatus('error')
          setSfuError(err.message)
        })
      } catch (e) {
        if (!cancelled) {
          setSfuStatus('error')
          setSfuError(e instanceof Error ? e.message : String(e))
        }
      }
    }

    void start()

    return () => {
      teardownRef.current?.()
      teardownRef.current = null
      setSfuStatus('idle')
      setSfuError(null)
    }
  }, [
    presenceJoined,
    meetingLive,
    sessionLeftForReview,
    sfuSessionKey,
    sfuReconnectNonce,
    roomId,
    userId,
    consumeOnly,
  ])

  const value = useMemo<MediasoupMediaContextValue>(
    () => ({
      remoteStreams,
      remoteMediaRevisions,
      remoteVideoPaused,
      remoteScreenStreams,
      remoteScreenPresenterId,
      localScreenStream,
      isScreenSharing,
      sfuStatus,
      sfuError,
      syncLocalMedia,
      startScreenShare,
      stopScreenShare,
    }),
    [
      remoteStreams,
      remoteMediaRevisions,
      remoteVideoPaused,
      remoteScreenStreams,
      remoteScreenPresenterId,
      localScreenStream,
      isScreenSharing,
      sfuStatus,
      sfuError,
      syncLocalMedia,
      startScreenShare,
      stopScreenShare,
    ],
  )

  return <MediasoupMediaContext.Provider value={value}>{children}</MediasoupMediaContext.Provider>
}
