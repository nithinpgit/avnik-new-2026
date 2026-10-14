import { isAutomatedRecorder, selectIsRecorderView } from './recordingRuntime'
import { isRecorderPeer } from './recorderPeer'

export const RECORDING_CHUNK_MS = 5000
export const COMPOSITOR_FPS = 15
export const HEADLESS_PAINT_MS = Math.ceil(1000 / COMPOSITOR_FPS)

type AudioMixer = {
  stream: MediaStream
  addTrack: (track: MediaStreamTrack) => void
  resume: () => Promise<void>
  close: () => void
}

/** VKYC-style audio bus with silent oscillator keep-alive. */
function createAudioMixer(): AudioMixer {
  const ctx = new AudioContext()
  const destination = ctx.createMediaStreamDestination()
  const connected = new Set<MediaStreamTrack>()

  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  gain.gain.setValueAtTime(0.000_1, ctx.currentTime)
  osc.frequency.setValueAtTime(10, ctx.currentTime)
  osc.connect(gain)
  gain.connect(destination)
  osc.start()

  return {
    stream: destination.stream,
    addTrack(track: MediaStreamTrack) {
      if (connected.has(track) || track.readyState === 'ended') return
      connected.add(track)
      const source = ctx.createMediaStreamSource(new MediaStream([track]))
      source.connect(destination)
    },
    resume: () => ctx.resume(),
    close: () => {
      try {
        osc.stop()
      } catch {
        /* ignore */
      }
      void ctx.close()
    },
  }
}

function isPaintableVideoTrack(track: MediaStreamTrack): boolean {
  return track.kind === 'video' && track.readyState === 'live' && track.enabled
}

type VideoSink = {
  video: HTMLVideoElement
  stop: () => void
}

/** Hidden &lt;video&gt; sink — triggers WebRTC decode in headless Chrome (TrackProcessor alone often gets no frames). */
function createVideoSink(track: MediaStreamTrack): VideoSink {
  const video = document.createElement('video')
  video.muted = true
  video.playsInline = true
  video.autoplay = true
  video.setAttribute('playsinline', 'true')
  video.setAttribute('webkit-playsinline', 'true')
  video.width = 640
  video.height = 480
  video.style.cssText =
    'position:fixed;left:0;top:0;width:640px;height:480px;opacity:0;pointer-events:none;z-index:-1'
  document.documentElement.appendChild(video)
  video.srcObject = new MediaStream([track])
  void video.play().catch(() => undefined)

  let playRaf = 0
  const keepPlaying = () => {
    if (track.readyState === 'ended') return
    if (video.paused) void video.play().catch(() => undefined)
    playRaf = requestAnimationFrame(keepPlaying)
  }
  playRaf = requestAnimationFrame(keepPlaying)

  let rvfcHandle = 0
  const scheduleRvfc = () => {
    if (track.readyState === 'ended') return
    if ('requestVideoFrameCallback' in video) {
      rvfcHandle = video.requestVideoFrameCallback(() => scheduleRvfc())
    }
  }
  scheduleRvfc()

  return {
    video,
    stop: () => {
      if (playRaf) cancelAnimationFrame(playRaf)
      if (rvfcHandle && 'cancelVideoFrameCallback' in video) {
        video.cancelVideoFrameCallback(rvfcHandle)
      }
      video.srcObject = null
      video.remove()
    },
  }
}

function paintRemoteSidebar(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  getRemoteStreams: () => Readonly<Record<string, MediaStream>>,
  latestFrames: Map<string, VideoFrame>,
  videoSinks: Map<string, VideoSink>,
): number {
  const entries = Object.entries(getRemoteStreams()).filter(([, stream]) =>
    stream.getVideoTracks().some(isPaintableVideoTrack),
  )
  if (entries.length === 0) return 0

  const sidebarW = Math.min(280, Math.round(width * 0.22))
  const pad = 8
  const tileH = Math.min(200, (height - pad * (entries.length + 1)) / entries.length)
  let painted = 0
  const paintedTrackIds = new Set<string>()

  entries.forEach(([, stream], index) => {
    const vt = stream.getVideoTracks().find(isPaintableVideoTrack)
    if (!vt || paintedTrackIds.has(vt.id)) return

    const x = width - sidebarW - pad
    const y = pad + index * (tileH + pad)
    const sink = videoSinks.get(vt.id)
    const frame = latestFrames.get(vt.id)

    if (sink && sink.video.readyState >= 2 && sink.video.videoWidth > 0) {
      drawContain(
        ctx,
        sink.video,
        x,
        y,
        sidebarW,
        tileH,
        sink.video.videoWidth,
        sink.video.videoHeight,
      )
      painted += 1
      paintedTrackIds.add(vt.id)
      return
    }
    if (frame && frame.displayWidth > 0) {
      drawContain(ctx, frame, x, y, sidebarW, tileH, frame.displayWidth, frame.displayHeight)
      painted += 1
      paintedTrackIds.add(vt.id)
    }
  })

  return painted
}

function drawContain(
  ctx: CanvasRenderingContext2D,
  source: CanvasImageSource,
  dx: number,
  dy: number,
  dw: number,
  dh: number,
  sourceWidth: number,
  sourceHeight: number,
) {
  const scale = Math.min(dw / sourceWidth, dh / sourceHeight)
  const w = sourceWidth * scale
  const h = sourceHeight * scale
  const x = dx + (dw - w) / 2
  const y = dy + (dh - h) / 2
  ctx.drawImage(source, x, y, w, h)
}

type CanvasBox = { relX: number; relY: number; relW: number; relH: number }

function elementBoxInCanvas(
  el: Element,
  rootRect: DOMRect,
  width: number,
  height: number,
): CanvasBox | null {
  const box = el.getBoundingClientRect()
  if (box.width < 2 || box.height < 2 || rootRect.width < 1 || rootRect.height < 1) return null
  return {
    relX: ((box.left - rootRect.left) / rootRect.width) * width,
    relY: ((box.top - rootRect.top) / rootRect.height) * height,
    relW: (box.width / rootRect.width) * width,
    relH: (box.height / rootRect.height) * height,
  }
}

function paintImageElement(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  rootRect: DOMRect,
  width: number,
  height: number,
): boolean {
  if (!img.complete || img.naturalWidth < 1) return false
  const box = elementBoxInCanvas(img, rootRect, width, height)
  if (!box) return false
  drawContain(ctx, img, box.relX, box.relY, box.relW, box.relH, img.naturalWidth, img.naturalHeight)
  return true
}

function ensureDomVideoSink(
  video: HTMLVideoElement,
  domVideoSinks: Map<string, VideoSink>,
): VideoSink | undefined {
  const srcObject = video.srcObject
  if (!(srcObject instanceof MediaStream)) return undefined
  const track = srcObject.getVideoTracks().find(isPaintableVideoTrack)
  if (!track) return undefined
  if (!domVideoSinks.has(track.id)) {
    domVideoSinks.set(track.id, createVideoSink(track))
  }
  return domVideoSinks.get(track.id)
}

function paintDomVideoElement(
  ctx: CanvasRenderingContext2D,
  video: HTMLVideoElement,
  rootRect: DOMRect,
  width: number,
  height: number,
  domVideoSinks: Map<string, VideoSink>,
): boolean {
  const box = elementBoxInCanvas(video, rootRect, width, height)
  if (!box) return false

  if (video.readyState >= 2 && video.videoWidth > 0) {
    if (video.paused) void video.play().catch(() => undefined)
    drawContain(
      ctx,
      video,
      box.relX,
      box.relY,
      box.relW,
      box.relH,
      video.videoWidth,
      video.videoHeight,
    )
    return true
  }

  const sink = ensureDomVideoSink(video, domVideoSinks)
  if (sink && sink.video.readyState >= 2 && sink.video.videoWidth > 0) {
    drawContain(
      ctx,
      sink.video,
      box.relX,
      box.relY,
      box.relW,
      box.relH,
      sink.video.videoWidth,
      sink.video.videoHeight,
    )
    return true
  }

  return false
}

/** MP4/YouTube video and screen share — painted above whiteboard. */
function paintStageOverlays(
  ctx: CanvasRenderingContext2D,
  root: HTMLElement,
  rootRect: DOMRect,
  width: number,
  height: number,
  domVideoSinks: Map<string, VideoSink>,
): number {
  let painted = 0

  for (const stage of root.querySelectorAll('.meeting-content-stage')) {
    const isVideoShare = stage.classList.contains('video-share-stage')
    const isScreenShare = stage.querySelector('.screen-share-stage') !== null
    if (!isVideoShare && !isScreenShare) continue
    const box = elementBoxInCanvas(stage, rootRect, width, height)
    if (box) {
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(box.relX, box.relY, box.relW, box.relH)
      painted += 1
    }
  }

  for (const img of root.querySelectorAll('.video-share-stage__youtube-poster')) {
    if (img instanceof HTMLImageElement && paintImageElement(ctx, img, rootRect, width, height)) {
      painted += 1
    }
  }

  for (const video of root.querySelectorAll(
    '.video-share-stage__media, .screen-share-stage__video',
  )) {
    if (
      video instanceof HTMLVideoElement &&
      paintDomVideoElement(ctx, video, rootRect, width, height, domVideoSinks)
    ) {
      painted += 1
    }
  }

  return painted
}

type FramePump = {
  abort: AbortController
  promise: Promise<void>
}

function pumpVideoFrames(
  track: MediaStreamTrack,
  onFrame: (frame: VideoFrame) => void,
  signal: AbortSignal,
): Promise<void> {
  if (!('MediaStreamTrackProcessor' in window)) {
    return Promise.resolve()
  }
  const Processor = (window as unknown as { MediaStreamTrackProcessor: new (init: { track: MediaStreamTrack }) => { readable: ReadableStream<VideoFrame> } }).MediaStreamTrackProcessor
  const processor = new Processor({ track })
  const reader = processor.readable.getReader()

  return (async () => {
    try {
      while (!signal.aborted) {
        const { done, value: frame } = await reader.read()
        if (done || !frame) break
        if (!signal.aborted) {
          onFrame(frame)
        }
        frame.close()
      }
    } catch {
      /* track ended */
    } finally {
      try {
        reader.releaseLock()
      } catch {
        /* ignore */
      }
    }
  })()
}

export type CompositorHandle = {
  stream: MediaStream
  stop: () => void
}

/**
 * Paints participant VideoFrames (headless-safe) + whiteboard canvas.
 * Headless Chrome does not decode WebRTC into &lt;video&gt; pixels — read tracks directly.
 */
export function buildCompositeStream(
  root: HTMLElement,
  getRemoteStreams: () => Readonly<Record<string, MediaStream>>,
): CompositorHandle {
  const rect = root.getBoundingClientRect()
  const width = Math.max(1280, Math.round(rect.width || 1280))
  const height = Math.max(720, Math.round(rect.height || 720))

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    throw new Error('Canvas 2D unavailable')
  }

  const audioMixer = createAudioMixer()
  void audioMixer.resume()

  const latestFrames = new Map<string, VideoFrame>()
  const framePumps = new Map<string, FramePump>()
  const videoSinks = new Map<string, VideoSink>()
  const domVideoSinks = new Map<string, VideoSink>()
  const abortAll = new AbortController()

  const ensureVideoSink = (track: MediaStreamTrack) => {
    if (videoSinks.has(track.id) || track.readyState === 'ended') return
    videoSinks.set(track.id, createVideoSink(track))
  }

  const ensureFramePump = (track: MediaStreamTrack) => {
    if (framePumps.has(track.id) || track.readyState === 'ended') return
    const ctrl = new AbortController()
    const promise = pumpVideoFrames(
      track,
      (frame) => {
        const prev = latestFrames.get(track.id)
        if (prev) prev.close()
        latestFrames.set(track.id, frame.clone())
      },
      ctrl.signal,
    )
    framePumps.set(track.id, { abort: ctrl, promise })
  }

  const syncTracks = () => {
    for (const stream of Object.values(getRemoteStreams())) {
      for (const track of stream.getAudioTracks()) {
        audioMixer.addTrack(track)
      }
      for (const track of stream.getVideoTracks()) {
        if (isPaintableVideoTrack(track)) {
          ensureVideoSink(track)
          ensureFramePump(track)
        }
      }
    }
  }

  const paint = () => {
    syncTracks()

    ctx.fillStyle = '#0f172a'
    ctx.fillRect(0, 0, width, height)

    const rootRect = root.getBoundingClientRect()
    if (rootRect.width < 1 || rootRect.height < 1) return

    let paintedStage = 0
    let paintedRemote = 0

    for (const layer of root.querySelectorAll('.presentation-layer--visible')) {
      const box = elementBoxInCanvas(layer, rootRect, width, height)
      if (box) {
        ctx.fillStyle = '#ffffff'
        ctx.fillRect(box.relX, box.relY, box.relW, box.relH)
        paintedStage += 1
      }
    }

    for (const img of root.querySelectorAll('.presentation-layer img')) {
      if (img instanceof HTMLImageElement && paintImageElement(ctx, img, rootRect, width, height)) {
        paintedStage += 1
      }
    }

    root.querySelectorAll('canvas').forEach((board) => {
      if (board === canvas) return
      const box = board.getBoundingClientRect()
      if (box.width < 2 || box.height < 2) return
      const relX = ((box.left - rootRect.left) / rootRect.width) * width
      const relY = ((box.top - rootRect.top) / rootRect.height) * height
      const relW = (box.width / rootRect.width) * width
      const relH = (box.height / rootRect.height) * height
      ctx.drawImage(board, relX, relY, relW, relH)
    })

    paintedStage += paintStageOverlays(ctx, root, rootRect, width, height, domVideoSinks)

    const paintedTrackIds = new Set<string>()

    for (const tile of root.querySelectorAll('.video-tile')) {
      if (!tile.id.startsWith('video-tile-')) continue
      const tileId = tile.id.slice('video-tile-'.length)
      if (!tileId || isRecorderPeer(tileId)) continue

      const remoteStream = getRemoteStreams()[tileId]
      const videoTrack = remoteStream?.getVideoTracks().find(isPaintableVideoTrack)
      if (!videoTrack || paintedTrackIds.has(videoTrack.id)) continue

      const frame = latestFrames.get(videoTrack.id)
      const sink = videoSinks.get(videoTrack.id)

      const box = tile.getBoundingClientRect()
      if (box.width < 2 || box.height < 2) continue

      const relX = ((box.left - rootRect.left) / rootRect.width) * width
      const relY = ((box.top - rootRect.top) / rootRect.height) * height
      const relW = (box.width / rootRect.width) * width
      const relH = (box.height / rootRect.height) * height

      let paintedTile = false

      if (sink && sink.video.readyState >= 2 && sink.video.videoWidth > 0) {
        drawContain(
          ctx,
          sink.video,
          relX,
          relY,
          relW,
          relH,
          sink.video.videoWidth,
          sink.video.videoHeight,
        )
        paintedTile = true
      } else if (frame && frame.displayWidth > 0) {
        drawContain(ctx, frame, relX, relY, relW, relH, frame.displayWidth, frame.displayHeight)
        paintedTile = true
      } else {
        const videoEl = tile.querySelector('video')
        if (videoEl instanceof HTMLVideoElement && videoEl.readyState >= 2 && videoEl.videoWidth > 0) {
          if (videoEl.paused) void videoEl.play().catch(() => undefined)
          drawContain(
            ctx,
            videoEl,
            relX,
            relY,
            relW,
            relH,
            videoEl.videoWidth,
            videoEl.videoHeight,
          )
          paintedTile = true
        }
      }

      if (paintedTile) {
        paintedTrackIds.add(videoTrack.id)
        paintedRemote += 1
      }
    }

    // Headless fallback when DOM tiles are not yet laid out.
    if (paintedRemote === 0 && isAutomatedRecorder()) {
      paintedRemote = paintRemoteSidebar(
        ctx,
        width,
        height,
        getRemoteStreams,
        latestFrames,
        videoSinks,
      )
    }

    // Fallback grid for host-browser /record testing (not primary for headless).
    if (paintedRemote === 0 && !isAutomatedRecorder()) {
      const remoteEntries = Object.entries(getRemoteStreams()).filter(([, stream]) =>
        stream.getVideoTracks().some((t) => t.readyState === 'live' && t.enabled),
      )
      const count = remoteEntries.length
      if (count > 0) {
        const rows = count
        const pad = 8
        const tileW = Math.min(320, width * 0.22)
        const tileH = (height - pad * (rows + 1)) / rows
        remoteEntries.forEach(([, stream], index) => {
          const vt = stream.getVideoTracks().find((t) => t.readyState === 'live' && t.enabled)
          if (!vt) return
          const frame = latestFrames.get(vt.id)
          const x = width - tileW - pad
          const y = pad + index * (tileH + pad)
          if (frame && frame.displayWidth > 0) {
            drawContain(ctx, frame, x, y, tileW, tileH, frame.displayWidth, frame.displayHeight)
            paintedRemote += 1
          }
        })
      }
    }

    if (paintedRemote === 0 && isAutomatedRecorder()) {
      ctx.fillStyle = '#64748b'
      ctx.font = '16px sans-serif'
      ctx.fillText('Waiting for participant video…', 24, 40)
    }

    if (isAutomatedRecorder()) {
      const sinkReady = [...videoSinks.values(), ...domVideoSinks.values()].some(
        (s) => s.video.videoWidth > 0,
      )
      window.__MEET_RECORDING_DEBUG__ = {
        paintedRemote,
        paintedStage,
        cachedFrames: latestFrames.size,
        videoSinks: videoSinks.size,
        domVideoSinks: domVideoSinks.size,
        sinkReady,
        remotePeers: Object.keys(getRemoteStreams()).length,
        liveVideoTracks: Object.values(getRemoteStreams()).reduce(
          (n, s) => n + s.getVideoTracks().filter(isPaintableVideoTrack).length,
          0,
        ),
      }
    }
  }

  const videoStream = canvas.captureStream(COMPOSITOR_FPS)
  let rafId = 0
  let intervalId = 0

  if (isAutomatedRecorder() || selectIsRecorderView()) {
    intervalId = window.setInterval(paint, HEADLESS_PAINT_MS)
    paint()
  } else {
    const loop = () => {
      paint()
      rafId = requestAnimationFrame(loop)
    }
    rafId = requestAnimationFrame(loop)
  }

  const combined = new MediaStream([
    ...videoStream.getVideoTracks(),
    ...audioMixer.stream.getAudioTracks(),
  ])

  const stop = () => {
    abortAll.abort()
    if (rafId) cancelAnimationFrame(rafId)
    if (intervalId) window.clearInterval(intervalId)
    for (const pump of framePumps.values()) {
      pump.abort.abort()
    }
    for (const sink of videoSinks.values()) {
      sink.stop()
    }
    videoSinks.clear()
    for (const sink of domVideoSinks.values()) {
      sink.stop()
    }
    domVideoSinks.clear()
    for (const frame of latestFrames.values()) {
      frame.close()
    }
    latestFrames.clear()
    combined.getTracks().forEach((t) => t.stop())
    audioMixer.close()
  }

  return { stream: combined, stop }
}

export function hasRemoteVideoStream(
  remoteStreams: Readonly<Record<string, MediaStream>>,
): boolean {
  return Object.values(remoteStreams).some((stream) =>
    stream.getVideoTracks().some((t) => t.readyState === 'live' && t.enabled),
  )
}

export async function waitForPaintableRemoteVideo(timeoutMs = 60_000): Promise<boolean> {
  const deadline = Date.now() + timeoutMs
  while (Date.now() < deadline) {
    const debug = window.__MEET_RECORDING_DEBUG__
    if (debug && debug.paintedRemote > 0) {
      return true
    }
    await new Promise((r) => window.setTimeout(r, 400))
  }
  return false
}

export async function waitForRemoteVideo(
  getRemoteStreams: () => Readonly<Record<string, MediaStream>>,
  timeoutMs = 45_000,
): Promise<boolean> {
  const deadline = Date.now() + timeoutMs
  while (Date.now() < deadline) {
    if (hasRemoteVideoStream(getRemoteStreams())) {
      return true
    }
    await new Promise((r) => window.setTimeout(r, 400))
  }
  return false
}
