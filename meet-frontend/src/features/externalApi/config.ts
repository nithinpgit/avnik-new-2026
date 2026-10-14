/** Resolves the Laravel platform API base URL (trailing slash omitted). */
export function resolveExternalApiBaseUrl(): string {
  const explicit = import.meta.env.VITE_EXTERNAL_API_URL?.trim()
  if (explicit) {
    return explicit.replace(/\/$/, '')
  }
  return '/api'
}

/**
 * Public origin for Laravel fileManager assets (`storage/uploads/...`).
 * Matches the legacy admin app: files are served from the site origin, not `/api`.
 */
export function resolveExternalFileManagerBaseUrl(): string {
  const explicit = import.meta.env.VITE_EXTERNAL_FILE_MANAGER_URL?.trim()
  if (explicit) {
    return explicit.replace(/\/$/, '')
  }
  if (typeof window !== 'undefined' && window.location?.origin) {
    return window.location.origin
  }
  return ''
}

/** Turn a Laravel fileManager `file_url` into a browser-fetchable absolute URL. */
export function resolveExternalFileAssetUrl(path: string): string {
  if (!path) return path
  if (/^https?:\/\//i.test(path)) return path
  const base = resolveExternalFileManagerBaseUrl()
  const normalizedPath = path.replace(/^\/+/, '')
  return base ? `${base}/${normalizedPath}` : `/${normalizedPath}`
}

export const EXTERNAL_SESSION_USER_KEY = 'userData'
export const EXTERNAL_SESSION_TOKEN_KEY = 'accessToken'

export const EXTERNAL_STRIPE_PUBLISHABLE_KEY =
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY?.trim() || 'pk_test_SzN8dKdpVOi3egScdycPM9RB'

export const EXTERNAL_LOGIN_PATH = import.meta.env.VITE_EXTERNAL_LOGIN_URL?.trim() || '/login'
