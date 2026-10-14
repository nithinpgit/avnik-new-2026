import { useAppSelector } from '../../app/hooks'
import { selectPrivateMeetingPartnerId } from './privateMeetingSlice'
import { selectVisibleParticipants } from '../videoConference/videoConferenceSlice'
import './privateMeetingIndicator.css'

export function PrivateMeetingIndicator() {
  const partnerId = useAppSelector(selectPrivateMeetingPartnerId)
  const participants = useAppSelector(selectVisibleParticipants)

  if (!partnerId) return null

  const partnerName = participants.find((p) => p.id === partnerId)?.name ?? 'participant'

  return (
    <div
      className="private-meet-indicator meeting-tooltip meeting-tooltip--bottom"
      data-tooltip={`Private meeting with ${partnerName}`}
      role="status"
      aria-live="polite"
      aria-label={`In private meeting with ${partnerName}`}
    >
      <span className="private-meet-indicator__dot" aria-hidden />
      <span className="private-meet-indicator__label">Private meet</span>
    </div>
  )
}
