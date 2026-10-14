export const PARTICIPANT_MODERATION_CHANNEL = 'participant_moderation'

export type UserModerationState = {
  micAllowed: boolean
  camAllowed: boolean
  isPresenter: boolean
}

export type ParticipantModerationPayload = {
  users: Record<string, UserModerationState>
  muteAll?: boolean
  camOffAll?: boolean
}

export const DEFAULT_USER_MODERATION: UserModerationState = {
  micAllowed: true,
  camAllowed: true,
  isPresenter: false,
}

export type ParticipantControlAction =
  | 'mute_mic'
  | 'unmute_mic'
  | 'disable_cam'
  | 'enable_cam'
  | 'make_presenter'
  | 'revoke_presenter'
  | 'kick'

export type ParticipantBulkControlAction =
  | 'mute_all'
  | 'unmute_all'
  | 'disable_cam_all'
  | 'enable_cam_all'

export function parseModerationPayload(raw: unknown): ParticipantModerationPayload {
  if (!raw || typeof raw !== 'object') {
    return { users: {} }
  }
  const o = raw as Record<string, unknown>
  const usersRaw = o.users
  if (!usersRaw || typeof usersRaw !== 'object') {
    return {
      users: {},
      muteAll: o.muteAll === true,
      camOffAll: o.camOffAll === true,
    }
  }
  const users: Record<string, UserModerationState> = {}
  for (const [userId, value] of Object.entries(usersRaw)) {
    if (!value || typeof value !== 'object') continue
    const v = value as Record<string, unknown>
    users[userId] = {
      micAllowed: v.micAllowed !== false,
      camAllowed: v.camAllowed !== false,
      isPresenter: v.isPresenter === true,
    }
  }
  return {
    users,
    muteAll: o.muteAll === true,
    camOffAll: o.camOffAll === true,
  }
}

export function moderationForUser(
  payload: ParticipantModerationPayload,
  userId: string,
  isRoomHost = false,
): UserModerationState {
  if (isRoomHost) {
    return { micAllowed: true, camAllowed: true, isPresenter: true }
  }
  const perUser = payload.users[userId]
  return {
    micAllowed: perUser?.micAllowed ?? (payload.muteAll ? false : true),
    camAllowed: perUser?.camAllowed ?? (payload.camOffAll ? false : true),
    isPresenter: perUser?.isPresenter ?? false,
  }
}

export function isRoomHostUser(
  userId: string,
  sessionUserId: string | undefined,
  sessionRole: string | undefined,
  participants: { id: string; role: string }[],
): boolean {
  if (!userId) return false
  if (sessionUserId === userId && sessionRole === 'host') return true
  return participants.some((p) => p.id === userId && p.role === 'host')
}

/** Host always has sharing/whiteboard control; others when flagged as presenter. */
export function canUserPresentAndEditWhiteboard(
  isHost: boolean,
  selfModeration: UserModerationState,
): boolean {
  if (isHost) return true
  return selfModeration.isPresenter
}
