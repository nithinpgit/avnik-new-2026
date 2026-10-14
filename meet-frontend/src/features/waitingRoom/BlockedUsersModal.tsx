import { useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { pushToast } from '../documents/notificationsSlice'
import { selectMeetingRoomId } from '../meetingSession/meetingSessionSlice'
import { IconClose } from '../videoConference/MeetingIcons'
import { selectVisibleParticipants } from '../videoConference/videoConferenceSlice'
import {
  fetchBlockedUsersForRoom,
  unblockUserForRoom,
  type BlockedUserRow,
} from './blockedUsersApi'
import './blockedUsersModal.css'

type BlockedUsersModalProps = {
  open: boolean
  onClose: () => void
}

function formatBlockedAt(iso: string): string {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return ''
  return date.toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

export function BlockedUsersModal({ open, onClose }: BlockedUsersModalProps) {
  const dispatch = useAppDispatch()
  const roomId = useAppSelector(selectMeetingRoomId)
  const participants = useAppSelector(selectVisibleParticipants)
  const [rows, setRows] = useState<BlockedUserRow[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [unblockingId, setUnblockingId] = useState<string | null>(null)

  const resolveDisplayName = useCallback(
    (userId: string) => {
      const match = participants.find((p) => p.id === userId)
      return match?.name?.trim() || userId
    },
    [participants],
  )

  const loadBlockedUsers = useCallback(async () => {
    if (!roomId) return
    setLoading(true)
    setError(null)
    try {
      const users = await fetchBlockedUsersForRoom(roomId)
      setRows(users)
    } catch {
      setError('Could not load blocked users.')
      setRows([])
    } finally {
      setLoading(false)
    }
  }, [roomId])

  useEffect(() => {
    if (!open) return
    void loadBlockedUsers()
  }, [open, loadBlockedUsers])

  const handleUnblock = async (userId: string) => {
    if (!roomId || unblockingId) return
    setUnblockingId(userId)
    try {
      await unblockUserForRoom(roomId, userId)
      setRows((prev) => prev.filter((row) => row.userId !== userId))
      dispatch(pushToast({ message: 'User unblocked.', variant: 'success', durationMs: 3000 }))
    } catch {
      dispatch(pushToast({ message: 'Could not unblock user.', variant: 'error' }))
    } finally {
      setUnblockingId(null)
    }
  }

  if (!open) return null

  return createPortal(
    <div className="blocked-users-overlay" role="presentation" onClick={onClose}>
      <div
        className="blocked-users-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="blocked-users-title"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="blocked-users-modal__header">
          <h2 id="blocked-users-title" className="blocked-users-modal__title">
            Blocked Users
          </h2>
          <button
            type="button"
            className="blocked-users-modal__close"
            aria-label="Close"
            onClick={onClose}
          >
            <IconClose size={18} />
          </button>
        </header>
        <div className="blocked-users-modal__body">
          {loading ? (
            <p className="blocked-users-modal__status">Loading…</p>
          ) : error ? (
            <p className="blocked-users-modal__status blocked-users-modal__status--error">{error}</p>
          ) : rows.length === 0 ? (
            <p className="blocked-users-modal__status">No blocked users for this room.</p>
          ) : (
            <ul className="blocked-users-modal__list">
              {rows.map((row) => (
                <li key={row.userId} className="blocked-users-modal__item">
                  <div className="blocked-users-modal__user">
                    <span className="blocked-users-modal__name">{resolveDisplayName(row.userId)}</span>
                    <span className="blocked-users-modal__meta">
                      Blocked {formatBlockedAt(row.blockedAt)}
                    </span>
                  </div>
                  <button
                    type="button"
                    className="blocked-users-modal__unblock"
                    disabled={unblockingId === row.userId}
                    onClick={() => void handleUnblock(row.userId)}
                  >
                    {unblockingId === row.userId ? 'Unblocking…' : 'Unblock'}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>,
    document.body,
  )
}
