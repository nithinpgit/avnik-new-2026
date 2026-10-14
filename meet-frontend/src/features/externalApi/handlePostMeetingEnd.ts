import type { AppDispatch } from '../../app/store'
import { store } from '../../app/store'
import { pushToast } from '../documents/notificationsSlice'
import {
  beginPostMeetingReview,
  setPostMeetingRedirectUrl,
} from './externalModalsSlice'
import { selectExternalMeetingMode, selectExternalQuickMeet } from './externalMeetingSlice'
import { completePostMeetingRedirect } from './postMeetingFlow'
import { stopLocalSessionMedia } from './stopLocalSessionMedia'

/** Presenter/quickMeet redirect; viewer gets rating popup (never redirect here). */
export function handlePostMeetingEnd(dispatch: AppDispatch, redirectUrl?: string): void {
  const redirect = redirectUrl?.trim()
  if (redirect) {
    dispatch(setPostMeetingRedirectUrl(redirect))
  }

  const state = store.getState()
  if (state.externalModals.postMeetingReviewRequested) return

  const mode = selectExternalMeetingMode(state)
  const quickMeet = selectExternalQuickMeet(state)

  // Leave live media immediately (unpaid kick / leave) before review or redirect.
  stopLocalSessionMedia(dispatch)

  if (quickMeet || mode === 'presenter') {
    completePostMeetingRedirect(redirect ?? state.externalModals.postMeetingRedirectUrl)
    return
  }

  dispatch(
    pushToast({
      message: 'The session has ended.',
      variant: 'info',
      durationMs: 4000,
    }),
  )
  dispatch(beginPostMeetingReview({ redirectUrl: redirect }))
}
