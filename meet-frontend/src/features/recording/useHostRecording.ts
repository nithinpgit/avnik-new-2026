import { useCallback, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { useIsMeetingHost } from '../meeting/useIsMeetingHost'
import { selectIsMeetingLive } from '../meeting/meetingLifecycleSlice'
import { useMeetingSocket } from '../meetingRoom/MeetingSocketProvider'
import { selectMeetingRoomId, selectMeetingUserId } from '../meetingSession/meetingSessionSlice'
import { pushToast } from '../documents/notificationsSlice'
import { resolveMeetingApiPath } from '../meetingRoom/socketUrl'
import { isRecordingSessionActive, selectIsMeetingRecordingActive, selectMeetingRecording } from './recordingSelectors'
import { RECORDING_CHANNEL, type RecordingSyncPayload } from './recordingTypes'
import { saveRecordingMetadata } from '../externalApi/client'

export function useHostRecording() {
  const dispatch = useAppDispatch()
  const { emitRoomSync } = useMeetingSocket()
  const roomId = useAppSelector(selectMeetingRoomId)
  const userId = useAppSelector(selectMeetingUserId)
  const isHost = useIsMeetingHost()
  const meetingLive = useAppSelector(selectIsMeetingLive)
  const recordingPayload = useAppSelector(selectMeetingRecording)
  const recordingSessionActive = useAppSelector(selectIsMeetingRecordingActive)
  const [loading, setLoading] = useState(false)
  const recording = { ...recordingPayload, loading }

  const startRecording = useCallback(async () => {
    if (!roomId || !userId || !isHost || !meetingLive) return
    setLoading(true)
    try {
      const res = await fetch(resolveMeetingApiPath(`/api/rooms/${encodeURIComponent(roomId)}/recording/start`), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hostUserId: userId }),
      })
      const body = (await res.json()) as {
        ok?: boolean
        error?: string
        recording?: RecordingSyncPayload
      }
      if (!res.ok || !body.ok) {
        throw new Error(body.error || `Start failed (${res.status})`)
      }
      if (body.recording) {
        emitRoomSync(RECORDING_CHANNEL, body.recording)
      }
      dispatch(pushToast({ message: 'Recording started', variant: 'success' }))
    } catch (err) {
      dispatch(pushToast({ message: String(err), variant: 'error' }))
    } finally {
      setLoading(false)
    }
  }, [roomId, userId, isHost, meetingLive, dispatch, emitRoomSync])

  const stopRecording = useCallback(async () => {
    if (!roomId || !isHost) return
    setLoading(true)
    try {
      const res = await fetch(resolveMeetingApiPath(`/api/rooms/${encodeURIComponent(roomId)}/recording/stop`), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
      const body = (await res.json()) as {
        ok?: boolean
        error?: string
        recording?: RecordingSyncPayload
      }
      if (!res.ok || !body.ok) {
        throw new Error(body.error || `Stop failed (${res.status})`)
      }
      if (body.recording) {
        emitRoomSync(RECORDING_CHANNEL, body.recording)
      }
      dispatch(pushToast({ message: 'Recording saved successfully', variant: 'success', durationMs: 5000 }))
      if (body.recording?.recordingId && roomId && userId) {
        void saveRecordingMetadata({
          roomId,
          fileName: body.recording.recordingId,
          userId,
        }).catch(() => {
          /* internal recording saved; external metadata is best-effort */
        })
      }
    } catch (err) {
      dispatch(pushToast({ message: String(err), variant: 'error' }))
    } finally {
      setLoading(false)
    }
  }, [roomId, isHost, userId, dispatch, emitRoomSync])

  const toggleRecording = useCallback(() => {
    if (isRecordingSessionActive(recordingPayload)) {
      void stopRecording()
      return
    }
    void startRecording()
  }, [recordingPayload, startRecording, stopRecording])

  return {
    recording,
    recordingSessionActive,
    canRecord: isHost && meetingLive,
    toggleRecording,
    startRecording,
    stopRecording,
  }
}
