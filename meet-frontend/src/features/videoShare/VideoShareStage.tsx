import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { useAppSelector } from '../../app/hooks'
import { resolveFileAssetUrl } from '../documents/documentsApi'
import { useMeetingPermissions } from '../participantControls/useMeetingPermissions'
import { useRecorderUiActive } from '../recording/useRecorderUiActive'
import { selectActiveVideoShare } from './videoShareSlice'
import type { VideoShareSyncPayload } from './videoShareTypes'
import { youtubeThumbnailUrl } from './youtubeStreamResolver'
import { resolveYoutubeStreamUrl } from './youtubeStreamResolver'
import { useVideoShareSync } from './useVideoShareSync'
import { VideoShareControls } from './VideoShareControls'
import {
  createYoutubePlayer,
  loadYoutubeIframeApi,
  YT_STATE_PLAYING,
  type YoutubePlayerInstance,
} from './youtubeIframeApi'
import './videoShareControls.css'
import './videoShareStage.css'

const SYNC_INTERVAL_MS = 2000
const DRIFT_THRESHOLD_SEC = 0.75

type Mp4PlayerProps = {
  src: string
  fileId: string
  sync: VideoShareSyncPayload
  canControlPlayback: boolean
  onSync: (patch: Partial<VideoShareSyncPayload>) => void
  forceMuted?: boolean
}

function Mp4Player({ src, fileId, sync, canControlPlayback, onSync, forceMuted = false }: Mp4PlayerProps) {
  const hostRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const lastEmitRef = useRef(0)
  const applyingRemoteRef = useRef(false)
  const [volume, setVolume] = useState(1)
  const [userMuted, setUserMuted] = useState(false)
  const [uiTimeSec, setUiTimeSec] = useState(sync.currentTimeSec)
  const [uiDurationSec, setUiDurationSec] = useState(sync.durationSec)
  const [isPlaying, setIsPlaying] = useState(sync.isPlaying)

  const effectiveMuted = forceMuted || userMuted

  useEffect(() => {
    if (canControlPlayback) return
    setIsPlaying(sync.isPlaying)
    const el = videoRef.current
    if (!el) return

    applyingRemoteRef.current = true
    const drift = Math.abs(el.currentTime - sync.currentTimeSec)
    if (drift > DRIFT_THRESHOLD_SEC) {
      el.currentTime = sync.currentTimeSec
      setUiTimeSec(sync.currentTimeSec)
    }
    if (sync.isPlaying && el.paused) {
      void el.play().catch(() => undefined)
    } else if (!sync.isPlaying && !el.paused) {
      el.pause()
    }
    window.setTimeout(() => {
      applyingRemoteRef.current = false
    }, 100)
  }, [canControlPlayback, sync.currentTimeSec, sync.isPlaying])

  useEffect(() => {
    const el = videoRef.current
    if (!el) return
    el.volume = volume
    el.muted = effectiveMuted
  }, [volume, effectiveMuted])

  const emitState = useCallback(() => {
    const el = videoRef.current
    if (!el || !canControlPlayback || applyingRemoteRef.current) return
    const now = Date.now()
    if (now - lastEmitRef.current < SYNC_INTERVAL_MS) return
    lastEmitRef.current = now
    onSync({
      currentTimeSec: el.currentTime,
      isPlaying: !el.paused,
      durationSec: Number.isFinite(el.duration) ? el.duration : sync.durationSec,
    })
  }, [canControlPlayback, onSync, sync.durationSec])

  const revertViewerPlayback = useCallback(() => {
    const el = videoRef.current
    if (!el || canControlPlayback) return
    applyingRemoteRef.current = true
    if (Math.abs(el.currentTime - sync.currentTimeSec) > DRIFT_THRESHOLD_SEC) {
      el.currentTime = sync.currentTimeSec
      setUiTimeSec(sync.currentTimeSec)
    }
    if (sync.isPlaying && el.paused) {
      void el.play().catch(() => undefined)
    } else if (!sync.isPlaying && !el.paused) {
      el.pause()
    }
    setIsPlaying(sync.isPlaying)
    window.setTimeout(() => {
      applyingRemoteRef.current = false
    }, 100)
  }, [canControlPlayback, sync.currentTimeSec, sync.isPlaying])

  const handlePlayPause = () => {
    const el = videoRef.current
    if (!el || !canControlPlayback) return
    if (el.paused) {
      void el.play().catch(() => undefined)
      setIsPlaying(true)
      onSync({ isPlaying: true, currentTimeSec: el.currentTime })
    } else {
      el.pause()
      setIsPlaying(false)
      onSync({ isPlaying: false, currentTimeSec: el.currentTime })
    }
  }

  const handleSeek = (timeSec: number) => {
    const el = videoRef.current
    if (!el || !canControlPlayback) return
    el.currentTime = timeSec
    setUiTimeSec(timeSec)
    onSync({
      currentTimeSec: timeSec,
      isPlaying: !el.paused,
      durationSec: Number.isFinite(el.duration) ? el.duration : sync.durationSec,
    })
  }

  const handleFullscreen = () => {
    const host = hostRef.current
    if (!host) return
    if (document.fullscreenElement) {
      void document.exitFullscreen()
    } else {
      void host.requestFullscreen()
    }
  }

  return (
    <div
      ref={hostRef}
      className={`video-share-player${canControlPlayback ? ' video-share-player--presenter' : ''}`}
    >
      <video
        ref={videoRef}
        className="video-share-stage__media"
        src={resolveFileAssetUrl(src, fileId)}
        playsInline
        muted={effectiveMuted}
        controls={false}
        autoPlay={sync.isPlaying}
        onLoadedMetadata={() => {
          const el = videoRef.current
          if (!el) return
          const dur = Number.isFinite(el.duration) ? el.duration : 0
          setUiDurationSec(dur)
          if (canControlPlayback && dur > 0) {
            onSync({ durationSec: dur })
          }
        }}
        onPlay={() => {
          if (applyingRemoteRef.current) return
          if (!canControlPlayback) {
            revertViewerPlayback()
            return
          }
          setIsPlaying(true)
          onSync({ isPlaying: true, currentTimeSec: videoRef.current?.currentTime ?? 0 })
        }}
        onPause={() => {
          if (applyingRemoteRef.current) return
          if (!canControlPlayback) {
            revertViewerPlayback()
            return
          }
          setIsPlaying(false)
          onSync({ isPlaying: false, currentTimeSec: videoRef.current?.currentTime ?? 0 })
        }}
        onTimeUpdate={() => {
          const el = videoRef.current
          if (!el) return
          setUiTimeSec(el.currentTime)
          emitState()
        }}
      />
      <VideoShareControls
        canControlPlayback={canControlPlayback}
        isPlaying={isPlaying}
        currentTimeSec={uiTimeSec}
        durationSec={uiDurationSec || sync.durationSec}
        volume={volume}
        isMuted={effectiveMuted}
        onPlayPause={handlePlayPause}
        onSeek={handleSeek}
        onVolumeChange={(v) => {
          setVolume(v)
          if (v > 0) setUserMuted(false)
        }}
        onMuteToggle={() => {
          if (forceMuted) return
          setUserMuted((m) => !m)
        }}
        onFullscreen={handleFullscreen}
      />
      {!canControlPlayback ? <div className="video-share-player__shield" aria-hidden /> : null}
    </div>
  )
}

type YoutubePlayerProps = {
  videoId: string
  sync: VideoShareSyncPayload
  canControlPlayback: boolean
  onSync: (patch: Partial<VideoShareSyncPayload>) => void
}

function YoutubePlayer({ videoId, sync, canControlPlayback, onSync }: YoutubePlayerProps) {
  const hostRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<YoutubePlayerInstance | null>(null)
  const syncRef = useRef(sync)
  const canControlRef = useRef(canControlPlayback)
  const mountId = useId().replace(/:/g, '')
  const applyingRemoteRef = useRef(false)
  const lastEmitRef = useRef(0)
  const [ready, setReady] = useState(false)
  const [volume, setVolume] = useState(1)
  const [userMuted, setUserMuted] = useState(false)
  const [uiTimeSec, setUiTimeSec] = useState(sync.currentTimeSec)
  const [uiDurationSec, setUiDurationSec] = useState(sync.durationSec)
  const [isPlaying, setIsPlaying] = useState(sync.isPlaying)

  useEffect(() => {
    syncRef.current = sync
  }, [sync])

  useEffect(() => {
    canControlRef.current = canControlPlayback
  }, [canControlPlayback])

  const applySyncToPlayer = useCallback((p: YoutubePlayerInstance, payload: VideoShareSyncPayload) => {
    applyingRemoteRef.current = true
    const drift = Math.abs(p.getCurrentTime() - payload.currentTimeSec)
    if (drift > DRIFT_THRESHOLD_SEC) {
      p.seekTo(payload.currentTimeSec, true)
      setUiTimeSec(payload.currentTimeSec)
    }
    if (payload.isPlaying) {
      p.playVideo()
      setIsPlaying(true)
    } else {
      p.pauseVideo()
      setIsPlaying(false)
    }
    window.setTimeout(() => {
      applyingRemoteRef.current = false
    }, 200)
  }, [])

  const revertViewerPlayback = useCallback((p: YoutubePlayerInstance) => {
    applySyncToPlayer(p, syncRef.current)
  }, [applySyncToPlayer])

  useEffect(() => {
    let player: YoutubePlayerInstance | null = null
    let cancelled = false

    void loadYoutubeIframeApi().then(() => {
      if (cancelled) return
      player = createYoutubePlayer(mountId, videoId, {
        onReady: (p) => {
          playerRef.current = p
          setReady(true)
          const dur = p.getDuration()
          if (Number.isFinite(dur) && dur > 0) {
            setUiDurationSec(dur)
            if (canControlRef.current) onSync({ durationSec: dur })
          }
          applySyncToPlayer(p, syncRef.current)
          p.setVolume(Math.round(volume * 100))
          if (userMuted) p.mute()
        },
        onStateChange: (state, p) => {
          if (applyingRemoteRef.current) return

          if (!canControlRef.current) {
            revertViewerPlayback(p)
            return
          }

          const playing = state === YT_STATE_PLAYING
          setIsPlaying(playing)
          onSync({
            isPlaying: playing,
            currentTimeSec: p.getCurrentTime(),
            durationSec: p.getDuration() || syncRef.current.durationSec,
          })
        },
      })
      playerRef.current = player
    })

    return () => {
      cancelled = true
      playerRef.current?.destroy()
      playerRef.current = null
      setReady(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- mount once per videoId
  }, [videoId, mountId])

  useEffect(() => {
    if (!ready || canControlPlayback) return
    const p = playerRef.current
    if (!p) return
    applySyncToPlayer(p, sync)
  }, [applySyncToPlayer, canControlPlayback, ready, sync.currentTimeSec, sync.isPlaying])

  useEffect(() => {
    if (!ready || !canControlPlayback) return
    const tick = window.setInterval(() => {
      const p = playerRef.current
      if (!p || applyingRemoteRef.current) return
      const now = Date.now()
      if (now - lastEmitRef.current < SYNC_INTERVAL_MS) return
      lastEmitRef.current = now
      onSync({
        currentTimeSec: p.getCurrentTime(),
        isPlaying: p.getPlayerState() === YT_STATE_PLAYING,
        durationSec: p.getDuration() || syncRef.current.durationSec,
      })
    }, SYNC_INTERVAL_MS)
    return () => window.clearInterval(tick)
  }, [canControlPlayback, onSync, ready])

  useEffect(() => {
    if (!ready) return
    const p = playerRef.current
    if (!p) return
    const tick = window.setInterval(() => {
      const t = p.getCurrentTime()
      if (Number.isFinite(t)) setUiTimeSec(t)
    }, 500)
    return () => window.clearInterval(tick)
  }, [ready])

  useEffect(() => {
    const p = playerRef.current
    if (!p || !ready) return
    p.setVolume(Math.round(volume * 100))
    if (userMuted) p.mute()
    else p.unMute()
  }, [volume, userMuted, ready])

  const handlePlayPause = () => {
    const p = playerRef.current
    if (!p || !canControlPlayback) return
    if (isPlaying) {
      p.pauseVideo()
    } else {
      p.playVideo()
    }
  }

  const handleSeek = (timeSec: number) => {
    const p = playerRef.current
    if (!p || !canControlPlayback) return
    p.seekTo(timeSec, true)
    setUiTimeSec(timeSec)
    onSync({
      currentTimeSec: timeSec,
      isPlaying: isPlaying,
      durationSec: p.getDuration() || sync.durationSec,
    })
  }

  const handleFullscreen = () => {
    const host = hostRef.current
    if (!host) return
    if (document.fullscreenElement) {
      void document.exitFullscreen()
    } else {
      void host.requestFullscreen()
    }
  }

  return (
    <div
      ref={hostRef}
      className={`video-share-player video-share-youtube-player${canControlPlayback ? ' video-share-player--presenter' : ''}`}
    >
      <div id={mountId} className="video-share-youtube-player__mount" />
      <div className="video-share-player__shield" aria-hidden />
      {ready ? (
        <VideoShareControls
          canControlPlayback={canControlPlayback}
          isPlaying={isPlaying}
          currentTimeSec={uiTimeSec}
          durationSec={uiDurationSec || sync.durationSec}
          volume={volume}
          isMuted={userMuted}
          onPlayPause={handlePlayPause}
          onSeek={handleSeek}
          onVolumeChange={(v) => {
            setVolume(v)
            if (v > 0) setUserMuted(false)
          }}
          onMuteToggle={() => setUserMuted((m) => !m)}
          onFullscreen={handleFullscreen}
        />
      ) : null}
    </div>
  )
}

type RecorderYoutubePlayerProps = {
  videoId: string
  sync: VideoShareSyncPayload
}

/** Headless recorder cannot paint cross-origin iframes — use a capturable &lt;video&gt; or thumbnail. */
function RecorderYoutubePlayer({ videoId, sync }: RecorderYoutubePlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [streamUrl, setStreamUrl] = useState<string | null>(null)
  const [streamFailed, setStreamFailed] = useState(false)
  const applyingRemoteRef = useRef(false)

  useEffect(() => {
    let cancelled = false
    setStreamUrl(null)
    setStreamFailed(false)
    void resolveYoutubeStreamUrl(videoId).then((url) => {
      if (cancelled) return
      if (url) {
        setStreamUrl(url)
      } else {
        setStreamFailed(true)
      }
    })
    return () => {
      cancelled = true
    }
  }, [videoId])

  useEffect(() => {
    const el = videoRef.current
    if (!el || !streamUrl) return

    applyingRemoteRef.current = true
    const drift = Math.abs(el.currentTime - sync.currentTimeSec)
    if (drift > DRIFT_THRESHOLD_SEC) {
      el.currentTime = sync.currentTimeSec
    }
    if (sync.isPlaying && el.paused) {
      void el.play().catch(() => undefined)
    } else if (!sync.isPlaying && !el.paused) {
      el.pause()
    }
    window.setTimeout(() => {
      applyingRemoteRef.current = false
    }, 100)
  }, [streamUrl, sync.currentTimeSec, sync.isPlaying])

  if (streamUrl) {
    return (
      <div className="video-share-media-host">
        <video
          ref={videoRef}
          className="video-share-stage__media"
          src={streamUrl}
          playsInline
          muted
          controls={false}
          autoPlay={sync.isPlaying}
        />
      </div>
    )
  }

  if (streamFailed) {
    return (
      <div className="video-share-media-host">
        <img
          className="video-share-stage__youtube-poster"
          src={youtubeThumbnailUrl(videoId)}
          alt={sync.originalName}
          draggable={false}
        />
      </div>
    )
  }

  return (
    <div className="video-share-media-host video-share-media-host--loading" aria-busy="true">
      <img
        className="video-share-stage__youtube-poster"
        src={youtubeThumbnailUrl(videoId)}
        alt={sync.originalName}
        draggable={false}
      />
    </div>
  )
}

export function VideoShareStage() {
  const video = useAppSelector(selectActiveVideoShare)
  const { canPresentContent } = useMeetingPermissions()
  const recorderUi = useRecorderUiActive()
  const { closeVideoShare, patchVideoShare } = useVideoShareSync()

  if (!video?.active) return null

  const resolvedYoutubeId =
    video.source === 'youtube' && video.youtubeVideoId && /^[a-zA-Z0-9_-]{11}$/.test(video.youtubeVideoId)
      ? video.youtubeVideoId
      : null

  return (
    <div
      className="meeting-content-stage video-share-stage"
      role="region"
      aria-label={`Shared video: ${video.originalName}`}
    >
      {canPresentContent ? (
        <button
          type="button"
          className="video-share-close-btn meeting-tooltip meeting-tooltip--bottom"
          data-tooltip="Close video"
          aria-label="Close shared video"
          onClick={closeVideoShare}
        >
          ×
        </button>
      ) : null}
      <div className="video-share-layer">
        <div className="video-share-slide-wrap">
          {video.source === 'youtube' && resolvedYoutubeId ? (
            recorderUi ? (
              <RecorderYoutubePlayer videoId={resolvedYoutubeId} sync={video} />
            ) : (
              <YoutubePlayer
                videoId={resolvedYoutubeId}
                sync={video}
                canControlPlayback={canPresentContent}
                onSync={patchVideoShare}
              />
            )
          ) : (
            <Mp4Player
              src={video.fileUrl}
              fileId={video.fileId}
              sync={video}
              canControlPlayback={canPresentContent}
              onSync={patchVideoShare}
              forceMuted={recorderUi}
            />
          )}
        </div>
      </div>
    </div>
  )
}
