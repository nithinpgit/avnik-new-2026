import { createPortal } from 'react-dom'
import './leaveMeetingConfirmModal.css'

type LeaveMeetingConfirmModalProps = {
  open: boolean
  onCancel: () => void
  onConfirm: () => void
}

export function LeaveMeetingConfirmModal({ open, onCancel, onConfirm }: LeaveMeetingConfirmModalProps) {
  if (!open) return null

  return createPortal(
    <div className="leave-meeting-overlay" role="presentation" onClick={onCancel}>
      <div
        className="leave-meeting-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="leave-meeting-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="leave-meeting-modal__close" aria-label="Close" onClick={onCancel}>
          ×
        </button>
        <strong id="leave-meeting-title" className="leave-meeting-modal__title">
          Do you want to leave from current session ?
        </strong>
        <div className="leave-meeting-modal__actions">
          <button
            type="button"
            className="leave-meeting-modal__btn leave-meeting-modal__btn--leave"
            onClick={onConfirm}
          >
            Leave
          </button>
          <button
            type="button"
            className="leave-meeting-modal__btn leave-meeting-modal__btn--cancel"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.body,
  )
}
