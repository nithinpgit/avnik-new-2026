/** @deprecated Mediasoup signaling uses Socket.IO — import from ./resolveMediaSocketUrl */
export {
  resolveMediaSocketBaseUrl,
  resolveMediaSocketBaseUrl as resolveMediaWsBaseUrl,
  resolveMediaSocketOptions,
  normalizeMediaSocketPath,
  normalizeMediaSocketPath as normalizeMediaWsPath,
  MEDIA_SOCKET_PATH,
  MEDIA_SOCKET_PATH as MEDIA_WS_PATH,
} from './resolveMediaSocketUrl'
