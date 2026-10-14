import { resolveMediaWsOverride, shouldUseMediasoupProxy } from '../recording/recordingRuntime'
import { normalizeMediaSocketPath } from './mediaSocketPath'

function normalizeHttpOrigin(url: string): string {
  const normalized = url.replace(/\/$/, '')
  if (normalized.startsWith('ws://')) return `http://${normalized.slice('ws://'.length)}`
  if (normalized.startsWith('wss://')) return `https://${normalized.slice('wss://'.length)}`
  return normalized
}

/**
 * Optional Socket.IO origin for meet-mediaserver.
 * Returns `undefined` for same-origin (`/mediasoup-socket.io/` on the page origin).
 */
export function resolveMediaSocketBaseUrl(): string | undefined {
  const runtimeOverride = resolveMediaWsOverride()
  if (runtimeOverride) {
    return normalizeHttpOrigin(runtimeOverride)
  }
  if (shouldUseMediasoupProxy() && typeof window !== 'undefined') {
    return window.location.origin
  }
  const explicit = import.meta.env.VITE_MEDIA_WS_URL?.trim()
  if (explicit) {
    return normalizeHttpOrigin(explicit)
  }
  return undefined
}

export type MediaSocketCredentials = {
  roomId: string
  peerId: string
  name?: string
}

export function resolveMediaSocketOptions(credentials: MediaSocketCredentials) {
  return {
    path: normalizeMediaSocketPath(),
    auth: credentials,
    transports: ['websocket', 'polling'] as ('websocket' | 'polling')[],
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    timeout: 20_000,
    withCredentials: true,
  }
}

export {
  normalizeMediaSocketPath,
  MEDIA_SOCKET_PATH,
  MEDIA_WS_PATH,
  normalizeMediaWsPath,
} from './mediaSocketPath'

/** @deprecated Use {@link resolveMediaSocketBaseUrl} */
export const resolveMediaWsBaseUrl = resolveMediaSocketBaseUrl
