import { resolveExternalApiBaseUrl, resolveExternalFileAssetUrl } from './config'
import { loadExternalSession } from './session'
import type {
  AuthenticateMeetingRoomRequest,
  BlockMeetingUserRequest,
  ExtendMeetingDurationRequest,
  ExternalApiEnvelope,
  ExternalExtendDurationRecord,
  ExternalFileManagerItem,
  ExternalFileManagerListResponse,
  ExternalMeetingRoomData,
  ExternalPaymentRecord,
  ExternalReviewRecord,
  ListFileManagerRequest,
  ProcessPaymentRequest,
  SaveRecordingRequest,
  SubmitReviewRequest,
  UpdateMeetingStatusRequest,
} from './types'

export class ExternalApiError extends Error {
  readonly status: number
  readonly payload: unknown

  constructor(message: string, status: number, payload?: unknown) {
    super(message)
    this.name = 'ExternalApiError'
    this.status = status
    this.payload = payload
  }
}

type RequestOptions = {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH'
  path: string
  body?: Record<string, unknown> | FormData
  auth?: boolean
}

async function parseJsonSafe(res: Response): Promise<unknown> {
  const text = await res.text()
  if (!text) return null
  try {
    return JSON.parse(text) as unknown
  } catch {
    return text
  }
}

/**
 * Single entry point for all external (Laravel) platform API calls.
 * Mirrors the reference avnik_old client contract.
 */
async function externalRequest<T>(options: RequestOptions): Promise<T> {
  const base = resolveExternalApiBaseUrl()
  const normalizedPath = options.path.startsWith('/') ? options.path : `/${options.path}`
  const url = `${base}${normalizedPath}`

  const headers: Record<string, string> = {
    Accept: 'application/json',
  }

  if (options.auth !== false) {
    const { accessToken } = loadExternalSession()
    if (accessToken) {
      headers.authorization = `Bearer ${accessToken}`
    }
  }

  let body: BodyInit | undefined
  if (options.body instanceof FormData) {
    body = options.body
  } else if (options.body) {
    headers['Content-Type'] = 'application/json'
    body = JSON.stringify(options.body)
  }

  const res = await fetch(url, {
    method: options.method,
    headers,
    body,
    credentials: 'include',
  })

  const payload = await parseJsonSafe(res)
  if (!res.ok) {
    const message =
      payload && typeof payload === 'object' && 'message' in payload
        ? String((payload as { message: unknown }).message)
        : `External API ${options.method} ${normalizedPath} failed (${res.status})`
    throw new ExternalApiError(message, res.status, payload)
  }

  return payload as T
}

/** POST /meetingRoom — authenticate and load event details. */
export function authenticateMeetingRoom(body: AuthenticateMeetingRoomRequest) {
  return externalRequest<ExternalApiEnvelope<ExternalMeetingRoomData>>({
    method: 'POST',
    path: '/meetingRoom',
    body: body as unknown as Record<string, unknown>,
  })
}

/** PUT /meetingRoom — sync live meeting elapsed time and status (host/presenter). */
export function updateMeetingRoomStatus(body: UpdateMeetingStatusRequest) {
  return externalRequest<ExternalApiEnvelope<number>>({
    method: 'PUT',
    path: '/meetingRoom',
    body: body as unknown as Record<string, unknown>,
  })
}

/** PUT /meetingRoom/block — block a removed user from re-entering. */
export function blockMeetingRoomUser(body: BlockMeetingUserRequest) {
  return externalRequest<ExternalApiEnvelope<number>>({
    method: 'PUT',
    path: '/meetingRoom/block',
    body: body as unknown as Record<string, unknown>,
  })
}

/** PUT /meetingRoom/extend — extend session duration. */
export function extendMeetingRoomDuration(body: ExtendMeetingDurationRequest) {
  return externalRequest<ExternalApiEnvelope<ExternalExtendDurationRecord>>({
    method: 'PUT',
    path: '/meetingRoom/extend',
    body: body as unknown as Record<string, unknown>,
  })
}

/** PUT /payments — Stripe payment for booking or extension. */
export function processMeetingPayment(body: ProcessPaymentRequest) {
  return externalRequest<ExternalApiEnvelope<ExternalPaymentRecord>>({
    method: 'PUT',
    path: '/payments',
    body: body as unknown as Record<string, unknown>,
  })
}

/** POST /reviews/add — post-meeting rating, comment, optional tip. */
export function submitMeetingReview(body: SubmitReviewRequest) {
  return externalRequest<ExternalApiEnvelope<ExternalReviewRecord>>({
    method: 'POST',
    path: '/reviews/add',
    body: body as unknown as Record<string, unknown>,
  })
}

/** POST /saveRecordings — persist recording metadata (no auth header in reference app). */
export function saveRecordingMetadata(body: SaveRecordingRequest) {
  return externalRequest<unknown>({
    method: 'POST',
    path: '/saveRecordings',
    body: body as unknown as Record<string, unknown>,
    auth: false,
  })
}

/** POST /fileManager/list — fetch user's scheduled/library files. */
export async function listFileManagerFiles(body: ListFileManagerRequest = {}) {
  const res = await externalRequest<ExternalApiEnvelope<ExternalFileManagerListResponse>>({
    method: 'POST',
    path: '/fileManager/list',
    body: body as unknown as Record<string, unknown>,
  })
  return res.data?.data ?? []
}

export function mapExternalFileToLibraryItem(file: ExternalFileManagerItem) {
  const ext = (file.type || file.name.split('.').pop() || '').toLowerCase()
  const isVideo = ext === 'mp4' || ext === 'webm'
  const isImage = ext === 'png' || ext === 'jpg' || ext === 'jpeg' || ext === 'gif' || ext === 'webp' || ext === 'svg'
  const fileUrl = resolveExternalFileAssetUrl(file.file_url)
  return {
    id: `external-${file.id}`,
    roomId: '',
    originalName: file.name,
    storedName: file.file_url,
    mimeType: isVideo
      ? `video/${ext}`
      : ext === 'pdf'
        ? 'application/pdf'
        : isImage
          ? ext === 'jpg'
            ? 'image/jpeg'
            : `image/${ext}`
          : 'application/octet-stream',
    extension: ext,
    sizeBytes: 0,
    pageCount: typeof file.pages === 'number' ? file.pages : 1,
    uploadedBy: null,
    url: fileUrl,
    createdAt: '',
    external: true as const,
  }
}

/** Convenience namespace — prefer named exports above for tree-shaking. */
export const externalApi = {
  authenticateMeetingRoom,
  updateMeetingRoomStatus,
  blockMeetingRoomUser,
  extendMeetingRoomDuration,
  processMeetingPayment,
  submitMeetingReview,
  saveRecordingMetadata,
  listFileManagerFiles,
  mapExternalFileToLibraryItem,
}

export type { ExternalFileManagerItem }
