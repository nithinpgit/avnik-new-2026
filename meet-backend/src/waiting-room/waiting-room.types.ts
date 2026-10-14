export const WAITING_ROOM_CHANNEL = 'waiting_room'

export type WaitingRoomSyncPayload = {
  autoAcceptAll: boolean
}

export type WaitingReason = 'waiting_for_host' | 'waiting_for_admission'

export function parseWaitingRoomPayload(raw: unknown): WaitingRoomSyncPayload {
  if (!raw || typeof raw !== 'object') {
    return { autoAcceptAll: false }
  }
  const o = raw as Record<string, unknown>
  return {
    autoAcceptAll: o.autoAcceptAll === true,
  }
}
