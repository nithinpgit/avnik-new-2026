import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { store } from '../../app/store'
import { pushToast } from '../documents/notificationsSlice'
import { useIsMeetingHost } from '../meeting/useIsMeetingHost'
import { selectMeetingRoomId, selectMeetingUserId, selectMeetingSlotId } from '../meetingSession/meetingSessionSlice'
import { useMeetingSocket } from '../meetingRoom/MeetingSocketProvider'
import { blockUserForRoom } from '../waitingRoom/blockedUsersApi'
import { blockMeetingRoomUser } from '../externalApi/client'
import { closeParticipantMenu } from '../videoConference/videoConferenceSlice'
import {
  closeKickConfirm,
  openKickConfirm,
  selectKickConfirmTarget,
  selectUserModeration,
} from './participantModerationSlice'
import type { ParticipantBulkControlAction, ParticipantControlAction } from './participantModerationTypes'

export function useParticipantModeration() {
  const dispatch = useAppDispatch()
  const { socket } = useMeetingSocket()
  const roomId = useAppSelector(selectMeetingRoomId)
  const slotId = useAppSelector(selectMeetingSlotId)
  const isHost = useIsMeetingHost()

  const emitControl = useCallback(
    (targetUserId: string, action: ParticipantControlAction) => {
      if (!isHost || !socket?.connected || !roomId) {
        dispatch(pushToast({ message: 'Only the host can control participants.', variant: 'error' }))
        return
      }
      socket.emit('participant_control', { roomId, targetUserId, action })
      dispatch(closeParticipantMenu())
    },
    [dispatch, isHost, roomId, socket],
  )

  const requestKick = useCallback(
    (targetUserId: string, targetName: string) => {
      dispatch(closeParticipantMenu())
      dispatch(openKickConfirm({ userId: targetUserId, name: targetName }))
    },
    [dispatch],
  )

  const confirmKick = useCallback(
    async (blockPersist = false) => {
      const target = selectKickConfirmTarget(store.getState())
      const rid = selectMeetingRoomId(store.getState())
      const hostUserId = selectMeetingUserId(store.getState())
      if (!target || !rid) return
      try {
        if (blockPersist) {
          await blockUserForRoom(rid, target.userId, hostUserId ?? undefined)
          if (slotId) {
            try {
              await blockMeetingRoomUser({ roomId: slotId, userId: target.userId, block: true })
            } catch {
              /* internal block succeeded; external sync is best-effort */
            }
          }
        }
        emitControl(target.userId, 'kick')
        dispatch(closeKickConfirm())
        dispatch(
          pushToast({
            message: blockPersist
              ? `${target.name} was removed and blocked from rejoining.`
              : `${target.name} was removed from the meeting.`,
            variant: 'info',
            durationMs: 3500,
          }),
        )
      } catch {
        dispatch(pushToast({ message: 'Could not remove participant.', variant: 'error' }))
      }
    },
    [dispatch, emitControl, slotId],
  )

  const cancelKick = useCallback(() => {
    dispatch(closeKickConfirm())
  }, [dispatch])

  const emitBulkControl = useCallback(
    (action: ParticipantBulkControlAction) => {
      if (!isHost || !socket?.connected || !roomId) {
        dispatch(pushToast({ message: 'Only the host can control participants.', variant: 'error' }))
        return
      }
      socket.emit('participant_bulk_control', { roomId, action })
    },
    [dispatch, isHost, roomId, socket],
  )

  return {
    emitControl,
    emitBulkControl,
    requestKick,
    confirmKick,
    cancelKick,
  }
}

export function useParticipantModerationState(userId: string) {
  return useAppSelector(selectUserModeration(userId))
}
