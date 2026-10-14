import { useExternalMeetingAuth } from './useExternalMeetingAuth'
import { useAppSelector } from '../../app/hooks'
import { selectExternalAuthStatus } from './externalMeetingSlice'
import { selectIsRecorderMode, selectMeetingSlotId } from '../meetingSession/meetingSessionSlice'
import './externalMeetingBootstrap.css'

/**
 * Gates the meeting UI until external API authentication completes.
 * Production requires valid session + POST /meetingRoom success.
 */
export function ExternalMeetingBootstrap({ children }: { children: React.ReactNode }) {
  const slotId = useAppSelector(selectMeetingSlotId)
  const authStatus = useAppSelector(selectExternalAuthStatus)
  const recorderMode = useAppSelector(selectIsRecorderMode)
  const { retryAuth } = useExternalMeetingAuth()

  if (recorderMode) {
    return <>{children}</>
  }

  if (!slotId) {
    return (
      <div className="external-bootstrap external-bootstrap--error">
        <div className="external-bootstrap__card">
          <h1>Missing meeting link</h1>
          <p>Add a room id to the URL, for example:</p>
          <code>?rm=60435621fea7fa70b01b78d4</code>
          <p className="external-bootstrap__hint">Open the meeting at <code>/join/?rm=…</code></p>
        </div>
      </div>
    )
  }

  if (authStatus === 'idle' || authStatus === 'loading') {
    return (
      <div className="external-bootstrap">
        <div className="external-bootstrap__card">
          <div className="external-bootstrap__spinner" aria-hidden />
          <p>Loading meeting…</p>
        </div>
      </div>
    )
  }

  if (authStatus === 'unauthorized') {
    return (
      <div className="external-bootstrap external-bootstrap--error">
        <div className="external-bootstrap__card">
          <h1>Unauthorized</h1>
          <p>You are not authorized to enter this meeting.</p>
          <button type="button" className="external-bootstrap__btn" onClick={() => retryAuth()}>
            Try again
          </button>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
