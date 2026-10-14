import { useAppSelector } from '../../app/hooks'
import { selectMeetingStatus } from './meetingLifecycleSlice'
import { useIsMeetingHost } from './useIsMeetingHost'

export function MeetingStatusBanner() {
  const status = useAppSelector(selectMeetingStatus)
  const host = useIsMeetingHost()

  if (status === 'started') {
    return null
  }

  let message: string
  if (status === 'paused') {
    message = host
      ? 'Session is in paused state. Click play to resume when you are ready.'
      : 'Host paused the meeting. Please wait until they resume.'
  } else if (status === 'ended') {
    message = host
      ? 'Meeting ended. Click play to start a new session.'
      : 'This meeting has ended. Please wait for the host to start again.'
  } else if (host) {
    message = 'Meeting not started yet. Click play button on the left to start timer.'
  } else {
    message = 'Meeting not started yet. Please wait until the host starts the meeting.'
  }

  return (
    <div className="meeting-status-banner" role="status" aria-live="polite">
      {message}
    </div>
  )
}
