import { createListenerMiddleware } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import { playNotificationSound } from './playNotificationSound'
import { pushMeetingNotification } from './meetingNotificationsSlice'

export const meetingNotificationListener = createListenerMiddleware()

meetingNotificationListener.startListening({
  actionCreator: pushMeetingNotification,
  effect: (action, api) => {
    if (action.payload.playSound === false) return
    const state = api.getState() as RootState
    if (state.meetingNotifications.soundMuted) return
    playNotificationSound(0.3)
  },
})

export type AppStartListening = typeof meetingNotificationListener.startListening
