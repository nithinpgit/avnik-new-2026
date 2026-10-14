export const RAISE_HAND_CHANNEL = 'raise_hand'

export type RaiseHandEntry = {
  userId: string
  name: string
  raisedAt: string
}

export type RaiseHandSyncState = {
  hands: Record<string, RaiseHandEntry>
}

export const EMPTY_RAISE_HAND_STATE: RaiseHandSyncState = { hands: {} }

export function parseRaiseHandState(raw: unknown): RaiseHandSyncState {
  if (!raw || typeof raw !== 'object') {
    return { hands: {} }
  }
  const o = raw as Record<string, unknown>

  // Legacy single-entry payload (pre-map sync).
  if (typeof o.userId === 'string' && typeof o.name === 'string') {
    const userId = o.userId
    return {
      hands: {
        [userId]: {
          userId,
          name: o.name,
          raisedAt: typeof o.at === 'string' ? o.at : new Date().toISOString(),
        },
      },
    }
  }

  const handsRaw = o.hands
  if (!handsRaw || typeof handsRaw !== 'object') {
    return { hands: {} }
  }

  const hands: Record<string, RaiseHandEntry> = {}
  for (const [key, value] of Object.entries(handsRaw as Record<string, unknown>)) {
    if (!value || typeof value !== 'object') continue
    const entry = value as Record<string, unknown>
    const userId = typeof entry.userId === 'string' ? entry.userId : key
    const name = typeof entry.name === 'string' ? entry.name : 'Participant'
    hands[userId] = {
      userId,
      name,
      raisedAt: typeof entry.raisedAt === 'string' ? entry.raisedAt : new Date().toISOString(),
    }
  }
  return { hands }
}
