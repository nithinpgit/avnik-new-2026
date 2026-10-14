import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import {
  isRoomHostUser,
  moderationForUser,
  parseModerationPayload,
  type ParticipantModerationPayload,
  type UserModerationState,
} from './participantModerationTypes'

type KickConfirmTarget = {
  userId: string
  name: string
}

type ParticipantModerationState = {
  moderation: ParticipantModerationPayload
  kickConfirmTarget: KickConfirmTarget | null
}

const initialState: ParticipantModerationState = {
  moderation: { users: {} },
  kickConfirmTarget: null,
}

const participantModerationSlice = createSlice({
  name: 'participantModeration',
  initialState,
  reducers: {
    setParticipantModeration: (state, action: PayloadAction<ParticipantModerationPayload>) => {
      state.moderation = action.payload
    },
    applyParticipantModerationRaw: (state, action: PayloadAction<unknown>) => {
      state.moderation = parseModerationPayload(action.payload)
    },
    openKickConfirm: (state, action: PayloadAction<KickConfirmTarget>) => {
      state.kickConfirmTarget = action.payload
    },
    closeKickConfirm: (state) => {
      state.kickConfirmTarget = null
    },
    resetParticipantModeration: () => initialState,
  },
})

export const {
  setParticipantModeration,
  applyParticipantModerationRaw,
  openKickConfirm,
  closeKickConfirm,
  resetParticipantModeration,
} = participantModerationSlice.actions

export const selectParticipantModeration = (state: RootState) =>
  state.participantModeration.moderation

export const selectKickConfirmTarget = (state: RootState) =>
  state.participantModeration.kickConfirmTarget

export const selectUserModeration =
  (userId: string) =>
  (state: RootState): UserModerationState => {
    const isHost = isRoomHostUser(
      userId,
      state.meetingSession.userId ?? undefined,
      state.meetingSession.role,
      state.videoConference.participants,
    )
    return moderationForUser(state.participantModeration.moderation, userId, isHost)
  }

export const selectMuteAllActive = (state: RootState) =>
  Boolean(state.participantModeration.moderation.muteAll)

export const selectCamOffAllActive = (state: RootState) =>
  Boolean(state.participantModeration.moderation.camOffAll)

export default participantModerationSlice.reducer
