import type { RootState } from '../../app/store'
import {
  RECORDING_CHANNEL,
  emptyRecordingPayload,
  parseRecordingPayload,
  type RecordingSyncPayload,
} from './recordingTypes'

export function selectMeetingRecording(state: RootState): RecordingSyncPayload {
  const raw = state.roomSync.channels[RECORDING_CHANNEL]
  return parseRecordingPayload(raw) ?? emptyRecordingPayload()
}

export function isRecordingSessionActive(recording: RecordingSyncPayload): boolean {
  return (
    recording.active &&
    (recording.status === 'recording' || recording.status === 'starting' || recording.status === 'stopping')
  )
}

export function selectIsMeetingRecordingActive(state: RootState): boolean {
  return isRecordingSessionActive(selectMeetingRecording(state))
}
