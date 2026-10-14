import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectMeetingRoomId } from '../meetingSession/meetingSessionSlice'
import { useMeetingSocket } from '../meetingRoom/MeetingSocketProvider'
import { IconAttended } from '../videoConference/MeetingIcons'
import { selectAutoAcceptAll, setAutoAcceptAll } from './waitingRoomSlice'

export function AutoAcceptSidebarToggle() {
  const dispatch = useAppDispatch()
  const { socket } = useMeetingSocket()
  const roomId = useAppSelector(selectMeetingRoomId)
  const autoAcceptAll = useAppSelector(selectAutoAcceptAll)

  const toggle = () => {
    if (!roomId) return
    const next = !autoAcceptAll
    dispatch(setAutoAcceptAll(next))
    socket?.emit('set_auto_accept_all', { roomId, enabled: next })
  }

  return (
    <button
      type="button"
      className={`video-sidebar__auto-accept meeting-tooltip meeting-tooltip--bottom ${autoAcceptAll ? 'video-sidebar__auto-accept--on' : ''}`}
      data-tooltip={autoAcceptAll ? 'Auto accept is on — click to turn off' : 'Auto accept is off — click to turn on'}
      aria-label={autoAcceptAll ? 'Auto accept is on' : 'Auto accept is off'}
      aria-pressed={autoAcceptAll}
      onClick={toggle}
    >
      <IconAttended size={15} />
    </button>
  )
}
