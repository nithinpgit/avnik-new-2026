import { resolveMeetingApiPath } from '../meetingRoom/socketUrl'
import { resolveExternalFileAssetUrl } from '../externalApi/config'
import type { RoomFileRecord } from './presentationTypes'

function isExternalStoragePath(url: string): boolean {
  return url.startsWith('storage/') || url.startsWith('/storage/')
}

export async function fetchRoomFiles(roomId: string): Promise<RoomFileRecord[]> {
  const res = await fetch(resolveMeetingApiPath(`/api/files/rooms/${encodeURIComponent(roomId)}`), {
    credentials: 'include',
  })
  if (!res.ok) {
    throw new Error(`list files ${res.status}`)
  }
  const data = (await res.json()) as { files?: RoomFileRecord[] }
  return data.files ?? []
}

export async function uploadRoomFile(
  roomId: string,
  file: File,
  onProgress: (percent: number) => void,
  uploadedBy?: string,
): Promise<RoomFileRecord> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    const form = new FormData()
    form.append('file', file)
    if (uploadedBy) form.append('uploadedBy', uploadedBy)

    xhr.upload.addEventListener('progress', (e) => {
      if (e.lengthComputable) {
        onProgress(Math.round((e.loaded / e.total) * 100))
      }
    })

    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const data = JSON.parse(xhr.responseText) as { file: RoomFileRecord }
          resolve(data.file)
        } catch {
          reject(new Error('Invalid upload response'))
        }
      } else {
        let message = `Upload failed (${xhr.status})`
        try {
          const err = JSON.parse(xhr.responseText) as { message?: string | string[] }
          if (Array.isArray(err.message)) message = err.message.join(', ')
          else if (typeof err.message === 'string') message = err.message
        } catch {
          /* ignore */
        }
        reject(new Error(message))
      }
    })

    xhr.addEventListener('error', () => reject(new Error('Upload failed')))
    xhr.open('POST', resolveMeetingApiPath(`/api/files/rooms/${encodeURIComponent(roomId)}/upload`))
    xhr.withCredentials = true
    xhr.send(form)
  })
}

export async function deleteRoomFile(fileId: string): Promise<void> {
  const res = await fetch(resolveMeetingApiPath(`/api/files/${encodeURIComponent(fileId)}`), {
    method: 'DELETE',
    credentials: 'include',
  })
  if (!res.ok) {
    throw new Error(`delete file ${res.status}`)
  }
}

export async function patchFilePageCount(fileId: string, pageCount: number): Promise<RoomFileRecord> {
  const res = await fetch(resolveMeetingApiPath(`/api/files/${encodeURIComponent(fileId)}/page-count`), {
    method: 'PATCH',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ pageCount }),
  })
  if (!res.ok) {
    throw new Error(`update page count ${res.status}`)
  }
  const data = (await res.json()) as { file: RoomFileRecord }
  return data.file
}

/**
 * Resolve a stored file URL for browser fetch (pdf.js, <img>, <video>, etc.).
 * Prefer nginx `/static/...` paths; legacy Nest content URLs still 302 to static.
 */
export function resolveRoomFileContentUrl(fileId: string): string {
  return resolveMeetingApiPath(`/api/files/${encodeURIComponent(fileId)}/content`)
}

/** Nginx-served recording: `/static/recordings/{id}` (try_files .webm / .mp4). */
export function resolveRecordingFileUrl(recordingId: string, extension?: string): string {
  const id = encodeURIComponent(recordingId)
  if (extension) {
    return `/static/recordings/${id}/${id}.${extension}`
  }
  return `/static/recordings/${id}`
}

function asSitePath(url: string): string {
  return url.startsWith('/') ? url : `/${url}`
}

export function resolveFileAssetUrl(url: string, fileId?: string): string {
  if (fileId?.startsWith('recording-')) {
    return resolveRecordingFileUrl(fileId.slice('recording-'.length))
  }

  if (url.includes('/api/recordings/') && url.includes('/file')) {
    const match = /\/recordings\/([^/]+)\/file/.exec(url)
    if (match?.[1]) return resolveRecordingFileUrl(decodeURIComponent(match[1]))
    if (url.startsWith('http://') || url.startsWith('https://')) return url
    return resolveMeetingApiPath(asSitePath(url))
  }

  // Nginx static media (new uploads / recordings)
  if (url.startsWith('/static/') || url.startsWith('static/')) {
    return asSitePath(url)
  }
  if ((url.startsWith('http://') || url.startsWith('https://')) && url.includes('/static/')) {
    return url
  }

  if (fileId?.startsWith('external-') || isExternalStoragePath(url)) {
    return resolveExternalFileAssetUrl(url)
  }

  // Prefer DTO / room_sync url when Nest already returned `/static/...`
  if (url.includes('/static/files/') || url.includes('/static/recordings/')) {
    if (url.startsWith('http://') || url.startsWith('https://')) return url
    return asSitePath(url)
  }

  // Legacy: only fileId known, or old `/meet/api/files/:id/content` in room_sync
  if (fileId) {
    return resolveRoomFileContentUrl(fileId)
  }

  if (url.startsWith('http://') || url.startsWith('https://')) return url
  if (isExternalStoragePath(url)) {
    return resolveExternalFileAssetUrl(url)
  }
  return resolveMeetingApiPath(asSitePath(url))
}
