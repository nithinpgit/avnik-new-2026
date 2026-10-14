import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectExternalQuickMeet } from './externalMeetingSlice'
import {
  closeFiveMinuteNotice,
  selectExtendFiveMinuteNoticeOpen,
} from './extendDurationSlice'
import './externalModals.css'
import './extendDuration.css'

export function ExtendFiveMinuteNoticeModal() {
  const dispatch = useAppDispatch()
  const quickMeet = useAppSelector(selectExternalQuickMeet)
  const open = useAppSelector(selectExtendFiveMinuteNoticeOpen)

  if (quickMeet || !open) return null

  return (
    <div className="external-modal-backdrop" role="dialog" aria-modal aria-labelledby="extend-5min-title">
      <div className="external-modal extend-modal extend-modal--wide">
        <h2 id="extend-5min-title">Only 5 minutes left</h2>
        <p className="extend-modal__lead">
          This session will end soon. You can extend the duration just before time runs out using the{' '}
          <strong>+</strong> button next to the timer.
        </p>
        <p className="extend-modal__lead">
          If you charge participants for the extension, only those who pay can continue after you resume.
          Unpaid participants will be removed from the session.
        </p>
        <div className="external-modal__actions">
          <button
            type="button"
            className="external-modal__btn"
            onClick={() => dispatch(closeFiveMinuteNotice())}
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  )
}
