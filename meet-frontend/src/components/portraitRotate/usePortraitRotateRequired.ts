import { useEffect, useState } from 'react'

const MOBILE_VIEWPORT_MAX = 767

function isPortraitOrientation(): boolean {
  if (typeof window === 'undefined') {
    return false
  }

  if (window.matchMedia('(orientation: portrait)').matches) {
    return true
  }

  return window.screen.availWidth < window.screen.availHeight
}

function isMobileViewport(): boolean {
  if (typeof window === 'undefined') {
    return false
  }

  return (
    window.innerWidth < MOBILE_VIEWPORT_MAX ||
    window.matchMedia('(max-device-width: 900px)').matches
  )
}

export function shouldShowPortraitRotateOverlay(): boolean {
  return isMobileViewport() && isPortraitOrientation()
}

export function usePortraitRotateRequired(): boolean {
  const [required, setRequired] = useState(() => shouldShowPortraitRotateOverlay())

  useEffect(() => {
    const update = () => {
      setRequired(shouldShowPortraitRotateOverlay())
    }

    update()
    window.addEventListener('resize', update)
    window.addEventListener('orientationchange', update)

    const portraitQuery = window.matchMedia('(orientation: portrait)')
    portraitQuery.addEventListener('change', update)

    return () => {
      window.removeEventListener('resize', update)
      window.removeEventListener('orientationchange', update)
      portraitQuery.removeEventListener('change', update)
    }
  }, [])

  return required
}
