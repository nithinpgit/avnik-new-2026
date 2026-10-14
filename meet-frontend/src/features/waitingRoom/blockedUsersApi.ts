import { resolveMeetingApiPath } from '../meetingRoom/socketUrl'

export type BlockedUserRow = {
  userId: string
  blockedBy: string | null
  blockedAt: string
}

export const BLOCKED_ROOM_MESSAGE = 'You are blocked for this room please contact host'

type BlockedUsersResponse = {
  roomId?: string
  users?: BlockedUserRow[]
}

type BlockedCheckResponse = {
  blocked?: boolean
  message?: string | null
}

export async function checkUserBlockedForRoom(
  roomId: string,
  userId: string,
): Promise<{ blocked: boolean; message: string | null }> {
  const res = await fetch(
    resolveMeetingApiPath(
      `/api/rooms/${encodeURIComponent(roomId)}/blocked-users/check/${encodeURIComponent(userId)}`,
    ),
    { credentials: 'include' },
  )
  if (!res.ok) {
    throw new Error('Could not verify room access')
  }
  const data = (await res.json()) as BlockedCheckResponse
  return {
    blocked: data.blocked === true,
    message: data.blocked ? data.message ?? BLOCKED_ROOM_MESSAGE : null,
  }
}

export async function fetchBlockedUsersForRoom(roomId: string): Promise<BlockedUserRow[]> {
  const res = await fetch(
    resolveMeetingApiPath(`/api/rooms/${encodeURIComponent(roomId)}/blocked-users`),
    { credentials: 'include' },
  )
  if (!res.ok) {
    throw new Error('Could not load blocked users')
  }
  const data = (await res.json()) as BlockedUsersResponse
  return Array.isArray(data.users) ? data.users : []
}

export async function blockUserForRoom(
  roomId: string,
  userId: string,
  blockedBy?: string,
): Promise<void> {
  const res = await fetch(resolveMeetingApiPath(`/api/rooms/${encodeURIComponent(roomId)}/blocked-users`), {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, blockedBy }),
  })
  if (!res.ok) {
    throw new Error('Could not block user')
  }
}

export async function unblockUserForRoom(roomId: string, userId: string): Promise<void> {
  const res = await fetch(
    resolveMeetingApiPath(
      `/api/rooms/${encodeURIComponent(roomId)}/blocked-users/${encodeURIComponent(userId)}`,
    ),
    {
      method: 'DELETE',
      credentials: 'include',
    },
  )
  if (!res.ok) {
    throw new Error('Could not unblock user')
  }
}
