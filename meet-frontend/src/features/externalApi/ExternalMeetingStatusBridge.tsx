import { useExternalMeetingStatusSync } from '../externalApi/useExternalMeetingAuth'
import { useMeetingEffectiveElapsedSeconds } from '../meeting/useMeetingElapsedLabel'

/** Bridges internal meeting timer to external PUT /meetingRoom status sync. */
export function ExternalMeetingStatusBridge() {
  const effectiveElapsedSec = useMeetingEffectiveElapsedSeconds()
  useExternalMeetingStatusSync(effectiveElapsedSec)
  return null
}
