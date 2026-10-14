import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { pushToast } from '../documents/notificationsSlice'
import { selectMeetingDevMode, selectMeetingSlotId } from '../meetingSession/meetingSessionSlice'
import { IconClose } from './MeetingIcons'
import { buildMeetingInviteLink } from './buildMeetingInviteLink'
import './inviteUserModal.css'

type InviteUserModalProps = {
  open: boolean
  onClose: () => void
}

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    const input = document.createElement('textarea')
    input.value = text
    input.setAttribute('readonly', '')
    input.style.position = 'fixed'
    input.style.left = '-9999px'
    document.body.appendChild(input)
    input.select()
    const ok = document.execCommand('copy')
    document.body.removeChild(input)
    return ok
  }
}

export function InviteUserModal({ open, onClose }: InviteUserModalProps) {
  const dispatch = useAppDispatch()
  const slotId = useAppSelector(selectMeetingSlotId)
  const devMode = useAppSelector(selectMeetingDevMode)
  const inviteLink = useMemo(() => (slotId ? buildMeetingInviteLink(slotId, devMode) : ''), [slotId, devMode])
  const inputRef = useRef<HTMLInputElement>(null)
  const [copyLabel, setCopyLabel] = useState('Copy URL')
  const [inviteEmail, setInviteEmail] = useState('')

  useEffect(() => {
    if (!open) {
      setCopyLabel('Copy URL')
      setInviteEmail('')
    }
  }, [open])

  useEffect(() => {
    if (copyLabel !== 'Copy URL') {
      const id = window.setTimeout(() => setCopyLabel('Copy URL'), 5000)
      return () => window.clearTimeout(id)
    }
  }, [copyLabel])

  const handleCopyUrl = async () => {
    if (!inviteLink) return
    const ok = await copyText(inviteLink)
    if (ok) {
      setCopyLabel('Link copied')
      inputRef.current?.select()
      return
    }
    dispatch(pushToast({ message: 'Could not copy link.', variant: 'error' }))
  }

  const handleSendEmail = () => {
    const email = inviteEmail.trim()
    if (!email) {
      dispatch(pushToast({ message: 'Enter an email address.', variant: 'error' }))
      return
    }
    dispatch(pushToast({ message: 'Email invite is not available yet.', variant: 'info' }))
  }

  if (!open) return null

  return createPortal(
    <div className="invite-user-overlay" role="presentation" onClick={onClose}>
      <div
        className="invite-user-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="invite-user-link-title"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="invite-user-modal__header">
          <button type="button" className="invite-user-modal__close" aria-label="Close" onClick={onClose}>
            <IconClose />
          </button>
        </header>
        <div className="invite-user-modal__body">
          <div className="invite-user-content">
            <section className="invite-user-section invite-user-section--link" aria-labelledby="invite-user-link-title">
              <h2 id="invite-user-link-title">
                <span className="invite-user-section__label" aria-hidden>
                  1
                </span>
                Copy meeting link
              </h2>
              <div className="form-group form_content_section">
                <input
                  ref={inputRef}
                  id="inviteLink"
                  type="text"
                  readOnly
                  className="form-control"
                  value={inviteLink}
                  aria-label="Meeting room link"
                />
                <button type="button" className="invite-action-btn" onClick={() => void handleCopyUrl()}>
                  {copyLabel}
                </button>
              </div>
            </section>
            <section className="invite-user-section invite-user-section--email" aria-labelledby="invite-user-email-title">
              <h2 id="invite-user-email-title">
                <span className="invite-user-section__label" aria-hidden>
                  2
                </span>
                Invite via email
              </h2>
              <div className="form-group">
                <input
                  type="email"
                  className="form-control"
                  placeholder="gmailname@1542.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSendEmail()
                  }}
                />
                <button type="button" className="invite-action-btn" onClick={handleSendEmail}>
                  Send
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}
