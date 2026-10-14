import { createPortal } from 'react-dom'
import type { PrivateMeetingModalState } from './privateMeetingTypes'
import './privateMeetingModal.css'

type PrivateMeetingModalProps = {
  modal: PrivateMeetingModalState
  onDismiss: () => void
  onAcceptWithAv: () => void
  onAcceptWithAudio: () => void
  onReject: () => void
  onJoinWithAv: () => void
  onJoinWithAudio: () => void
}

export function PrivateMeetingModal({
  modal,
  onDismiss,
  onAcceptWithAv,
  onAcceptWithAudio,
  onReject,
  onJoinWithAv,
  onJoinWithAudio,
}: PrivateMeetingModalProps) {
  const { kind, partnerName } = modal

  let message = ''
  if (kind === 'incoming_request') {
    message = `${partnerName} has requested private meeting with you, Are you sure to allow ?`
  } else if (kind === 'incoming_accept') {
    message = `${partnerName} has accepted your request for private meeting`
  } else if (kind === 'rejected') {
    message = `${partnerName} has rejected your requested for private meeting`
  } else if (kind === 'stopped') {
    message = 'Private meeting has been stopped'
  }

  return createPortal(
    <div className="pv-meeting-overlay" role="presentation" onClick={onDismiss}>
      <div
        className="pv-meeting-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="pv-meeting-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="pv-meeting-modal__header">
          <h2 id="pv-meeting-title" className="pv-meeting-modal__title">
            Private Meeting
          </h2>
        </div>
        <div className="pv-meeting-modal__body">
          <p>{message}</p>
        </div>
        <div className="pv-meeting-modal__actions">
          {kind === 'incoming_request' ? (
            <>
              <button type="button" className="pv-meeting-modal__btn pv-meeting-modal__btn--primary" onClick={onAcceptWithAv}>
                Accept With Audio &amp; Video
              </button>
              <div className="pv-meeting-modal__actions-row">
                <button type="button" className="pv-meeting-modal__btn pv-meeting-modal__btn--primary" onClick={onAcceptWithAudio}>
                  Accept With Audio Only
                </button>
                <button type="button" className="pv-meeting-modal__btn pv-meeting-modal__btn--reject" onClick={onReject}>
                  Reject
                </button>
              </div>
            </>
          ) : null}
          {kind === 'incoming_accept' ? (
            <div className="pv-meeting-modal__actions-row">
              <button type="button" className="pv-meeting-modal__btn pv-meeting-modal__btn--primary" onClick={onJoinWithAv}>
                Join With Audio &amp; Video
              </button>
              <button type="button" className="pv-meeting-modal__btn pv-meeting-modal__btn--primary" onClick={onJoinWithAudio}>
                Join With Audio Only
              </button>
            </div>
          ) : null}
          {kind === 'rejected' || kind === 'stopped' ? (
            <button type="button" className="pv-meeting-modal__btn pv-meeting-modal__btn--primary" onClick={onDismiss}>
              Ok
            </button>
          ) : null}
        </div>
      </div>
    </div>,
    document.body,
  )
}
