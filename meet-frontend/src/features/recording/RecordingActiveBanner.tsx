import { useAppSelector } from '../../app/hooks'
import { useRecorderUiActive } from './useRecorderUiActive'
import { selectIsMeetingRecordingActive, selectMeetingRecording } from './recordingSelectors'
import './recordingBanner.css'

export function RecordingActiveBanner() {
  const recorderUi = useRecorderUiActive()
  const recordingActive = useAppSelector(selectIsMeetingRecordingActive)
  const recording = useAppSelector(selectMeetingRecording)

  if (recorderUi || !recordingActive) {
    return null
  }

  const label = recording.status === 'stopping' ? 'Saving recording' : 'Recording'
  const detail =
    recording.status === 'stopping'
      ? 'The host is finishing the meeting recording.'
      : 'This meeting is being recorded.'

  return (
    <span
      className={`recording-active-chip${recording.status === 'stopping' ? ' recording-active-chip--stopping' : ''}`}
      role="status"
      aria-live="polite"
      title={detail}
    >
      <span className="recording-active-chip__dot" aria-hidden />
      {label}
    </span>
  )
}
