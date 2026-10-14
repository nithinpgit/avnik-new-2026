import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import type { AdmissionStatus, JoinRequest } from './waitingRoomTypes'

type WaitingRoomState = {
  admissionStatus: AdmissionStatus
  waitMessage: string | null
  pendingRequests: JoinRequest[]
  activeRequestUserId: string | null
  autoAcceptAll: boolean
  blockConfirmTarget: JoinRequest | null
}

const initialState: WaitingRoomState = {
  admissionStatus: 'idle',
  waitMessage: null,
  pendingRequests: [],
  activeRequestUserId: null,
  autoAcceptAll: false,
  blockConfirmTarget: null,
}

const waitingRoomSlice = createSlice({
  name: 'waitingRoom',
  initialState,
  reducers: {
    setAdmissionPending: (state, action: PayloadAction<{ message: string }>) => {
      state.admissionStatus = 'pending'
      state.waitMessage = action.payload.message
    },
    setAdmissionAdmitted: (state) => {
      state.admissionStatus = 'admitted'
      state.waitMessage = null
    },
    setAdmissionDenied: (state, action: PayloadAction<{ message: string; blocked?: boolean }>) => {
      state.admissionStatus = action.payload.blocked ? 'blocked' : 'denied'
      state.waitMessage = action.payload.message
    },
    setJoinBlocked: (state, action: PayloadAction<{ message: string }>) => {
      state.admissionStatus = 'blocked'
      state.waitMessage = action.payload.message
    },
    enqueueJoinRequest: (state, action: PayloadAction<JoinRequest>) => {
      if (state.pendingRequests.some((r) => r.userId === action.payload.userId)) return
      state.pendingRequests.push(action.payload)
      if (!state.activeRequestUserId) {
        state.activeRequestUserId = action.payload.userId
      }
    },
    dequeueJoinRequest: (state, action: PayloadAction<string>) => {
      state.pendingRequests = state.pendingRequests.filter((r) => r.userId !== action.payload)
      if (state.activeRequestUserId === action.payload) {
        state.activeRequestUserId = state.pendingRequests[0]?.userId ?? null
      }
    },
    setAutoAcceptAll: (state, action: PayloadAction<boolean>) => {
      state.autoAcceptAll = action.payload
    },
    openBlockConfirm: (state, action: PayloadAction<JoinRequest>) => {
      state.blockConfirmTarget = action.payload
    },
    closeBlockConfirm: (state) => {
      state.blockConfirmTarget = null
    },
    resetWaitingRoom: () => initialState,
  },
})

export const {
  setAdmissionPending,
  setAdmissionAdmitted,
  setAdmissionDenied,
  setJoinBlocked,
  enqueueJoinRequest,
  dequeueJoinRequest,
  setAutoAcceptAll,
  openBlockConfirm,
  closeBlockConfirm,
  resetWaitingRoom,
} = waitingRoomSlice.actions

export const selectAdmissionStatus = (state: RootState) => state.waitingRoom.admissionStatus
export const selectAdmissionWaitMessage = (state: RootState) => state.waitingRoom.waitMessage
export const selectActiveJoinRequest = (state: RootState) => {
  const { pendingRequests, activeRequestUserId } = state.waitingRoom
  return pendingRequests.find((r) => r.userId === activeRequestUserId) ?? null
}
export const selectAutoAcceptAll = (state: RootState) => state.waitingRoom.autoAcceptAll
export const selectBlockConfirmTarget = (state: RootState) => state.waitingRoom.blockConfirmTarget

export default waitingRoomSlice.reducer
