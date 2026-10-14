import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import { configureRecordingRuntime } from '../recording/recordingRuntime'
import { isMeetRecordPath } from '../../app/paths'

export type MeetingRole = 'host' | 'participant'

export type MeetingSessionState = {
  /** External slot id from URL `rm` — sent to Laravel APIs as roomId. */
  slotId: string | null
  /** Mediasoup / Socket.IO room id (meetingRoomId from external API, or rm in dev). */
  roomId: string | null
  userId: string | null
  displayName: string
  role: MeetingRole
  profileImage: string | null
  isRecorderMode: boolean
  recordingId: string | null
  /** URL ?dev=1 — skip login and auth failure fallback. */
  devMode: boolean
  /** URL ?mode=presenter|viewer|recorder */
  urlMode: string | null
  /** True after URL was parsed (browser only). */
  initialized: boolean
}

function generateGuestUserId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return `guest-${crypto.randomUUID().slice(0, 8)}`
  }
  return `guest-${Math.random().toString(36).slice(2, 10)}`
}

function parseSearch(search: string): Omit<MeetingSessionState, 'initialized'> {
  const params = new URLSearchParams(search)
  const devMode = params.get('dev') === '1' || params.get('dev')?.toLowerCase() === 'true'

  const slotId =
    params.get('rm')?.trim() ||
    params.get('id')?.trim() ||
    params.get('roomId')?.trim() ||
    null

  const urlMode = params.get('mode')?.trim().toLowerCase() ?? null

  let userId = params.get('userId')?.trim() || null
  let displayName = params.get('name')?.trim() || params.get('displayName')?.trim() || null
  let role: MeetingRole = 'participant'

  if (urlMode === 'presenter') {
    role = 'host'
    if (!displayName) displayName = 'Presenter'
    if (!userId) userId = generateGuestUserId()
  } else if (urlMode === 'viewer') {
    role = 'participant'
    if (!displayName) displayName = `User ${Math.random().toString(36).slice(2, 6)}`
    if (!userId) userId = generateGuestUserId()
  }

  const roleParam = params.get('role')?.trim().toLowerCase()
  if (roleParam === 'host') role = 'host'

  if (!userId) userId = generateGuestUserId()
  if (!displayName) displayName = 'Guest'

  const profileImage = params.get('profileImage')?.trim() || null
  const isRecordPath = typeof window !== 'undefined' && isMeetRecordPath()
  const isRecorderMode = isRecordPath || urlMode === 'recorder'
  const recordingId = params.get('recordingId')?.trim() || params.get('recordId')?.trim() || null
  const autoJoin = params.get('autoJoin') === '1'

  return {
    slotId,
    roomId: slotId && (devMode || isRecorderMode || autoJoin) ? slotId : null,
    userId,
    displayName,
    role,
    profileImage,
    isRecorderMode,
    recordingId,
    devMode,
    urlMode,
  }
}

const initialState: MeetingSessionState = {
  slotId: null,
  roomId: null,
  userId: null,
  displayName: 'Guest',
  role: 'participant',
  profileImage: null,
  isRecorderMode: false,
  recordingId: null,
  devMode: false,
  urlMode: null,
  initialized: false,
}

const meetingSessionSlice = createSlice({
  name: 'meetingSession',
  initialState,
  reducers: {
    initMeetingSessionFromLocation: (state) => {
      if (typeof window === 'undefined' || state.initialized) {
        return
      }
      const parsed = parseSearch(window.location.search)
      const params = new URLSearchParams(window.location.search)
      Object.assign(state, parsed)
      state.initialized = true
      configureRecordingRuntime({
        isRecorder: parsed.isRecorderMode,
        recordingId: parsed.recordingId,
        recorderApi: params.get('recorderApi'),
        apiUrl: params.get('apiUrl'),
        mediaWs: params.get('mediaWs'),
      })
    },
    setMeetingSession: (state, action: PayloadAction<Partial<MeetingSessionState>>) => {
      Object.assign(state, action.payload)
      state.initialized = true
    },
  },
})

export const { initMeetingSessionFromLocation, setMeetingSession } = meetingSessionSlice.actions

export const selectMeetingSession = (state: RootState) => state.meetingSession
export const selectMeetingSlotId = (state: RootState) => state.meetingSession.slotId
export const selectMeetingRoomId = (state: RootState) => state.meetingSession.roomId
export const selectMeetingUserId = (state: RootState) => state.meetingSession.userId
export const selectMeetingDisplayName = (state: RootState) => state.meetingSession.displayName
export const selectMeetingRole = (state: RootState) => state.meetingSession.role
export const selectMeetingProfileImage = (state: RootState) => state.meetingSession.profileImage
export const selectIsRecorderMode = (state: RootState) => state.meetingSession.isRecorderMode
export const selectSessionRecordingId = (state: RootState) => state.meetingSession.recordingId
export const selectMeetingDevMode = (state: RootState) => state.meetingSession.devMode
export const selectMeetingUrlMode = (state: RootState) => state.meetingSession.urlMode
export const selectMeetingSessionInitialized = (state: RootState) => state.meetingSession.initialized

export default meetingSessionSlice.reducer
