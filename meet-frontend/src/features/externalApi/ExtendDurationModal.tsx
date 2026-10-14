import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { store } from '../../app/store'
import { pushToast } from '../documents/notificationsSlice'
import { selectMeetingSlotId, selectMeetingUserId } from '../meetingSession/meetingSessionSlice'
import { useMeetingSocket } from '../meetingRoom/MeetingSocketProvider'
import { extendMeetingRoomDuration } from './client'
import { addExtendedDurationSec, selectExternalQuickMeet, setExtendedDurationId } from './externalMeetingSlice'
import { closeExtendModal, openExtendModal, selectExtendModalOpen } from './externalModalsSlice'
import { useMeetingRemainingSeconds, EXTEND_REMAINING_THRESHOLD_SEC } from '../meeting/useMeetingElapsedLabel'
import {
  EXTEND_DURATION_CHANNEL,
  parseExtendDurationSync,
  type ExtendOffer,
} from './extendDurationTypes'
import {
  markFreeExtendUsed,
  openHostAwaitingPayments,
  openHostOptions,
  setHostPhaseIdle,
  selectExtendFreeExtendUsed,
  selectExtendHostPhase,
  selectExtendPaidParticipants,
  selectExtendActiveOffer,
} from './extendDurationSlice'
import './externalModals.css'
import './extendDuration.css'

type ExtendMode = 'extendFree' | 'extendYou'

const FREE_EXTEND_SEC = 60
const MINUTE_OPTIONS = [5, 10, 15, 20, 30, 45, 60]

export function ExtendDurationModal() {
  const dispatch = useAppDispatch()
  const { emitRoomSync, endMeeting, startMeeting, pauseMeeting } = useMeetingSocket()
  const modalOpen = useAppSelector(selectExtendModalOpen)
  const hostPhase = useAppSelector(selectExtendHostPhase)
  const freeExtendUsed = useAppSelector(selectExtendFreeExtendUsed)
  const paid = useAppSelector(selectExtendPaidParticipants)
  const activeOffer = useAppSelector(selectExtendActiveOffer)
  const slotId = useAppSelector(selectMeetingSlotId)
  const userId = useAppSelector(selectMeetingUserId)
  const quickMeet = useAppSelector(selectExternalQuickMeet)
  const remainingSec = useMeetingRemainingSeconds()

  const [mode, setMode] = useState<ExtendMode>('extendYou')
  const [minutes, setMinutes] = useState(10)
  const [cost, setCost] = useState(5)
  const [busy, setBusy] = useState(false)

  const timeAlmostUp = remainingSec < EXTEND_REMAINING_THRESHOLD_SEC
  const showExpiredPrompt = hostPhase === 'expired_prompt' && timeAlmostUp
  const showOptions =
    timeAlmostUp &&
    (hostPhase === 'options' || (modalOpen && hostPhase !== 'awaiting_payments' && hostPhase !== 'expired_prompt'))
  // Payment-review UI can stay open after an extension even if remaining > 1 min
  const showAwaiting = hostPhase === 'awaiting_payments'

  const open = !quickMeet && (showExpiredPrompt || showOptions || showAwaiting)
  if (!open) return null

  const ensurePaused = () => {
    if (store.getState().meetingLifecycle.status === 'started') {
      pauseMeeting()
    }
  }

  const publishOffer = (offer: ExtendOffer, paidList = paid) => {
    const prev = parseExtendDurationSync(store.getState().roomSync.channels[EXTEND_DURATION_CHANNEL])
    emitRoomSync(EXTEND_DURATION_CHANNEL, {
      ...prev,
      hostSelecting: false,
      offer,
      paid: paidList,
      clearedAt: null,
    })
  }

  const handleEndMeeting = () => {
    dispatch(setHostPhaseIdle())
    dispatch(closeExtendModal())
    endMeeting()
  }

  const handleOpenOptions = () => {
    ensurePaused()
    dispatch(openHostOptions())
    dispatch(openExtendModal())
  }

  const handleContinue = async () => {
    if (!slotId || !userId) return
    const durationSec = mode === 'extendFree' ? FREE_EXTEND_SEC : minutes * 60
    const extendCost = mode === 'extendFree' ? 0 : Math.max(0, cost)
    if (mode === 'extendFree' && freeExtendUsed) {
      dispatch(pushToast({ message: 'Free extension can only be used once.', variant: 'error' }))
      return
    }
    if (mode === 'extendYou' && durationSec <= 0) {
      dispatch(pushToast({ message: 'Choose a duration to extend.', variant: 'error' }))
      return
    }

    // Keep everyone paused while host reviews payments / decides when to resume.
    ensurePaused()

    setBusy(true)
    try {
      const res = await extendMeetingRoomDuration({
        roomId: slotId,
        userId,
        duration: durationSec,
        cost: extendCost,
      })
      const extendedDurationId = res.data?.id
      if (!extendedDurationId) throw new Error('Extend failed — no extension id returned')

      dispatch(setExtendedDurationId(extendedDurationId))
      dispatch(addExtendedDurationSec(durationSec))
      if (mode === 'extendFree') dispatch(markFreeExtendUsed())

      const newTotalDurationSec = store.getState().externalMeeting.totalDurationSec
      const offer: ExtendOffer = {
        durationSec,
        totalDurationSec: newTotalDurationSec,
        cost: extendCost,
        extendedDurationId,
        hostUserId: String(userId),
        createdAt: new Date().toISOString(),
      }
      // Pause again after API in case status flipped, then publish offer.
      ensurePaused()
      dispatch(openHostAwaitingPayments({ offer, paid: [] }))
      publishOffer(offer, [])
      dispatch(closeExtendModal())

      dispatch(
        pushToast({
          message:
            extendCost <= 0
              ? 'Free extension applied. Click play (or Resume) to continue.'
              : 'Payment request sent. Resume when ready — unpaid participants will leave.',
          variant: 'success',
        }),
      )
    } catch (err) {
      dispatch(pushToast({ message: String(err), variant: 'error' }))
    } finally {
      setBusy(false)
    }
  }

  const handleResume = () => {
    dispatch(setHostPhaseIdle())
    dispatch(closeExtendModal())
    startMeeting()
  }

  if (showExpiredPrompt && !showOptions && !showAwaiting) {
    return (
      <div className="external-modal-backdrop" role="dialog" aria-modal>
        <div className="external-modal extend-modal">
          <div className="extend-modal__hero" aria-hidden>
            <span className="extend-modal__timer-badge">0:00</span>
          </div>
          <h2>Do you want to end now?</h2>
          <p className="extend-modal__lead">Session time is over. End the meeting or extend the duration.</p>
          <div className="external-modal__actions">
            <button type="button" className="external-modal__btn external-modal__btn--danger" onClick={handleEndMeeting}>
              End now
            </button>
            <button type="button" className="external-modal__btn" onClick={handleOpenOptions}>
              Extend duration
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (showAwaiting && activeOffer) {
    const paidCountLabel =
      activeOffer.cost > 0 ? `${paid.length} participant${paid.length === 1 ? '' : 's'} paid` : null
    return (
      <div className="external-modal-backdrop external-modal-backdrop--static" role="dialog" aria-modal>
        <div className="external-modal extend-modal extend-modal--wide">
          <h2>Waiting for payments</h2>
          <p className="extend-modal__lead">
            Extended by {Math.round(activeOffer.durationSec / 60)} min
            {activeOffer.cost > 0 ? ` for $${activeOffer.cost.toFixed(2)}` : ' (free)'}.
            {activeOffer.cost > 0
              ? ' Unpaid participants will be removed when you resume.'
              : ' Click Resume when you are ready to continue.'}
          </p>
          {paidCountLabel ? <p className="extend-modal__paid-count">{paidCountLabel}</p> : null}
          {activeOffer.cost > 0 ? (
            <ul className="extend-modal__paid-list">
              {paid.length === 0 ? (
                <li className="extend-modal__paid-empty">No payments yet…</li>
              ) : (
                paid.map((p) => (
                  <li key={p.userId}>
                    <strong>{p.name}</strong>
                    <span>paid</span>
                  </li>
                ))
              )}
            </ul>
          ) : null}
          <div className="external-modal__actions">
            <button type="button" className="external-modal__btn external-modal__btn--danger" onClick={handleEndMeeting}>
              End meeting
            </button>
            <button type="button" className="external-modal__btn" onClick={handleResume}>
              Resume session
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (!showOptions) return null

  return (
    <div className="external-modal-backdrop" role="dialog" aria-modal aria-labelledby="extend-options-title">
      <div className="external-modal extend-modal extend-modal--wide">
        <h2 id="extend-options-title">Extend this meeting?</h2>
        <p className="extend-modal__lead">Choose how to extend. Everyone stays paused until you resume.</p>

        <div className="extend-options">
          <label className={`extend-option${mode === 'extendFree' ? ' is-active' : ''}${freeExtendUsed ? ' is-disabled' : ''}`}>
            <input
              type="radio"
              name="extend-mode"
              checked={mode === 'extendFree'}
              disabled={freeExtendUsed}
              onChange={() => setMode('extendFree')}
            />
            <span>
              <strong>Extend for free</strong>
              <em>1 minute · only once{freeExtendUsed ? ' (already used)' : ''}</em>
            </span>
          </label>

          <label className={`extend-option${mode === 'extendYou' ? ' is-active' : ''}`}>
            <input type="radio" name="extend-mode" checked={mode === 'extendYou'} onChange={() => setMode('extendYou')} />
            <span>
              <strong>Send payment request to participants</strong>
              <em>Charge attendees; unpaid users leave when you resume</em>
            </span>
          </label>
        </div>

        {mode === 'extendYou' ? (
          <div className="extend-option-fields">
            <div className="extend-field">
              <label className="extend-field__label" htmlFor="extend-cost">
                Cost
              </label>
              <div className="extend-field__control extend-field__control--prefix">
                <span className="extend-field__prefix" aria-hidden>
                  $
                </span>
                <input
                  id="extend-cost"
                  className="extend-field__input"
                  type="number"
                  min={0}
                  step="0.01"
                  inputMode="decimal"
                  placeholder="0.00"
                  value={Number.isFinite(cost) ? cost : ''}
                  onChange={(e) => setCost(parseFloat(e.target.value) || 0)}
                />
              </div>
            </div>
            <div className="extend-field">
              <label className="extend-field__label" htmlFor="extend-minutes">
                Duration
              </label>
              <div className="extend-field__control extend-field__control--select">
                <select
                  id="extend-minutes"
                  className="extend-field__select"
                  value={minutes}
                  onChange={(e) => setMinutes(parseInt(e.target.value, 10) || 10)}
                >
                  {MINUTE_OPTIONS.map((m) => (
                    <option key={m} value={m}>
                      {m} minutes
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        ) : null}

        <div className="external-modal__actions">
          <button type="button" className="external-modal__btn external-modal__btn--danger" onClick={handleEndMeeting}>
            End meeting
          </button>
          <button type="button" className="external-modal__btn" disabled={busy} onClick={() => void handleContinue()}>
            {busy ? 'Saving…' : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  )
}
