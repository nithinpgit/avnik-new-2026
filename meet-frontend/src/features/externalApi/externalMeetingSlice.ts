import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import type { ExternalMeetingMode, ExternalMeetingRoomData } from '../externalApi/types'

export type ExternalAuthStatus = 'idle' | 'loading' | 'authenticated' | 'unauthorized' | 'dev_bypass'

export type ExternalMeetingState = {
  authStatus: ExternalAuthStatus
  authError: string | null
  /** From POST /meetingRoom `mode` — authoritative presenter/viewer role. */
  externalMode: ExternalMeetingMode | null
  event: ExternalMeetingRoomData | null
  /** Whether attendee must pay before entering. */
  paymentRequired: boolean
  /** Amount due before join (USD). */
  amountDue: number
  /** Active extension id for attendee payment flow. */
  extendedDurationId: number | false | null
  /** Total allowed session seconds (base + extensions). */
  totalDurationSec: number
  /** Elapsed seconds from API on load. */
  initialDurationSec: number
}

const initialState: ExternalMeetingState = {
  authStatus: 'idle',
  authError: null,
  externalMode: null,
  event: null,
  paymentRequired: false,
  amountDue: 0,
  extendedDurationId: null,
  totalDurationSec: 3600,
  initialDurationSec: 0,
}

/** avnik quick meet sessions are capped at 40 minutes. */
export const QUICK_MEET_MAX_DURATION_SEC = 40 * 60

function parseDurationToSeconds(value: number | string | undefined): number {
  if (value == null) return 3600
  if (typeof value === 'number') return value * 60
  const parts = String(value).split(':').map((p) => parseInt(p, 10))
  if (parts.length >= 2) {
    return (parts[0] || 0) * 3600 + (parts[1] || 0) * 60 + (parts[2] || 0)
  }
  const n = parseInt(String(value), 10)
  return Number.isFinite(n) ? n * 60 : 3600
}

function computeTotalDurationSec(event: ExternalMeetingRoomData): number {
  if (event.quickMeet) return QUICK_MEET_MAX_DURATION_SEC
  const slot = event.eventTimeSlot
  const base = parseDurationToSeconds(slot?.duration ?? event.duration)
  const extended = parseInt(String(event.extendedDuration ?? 0), 10)
  return base + (Number.isFinite(extended) ? extended : 0)
}

const externalMeetingSlice = createSlice({
  name: 'externalMeeting',
  initialState,
  reducers: {
    externalAuthStarted: (state) => {
      state.authStatus = 'loading'
      state.authError = null
    },
    externalAuthSucceeded: (state, action: PayloadAction<ExternalMeetingRoomData>) => {
      const event = action.payload
      state.authStatus = 'authenticated'
      state.authError = null
      state.externalMode = event.mode === 'presenter' ? 'presenter' : 'viewer'
      state.event = event
      state.totalDurationSec = computeTotalDurationSec(event)
      state.initialDurationSec = event.eventTimeSlot?.currentDuration ?? 0
      state.extendedDurationId = event.extendedDurationId ?? null

      const remaining = parseFloat(String(event.remainingCost ?? 0))
      state.amountDue = Number.isFinite(remaining) ? remaining : 0
      // Match avnik_old: Stripe only when there is an amount to pay (onPayentPop skips modal when amountToPay === 0).
      state.paymentRequired = event.mode !== 'presenter' && state.amountDue > 0
    },
    externalAuthDevBypass: (state, action: PayloadAction<ExternalMeetingMode | undefined>) => {
      state.authStatus = 'dev_bypass'
      state.authError = null
      state.externalMode = action.payload ?? null
    },
    externalAuthFailed: (state, action: PayloadAction<string>) => {
      state.authStatus = 'unauthorized'
      state.authError = action.payload
    },
    setPaymentRequired: (state, action: PayloadAction<boolean>) => {
      state.paymentRequired = action.payload
    },
    setAmountDue: (state, action: PayloadAction<number>) => {
      state.amountDue = action.payload
    },
    setExtendedDurationId: (state, action: PayloadAction<number | false | null>) => {
      state.extendedDurationId = action.payload
    },
    addExtendedDurationSec: (state, action: PayloadAction<number>) => {
      const add = Number(action.payload)
      if (Number.isFinite(add) && add > 0) {
        state.totalDurationSec += add
      }
    },
    /** Raise allowed session length to an absolute total (never shrink). */
    setTotalDurationSec: (state, action: PayloadAction<number>) => {
      const next = Number(action.payload)
      if (Number.isFinite(next) && next > state.totalDurationSec) {
        state.totalDurationSec = next
      }
    },
    resetExternalMeeting: () => initialState,
  },
})

export const {
  externalAuthStarted,
  externalAuthSucceeded,
  externalAuthDevBypass,
  externalAuthFailed,
  setPaymentRequired,
  setAmountDue,
  setExtendedDurationId,
  addExtendedDurationSec,
  setTotalDurationSec,
  resetExternalMeeting,
} = externalMeetingSlice.actions

export const selectExternalMeeting = (state: RootState) => state.externalMeeting
export const selectExternalAuthStatus = (state: RootState) => state.externalMeeting.authStatus
export const selectExternalEvent = (state: RootState) => state.externalMeeting.event
export const selectExternalMeetingMode = (state: RootState): ExternalMeetingMode | null =>
  state.externalMeeting.externalMode ?? state.externalMeeting.event?.mode ?? null
export const selectExternalQuickMeet = (state: RootState) => state.externalMeeting.event?.quickMeet === true
export const selectExternalPaymentRequired = (state: RootState) => state.externalMeeting.paymentRequired
export const selectExternalAmountDue = (state: RootState) => state.externalMeeting.amountDue
export const selectExternalTotalDurationSec = (state: RootState) => state.externalMeeting.totalDurationSec
export const selectExternalInitialDurationSec = (state: RootState) => state.externalMeeting.initialDurationSec
export const selectExternalExtendedDurationId = (state: RootState) => state.externalMeeting.extendedDurationId
export const selectExternalAuthReady = (state: RootState) =>
  state.externalMeeting.authStatus === 'authenticated' ||
  state.externalMeeting.authStatus === 'dev_bypass'

export default externalMeetingSlice.reducer
