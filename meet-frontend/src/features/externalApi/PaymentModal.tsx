import { useLayoutEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { pushToast } from '../documents/notificationsSlice'
import { selectMeetingDisplayName, selectMeetingSlotId } from '../meetingSession/meetingSessionSlice'
import { processMeetingPayment, submitMeetingReview } from './client'
import {
  clearPostMeetingFlow,
  closePaymentModal,
  selectPaymentModalMode,
  selectPaymentModalOpen,
  selectPendingReview,
  selectPostMeetingRedirectUrl,
  selectTipAmount,
} from './externalModalsSlice'
import {
  selectExternalAmountDue,
  selectExternalEvent,
  selectExternalExtendedDurationId,
  setPaymentRequired,
} from './externalMeetingSlice'
import {
  clearParticipantExtendFlow,
  markExtensionPaymentSuccess,
  openParticipantOfferAgain,
  selectExtendActiveOffer,
} from './extendDurationSlice'
import { selectMeetingStatus } from '../meeting/meetingLifecycleSlice'
import { store } from '../../app/store'
import {
  EXTEND_DURATION_CHANNEL,
  parseExtendDurationSync,
} from './extendDurationTypes'
import { completePostMeetingRedirect } from './postMeetingFlow'
import {
  createStripeCardElement,
  createStripePaymentMethod,
  loadStripeJs,
  mountStripeSplitCardElements,
  resetStripeElements,
  type StripeSplitCardElements,
} from './stripeHelper'
import './externalModals.css'

function waitForMountNode(getNode: () => HTMLElement | null, attempts = 8): Promise<HTMLElement | null> {
  return new Promise((resolve) => {
    let remaining = attempts
    const tryMount = () => {
      const node = getNode()
      if (node) {
        resolve(node)
        return
      }
      remaining -= 1
      if (remaining <= 0) {
        resolve(null)
        return
      }
      requestAnimationFrame(tryMount)
    }
    tryMount()
  })
}

export function PaymentModal() {
  const dispatch = useAppDispatch()
  const open = useAppSelector(selectPaymentModalOpen)
  const paymentMode = useAppSelector(selectPaymentModalMode)
  const event = useAppSelector(selectExternalEvent)
  const slotId = useAppSelector(selectMeetingSlotId)
  const userName = useAppSelector(selectMeetingDisplayName)
  const amountDue = useAppSelector(selectExternalAmountDue)
  const extendedDurationId = useAppSelector(selectExternalExtendedDurationId)
  const tipAmount = useAppSelector(selectTipAmount)
  const pendingReview = useAppSelector(selectPendingReview)
  const redirectUrl = useAppSelector(selectPostMeetingRedirectUrl)

  const cardMountRef = useRef<HTMLDivElement>(null)
  const cardNumberRef = useRef<HTMLDivElement>(null)
  const cardExpiryRef = useRef<HTMLDivElement>(null)
  const cardCvcRef = useRef<HTMLDivElement>(null)
  const cardElementRef = useRef<unknown>(null)
  const splitElementsRef = useRef<StripeSplitCardElements | null>(null)

  const [name, setName] = useState('')
  const [busy, setBusy] = useState(false)
  const [cardReady, setCardReady] = useState(false)

  const isTipPayment = paymentMode === 'tip'
  const isExtensionPayment = paymentMode === 'extension'
  const cost = isTipPayment ? tipAmount : amountDue

  const handleClosePayment = () => {
    dispatch(closePaymentModal())
    if (isExtensionPayment) {
      dispatch(openParticipantOfferAgain())
    }
  }

  useLayoutEffect(() => {
    if (!open) return
    setName(userName ?? '')
    setCardReady(false)
    setBusy(false)
  }, [open, userName])

  useLayoutEffect(() => {
    if (!open) return

    let cancelled = false

    const mountStripeFields = async () => {
      try {
        await loadStripeJs()
        if (cancelled) return

        splitElementsRef.current?.destroy()
        splitElementsRef.current = null
        cardElementRef.current = null
        resetStripeElements()

        if (isTipPayment) {
          const number = await waitForMountNode(() => cardNumberRef.current)
          const expiry = await waitForMountNode(() => cardExpiryRef.current)
          const cvc = await waitForMountNode(() => cardCvcRef.current)
          if (cancelled) return

          if (!number || !expiry || !cvc) {
            dispatch(pushToast({ message: 'Could not initialize card fields.', variant: 'error' }))
            return
          }

          number.innerHTML = ''
          expiry.innerHTML = ''
          cvc.innerHTML = ''

          splitElementsRef.current = await mountStripeSplitCardElements(
            { number, expiry, cvc },
            (valid) => {
              if (!cancelled) setCardReady(valid)
            },
          )
          return
        }

        const mount = await waitForMountNode(() => cardMountRef.current)
        if (cancelled || !mount) {
          if (!cancelled) {
            dispatch(pushToast({ message: 'Could not initialize card field.', variant: 'error' }))
          }
          return
        }

        mount.innerHTML = ''
        cardElementRef.current = createStripeCardElement(mount)
        setCardReady(true)
      } catch {
        if (!cancelled) {
          dispatch(pushToast({ message: 'Could not load payment form.', variant: 'error' }))
        }
      }
    }

    void mountStripeFields()

    return () => {
      cancelled = true
      splitElementsRef.current?.destroy()
      splitElementsRef.current = null
      cardElementRef.current = null
    }
  }, [open, isTipPayment, dispatch])

  if (!open) return null

  const eventId = event?.eventTimeSlot?.eventId ?? event?.id

  const finishTipFlow = () => {
    dispatch(clearPostMeetingFlow())
    completePostMeetingRedirect(redirectUrl)
  }

  const handlePay = async () => {
    if (isTipPayment) {
      if (!pendingReview || !splitElementsRef.current) return
      setBusy(true)
      try {
        const stripeToken = await createStripePaymentMethod(splitElementsRef.current.cardNumber, name.trim() || undefined)
        await submitMeetingReview({
          comment: pendingReview.comment,
          eventId: pendingReview.eventId,
          slotId: pendingReview.slotId,
          hostId: pendingReview.hostId,
          rating: pendingReview.rating,
          cost: tipAmount,
          stripeToken,
        })
        dispatch(pushToast({ message: 'Thank you for your feedback', variant: 'success' }))
        finishTipFlow()
      } catch (err) {
        dispatch(pushToast({ message: String(err), variant: 'error' }))
        finishTipFlow()
      } finally {
        setBusy(false)
      }
      return
    }

    if (!slotId || !eventId || !cardElementRef.current) return
    setBusy(true)
    try {
      const stripeToken = await createStripePaymentMethod(cardElementRef.current, name.trim() || undefined)
      await processMeetingPayment({
        stripeToken,
        eventId,
        roomId: slotId,
        cost,
        extendedDurationId: extendedDurationId || undefined,
      })
      dispatch(setPaymentRequired(false))
      dispatch(closePaymentModal())
      if (isExtensionPayment || extendedDurationId) {
        dispatch(markExtensionPaymentSuccess())
        // If the host already resumed (or this is a rejoin payment), skip "wait for resume".
        const meetingStatus = selectMeetingStatus(store.getState())
        const sync = parseExtendDurationSync(
          store.getState().roomSync.channels[EXTEND_DURATION_CHANNEL],
        )
        const activeOffer = selectExtendActiveOffer(store.getState())
        const extendStillOpen =
          meetingStatus === 'paused' && Boolean(sync.offer || activeOffer) && !sync.clearedAt
        if (!extendStillOpen) {
          dispatch(clearParticipantExtendFlow())
        }
      }
      dispatch(pushToast({ message: 'Payment successful', variant: 'success' }))
    } catch (err) {
      dispatch(pushToast({ message: String(err), variant: 'error' }))
    } finally {
      setBusy(false)
    }
  }

  const paymentDescription = isTipPayment
    ? `Make a payment of $${cost} as a tip`
    : `Make a payment of $${cost.toFixed(2)} to extend the session.`

  return (
    <div className="external-modal-backdrop external-modal-backdrop--static" role="dialog" aria-modal aria-labelledby="payment-modal-title">
      <div className="external-modal external-modal--payment">
        <header className="external-modal__header">
          <h2 id="payment-modal-title">Payment</h2>
        </header>

        <div className="external-modal__body">
          <p className="external-modal__amount">{paymentDescription}</p>

          {isTipPayment ? (
            <div className="payment-form-grid">
              <div className="payment-form-field">
                <label className="payment-form-field__label" htmlFor="payment-name">
                  Name
                </label>
                <input
                  id="payment-name"
                  type="text"
                  className="payment-form-field__input"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={busy}
                />
              </div>
              <div className="payment-form-field">
                <label className="payment-form-field__label" htmlFor="payment-card-number">
                  Card Number
                </label>
                <div id="payment-card-number" ref={cardNumberRef} className="payment-form-field__stripe" />
              </div>
              <div className="payment-form-field">
                <label className="payment-form-field__label" htmlFor="payment-card-expiry">
                  Card Expiry Date
                </label>
                <div id="payment-card-expiry" ref={cardExpiryRef} className="payment-form-field__stripe" />
              </div>
              <div className="payment-form-field">
                <label className="payment-form-field__label" htmlFor="payment-card-cvc">
                  CVV
                </label>
                <div id="payment-card-cvc" ref={cardCvcRef} className="payment-form-field__stripe" />
              </div>
            </div>
          ) : (
            <>
              <div className="payment-form-field payment-form-field--full">
                <label className="payment-form-field__label" htmlFor="payment-name-booking">
                  Name
                </label>
                <input
                  id="payment-name-booking"
                  type="text"
                  className="payment-form-field__input"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={busy}
                />
              </div>
              <div ref={cardMountRef} className="external-modal__card" />
            </>
          )}

          <div className="payment-form-actions">
            {!isTipPayment ? (
              <button type="button" className="external-modal__btn external-modal__btn--ghost" onClick={handleClosePayment}>
                Cancel
              </button>
            ) : null}
            <button
              type="button"
              className="external-modal__btn"
              disabled={busy || (isTipPayment && !cardReady)}
              onClick={() => void handlePay()}
            >
              {busy ? 'Processing…' : `Pay ($${isTipPayment ? cost : cost.toFixed(2)})`}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
