export const EXTEND_DURATION_CHANNEL = 'extend_duration'

export type ExtendPaidParticipant = {
  userId: string
  name: string
  at: string
}

export type ExtendOffer = {
  durationSec: number
  /** Absolute allowed session length after this extension (base + all extensions). */
  totalDurationSec: number
  cost: number
  extendedDurationId: number
  hostUserId: string
  createdAt: string
}

/** Persisted room_sync document for extend-duration coordination. */
export type ExtendDurationSyncPayload = {
  /** Bumped when the host signals timer expiry (peers pause / wait). */
  expireNonce: number | null
  /** Host opened extend options via “+” (or after expire) — peers wait. */
  hostSelecting: boolean
  offer: ExtendOffer | null
  paid: ExtendPaidParticipant[]
  /** Host cleared offer after resume or end. */
  clearedAt: string | null
}

export const EMPTY_EXTEND_SYNC: ExtendDurationSyncPayload = {
  expireNonce: null,
  hostSelecting: false,
  offer: null,
  paid: [],
  clearedAt: null,
}

export function parseExtendDurationSync(raw: unknown): ExtendDurationSyncPayload {
  if (!raw || typeof raw !== 'object') return { ...EMPTY_EXTEND_SYNC }
  const o = raw as Record<string, unknown>
  const offerRaw = o.offer
  let offer: ExtendOffer | null = null
  if (offerRaw && typeof offerRaw === 'object') {
    const off = offerRaw as Record<string, unknown>
    const durationSec = Number(off.durationSec)
    const cost = Number(off.cost)
    const extendedDurationId = Number(off.extendedDurationId)
    const hostUserId = String(off.hostUserId ?? '')
    if (Number.isFinite(durationSec) && Number.isFinite(cost) && Number.isFinite(extendedDurationId) && hostUserId) {
      const totalDurationSec = Number(off.totalDurationSec)
      offer = {
        durationSec,
        totalDurationSec: Number.isFinite(totalDurationSec) && totalDurationSec > 0 ? totalDurationSec : 0,
        cost,
        extendedDurationId,
        hostUserId,
        createdAt: String(off.createdAt ?? new Date().toISOString()),
      }
    }
  }
  const paidRaw = Array.isArray(o.paid) ? o.paid : []
  const paid: ExtendPaidParticipant[] = []
  for (const row of paidRaw) {
    if (!row || typeof row !== 'object') continue
    const p = row as Record<string, unknown>
    const userId = String(p.userId ?? '')
    if (!userId) continue
    paid.push({
      userId,
      name: String(p.name ?? 'Participant'),
      at: String(p.at ?? new Date().toISOString()),
    })
  }
  return {
    expireNonce: o.expireNonce == null ? null : Number(o.expireNonce) || null,
    hostSelecting: Boolean(o.hostSelecting),
    offer,
    paid,
    clearedAt: o.clearedAt == null ? null : String(o.clearedAt),
  }
}
