import { useCallback, useRef, useState } from 'react'
import './videoShareControls.css'

function IconFullscreenGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 3H5v3M16 3h3v3M8 21H5v-3M16 21h3v-3"
      />
    </svg>
  )
}

function formatTime(sec: number): string {
  if (!Number.isFinite(sec) || sec < 0) return '0:00'
  const total = Math.floor(sec)
  const h = Math.floor(total / 3600)
  const m = Math.floor((total % 3600) / 60)
  const s = total % 60
  if (h > 0) {
    return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  }
  return `${m}:${String(s).padStart(2, '0')}`
}

function IconPlay() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden>
      <path fill="currentColor" d="M8 5v14l11-7z" />
    </svg>
  )
}

function IconPause() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden>
      <path fill="currentColor" d="M6 5h4v14H6zm8 0h4v14h-4z" />
    </svg>
  )
}

function IconVolume({ muted, level }: { muted: boolean; level: number }) {
  if (muted || level === 0) {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
        <path
          fill="currentColor"
          d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"
        />
      </svg>
    )
  }
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M3 10v4h4l5 5V5L7 10H3zm13.5 2c0-1.77-1.02-3.29-2.5-4.03v8.06c1.48-.74 2.5-2.26 2.5-4.03zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"
      />
    </svg>
  )
}

export type VideoShareControlsProps = {
  canControlPlayback: boolean
  isPlaying: boolean
  currentTimeSec: number
  durationSec: number
  volume: number
  isMuted: boolean
  onPlayPause: () => void
  onSeek: (timeSec: number) => void
  onVolumeChange: (volume: number) => void
  onMuteToggle: () => void
  onFullscreen: () => void
}

export function VideoShareControls({
  canControlPlayback,
  isPlaying,
  currentTimeSec,
  durationSec,
  volume,
  isMuted,
  onPlayPause,
  onSeek,
  onVolumeChange,
  onMuteToggle,
  onFullscreen,
}: VideoShareControlsProps) {
  const [volumeOpen, setVolumeOpen] = useState(false)
  const seekRef = useRef<HTMLInputElement>(null)

  const progressPct =
    durationSec > 0 ? Math.min(100, Math.max(0, (currentTimeSec / durationSec) * 100)) : 0

  const handleSeekPointer = useCallback(
    (clientX: number) => {
      if (!canControlPlayback || !seekRef.current || durationSec <= 0) return
      const rect = seekRef.current.getBoundingClientRect()
      const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width))
      onSeek(ratio * durationSec)
    },
    [canControlPlayback, durationSec, onSeek],
  )

  return (
    <div className="video-share-controls">
      <div className="video-share-controls__gradient" aria-hidden />

      {canControlPlayback ? (
        <div
          className="video-share-controls__seek-row"
          onClick={(e) => handleSeekPointer(e.clientX)}
          onKeyDown={() => undefined}
          role="presentation"
        >
          <div className="video-share-controls__seek-track">
            <div className="video-share-controls__seek-buffer" style={{ width: `${progressPct}%` }} />
            <div className="video-share-controls__seek-played" style={{ width: `${progressPct}%` }} />
            <input
              ref={seekRef}
              type="range"
              className="video-share-controls__seek-input"
              min={0}
              max={durationSec > 0 ? durationSec : 100}
              step={0.1}
              value={currentTimeSec}
              aria-label="Seek"
              onChange={(e) => onSeek(Number(e.target.value))}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      ) : null}

      <div className="video-share-controls__bar">
        {canControlPlayback ? (
          <button
            type="button"
            className="video-share-controls__btn"
            aria-label={isPlaying ? 'Pause' : 'Play'}
            onClick={onPlayPause}
          >
            {isPlaying ? <IconPause /> : <IconPlay />}
          </button>
        ) : (
          <span className="video-share-controls__spacer" aria-hidden />
        )}

        {canControlPlayback ? (
          <span className="video-share-controls__time">
            {formatTime(currentTimeSec)} / {formatTime(durationSec)}
          </span>
        ) : null}

        <span className="video-share-controls__grow" aria-hidden />

        <div
          className="video-share-controls__volume"
          onMouseEnter={() => setVolumeOpen(true)}
          onMouseLeave={() => setVolumeOpen(false)}
        >
          <button
            type="button"
            className="video-share-controls__btn"
            aria-label={isMuted ? 'Unmute' : 'Mute'}
            onClick={onMuteToggle}
          >
            <IconVolume muted={isMuted} level={volume} />
          </button>
          <input
            type="range"
            className={`video-share-controls__volume-slider${volumeOpen ? ' video-share-controls__volume-slider--open' : ''}`}
            min={0}
            max={1}
            step={0.05}
            value={isMuted ? 0 : volume}
            aria-label="Volume"
            onChange={(e) => onVolumeChange(Number(e.target.value))}
          />
        </div>

        <button
          type="button"
          className="video-share-controls__btn"
          aria-label="Full screen"
          onClick={onFullscreen}
        >
          <IconFullscreenGlyph />
        </button>
      </div>
    </div>
  )
}
