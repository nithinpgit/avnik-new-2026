import { useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { pushMeetingNotification } from '../notifications/meetingNotificationsSlice'
import { useIsMeetingHost } from '../meeting/useIsMeetingHost'
import { useRecorderUiActive } from './useRecorderUiActive'
import { selectIsMeetingRecordingActive, selectMeetingRecording } from './recordingSelectors'

/** Sidebar notifications when recording starts (participants) or stops (everyone). */
export function RecordingActiveNotifier() {
  const dispatch = useAppDispatch()
  const recorderUi = useRecorderUiActive()
  const isHost = useIsMeetingHost()
  const recordingActive = useAppSelector(selectIsMeetingRecordingActive)
  const recording = useAppSelector(selectMeetingRecording)
  const wasActiveRef = useRef(false)

  useEffect(() => {
    if (recorderUi) {
      wasActiveRef.current = recordingActive
      return
    }

    if (recordingActive && !wasActiveRef.current) {
      if (!isHost) {
        dispatch(
          pushMeetingNotification({
            userName: 'Meeting',
            message: 'This meeting is being recorded.',
          }),
        )
      }
    } else if (!recordingActive && wasActiveRef.current) {
      if (recording.status === 'completed') {
        dispatch(
          pushMeetingNotification({
            userName: 'Meeting',
            message: isHost ? 'Recording saved successfully.' : 'Meeting recording has stopped.',
          }),
        )
      } else if (recording.status === 'failed') {
        dispatch(
          pushMeetingNotification({
            userName: 'Meeting',
            message: isHost ? 'Recording could not be saved.' : 'Meeting recording stopped unexpectedly.',
          }),
        )
      }
    }

    wasActiveRef.current = recordingActive
  }, [dispatch, recording, recordingActive, recorderUi, isHost])

  return null
}
