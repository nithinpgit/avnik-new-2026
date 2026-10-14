/** Socket.IO engine path for meet-mediaserver signaling (must match mediaserver listen path). */
export const MEDIA_SOCKET_PATH =
  import.meta.env.VITE_MEDIA_SOCKET_PATH?.trim() ||
  import.meta.env.VITE_MEDIA_WS_PATH?.trim() ||
  '/mediasoup-socket.io'

export function normalizeMediaSocketPath(path: string = MEDIA_SOCKET_PATH): string {
  const withLeading = path.startsWith('/') ? path : `/${path}`
  return withLeading.replace(/\/+$/, '') || '/'
}

/** @deprecated Use {@link MEDIA_SOCKET_PATH} */
export const MEDIA_WS_PATH = MEDIA_SOCKET_PATH
/** @deprecated Use {@link normalizeMediaSocketPath} */
export const normalizeMediaWsPath = normalizeMediaSocketPath
