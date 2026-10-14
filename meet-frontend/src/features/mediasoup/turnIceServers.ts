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

/** Optional build-time TURN config (Vite env). Mediaserver `getIceServers` takes precedence. */
export function resolveViteTurnIceServers(): TurnIceServer[] {
  const urls = parseTurnUrls(import.meta.env.VITE_TURN_URLS)
  if (urls.length === 0) return []

  const username = import.meta.env.VITE_TURN_USERNAME?.trim()
  const credential = import.meta.env.VITE_TURN_PASSWORD?.trim()
  if (!username || !credential) return []

  return [{ urls, username, credential }]
}

export function normalizeTurnIceServers(raw: unknown): TurnIceServer[] {
  if (!Array.isArray(raw)) return []
  const out: TurnIceServer[] = []
  for (const entry of raw) {
    if (!entry || typeof entry !== 'object') continue
    const o = entry as Record<string, unknown>
    const urls = o.urls
    if (typeof urls === 'string' && urls.trim()) {
      out.push({
        urls: urls.trim(),
        username: typeof o.username === 'string' ? o.username : undefined,
        credential: typeof o.credential === 'string' ? o.credential : undefined,
      })
      continue
    }
    if (Array.isArray(urls)) {
      const list = urls.filter((u): u is string => typeof u === 'string' && u.trim().length > 0)
      if (list.length === 0) continue
      out.push({
        urls: list,
        username: typeof o.username === 'string' ? o.username : undefined,
        credential: typeof o.credential === 'string' ? o.credential : undefined,
      })
    }
  }
  return out
}

export function resolveTurnIceServers(serverRaw: unknown): TurnIceServer[] {
  const fromServer = normalizeTurnIceServers(
    (serverRaw as { iceServers?: unknown } | null)?.iceServers,
  )
  if (fromServer.length > 0) return fromServer
  return resolveViteTurnIceServers()
}
