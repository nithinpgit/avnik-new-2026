import { useMeetingPermissions } from '../participantControls/useMeetingPermissions'
import { selectActivePresentation } from './documentsSlice'
import { useAppSelector } from '../../app/hooks'
import { usePresentationSync } from './usePresentationSync'
import './presentationLayer.css'

/** Host/presenter control — same placement style as video share close. */
export function PresentationCloseButton() {
  const presentation = useAppSelector(selectActivePresentation)
  const { canPresentContent } = useMeetingPermissions()
  const { closePresentation } = usePresentationSync()

  if (!presentation?.active || !canPresentContent) return null

  return (
    <button
      type="button"
      className="presentation-close-btn meeting-tooltip meeting-tooltip--bottom"
      data-tooltip="Close document"
      aria-label="Close document"
      onClick={closePresentation}
    >
      ×
    </button>
  )
}
