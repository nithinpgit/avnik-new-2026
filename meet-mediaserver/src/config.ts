import 'dotenv/config'
import { networkInterfaces } from 'node:os'
import { resolveTurnIceServers, type TurnIceServer } from './turnConfig.js'

const isProduction = process.env.NODE_ENV === 'production'

function normalizeSocketIoPath(path: string): string {
  const withLeading = path.trim().startsWith('/') ? path.trim() : `/${path.trim()}`
  return withLeading.replace(/\/+$/, '') || '/'
}

function requireEnv(name: string): string {
  const value = process.env[name]?.trim()
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }
  return value
}

function requireInt(name: string): number {
  const n = Number(requireEnv(name))
  if (!Number.isFinite(n)) {
    throw new Error(`Environment variable ${name} must be a number`)
  }
  return n
}

function optionalEnv(name: string, devFallback: string): string {
  const value = process.env[name]?.trim()
  if (value) return value
  if (isProduction) {
    throw new Error(`Missing required environment variable: ${name}`)
  }
  return devFallback
}

function parseAnnouncedIps(raw: string | undefined): string[] {
  if (!raw?.trim()) return []
  return raw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
}

/** Primary non-loopback IPv4 (Docker bridge) so in-network clients can reach RTC ports. */
function detectContainerIpv4(): string | undefined {
  for (const entries of Object.values(networkInterfaces())) {
    if (!entries) continue
    for (const net of entries) {
      const family = net.family as string | number
      const isV4 = family === 'IPv4' || family === 4
      if (isV4 && !net.internal) {
        return net.address
      }
    }
  }
  return undefined
}

function resolveAnnouncedIps(): string[] {
  const fromEnv = parseAnnouncedIps(process.env.MEDIASOUP_ANNOUNCED_IP?.trim())
  const ips = [...fromEnv]
  if (!isProduction) {
    const containerIp = detectContainerIpv4()
    if (containerIp && !ips.includes(containerIp)) {
      ips.push(containerIp)
    }
  }
  return ips
}

export const config = {
  httpPort: isProduction ? requireInt('PORT') : Number(process.env.PORT) || 3001,
  /** Socket.IO engine path (must match frontend VITE_MEDIA_SOCKET_PATH). */
  socketIoPath: normalizeSocketIoPath(
    process.env.MEDIASERVER_SOCKET_PATH?.trim() ||
      process.env.MEDIASERVER_WS_PATH?.trim() ||
      '/mediasoup-socket.io',
  ),
  /** Must match meet-backend MEDIA_JWT_SECRET */
  mediaJwtSecret: optionalEnv('MEDIA_JWT_SECRET', 'dev-media-jwt-change-in-production'),
  rtcMinPort: isProduction
    ? requireInt('MEDIASOUP_RTC_MIN_PORT')
    : Number(process.env.MEDIASOUP_RTC_MIN_PORT) || 40_000,
  rtcMaxPort: isProduction
    ? requireInt('MEDIASOUP_RTC_MAX_PORT')
    : Number(process.env.MEDIASOUP_RTC_MAX_PORT) || 40_100,
  /** ICE host candidates announced to browsers (comma-separated for multiple routes). */
  announcedIps: isProduction
    ? parseAnnouncedIps(requireEnv('MEDIASOUP_ANNOUNCED_IP'))
    : resolveAnnouncedIps(),
  logLevel: optionalEnv('LOG_LEVEL', 'info'),
  /** TURN relay ICE servers forwarded to browsers (optional). */
  iceServers: resolveTurnIceServers(),
}

export type { TurnIceServer }
