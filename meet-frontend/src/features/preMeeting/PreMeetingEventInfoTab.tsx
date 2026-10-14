import { useAppSelector } from '../../app/hooks'
import { resolveExternalFileAssetUrl } from '../externalApi/config'
import {
  selectExternalAmountDue,
  selectExternalEvent,
  selectExternalPaymentRequired,
  selectExternalTotalDurationSec,
} from '../externalApi/externalMeetingSlice'
import { formatRemainingSeconds } from '../meeting/useMeetingElapsedSeconds'
import { useMeetingEffectiveElapsedSeconds } from '../meeting/useMeetingElapsedLabel'

function formatEventDateTime(startDateTime?: string, startDate?: string, startTime?: string): string {
  if (startDateTime) {
    const d = new Date(startDateTime.replace(' ', 'T'))
    if (!Number.isNaN(d.getTime())) {
      return d.toLocaleString(undefined, {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
      })
    }
  }
  if (startDate && startTime) {
    return `${startDate} @ ${startTime}`
  }
  return '—'
}

function formatCost(cost: unknown): string {
  const n = parseFloat(String(cost ?? 0))
  if (!Number.isFinite(n) || n <= 0) return 'Free'
  return `$${n}`
}

export function PreMeetingEventInfoTab() {
  const event = useAppSelector(selectExternalEvent)
  const paymentRequired = useAppSelector(selectExternalPaymentRequired)
  const amountDue = useAppSelector(selectExternalAmountDue)
  const totalDurationSec = useAppSelector(selectExternalTotalDurationSec)
  const effectiveElapsedSec = useMeetingEffectiveElapsedSeconds()

  if (!event) {
    return (
      <div className="host-info-content">
        <p className="pre-meeting-event__empty">Event details will appear after authentication.</p>
      </div>
    )
  }

  const slot = event.eventTimeSlot
  const host = event.eventCreatedUser
  const rawEventImage = event.eventImages?.[0]?.fileUrl
  const eventImage = rawEventImage
    ? resolveExternalFileAssetUrl(rawEventImage)
    : '/vendor/pre-meeting/event-12.jpg'
  const rawHostImage =
    host?.profile?.social_profile_picture_url || host?.profile?.profile_picture || null
  const hostImage = rawHostImage
    ? /^https?:\/\//i.test(rawHostImage)
      ? rawHostImage
      : resolveExternalFileAssetUrl(rawHostImage)
    : '/vendor/pre-meeting/user-1.jpg'
  const totalSeats = slot?.totalSeats ?? '—'
  const seatsLeft =
    slot?.totalSeats != null && slot?.bookedSeats != null
      ? Math.max(0, parseInt(String(slot.totalSeats), 10) - parseInt(String(slot.bookedSeats), 10))
      : '—'
  const durationLabel = slot?.duration ? `${slot.duration} hrs` : event.duration ? String(event.duration) : '—'
  const remainingLabel = formatRemainingSeconds(totalDurationSec, effectiveElapsedSec)

  return (
    <div className="host-info-content">
      <div className="host-details-bx">
        <div className="pre-meeting-event__row">
          <div className="pre-meeting-event__col">
            <div className="event-lft-sec">
              <div className="e-info-lft-img">
                <figure className="event-lft-img">
                  <img src={eventImage} alt={event.eventTitle ?? 'Event'} />
                </figure>
              </div>
              <div className="h-i-profile">
                <a href="#profile" onClick={(e) => e.preventDefault()}>
                  <figure className="cmn-profile-pic">
                    <img src={hostImage} alt={host?.name ?? 'Host'} />
                  </figure>
                  <span>{host?.name ?? 'Host'}</span>
                  <p>
                    <i className="mr-star-rating-icon" aria-hidden />
                    <span>{host?.avgRating ?? '—'}</span>
                  </p>
                </a>
              </div>
            </div>
          </div>
          <div className="pre-meeting-event__col">
            <div className="event-right-content">
              <div className="meeting-short-info">
                <div className="meeting-time-date-bx">
                  <span>{formatEventDateTime(slot?.startDateTime, slot?.startDate, slot?.startTime)}</span>
                </div>
                <div className="meeting-space">
                  <h3>{event.eventTitle ?? 'Meeting Specs'}</h3>
                  <div className="m-s-info">
                    <ul className="cmn-ul-list metting_section">
                      <li>
                        <span className="m-s-title">Seats</span>
                        <div className="m-s-content">
                          <i className="mr-seats-icon" aria-hidden />
                          <span>
                            {seatsLeft} / {totalSeats} Seats Left
                          </span>
                        </div>
                      </li>
                      <li>
                        <span className="m-s-title">Duration</span>
                        <div className="m-s-content">
                          <i className="mr-user-chat-icon" aria-hidden />
                          <span>{durationLabel}</span>
                        </div>
                      </li>
                      <li>
                        <span className="m-s-title">Cost</span>
                        <div className="m-s-content cost-m-s">
                          <i className="mr-event-cost-icon" aria-hidden />
                          <span>{formatCost(slot?.cost ?? event.cost)}</span>
                        </div>
                      </li>
                      <li>
                        <span className="m-s-title">Type</span>
                        <div className="m-s-content">
                          <div className="event-type-icon">
                            <i className="mr-webinar1-icon e-icon-none e-icon-active" aria-hidden />
                          </div>
                          <span>{event.eventType ?? 'Meeting'}</span>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="meeting-timer-status">
                    <div className="m-t-s">
                      <span>Remaining Time — </span>
                      <strong className="timer-bx">{remainingLabel}</strong>
                    </div>
                  </div>
                  {paymentRequired && amountDue > 0 ? (
                    <p className="pre-meeting-event__payment-note" role="status">
                      Payment required ({formatCost(amountDue)}) before you can enter this session.
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="description-bx">
          <div className="h-evnt-d">
            <strong>Description</strong>
            <div className="category-rit-bx">
              <span>Category : </span>
              <p>
                {event.eventCategory ?? '—'}
                {event.eventSubCategory ? ` / ${event.eventSubCategory}` : ''}
              </p>
            </div>
            <p className="settings-dec">{event.eventDescription ?? ''}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
