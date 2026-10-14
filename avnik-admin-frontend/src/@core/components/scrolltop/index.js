// ** React Imports
import { useEffect, useState } from 'react'

const ScrollToTop = ({ children, showOffset = 300, className = '' }) => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > showOffset)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => window.removeEventListener('scroll', onScroll)
  }, [showOffset])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (!visible) {
    return null
  }

  return (
    <div className={className} onClick={scrollToTop} role='button' tabIndex={0} onKeyDown={e => e.key === 'Enter' && scrollToTop()}>
      {children}
    </div>
  )
}

export default ScrollToTop
