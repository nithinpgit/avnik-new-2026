import { useAppSelector } from '../../app/hooks'
import {
  selectExternalInitialDurationSec,
  selectExternalTotalDurationSec,
} from '../externalApi/externalMeetingSlice'
import { formatRemainingSeconds, useMeetingElapsedSeconds } from './useMeetingElapsedSeconds'

/** Extend / end-or-extend UI is only allowed in the last minute. */
export const EXTEND_REMAINING_THRESHOLD_SEC = 60

/**
 * Effective meeting elapsed for countdown / Laravel currentDuration.
 * Use max(session, initial) — never sum — so API seed and lifecycle clock
 * do not double-count (matches avnik_old meetingTime behavior).
 */
export function useMeetingEffectiveElapsedSeconds(): number {
  const initialDurationSec = useAppSelector(selectExternalInitialDurationSec)
  const sessionElapsedSec = useMeetingElapsedSeconds()
  return Math.max(sessionElapsedSec, initialDurationSec)
}

/** Remaining session seconds (totalDuration − currentDuration). */
export function useMeetingRemainingSeconds(): number {
  const totalDurationSec = useAppSelector(selectExternalTotalDurationSec)
  const effectiveElapsedSec = useMeetingEffectiveElapsedSeconds()
  return Math.max(0, totalDurationSec - effectiveElapsedSec)
}

/** Countdown timer (remaining session time); frozen while paused or ended. */
export function useMeetingElapsedLabel(): string {
  const totalDurationSec = useAppSelector(selectExternalTotalDurationSec)
  const effectiveElapsedSec = useMeetingEffectiveElapsedSeconds()

  return formatRemainingSeconds(totalDurationSec, effectiveElapsedSec)
}
