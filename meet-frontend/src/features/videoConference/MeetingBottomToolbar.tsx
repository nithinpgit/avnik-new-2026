import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { store } from '../../app/store'
import { DocumentToolbar } from '../documents/DocumentToolbar'
import {
  openShareDocumentModal,
  selectPresentationVisible,
} from '../documents/documentsSlice'
import { openShareVideoModal, selectVideoShareVisible } from '../videoShare/videoShareSlice'
import { pushToast } from '../documents/notificationsSlice'
import { useMediasoupMedia } from '../mediasoup/MediasoupMediaProvider'
import { useIsMeetingHost } from '../meeting/useIsMeetingHost'
import { useRaiseHandActions } from '../raiseHand/useRaiseHand'
import { useMeetingPermissions } from '../participantControls/useMeetingPermissions'
import { useParticipantModeration } from '../participantControls/useParticipantModeration'
import {
  selectCamOffAllActive,
  selectMuteAllActive,
} from '../participantControls/participantModerationSlice'
import { useBroadcastLocalCameraState } from './useParticipantCameraSync'
import { bumpLocalMediaRevision } from './videoConferenceSlice'
import {
  IconAllMicOff,
  IconAllWebcamOff,
  IconDocument,
  IconFullscreen,
  IconHand,
  IconMic,
  IconScreenShare,
  IconVideoShare,
  IconWebcam,
} from './MeetingIcons'
import { MeetingToolbarDockToggle } from './MeetingToolbarDockToggle'
import './meetingBottomToolbar.css'
import './meeting-icons.css'

function toggleLocalTrack(kind: 'audio' | 'video'): boolean {
  const stream = store.getState().videoConference.localStream
  const track = stream?.getTracks().find((t) => t.kind === kind)
  if (!track) return false
  track.enabled = !track.enabled
  return track.enabled
}

export function MeetingBottomToolbar() {
  const dispatch = useAppDispatch()
  const isHost = useIsMeetingHost()
  const { raiseHand } = useRaiseHandActions()
  const { canPresentContent, canUseHostBulkControls } = useMeetingPermissions()
  const { emitBulkControl } = useParticipantModeration()
  const muteAllActive = useAppSelector(selectMuteAllActive)
  const camOffAllActive = useAppSelector(selectCamOffAllActive)
  const { isScreenSharing, startScreenShare } = useMediasoupMedia()
  const presentationActive = useAppSelector(selectPresentationVisible)
  const videoShareActive = useAppSelector(selectVideoShareVisible)
  const [micOn, setMicOn] = useState(true)
  const [camOn, setCamOn] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [screenShareBusy, setScreenShareBusy] = useState(false)
  const publishCameraState = useBroadcastLocalCameraState()

  const handleMic = () => {
    const enabled = toggleLocalTrack('audio')
    dispatch(bumpLocalMediaRevision())
    setMicOn(enabled)
    dispatch(
      pushToast({
        message: enabled ? 'Microphone on' : 'Microphone muted',
        variant: 'info',
        durationMs: 2000,
      }),
    )
  }

  const handleCam = () => {
    const enabled = toggleLocalTrack('video')
    dispatch(bumpLocalMediaRevision())
    publishCameraState(enabled)
    setCamOn(enabled)
    dispatch(
      pushToast({
        message: enabled ? 'Camera on' : 'Camera off',
        variant: 'info',
        durationMs: 2000,
      }),
    )
  }

  const handleScreenShare = () => {
    if (!canPresentContent) {
      dispatch(pushToast({ message: 'Presenter access required to share your screen.', variant: 'error' }))
      return
    }
    if (screenShareBusy) return
    const wasSharing = isScreenSharing
    setScreenShareBusy(true)
    void startScreenShare()
      .then(() => {
        if (!wasSharing) {
          dispatch(
            pushToast({
              message: 'Screen sharing started',
              variant: 'success',
              durationMs: 2500,
            }),
          )
        } else {
          dispatch(
            pushToast({
              message: 'Screen sharing stopped',
              variant: 'info',
              durationMs: 2000,
            }),
          )
        }
      })
      .catch((e: unknown) => {
        const message = e instanceof Error ? e.message : String(e)
        if (message.includes('Permission denied') || message.includes('NotAllowedError')) {
          dispatch(
            pushToast({
              message: 'Screen share permission denied',
              variant: 'info',
              durationMs: 3500,
            }),
          )
          return
        }
        if (message.includes('AbortError') || message.includes('cancel')) {
          return
        }
        dispatch(
          pushToast({
            message: message || 'Could not start screen share',
            variant: 'error',
            durationMs: 4000,
          }),
        )
      })
      .finally(() => setScreenShareBusy(false))
  }

  const handleMuteAll = () => {
    const action = muteAllActive ? 'unmute_all' : 'mute_all'
    emitBulkControl(action)
    dispatch(
      pushToast({
        message: action === 'mute_all' ? 'All microphones muted.' : 'All microphones unmuted.',
        variant: 'info',
        durationMs: 3000,
      }),
    )
  }

  const handleCamOffAll = () => {
    const action = camOffAllActive ? 'enable_cam_all' : 'disable_cam_all'
    emitBulkControl(action)
    dispatch(
      pushToast({
        message:
          action === 'disable_cam_all'
            ? 'All cameras disabled for participants.'
            : 'All cameras enabled for participants.',
        variant: 'info',
        durationMs: 3000,
      }),
    )
  }

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      void document.documentElement.requestFullscreen().then(() => setIsFullscreen(true))
    } else {
      void document.exitFullscreen().then(() => setIsFullscreen(false))
    }
  }

  return (
    <footer className="meeting-bottom-dock" aria-label="Meeting controls">
      <div className="meeting-bottom-dock__inner controls-options-new">
        <ul className="dock-toolbar-list cmn-ul-list">
          <li className="dock-toolbar-section dock-toolbar-section--share share-doc-video-bx">
            <button
              type="button"
              className={`dock-btn meeting-tooltip meeting-tooltip--top${isScreenSharing ? ' dock-btn--active' : ''}`}
              data-tooltip={isScreenSharing ? 'Stop screen share' : 'Screen Share'}
              aria-label={isScreenSharing ? 'Stop screen share' : 'Screen share'}
              aria-pressed={isScreenSharing}
              disabled={screenShareBusy}
              onClick={handleScreenShare}
            >
              <IconScreenShare />
            </button>
            <button
              type="button"
              className={`dock-btn meeting-tooltip meeting-tooltip--top${presentationActive ? ' dock-btn--document-active' : ''}${!canPresentContent ? ' dock-btn--viewer-disabled' : ''}`}
              data-tooltip="Share Document"
              aria-label="Share document"
              disabled={!canPresentContent}
              onClick={() => {
                if (!canPresentContent) {
                  dispatch(pushToast({ message: 'Presenter access required to share documents.', variant: 'error' }))
                  return
                }
                dispatch(openShareDocumentModal())
              }}
            >
              <IconDocument />
            </button>
            <button
              type="button"
              className={`dock-btn meeting-tooltip meeting-tooltip--top${videoShareActive ? ' dock-btn--active' : ''}${!canPresentContent ? ' dock-btn--viewer-disabled' : ''}`}
              data-tooltip="Share Video"
              aria-label="Share video"
              aria-pressed={videoShareActive}
              disabled={!canPresentContent}
              onClick={() => {
                if (!canPresentContent) {
                  dispatch(pushToast({ message: 'Presenter access required to share video.', variant: 'error' }))
                  return
                }
                dispatch(openShareVideoModal())
              }}
            >
              <IconVideoShare />
            </button>
          </li>

          <DocumentToolbar />

          <li className="dock-toolbar-section">
            <button
              type="button"
              className={`dock-btn meeting-tooltip meeting-tooltip--top${isFullscreen ? ' dock-btn--active' : ''}`}
              data-tooltip="Full Screen"
              aria-label="Full screen"
              onClick={handleFullscreen}
            >
              <IconFullscreen />
            </button>
          </li>

          <li className="dock-toolbar-section">
            <button
              type="button"
              className={`dock-btn meeting-tooltip meeting-tooltip--top${camOn ? '' : ' dock-btn--off'}`}
              data-tooltip={camOn ? 'Turn OFF' : 'Turn ON'}
              aria-label={camOn ? 'Turn camera off' : 'Turn camera on'}
              onClick={handleCam}
            >
              <IconWebcam />
            </button>
          </li>

          <li className="dock-toolbar-section">
            <button
              type="button"
              className={`dock-btn meeting-tooltip meeting-tooltip--top${micOn ? '' : ' dock-btn--off'}`}
              data-tooltip={micOn ? 'Mute' : 'Unmute'}
              aria-label={micOn ? 'Mute microphone' : 'Unmute microphone'}
              onClick={handleMic}
            >
              <IconMic />
            </button>
          </li>

          {canUseHostBulkControls ? (
            <li className="dock-toolbar-section remove-viewer">
              <button
                type="button"
                className={`dock-btn dock-btn--host meeting-tooltip meeting-tooltip--top${camOffAllActive ? ' dock-btn--active' : ''}`}
                data-tooltip={camOffAllActive ? 'Turn ON All Cameras' : 'Turn OFF All'}
                aria-label={camOffAllActive ? 'Turn on all cameras' : 'Turn off all cameras'}
                aria-pressed={camOffAllActive}
                onClick={handleCamOffAll}
              >
                <IconAllWebcamOff />
              </button>
            </li>
          ) : null}

          {canUseHostBulkControls ? (
            <li className="dock-toolbar-section remove-viewer">
              <button
                type="button"
                className={`dock-btn meeting-tooltip meeting-tooltip--top${muteAllActive ? ' dock-btn--active' : ''}`}
                data-tooltip={muteAllActive ? 'Unmute All' : 'Mute All'}
                aria-label={muteAllActive ? 'Unmute all' : 'Mute all'}
                aria-pressed={muteAllActive}
                onClick={handleMuteAll}
              >
                <IconAllMicOff />
              </button>
            </li>
          ) : null}

          {!isHost ? (
            <li className="dock-toolbar-section remove-presenter">
              <button
                type="button"
                className="dock-btn meeting-tooltip meeting-tooltip--top"
                data-tooltip="Raise hand"
                aria-label="Raise hand"
                onClick={raiseHand}
              >
                <IconHand />
              </button>
            </li>
          ) : null}

          <li className="dock-toolbar-section dock-toolbar-section--dock">
            <MeetingToolbarDockToggle placement="inline" />
          </li>
        </ul>
      </div>
    </footer>
  )
}
