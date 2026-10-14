import { mkdirSync } from 'node:fs'
import { resolve } from 'node:path'

function readInt(name: string, fallback: number): number {
  const raw = process.env[name]?.trim()
  if (!raw) return fallback
  const n = Number.parseInt(raw, 10)
  return Number.isFinite(n) ? n : fallback
}

export const config = {
  port: readInt('PORT', 4000),
  storageDir: resolve(process.env.STORAGE_DIR?.trim() || './storage'),
  frontendUrl: (process.env.FRONTEND_URL?.trim() || 'http://localhost:5173/join').replace(/\/$/, ''),
  meetingApiUrl: (process.env.MEETING_API_URL?.trim() || 'http://localhost:3000').replace(/\/$/, ''),
  recorderPublicUrl: (process.env.RECORDER_PUBLIC_URL?.trim() || 'http://127.0.0.1:4000').replace(
    /\/$/,
    '',
  ),
  /** WebSocket URL for mediaserver, passed to the recorder page (headless Chrome in Docker). */
  mediaPublicWsUrl: (process.env.MEDIA_PUBLIC_WS_URL?.trim() || '').replace(/\/$/, ''),
  chromeExecutablePath: process.env.CHROME_EXECUTABLE_PATH?.trim() || '',
  chunkIntervalMs: readInt('CHUNK_INTERVAL_MS', 5000),
  readyTimeoutMs: readInt('READY_TIMEOUT_MS', 120_000),
  stopGraceMs: readInt('STOP_GRACE_MS', 15000),
  maxParallelRecordings: readInt('MAX_PARALLEL_RECORDINGS', 10),
  viewportWidth: readInt('VIEWPORT_WIDTH', 1920),
  viewportHeight: readInt('VIEWPORT_HEIGHT', 1080),
}

mkdirSync(config.storageDir, { recursive: true })
