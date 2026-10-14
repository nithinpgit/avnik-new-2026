import { useAppSelector } from '../../app/hooks'
import { selectIsMeetingPaused } from './meetingLifecycleSlice'
import './meetingPausedOverlay.css'

/** Covers the center stage while paused so shared content stays hidden. */
export function MeetingPausedOverlay() {
  const paused = useAppSelector(selectIsMeetingPaused)
  if (!paused) return null

  return (
    <div className="meeting-paused-overlay" role="status" aria-live="polite">
      <div className="meeting-paused-overlay__panel">
        <p className="meeting-paused-overlay__title">Session paused</p>
        <p className="meeting-paused-overlay__text">
          The host has paused this session. Shared content is hidden until the meeting resumes.
        </p>
      </div>
    </div>
  )
}
