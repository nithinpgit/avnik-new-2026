/** App mount path — must match Vite `base` in vite.config.ts. */
export const MEET_APP_BASE = (import.meta.env.BASE_URL || '/join/').replace(/\/$/, '') || '/join'

export function meetAppPath(subpath = ''): string {
  if (!subpath || subpath === '/') {
    return `${MEET_APP_BASE}/`
  }
  const normalized = subpath.startsWith('/') ? subpath : `/${subpath}`
  return `${MEET_APP_BASE}${normalized}`
}

export function isMeetRecordPath(pathname?: string): boolean {
  const path = (pathname ?? (typeof window !== 'undefined' ? window.location.pathname : '')).replace(
    /\/+$/,
    '',
  )
  return path.endsWith('/record')
}

export function meetAppOrigin(): string {
  if (typeof window === 'undefined') return ''
  return `${window.location.origin}${MEET_APP_BASE}`
}
