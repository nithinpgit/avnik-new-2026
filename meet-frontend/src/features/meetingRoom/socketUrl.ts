/**
 * Internal NestJS API — proxied at `/meet/api/` on the site origin (external nginx).
 * Laravel platform APIs stay at `/api/` (see externalApi/config.ts).
 *
 * Optional override: `VITE_MEETING_API_URL` (absolute base including `/meet/api` if needed).
 */
export const MEET_INTERNAL_API_PREFIX = '/meet/api'

function toMeetApiPath(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`
  if (normalized.startsWith(`${MEET_INTERNAL_API_PREFIX}/`) || normalized === MEET_INTERNAL_API_PREFIX) {
    return normalized
  }
  if (normalized.startsWith('/api/') || normalized === '/api') {
    return `/meet${normalized}`
  }
  return `${MEET_INTERNAL_API_PREFIX}${normalized}`
}

export function resolveMeetingApiPath(path: string): string {
  const meetPath = toMeetApiPath(path)
  const explicit = import.meta.env.VITE_MEETING_API_URL?.trim()
  if (!explicit) {
    return meetPath
  }

  const base = explicit.replace(/\/$/, '')
  if (base.endsWith(MEET_INTERNAL_API_PREFIX)) {
    const suffix = meetPath.slice(MEET_INTERNAL_API_PREFIX.length)
    return `${base}${suffix}`
  }
  return `${base}${meetPath}`
}
