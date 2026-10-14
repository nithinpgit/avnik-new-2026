export type MeetingNotificationItem = {
  id: string
  userName: string
  message: string
  createdAt: string
  avatarUrl?: string | null
}

export { RAISE_HAND_CHANNEL } from '../raiseHand/raiseHandTypes'
