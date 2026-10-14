import { configureStore } from '@reduxjs/toolkit'
import { completePreMeeting } from '../features/preMeeting/preMeetingSlice'
import { isMeetRecordPath } from './paths'
import documentsReducer from '../features/documents/documentsSlice'
import videoShareReducer from '../features/videoShare/videoShareSlice'
import participantModerationReducer from '../features/participantControls/participantModerationSlice'
import notificationsReducer from '../features/documents/notificationsSlice'
import meetingNotificationsReducer from '../features/notifications/meetingNotificationsSlice'
import { meetingNotificationListener } from '../features/notifications/meetingNotificationListener'
import meetingLifecycleReducer from '../features/meeting/meetingLifecycleSlice'
import meetingSessionReducer, {
  initMeetingSessionFromLocation,
} from '../features/meetingSession/meetingSessionSlice'
import roomSyncReducer from '../features/roomSync/roomSyncSlice'
import whiteboardReducer from '../features/whiteboard/whiteboardSlice'
import preMeetingReducer from '../features/preMeeting/preMeetingSlice'
import waitingRoomReducer from '../features/waitingRoom/waitingRoomSlice'
import videoConferenceReducer from '../features/videoConference/videoConferenceSlice'
import externalMeetingReducer from '../features/externalApi/externalMeetingSlice'
import externalModalsReducer from '../features/externalApi/externalModalsSlice'
import extendDurationReducer from '../features/externalApi/extendDurationSlice'
import privateMeetingReducer from '../features/privateMeeting/privateMeetingSlice'

export const store = configureStore({
  reducer: {
    whiteboard: whiteboardReducer,
    preMeeting: preMeetingReducer,
    waitingRoom: waitingRoomReducer,
    meetingSession: meetingSessionReducer,
    meetingLifecycle: meetingLifecycleReducer,
    externalMeeting: externalMeetingReducer,
    externalModals: externalModalsReducer,
    extendDuration: extendDurationReducer,
    privateMeeting: privateMeetingReducer,
    documents: documentsReducer,
    videoShare: videoShareReducer,
    participantModeration: participantModerationReducer,
    notifications: notificationsReducer,
    meetingNotifications: meetingNotificationsReducer,
    roomSync: roomSyncReducer,
    videoConference: videoConferenceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'videoConference/setLocalStream',
        ],
        ignoredPaths: ['videoConference.localStream', 'roomSync.channels'],
      },
    }).prepend(meetingNotificationListener.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

/** Parse URL before first render so socket/SFU can join on the first effect pass. */
if (typeof window !== 'undefined') {
  store.dispatch(initMeetingSessionFromLocation())
  const onRecordPath = isMeetRecordPath()
  if (onRecordPath) {
    // Receive-only: headless Chrome must not call getUserMedia (no mediaDevices / permissions).
    store.dispatch(
      completePreMeeting({
        wantsVideo: false,
        mediaMode: 'none',
      }),
    )
  }
}
