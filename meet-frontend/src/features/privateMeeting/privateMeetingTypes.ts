export const PRIVATE_MEETING_CHANNEL = 'private_meeting'

export type PrivateMeetingJoinMode = 'cammic' | 'mic'

export type PrivateMeetingSignalMethod =
  | 'requestPvMeeting'
  | 'rejectPvMeeting'
  | 'acceptPvMeeting'
  | 'stopPvMeeting'

export type PrivateMeetingSignal = {
  method: PrivateMeetingSignalMethod
  receiverId: string
  senderId: string
  senderName: string
}

export type PrivateMeetingSyncState = {
  active: boolean
  participants: string[]
  /** User ids that have entered the private session (mic/cam isolated). */
  joined: string[]
}

export const EMPTY_PRIVATE_MEETING_SYNC: PrivateMeetingSyncState = {
  active: false,
  participants: [],
  joined: [],
}

export function parsePrivateMeetingSync(raw: unknown): PrivateMeetingSyncState {
  if (!raw || typeof raw !== 'object') {
    return EMPTY_PRIVATE_MEETING_SYNC
  }
  const o = raw as Record<string, unknown>
  const participants = Array.isArray(o.participants)
    ? o.participants.filter((id): id is string => typeof id === 'string')
    : []
  const joined = Array.isArray(o.joined)
    ? o.joined.filter((id): id is string => typeof id === 'string')
    : []
  return {
    active: o.active === true,
    participants,
    joined,
  }
}

export type PrivateMeetingModalKind =
  | 'incoming_request'
  | 'incoming_accept'
  | 'rejected'
  | 'stopped'

export type PrivateMeetingModalState = {
  kind: PrivateMeetingModalKind
  partnerId: string
  partnerName: string
}

/** Whether local user should consume A/V from a remote peer. */
export function shouldConsumePeerMedia(
  myUserId: string,
  peerId: string,
  sync: PrivateMeetingSyncState,
  localPartnerId: string | null,
): boolean {
  if (peerId === myUserId) return false

  if (localPartnerId) {
    return peerId === localPartnerId
  }

  if (!sync.active) {
    return true
  }

  if (sync.joined.includes(peerId)) {
    return false
  }

  // Host is in the pair but has not entered private mode yet — keep normal room media.
  if (sync.participants.includes(myUserId)) {
    return true
  }

  // Observers: hide both pair members once everyone in the pair has joined.
  if (
    sync.participants.includes(peerId) &&
    sync.joined.length > 0 &&
    sync.joined.length === sync.participants.length
  ) {
    return false
  }

  return true
}
