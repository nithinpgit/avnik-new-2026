import { useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { store } from '../../app/store'
import { pushToast } from '../documents/notificationsSlice'
import { useIsMeetingHost } from '../meeting/useIsMeetingHost'
import {
  selectMeetingDisplayName,
  selectMeetingUserId,
} from '../meetingSession/meetingSessionSlice'
import { selectMeetingStatus } from '../meeting/meetingLifecycleSlice'
import { useMeetingSocket } from '../meetingRoom/MeetingSocketProvider'
import { MEETING_REDIRECT_URL } from '../../config'
import {
  selectExternalInitialDurationSec,
  selectExternalTotalDurationSec,
  selectExternalQuickMeet,
  addExtendedDurationSec,
  setTotalDurationSec,
  setExtendedDurationId,
  setAmountDue,
} from './externalMeetingSlice'
import { openExtendModal, closeExtendModal } from './externalModalsSlice'
import { handlePostMeetingEnd } from './handlePostMeetingEnd'
import { useMeetingElapsedSeconds } from '../meeting/useMeetingElapsedSeconds'
import { EXTEND_REMAINING_THRESHOLD_SEC } from '../meeting/useMeetingElapsedLabel'
import {
  EXTEND_DURATION_CHANNEL,
  EMPTY_EXTEND_SYNC,
  parseExtendDurationSync,
  type ExtendDurationSyncPayload,
} from './extendDurationTypes'
import {
  markOneMinuteWarned,
  openFiveMinuteNotice,
  markExpireHandled,
  openHostExpiredPrompt,
  openHostOptions,
  openHostAwaitingPayments,
  setHostPhaseIdle,
  openParticipantWaitHost,
  openParticipantOffer,
  clearParticipantExtendFlow,
  setPaidParticipants,
  upsertPaidParticipant,
  setLastExpireNonce,
  clearExpireFlags,
  resetFiveMinuteWarn,
  selectExtendHostPhase,
  selectExtendParticipantPhase,
  selectExtendPaymentStatus,
  selectExtendOneMinuteWarned,
  selectExtendFiveMinuteWarned,
  selectExtendExpireHandled,
  selectExtendLastExpireNonce,
  selectExtendActiveOffer,
} from './extendDurationSlice'

/** Host 5-minute notice window: under 5 min and over 2 min remaining. */
const FIVE_MINUTE_NOTICE_MAX_SEC = 5 * 60
const FIVE_MINUTE_NOTICE_MIN_SEC = 2 * 60

function readSync(): ExtendDurationSyncPayload {
  return parseExtendDurationSync(store.getState().roomSync.channels[EXTEND_DURATION_CHANNEL])
}

/** True if this participant may stay when the host resumes a paid extension. */
function participantHasPaidForExtend(userId: string | null): boolean {
  const ext = store.getState().extendDuration
  if (ext.paymentStatus === 'success' || ext.paymentStatus === 'free') return true
  if (!userId) return false
  const uid = String(userId)
  if (ext.paidParticipants.some((p) => String(p.userId) === uid)) return true
  const sync = readSync()
  return sync.paid.some((p) => String(p.userId) === uid)
}

/** Watches timer expiry, room_sync extend docs, and resume-kick for unpaid attendees. */
export function ExtendDurationBridge() {
  const dispatch = useAppDispatch()
  const { pauseMeeting, emitRoomSync } = useMeetingSocket()
  const isHost = useIsMeetingHost()
  const meetingStatus = useAppSelector(selectMeetingStatus)
  const quickMeet = useAppSelector(selectExternalQuickMeet)
  const totalDurationSec = useAppSelector(selectExternalTotalDurationSec)
  const initialDurationSec = useAppSelector(selectExternalInitialDurationSec)
  const sessionElapsed = useMeetingElapsedSeconds()
  const effectiveElapsed = Math.max(sessionElapsed, initialDurationSec)
  const remainingSec = Math.max(0, totalDurationSec - effectiveElapsed)

  const oneMinuteWarned = useAppSelector(selectExtendOneMinuteWarned)
  const fiveMinuteWarned = useAppSelector(selectExtendFiveMinuteWarned)
  const expireHandled = useAppSelector(selectExtendExpireHandled)
  const paymentStatus = useAppSelector(selectExtendPaymentStatus)
  const lastExpireNonce = useAppSelector(selectExtendLastExpireNonce)
  const hostPhase = useAppSelector(selectExtendHostPhase)
  const participantPhase = useAppSelector(selectExtendParticipantPhase)
  const activeOffer = useAppSelector(selectExtendActiveOffer)
  const userId = useAppSelector(selectMeetingUserId)
  const displayName = useAppSelector(selectMeetingDisplayName)

  const syncRaw = useAppSelector((s) => s.roomSync.channels[EXTEND_DURATION_CHANNEL])
  const pausingRef = useRef(false)
  const prevStatusRef = useRef(meetingStatus)
  const appliedOfferIdRef = useRef<number | null>(null)

  // 5-minute host notice (once) — between 5 and 2 minutes remaining
  useEffect(() => {
    if (quickMeet) return
    if (!isHost || meetingStatus !== 'started' || fiveMinuteWarned) return
    if (remainingSec < FIVE_MINUTE_NOTICE_MAX_SEC && remainingSec > FIVE_MINUTE_NOTICE_MIN_SEC) {
      dispatch(openFiveMinuteNotice())
    }
  }, [quickMeet, isHost, meetingStatus, remainingSec, fiveMinuteWarned, dispatch])

  // After extend: remaining jumps above 5 min — allow notice again next cycle
  useEffect(() => {
    if (!fiveMinuteWarned) return
    if (remainingSec >= FIVE_MINUTE_NOTICE_MAX_SEC) {
      dispatch(resetFiveMinuteWarn())
    }
  }, [remainingSec, fiveMinuteWarned, dispatch])

  // 1-minute warning (host toast) — skipped for quick meet
  useEffect(() => {
    if (quickMeet) return
    if (!isHost || meetingStatus !== 'started' || oneMinuteWarned) return
    if (remainingSec > 0 && remainingSec < EXTEND_REMAINING_THRESHOLD_SEC) {
      dispatch(markOneMinuteWarned())
      dispatch(
        pushToast({ message: 'You only have 1 minute left in this session.', variant: 'info' }),
      )
    }
  }, [quickMeet, isHost, meetingStatus, remainingSec, oneMinuteWarned, dispatch])

  // Auto-expire → pause + host/participant prompts — skipped for quick meet
  useEffect(() => {
    if (quickMeet) return
    if (meetingStatus !== 'started' || expireHandled || totalDurationSec <= 0) return
    if (remainingSec > 0) return
    if (pausingRef.current) return
    pausingRef.current = true

    dispatch(markExpireHandled())
    pauseMeeting()

    const nonce = Date.now()
    const prev = readSync()
    emitRoomSync(EXTEND_DURATION_CHANNEL, {
      ...prev,
      expireNonce: nonce,
      hostSelecting: true,
      offer: null,
      paid: [],
      clearedAt: null,
    } satisfies ExtendDurationSyncPayload)
    dispatch(setLastExpireNonce(nonce))

    if (isHost) dispatch(openHostExpiredPrompt())
    else dispatch(openParticipantWaitHost())

    window.setTimeout(() => {
      pausingRef.current = false
    }, 1500)
  }, [
    quickMeet,
    meetingStatus,
    remainingSec,
    expireHandled,
    totalDurationSec,
    isHost,
    pauseMeeting,
    emitRoomSync,
    dispatch,
  ])

  // Apply room_sync extend document
  useEffect(() => {
    if (quickMeet) return
    const sync = parseExtendDurationSync(syncRaw)
    const timeAlmostUp = remainingSec < EXTEND_REMAINING_THRESHOLD_SEC

    if (sync.expireNonce != null && sync.expireNonce !== lastExpireNonce) {
      dispatch(setLastExpireNonce(sync.expireNonce))
      // Stale expire from a previous run (e.g. reload after extension) — ignore UI
      if (!timeAlmostUp) {
        dispatch(clearExpireFlags())
        if (isHost && (hostPhase === 'expired_prompt' || hostPhase === 'options')) {
          dispatch(setHostPhaseIdle())
          dispatch(closeExtendModal())
        }
        if (!isHost && participantPhase === 'wait_host' && paymentStatus === 'none') {
          dispatch(clearParticipantExtendFlow())
        }
      } else {
        dispatch(markExpireHandled())
        if (!isHost) {
          dispatch(openParticipantWaitHost())
        } else if (hostPhase === 'idle') {
          if (meetingStatus === 'started') pauseMeeting()
          dispatch(openHostExpiredPrompt())
        }
      }
    }

    if ((sync.hostSelecting || sync.offer) && !isHost) {
      if (participantPhase === 'idle' && !sync.offer) {
        // Only wait-for-host when time is actually up / last minute
        if (timeAlmostUp) dispatch(openParticipantWaitHost())
      }
    }

    if (sync.offer) {
      // Stale paid-list patches can revive an offer after host resume — ignore when cleared.
      if (sync.clearedAt) {
        if (sync.offer.totalDurationSec > 0) {
          dispatch(setTotalDurationSec(sync.offer.totalDurationSec))
        }
        return
      }

      dispatch(setExtendedDurationId(sync.offer.extendedDurationId))
      dispatch(setPaidParticipants(sync.paid))
      if (sync.offer.totalDurationSec > 0) {
        dispatch(setTotalDurationSec(sync.offer.totalDurationSec))
      }

      if (isHost) {
        // Meeting already live again — do not re-pause for a stale offer document.
        if (meetingStatus === 'started' && hostPhase === 'idle') {
          emitRoomSync(EXTEND_DURATION_CHANNEL, {
            ...EMPTY_EXTEND_SYNC,
            expireNonce: lastExpireNonce ?? sync.expireNonce,
            clearedAt: new Date().toISOString(),
          })
          return
        }
        if (hostPhase !== 'awaiting_payments') {
          if (meetingStatus === 'started') pauseMeeting()
          dispatch(openHostAwaitingPayments({ offer: sync.offer, paid: sync.paid }))
        } else {
          dispatch(setPaidParticipants(sync.paid))
        }
      } else if (meetingStatus === 'started') {
        // Session already resumed — never show offer / wait-for-resume chrome.
        if (participantHasPaidForExtend(userId) || paymentStatus === 'success' || paymentStatus === 'free') {
          dispatch(clearParticipantExtendFlow())
        }
      } else {
        const offerId = sync.offer.extendedDurationId
        if (appliedOfferIdRef.current !== offerId) {
          appliedOfferIdRef.current = offerId
          if (!(sync.offer.totalDurationSec > 0)) {
            dispatch(addExtendedDurationSec(sync.offer.durationSec))
          }
        }
        dispatch(openParticipantOffer(sync.offer))
        if (sync.offer.cost > 0) dispatch(setAmountDue(sync.offer.cost))
      }
    }
  }, [
    quickMeet,
    syncRaw,
    isHost,
    meetingStatus,
    lastExpireNonce,
    hostPhase,
    participantPhase,
    paymentStatus,
    remainingSec,
    pauseMeeting,
    emitRoomSync,
    userId,
    dispatch,
  ])

  // After reload/extension: if plenty of time remains, dismiss stale end/extend popup
  useEffect(() => {
    if (quickMeet || !isHost) return
    if (remainingSec < EXTEND_REMAINING_THRESHOLD_SEC) return
    if (hostPhase === 'awaiting_payments' && activeOffer) return
    if (hostPhase !== 'expired_prompt' && hostPhase !== 'options') return

    dispatch(setHostPhaseIdle())
    dispatch(closeExtendModal())
    dispatch(clearExpireFlags())

    const prev = readSync()
    if (prev.hostSelecting && !prev.offer) {
      emitRoomSync(EXTEND_DURATION_CHANNEL, {
        ...prev,
        hostSelecting: false,
        clearedAt: new Date().toISOString(),
      })
    }
  }, [
    quickMeet,
    isHost,
    remainingSec,
    hostPhase,
    activeOffer,
    emitRoomSync,
    dispatch,
  ])

  // On transition paused → started: clear host extend UI / kick unpaid only
  useEffect(() => {
    if (quickMeet) return
    const prev = prevStatusRef.current
    prevStatusRef.current = meetingStatus
    if (prev !== 'paused' || meetingStatus !== 'started') return

    const offer = store.getState().extendDuration.activeOffer
    const sync = readSync()
    const effectiveOffer = offer ?? sync.offer

    if (isHost) {
      dispatch(setHostPhaseIdle())
      dispatch(closeExtendModal())
      emitRoomSync(EXTEND_DURATION_CHANNEL, {
        ...EMPTY_EXTEND_SYNC,
        expireNonce: lastExpireNonce,
        clearedAt: new Date().toISOString(),
      })
      return
    }

    // Paid / free participants stay; unpaid leave via rating/tip then home redirect.
    if (effectiveOffer && effectiveOffer.cost > 0 && !participantHasPaidForExtend(userId)) {
      dispatch(clearParticipantExtendFlow())
      dispatch(
        pushToast({
          message: 'Session resumed. Payment was required to continue.',
          variant: 'error',
        }),
      )
      handlePostMeetingEnd(dispatch, MEETING_REDIRECT_URL || '/')
      return
    }

    dispatch(clearParticipantExtendFlow())
  }, [
    quickMeet,
    meetingStatus,
    isHost,
    userId,
    paymentStatus,
    participantPhase,
    lastExpireNonce,
    emitRoomSync,
    dispatch,
  ])

  // Fallback: if the meeting is live again after a free/paid extension, always dismiss wait UI
  // (pause→start transition can be missed if the peer never observed "paused").
  useEffect(() => {
    if (quickMeet || isHost) return
    if (meetingStatus !== 'started') return
    if (participantPhase === 'idle') return
    if (paymentStatus === 'free' || paymentStatus === 'success' || participantHasPaidForExtend(userId)) {
      dispatch(clearParticipantExtendFlow())
    }
  }, [quickMeet, isHost, meetingStatus, participantPhase, paymentStatus, userId, dispatch])

  // When host clears the extend doc after resume, drop participant wait/offer chrome
  useEffect(() => {
    if (quickMeet || isHost) return
    const sync = parseExtendDurationSync(syncRaw)
    if (!sync.clearedAt) return
    if (participantPhase === 'idle') return
    // Unpaid still on offer/pay — kick is handled on resume transition.
    if (!participantHasPaidForExtend(userId) && (paymentStatus === 'waiting' || paymentStatus === 'none')) {
      return
    }
    if (participantHasPaidForExtend(userId) || paymentStatus === 'free' || paymentStatus === 'success') {
      dispatch(clearParticipantExtendFlow())
    }
  }, [quickMeet, isHost, syncRaw, participantPhase, paymentStatus, userId, dispatch])

  // Publish local payment success into shared paid list (never revive a cleared offer).
  useEffect(() => {
    if (quickMeet) return
    if (paymentStatus !== 'success' || !userId || !activeOffer) return
    const prev = readSync()
    if (!prev.offer || prev.clearedAt) return
    if (prev.offer.extendedDurationId !== activeOffer.extendedDurationId) return
    if (prev.paid.some((p) => String(p.userId) === String(userId))) return
    const entry = {
      userId: String(userId),
      name: displayName || 'Participant',
      at: new Date().toISOString(),
    }
    dispatch(upsertPaidParticipant(entry))
    emitRoomSync(EXTEND_DURATION_CHANNEL, {
      ...prev,
      paid: [...prev.paid.filter((p) => String(p.userId) !== String(userId)), entry],
    })
  }, [quickMeet, paymentStatus, userId, displayName, activeOffer, emitRoomSync, dispatch])

  // When host enters extend UI, force a room-wide pause (only the host can pause).
  useEffect(() => {
    if (quickMeet || !isHost) return
    if (hostPhase !== 'expired_prompt' && hostPhase !== 'options' && hostPhase !== 'awaiting_payments') {
      return
    }
    if (store.getState().meetingLifecycle.status === 'started') {
      pauseMeeting()
    }
  }, [quickMeet, isHost, hostPhase, pauseMeeting])

  // If the meeting is running with no time left (e.g. host hit play without extending), re-enter expire flow
  useEffect(() => {
    if (quickMeet) return
    if (meetingStatus !== 'started' || remainingSec > 0 || totalDurationSec <= 0) return
    if (hostPhase === 'awaiting_payments' || hostPhase === 'expired_prompt' || hostPhase === 'options') return
    if (pausingRef.current) return
    pausingRef.current = true
    if (isHost) {
      pauseMeeting()
      dispatch(openHostExpiredPrompt())
    } else {
      dispatch(openParticipantWaitHost())
    }
    window.setTimeout(() => {
      pausingRef.current = false
    }, 1500)
  }, [
    quickMeet,
    meetingStatus,
    remainingSec,
    totalDurationSec,
    hostPhase,
    isHost,
    pauseMeeting,
    dispatch,
  ])

  return null
}

/** Host clicks “+” — only in the last minute; pause everyone, then open extend options. */
export function useHostOpenExtendFlow() {
  const dispatch = useAppDispatch()
  const { pauseMeeting, emitRoomSync } = useMeetingSocket()
  const quickMeet = useAppSelector(selectExternalQuickMeet)
  const totalDurationSec = useAppSelector(selectExternalTotalDurationSec)
  const initialDurationSec = useAppSelector(selectExternalInitialDurationSec)
  const sessionElapsed = useMeetingElapsedSeconds()

  return () => {
    if (quickMeet) return
    const effectiveElapsed = Math.max(sessionElapsed, initialDurationSec)
    const remainingSec = Math.max(0, totalDurationSec - effectiveElapsed)
    // totalDuration - currentDuration must be < 1 minute
    if (remainingSec >= EXTEND_REMAINING_THRESHOLD_SEC) {
      dispatch(
        pushToast({
          message: 'Extend is available only when less than 1 minute remains.',
          variant: 'info',
        }),
      )
      return
    }
    if (store.getState().meetingLifecycle.status === 'started') {
      pauseMeeting()
    }
    const prev = readSync()
    emitRoomSync(EXTEND_DURATION_CHANNEL, {
      ...prev,
      hostSelecting: true,
      offer: null,
      paid: [],
      clearedAt: null,
    })
    dispatch(openHostOptions())
    dispatch(openExtendModal())
  }
}
