import { useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { IconBell } from '../videoConference/MeetingIcons'
import { UserAvatar } from '../../components/userAvatar'
import { formatNotificationTimestamp } from './notificationFormat'
import {
  selectMeetingNotifications,
  selectNotificationPanelOpen,
  selectNotificationSoundMuted,
  selectNotificationUnreadCount,
  setNotificationPanelOpen,
  setNotificationSoundMuted,
} from './meetingNotificationsSlice'
import './meetingNotificationsPanel.css'

export function MeetingNotificationsPanel() {
  const dispatch = useAppDispatch()
  const items = useAppSelector(selectMeetingNotifications)
  const unreadCount = useAppSelector(selectNotificationUnreadCount)
  const panelOpen = useAppSelector(selectNotificationPanelOpen)
  const soundMuted = useAppSelector(selectNotificationSoundMuted)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!panelOpen) return
    const onDocClick = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) {
        dispatch(setNotificationPanelOpen(false))
      }
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dispatch(setNotificationPanelOpen(false))
    }
    document.addEventListener('mousedown', onDocClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDocClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [panelOpen, dispatch])

  const togglePanel = () => {
    dispatch(setNotificationPanelOpen(!panelOpen))
  }

  const onMuteToggle = () => {
    dispatch(setNotificationSoundMuted(!soundMuted))
  }

  return (
    <div className="meeting-notifications" ref={rootRef}>
      <button
        type="button"
        className="cmn-cricle-btn cmn-cricle-btn--notify meeting-tooltip meeting-tooltip--bottom"
        data-tooltip="Notifications"
        aria-label="Notifications"
        aria-expanded={panelOpen}
        aria-haspopup="true"
        onClick={togglePanel}
      >
        <span className="cmn-cricle-btn__icon" aria-hidden>
          <IconBell />
        </span>
        {unreadCount > 0 ? (
          <span className="notify-badge notify-badge--visible" aria-label={`${unreadCount} unread notifications`}>
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        ) : null}
      </button>

      {panelOpen ? (
        <div className="meeting-notifications__panel" role="dialog" aria-label="Notifications">
          <div className="meeting-notifications__mute-row">
            <strong>Mute Notification</strong>
            <label className="meeting-notifications__switch">
              <input type="checkbox" checked={soundMuted} onChange={onMuteToggle} />
              <span className="meeting-notifications__switch-rail">
                <span className="meeting-notifications__switch-slider" />
              </span>
            </label>
          </div>
          <ul className="meeting-notifications__list">
            {items.length === 0 ? (
              <li>
                <p className="meeting-notifications__empty">No notifications yet</p>
              </li>
            ) : (
              items.map((item) => (
                <li key={item.id} className="meeting-notifications__item">
                  <UserAvatar
                    name={item.userName}
                    imageUrl={item.avatarUrl}
                    size="md"
                    className="meeting-notifications__avatar"
                  />
                  <div className="meeting-notifications__body">
                    <p className="meeting-notifications__message">{item.message}</p>
                    <p className="meeting-notifications__time">{formatNotificationTimestamp(item.createdAt)}</p>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      ) : null}
    </div>
  )
}
