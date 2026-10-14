import { createPortal } from 'react-dom'
import { meetAppPath } from '../../app/paths'
import './endMeetingConfirmModal.css'

type EndMeetingConfirmModalProps = {
  open: boolean
  onCancel: () => void
  onConfirm: () => void
}

export function EndMeetingConfirmModal({ open, onCancel, onConfirm }: EndMeetingConfirmModalProps) {
  if (!open) return null

  return createPortal(
    <div className="end-meeting-overlay" role="presentation" onClick={onCancel}>
      <div
        className="end-meeting-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="end-meeting-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="end-meeting-modal__close" aria-label="Close" onClick={onCancel}>
          ×
        </button>
        <div className="end-meeting-modal__graphic">
          <img
            src={meetAppPath('/images/end-meeting-icon.svg')}
            alt=""
            className="end-meeting-modal__icon"
          />
        </div>
        <strong id="end-meeting-title" className="end-meeting-modal__title">
          Do you want to end now ?
        </strong>
        <div className="end-meeting-modal__actions">
          <button type="button" className="end-meeting-modal__btn end-meeting-modal__btn--end" onClick={onConfirm}>
            End Now
          </button>
          <button type="button" className="end-meeting-modal__btn end-meeting-modal__btn--cancel" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.body,
  )
}
