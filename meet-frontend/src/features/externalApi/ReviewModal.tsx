import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { pushToast } from '../documents/notificationsSlice'
import { selectMeetingSlotId } from '../meetingSession/meetingSessionSlice'
import { submitMeetingReview } from './client'
import { selectExternalEvent } from './externalMeetingSlice'
import {
  closeReviewModal,
  openPaymentModalForTip,
  selectPostMeetingRedirectUrl,
  selectReviewModalOpen,
} from './externalModalsSlice'
import { completePostMeetingRedirect } from './postMeetingFlow'
import { StarRating } from './StarRating'
import './externalModals.css'

const TIP_OPTIONS = [5, 10, 15, 20] as const

export function ReviewModal() {
  const dispatch = useAppDispatch()
  const open = useAppSelector(selectReviewModalOpen)
  const event = useAppSelector(selectExternalEvent)
  const slotId = useAppSelector(selectMeetingSlotId)
  const redirectUrl = useAppSelector(selectPostMeetingRedirectUrl)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [tip, setTip] = useState<number | null>(null)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    if (!open) return
    setRating(0)
    setComment('')
    setTip(null)
    setBusy(false)
  }, [open])

  if (!open) return null

  const eventId = event?.eventTimeSlot?.eventId ?? event?.id
  const hostId = event?.eventCreatedUser?.id
  const slotRef = event?.eventTimeSlot?.id ?? slotId

  const redirectNow = () => {
    dispatch(closeReviewModal())
    completePostMeetingRedirect(redirectUrl)
  }

  const handleSubmit = async () => {
    if (rating < 1) {
      dispatch(
        pushToast({
          message: 'Rating and feedback required before leaving the session.',
          variant: 'error',
        }),
      )
      return
    }

    if (!eventId || !hostId || !slotRef) {
      redirectNow()
      return
    }

    const pendingReview = {
      comment,
      rating,
      eventId,
      slotId: slotRef,
      hostId,
    }

    if (tip && tip > 0) {
      dispatch(openPaymentModalForTip({ pendingReview, tipAmount: tip }))
      return
    }

    setBusy(true)
    try {
      await submitMeetingReview({
        ...pendingReview,
        cost: 0,
      })
      dispatch(pushToast({ message: 'Thank you for your feedback', variant: 'success' }))
      dispatch(closeReviewModal())
      completePostMeetingRedirect(redirectUrl)
    } catch (err) {
      dispatch(pushToast({ message: String(err), variant: 'error' }))
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="external-modal-backdrop external-modal-backdrop--static" role="dialog" aria-modal aria-labelledby="review-modal-title">
      <div className="external-modal external-modal--review">
        <header className="external-modal__header external-modal__header--plain">
          <h2 id="review-modal-title">Session ended, Tip &amp; rate the session</h2>
        </header>

        <div className="external-modal__body">
          <div className="review-tips-section">
            <div className="review-tips-heading">Rate the User</div>
            <StarRating value={rating} onChange={setRating} disabled={busy} />
          </div>

          <label className="review-tips-comment" htmlFor="review-comment">
            <textarea
              id="review-comment"
              className="review-tips-comment__input"
              placeholder="Write your commnet..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              disabled={busy}
            />
          </label>

          <div className="review-tips-section">
            <div className="review-tips-heading">Add a tip</div>
            <div className="review-tips-options" role="radiogroup" aria-label="Tip amount">
              {TIP_OPTIONS.map((amount) => (
                <label key={amount} className="review-tips-option">
                  <input
                    type="radio"
                    name="tipamount"
                    value={amount}
                    checked={tip === amount}
                    onChange={() => setTip(amount)}
                    disabled={busy}
                  />
                  <span>${amount}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="review-tips-actions">
            <button type="button" className="external-modal__btn" disabled={busy} onClick={() => void handleSubmit()}>
              {busy ? 'Submitting…' : 'Submit'}
            </button>
            <button type="button" className="external-modal__btn external-modal__btn--danger" disabled={busy} onClick={redirectNow}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
