import { useMemo } from 'react'
import { useAppSelector } from '../../app/hooks'
import { useIsMeetingHost } from '../meeting/useIsMeetingHost'
import { selectMeetingUserId } from '../meetingSession/meetingSessionSlice'
import { selectUserModeration } from './participantModerationSlice'
import { canUserPresentAndEditWhiteboard } from './participantModerationTypes'

export function useMeetingPermissions() {
  const userId = useAppSelector(selectMeetingUserId)
  const isHost = useIsMeetingHost()
  const selfModeration = useAppSelector(selectUserModeration(userId ?? ''))

  return useMemo(() => {
    const canPresent = canUserPresentAndEditWhiteboard(isHost, selfModeration)
    const isPresenter = isHost || selfModeration.isPresenter
    return {
      isHost,
      isPresenter,
      canModerateParticipants: isHost,
      canPresentContent: canPresent,
      canEditWhiteboard: canPresent,
      canUseHostBulkControls: isHost,
    }
  }, [isHost, selfModeration])
}
