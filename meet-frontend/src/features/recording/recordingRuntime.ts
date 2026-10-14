let recorderApiBase: string | null = null
let apiBaseOverride: string | null = null
let mediaWsOverride: string | null = null
let isRecorderView = false
let recordingId: string | null = null

export function configureRecordingRuntime(input: {
  isRecorder: boolean
  recordingId?: string | null
  recorderApi?: string | null
  apiUrl?: string | null
  mediaWs?: string | null
}) {
  isRecorderView = input.isRecorder
  recordingId = input.recordingId?.trim() || null
  recorderApiBase = input.recorderApi?.trim() || null
  apiBaseOverride = input.apiUrl?.trim() || null
  mediaWsOverride = input.mediaWs?.trim() || null
}

export function selectIsRecorderView(): boolean {
  return isRecorderView
}

/** True when headless Chrome loads the app inside Docker (same-origin paths). */
export function shouldUseMediasoupProxy(): boolean {
  if (typeof window === 'undefined') return false
  if (navigator.webdriver) return true
  const host = window.location.hostname
  return host === 'meet-frontend'
}

function normalizeMediaWsUrl(url: string): string {
  const trimmed = url.trim()
  if (/^wss?:\/\//i.test(trimmed) || /^https?:\/\//i.test(trimmed)) {
    return trimmed
  }
  return `ws://${trimmed}`
}

function mediaWsHostname(url: string): string | null {
  try {
    return new URL(normalizeMediaWsUrl(url)).hostname
  } catch {
    return null
  }
}

/** mediaWs query values meant for headless Chrome inside Docker — not reachable from host Chrome. */
function isDockerOnlyMediaWsUrl(url: string): boolean {
  const host = mediaWsHostname(url)
  if (!host) return false
  return host === 'host.docker.internal' || host === 'meet-mediaserver' || host === 'meet-frontend'
}

export function resolveMediaWsOverride(): string | null {
  if (!mediaWsOverride) return null
  // Headless recorder loads meet-frontend /join/record — use same-origin paths for SFU when possible.
  if (shouldUseMediasoupProxy()) {
    return null
  }
  if (isDockerOnlyMediaWsUrl(mediaWsOverride)) {
    return null
  }
  return mediaWsOverride
}

export function resolveRecorderApiBase(): string {
  if (recorderApiBase) {
    return recorderApiBase.replace(/\/$/, '')
  }
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search)
    const fromQuery = params.get('recorderApi')?.trim()
    if (fromQuery) {
      return fromQuery.replace(/\/$/, '')
    }
  }
  return 'http://127.0.0.1:4000'
}

export function selectRecordingId(): string | null {
  return recordingId
}

export function resolveApiBaseOverride(): string | null {
  return apiBaseOverride
}

declare global {
  interface Window {
    __MEET_RECORDING_STATUS__?: string
    __MEET_STOP_RECORDING__?: () => Promise<void>
    __meetRecorderUploadChunk?: (seq: number, base64: string) => Promise<{ ok: boolean }>
    __meetRecorderSignalReady?: () => Promise<{ ok: boolean }>
    __meetRecorderSignalError?: (message: string) => Promise<{ ok: boolean }>
    __MEET_RECORDING_DEBUG__?: {
      paintedRemote: number
      paintedStage?: number
      cachedFrames: number
      videoSinks: number
      domVideoSinks?: number
      sinkReady: boolean
      remotePeers: number
      liveVideoTracks: number
    }
  }
}

export function setRecordingStatus(status: string): void {
  if (typeof window !== 'undefined') {
    window.__MEET_RECORDING_STATUS__ = status
  }
}

export function isAutomatedRecorder(): boolean {
  return shouldUseMediasoupProxy()
}
