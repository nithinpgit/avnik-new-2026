import { useState } from 'react'
import { useAppSelector } from '../../app/hooks'
import { selectKickConfirmTarget } from './participantModerationSlice'
import { useParticipantModeration } from './useParticipantModeration'
import './kickUserConfirmModal.css'

export function KickUserConfirmModal() {
  const target = useAppSelector(selectKickConfirmTarget)
  const { confirmKick, cancelKick } = useParticipantModeration()
  const [blockPersist, setBlockPersist] = useState(true)
  const [busy, setBusy] = useState(false)

  if (!target) return null

  const handleConfirm = async () => {
    if (busy) return
    setBusy(true)
    try {
      await confirmKick(blockPersist)
      setBlockPersist(true)
    } finally {
      setBusy(false)
    }
  }

  const handleCancel = () => {
    cancelKick()
    setBlockPersist(true)
  }

  return (
    <div className="kick-confirm-overlay" role="presentation" onClick={handleCancel}>
      <div
        className="kick-confirm-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="kick-confirm-title"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="kick-confirm-title" className="kick-confirm-modal__title">
          Remove participant
        </h2>
        <p className="kick-confirm-modal__body">
          Are you sure you want to remove <strong>{target.name}</strong> from the meeting?
        </p>
        <label className="kick-confirm-modal__checkbox">
          <input
            type="checkbox"
            checked={blockPersist}
            onChange={(e) => setBlockPersist(e.target.checked)}
          />
          Block this user from entering the room again
        </label>
        <div className="kick-confirm-modal__actions">
          <button
            type="button"
            className="kick-confirm-modal__btn kick-confirm-modal__btn--cancel"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            type="button"
            className="kick-confirm-modal__btn kick-confirm-modal__btn--confirm"
            disabled={busy}
            onClick={() => void handleConfirm()}
          >
            {busy ? 'Removing…' : 'Remove user'}
          </button>
        </div>
      </div>
    </div>
  )
}
