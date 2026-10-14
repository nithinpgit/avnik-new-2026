import { useEffect, useState } from 'react'
import { useAppSelector } from '../../app/hooks'
import { selectMeetingLifecycle } from './meetingLifecycleSlice'

export function useMeetingElapsedSeconds(): number {
  const { status, startedAt, pausedAt } = useAppSelector(selectMeetingLifecycle)
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    if (status === 'ended') {
      if (startedAt && pausedAt) {
        const startedMs = Date.parse(startedAt)
        const endMs = Date.parse(pausedAt)
        if (!Number.isNaN(startedMs) && !Number.isNaN(endMs)) {
          setSeconds(Math.max(0, Math.floor((endMs - startedMs) / 1000)))
        }
      }
      return
    }

    if (status === 'paused' && startedAt && pausedAt) {
      const startedMs = Date.parse(startedAt)
      const pausedMs = Date.parse(pausedAt)
      if (!Number.isNaN(startedMs) && !Number.isNaN(pausedMs)) {
        setSeconds(Math.max(0, Math.floor((pausedMs - startedMs) / 1000)))
      }
      return
    }

    if (status !== 'started' || !startedAt) {
      setSeconds(0)
      return
    }

    const startedMs = Date.parse(startedAt)
    if (Number.isNaN(startedMs)) {
      setSeconds(0)
      return
    }

    const tick = () => setSeconds(Math.max(0, Math.floor((Date.now() - startedMs) / 1000)))
    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [status, startedAt, pausedAt])

  return seconds
}

export function formatSecondsHms(totalSec: number): string {
  const h = Math.floor(totalSec / 3600)
  const m = Math.floor((totalSec % 3600) / 60)
  const s = totalSec % 60
  return [h, m, s].map((n) => String(n).padStart(2, '0')).join(':')
}

export function formatRemainingSeconds(totalSec: number, elapsedSec: number): string {
  return formatSecondsHms(Math.max(0, totalSec - elapsedSec))
}
