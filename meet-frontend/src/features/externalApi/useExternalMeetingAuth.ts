import { useCallback, useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectIsMeetingLive, selectMeetingStatus } from '../meeting/meetingLifecycleSlice'
import { useIsMeetingHost } from '../meeting/useIsMeetingHost'
import {
  selectMeetingDevMode,
  selectIsRecorderMode,
  selectMeetingSlotId,
  selectMeetingUserId,
  setMeetingSession,
  type MeetingRole,
} from '../meetingSession/meetingSessionSlice'
import {
  authenticateMeetingRoom,
  ExternalApiError,
  loadExternalSession,
  redirectToLogin,
  updateMeetingRoomStatus,
} from './index'
import {
  externalAuthDevBypass,
  externalAuthFailed,
  externalAuthStarted,
  externalAuthSucceeded,
} from './externalMeetingSlice'
import type { ExternalMeetingMode } from './types'

const STATUS_SYNC_INTERVAL_MS = 15_000

function mapExternalModeToRole(mode: ExternalMeetingMode | undefined, devMode: boolean, urlMode: string | null): MeetingRole {
  if (devMode && urlMode === 'presenter') return 'host'
  if (mode === 'presenter') return 'host'
  return 'participant'
}

function generateGuestUserId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }
  return `guest-${Math.random().toString(36).slice(2, 10)}`
}

function mapLifecycleToExternalStatus(status: string): 'started' | 'paused' | 'Ended' {
  if (status === 'started') return 'started'
  if (status === 'paused') return 'paused'
  return 'Ended'
}

/** Syncs elapsed meeting time + status to external PUT /meetingRoom (host only). */
export function useExternalMeetingStatusSync(elapsedSec: number) {
  const slotId = useAppSelector(selectMeetingSlotId)
  const userId = useAppSelector(selectMeetingUserId)
  const isHost = useIsMeetingHost()
  const meetingStatus = useAppSelector(selectMeetingStatus)
  const meetingLive = useAppSelector(selectIsMeetingLive)
  const devMode = useAppSelector(selectMeetingDevMode)

  const pushStatus = useCallback(async () => {
    if (!slotId || !userId || !isHost || devMode) return
    try {
      await updateMeetingRoomStatus({
        roomId: slotId,
        userId,
        currentDuration: elapsedSec,
        currentStatus: mapLifecycleToExternalStatus(meetingStatus),
      })
    } catch {
      /* non-blocking — internal lifecycle remains source of truth */
    }
  }, [slotId, userId, isHost, devMode, elapsedSec, meetingStatus])

  useEffect(() => {
    if (!isHost || devMode) return
    if (meetingStatus === 'started' || meetingStatus === 'paused' || meetingStatus === 'ended') {
      void pushStatus()
    }
  }, [meetingStatus, isHost, devMode, pushStatus])

  useEffect(() => {
    if (!isHost || !meetingLive || devMode) return
    const id = window.setInterval(() => {
      void pushStatus()
    }, STATUS_SYNC_INTERVAL_MS)
    return () => window.clearInterval(id)
  }, [isHost, meetingLive, devMode, pushStatus])
}

/**
 * Authenticates against the external Laravel API (POST /meetingRoom).
 * Updates meeting session with meetingRoomId and event metadata.
 */
export function useExternalMeetingAuth() {
  const dispatch = useAppDispatch()
  const slotId = useAppSelector(selectMeetingSlotId)
  const sessionUserId = useAppSelector(selectMeetingUserId)
  const devMode = useAppSelector(selectMeetingDevMode)
  const isRecorderMode = useAppSelector(selectIsRecorderMode)
  const urlMode = useAppSelector((s) => s.meetingSession.urlMode)
  const authStartedRef = useRef(false)

  const runAuth = useCallback(async () => {
    if (!slotId || authStartedRef.current || isRecorderMode) return
    authStartedRef.current = true

    const params = new URLSearchParams(window.location.search)
    const urlName = params.get('name')?.trim() || null

    let effectiveUserId = sessionUserId
    let effectiveName = urlName

    if (!devMode) {
      const { user, accessToken } = loadExternalSession()
      if (!user || !accessToken) {
        redirectToLogin()
        return
      }
      effectiveUserId = String(user.id)
      effectiveName = user.name
      dispatch(
        setMeetingSession({
          userId: effectiveUserId,
          displayName: user.name,
          profileImage: user.profile?.profile_picture ?? null,
        }),
      )
    } else {
      if (!effectiveUserId || effectiveUserId.startsWith('guest-')) {
        effectiveUserId = generateGuestUserId()
      }
      if (!effectiveName) {
        effectiveName =
          urlMode === 'viewer' ? `User ${Math.random().toString(36).slice(2, 6)}` : 'Dev User'
      }
      dispatch(
        setMeetingSession({
          userId: effectiveUserId,
          displayName: effectiveName,
          role: urlMode === 'presenter' ? 'host' : 'participant',
        }),
      )
    }

    dispatch(externalAuthStarted())

    try {
      const res = await authenticateMeetingRoom({ roomId: slotId, userId: effectiveUserId! })
      if (res.status !== 200 || !res.data?.meetingRoomId) {
        throw new ExternalApiError(res.message ?? 'Authentication failed', res.status, res)
      }

      dispatch(externalAuthSucceeded(res.data))

      const externalMode: ExternalMeetingMode = res.data.mode === 'presenter' ? 'presenter' : 'viewer'
      const role = mapExternalModeToRole(externalMode, devMode, urlMode)

      dispatch(
        setMeetingSession({
          roomId: res.data.meetingRoomId,
          role: devMode && urlMode === 'presenter' ? 'host' : role,
          displayName: effectiveName || undefined,
        }),
      )
    } catch (err) {
      if (devMode) {
        const devModeRole: ExternalMeetingMode = urlMode === 'presenter' ? 'presenter' : 'viewer'
        dispatch(externalAuthDevBypass(devModeRole))
        dispatch(
          setMeetingSession({
            roomId: slotId,
            role: urlMode === 'presenter' ? 'host' : 'participant',
          }),
        )
        return
      }
      const message = err instanceof ExternalApiError ? err.message : 'Unable to authenticate for this meeting'
      dispatch(externalAuthFailed(message))
    }
  }, [dispatch, slotId, sessionUserId, devMode, urlMode, isRecorderMode])

  useEffect(() => {
    if (!slotId || isRecorderMode) return
    void runAuth()
  }, [slotId, isRecorderMode, runAuth])

  return { retryAuth: () => {
    authStartedRef.current = false
    void runAuth()
  } }
}
