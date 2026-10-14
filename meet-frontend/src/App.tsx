import './App.css'
import { useEffect, useRef } from 'react'
import pkg from '../package.json'
import { useAppDispatch, useAppSelector } from './app/hooks'
import { PortraitRotateOverlay } from './components/portraitRotate'
import { initMeetingSessionFromLocation, selectMeetingUserId } from './features/meetingSession/meetingSessionSlice'
import { MeetingChatChrome } from './features/chat/MeetingChatChrome'
import { MeetingChatProvider } from './features/chat/MeetingChatProvider'
import { MediasoupMediaProvider } from './features/mediasoup/MediasoupMediaProvider'
import { MeetingSocketProvider } from './features/meetingRoom/MeetingSocketProvider'
import { NotificationStack } from './features/documents/NotificationStack'
import { ShareDocumentModal } from './features/documents/ShareDocumentModal'
import { ShareVideoModal } from './features/videoShare/ShareVideoModal'
import { KickUserConfirmModal } from './features/participantControls/KickUserConfirmModal'
import { BlockJoinRequestModal } from './features/waitingRoom/BlockJoinRequestModal'
import { JoinRequestModal } from './features/waitingRoom/JoinRequestModal'
import { PreMeetingModal } from './features/preMeeting/PreMeetingModal'
import { setLocalParticipantId, selectConferenceMode, selectParticipantSidebarOpen, selectToolbarsVisible } from './features/videoConference/videoConferenceSlice'
import { MeetingNotificationsBridge } from './features/notifications/MeetingNotificationsBridge'
import { RaiseHandHostNotifier } from './features/raiseHand/RaiseHandHostNotifier'
import { ParticipantCameraPublisher } from './features/videoConference/ParticipantCameraPublisher'
import { ParticipantSidebarToggle } from './features/videoConference/ParticipantSidebarToggle'
import { MeetingToolbarDockToggle } from './features/videoConference/MeetingToolbarDockToggle'
import { VideoConferenceModule } from './features/videoConference/VideoConferenceModule'
import { WhiteboardModule } from './features/whiteboard/WhiteboardModule'
import { RecordingCaptureBridge } from './features/recording/RecordingCaptureBridge'
import { useRecorderUiActive } from './features/recording/useRecorderUiActive'
import { ExternalMeetingBootstrap } from './features/externalApi/ExternalMeetingBootstrap'
import { ExternalMeetingStatusBridge } from './features/externalApi/ExternalMeetingStatusBridge'
import { PostMeetingFlowBridge } from './features/externalApi/PostMeetingFlowBridge'
import { PaymentModal } from './features/externalApi/PaymentModal'
import { ReviewModal } from './features/externalApi/ReviewModal'
import { ExtendDurationModal } from './features/externalApi/ExtendDurationModal'
import { ExtendDurationBridge } from './features/externalApi/ExtendDurationBridge'
import { ExtendParticipantModals } from './features/externalApi/ExtendParticipantModals'
import { ExtendFiveMinuteNoticeModal } from './features/externalApi/ExtendFiveMinuteNoticeModal'
import { PrivateMeetingBridge } from './features/privateMeeting/PrivateMeetingBridge'
import './features/recording/recordingView.css'
import './features/videoConference/meetingLayout.css'
import './features/videoConference/meetingToolbarDock.css'
import './features/videoConference/meetingTooltip.css'

function App() {
  const dispatch = useAppDispatch()
  const meetingUserId = useAppSelector(selectMeetingUserId)
  const recorderUi = useRecorderUiActive()
  const isConferenceMode = useAppSelector(selectConferenceMode)
  const participantSidebarOpen = useAppSelector(selectParticipantSidebarOpen)
  const toolbarsVisible = useAppSelector(selectToolbarsVisible)
  const captureRootRef = useRef<HTMLDivElement>(null)
  const sidebarLayoutOpen = recorderUi || (participantSidebarOpen && !isConferenceMode)

  useEffect(() => {
    console.log(`App version: ${pkg.version}`)
  }, [])

  useEffect(() => {
    dispatch(initMeetingSessionFromLocation())
  }, [dispatch])

  useEffect(() => {
    if (meetingUserId) {
      dispatch(setLocalParticipantId(meetingUserId))
    }
  }, [meetingUserId, dispatch])

  return (
    <>
      {!recorderUi ? <PortraitRotateOverlay /> : null}
      <ExternalMeetingBootstrap>
        <main className={recorderUi ? 'app-shell recording-app' : 'app-shell'}>
          <MeetingSocketProvider recorderMode={recorderUi}>
            <MeetingChatProvider>
              <MediasoupMediaProvider consumeOnly={recorderUi}>
                {!recorderUi ? <ExternalMeetingStatusBridge /> : null}
                {!recorderUi ? <PostMeetingFlowBridge /> : null}
                {!recorderUi ? <ExtendDurationBridge /> : null}
                {!recorderUi ? <MeetingNotificationsBridge /> : null}
              {!recorderUi ? <RaiseHandHostNotifier /> : null}
              {!recorderUi ? <PrivateMeetingBridge /> : null}
              <ParticipantCameraPublisher />
              <div
                ref={captureRootRef}
                className={`meeting-layout-root${recorderUi ? ' recording-capture-root' : ''}`}
                data-participant-sidebar={sidebarLayoutOpen ? 'open' : 'closed'}
                data-toolbars-visible={toolbarsVisible ? 'true' : 'false'}
              >
                <WhiteboardModule />
                <VideoConferenceModule />
                {!recorderUi && !isConferenceMode ? <ParticipantSidebarToggle /> : null}
                {!recorderUi ? <MeetingToolbarDockToggle placement="floating" /> : null}
              </div>
              {!recorderUi ? <MeetingChatChrome /> : null}
              {!recorderUi ? <PreMeetingModal /> : null}
              {!recorderUi ? <ShareDocumentModal /> : null}
              {!recorderUi ? <ShareVideoModal /> : null}
              {!recorderUi ? <KickUserConfirmModal /> : null}
              {!recorderUi ? <JoinRequestModal /> : null}
              {!recorderUi ? <BlockJoinRequestModal /> : null}
              {!recorderUi ? <NotificationStack /> : null}
              {!recorderUi ? <PaymentModal /> : null}
              {!recorderUi ? <ReviewModal /> : null}
              {!recorderUi ? <ExtendDurationModal /> : null}
              {!recorderUi ? <ExtendFiveMinuteNoticeModal /> : null}
              {!recorderUi ? <ExtendParticipantModals /> : null}
              <RecordingCaptureBridge captureRootRef={captureRootRef} />
            </MediasoupMediaProvider>
          </MeetingChatProvider>
        </MeetingSocketProvider>
        </main>
      </ExternalMeetingBootstrap>
    </>
  )
}

export default App
