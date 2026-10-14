export const RECORDING_CHANNEL = 'recording'

export type RecordingSyncPayload = {
  active: boolean
  recordingId: string | null
  startedAt: string | null
  startedBy: string | null
  stoppedAt?: string | null
  status?: 'starting' | 'recording' | 'stopping' | 'completed' | 'failed'
  outputPath?: string | null
  error?: string | null
}

export function parseRecordingPayload(raw: unknown): RecordingSyncPayload | null {
  if (!raw || typeof raw !== 'object') return null
  const o = raw as Record<string, unknown>
  return {
    active: Boolean(o.active),
    recordingId: typeof o.recordingId === 'string' ? o.recordingId : null,
    startedAt: typeof o.startedAt === 'string' ? o.startedAt : null,
    startedBy: typeof o.startedBy === 'string' ? o.startedBy : null,
    stoppedAt: typeof o.stoppedAt === 'string' ? o.stoppedAt : null,
    status:
      o.status === 'starting' ||
      o.status === 'recording' ||
      o.status === 'stopping' ||
      o.status === 'completed' ||
      o.status === 'failed'
        ? o.status
        : undefined,
    outputPath: typeof o.outputPath === 'string' ? o.outputPath : null,
    error: typeof o.error === 'string' ? o.error : null,
  }
}

export function emptyRecordingPayload(): RecordingSyncPayload {
  return {
    active: false,
    recordingId: null,
    startedAt: null,
    startedBy: null,
    stoppedAt: null,
    status: undefined,
    outputPath: null,
    error: null,
  }
}
