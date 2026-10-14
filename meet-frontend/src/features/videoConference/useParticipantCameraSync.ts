import { useCallback, useEffect } from 'react'
import { useAppSelector } from '../../app/hooks'
import { store } from '../../app/store'
import { useMeetingSocket } from '../meetingRoom/MeetingSocketProvider'
import { selectMeetingUserId } from '../meetingSession/meetingSessionSlice'
import { selectLocalMediaRevision, selectLocalStream } from './videoConferenceSlice'
import {
  PARTICIPANT_CAMERA_CHANNEL,
  parseParticipantCameraMap,
  type ParticipantCameraMap,
} from './participantCameraTypes'

export function useParticipantCamOn(userId: string): boolean {
  const map = useAppSelector((s) =>
    parseParticipantCameraMap(s.roomSync.channels[PARTICIPANT_CAMERA_CHANNEL]),
  )
  if (map[userId] === undefined) return true
  return map[userId]!.camOn
}

/** Broadcasts local camera on/off so remote tiles show the avatar placeholder. */
export function useBroadcastLocalCameraState() {
  const { emitRoomSync } = useMeetingSocket()
  const userId = useAppSelector(selectMeetingUserId)
  const localStream = useAppSelector(selectLocalStream)
  const localMediaRevision = useAppSelector(selectLocalMediaRevision)

  const publish = useCallback(
    (camOn: boolean) => {
      if (!userId) return
      const current = parseParticipantCameraMap(
        store.getState().roomSync.channels[PARTICIPANT_CAMERA_CHANNEL],
      )
      if (current[userId]?.camOn === camOn) return
      const next: ParticipantCameraMap = { ...current, [userId]: { camOn } }
      emitRoomSync(PARTICIPANT_CAMERA_CHANNEL, next)
    },
    [emitRoomSync, userId],
  )

  useEffect(() => {
    const vt = localStream?.getVideoTracks().find((t) => t.kind === 'video')
    if (!vt || !userId) return
    publish(vt.enabled)
  }, [localStream, localMediaRevision, userId, publish])

  return publish
}
