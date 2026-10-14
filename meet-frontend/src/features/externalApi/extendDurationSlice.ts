import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import type { ExtendOffer, ExtendPaidParticipant } from './extendDurationTypes'

export type ExtendPaymentStatus = 'none' | 'waiting' | 'success' | 'free' | 'declined'

export type ExtendHostPhase =
  | 'idle'
  | 'expired_prompt'
  | 'options'
  | 'awaiting_payments'

export type ExtendParticipantPhase = 'idle' | 'wait_host' | 'offer' | 'paying'

type ExtendDurationState = {
  hostPhase: ExtendHostPhase
  participantPhase: ExtendParticipantPhase
  paymentStatus: ExtendPaymentStatus
  freeExtendUsed: boolean
  fiveMinuteWarned: boolean
  oneMinuteWarned: boolean
  expireHandled: boolean
  /** Host-only: one-time “5 minutes left” notice modal. */
  fiveMinuteNoticeOpen: boolean
  activeOffer: ExtendOffer | null
  paidParticipants: ExtendPaidParticipant[]
  lastExpireNonce: number | null
}

const initialState: ExtendDurationState = {
  hostPhase: 'idle',
  participantPhase: 'idle',
  paymentStatus: 'none',
  freeExtendUsed: false,
  fiveMinuteWarned: false,
  oneMinuteWarned: false,
  expireHandled: false,
  fiveMinuteNoticeOpen: false,
  activeOffer: null,
  paidParticipants: [],
  lastExpireNonce: null,
}

const extendDurationSlice = createSlice({
  name: 'extendDuration',
  initialState,
  reducers: {
    markOneMinuteWarned: (state) => {
      state.oneMinuteWarned = true
    },
    openFiveMinuteNotice: (state) => {
      if (state.fiveMinuteWarned) return
      state.fiveMinuteWarned = true
      state.fiveMinuteNoticeOpen = true
    },
    closeFiveMinuteNotice: (state) => {
      state.fiveMinuteNoticeOpen = false
    },
    markExpireHandled: (state) => {
      state.expireHandled = true
    },
    clearExpireFlags: (state) => {
      state.expireHandled = false
      state.oneMinuteWarned = false
    },
    /** After a successful extend, allow the 5-minute notice again on the next countdown. */
    resetFiveMinuteWarn: (state) => {
      state.fiveMinuteWarned = false
      state.fiveMinuteNoticeOpen = false
    },
    openHostExpiredPrompt: (state) => {
      state.hostPhase = 'expired_prompt'
      state.expireHandled = true
    },
    openHostOptions: (state) => {
      state.hostPhase = 'options'
    },
    openHostAwaitingPayments: (
      state,
      action: PayloadAction<{ offer: ExtendOffer; paid?: ExtendPaidParticipant[] }>,
    ) => {
      state.hostPhase = 'awaiting_payments'
      state.activeOffer = action.payload.offer
      state.paidParticipants = action.payload.paid ?? []
      state.expireHandled = false
      state.oneMinuteWarned = false
      if (action.payload.offer.cost <= 0) {
        state.paymentStatus = 'free'
      }
    },
    setHostPhaseIdle: (state) => {
      state.hostPhase = 'idle'
      state.activeOffer = null
      state.paidParticipants = []
    },
    openParticipantWaitHost: (state) => {
      state.participantPhase = 'wait_host'
      state.expireHandled = true
      // Do not wipe a successful/free payment for the current offer (resume wait).
      // Fresh expire/host-select paths call this only while status is still none/waiting.
      if (state.paymentStatus !== 'success' && state.paymentStatus !== 'free') {
        state.paymentStatus = 'none'
        state.activeOffer = null
      }
    },
    openParticipantOffer: (state, action: PayloadAction<ExtendOffer>) => {
      const offer = action.payload
      const sameOffer = state.activeOffer?.extendedDurationId === offer.extendedDurationId
      const alreadyPaidThisOffer =
        sameOffer && (state.paymentStatus === 'success' || state.paymentStatus === 'free')
      state.activeOffer = offer
      state.expireHandled = false
      state.oneMinuteWarned = false
      if (offer.cost <= 0) {
        state.paymentStatus = 'free'
        state.participantPhase = 'wait_host'
      } else if (alreadyPaidThisOffer) {
        state.participantPhase = 'wait_host'
        // keep paymentStatus success/free
      } else if (sameOffer && state.participantPhase === 'paying') {
        // Keep payment modal flow open; don't reopen accept dialog on paid-list sync
        state.paymentStatus = 'waiting'
      } else {
        state.paymentStatus = 'waiting'
        state.participantPhase = 'offer'
      }
    },
    setParticipantPhaseIdle: (state) => {
      state.participantPhase = 'idle'
    },
    /** After host resumes (paid/free stay): clear participant extend UI state. */
    clearParticipantExtendFlow: (state) => {
      state.participantPhase = 'idle'
      state.paymentStatus = 'none'
      state.activeOffer = null
    },
    openParticipantPaying: (state) => {
      state.participantPhase = 'paying'
    },
    openParticipantOfferAgain: (state) => {
      if (state.activeOffer && state.activeOffer.cost > 0 && state.paymentStatus === 'waiting') {
        state.participantPhase = 'offer'
      }
    },
    setPaymentStatus: (state, action: PayloadAction<ExtendPaymentStatus>) => {
      state.paymentStatus = action.payload
    },
    markExtensionPaymentSuccess: (state) => {
      state.paymentStatus = 'success'
      state.participantPhase = 'wait_host'
    },
    markFreeExtendUsed: (state) => {
      state.freeExtendUsed = true
    },
    setPaidParticipants: (state, action: PayloadAction<ExtendPaidParticipant[]>) => {
      state.paidParticipants = action.payload
    },
    upsertPaidParticipant: (state, action: PayloadAction<ExtendPaidParticipant>) => {
      const idx = state.paidParticipants.findIndex((p) => p.userId === action.payload.userId)
      if (idx >= 0) state.paidParticipants[idx] = action.payload
      else state.paidParticipants.push(action.payload)
    },
    setLastExpireNonce: (state, action: PayloadAction<number | null>) => {
      state.lastExpireNonce = action.payload
    },
    resetExtendDuration: () => initialState,
  },
})

export const {
  markOneMinuteWarned,
  openFiveMinuteNotice,
  closeFiveMinuteNotice,
  markExpireHandled,
  clearExpireFlags,
  resetFiveMinuteWarn,
  openHostExpiredPrompt,
  openHostOptions,
  openHostAwaitingPayments,
  setHostPhaseIdle,
  openParticipantWaitHost,
  openParticipantOffer,
  setParticipantPhaseIdle,
  clearParticipantExtendFlow,
  openParticipantPaying,
  openParticipantOfferAgain,
  setPaymentStatus,
  markExtensionPaymentSuccess,
  markFreeExtendUsed,
  setPaidParticipants,
  upsertPaidParticipant,
  setLastExpireNonce,
  resetExtendDuration,
} = extendDurationSlice.actions

export const selectExtendHostPhase = (s: RootState) => s.extendDuration.hostPhase
export const selectExtendParticipantPhase = (s: RootState) => s.extendDuration.participantPhase
export const selectExtendPaymentStatus = (s: RootState) => s.extendDuration.paymentStatus
export const selectExtendFreeExtendUsed = (s: RootState) => s.extendDuration.freeExtendUsed
export const selectExtendFiveMinuteWarned = (s: RootState) => s.extendDuration.fiveMinuteWarned
export const selectExtendFiveMinuteNoticeOpen = (s: RootState) => s.extendDuration.fiveMinuteNoticeOpen
export const selectExtendOneMinuteWarned = (s: RootState) => s.extendDuration.oneMinuteWarned
export const selectExtendExpireHandled = (s: RootState) => s.extendDuration.expireHandled
export const selectExtendActiveOffer = (s: RootState) => s.extendDuration.activeOffer
export const selectExtendPaidParticipants = (s: RootState) => s.extendDuration.paidParticipants
export const selectExtendLastExpireNonce = (s: RootState) => s.extendDuration.lastExpireNonce

export default extendDurationSlice.reducer
