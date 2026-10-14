import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { MEETING_REDIRECT_URL } from '../../config'
import { selectMeetingStatus } from '../meeting/meetingLifecycleSlice'
import { useIsMeetingHost } from '../meeting/useIsMeetingHost'
import { openPaymentModal } from './externalModalsSlice'
import { handlePostMeetingEnd } from './handlePostMeetingEnd'
import { selectExternalQuickMeet } from './externalMeetingSlice'
import {
  selectExtendActiveOffer,
  selectExtendParticipantPhase,
  selectExtendPaymentStatus,
  clearParticipantExtendFlow,
  setPaymentStatus,
  openParticipantPaying,
} from './extendDurationSlice'
import './externalModals.css'
import './extendDuration.css'

export function ExtendParticipantModals() {
  const dispatch = useAppDispatch()
  const quickMeet = useAppSelector(selectExternalQuickMeet)
  const isHost = useIsMeetingHost()
  const meetingStatus = useAppSelector(selectMeetingStatus)
  const phase = useAppSelector(selectExtendParticipantPhase)
  const offer = useAppSelector(selectExtendActiveOffer)
  const paymentStatus = useAppSelector(selectExtendPaymentStatus)

  const waitingForResume = paymentStatus === 'free' || paymentStatus === 'success'
  const meetingLive = meetingStatus === 'started'

  // Keep Redux in sync when meeting is live again (missed pause→start / late payment after resume).
  useEffect(() => {
    if (quickMeet || isHost) return
    if (!meetingLive) return
    if (phase === 'idle') return
    if (!waitingForResume) return
    dispatch(clearParticipantExtendFlow())
  }, [quickMeet, isHost, meetingLive, phase, waitingForResume, dispatch])

  // Paid but no live offer (rejoin payment / host already resumed) — clear wait state.
  useEffect(() => {
    if (quickMeet || isHost) return
    if (phase !== 'wait_host' || !waitingForResume) return
    if (offer) return
    dispatch(clearParticipantExtendFlow())
  }, [quickMeet, isHost, phase, waitingForResume, offer, dispatch])

  if (quickMeet || isHost) return null

  // Meeting is live again — never block with the wait overlay.
  if (meetingLive && waitingForResume) {
    return null
  }

  // Paid after host already cleared the offer (rejoin / late pay) — do not block pre-meeting.
  if (phase === 'wait_host' && waitingForResume && !offer) {
    return null
  }

  if (phase === 'wait_host') {
    return (
      <div className="external-modal-backdrop external-modal-backdrop--static" role="dialog" aria-modal>
        <div className="external-modal extend-modal">
          <h2>Please wait</h2>
          <p className="extend-modal__lead">
            {waitingForResume
              ? 'Waiting for the host to resume the meeting.'
              : 'Waiting for the host to extend the duration of the meeting.'}
          </p>
        </div>
      </div>
    )
  }

  if (phase === 'offer' && offer && offer.cost > 0 && paymentStatus === 'waiting') {
    const mins = Math.round(offer.durationSec / 60)
    return (
      <div className="external-modal-backdrop external-modal-backdrop--static" role="dialog" aria-modal>
        <div className="external-modal extend-modal">
          <h2>Accept extension?</h2>
          <p className="extend-modal__lead">
            Host extended the time by <strong>{mins} min</strong> for <strong>${offer.cost.toFixed(2)}</strong>.
          </p>
          <p className="extend-modal__lead">Do you accept?</p>
          <div className="external-modal__actions">
            <button
              type="button"
              className="external-modal__btn external-modal__btn--ghost"
              onClick={() => {
                dispatch(setPaymentStatus('declined'))
                dispatch(clearParticipantExtendFlow())
                handlePostMeetingEnd(dispatch, MEETING_REDIRECT_URL || '/')
              }}
            >
              No
            </button>
            <button
              type="button"
              className="external-modal__btn"
              onClick={() => {
                dispatch(openParticipantPaying())
                dispatch(openPaymentModal({ mode: 'extension' }))
              }}
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    )
  }

  return null
}
