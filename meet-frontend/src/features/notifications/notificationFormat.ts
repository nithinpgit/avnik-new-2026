import { getUserInitials } from '../../components/userAvatar'

/** @deprecated Use getUserInitials from components/userAvatar */
export const notificationInitials = getUserInitials

export function formatNotificationTimestamp(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  return d
    .toLocaleString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    })
    .replace(',', '')
}

export function participantDisplayLabel(name: string, role: 'host' | 'participant'): string {
  return role === 'host' ? `${name}(host)` : name
}
