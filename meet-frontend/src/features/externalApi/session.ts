import { EXTERNAL_LOGIN_PATH, EXTERNAL_SESSION_TOKEN_KEY, EXTERNAL_SESSION_USER_KEY } from './config'

export type ExternalSessionUser = {
  id: number | string
  name: string
  email?: string
  username?: string
  profile?: { profile_picture?: string | null }
}

export function loadExternalSession(): {
  user: ExternalSessionUser | null
  accessToken: string | null
} {
  if (typeof window === 'undefined') {
    return { user: null, accessToken: null }
  }
  try {
    const rawUser = localStorage.getItem(EXTERNAL_SESSION_USER_KEY)
    const accessToken = localStorage.getItem(EXTERNAL_SESSION_TOKEN_KEY)
    if (!rawUser || !accessToken) {
      return { user: null, accessToken: null }
    }
    const user = JSON.parse(rawUser) as ExternalSessionUser
    if (!user?.id || !user?.name) {
      return { user: null, accessToken: null }
    }
    return { user, accessToken }
  } catch {
    return { user: null, accessToken: null }
  }
}

export function saveRedirectUrl(): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(
    'redirectUrl',
    JSON.stringify({ url: window.location.href, time: new Date().toISOString() }),
  )
}

export function redirectToLogin(): void {
  saveRedirectUrl()
  window.location.assign(EXTERNAL_LOGIN_PATH)
}
