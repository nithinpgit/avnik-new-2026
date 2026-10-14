import { useAppSelector } from '../../app/hooks'
import { isMeetRecordPath } from '../../app/paths'
import { selectIsRecorderMode } from '../meetingSession/meetingSessionSlice'

/** True on `/join/record` before and after Redux session init (avoids UI flash). */
export function useRecorderUiActive(): boolean {
  const isRecorderMode = useAppSelector(selectIsRecorderMode)
  if (isRecorderMode) return true
  if (typeof window === 'undefined') return false
  return isMeetRecordPath()
}
