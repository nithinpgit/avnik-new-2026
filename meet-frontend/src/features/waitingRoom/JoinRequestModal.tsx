import { createPortal } from 'react-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectMeetingRoomId } from '../meetingSession/meetingSessionSlice'
import { useMeetingSocket } from '../meetingRoom/MeetingSocketProvider'
import { useIsMeetingHost } from '../meeting/useIsMeetingHost'
import {
  dequeueJoinRequest,
  openBlockConfirm,
  selectActiveJoinRequest,
  selectAutoAcceptAll,
  setAutoAcceptAll,
} from './waitingRoomSlice'
import './joinRequestModal.css'

export function JoinRequestModal() {
  const dispatch = useAppDispatch()
  const { socket } = useMeetingSocket()
  const isHost = useIsMeetingHost()
  const roomId = useAppSelector(selectMeetingRoomId)
  const request = useAppSelector(selectActiveJoinRequest)
  const autoAcceptAll = useAppSelector(selectAutoAcceptAll)

  if (!isHost || !request || !roomId) return null

  const displayName = request.name.trim() || 'Guest'

  const handleAdmit = () => {
    socket?.emit('admit_participant', { roomId, targetUserId: request.userId })
    dispatch(dequeueJoinRequest(request.userId))
  }

  const handleDeny = () => {
    socket?.emit('deny_participant', { roomId, targetUserId: request.userId })
    dispatch(dequeueJoinRequest(request.userId))
  }

  const handleBlockClick = () => {
    dispatch(openBlockConfirm(request))
  }

  const handleAutoAcceptChange = (enabled: boolean) => {
    dispatch(setAutoAcceptAll(enabled))
    socket?.emit('set_auto_accept_all', { roomId, enabled })
  }

  return createPortal(
    <div className="join-request-overlay" role="presentation">
      <div
        className="join-request-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="join-request-title"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="join-request-modal__header">
          <button type="button" className="join-request-modal__block-link" onClick={handleBlockClick}>
            Block
          </button>
        </header>
        <div className="join-request-modal__body">
          <span className="join-request-modal__avatar" aria-hidden>
            {displayName.charAt(0).toUpperCase()}
          </span>
          <p id="join-request-title" className="join-request-modal__message">
            <strong>{displayName}</strong> wants to join the meeting
          </p>
        </div>
        <footer className="join-request-modal__footer">
          <label className="join-request-modal__auto">
            <input
              type="checkbox"
              checked={autoAcceptAll}
              onChange={(e) => handleAutoAcceptChange(e.target.checked)}
            />
            Auto Accept All
          </label>
          <div className="join-request-modal__actions">
            <button type="button" className="join-request-modal__btn join-request-modal__btn--deny" onClick={handleDeny}>
              Deny
            </button>
            <button type="button" className="join-request-modal__btn join-request-modal__btn--admit" onClick={handleAdmit}>
              Admit
            </button>
          </div>
        </footer>
      </div>
    </div>,
    document.body,
  )
}
