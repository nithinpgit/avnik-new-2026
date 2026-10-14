export const WAITING_ROOM_CHANNEL = 'waiting_room'

export type WaitingRoomSyncPayload = {
  autoAcceptAll: boolean
}

export type JoinRequest = {
  userId: string
  name: string
  profileImage: string | null
}

export type AdmissionStatus = 'idle' | 'pending' | 'admitted' | 'denied' | 'blocked'

export function parseWaitingRoomPayload(raw: unknown): WaitingRoomSyncPayload {
  if (!raw || typeof raw !== 'object') {
    return { autoAcceptAll: false }
  }
  const o = raw as Record<string, unknown>
  return { autoAcceptAll: o.autoAcceptAll === true }
}
