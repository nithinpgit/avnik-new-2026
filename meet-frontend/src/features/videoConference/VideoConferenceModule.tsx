import type { CSSProperties } from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { MEETING_REDIRECT_URL } from '../../config'
import { handlePostMeetingEnd } from '../externalApi/handlePostMeetingEnd'
import { useHostOpenExtendFlow } from '../externalApi/ExtendDurationBridge'
import { selectExternalQuickMeet } from '../externalApi/externalMeetingSlice'
import { EndMeetingConfirmModal } from '../meeting/EndMeetingConfirmModal'
import { LeaveMeetingConfirmModal } from '../meeting/LeaveMeetingConfirmModal'
import { MeetingNotificationsPanel } from '../notifications/MeetingNotificationsPanel'
import { PrivateMeetingIndicator } from '../privateMeeting/PrivateMeetingIndicator'
import { MeetingStatusBanner } from '../meeting/MeetingStatusBanner'
import { MeetingPausedOverlay } from '../meeting/MeetingPausedOverlay'
import { RecordingActiveBanner } from '../recording/RecordingActiveBanner'
import { RecordingActiveNotifier } from '../recording/RecordingActiveNotifier'
import { selectIsMeetingLive, selectMeetingStatus } from '../meeting/meetingLifecycleSlice'
import { useIsMeetingHost } from '../meeting/useIsMeetingHost'
import { useMeetingElapsedLabel, useMeetingRemainingSeconds, EXTEND_REMAINING_THRESHOLD_SEC } from '../meeting/useMeetingElapsedLabel'
import { openPreMeetingSettings } from '../preMeeting/preMeetingSlice'
import { useMeetingSocket } from '../meetingRoom/MeetingSocketProvider'
import { ScreenShareStage } from '../screenShare/ScreenShareStage'
import { VideoShareStage } from '../videoShare/VideoShareStage'
import { PresentationCloseButton } from '../documents/PresentationCloseButton'
import { useHostRecording } from '../recording/useHostRecording'
import { useRecorderUiActive } from '../recording/useRecorderUiActive'
import { AutoAcceptSidebarToggle } from '../waitingRoom/AutoAcceptSidebarToggle'
import { BlockedUsersModal } from '../waitingRoom/BlockedUsersModal'
import { InviteUserModal } from './InviteUserModal'
import { MeetingBottomToolbar } from './MeetingBottomToolbar'
import { LocalCameraManager } from './LocalCameraManager'
import { ParticipantVideoTile } from './ParticipantVideoTile'
import {
  selectConferenceMode,
  selectParticipantSidebarOpen,
  selectVisibleParticipants,
  toggleConferenceMode,
} from './videoConferenceSlice'
import {
  IconClose,
  IconExit,
  IconGear,
  IconMonitor,
  IconPause,
  IconPlay,
  IconRecord,
  IconSearch,
  IconUser,
} from './MeetingIcons'
import { getConferenceGridLayout } from './conferenceGrid'
import { splitConferenceParticipants } from './conferenceParticipants'
import {
  CONFERENCE_OVERFLOW_STRIP_HEIGHT_PX,
} from '../../constants/meeting'
import './meeting-icons.css'
import './meetingBottomToolbar.css'
import './meetingTooltip.css'
import './videoConference.css'
import '../recording/recordingView.css'

export function VideoConferenceModule() {
  const dispatch = useAppDispatch()
  const recorderUi = useRecorderUiActive()
  const { startMeeting, pauseMeeting, endMeeting } = useMeetingSocket()
  const isConferenceMode = useAppSelector(selectConferenceMode)
  const participantSidebarOpen = useAppSelector(selectParticipantSidebarOpen)
  const participants = useAppSelector(selectVisibleParticipants)
  const meetingStatus = useAppSelector(selectMeetingStatus)
  const meetingLive = useAppSelector(selectIsMeetingLive)
  const isHost = useIsMeetingHost()
  const elapsedLabel = useMeetingElapsedLabel()
  const remainingSec = useMeetingRemainingSeconds()
  const quickMeet = useAppSelector(selectExternalQuickMeet)
  const canExtendDuration = !quickMeet && remainingSec < EXTEND_REMAINING_THRESHOLD_SEC
  const openExtendFlow = useHostOpenExtendFlow()
  const [startingMeeting, setStartingMeeting] = useState(false)
  const [endMeetingOpen, setEndMeetingOpen] = useState(false)
  const [leaveMeetingOpen, setLeaveMeetingOpen] = useState(false)
  const [inviteOpen, setInviteOpen] = useState(false)
  const [participantSearchOpen, setParticipantSearchOpen] = useState(false)
  const [participantSearchQuery, setParticipantSearchQuery] = useState('')
  const [blockedUsersOpen, setBlockedUsersOpen] = useState(false)
  const participantSearchInputRef = useRef<HTMLInputElement>(null)
  const { recording, recordingSessionActive, canRecord, toggleRecording } = useHostRecording()

  const filteredParticipants = useMemo(() => {
    const query = participantSearchQuery.trim().toLowerCase()
    if (!query) return participants
    return participants.filter((participant) => participant.name.toLowerCase().includes(query))
  }, [participants, participantSearchQuery])

  const closeParticipantSearch = () => {
    setParticipantSearchOpen(false)
    setParticipantSearchQuery('')
  }

  const toggleParticipantSearch = () => {
    if (participantSearchOpen) {
      closeParticipantSearch()
      return
    }
    setParticipantSearchOpen(true)
  }

  useEffect(() => {
    if (!participantSearchOpen) return
    const id = window.setTimeout(() => participantSearchInputRef.current?.focus(), 0)
    return () => window.clearTimeout(id)
  }, [participantSearchOpen])

  useEffect(() => {
    if (!isConferenceMode) return
    closeParticipantSearch()
  }, [isConferenceMode])

  useEffect(() => {
    if (participantSidebarOpen) return
    closeParticipantSearch()
  }, [participantSidebarOpen])

  const showHostPlay =
    isHost && (meetingStatus === 'not_started' || meetingStatus === 'paused' || meetingStatus === 'ended')
  const showHostPause = isHost && meetingStatus === 'started'

  useEffect(() => {
    if (!startingMeeting) return
    const id = window.setTimeout(() => setStartingMeeting(false), 8000)
    return () => window.clearTimeout(id)
  }, [startingMeeting])

  useEffect(() => {
    if (meetingLive || meetingStatus === 'paused') {
      setStartingMeeting(false)
    }
  }, [meetingLive, meetingStatus])

  const handleStartOrResume = () => {
    if (startingMeeting) return
    if (meetingStatus !== 'not_started' && meetingStatus !== 'paused' && meetingStatus !== 'ended') return
    setStartingMeeting(true)
    startMeeting()
  }

  const handlePauseMeeting = () => {
    if (!meetingLive) return
    pauseMeeting()
  }

  const handleExitClick = () => {
    if (isHost) {
      setEndMeetingOpen(true)
      return
    }
    setLeaveMeetingOpen(true)
  }

  const handleConfirmEndMeeting = () => {
    setEndMeetingOpen(false)
    endMeeting()
  }

  const handleConfirmLeaveMeeting = () => {
    setLeaveMeetingOpen(false)
    handlePostMeetingEnd(dispatch, MEETING_REDIRECT_URL)
  }

  const { stageParticipants, overflowParticipants } = useMemo(
    () => splitConferenceParticipants(participants),
    [participants],
  )

  const conferenceGrid = useMemo(
    () => getConferenceGridLayout(stageParticipants.length),
    [stageParticipants.length],
  )

  const hasConferenceOverflow = overflowParticipants.length > 0

  const stageStyle = useMemo(
    () =>
      ({
        '--stage-cols': conferenceGrid.cols,
        '--stage-rows': conferenceGrid.rows,
        ...(hasConferenceOverflow
          ? { '--conference-overflow-height': `${CONFERENCE_OVERFLOW_STRIP_HEIGHT_PX}px` }
          : {}),
      }) as CSSProperties,
    [conferenceGrid, hasConferenceOverflow],
  )

  return (
    <section
      className={`video-conference ${isConferenceMode ? 'conference' : 'normal'}${recorderUi ? ' recording-view' : ''}${!participantSidebarOpen && !isConferenceMode ? ' video-conference--sidebar-closed' : ''}`}
      aria-label="Video conference module"
    >
      <LocalCameraManager />

      <header className="meeting-topbar">
        <div className="meeting-topbar__left">
          <button
            type="button"
            className="cmn-cricle-btn meeting-tooltip meeting-tooltip--bottom"
            data-tooltip="Settings"
            aria-label="Settings"
            onClick={() => dispatch(openPreMeetingSettings())}
          >
            <span className="cmn-cricle-btn__icon" aria-hidden>
              <IconGear />
            </span>
          </button>
          <div className="meeting-time-group">
            <span className="meeting-time" aria-live="polite">
              {elapsedLabel}
            </span>
            {isHost && canExtendDuration ? (
              <button
                type="button"
                className="cmn-cricle-btn cmn-cricle-btn--extend meeting-tooltip meeting-tooltip--bottom"
                data-tooltip="Extend duration"
                aria-label="Extend session duration"
                onClick={() => openExtendFlow()}
              >
                <span className="cmn-cricle-btn__icon cmn-cricle-btn__icon--glyph" aria-hidden>
                  +
                </span>
              </button>
            ) : null}
          </div>
          <RecordingActiveBanner />
          <RecordingActiveNotifier />
          {showHostPlay ? (
            <button
              type="button"
              className="cmn-cricle-btn cmn-cricle-btn--active meeting-tooltip meeting-tooltip--bottom"
              data-tooltip={
                meetingStatus === 'paused'
                  ? 'Click play button to resume meeting'
                  : meetingStatus === 'ended'
                    ? 'Click play button to start a new session'
                    : 'Click play button to start meeting'
              }
              aria-label={
                meetingStatus === 'paused'
                  ? 'Resume meeting'
                  : meetingStatus === 'ended'
                    ? 'Start new session'
                    : 'Start meeting'
              }
              disabled={startingMeeting}
              onClick={handleStartOrResume}
            >
              <span className="cmn-cricle-btn__icon" aria-hidden>
                <IconPlay />
              </span>
            </button>
          ) : null}
          {showHostPause ? (
            <>
              <button
                type="button"
                className="cmn-cricle-btn meeting-tooltip meeting-tooltip--bottom"
                data-tooltip="Pause"
                aria-label="Pause meeting"
                onClick={handlePauseMeeting}
              >
                <span className="cmn-cricle-btn__icon" aria-hidden>
                  <IconPause />
                </span>
              </button>
              <button
                type="button"
                className={`cmn-cricle-btn cmn-cricle-btn--record-dot meeting-tooltip meeting-tooltip--bottom ${recordingSessionActive ? 'cmn-cricle-btn--active' : ''}`}
                data-tooltip={recordingSessionActive ? 'Stop recording' : 'Start recording'}
                aria-label={recordingSessionActive ? 'Stop recording' : 'Start recording'}
                aria-pressed={recordingSessionActive}
                disabled={recording.loading || !canRecord}
                onClick={toggleRecording}
              >
                <span className="cmn-cricle-btn__icon cmn-cricle-btn__icon--record" aria-hidden>
                  <IconRecord size={14} />
                </span>
              </button>
            </>
          ) : null}
          <button
            type="button"
            className="cmn-cricle-btn cmn-cricle-btn--exit meeting-tooltip meeting-tooltip--bottom"
            data-tooltip={isHost ? 'End Meeting' : 'Leave meeting'}
            aria-label={isHost ? 'End Meeting' : 'Leave meeting'}
            onClick={handleExitClick}
          >
            <span className="cmn-cricle-btn__icon" aria-hidden>
              <IconExit />
            </span>
          </button>
        </div>
        <div className="meeting-topbar__brand">
          <img className="meeting-topbar__logo" src="images/logo.svg" alt="avnik" />
        </div>
        <div className="meeting-topbar__right">
          <PrivateMeetingIndicator />
          <MeetingNotificationsPanel />
          <button
            type="button"
            className={`cmn-cricle-btn meeting-tooltip meeting-tooltip--bottom ${isConferenceMode ? 'cmn-cricle-btn--active' : ''}`}
            data-tooltip={isConferenceMode ? 'Whiteboard layout' : 'Conference Mode'}
            aria-label={isConferenceMode ? 'Switch to whiteboard layout' : 'Conference mode'}
            aria-pressed={isConferenceMode}
            onClick={() => dispatch(toggleConferenceMode())}
          >
            <span className="cmn-cricle-btn__icon" aria-hidden>
              <IconMonitor />
            </span>
          </button>
          {isHost ? (
            <button
              type="button"
              className="cmn-cricle-btn meeting-tooltip meeting-tooltip--bottom"
              data-tooltip="Invite"
              aria-label="Invite"
              onClick={() => setInviteOpen(true)}
            >
              <span className="cmn-cricle-btn__icon" aria-hidden>
                <IconUser />
              </span>
            </button>
          ) : null}
        </div>
      </header>

      {!isConferenceMode && (
        <aside
          id="video-sidebar"
          className={`video-sidebar${recorderUi ? ' recording-view__sidebar' : ''}${!recorderUi && !participantSidebarOpen ? ' video-sidebar--collapsed' : ''}`}
          aria-label="Participants panel"
          aria-hidden={!recorderUi && !participantSidebarOpen}
        >
          <MeetingStatusBanner />
          <div className="video-sidebar__toolbar">
            <header
              className={`video-sidebar__header ${participantSearchOpen ? 'video-sidebar__header--search-open' : ''}`}
            >
              <span className="video-sidebar__title">Participants ({participants.length})</span>
              <div className="video-sidebar__header-actions">
                {isHost ? <AutoAcceptSidebarToggle /> : null}
                {isHost ? (
                  <button
                    type="button"
                    className={`video-sidebar__blocked-trigger meeting-tooltip meeting-tooltip--bottom ${blockedUsersOpen ? 'video-sidebar__blocked-trigger--active' : ''}`}
                    data-tooltip="Blocked users"
                    aria-label="Blocked users"
                    aria-expanded={blockedUsersOpen}
                    onClick={() => setBlockedUsersOpen(true)}
                  >
                    <IconExit size={14} />
                  </button>
                ) : null}
                {!participantSearchOpen ? (
                  <button
                    type="button"
                    className="video-sidebar__search-trigger meeting-tooltip meeting-tooltip--bottom"
                    data-tooltip="Search"
                    aria-label="Search participants"
                    aria-expanded={false}
                    onClick={toggleParticipantSearch}
                  >
                    <IconSearch size={15} />
                  </button>
                ) : null}
              </div>
            </header>
            {participantSearchOpen ? (
              <div className="video-sidebar__search-panel">
                <form
                  className="video-sidebar__search-form"
                  onSubmit={(event) => event.preventDefault()}
                >
                  <span className="video-sidebar__search-form-icon" aria-hidden>
                    <IconSearch size={13} />
                  </span>
                  <input
                    ref={participantSearchInputRef}
                    id="participant-search"
                    type="search"
                    className="video-sidebar__search-input"
                    placeholder="Search here..."
                    value={participantSearchQuery}
                    onChange={(event) => setParticipantSearchQuery(event.target.value)}
                    aria-label="Search participants by name"
                  />
                  <button
                    type="button"
                    className="video-sidebar__search-clear meeting-tooltip meeting-tooltip--bottom"
                    data-tooltip="Close search"
                    aria-label="Close search"
                    onClick={closeParticipantSearch}
                  >
                    <IconClose size={12} />
                  </button>
                </form>
              </div>
            ) : null}
          </div>
          <div
            id="video-sidebar__tiles"
            className={`video-sidebar__tiles${recorderUi ? ' recording-view__tiles' : ''}`}
          >
            {filteredParticipants.length === 0 ? (
              <p className="video-sidebar__empty">No participants found</p>
            ) : (
              filteredParticipants.map((participant, index) => (
                <ParticipantVideoTile key={participant.id} participant={participant} tileIndex={index} />
              ))
            )}
          </div>
        </aside>
      )}

      {isConferenceMode ? (
        <>
          <div className="conference-backdrop" aria-hidden />
          <div
            className={`video-stage${hasConferenceOverflow ? ' video-stage--with-overflow' : ''}`}
            style={stageStyle}
            aria-label="Conference stage"
          >
            {stageParticipants.map((participant, index) => (
              <ParticipantVideoTile key={participant.id} participant={participant} tileIndex={index} />
            ))}
          </div>
          {hasConferenceOverflow ? (
            <div
              className="conference-overflow-strip"
              style={{ ['--conference-overflow-height' as string]: `${CONFERENCE_OVERFLOW_STRIP_HEIGHT_PX}px` }}
              aria-label="Additional participants"
            >
              <div className="conference-overflow-strip__scroll">
                {overflowParticipants.map((participant, index) => (
                  <ParticipantVideoTile
                    key={participant.id}
                    participant={participant}
                    tileIndex={index}
                    layout="overflow"
                  />
                ))}
              </div>
            </div>
          ) : null}
        </>
      ) : null}

      <ScreenShareStage />
      <VideoShareStage />
      <PresentationCloseButton />
      <MeetingPausedOverlay />

      <MeetingBottomToolbar />

      {!recorderUi ? (
        <>
          <EndMeetingConfirmModal
            open={endMeetingOpen}
            onCancel={() => setEndMeetingOpen(false)}
            onConfirm={handleConfirmEndMeeting}
          />
          <LeaveMeetingConfirmModal
            open={leaveMeetingOpen}
            onCancel={() => setLeaveMeetingOpen(false)}
            onConfirm={handleConfirmLeaveMeeting}
          />
          <InviteUserModal open={inviteOpen} onClose={() => setInviteOpen(false)} />
          {isHost ? (
            <BlockedUsersModal open={blockedUsersOpen} onClose={() => setBlockedUsersOpen(false)} />
          ) : null}
        </>
      ) : null}
    </section>
  )
}
