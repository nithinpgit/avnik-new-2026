import type { CSSProperties } from 'react'

export type IconProps = {
  size?: number
  className?: string
  style?: CSSProperties
}

function MrIcon(baseClass: string, { size = 20, className, style }: IconProps = {}) {
  return (
    <i
      className={[baseClass, className].filter(Boolean).join(' ')}
      aria-hidden
      style={{
        fontSize: size,
        lineHeight: 1,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}
    />
  )
}

function LmIcon(suffixClass: string, { size = 20, className, style }: IconProps = {}) {
  return (
    <i
      className={['lm', suffixClass, className].filter(Boolean).join(' ')}
      aria-hidden
      style={{
        fontSize: size,
        lineHeight: 1,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}
    />
  )
}

export function IconClose(props: IconProps) {
  return MrIcon('mr-close-icon', props)
}

export function IconGear(props: IconProps) {
  return MrIcon('mr-setting-icon', props)
}

export function IconCrown(props: IconProps) {
  return MrIcon('mr-present-icon', props)
}

export function IconPause(props: IconProps) {
  return MrIcon('mr-pause-timer-icon', props)
}

export function IconPlay(props: IconProps) {
  return MrIcon('mr-start-timer-icon', props)
}

/** Legacy join UI used a red dot for recording — no dedicated avnik glyph in use here. */
export function IconRecord({ size = 12, className, style }: IconProps) {
  const s = size
  return (
    <span
      className={['meeting-record-dot', className].filter(Boolean).join(' ')}
      aria-hidden
      style={{
        width: s,
        height: s,
        borderRadius: '50%',
        background: 'currentColor',
        flexShrink: 0,
        ...style,
      }}
    />
  )
}

export function IconExit(props: IconProps) {
  return MrIcon('mr-exit-user-icon', props)
}

export function IconBell(props: IconProps) {
  return LmIcon('lm-notification-icon', props)
}

export function IconMonitor(props: IconProps) {
  return MrIcon('mr-desktop-view-icon', props)
}

export function IconUser(props: IconProps) {
  return MrIcon('mr-invite-icon', props)
}

export function IconSearch(props: IconProps) {
  return MrIcon('mr-search-icon', props)
}

/** Auto-accept waiting participants — same glyph as avnik_old `mr-attended-icon`. */
export function IconAttended(props: IconProps) {
  return MrIcon('mr-attended-icon', props)
}

export function IconGridLayout(props: IconProps) {
  return MrIcon('mr-grid-view-icon', props)
}

export function IconScreenShare(props: IconProps) {
  return MrIcon('mr-screen-share-icon', props)
}

export function IconDocument(props: IconProps) {
  return MrIcon('mr-document-share-icon', props)
}

/** Share video file / YouTube (not local webcam). */
export function IconVideoShare(props: IconProps) {
  return MrIcon('mr-video-share-icon', props)
}

export function IconWebcam(props: IconProps) {
  return MrIcon('mr-webcam-on-icon', props)
}

export function IconFullscreen(props: IconProps) {
  return MrIcon('mr-full-screen-icon', props)
}

export function IconMic(props: IconProps) {
  return MrIcon('mr-mic-on-icon', props)
}

export function IconAllWebcamOff(props: IconProps) {
  return MrIcon('mr-all-webcam-off-icon', props)
}

export function IconAllMicOff(props: IconProps) {
  return MrIcon('mr-all-mic-off-icon', props)
}

export function IconZoomOut(props: IconProps) {
  return MrIcon('mr-zoom-out-icon', props)
}

export function IconZoomIn(props: IconProps) {
  return MrIcon('mr-zoom-in-icon', props)
}

export function IconPagePrev(props: IconProps) {
  return MrIcon('mr-left-page-icon', props)
}

export function IconPageNext(props: IconProps) {
  return MrIcon('mr-right-page-icon', props)
}

/** Raised hand — same asset as avnik_old `images/hand.svg`. */
export function IconHand({ size = 20, className, style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      className={['meeting-icon', 'meeting-icon--hand', className].filter(Boolean).join(' ')}
      aria-hidden
      style={style}
    >
      <path
        fill="currentColor"
        d="M256 0c-25.3 0-47.2 14.7-57.6 36c-7-2.6-14.5-4-22.4-4c-35.3 0-64 28.7-64 64V261.5l-2.7-2.7c-25-25-65.5-25-90.5 0s-25 65.5 0 90.5L106.5 437c48 48 113.1 75 181 75H296h8c1.5 0 3-.1 4.5-.4c91.7-6.2 165-79.4 171.1-171.1c.3-1.5 .4-3 .4-4.5V160c0-35.3-28.7-64-64-64c-5.5 0-10.9 .7-16 2V96c0-35.3-28.7-64-64-64c-7.9 0-15.4 1.4-22.4 4C303.2 14.7 281.3 0 256 0zM240 96.1c0 0 0-.1 0-.1V64c0-8.8 7.2-16 16-16s16 7.2 16 16V95.9c0 0 0 .1 0 .1V232c0 13.3 10.7 24 24 24s24-10.7 24-24V96c0 0 0 0 0-.1c0-8.8 7.2-16 16-16s16 7.2 16 16v55.9c0 0 0 .1 0 .1v80c0 13.3 10.7 24 24 24s24-10.7 24-24V160.1c0 0 0-.1 0-.1c0-8.8 7.2-16 16-16s16 7.2 16 16V332.9c-.1 .6-.1 1.3-.2 1.9c-3.4 69.7-59.3 125.6-129 129c-.6 0-1.3 .1-1.9 .2H296h-8.5c-55.2 0-108.1-21.9-147.1-60.9L52.7 315.3c-6.2-6.2-6.2-16.4 0-22.6s16.4-6.2 22.6 0L119 336.4c6.9 6.9 17.2 8.9 26.2 5.2s14.8-12.5 14.8-22.2V96c0-8.8 7.2-16 16-16c8.8 0 16 7.1 16 15.9V232c0 13.3 10.7 24 24 24s24-10.7 24-24V96.1z"
      />
    </svg>
  )
}

export function IconHelp(props: IconProps) {
  return MrIcon('mr-help-icon', props)
}

export function IconChat(props: IconProps) {
  return MrIcon('mr-chat-icon', props)
}

export function IconChevronLeft({ size = 16, className, style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={['meeting-icon', className].filter(Boolean).join(' ')}
      aria-hidden
      style={style}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 6l-6 6 6 6"
      />
    </svg>
  )
}

export function IconChevronRight({ size = 16, className, style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={['meeting-icon', className].filter(Boolean).join(' ')}
      aria-hidden
      style={style}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 6l6 6-6 6"
      />
    </svg>
  )
}

/** Hide top + bottom toolbars — expand center workspace. */
export function IconCollapseToolbars({ size = 20, className, style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={['meeting-icon', 'meeting-icon--hide-toolbars', className].filter(Boolean).join(' ')}
      aria-hidden
      style={style}
    >
      <rect x="5" y="4" width="14" height="2" rx="1" fill="currentColor" opacity="0.45" />
      <rect x="5" y="18" width="14" height="2" rx="1" fill="currentColor" opacity="0.45" />
      <rect
        x="6.5"
        y="8"
        width="11"
        height="8"
        rx="1.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
      />
    </svg>
  )
}

/** Restore top + bottom toolbars. */
export function IconExpandToolbars({ size = 20, className, style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={['meeting-icon', 'meeting-icon--show-toolbars', className].filter(Boolean).join(' ')}
      aria-hidden
      style={style}
    >
      <rect x="4" y="5" width="16" height="2.5" rx="1.25" fill="currentColor" />
      <rect x="4" y="16.5" width="16" height="2.5" rx="1.25" fill="currentColor" />
    </svg>
  )
}

export function IconMoreVertical(props: IconProps) {
  return MrIcon('mr-vertical-more-icon', props)
}
