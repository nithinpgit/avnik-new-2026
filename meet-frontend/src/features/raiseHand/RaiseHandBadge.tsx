import { IconHand } from '../videoConference/MeetingIcons'
import './raiseHandBadge.css'

type RaiseHandBadgeProps = {
  participantName: string
  canDismiss: boolean
  onDismiss?: () => void
}

export function RaiseHandBadge({ participantName, canDismiss, onDismiss }: RaiseHandBadgeProps) {
  const label = canDismiss
    ? `Dismiss raise hand request from ${participantName}`
    : `${participantName} raised their hand`

  if (canDismiss) {
    return (
      <button
        type="button"
        className="raise-hand-badge raise-hand-badge--dismissible meeting-tooltip meeting-tooltip--bottom"
        data-tooltip="Dismiss raise hand"
        aria-label={label}
        onClick={(e) => {
          e.stopPropagation()
          onDismiss?.()
        }}
      >
        <span className="raise-hand-badge__icon" aria-hidden>
          <IconHand size={16} />
        </span>
      </button>
    )
  }

  return (
    <div className="raise-hand-badge" title={label} aria-label={label}>
      <span className="raise-hand-badge__icon" aria-hidden>
        <IconHand size={16} />
      </span>
    </div>
  )
}
