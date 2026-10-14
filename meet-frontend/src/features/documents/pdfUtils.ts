import * as pdfjs from 'pdfjs-dist'
import { resolveFileAssetUrl } from './documentsApi'

// Served from public/ as .js (see vite copy-pdf-worker plugin) — avoids .mjs MIME issues on some hosts.
pdfjs.GlobalWorkerOptions.workerSrc = `${import.meta.env.BASE_URL}pdf.worker.min.js`

export async function getPdfPageCount(fileUrl: string, fileId?: string): Promise<number> {
  const doc = await pdfjs.getDocument({ url: resolveFileAssetUrl(fileUrl, fileId) }).promise
  return doc.numPages
}

export async function renderPdfPageToDataUrl(
  fileUrl: string,
  pageNumber: number,
  scale: number,
  fileId?: string,
): Promise<string> {
  const doc = await pdfjs.getDocument({ url: resolveFileAssetUrl(fileUrl, fileId) }).promise
  const page = await doc.getPage(pageNumber)
  const viewport = page.getViewport({ scale })
  const canvas = document.createElement('canvas')
  canvas.width = viewport.width
  canvas.height = viewport.height
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Canvas unavailable')
  await page.render({ canvasContext: ctx, viewport }).promise
  return canvas.toDataURL('image/png')
}
