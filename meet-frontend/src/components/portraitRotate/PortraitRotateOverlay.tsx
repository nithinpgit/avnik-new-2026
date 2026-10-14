import './portraitRotateOverlay.css'
import { usePortraitRotateRequired } from './usePortraitRotateRequired'

export function PortraitRotateOverlay() {
  const showOverlay = usePortraitRotateRequired()

  if (!showOverlay) {
    return null
  }

  return (
    <div
      id="portrait-rotate"
      className="portrait-rotate portrait-rotate--visible"
      role="dialog"
      aria-modal="true"
      aria-label="Rotate your device to landscape"
    >
      <div className="portrait-rotate__message">
        <figure className="portrait-rotate__figure">
          <img src="images/rotate-screen-img.svg" alt="" />
        </figure>
      </div>
    </div>
  )
}
