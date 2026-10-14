import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import { isRecorderPeer } from '../recording/recorderPeer'

export type ParticipantRole = 'host' | 'participant'

export type Participant = {
  id: string
  name: string
  role: ParticipantRole
  profileImage?: string | null
}

export type CameraStatus = 'idle' | 'pending' | 'ready' | 'denied' | 'error'

type VideoConferenceState = {
  isConferenceMode: boolean
  /** Right participant video panel — open by default in whiteboard layout. */
  participantSidebarOpen: boolean
  participants: Participant[]
  /** Participant id that receives the local getUserMedia preview (self). */
  localParticipantId: string
  /** Local camera stream — non-serializable; ignored in store middleware checks. */
  localStream: MediaStream | null
  cameraStatus: CameraStatus
  cameraErrorMessage: string | null
  openParticipantMenuId: string | null
  /** Bumped when local mic/cam track.enabled changes (not in Redux otherwise). */
  localMediaRevision: number
  /** Whiteboard + meeting bottom toolbars visible (false = maximized canvas). */
  toolbarsVisible: boolean
}

const initialState: VideoConferenceState = {
  isConferenceMode: false,
  participantSidebarOpen: true,
  participants: [],
  localParticipantId: '',
  localStream: null,
  cameraStatus: 'idle',
  cameraErrorMessage: null,
  openParticipantMenuId: null,
  localMediaRevision: 0,
  toolbarsVisible: true,
}

function sortParticipants(peers: Participant[]): Participant[] {
  return [...peers].sort((a, b) => {
    if (a.role === 'host' && b.role !== 'host') return -1
    if (b.role === 'host' && a.role !== 'host') return 1
    return a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
  })
}

const videoConferenceSlice = createSlice({
  name: 'videoConference',
  initialState,
  reducers: {
    toggleConferenceMode: (state) => {
      state.isConferenceMode = !state.isConferenceMode
    },
    toggleParticipantSidebar: (state) => {
      state.participantSidebarOpen = !state.participantSidebarOpen
    },
    setParticipantSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.participantSidebarOpen = action.payload
    },
    setLocalParticipantId: (state, action: PayloadAction<string>) => {
      state.localParticipantId = action.payload
    },
    applyRoomSnapshot: (state, action: PayloadAction<{ peers: Participant[] }>) => {
      state.participants = sortParticipants(
        action.payload.peers.filter((p) => !isRecorderPeer(p.id)),
      )
    },
    upsertParticipant: (state, action: PayloadAction<Participant>) => {
      if (isRecorderPeer(action.payload.id)) return
      const idx = state.participants.findIndex((p) => p.id === action.payload.id)
      if (idx >= 0) {
        state.participants[idx] = action.payload
      } else {
        state.participants.push(action.payload)
      }
      state.participants = sortParticipants(state.participants)
    },
    removeParticipant: (state, action: PayloadAction<string>) => {
      state.participants = state.participants.filter((p) => p.id !== action.payload)
    },
    setLocalStream: (state, action: PayloadAction<MediaStream | null>) => {
      state.localStream = action.payload
    },
    setCameraStatus: (state, action: PayloadAction<CameraStatus>) => {
      state.cameraStatus = action.payload
    },
    setCameraErrorMessage: (state, action: PayloadAction<string | null>) => {
      state.cameraErrorMessage = action.payload
    },
    toggleParticipantMenu: (state, action: PayloadAction<string>) => {
      state.openParticipantMenuId =
        state.openParticipantMenuId === action.payload ? null : action.payload
    },
    closeParticipantMenu: (state) => {
      state.openParticipantMenuId = null
    },
    bumpLocalMediaRevision: (state) => {
      state.localMediaRevision += 1
    },
    toggleToolbarsVisible: (state) => {
      state.toolbarsVisible = !state.toolbarsVisible
    },
    setToolbarsVisible: (state, action: PayloadAction<boolean>) => {
      state.toolbarsVisible = action.payload
    },
  },
})

export const {
  toggleConferenceMode,
  toggleParticipantSidebar,
  setParticipantSidebarOpen,
  setLocalParticipantId,
  applyRoomSnapshot,
  upsertParticipant,
  removeParticipant,
  setLocalStream,
  setCameraStatus,
  setCameraErrorMessage,
  toggleParticipantMenu,
  closeParticipantMenu,
  bumpLocalMediaRevision,
  toggleToolbarsVisible,
  setToolbarsVisible,
} = videoConferenceSlice.actions

export const selectConferenceMode = (state: RootState) =>
  state.videoConference.isConferenceMode
export const selectParticipantSidebarOpen = (state: RootState) =>
  state.videoConference.participantSidebarOpen
export const selectParticipants = (state: RootState) => state.videoConference.participants
/** Participants visible in UI, counts, chat, and reports (excludes recording bot). */
export const selectVisibleParticipants = (state: RootState) =>
  state.videoConference.participants.filter((p) => !isRecorderPeer(p.id))
export const selectLocalParticipantId = (state: RootState) =>
  state.videoConference.localParticipantId
export const selectLocalStream = (state: RootState) => state.videoConference.localStream
export const selectCameraStatus = (state: RootState) => state.videoConference.cameraStatus
export const selectCameraErrorMessage = (state: RootState) =>
  state.videoConference.cameraErrorMessage
export const selectOpenParticipantMenuId = (state: RootState) =>
  state.videoConference.openParticipantMenuId
export const selectLocalMediaRevision = (state: RootState) =>
  state.videoConference.localMediaRevision
export const selectToolbarsVisible = (state: RootState) => state.videoConference.toolbarsVisible

export default videoConferenceSlice.reducer
