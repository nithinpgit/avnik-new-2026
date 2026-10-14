import { useState } from 'react'
import { createPortal } from 'react-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { pushToast } from '../documents/notificationsSlice'
import { selectMeetingRoomId, selectMeetingUserId, selectMeetingSlotId } from '../meetingSession/meetingSessionSlice'
import { blockMeetingRoomUser } from '../externalApi/client'
import { useMeetingSocket } from '../meetingRoom/MeetingSocketProvider'
import { blockUserForRoom } from './blockedUsersApi'
import { closeBlockConfirm, dequeueJoinRequest, selectBlockConfirmTarget } from './waitingRoomSlice'
import './blockJoinRequestModal.css'

export function BlockJoinRequestModal() {
  const dispatch = useAppDispatch()
  const { socket } = useMeetingSocket()
  const roomId = useAppSelector(selectMeetingRoomId)
  const slotId = useAppSelector(selectMeetingSlotId)
  const hostUserId = useAppSelector(selectMeetingUserId)
  const target = useAppSelector(selectBlockConfirmTarget)
  const [blockPersist, setBlockPersist] = useState(true)
  const [busy, setBusy] = useState(false)

  if (!target || !roomId) return null

  const handleCancel = () => {
    dispatch(closeBlockConfirm())
    setBlockPersist(true)
  }

  const handleExit = async () => {
    if (busy) return
    setBusy(true)
    try {
      if (blockPersist) {
        await blockUserForRoom(roomId, target.userId, hostUserId ?? undefined)
        if (slotId) {
          try {
            await blockMeetingRoomUser({ roomId: slotId, userId: target.userId, block: true })
          } catch {
            /* best-effort external sync */
          }
        }
        socket?.emit('block_participant', { roomId, targetUserId: target.userId, block: true })
      } else {
        socket?.emit('deny_participant', { roomId, targetUserId: target.userId })
      }
      dispatch(dequeueJoinRequest(target.userId))
      dispatch(closeBlockConfirm())
      setBlockPersist(true)
    } catch {
      dispatch(pushToast({ message: 'Could not block user.', variant: 'error' }))
    } finally {
      setBusy(false)
    }
  }

  return createPortal(
    <div className="block-join-overlay" role="presentation" onClick={handleCancel}>
      <div
        className="block-join-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="block-join-title"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="block-join-modal__header">
          <div className="block-join-modal__icon" aria-hidden>
            ⎋
          </div>
        </header>
        <div className="block-join-modal__body">
          <h2 id="block-join-title" className="block-join-modal__title">
            You sure you want to exit this user?
          </h2>
          <label className="block-join-modal__checkbox">
            <input
              type="checkbox"
              checked={blockPersist}
              onChange={(e) => setBlockPersist(e.target.checked)}
            />
            Block this user from entering the room again
          </label>
        </div>
        <footer className="block-join-modal__footer">
          <button type="button" className="block-join-modal__exit" disabled={busy} onClick={() => void handleExit()}>
            Exit
          </button>
        </footer>
      </div>
    </div>,
    document.body,
  )
}
