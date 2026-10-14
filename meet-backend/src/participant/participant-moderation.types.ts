export const PARTICIPANT_MODERATION_CHANNEL = 'participant_moderation'

export type UserModerationState = {
  micAllowed: boolean
  camAllowed: boolean
  isPresenter: boolean
}

export type ParticipantModerationPayload = {
  users: Record<string, UserModerationState>
  /** When true, new joiners start muted until individually unmuted. */
  muteAll?: boolean
  /** When true, new joiners start with camera disabled for others. */
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

export function applyModerationAction(
  current: ParticipantModerationPayload,
  targetUserId: string,
  action: ParticipantControlAction,
): ParticipantModerationPayload {
  const users = { ...current.users }
  const prev = users[targetUserId] ?? { ...DEFAULT_USER_MODERATION }

  switch (action) {
    case 'mute_mic':
      users[targetUserId] = { ...prev, micAllowed: false }
      break
    case 'unmute_mic':
      users[targetUserId] = { ...prev, micAllowed: true }
      break
    case 'disable_cam':
      users[targetUserId] = { ...prev, camAllowed: false }
      break
    case 'enable_cam':
      users[targetUserId] = { ...prev, camAllowed: true }
      break
    case 'make_presenter':
      users[targetUserId] = { ...prev, isPresenter: true }
      break
    case 'revoke_presenter':
      users[targetUserId] = { ...prev, isPresenter: false }
      break
    case 'kick':
      delete users[targetUserId]
      break
    default:
      break
  }

  return { ...current, users }
}

export function moderationStateForUser(
  payload: ParticipantModerationPayload,
  userId: string,
  hostUserId: string | null = null,
): UserModerationState {
  if (hostUserId && userId === hostUserId) {
    return { micAllowed: true, camAllowed: true, isPresenter: true }
  }
  const perUser = payload.users[userId]
  return {
    micAllowed: perUser?.micAllowed ?? (payload.muteAll ? false : true),
    camAllowed: perUser?.camAllowed ?? (payload.camOffAll ? false : true),
    isPresenter: perUser?.isPresenter ?? false,
  }
}

export function applyBulkModerationAction(
  current: ParticipantModerationPayload,
  action: ParticipantBulkControlAction,
  participantIds: string[],
): ParticipantModerationPayload {
  const users = { ...current.users }

  const touchAll = (patch: Partial<UserModerationState>) => {
    for (const userId of participantIds) {
      const prev = users[userId] ?? { ...DEFAULT_USER_MODERATION }
      users[userId] = { ...prev, ...patch }
    }
  }

  switch (action) {
    case 'mute_all':
      touchAll({ micAllowed: false })
      return { ...current, users, muteAll: true }
    case 'unmute_all':
      touchAll({ micAllowed: true })
      return { ...current, users, muteAll: false }
    case 'disable_cam_all':
      touchAll({ camAllowed: false })
      return { ...current, users, camOffAll: true }
    case 'enable_cam_all':
      touchAll({ camAllowed: true })
      return { ...current, users, camOffAll: false }
    default:
      return current
  }
}
