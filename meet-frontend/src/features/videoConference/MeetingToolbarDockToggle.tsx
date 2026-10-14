import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { IconCollapseToolbars, IconExpandToolbars } from './MeetingIcons'
import { selectToolbarsVisible, toggleToolbarsVisible } from './videoConferenceSlice'
import './meetingToolbarDock.css'

type MeetingToolbarDockToggleProps = {
  placement: 'inline' | 'floating'
}

export function MeetingToolbarDockToggle({ placement }: MeetingToolbarDockToggleProps) {
  const dispatch = useAppDispatch()
  const toolbarsVisible = useAppSelector(selectToolbarsVisible)

  if (placement === 'inline' && !toolbarsVisible) return null
  if (placement === 'floating' && toolbarsVisible) return null

  const label = toolbarsVisible ? 'Hide toolbars' : 'Show toolbars'

  if (placement === 'floating') {
    return (
      <button
        type="button"
        className="meeting-toolbar-restore meeting-tooltip meeting-tooltip--bottom"
        data-tooltip={label}
        aria-label={label}
        aria-pressed={!toolbarsVisible}
        onClick={() => dispatch(toggleToolbarsVisible())}
      >
        <IconExpandToolbars size={18} />
        <span className="meeting-toolbar-restore__label">Show toolbars</span>
      </button>
    )
  }

  return (
    <button
      type="button"
      className="dock-btn meeting-tooltip meeting-tooltip--top meeting-toolbar-dock-btn"
      data-tooltip={label}
      aria-label={label}
      aria-pressed={toolbarsVisible}
      onClick={() => dispatch(toggleToolbarsVisible())}
    >
      <IconCollapseToolbars />
    </button>
  )
}
