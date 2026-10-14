import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { useMeetingSocket } from '../meetingRoom/MeetingSocketProvider'
import { selectMeetingUserId } from '../meetingSession/meetingSessionSlice'
import { useRecorderUiActive } from '../recording/useRecorderUiActive'
import { PrivateMeetingModal } from './PrivateMeetingModal'
import type { PrivateMeetingSignal } from './privateMeetingTypes'
import {
  dismissPrivateMeetingModal,
  selectPrivateMeetingModal,
  setPrivateMeetingPendingPartner,
  showPrivateMeetingModal,
} from './privateMeetingSlice'
import { usePrivateMeetingActions } from './usePrivateMeeting'

export function PrivateMeetingBridge() {
  const dispatch = useAppDispatch()
  const { socket } = useMeetingSocket()
  const userId = useAppSelector(selectMeetingUserId)
  const modal = useAppSelector(selectPrivateMeetingModal)
  const recorderUi = useRecorderUiActive()
  const {
    acceptPrivateRequest,
    rejectPrivateRequest,
    hostJoinPrivateMeeting,
    handleRemoteStop,
  } = usePrivateMeetingActions()

  useEffect(() => {
    if (!socket || recorderUi) return

    const onSignal = (payload: PrivateMeetingSignal) => {
      if (!userId || payload.receiverId !== userId) return

      switch (payload.method) {
        case 'requestPvMeeting':
          dispatch(
            showPrivateMeetingModal({
              kind: 'incoming_request',
              partnerId: payload.senderId,
              partnerName: payload.senderName,
            }),
          )
          break
        case 'rejectPvMeeting':
          dispatch(setPrivateMeetingPendingPartner(null))
          dispatch(
            showPrivateMeetingModal({
              kind: 'rejected',
              partnerId: payload.senderId,
              partnerName: payload.senderName,
            }),
          )
          break
        case 'acceptPvMeeting':
          dispatch(setPrivateMeetingPendingPartner(null))
          dispatch(
            showPrivateMeetingModal({
              kind: 'incoming_accept',
              partnerId: payload.senderId,
              partnerName: payload.senderName,
            }),
          )
          break
        case 'stopPvMeeting':
          handleRemoteStop(payload.senderId)
          if (payload.receiverId === userId) {
            dispatch(
              showPrivateMeetingModal({
                kind: 'stopped',
                partnerId: payload.senderId,
                partnerName: payload.senderName,
              }),
            )
          }
          break
        default:
          break
      }
    }

    socket.on('private_meeting_signal', onSignal)
    return () => {
      socket.off('private_meeting_signal', onSignal)
    }
  }, [dispatch, handleRemoteStop, recorderUi, socket, userId])

  if (!modal) return null

  const dismiss = () => dispatch(dismissPrivateMeetingModal())

  return (
    <PrivateMeetingModal
      modal={modal}
      onDismiss={dismiss}
      onAcceptWithAv={() => {
        acceptPrivateRequest(modal.partnerId, 'cammic')
        dismiss()
      }}
      onAcceptWithAudio={() => {
        acceptPrivateRequest(modal.partnerId, 'mic')
        dismiss()
      }}
      onReject={() => {
        rejectPrivateRequest(modal.partnerId)
        dismiss()
      }}
      onJoinWithAv={() => {
        hostJoinPrivateMeeting(modal.partnerId, 'cammic')
        dismiss()
      }}
      onJoinWithAudio={() => {
        hostJoinPrivateMeeting(modal.partnerId, 'mic')
        dismiss()
      }}
    />
  )
}
