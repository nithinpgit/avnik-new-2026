import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import type { MeetingNotificationItem } from './meetingNotificationsTypes'

export type MeetingNotificationsState = {
  items: MeetingNotificationItem[]
  unreadCount: number
  panelOpen: boolean
  /** When true, new notifications do not play a sound. */
  soundMuted: boolean
}

const initialState: MeetingNotificationsState = {
  items: [],
  unreadCount: 0,
  panelOpen: false,
  soundMuted: false,
}

type PushPayload = {
  userName: string
  message: string
  avatarUrl?: string | null
  playSound?: boolean
}

const meetingNotificationsSlice = createSlice({
  name: 'meetingNotifications',
  initialState,
  reducers: {
    pushMeetingNotification: (state, action: PayloadAction<PushPayload>) => {
      const item: MeetingNotificationItem = {
        id: crypto.randomUUID(),
        userName: action.payload.userName,
        message: action.payload.message,
        createdAt: new Date().toISOString(),
        avatarUrl: action.payload.avatarUrl ?? null,
      }
      state.items.unshift(item)
      if (state.items.length > 100) {
        state.items.length = 100
      }
      if (!state.panelOpen) {
        state.unreadCount += 1
      }
    },
    setNotificationPanelOpen: (state, action: PayloadAction<boolean>) => {
      state.panelOpen = action.payload
      if (action.payload) {
        state.unreadCount = 0
      }
    },
    setNotificationSoundMuted: (state, action: PayloadAction<boolean>) => {
      state.soundMuted = action.payload
    },
    removeMeetingNotification: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((n) => n.id !== action.payload)
    },
    resetMeetingNotifications: () => initialState,
  },
})

export const {
  pushMeetingNotification,
  setNotificationPanelOpen,
  setNotificationSoundMuted,
  removeMeetingNotification,
  resetMeetingNotifications,
} = meetingNotificationsSlice.actions

export const selectMeetingNotifications = (state: RootState) => state.meetingNotifications.items
export const selectNotificationUnreadCount = (state: RootState) => state.meetingNotifications.unreadCount
export const selectNotificationPanelOpen = (state: RootState) => state.meetingNotifications.panelOpen
export const selectNotificationSoundMuted = (state: RootState) => state.meetingNotifications.soundMuted

export default meetingNotificationsSlice.reducer
