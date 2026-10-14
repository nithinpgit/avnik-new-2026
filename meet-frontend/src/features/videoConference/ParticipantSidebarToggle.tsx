import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { IconChevronLeft, IconChevronRight } from './MeetingIcons'
import {
  selectParticipantSidebarOpen,
  toggleParticipantSidebar,
} from './videoConferenceSlice'

export function ParticipantSidebarToggle() {
  const dispatch = useAppDispatch()
  const sidebarOpen = useAppSelector(selectParticipantSidebarOpen)

  const label = sidebarOpen ? 'Hide participants panel' : 'Show participants panel'

  return (
    <button
      type="button"
      className={`participant-sidebar-toggle meeting-tooltip meeting-tooltip--top${sidebarOpen ? ' participant-sidebar-toggle--open' : ' participant-sidebar-toggle--closed'}`}
      data-tooltip={label}
      aria-label={label}
      aria-expanded={sidebarOpen}
      aria-controls="video-sidebar"
      onClick={() => dispatch(toggleParticipantSidebar())}
    >
      <span className="participant-sidebar-toggle__icon" aria-hidden>
        {sidebarOpen ? <IconChevronRight size={14} /> : <IconChevronLeft size={14} />}
      </span>
    </button>
  )
}
