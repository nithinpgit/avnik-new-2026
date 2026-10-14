import { useBroadcastLocalCameraState } from './useParticipantCameraSync'

/** Keeps `participant_camera` room_sync in sync with the local video track. */
export function ParticipantCameraPublisher() {
  useBroadcastLocalCameraState()
  return null
}
