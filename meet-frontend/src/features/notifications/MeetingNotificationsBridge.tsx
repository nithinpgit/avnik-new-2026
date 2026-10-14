import { useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { PRESENTATION_CHANNEL, parsePresentationPayload } from '../documents/presentationTypes'
import { selectMeetingStatus } from '../meeting/meetingLifecycleSlice'
import { SCREEN_SHARE_SYNC_CHANNEL, parseScreenShareSync } from '../screenShare/screenShareSync'
import { VIDEO_SHARE_CHANNEL, parseVideoSharePayload } from '../videoShare/videoShareTypes'
import { pushMeetingNotification } from './meetingNotificationsSlice'

/**
 * Watches room sync + meeting lifecycle and pushes in-app notifications
 * (reference: avnik_old pushNotification + socket events).
 */
export function MeetingNotificationsBridge() {
  const dispatch = useAppDispatch()
  const meetingStatus = useAppSelector(selectMeetingStatus)
  const presentationRaw = useAppSelector((s) => s.roomSync.channels[PRESENTATION_CHANNEL])
  const videoShareRaw = useAppSelector((s) => s.roomSync.channels[VIDEO_SHARE_CHANNEL])
  const screenShareRaw = useAppSelector((s) => s.roomSync.channels[SCREEN_SHARE_SYNC_CHANNEL])

  const prevMeetingStatus = useRef(meetingStatus)
  const prevPresentationKey = useRef<string | null>(null)
  const prevVideoKey = useRef<string | null>(null)
  const prevScreenKey = useRef<string | null>(null)

  useEffect(() => {
    const prev = prevMeetingStatus.current
    prevMeetingStatus.current = meetingStatus
    if (prev === meetingStatus) return

    if (meetingStatus === 'started' && (prev === 'not_started' || prev === 'paused' || prev === 'ended')) {
      dispatch(
        pushMeetingNotification({
          userName: 'Meeting',
          message: prev === 'paused' ? 'Meeting has resumed' : 'Meeting has started',
          playSound: false,
        }),
      )
      return
    }
    if (meetingStatus === 'paused' && prev === 'started') {
      dispatch(
        pushMeetingNotification({
          userName: 'Meeting',
          message: 'Host paused the meeting',
        }),
      )
      return
    }
    if (meetingStatus === 'ended' && prev !== 'ended') {
      dispatch(
        pushMeetingNotification({
          userName: 'Meeting',
          message: 'Meeting has ended',
        }),
      )
    }
  }, [meetingStatus, dispatch])

  useEffect(() => {
    const parsed = parsePresentationPayload(presentationRaw)
    const key = parsed?.active ? parsed.fileId : null
    const prev = prevPresentationKey.current
    prevPresentationKey.current = key
    if (!key || key === prev) return
    dispatch(
      pushMeetingNotification({
        userName: 'Meeting',
        message: `A document has been shared: ${parsed?.originalName ?? 'Document'}`,
      }),
    )
  }, [presentationRaw, dispatch])

  useEffect(() => {
    const parsed = parseVideoSharePayload(videoShareRaw)
    const key = parsed?.active ? parsed.fileId : null
    const prev = prevVideoKey.current
    prevVideoKey.current = key
    if (!key || key === prev) return
    dispatch(
      pushMeetingNotification({
        userName: 'Meeting',
        message: `A video has been shared: ${parsed?.originalName ?? 'Video'}`,
      }),
    )
  }, [videoShareRaw, dispatch])

  useEffect(() => {
    const parsed = parseScreenShareSync(screenShareRaw)
    const key = parsed?.active ? parsed.presenterId : null
    const prev = prevScreenKey.current
    prevScreenKey.current = key
    if (!key || key === prev) return
    const name = parsed?.presenterName ?? 'Someone'
    dispatch(
      pushMeetingNotification({
        userName: name,
        message: `${name} started screen sharing`,
        playSound: false,
      }),
    )
  }, [screenShareRaw, dispatch])

  return null
}
