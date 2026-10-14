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

export function isRecorderPeer(userId: string): boolean {
  return userId.startsWith('recorder-')
}

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
