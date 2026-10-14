import { useEffect, useState } from 'react'
import { useAppSelector } from '../../app/hooks'
import { resolveFileAssetUrl } from './documentsApi'
import { selectActivePresentation, selectPageRenderKey } from './documentsSlice'
import { renderPdfPageToDataUrl } from './pdfUtils'
import './presentationLayer.css'

export function PresentationLayer() {
  const presentation = useAppSelector(selectActivePresentation)
  const pageRenderKey = useAppSelector(selectPageRenderKey)

  const [slideSrc, setSlideSrc] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!presentation?.active) {
      setSlideSrc(null)
      return
    }

    let cancelled = false
    const run = async () => {
      setLoading(true)
      try {
        const url = resolveFileAssetUrl(presentation.fileUrl, presentation.fileId)
        if (presentation.extension === 'pdf') {
          const dataUrl = await renderPdfPageToDataUrl(
            presentation.fileUrl,
            presentation.currentPage,
            1.5,
            presentation.fileId,
          )
          if (!cancelled) setSlideSrc(dataUrl)
        } else {
          if (!cancelled) setSlideSrc(url)
        }
      } catch {
        if (!cancelled) setSlideSrc(null)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    void run()
    return () => {
      cancelled = true
    }
  }, [
    presentation?.active,
    presentation?.fileId,
    presentation?.fileUrl,
    presentation?.currentPage,
    presentation?.extension,
    pageRenderKey,
  ])

  if (!presentation?.active) return null

  const zoom = presentation.zoomPercent / 100
  const panX = presentation.panX ?? 0
  const panY = presentation.panY ?? 0
  const panning = panX !== 0 || panY !== 0 || zoom !== 1

  return (
    <div className="presentation-layer presentation-layer--visible" aria-hidden>
      <div
        className={`presentation-slide-wrap${loading ? ' presentation-slide-wrap--loading' : ''}${panning ? ' presentation-slide-wrap--panning' : ''}`}
        style={{
          transform: `translate(${panX}px, ${panY}px) scale(${zoom})`,
          transformOrigin: 'center center',
        }}
      >
        {slideSrc ? (
          <img src={slideSrc} alt={presentation.originalName} draggable={false} />
        ) : null}
      </div>
    </div>
  )
}
