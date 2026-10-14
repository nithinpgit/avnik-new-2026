import { useEffect, useMemo, useState, type RefObject } from 'react'
import { useAppSelector } from '../../app/hooks'
import { useMediasoupMedia } from '../mediasoup/MediasoupMediaProvider'
import { selectIsMeetingLive } from '../meeting/meetingLifecycleSlice'
import { useMeetingSocket } from '../meetingRoom/MeetingSocketProvider'
import { selectPreMeetingEntryCompleted } from '../preMeeting/preMeetingSlice'
import { hasRemoteVideoStream } from './recordingCompositor'
import { useRecorderUiActive } from './useRecorderUiActive'
import { useRecordingCapture } from './useRecordingCapture'

/** In-page MediaRecorder (VideoFrame compositor + mixed audio) → 5s WebM chunks. */
export function RecordingCaptureBridge({
  captureRootRef,
}: {
  captureRootRef: RefObject<HTMLDivElement | null>
}) {
  const recorderUi = useRecorderUiActive()
  const { presenceJoined } = useMeetingSocket()
  const { sfuStatus, remoteStreams, remoteMediaRevisions } = useMediasoupMedia()
  const meetingLive = useAppSelector(selectIsMeetingLive)
  const entryCompleted = useAppSelector(selectPreMeetingEntryCompleted)
  const [layoutReady, setLayoutReady] = useState(false)

  const joinReady = entryCompleted && presenceJoined && meetingLive
  const hasRemoteVideo = useMemo(
    () => hasRemoteVideoStream(remoteStreams),
    [remoteStreams, remoteMediaRevisions],
  )
  const mediaReady = sfuStatus === 'connected' && (recorderUi || hasRemoteVideo)
  const captureReady = recorderUi && joinReady && layoutReady && mediaReady

  useEffect(() => {
    if (!recorderUi || !joinReady) {
      setLayoutReady(false)
      return
    }
    const timer = window.setTimeout(() => setLayoutReady(true), 2000)
    return () => window.clearTimeout(timer)
  }, [recorderUi, joinReady])

  useRecordingCapture(captureRootRef, captureReady)

  if (!recorderUi) return null

  return (
    <div className="recording-app__status" aria-live="polite">
      {captureReady
        ? 'Recording'
        : sfuStatus === 'connected' && !hasRemoteVideo
          ? 'Waiting for participant video…'
          : sfuStatus === 'connected'
            ? 'Preparing capture…'
            : joinReady
              ? 'Joined — waiting for media'
              : 'Connecting…'}
    </div>
  )
}
