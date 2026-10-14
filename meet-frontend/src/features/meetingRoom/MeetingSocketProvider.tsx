import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { io, type Socket } from 'socket.io-client'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { store } from '../../app/store'
import { fetchMeetingLifecycle } from '../meeting/meetingLifecycleApi'
import {
  resetMeetingLifecycle,
  setMeetingLifecycle,
} from '../meeting/meetingLifecycleSlice'
import {
  MEETING_LIFECYCLE_CHANNEL,
  parseMeetingLifecycle,
} from '../meeting/meetingLifecycleTypes'
import {
  selectMeetingDisplayName,
  selectMeetingProfileImage,
  selectMeetingRole,
  selectMeetingRoomId,
  selectMeetingUserId,
  setMeetingSession,
  type MeetingRole,
} from '../meetingSession/meetingSessionSlice'
import {
  closePreMeetingModal,
  openPreMeetingForAdmissionWait,
  selectPreMeetingEntryCompleted,
} from '../preMeeting/preMeetingSlice'
import {
  WAITING_ROOM_CHANNEL,
  parseWaitingRoomPayload,
} from '../waitingRoom/waitingRoomTypes'
import {
  dequeueJoinRequest,
  enqueueJoinRequest,
  resetWaitingRoom,
  setAdmissionAdmitted,
  setAdmissionDenied,
  setAdmissionPending,
  setAutoAcceptAll,
  setJoinBlocked,
} from '../waitingRoom/waitingRoomSlice'
import { resetDocuments } from '../documents/documentsSlice'
import { resetVideoShare } from '../videoShare/videoShareSlice'
import {
  applyParticipantModerationRaw,
  resetParticipantModeration,
} from '../participantControls/participantModerationSlice'
import { PARTICIPANT_MODERATION_CHANNEL } from '../participantControls/participantModerationTypes'
import { pushToast } from '../documents/notificationsSlice'
import { participantDisplayLabel } from '../notifications/notificationFormat'
import {
  pushMeetingNotification,
  resetMeetingNotifications,
} from '../notifications/meetingNotificationsSlice'
import { applyRoomSyncBulk, applyRoomSyncPatch, resetRoomSync } from '../roomSync/roomSyncSlice'
import {
  applyRoomSnapshot,
  removeParticipant,
  upsertParticipant,
} from '../videoConference/videoConferenceSlice'
import { isRecorderPeer } from '../recording/recorderPeer'
import { beginPostMeetingReview, setPostMeetingRedirectUrl, selectSessionLeftForReview } from '../externalApi/externalModalsSlice'
import { completePostMeetingRedirect } from '../externalApi/postMeetingFlow'
import { stopLocalSessionMedia } from '../externalApi/stopLocalSessionMedia'
import { selectExternalMeetingMode, selectExternalQuickMeet } from '../externalApi/externalMeetingSlice'
import { resetPrivateMeeting } from '../privateMeeting/privateMeetingSlice'

export type MeetingSocketContextValue = {
  socket: Socket | null
  /** True after first `room_snapshot` for this Socket.IO session (SFU can join). */
  presenceJoined: boolean
  /** Emit a persisted room document update (same contract for whiteboard and future channels). */
  emitRoomSync: (channel: string, payload: unknown) => void
  /** Relay ephemeral private-meeting handshake to room peers. */
  emitPrivateMeetingSignal: (payload: {
    method: 'requestPvMeeting' | 'rejectPvMeeting' | 'acceptPvMeeting' | 'stopPvMeeting'
    receiverId: string
    senderId: string
    senderName: string
  }) => void
  /** Host-only: persist and broadcast meeting start (also resumes from paused). */
  startMeeting: () => void
  /** Host-only: persist and broadcast meeting pause. */
  pauseMeeting: () => void
  /** Host-only: end meeting for everyone and redirect participants. */
  endMeeting: () => void
}

const MeetingSocketContext = createContext<MeetingSocketContextValue | null>(null)

export function useMeetingSocket(): MeetingSocketContextValue {
  const ctx = useContext(MeetingSocketContext)
  if (!ctx) {
    throw new Error('useMeetingSocket must be used within MeetingSocketProvider')
  }
  return ctx
}

/**
 * Owns the Socket.IO client for the meeting: peers, and centralized room_sync / room_sync_bulk.
 */
export function MeetingSocketProvider({
  children,
  recorderMode = false,
}: {
  children: ReactNode
  recorderMode?: boolean
}) {
  const dispatch = useAppDispatch()
  const entryCompleted = useAppSelector(selectPreMeetingEntryCompleted)
  const sessionLeftForReview = useAppSelector(selectSessionLeftForReview)
  const roomId = useAppSelector(selectMeetingRoomId)
  const userId = useAppSelector(selectMeetingUserId)
  const displayName = useAppSelector(selectMeetingDisplayName)
  const role = useAppSelector(selectMeetingRole)
  const profileImage = useAppSelector(selectMeetingProfileImage)

  const [socket, setSocket] = useState<Socket | null>(null)
  const [presenceJoined, setPresenceJoined] = useState(false)
  const socketRef = useRef<Socket | null>(null)

  const emitRoomSync = useCallback(
    (channel: string, payload: unknown) => {
      const s = socketRef.current
      const rid = store.getState().meetingSession.roomId
      if (!s?.connected || !rid) return
      dispatch(applyRoomSyncPatch({ channel, payload }))
      s.emit('room_sync', { roomId: rid, channel, payload })
    },
    [dispatch],
  )

  const emitPrivateMeetingSignal = useCallback(
    (payload: {
      method: 'requestPvMeeting' | 'rejectPvMeeting' | 'acceptPvMeeting' | 'stopPvMeeting'
      receiverId: string
      senderId: string
      senderName: string
    }) => {
      const s = socketRef.current
      const rid = store.getState().meetingSession.roomId
      if (!s?.connected || !rid) return
      s.emit('private_meeting_signal', { roomId: rid, ...payload })
    },
    [],
  )

  const startMeeting = useCallback(() => {
    const s = socketRef.current
    const rid = store.getState().meetingSession.roomId
    if (!s?.connected || !rid) return
    s.emit('start_meeting', { roomId: rid })
  }, [])

  const pauseMeeting = useCallback(() => {
    const s = socketRef.current
    const rid = store.getState().meetingSession.roomId
    if (!s?.connected || !rid) return
    s.emit('pause_meeting', { roomId: rid })
  }, [])

  const endMeeting = useCallback(() => {
    const s = socketRef.current
    const rid = store.getState().meetingSession.roomId
    if (!s?.connected || !rid) return
    s.emit('end_meeting', { roomId: rid })
  }, [])

  useEffect(() => {
    if (!entryCompleted || !roomId) return
    let cancelled = false
    void fetchMeetingLifecycle(roomId)
      .then((meeting) => {
        if (!cancelled) {
          const current = store.getState().meetingLifecycle
          // Socket snapshot can arrive before REST; never downgrade a live meeting from stale fetch.
          if (
            current.hydrated &&
            current.status === 'started' &&
            meeting.status !== 'started'
          ) {
            console.warn('[lifecycle] ignoring stale REST lifecycle', meeting.status)
            return
          }
          dispatch(setMeetingLifecycle(meeting))
        }
      })
      .catch((e) => {
        console.warn('meeting lifecycle fetch failed', e)
      })
    return () => {
      cancelled = true
    }
  }, [entryCompleted, roomId, dispatch])

  useEffect(() => {
    if (!entryCompleted || !roomId || !userId) {
      return
    }

    const socketOptions = {
      path: '/socket.io',
      transports: ['websocket', 'polling'] as ('websocket' | 'polling')[],
      autoConnect: true,
      withCredentials: true,
    }
    const client = io(socketOptions);
    socketRef.current = client
    setSocket(client)
    setPresenceJoined(false)

    const onSnapshot = (payload: { roomId: string; peers: PeerDto[]; meeting?: unknown }) => {
      dispatch(applyRoomSnapshot({ peers: payload.peers.map((p) => mapPeer(p)) }))
      if (payload.meeting !== undefined) {
        dispatch(setMeetingLifecycle(parseMeetingLifecycle(payload.meeting)))
      }
      dispatch(setAdmissionAdmitted())
      dispatch(closePreMeetingModal())
      setPresenceJoined(true)
    }

    const onMeetingLifecycle = (payload: { meeting?: unknown }) => {
      if (payload.meeting !== undefined) {
        dispatch(setMeetingLifecycle(parseMeetingLifecycle(payload.meeting)))
      }
    }

    const onMeetingError = (payload: { message?: string }) => {
      console.error('meeting_error', payload)
    }

    const onRoleUpdated = (payload: { userId: string; role: MeetingRole }) => {
      if (payload.userId === userId) {
        dispatch(setMeetingSession({ role: payload.role }))
      }
      const self = store.getState().videoConference.participants.find((p) => p.id === payload.userId)
      if (self) {
        dispatch(upsertParticipant({ ...self, role: payload.role }))
      }
    }

    const onPeerJoined = (payload: { peer: PeerDto }) => {
      if (isRecorderPeer(payload.peer.userId)) return
      dispatch(upsertParticipant(mapPeer(payload.peer)))
      if (payload.peer.userId !== userId) {
        const label = participantDisplayLabel(payload.peer.name, payload.peer.role)
        dispatch(
          pushMeetingNotification({
            userName: payload.peer.name,
            message: `${label} has joined the session`,
            avatarUrl: payload.peer.profileImage,
          }),
        )
      }
    }

    const onPeerLeft = (payload: { userId: string }) => {
      if (isRecorderPeer(payload.userId)) {
        dispatch(removeParticipant(payload.userId))
        return
      }
      const peer = store.getState().videoConference.participants.find((p) => p.id === payload.userId)
      const name = peer?.name ?? 'Someone'
      dispatch(removeParticipant(payload.userId))
      if (payload.userId !== userId) {
        dispatch(
          pushMeetingNotification({
            userName: name,
            message: `${name} has left the session`,
            avatarUrl: peer?.profileImage,
          }),
        )
      }
    }

    const onJoinError = (payload: { message?: string; code?: string }) => {
      if (recorderMode) {
        console.error('[recorder] join_error', payload)
        return
      }
      if (payload.code === 'blocked') {
        dispatch(
          setJoinBlocked({
            message: payload.message ?? 'You are blocked for this room please contact host',
          }),
        )
        dispatch(openPreMeetingForAdmissionWait())
        return
      }
      console.error('join_error', payload)
    }

    const onAdmissionPending = (payload: { message?: string }) => {
      dispatch(
        setAdmissionPending({
          message: payload.message ?? 'Please wait for the host to accept you in the meeting room',
        }),
      )
      dispatch(openPreMeetingForAdmissionWait())
    }

    const onAdmissionGranted = () => {
      dispatch(setAdmissionAdmitted())
    }

    const onAdmissionDenied = (payload: { message?: string; blocked?: boolean }) => {
      dispatch(
        setAdmissionDenied({
          message: payload.message ?? 'The host has denied you access to the meeting room',
          blocked: payload.blocked,
        }),
      )
      dispatch(openPreMeetingForAdmissionWait())
      window.setTimeout(() => {
        window.location.assign('/')
      }, 2500)
    }

    const onJoinRequest = (payload: { userId: string; name: string; profileImage?: string | null }) => {
      if (!payload.userId) return
      dispatch(
        enqueueJoinRequest({
          userId: payload.userId,
          name: payload.name,
          profileImage: payload.profileImage ?? null,
        }),
      )
    }

    const onAdmissionActionOk = (payload: { targetUserId?: string }) => {
      if (payload.targetUserId) {
        dispatch(dequeueJoinRequest(payload.targetUserId))
      }
    }

    const onRoomSyncBulk = (payload: { states: Record<string, unknown> }) => {
      const states = payload.states ?? {}
      dispatch(applyRoomSyncBulk({ states }))
      if (states[MEETING_LIFECYCLE_CHANNEL] !== undefined) {
        dispatch(setMeetingLifecycle(parseMeetingLifecycle(states[MEETING_LIFECYCLE_CHANNEL])))
      }
      if (states[PARTICIPANT_MODERATION_CHANNEL] !== undefined) {
        dispatch(applyParticipantModerationRaw(states[PARTICIPANT_MODERATION_CHANNEL]))
      }
      if (states[WAITING_ROOM_CHANNEL] !== undefined) {
        dispatch(setAutoAcceptAll(parseWaitingRoomPayload(states[WAITING_ROOM_CHANNEL]).autoAcceptAll))
      }
    }

    const onRoomSync = (payload: { channel: string; payload: unknown }) => {
      dispatch(applyRoomSyncPatch({ channel: payload.channel, payload: payload.payload }))
      if (payload.channel === MEETING_LIFECYCLE_CHANNEL) {
        dispatch(setMeetingLifecycle(parseMeetingLifecycle(payload.payload)))
      }
      if (payload.channel === PARTICIPANT_MODERATION_CHANNEL) {
        dispatch(applyParticipantModerationRaw(payload.payload))
      }
      if (payload.channel === WAITING_ROOM_CHANNEL) {
        dispatch(setAutoAcceptAll(parseWaitingRoomPayload(payload.payload).autoAcceptAll))
      }
    }

    const onRoomSyncError = (payload: { message?: string }) => {
      console.error('room_sync_error', payload)
    }

    const onParticipantControlError = (payload: { message?: string }) => {
      dispatch(
        pushToast({
          message: payload.message ?? 'Could not control participant',
          variant: 'error',
        }),
      )
    }

    const onPresenterPowerChanged = (payload: { isPresenter?: boolean }) => {
      dispatch(
        pushToast({
          message: payload.isPresenter
            ? 'You can now use whiteboard and sharing tools.'
            : 'Presenter access was removed.',
          variant: payload.isPresenter ? 'success' : 'info',
          durationMs: 4500,
        }),
      )
    }

    const onParticipantMediaPolicy = (payload: { micAllowed?: boolean; camAllowed?: boolean }) => {
      if (payload.micAllowed === false) {
        dispatch(pushToast({ message: 'The host muted your microphone.', variant: 'info', durationMs: 4000 }))
      } else if (payload.micAllowed === true) {
        dispatch(pushToast({ message: 'The host unmuted your microphone.', variant: 'info', durationMs: 3000 }))
      } else if (payload.camAllowed === false) {
        dispatch(
          pushToast({
            message: 'The host disabled your camera for others. You can still see your preview.',
            variant: 'info',
            durationMs: 4500,
          }),
        )
      } else if (payload.camAllowed === true) {
        dispatch(pushToast({ message: 'The host enabled your camera.', variant: 'info', durationMs: 3000 }))
      }
    }

    const onKicked = (payload: { message?: string }) => {
      window.alert(payload.message ?? 'You were removed from the meeting.')
      window.location.assign('/')
    }

    const onMeetingEnded = (payload: { redirectUrl?: string }) => {
      if (recorderMode) return

      const redirect = payload.redirectUrl?.trim()
      if (redirect) {
        dispatch(setPostMeetingRedirectUrl(redirect))
      }

      const state = store.getState()
      if (state.externalModals.postMeetingReviewRequested) return

      const mode = selectExternalMeetingMode(state)
      const quickMeet = selectExternalQuickMeet(state)

      // Host / quickMeet: redirect now. Viewer: rating popup only — never redirect here.
      if (quickMeet || mode === 'presenter') {
        stopLocalSessionMedia(dispatch)
        completePostMeetingRedirect(redirect ?? state.externalModals.postMeetingRedirectUrl)
        return
      }

      dispatch(
        pushToast({
          message: 'The session has ended.',
          variant: 'info',
          durationMs: 4000,
        }),
      )
      stopLocalSessionMedia(dispatch)
      dispatch(beginPostMeetingReview({ redirectUrl: redirect }))
    }

    const onConnect = () => {
      client.emit('join_room', {
        roomId,
        userId,
        name: displayName,
        role,
        profileImage: profileImage ?? undefined,
      })
    }

    client.on('connect', onConnect)
    client.on('room_snapshot', onSnapshot)
    client.on('peer_joined', onPeerJoined)
    client.on('peer_left', onPeerLeft)
    client.on('join_error', onJoinError)
    client.on('admission_pending', onAdmissionPending)
    client.on('admission_granted', onAdmissionGranted)
    client.on('admission_denied', onAdmissionDenied)
    client.on('join_request', onJoinRequest)
    client.on('admission_action_ok', onAdmissionActionOk)
    client.on('room_sync_bulk', onRoomSyncBulk)
    client.on('room_sync', onRoomSync)
    client.on('room_sync_error', onRoomSyncError)
    client.on('meeting_lifecycle', onMeetingLifecycle)
    client.on('meeting_error', onMeetingError)
    client.on('role_updated', onRoleUpdated)
    client.on('participant_control_error', onParticipantControlError)
    client.on('participant_media_policy', onParticipantMediaPolicy)
    client.on('presenter_power_changed', onPresenterPowerChanged)
    client.on('kicked_from_meeting', onKicked)
    client.on('meeting_ended', onMeetingEnded)

    return () => {
      client.off('connect', onConnect)
      client.off('room_snapshot', onSnapshot)
      client.off('peer_joined', onPeerJoined)
      client.off('peer_left', onPeerLeft)
      client.off('join_error', onJoinError)
      client.off('admission_pending', onAdmissionPending)
      client.off('admission_granted', onAdmissionGranted)
      client.off('admission_denied', onAdmissionDenied)
      client.off('join_request', onJoinRequest)
      client.off('admission_action_ok', onAdmissionActionOk)
      client.off('room_sync_bulk', onRoomSyncBulk)
      client.off('room_sync', onRoomSync)
      client.off('room_sync_error', onRoomSyncError)
      client.off('meeting_lifecycle', onMeetingLifecycle)
      client.off('meeting_error', onMeetingError)
      client.off('role_updated', onRoleUpdated)
      client.off('participant_control_error', onParticipantControlError)
      client.off('participant_media_policy', onParticipantMediaPolicy)
      client.off('presenter_power_changed', onPresenterPowerChanged)
      client.off('kicked_from_meeting', onKicked)
      client.off('meeting_ended', onMeetingEnded)
      client.disconnect()
      socketRef.current = null
      setSocket(null)
      setPresenceJoined(false)
      dispatch(resetRoomSync())
      dispatch(resetDocuments())
      dispatch(resetVideoShare())
      dispatch(resetParticipantModeration())
      dispatch(resetMeetingLifecycle())
      dispatch(resetMeetingNotifications())
      dispatch(resetWaitingRoom())
      dispatch(resetPrivateMeeting())
    }
  }, [entryCompleted, roomId, userId, displayName, role, profileImage, dispatch, recorderMode])

  // Soft leave for rating/tip: drop signaling without wiping frozen room UI (whiteboard, peers).
  useEffect(() => {
    if (!sessionLeftForReview) return
    const client = socketRef.current
    if (client) {
      client.disconnect()
      socketRef.current = null
      setSocket(null)
    }
    setPresenceJoined(false)
  }, [sessionLeftForReview])

  const value = useMemo<MeetingSocketContextValue>(
    () => ({
      socket,
      presenceJoined,
      emitRoomSync,
      emitPrivateMeetingSignal,
      startMeeting,
      pauseMeeting,
      endMeeting,
    }),
    [socket, presenceJoined, emitRoomSync, emitPrivateMeetingSignal, startMeeting, pauseMeeting, endMeeting],
  )

  return <MeetingSocketContext.Provider value={value}>{children}</MeetingSocketContext.Provider>
}

type PeerDto = {
  userId: string
  name: string
  role: 'host' | 'participant'
  profileImage: string | null
}

function mapPeer(p: PeerDto) {
  return {
    id: p.userId,
    name: p.name,
    role: p.role,
    profileImage: p.profileImage,
  }
}
