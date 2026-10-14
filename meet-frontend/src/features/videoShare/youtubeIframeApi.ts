let youtubeApiPromise: Promise<void> | null = null

export type YoutubePlayerInstance = {
  playVideo: () => void
  pauseVideo: () => void
  seekTo: (seconds: number, allowSeekAhead: boolean) => void
  getCurrentTime: () => number
  getDuration: () => number
  getPlayerState: () => number
  setVolume: (volume: number) => void
  mute: () => void
  unMute: () => void
  isMuted: () => boolean
  destroy: () => void
}

type YoutubePlayerCtor = new (
  elementId: string,
  options: {
    videoId: string
    playerVars?: Record<string, string | number>
    events?: {
      onReady?: (event: { target: YoutubePlayerInstance }) => void
      onStateChange?: (event: { data: number; target: YoutubePlayerInstance }) => void
    }
  },
) => YoutubePlayerInstance

declare global {
  interface Window {
    YT?: { Player: YoutubePlayerCtor; PlayerState: { PLAYING: number; PAUSED: number } }
    onYouTubeIframeAPIReady?: () => void
  }
}

export const YT_STATE_PLAYING = 1
export const YT_STATE_PAUSED = 2

export function loadYoutubeIframeApi(): Promise<void> {
  if (window.YT?.Player) return Promise.resolve()
  if (youtubeApiPromise) return youtubeApiPromise

  youtubeApiPromise = new Promise((resolve, reject) => {
    const prev = window.onYouTubeIframeAPIReady
    window.onYouTubeIframeAPIReady = () => {
      prev?.()
      resolve()
    }

    const existing = document.querySelector<HTMLScriptElement>('script[data-youtube-iframe-api]')
    if (!existing) {
      const script = document.createElement('script')
      script.src = 'https://www.youtube.com/iframe_api'
      script.async = true
      script.dataset.youtubeIframeApi = '1'
      script.onerror = () => reject(new Error('YouTube iframe API failed to load'))
      document.head.appendChild(script)
    } else if (window.YT?.Player) {
      resolve()
    }
  })

  return youtubeApiPromise
}

export function createYoutubePlayer(
  elementId: string,
  videoId: string,
  events: {
    onReady?: (player: YoutubePlayerInstance) => void
    onStateChange?: (state: number, player: YoutubePlayerInstance) => void
  },
): YoutubePlayerInstance | null {
  const Player = window.YT?.Player
  if (!Player) return null

  return new Player(elementId, {
    videoId,
    playerVars: {
      controls: 0,
      rel: 0,
      modestbranding: 1,
      playsinline: 1,
      disablekb: 1,
      fs: 0,
      iv_load_policy: 3,
      cc_load_policy: 0,
      enablejsapi: 1,
      origin: typeof window !== 'undefined' ? window.location.origin : '',
    },
    events: {
      onReady: (event) => events.onReady?.(event.target),
      onStateChange: (event) => events.onStateChange?.(event.data, event.target),
    },
  })
}
