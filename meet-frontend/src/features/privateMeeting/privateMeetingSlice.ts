import { createSlice, createSelector, type PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import {
  EMPTY_PRIVATE_MEETING_SYNC,
  parsePrivateMeetingSync,
  PRIVATE_MEETING_CHANNEL,
  type PrivateMeetingModalState,
} from './privateMeetingTypes'

export type PrivateMeetingLocalState = {
  partnerId: string | null
  savedMicEnabled: boolean
  savedCamEnabled: boolean
  pendingPartnerId: string | null
}

const initialLocal: PrivateMeetingLocalState = {
  partnerId: null,
  savedMicEnabled: true,
  savedCamEnabled: true,
  pendingPartnerId: null,
}

type PrivateMeetingSliceState = {
  modal: PrivateMeetingModalState | null
  local: PrivateMeetingLocalState
}

const initialState: PrivateMeetingSliceState = {
  modal: null,
  local: initialLocal,
}

const privateMeetingSlice = createSlice({
  name: 'privateMeeting',
  initialState,
  reducers: {
    showPrivateMeetingModal(state, action: PayloadAction<PrivateMeetingModalState>) {
      state.modal = action.payload
    },
    dismissPrivateMeetingModal(state) {
      state.modal = null
    },
    setPrivateMeetingPartner(
      state,
      action: PayloadAction<{
        partnerId: string
        savedMicEnabled: boolean
        savedCamEnabled: boolean
      }>,
    ) {
      state.local.partnerId = action.payload.partnerId
      state.local.savedMicEnabled = action.payload.savedMicEnabled
      state.local.savedCamEnabled = action.payload.savedCamEnabled
      state.local.pendingPartnerId = null
    },
    clearPrivateMeetingPartner(state) {
      state.local.partnerId = null
      state.local.pendingPartnerId = null
    },
    setPrivateMeetingPendingPartner(state, action: PayloadAction<string | null>) {
      state.local.pendingPartnerId = action.payload
    },
    resetPrivateMeeting(state) {
      state.modal = null
      state.local = initialLocal
    },
  },
})

export const {
  showPrivateMeetingModal,
  dismissPrivateMeetingModal,
  setPrivateMeetingPartner,
  clearPrivateMeetingPartner,
  setPrivateMeetingPendingPartner,
  resetPrivateMeeting,
} = privateMeetingSlice.actions

export default privateMeetingSlice.reducer

export const selectPrivateMeetingModal = (s: RootState) => s.privateMeeting.modal

export const selectPrivateMeetingLocal = (s: RootState) => s.privateMeeting.local

export const selectPrivateMeetingPartnerId = (s: RootState) => s.privateMeeting.local.partnerId

export const selectPrivateMeetingSync = createSelector(
  [(s: RootState) => s.roomSync.channels[PRIVATE_MEETING_CHANNEL]],
  (raw) => parsePrivateMeetingSync(raw),
)

export const selectIsInPrivateMeeting = (s: RootState) =>
  s.privateMeeting.local.partnerId !== null

export function selectParticipantInPrivateMode(participantId: string) {
  return (s: RootState) => {
    const sync = selectPrivateMeetingSync(s)
    return sync.active && sync.joined.includes(participantId)
  }
}

export { EMPTY_PRIVATE_MEETING_SYNC, parsePrivateMeetingSync, PRIVATE_MEETING_CHANNEL }
