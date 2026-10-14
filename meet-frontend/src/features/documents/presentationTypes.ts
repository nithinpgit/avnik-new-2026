export const PRESENTATION_CHANNEL = 'presentation'

export type PresentationSyncPayload = {
  active: boolean
  fileId: string
  fileUrl: string
  originalName: string
  mimeType: string
  extension: string
  pageCount: number
  currentPage: number
  zoomPercent: number
  /** Viewport pan in Excalidraw scroll units (hand tool); keeps zoomed docs reachable. */
  panX: number
  panY: number
}

export type RoomFileRecord = {
  id: string
  roomId: string
  originalName: string
  storedName: string
  mimeType: string
  extension: string
  sizeBytes: number
  pageCount: number
  uploadedBy: string | null
  url: string
  createdAt: string
}

export function parsePresentationPayload(raw: unknown): PresentationSyncPayload | null {
  if (!raw || typeof raw !== 'object') return null
  const o = raw as Record<string, unknown>
  if (o.active === false) return null
  if (typeof o.fileId !== 'string' || typeof o.fileUrl !== 'string') return null
  return {
    active: true,
    fileId: o.fileId,
    fileUrl: o.fileUrl,
    originalName: typeof o.originalName === 'string' ? o.originalName : 'Document',
    mimeType: typeof o.mimeType === 'string' ? o.mimeType : '',
    extension: typeof o.extension === 'string' ? o.extension : '',
    pageCount: typeof o.pageCount === 'number' ? o.pageCount : 1,
    currentPage: typeof o.currentPage === 'number' ? o.currentPage : 1,
    zoomPercent: typeof o.zoomPercent === 'number' ? o.zoomPercent : 100,
    panX: typeof o.panX === 'number' && Number.isFinite(o.panX) ? o.panX : 0,
    panY: typeof o.panY === 'number' && Number.isFinite(o.panY) ? o.panY : 0,
  }
}

export function isPresentableExtension(ext: string): boolean {
  const e = ext.toLowerCase()
  return e === 'pdf' || ['png', 'jpg', 'jpeg', 'gif', 'webp'].includes(e)
}
