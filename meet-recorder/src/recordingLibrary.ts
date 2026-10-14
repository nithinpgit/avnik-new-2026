import { createReadStream, existsSync } from 'node:fs'
import { readFile, readdir, stat } from 'node:fs/promises'
import { join } from 'node:path'
import type { Request, Response } from 'express'

export type RecordingLibraryEntry = {
  recordingId: string
  roomId: string
  hostUserId: string
  startedAt: string
  stoppedAt: string | null
  sizeBytes: number
  extension: string
  displayName: string
}

export type ResolvedRecordingFile = {
  path: string
  sizeBytes: number
  mimeType: string
  extension: string
}

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
const MIN_OUTPUT_BYTES = 1024

export function isSafeRecordingId(recordingId: string): boolean {
  return UUID_RE.test(recordingId)
}

function formatDisplayDate(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

async function resolveOutputFile(recordingDir: string, recordingId: string): Promise<ResolvedRecordingFile | null> {
  const candidates = [
    { path: join(recordingDir, `${recordingId}.webm`), extension: 'webm', mimeType: 'video/webm' },
    { path: join(recordingDir, `${recordingId}.mp4`), extension: 'mp4', mimeType: 'video/mp4' },
  ]
  for (const candidate of candidates) {
    if (!existsSync(candidate.path)) continue
    const { size } = await stat(candidate.path)
    if (size < MIN_OUTPUT_BYTES) continue
    return {
      path: candidate.path,
      sizeBytes: size,
      mimeType: candidate.mimeType,
      extension: candidate.extension,
    }
  }
  return null
}

export async function listRecordingLibrary(storageDir: string): Promise<RecordingLibraryEntry[]> {
  const recordingsRoot = join(storageDir, 'recordings')
  let dirs: string[]
  try {
    dirs = await readdir(recordingsRoot)
  } catch {
    return []
  }

  const entries: RecordingLibraryEntry[] = []
  for (const recordingId of dirs) {
    if (!isSafeRecordingId(recordingId)) continue

    const recordingDir = join(recordingsRoot, recordingId)
    const output = await resolveOutputFile(recordingDir, recordingId)
    if (!output) continue

    let meta: Record<string, unknown> = {}
    const metaPath = join(recordingDir, 'meta.json')
    if (existsSync(metaPath)) {
      try {
        meta = JSON.parse(await readFile(metaPath, 'utf8')) as Record<string, unknown>
      } catch {
        meta = {}
      }
    }

    const roomId = String(meta.roomId ?? 'unknown')
    const startedAt = String(meta.startedAt ?? '')
    const stoppedAt = meta.stoppedAt ? String(meta.stoppedAt) : null

    entries.push({
      recordingId,
      roomId,
      hostUserId: String(meta.hostUserId ?? ''),
      startedAt,
      stoppedAt,
      sizeBytes: output.sizeBytes,
      extension: output.extension,
      displayName: `Room ${roomId} – ${formatDisplayDate(startedAt || stoppedAt || recordingId)}`,
    })
  }

  return entries.sort((a, b) => {
    const aTime = a.stoppedAt ?? a.startedAt
    const bTime = b.stoppedAt ?? b.startedAt
    return bTime.localeCompare(aTime)
  })
}

export async function resolveRecordingFile(
  storageDir: string,
  recordingId: string,
): Promise<ResolvedRecordingFile | null> {
  if (!isSafeRecordingId(recordingId)) return null
  const recordingDir = join(storageDir, 'recordings', recordingId)
  if (!existsSync(recordingDir)) return null
  return resolveOutputFile(recordingDir, recordingId)
}

export async function streamRecordingFile(
  storageDir: string,
  recordingId: string,
  req: Request,
  res: Response,
): Promise<boolean> {
  const file = await resolveRecordingFile(storageDir, recordingId)
  if (!file) return false

  const range = req.headers.range
  if (range) {
    const match = /^bytes=(\d*)-(\d*)$/.exec(range)
    if (match) {
      const start = match[1] ? Number.parseInt(match[1], 10) : 0
      const end = match[2] ? Number.parseInt(match[2], 10) : file.sizeBytes - 1
      if (start <= end && end < file.sizeBytes) {
        const chunkSize = end - start + 1
        res.status(206)
        res.setHeader('Content-Range', `bytes ${start}-${end}/${file.sizeBytes}`)
        res.setHeader('Accept-Ranges', 'bytes')
        res.setHeader('Content-Length', String(chunkSize))
        res.setHeader('Content-Type', file.mimeType)
        await new Promise<void>((resolve, reject) => {
          const stream = createReadStream(file.path, { start, end })
          stream.on('error', reject)
          stream.on('end', resolve)
          stream.pipe(res)
        })
        return true
      }
    }
  }

  res.status(200)
  res.setHeader('Content-Type', file.mimeType)
  res.setHeader('Accept-Ranges', 'bytes')
  res.setHeader('Content-Length', String(file.sizeBytes))
  await new Promise<void>((resolve, reject) => {
    const stream = createReadStream(file.path)
    stream.on('error', reject)
    stream.on('end', resolve)
    stream.pipe(res)
  })
  return true
}
