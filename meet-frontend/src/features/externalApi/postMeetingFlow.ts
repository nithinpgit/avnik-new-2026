import type { RootState } from '../../app/store'
import { MEETING_REDIRECT_URL } from '../../config'
import { redirectAfterMeetingEnd } from '../meeting/redirectAfterMeetingEnd'
import { selectExternalMeetingMode, selectExternalQuickMeet } from './externalMeetingSlice'

export function resolvePostMeetingRedirectUrl(url?: string | null): string {
  return url?.trim() || MEETING_REDIRECT_URL || '/'
}

export function completePostMeetingRedirect(url?: string | null): void {
  redirectAfterMeetingEnd(resolvePostMeetingRedirectUrl(url))
}

/** Only host (API mode presenter) and quickMeet skip review and redirect immediately. */
export function shouldRedirectImmediatelyAfterMeetingEnd(state: RootState): boolean {
  if (state.meetingSession.isRecorderMode) return false
  if (selectExternalQuickMeet(state)) return true
  return selectExternalMeetingMode(state) === 'presenter'
}

/** Everyone except host presenter and quickMeet sees the rating popup. */
export function shouldShowPostMeetingReview(state: RootState): boolean {
  return !shouldRedirectImmediatelyAfterMeetingEnd(state)
}
