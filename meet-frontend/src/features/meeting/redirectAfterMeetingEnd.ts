import { MEETING_REDIRECT_URL } from '../../config'

const REDIRECT_DELAY_MS = 500

export function redirectAfterMeetingEnd(url?: string): void {
  const target = url?.trim() || MEETING_REDIRECT_URL || '/'
  window.setTimeout(() => {
    window.location.assign(target)
  }, REDIRECT_DELAY_MS)
}
