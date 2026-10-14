import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'

export type PaymentModalMode = 'booking' | 'extension' | 'tip'

export type PendingReviewPayload = {
  comment: string
  rating: number
  eventId: number | string
  slotId: number | string
  hostId: number | string
}

type ExternalModalsState = {
  paymentOpen: boolean
  reviewOpen: boolean
  extendOpen: boolean
  paymentMode: PaymentModalMode
  tipAmount: number
  pendingReview: PendingReviewPayload | null
  postMeetingRedirectUrl: string | null
  postMeetingReviewRequested: boolean
  /**
   * Viewer left the live session (unpaid kick / voluntary leave) but stays on
   * the page for rating/tip. Disconnect media + signaling while this is true.
   */
  sessionLeftForReview: boolean
}

const initialState: ExternalModalsState = {
  paymentOpen: false,
  reviewOpen: false,
  extendOpen: false,
  paymentMode: 'booking',
  tipAmount: 0,
  pendingReview: null,
  postMeetingRedirectUrl: null,
  postMeetingReviewRequested: false,
  sessionLeftForReview: false,
}

const externalModalsSlice = createSlice({
  name: 'externalModals',
  initialState,
  reducers: {
    openPaymentModal: (state, action: PayloadAction<{ mode?: PaymentModalMode } | undefined>) => {
      state.paymentOpen = true
      state.paymentMode = action.payload?.mode ?? 'booking'
      state.pendingReview = null
      state.tipAmount = 0
    },
    openPaymentModalForTip: (
      state,
      action: PayloadAction<{ pendingReview: PendingReviewPayload; tipAmount: number }>,
    ) => {
      state.reviewOpen = false
      state.paymentOpen = true
      state.paymentMode = 'tip'
      state.pendingReview = action.payload.pendingReview
      state.tipAmount = action.payload.tipAmount
    },
    closePaymentModal: (state) => {
      state.paymentOpen = false
      state.paymentMode = 'booking'
      state.pendingReview = null
      state.tipAmount = 0
    },
    beginPostMeetingReview: (state, action: PayloadAction<{ redirectUrl?: string } | undefined>) => {
      if (action.payload?.redirectUrl?.trim()) {
        state.postMeetingRedirectUrl = action.payload.redirectUrl.trim()
      }
      state.sessionLeftForReview = true
      if (state.postMeetingReviewRequested) {
        state.reviewOpen = true
        return
      }
      state.postMeetingReviewRequested = true
      state.reviewOpen = true
    },
    setPostMeetingRedirectUrl: (state, action: PayloadAction<string | undefined>) => {
      const next = action.payload?.trim()
      if (next) state.postMeetingRedirectUrl = next
    },
    closeReviewModal: (state) => {
      state.reviewOpen = false
    },
    clearPostMeetingFlow: (state) => {
      state.reviewOpen = false
      state.paymentOpen = false
      state.paymentMode = 'booking'
      state.pendingReview = null
      state.tipAmount = 0
      state.postMeetingRedirectUrl = null
      state.postMeetingReviewRequested = false
      state.sessionLeftForReview = false
    },
    openExtendModal: (state) => {
      state.extendOpen = true
    },
    closeExtendModal: (state) => {
      state.extendOpen = false
    },
  },
})

export const {
  openPaymentModal,
  openPaymentModalForTip,
  closePaymentModal,
  beginPostMeetingReview,
  setPostMeetingRedirectUrl,
  closeReviewModal,
  clearPostMeetingFlow,
  openExtendModal,
  closeExtendModal,
} = externalModalsSlice.actions

export const selectPaymentModalOpen = (state: RootState) => state.externalModals.paymentOpen
export const selectReviewModalOpen = (state: RootState) => state.externalModals.reviewOpen
export const selectExtendModalOpen = (state: RootState) => state.externalModals.extendOpen
export const selectPaymentModalMode = (state: RootState) => state.externalModals.paymentMode
export const selectTipAmount = (state: RootState) => state.externalModals.tipAmount
export const selectPendingReview = (state: RootState) => state.externalModals.pendingReview
export const selectPostMeetingRedirectUrl = (state: RootState) => state.externalModals.postMeetingRedirectUrl
export const selectSessionLeftForReview = (state: RootState) => state.externalModals.sessionLeftForReview

export default externalModalsSlice.reducer
