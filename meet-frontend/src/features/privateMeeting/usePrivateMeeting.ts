import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { store } from '../../app/store'
import { useMeetingSocket } from '../meetingRoom/MeetingSocketProvider'
import { useMediasoupMedia } from '../mediasoup/MediasoupMediaProvider'
import { pushToast } from '../documents/notificationsSlice'
import { selectMeetingDisplayName, selectMeetingUserId } from '../meetingSession/meetingSessionSlice'
import { useRecorderUiActive } from '../recording/useRecorderUiActive'
import {
  EMPTY_PRIVATE_MEETING_SYNC,
  PRIVATE_MEETING_CHANNEL,
  parsePrivateMeetingSync,
  type PrivateMeetingJoinMode,
  type PrivateMeetingSignal,
} from './privateMeetingTypes'
import {
  applyPrivateJoinMedia,
  restorePrivateJoinMedia,
} from './privateMeetingMedia'
import { clearPrivateMeetingPartner, selectPrivateMeetingLocal, selectPrivateMeetingPartnerId, selectPrivateMeetingSync, setPrivateMeetingPartner, setPrivateMeetingPendingPartner } from './privateMeetingSlice'
import { closeParticipantMenu } from '../videoConference/videoConferenceSlice'

export function usePrivateMeetingActions() {
  const dispatch = useAppDispatch()
  const { emitRoomSync, emitPrivateMeetingSignal } = useMeetingSocket()
  const { syncLocalMedia } = useMediasoupMedia()
  const userId = useAppSelector(selectMeetingUserId)
  const displayName = useAppSelector(selectMeetingDisplayName)
  const local = useAppSelector(selectPrivateMeetingLocal)
  const partnerId = useAppSelector(selectPrivateMeetingPartnerId)
  const sync = useAppSelector(selectPrivateMeetingSync)
  const recorderUi = useRecorderUiActive()

  const broadcastActiveState = useCallback(
    (hostId: string, guestId: string, joinedUserId: string) => {
      const current = parsePrivateMeetingSync(
        store.getState().roomSync.channels[PRIVATE_MEETING_CHANNEL],
      )
      const joined = current.active
        ? [...new Set([...current.joined, joinedUserId])]
        : [joinedUserId]
      emitRoomSync(PRIVATE_MEETING_CHANNEL, {
        active: true,
        participants: [hostId, guestId],
        joined,
      })
    },
    [emitRoomSync],
  )

  const broadcastInactiveState = useCallback(() => {
    emitRoomSync(PRIVATE_MEETING_CHANNEL, EMPTY_PRIVATE_MEETING_SYNC)
  }, [emitRoomSync])

  const emitSignal = useCallback(
    (payload: PrivateMeetingSignal) => {
      if (recorderUi) return
      emitPrivateMeetingSignal(payload)
    },
    [emitPrivateMeetingSignal, recorderUi],
  )

  const enterPrivateSession = useCallback(
    (otherUserId: string, mode: PrivateMeetingJoinMode, hostId: string, guestId: string) => {
      const saved = applyPrivateJoinMedia(mode)
      dispatch(
        setPrivateMeetingPartner({
          partnerId: otherUserId,
          savedMicEnabled: saved.savedMicEnabled,
          savedCamEnabled: saved.savedCamEnabled,
        }),
      )
      broadcastActiveState(hostId, guestId, userId ?? otherUserId)
      void syncLocalMedia(store.getState().videoConference.localStream)
      dispatch(
        pushToast({
          message: 'Private meeting started',
          variant: 'info',
          durationMs: 5000,
        }),
      )
    },
    [broadcastActiveState, dispatch, syncLocalMedia, userId],
  )

  const leavePrivateSession = useCallback(
    (notifyEnded = true) => {
      restorePrivateJoinMedia(local.savedMicEnabled, local.savedCamEnabled)
      void syncLocalMedia(store.getState().videoConference.localStream)
      dispatch(clearPrivateMeetingPartner())
      broadcastInactiveState()
      if (notifyEnded) {
        dispatch(
          pushToast({
            message: 'Private meeting ended',
            variant: 'info',
            durationMs: 5000,
          }),
        )
      }
    },
    [broadcastInactiveState, dispatch, local.savedCamEnabled, local.savedMicEnabled, syncLocalMedia],
  )

  const requestPrivateMeeting = useCallback(
    (targetUserId: string) => {
      if (!userId || recorderUi) return
      if (sync.active || partnerId) return
      dispatch(setPrivateMeetingPendingPartner(targetUserId))
      emitSignal({
        method: 'requestPvMeeting',
        receiverId: targetUserId,
        senderId: userId,
        senderName: displayName || 'Host',
      })
      dispatch(
        pushToast({
          message: 'Requested private meeting, Once accept it will initiate',
          variant: 'info',
          durationMs: 5000,
        }),
      )
    },
    [displayName, dispatch, emitSignal, partnerId, recorderUi, sync.active, userId],
  )

  const stopPrivateMeeting = useCallback(
    (targetUserId: string) => {
      if (!userId || recorderUi) return
      leavePrivateSession(true)
      emitSignal({
        method: 'stopPvMeeting',
        receiverId: targetUserId,
        senderId: userId,
        senderName: displayName || 'Host',
      })
    },
    [displayName, emitSignal, leavePrivateSession, recorderUi, userId],
  )

  const acceptPrivateRequest = useCallback(
    (hostId: string, mode: PrivateMeetingJoinMode) => {
      if (!userId || recorderUi) return
      enterPrivateSession(hostId, mode, hostId, userId)
      emitSignal({
        method: 'acceptPvMeeting',
        receiverId: hostId,
        senderId: userId,
        senderName: displayName || 'Participant',
      })
    },
    [displayName, emitSignal, enterPrivateSession, recorderUi, userId],
  )

  const rejectPrivateRequest = useCallback(
    (hostId: string) => {
      if (!userId || recorderUi) return
      emitSignal({
        method: 'rejectPvMeeting',
        receiverId: hostId,
        senderId: userId,
        senderName: displayName || 'Participant',
      })
    },
    [displayName, emitSignal, recorderUi, userId],
  )

  const hostJoinPrivateMeeting = useCallback(
    (guestId: string, mode: PrivateMeetingJoinMode) => {
      if (!userId || recorderUi) return
      enterPrivateSession(guestId, mode, userId, guestId)
    },
    [enterPrivateSession, recorderUi, userId],
  )

  const handleRemoteStop = useCallback(
    (hostId: string) => {
      if (partnerId === hostId || sync.participants.includes(userId ?? '')) {
        leavePrivateSession(false)
      }
    },
    [leavePrivateSession, partnerId, sync.participants, userId],
  )

  const isPrivateActiveWith = useCallback(
    (participantId: string) => partnerId === participantId,
    [partnerId],
  )

  return {
    requestPrivateMeeting,
    stopPrivateMeeting,
    acceptPrivateRequest,
    rejectPrivateRequest,
    hostJoinPrivateMeeting,
    handleRemoteStop,
    isPrivateActiveWith,
    partnerId,
    sync,
    pendingPartnerId: local.pendingPartnerId,
  }
}

export function usePrivateMeetingHostMenu(participantId: string) {
  const dispatch = useAppDispatch()
  const { sync, pendingPartnerId, isPrivateActiveWith, requestPrivateMeeting, stopPrivateMeeting } =
    usePrivateMeetingActions()

  const isActivePartner = isPrivateActiveWith(participantId)
  const privateBusy = sync.active && !isActivePartner

  const showPrivateOption = !privateBusy || isActivePartner
  const privateLabel = isActivePartner ? 'Stop Private Meet' : 'Private Meeting'

  const onPrivateAction = () => {
    dispatch(closeParticipantMenu())
    if (isActivePartner) {
      stopPrivateMeeting(participantId)
    } else if (!pendingPartnerId) {
      requestPrivateMeeting(participantId)
    }
  }

  return {
    showPrivateOption,
    privateLabel,
    onPrivateAction,
    privateDisabled: Boolean(pendingPartnerId) && pendingPartnerId !== participantId,
  }
}
