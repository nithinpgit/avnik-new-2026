export const PARTICIPANT_CAMERA_CHANNEL = 'participant_camera'

export type ParticipantCameraMap = Record<string, { camOn: boolean }>

export function parseParticipantCameraMap(raw: unknown): ParticipantCameraMap {
  if (!raw || typeof raw !== 'object') return {}
  const out: ParticipantCameraMap = {}
  for (const [userId, value] of Object.entries(raw as Record<string, unknown>)) {
    if (value && typeof value === 'object' && 'camOn' in value) {
      out[userId] = { camOn: Boolean((value as { camOn: unknown }).camOn) }
    }
  }
  return out
}
