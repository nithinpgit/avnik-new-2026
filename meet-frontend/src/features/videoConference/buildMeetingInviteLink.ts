import { meetAppPath } from '../../app/paths'

/** Join URL for sharing — `/join/?rm=<slotId>` (production) or dev viewer link. */
export function buildMeetingInviteLink(slotId: string, dev = false): string {
  if (typeof window === 'undefined') return ''
  const url = new URL(meetAppPath('/'), window.location.origin)
  url.searchParams.set('rm', slotId)
  if (dev) {
    url.searchParams.set('mode', 'viewer')
    url.searchParams.set('dev', '1')
  }
  return url.toString()
}
