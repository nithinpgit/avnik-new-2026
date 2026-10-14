import { useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { store } from '../../app/store'
import { pushToast } from '../documents/notificationsSlice'
import { selectMeetingStatus } from '../meeting/meetingLifecycleSlice'
import {
  beginPostMeetingReview,
  selectPostMeetingRedirectUrl,
} from './externalModalsSlice'
import { selectExternalMeetingMode, selectExternalQuickMeet } from './externalMeetingSlice'
import { completePostMeetingRedirect } from './postMeetingFlow'
import { stopLocalSessionMedia } from './stopLocalSessionMedia'

/**
 * Backup when lifecycle reaches ended (reference avnik_old). Same rules as meeting_ended:
 * presenter/quickMeet redirect; viewer gets rating popup.
 */
export function PostMeetingFlowBridge() {
  const dispatch = useAppDispatch()
  const meetingStatus = useAppSelector(selectMeetingStatus)
  const storedRedirectUrl = useAppSelector(selectPostMeetingRedirectUrl)
  const prevStatusRef = useRef(meetingStatus)
  const handledEndedRef = useRef(false)

  useEffect(() => {
    const prev = prevStatusRef.current
    prevStatusRef.current = meetingStatus
    if (prev === meetingStatus || meetingStatus !== 'ended') return
    if (handledEndedRef.current) return
    handledEndedRef.current = true

    const state = store.getState()
    if (state.externalModals.postMeetingReviewRequested) return

    const mode = selectExternalMeetingMode(state)
    const quickMeet = selectExternalQuickMeet(state)

    if (quickMeet || mode === 'presenter') {
      stopLocalSessionMedia(dispatch)
      completePostMeetingRedirect(storedRedirectUrl)
      return
    }

    dispatch(
      pushToast({
        message: 'The session has ended.',
        variant: 'info',
        durationMs: 4000,
      }),
    )
    stopLocalSessionMedia(dispatch)
    dispatch(beginPostMeetingReview({ redirectUrl: storedRedirectUrl ?? undefined }))
  }, [dispatch, meetingStatus, storedRedirectUrl])

  return null
}
