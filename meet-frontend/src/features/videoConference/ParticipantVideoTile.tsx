import { useEffect, useLayoutEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import { createPortal } from 'react-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectIsMeetingLive } from '../meeting/meetingLifecycleSlice'
import { useRecorderUiActive } from '../recording/useRecorderUiActive'
import { useIsMeetingHost } from '../meeting/useIsMeetingHost'
import { useMediasoupMedia } from '../mediasoup/MediasoupMediaProvider'
import {
  useParticipantModeration,
  useParticipantModerationState,
} from '../participantControls/useParticipantModeration'
import {
  closeParticipantMenu,
  selectCameraStatus,
  selectLocalParticipantId,
  selectLocalMediaRevision,
  selectLocalStream,
  selectOpenParticipantMenuId,
  toggleParticipantMenu,
  type Participant,
} from './videoConferenceSlice'
import { UserAvatar } from '../../components/userAvatar'
import { hasActiveVideo } from './mediaTrackUtils'
import { useParticipantCamOn } from './useParticipantCameraSync'
import { RaiseHandBadge } from '../raiseHand/RaiseHandBadge'
import { useIsHandRaised, useRaiseHandActions } from '../raiseHand/useRaiseHand'
import { usePrivateMeetingHostMenu } from '../privateMeeting/usePrivateMeeting'
import {
  selectParticipantInPrivateMode,
  selectPrivateMeetingPartnerId,
  selectPrivateMeetingSync,
} from '../privateMeeting/privateMeetingSlice'
import { shouldConsumePeerMedia } from '../privateMeeting/privateMeetingTypes'
import { selectMeetingUserId } from '../meetingSession/meetingSessionSlice'
import { IconMoreVertical } from './MeetingIcons'

type ParticipantVideoTileProps = {
  participant: Participant
  tileIndex?: number
  layout?: 'stage' | 'overflow'
}

function liveTrack(stream: MediaStream | null | undefined, kind: 'audio' | 'video') {
  return stream?.getTracks().find((t) => t.kind === kind && t.readyState === 'live')
}

export function ParticipantVideoTile({
  participant,
  tileIndex = 0,
  layout = 'stage',
}: ParticipantVideoTileProps) {
  const dispatch = useAppDispatch()
  const { remoteStreams, remoteMediaRevisions, remoteVideoPaused } = useMediasoupMedia()
  const meetingLive = useAppSelector(selectIsMeetingLive)
  const localParticipantId = useAppSelector(selectLocalParticipantId)
  const localStream = useAppSelector(selectLocalStream)
  const localMediaRevision = useAppSelector(selectLocalMediaRevision)
  const cameraStatus = useAppSelector(selectCameraStatus)
  const openMenuId = useAppSelector(selectOpenParticipantMenuId)
  const isHost = useIsMeetingHost()
  const { emitControl, requestKick } = useParticipantModeration()
  const { dismissRaiseHand } = useRaiseHandActions()
  const moderation = useParticipantModerationState(participant.id)
  const handRaised = useIsHandRaised(participant.id)
  const recorderUi = useRecorderUiActive()
  const inPrivateMode = useAppSelector(selectParticipantInPrivateMode(participant.id))
  const privateHostMenu = usePrivateMeetingHostMenu(participant.id)
  const isLocal = participant.id === localParticipantId
  const myUserId = useAppSelector(selectMeetingUserId)
  const privateSync = useAppSelector(selectPrivateMeetingSync)
  const privatePartnerId = useAppSelector(selectPrivateMeetingPartnerId)
  const canViewRemoteMedia =
    isLocal ||
    shouldConsumePeerMedia(myUserId ?? '', participant.id, privateSync, privatePartnerId)

  const menuOpen = openMenuId === participant.id
  const showHostMenu = isHost && !isLocal && participant.role !== 'host' && !recorderUi
  const remoteStream = !isLocal ? remoteStreams[participant.id] : undefined

  const menuItems = useMemo(() => {
    const items: { id: string; label: string; action: () => void }[] = [
      {
        id: 'mic',
        label: moderation.micAllowed ? 'Mute Mic' : 'Unmute Mic',
        action: () =>
          emitControl(participant.id, moderation.micAllowed ? 'mute_mic' : 'unmute_mic'),
      },
      {
        id: 'cam',
        label: moderation.camAllowed ? 'Disable Cam' : 'Enable Cam',
        action: () =>
          emitControl(participant.id, moderation.camAllowed ? 'disable_cam' : 'enable_cam'),
      },
      {
        id: 'presenter',
        label: moderation.isPresenter ? 'Remove Presenter' : 'Make Presenter',
        action: () =>
          emitControl(
            participant.id,
            moderation.isPresenter ? 'revoke_presenter' : 'make_presenter',
          ),
      },
      ...(privateHostMenu.showPrivateOption
        ? [
            {
              id: 'private',
              label: privateHostMenu.privateLabel,
              action: privateHostMenu.onPrivateAction,
            },
          ]
        : []),
      {
        id: 'exit',
        label: 'Exit User',
        action: () => requestKick(participant.id, participant.name),
      },
    ]
    return items
  }, [
    emitControl,
    moderation,
    participant.id,
    participant.name,
    privateHostMenu.onPrivateAction,
    privateHostMenu.privateLabel,
    privateHostMenu.showPrivateOption,
    requestKick,
  ])

  const rootRef = useRef<HTMLDivElement>(null)
  const moreButtonRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [overflowMenuStyle, setOverflowMenuStyle] = useState<CSSProperties>({})

  useLayoutEffect(() => {
    if (layout !== 'overflow' || !menuOpen) return

    const updatePosition = () => {
      const button = moreButtonRef.current
      if (!button) return
      const rect = button.getBoundingClientRect()
      setOverflowMenuStyle({
        top: rect.top,
        left: rect.right,
      })
    }

    updatePosition()
    window.addEventListener('resize', updatePosition)
    window.addEventListener('scroll', updatePosition, true)
    return () => {
      window.removeEventListener('resize', updatePosition)
      window.removeEventListener('scroll', updatePosition, true)
    }
  }, [layout, menuOpen])

  useEffect(() => {
    if (!menuOpen) return
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node
      if (rootRef.current?.contains(target)) return
      if (menuRef.current?.contains(target)) return
      dispatch(closeParticipantMenu())
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dispatch(closeParticipantMenu())
    }
    const onScroll = () => {
      if (layout === 'overflow') dispatch(closeParticipantMenu())
    }
    document.addEventListener('pointerdown', onPointerDown, true)
    document.addEventListener('keydown', onKeyDown)
    window.addEventListener('scroll', onScroll, true)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown, true)
      document.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('scroll', onScroll, true)
    }
  }, [layout, menuOpen, dispatch])

  const remoteMediaRevision = remoteMediaRevisions[participant.id] ?? 0
  const remoteProducerPaused = remoteVideoPaused[participant.id] === true
  const remoteCamOn = useParticipantCamOn(participant.id)

  const localVideoActive = useMemo(
    () => isLocal && hasActiveVideo(localStream, 'local'),
    [isLocal, localStream, localMediaRevision],
  )
  const showLocalVideo = meetingLive && localVideoActive && cameraStatus === 'ready'

  const remoteVideoActive = useMemo(() => {
    if (isLocal) return false
    const streamHasVideo = hasActiveVideo(remoteStream, 'remote')
    if (recorderUi) {
      return (
        Boolean(
          remoteStream?.getVideoTracks().some((t) => t.readyState === 'live' && t.enabled),
        ) || streamHasVideo
      )
    }
    return remoteCamOn && !remoteProducerPaused && streamHasVideo
  }, [isLocal, recorderUi, remoteCamOn, remoteProducerPaused, remoteStream, remoteMediaRevision])
  const remoteCamPublished =
    !isLocal && (recorderUi || moderation.camAllowed) && remoteVideoActive
  const showRemoteVideo = meetingLive && remoteCamPublished && canViewRemoteMedia

  const showLocalVideoTile = isLocal ? showLocalVideo : showRemoteVideo

  const remoteAudioOnly =
    meetingLive &&
    !isLocal &&
    canViewRemoteMedia &&
    !showRemoteVideo &&
    moderation.micAllowed &&
    Boolean(liveTrack(remoteStream, 'audio'))

  const showVideo = showLocalVideoTile
  const showCameraIssue = isLocal && (cameraStatus === 'denied' || cameraStatus === 'error')

  useEffect(() => {
    const el = videoRef.current
    if (!el || !showVideo) {
      if (el) el.srcObject = null
      return
    }
    const stream = isLocal ? localStream : remoteStream
    if (!stream) {
      el.srcObject = null
      return
    }
    el.srcObject = stream
    el.muted = isLocal || recorderUi
    el.play().catch(() => {
      /* autoplay policies — ignore */
    })
    return () => {
      el.srcObject = null
    }
  }, [isLocal, localStream, remoteStream, showVideo, cameraStatus, remoteMediaRevision, recorderUi])

  useEffect(() => {
    const el = audioRef.current
    if (!el || !remoteAudioOnly || !remoteStream) {
      if (el) el.srcObject = null
      return
    }
    const at = liveTrack(remoteStream, 'audio')
    if (!at) {
      el.srcObject = null
      return
    }
    el.srcObject = new MediaStream([at])
    el.play().catch(() => {
      /* autoplay — ignore */
    })
    return () => {
      el.srcObject = null
    }
  }, [remoteAudioOnly, remoteStream])

  const hostMenuDropdown = showHostMenu ? (
    <div
      ref={menuRef}
      className={`video-tile__menu-dropdown${
        menuOpen ? ' video-tile__menu-dropdown--open' : ''
      }${layout === 'overflow' ? ' video-tile__menu-dropdown--overflow-portal' : ''}`}
      style={layout === 'overflow' ? overflowMenuStyle : undefined}
      role="menu"
      aria-hidden={!menuOpen}
    >
      {menuItems.map((item) => (
        <button
          key={item.id}
          type="button"
          role="menuitem"
          className="video-tile__menu-item"
          onClick={(e) => {
            e.stopPropagation()
            item.action()
          }}
        >
          {item.label}
        </button>
      ))}
    </div>
  ) : null

  return (
    <div
      ref={rootRef}
      id={`video-tile-${participant.id}`}
      role="article"
      className={`video-tile video-tile--animated${layout === 'overflow' ? ' video-tile--overflow' : ''}`}
      style={{ animationDelay: `${Math.min(tileIndex * 55, 400)}ms` }}
      aria-label={`${participant.name} video tile`}
    >
      <div className="video-tile__media">
        {showVideo ? (
          <video
            ref={videoRef}
            className={`video-tile__video${isLocal ? ' video-tile__video--mirrored' : ''}`}
            playsInline
            muted={isLocal || recorderUi}
            autoPlay
          />
        ) : null}
        {remoteAudioOnly ? (
          <audio ref={audioRef} className="video-tile__audio-only" autoPlay playsInline />
        ) : null}
        <UserAvatar
          name={participant.name}
          imageUrl={participant.profileImage}
          size="tile"
          hidden={showVideo}
          className="video-tile__avatar"
        />
        {showCameraIssue ? (
          <div className="video-tile__status-overlay">
            <span className="video-tile__status-text">
              {cameraStatus === 'denied' ? 'Camera access denied' : 'Camera unavailable'}
            </span>
          </div>
        ) : null}
        {!isLocal && !moderation.micAllowed ? (
          <span className="video-tile__badge video-tile__badge--muted" title="Microphone muted by host">
            Mic off
          </span>
        ) : null}
        {!isLocal && !moderation.camAllowed ? (
          <span className="video-tile__badge video-tile__badge--cam-off" title="Camera disabled by host">
            Cam off
          </span>
        ) : null}
        {inPrivateMode ? (
          <span className="video-tile__badge video-tile__badge--private-mode" title="In private meeting">
            private mode
          </span>
        ) : null}
        {handRaised ? (
          <RaiseHandBadge
            participantName={participant.name}
            canDismiss={isHost && !isLocal}
            onDismiss={() => dismissRaiseHand(participant.id)}
          />
        ) : null}
      </div>

      {showHostMenu ? (
        <div className="video-tile__chrome">
          <button
            ref={moreButtonRef}
            type="button"
            className="video-tile__more meeting-tooltip meeting-tooltip--bottom"
            data-tooltip="More"
            aria-label={`More options for ${participant.name}`}
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            onClick={(e) => {
              e.stopPropagation()
              dispatch(toggleParticipantMenu(participant.id))
            }}
          >
            <IconMoreVertical size={16} />
          </button>
        </div>
      ) : null}

      {showHostMenu && layout !== 'overflow' ? hostMenuDropdown : null}
      {showHostMenu && layout === 'overflow' && menuOpen
        ? createPortal(hostMenuDropdown, document.body)
        : null}

      <div className="video-tile__footer">
        <span className="video-tile__label">{participant.name}</span>
        {moderation.isPresenter && participant.role !== 'host' ? (
          <span className="video-tile__role-badge">Presenter</span>
        ) : null}
      </div>
    </div>
  )
}
