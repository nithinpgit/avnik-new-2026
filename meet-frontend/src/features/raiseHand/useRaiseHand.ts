import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { store } from '../../app/store'
import { pushToast } from '../documents/notificationsSlice'
import { useIsMeetingHost } from '../meeting/useIsMeetingHost'
import { useMeetingSocket } from '../meetingRoom/MeetingSocketProvider'
import { selectMeetingDisplayName, selectMeetingUserId } from '../meetingSession/meetingSessionSlice'
import {
  RAISE_HAND_CHANNEL,
  parseRaiseHandState,
  type RaiseHandSyncState,
} from './raiseHandTypes'

function readRaiseHandState(): RaiseHandSyncState {
  return parseRaiseHandState(store.getState().roomSync.channels[RAISE_HAND_CHANNEL])
}

export function useRaiseHandState(): RaiseHandSyncState {
  return useAppSelector((s) => parseRaiseHandState(s.roomSync.channels[RAISE_HAND_CHANNEL]))
}

export function useIsHandRaised(userId: string): boolean {
  const hands = useRaiseHandState().hands
  return Boolean(hands[userId])
}

export function useRaiseHandActions() {
  const dispatch = useAppDispatch()
  const { emitRoomSync } = useMeetingSocket()
  const userId = useAppSelector(selectMeetingUserId)
  const displayName = useAppSelector(selectMeetingDisplayName)
  const isHost = useIsMeetingHost()

  const raiseHand = useCallback(() => {
    if (!userId || isHost) return
    const current = readRaiseHandState()
    const raisedAt = new Date().toISOString()
    const next: RaiseHandSyncState = {
      hands: {
        ...current.hands,
        [userId]: {
          userId,
          name: displayName || 'Participant',
          raisedAt,
        },
      },
    }
    emitRoomSync(RAISE_HAND_CHANNEL, next)
    dispatch(
      pushToast({
        message: 'Raise hand request sent to host',
        variant: 'success',
        durationMs: 4000,
      }),
    )
  }, [dispatch, displayName, emitRoomSync, isHost, userId])

  const dismissRaiseHand = useCallback(
    (targetUserId: string) => {
      if (!isHost || !targetUserId) return
      const current = readRaiseHandState()
      if (!current.hands[targetUserId]) return
      const next: RaiseHandSyncState = { hands: { ...current.hands } }
      delete next.hands[targetUserId]
      emitRoomSync(RAISE_HAND_CHANNEL, next)
    },
    [emitRoomSync, isHost],
  )

  return { raiseHand, dismissRaiseHand }
}
