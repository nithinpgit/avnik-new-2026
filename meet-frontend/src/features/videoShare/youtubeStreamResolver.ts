const PIPED_INSTANCES = [
  'https://pipedapi.kavin.rocks',
  'https://pipedapi.adminforge.de',
] as const

type PipedStream = {
  url?: string
  mimeType?: string
  format?: string
}

type PipedResponse = {
  videoStreams?: PipedStream[]
}

/** Thumbnail URL — always capturable on canvas (unlike cross-origin iframe). */
export function youtubeThumbnailUrl(videoId: string): string {
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
}

/**
 * Resolve a direct MP4-ish stream for headless recording.
 * YouTube iframes cannot be painted to canvas; a plain &lt;video&gt; element can.
 */
export async function resolveYoutubeStreamUrl(videoId: string): Promise<string | null> {
  for (const base of PIPED_INSTANCES) {
    try {
      const res = await fetch(`${base}/streams/${encodeURIComponent(videoId)}`, {
        signal: AbortSignal.timeout(12_000),
      })
      if (!res.ok) continue
      const data = (await res.json()) as PipedResponse
      const streams = data.videoStreams ?? []
      const mp4 =
        streams.find((s) => s.mimeType?.includes('video/mp4') || s.format === 'MPEG_4') ??
        streams[0]
      if (mp4?.url) return mp4.url
    } catch {
      /* try next instance */
    }
  }
  return null
}
