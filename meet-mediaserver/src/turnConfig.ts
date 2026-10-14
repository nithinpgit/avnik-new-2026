export type TurnIceServer = {
  urls: string | string[]
  username?: string
  credential?: string
}

function parseTurnUrls(raw: string | undefined): string[] {
  if (!raw?.trim()) return []
  return raw
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean)
}

/** Build RTCIceServer list from TURN_URLS + TURN_USERNAME + TURN_PASSWORD. */
export function resolveTurnIceServers(): TurnIceServer[] {
  const urls = parseTurnUrls(process.env.TURN_URLS)
  if (urls.length === 0) return []

  const username = process.env.TURN_USERNAME?.trim()
  const credential = process.env.TURN_PASSWORD?.trim()
  if (!username || !credential) {
    console.warn('[meet-mediaserver] TURN_URLS is set but TURN_USERNAME or TURN_PASSWORD is missing — TURN disabled')
    return []
  }

  return [{ urls, username, credential }]
}
