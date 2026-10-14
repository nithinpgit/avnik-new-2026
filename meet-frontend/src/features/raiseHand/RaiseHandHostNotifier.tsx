import { useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { pushToast } from '../documents/notificationsSlice'
import { useIsMeetingHost } from '../meeting/useIsMeetingHost'
import { selectMeetingUserId } from '../meetingSession/meetingSessionSlice'
import { useRaiseHandState } from './useRaiseHand'

/** Host toast when a participant raises their hand. */
export function RaiseHandHostNotifier() {
  const dispatch = useAppDispatch()
  const isHost = useIsMeetingHost()
  const selfId = useAppSelector(selectMeetingUserId)
  const hands = useRaiseHandState().hands
  const seenRaisedAtRef = useRef<Record<string, string>>({})
  const initializedRef = useRef(false)

  useEffect(() => {
    if (!isHost || !selfId) return

    if (!initializedRef.current) {
      for (const [userId, entry] of Object.entries(hands)) {
        if (userId !== selfId) {
          seenRaisedAtRef.current[userId] = entry.raisedAt
        }
      }
      initializedRef.current = true
      return
    }

    for (const [userId, entry] of Object.entries(hands)) {
      if (userId === selfId) continue
      if (seenRaisedAtRef.current[userId] === entry.raisedAt) continue
      seenRaisedAtRef.current[userId] = entry.raisedAt
      dispatch(
        pushToast({
          message: `New raise hand request received from ${entry.name}`,
          variant: 'info',
          durationMs: 5000,
        }),
      )
    }

    for (const userId of Object.keys(seenRaisedAtRef.current)) {
      if (!hands[userId]) {
        delete seenRaisedAtRef.current[userId]
      }
    }
  }, [dispatch, hands, isHost, selfId])

  return null
}
