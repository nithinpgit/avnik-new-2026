import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { store } from '../../app/store'
import { useMediasoupMedia } from '../mediasoup/MediasoupMediaProvider'
import { IconClose } from '../videoConference/MeetingIcons'
import {
  setCameraErrorMessage,
  setCameraStatus,
  setLocalStream,
} from '../videoConference/videoConferenceSlice'
import '../videoConference/meeting-icons.css'
import '../videoConference/meetingTooltip.css'
import { deviceIdsFromStream } from './mediaDeviceUtils'
import { PreMeetingEventInfoTab } from './PreMeetingEventInfoTab'
import {
  selectMeetingRoomId,
  selectMeetingUserId,
} from '../meetingSession/meetingSessionSlice'
import { checkUserBlockedForRoom } from '../waitingRoom/blockedUsersApi'
import {
  selectAdmissionStatus,
  selectAdmissionWaitMessage,
  setJoinBlocked,
} from '../waitingRoom/waitingRoomSlice'
import {
  applyMeetingMediaSettings,
  closePreMeetingModal,
  completePreMeeting,
  openPreMeetingForAdmissionWait,
  selectPreMeetingEntryCompleted,
  selectPreMeetingLastMediaMode,
  selectPreMeetingOpen,
  selectPreferredAudioDeviceId,
  selectPreferredVideoDeviceId,
  type PreMeetingMediaMode,
} from './preMeetingSlice'
import { PreMeetingSettingsTab, type PreMeetingSettingsReport } from './PreMeetingSettingsTab'
import './preMeetingModal.css'
import { selectExternalAmountDue, selectExternalPaymentRequired, selectExternalQuickMeet } from '../externalApi/externalMeetingSlice'
import { openPaymentModal } from '../externalApi/externalModalsSlice'

type TabId = 'settings' | 'info'

const emptyReport = (): PreMeetingSettingsReport => ({
  stream: null,
  mediaMode: 'both',
  videoDeviceId: '',
  audioInDeviceId: '',
  audioOutDeviceId: '',
})

function applyStreamToStore(
  dispatch: ReturnType<typeof useAppDispatch>,
  stream: MediaStream | null,
  mediaMode: PreMeetingMediaMode,
) {
  const wantsVideo = mediaMode !== 'none' && mediaMode !== 'mic_only'
  dispatch(setLocalStream(stream))
  if (stream && wantsVideo) {
    dispatch(setCameraStatus('ready'))
    dispatch(setCameraErrorMessage(null))
  } else if (stream && !wantsVideo) {
    dispatch(setCameraStatus('idle'))
    dispatch(setCameraErrorMessage(null))
  } else {
    dispatch(setLocalStream(null))
    dispatch(setCameraStatus('idle'))
    dispatch(setCameraErrorMessage(null))
  }
}

export function PreMeetingModal() {
  const dispatch = useAppDispatch()
  const { syncLocalMedia } = useMediasoupMedia()
  const isOpen = useAppSelector(selectPreMeetingOpen)
  const entryCompleted = useAppSelector(selectPreMeetingEntryCompleted)
  const lastMediaMode = useAppSelector(selectPreMeetingLastMediaMode)
  const preferredVideoDeviceId = useAppSelector(selectPreferredVideoDeviceId)
  const preferredAudioDeviceId = useAppSelector(selectPreferredAudioDeviceId)
  const localStream = useAppSelector((s) => s.videoConference.localStream)
  const admissionStatus = useAppSelector(selectAdmissionStatus)
  const admissionWaitMessage = useAppSelector(selectAdmissionWaitMessage)
  const meetingRoomId = useAppSelector(selectMeetingRoomId)
  const meetingUserId = useAppSelector(selectMeetingUserId)
  const paymentRequired = useAppSelector(selectExternalPaymentRequired)
  const amountDue = useAppSelector(selectExternalAmountDue)
  const quickMeet = useAppSelector(selectExternalQuickMeet)

  const [tab, setTab] = useState<TabId>('settings')
  const [enterBusy, setEnterBusy] = useState(false)
  const entryRef = useRef<PreMeetingSettingsReport>(emptyReport())
  const streamTransferredRef = useRef(false)

  const initialDevices = useMemo(() => {
    const fromStream = deviceIdsFromStream(localStream)
    return {
      videoDeviceId: preferredVideoDeviceId || fromStream.videoDeviceId,
      audioInDeviceId: preferredAudioDeviceId || fromStream.audioInDeviceId,
    }
  }, [localStream, preferredVideoDeviceId, preferredAudioDeviceId])

  const onSettingsState = useCallback((s: PreMeetingSettingsReport) => {
    entryRef.current = s
  }, [])

  useEffect(() => {
    if (isOpen) {
      streamTransferredRef.current = false
      entryRef.current = emptyReport()
    }
  }, [isOpen])

  const isInMeetingSettings = entryCompleted && admissionStatus === 'admitted'
  const isBlockedOrDenied = admissionStatus === 'blocked' || admissionStatus === 'denied'
  /** Enter submitted; waiting for host accept or room_snapshot (avoid close→reopen flicker). */
  const isJoiningOrWaiting =
    entryCompleted && admissionStatus !== 'admitted' && !isBlockedOrDenied
  const isWaitingForAdmission = isJoiningOrWaiting

  /** avnik_old: quickMeet removes Event Information; unpaid viewer opens on Event Information. */
  const showEventInfoTab = !quickMeet
  const showSettingsTab = !(paymentRequired && !isInMeetingSettings)

  useEffect(() => {
    if (!isOpen || isInMeetingSettings) return
    if (quickMeet) {
      setTab('settings')
    } else if (paymentRequired && showEventInfoTab) {
      setTab('info')
    }
  }, [isOpen, isInMeetingSettings, quickMeet, paymentRequired, showEventInfoTab])

  useEffect(() => {
    if (!isOpen || entryCompleted || !meetingRoomId || !meetingUserId) return
    let cancelled = false
    void checkUserBlockedForRoom(meetingRoomId, meetingUserId)
      .then((result) => {
        if (cancelled || !result.blocked) return
        dispatch(setJoinBlocked({ message: result.message ?? 'You are blocked for this room please contact host' }))
        dispatch(openPreMeetingForAdmissionWait())
      })
      .catch(() => {
        /* join_room will re-check if this request fails */
      })
    return () => {
      cancelled = true
    }
  }, [dispatch, entryCompleted, isOpen, meetingRoomId, meetingUserId])

  if (!isOpen) {
    return null
  }

  const handleClose = () => {
    dispatch(closePreMeetingModal())
  }

  const handleEnter = async () => {
    if (enterBusy || !meetingRoomId || !meetingUserId || paymentRequired) return
    setEnterBusy(true)
    try {
      const access = await checkUserBlockedForRoom(meetingRoomId, meetingUserId)
      if (access.blocked) {
        dispatch(setJoinBlocked({ message: access.message ?? 'You are blocked for this room please contact host' }))
        dispatch(openPreMeetingForAdmissionWait())
        return
      }
    } catch {
      /* allow socket join_room to enforce if the check API is unavailable */
    } finally {
      setEnterBusy(false)
    }

    const { stream, mediaMode, videoDeviceId, audioInDeviceId, audioOutDeviceId } = entryRef.current
    const wantsVideo = mediaMode !== 'none' && mediaMode !== 'mic_only'

    streamTransferredRef.current = true
    applyStreamToStore(dispatch, stream, mediaMode)
    dispatch(
      completePreMeeting({
        wantsVideo,
        mediaMode,
        videoDeviceId: videoDeviceId || undefined,
        audioDeviceId: audioInDeviceId || undefined,
        audioOutputDeviceId: audioOutDeviceId || undefined,
      }),
    )
  }

  const handleContinue = () => {
    const { stream, mediaMode, videoDeviceId, audioInDeviceId, audioOutDeviceId } = entryRef.current
    const wantsVideo = mediaMode !== 'none' && mediaMode !== 'mic_only'
    const previous = store.getState().videoConference.localStream

    streamTransferredRef.current = true

    if (previous && previous !== stream) {
      previous.getTracks().forEach((t) => t.stop())
    }

    applyStreamToStore(dispatch, stream, mediaMode)
    dispatch(
      applyMeetingMediaSettings({
        wantsVideo,
        mediaMode,
        videoDeviceId: videoDeviceId || undefined,
        audioDeviceId: audioInDeviceId || undefined,
        audioOutputDeviceId: audioOutDeviceId || undefined,
      }),
    )
    void syncLocalMedia(stream)
    dispatch(closePreMeetingModal())
  }

  return (
    <PreMeetingBackdrop onClose={isInMeetingSettings && !isWaitingForAdmission ? handleClose : undefined}>
      <div
        className="pre-meeting-modal meeting-setting-popup setting-inside-popup host-info-popup icon_settings_page"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="pre-meeting-modal__dialog">
          <div className="pre-meeting-modal__content">
            {isInMeetingSettings ? (
              <button
                type="button"
                className="pre-meeting-modal__close settings-close close"
                aria-label="Close settings"
                onClick={handleClose}
              >
                <span aria-hidden>
                  <IconClose />
                </span>
              </button>
            ) : null}
            <div className="modal-body">
              <div className="av-default-tabs">
                <h2 id="pre-meeting-title" className="visually-hidden">
                  Meeting setup
                </h2>
                <div className="ah-tab-wrapper">
                  {showSettingsTab && showEventInfoTab ? (
                    <div className="ah-tab">
                      <button
                        type="button"
                        className="ah-tab-item"
                        data-active={tab === 'settings' ? 'true' : 'false'}
                        onClick={() => setTab('settings')}
                      >
                        Settings
                      </button>
                      <button
                        type="button"
                        className="ah-tab-item"
                        data-active={tab === 'info' ? 'true' : 'false'}
                        onClick={() => setTab('info')}
                      >
                        Event Information
                      </button>
                    </div>
                  ) : (
                    <div className="ah-tab">
                      {showSettingsTab ? (
                        <button
                          type="button"
                          className="ah-tab-item"
                          data-active="true"
                        >
                          Settings
                        </button>
                      ) : null}
                      {showEventInfoTab ? (
                        <button
                          type="button"
                          className="ah-tab-item"
                          data-active="true"
                        >
                          Event Information
                        </button>
                      ) : null}
                    </div>
                  )}
                </div>
                <div className="ah-tab-content-wrapper upload_icon_box">
                  {showSettingsTab ? (
                    <div
                      className="ah-tab-content"
                      data-active={
                        !showEventInfoTab || tab === 'settings' ? 'true' : 'false'
                      }
                    >
                      <PreMeetingSettingsTab
                        key={isInMeetingSettings ? 'in-meeting' : 'pre-entry'}
                        onStateChange={onSettingsState}
                        skipStopTracksOnUnmountRef={streamTransferredRef}
                        initialMediaMode={lastMediaMode}
                        initialVideoDeviceId={initialDevices.videoDeviceId}
                        initialAudioInDeviceId={initialDevices.audioInDeviceId}
                        hideMediaModeRadios={isInMeetingSettings}
                      />
                    </div>
                  ) : null}
                  {showEventInfoTab ? (
                    <div
                      className="ah-tab-content"
                      data-active={!showSettingsTab || tab === 'info' ? 'true' : 'false'}
                    >
                      <PreMeetingEventInfoTab />
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="pre-meeting-modal__actions">
              <div className="modal-footer meeting-setting-footer">
                {isBlockedOrDenied && admissionWaitMessage ? (
                  <p className="pre-meeting-admission-message" role="status" aria-live="polite">
                    {admissionWaitMessage}
                  </p>
                ) : null}
                {isJoiningOrWaiting ? (
                  <p className="pre-meeting-admission-message" role="status" aria-live="polite">
                    {admissionStatus === 'pending' && admissionWaitMessage
                      ? admissionWaitMessage
                      : 'Please wait for the host to accept you in the meeting room'}
                  </p>
                ) : null}
              {!isWaitingForAdmission && !isBlockedOrDenied ? (
                paymentRequired && !isInMeetingSettings ? (
                  <button
                    type="button"
                    className="btn cmn-btn btn_section pre-meeting-enter"
                    onClick={() => dispatch(openPaymentModal())}
                  >
                    Proceed to payment{amountDue > 0 ? ` ($${amountDue.toFixed(2)})` : ''}
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn cmn-btn btn_section pre-meeting-enter"
                    disabled={enterBusy}
                    onClick={isInMeetingSettings ? handleContinue : () => void handleEnter()}
                  >
                    {enterBusy ? 'Checking…' : isInMeetingSettings ? 'Continue' : 'Enter'}
                  </button>
                )
              ) : null}
              </div>
              {!isInMeetingSettings && !isJoiningOrWaiting ? (
                <div className="back-to-home-link">
                  <a className="link-btn" href="/" onClick={(e) => e.preventDefault()}>
                    Back To Home
                  </a>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </PreMeetingBackdrop>
  )
}

function PreMeetingBackdrop({
  children,
  onClose,
}: {
  children: React.ReactNode
  onClose?: () => void
}) {
  return (
    <div
      className="pre-meeting-backdrop"
      aria-modal
      role="dialog"
      aria-labelledby="pre-meeting-title"
      onClick={(e) => {
        if (onClose && e.target === e.currentTarget) onClose()
      }}
    >
      {children}
    </div>
  )
}
