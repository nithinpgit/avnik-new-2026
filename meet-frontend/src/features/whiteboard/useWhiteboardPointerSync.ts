import { CaptureUpdateAction } from '@excalidraw/excalidraw'
import type { Collaborator, ExcalidrawImperativeAPI } from '@excalidraw/excalidraw/types'
import { useCallback, useEffect, useRef, type RefObject } from 'react'
import { useAppSelector } from '../../app/hooks'
import { selectIsMeetingLive } from '../meeting/meetingLifecycleSlice'
import { selectMeetingDisplayName, selectMeetingRoomId, selectMeetingUserId } from '../meetingSession/meetingSessionSlice'
import { useMeetingSocket } from '../meetingRoom/MeetingSocketProvider'
import {
  WHITEBOARD_POINTER_SOCKET_EVENT,
  type WhiteboardPointerPayload,
} from './whiteboardPointerTypes'

const POINTER_EMIT_MS = 33

type PointerUpdatePayload = {
  pointer: { x: number; y: number; tool: 'pointer' | 'laser' }
  button: 'up' | 'down'
}

function throttlePointerEmit(
  emit: (payload: PointerUpdatePayload) => void,
  payload: PointerUpdatePayload,
  stateRef: {
    timer: ReturnType<typeof setTimeout> | null
    lastEmitAt: number
    pending: PointerUpdatePayload | null
  },
) {
  stateRef.pending = payload
  const flush = () => {
    if (!stateRef.pending) return
    const next = stateRef.pending
    stateRef.pending = null
    stateRef.lastEmitAt = Date.now()
    emit(next)
  }

  const now = Date.now()
  if (now - stateRef.lastEmitAt >= POINTER_EMIT_MS) {
    if (stateRef.timer) {
      clearTimeout(stateRef.timer)
      stateRef.timer = null
    }
    flush()
    return
  }

  if (stateRef.timer) return
  stateRef.timer = setTimeout(() => {
    stateRef.timer = null
    flush()
  }, POINTER_EMIT_MS - (now - stateRef.lastEmitAt))
}

export function useWhiteboardPointerSync({
  pageKey,
  apiRef,
  canBroadcast,
}: {
  pageKey: string
  apiRef: RefObject<ExcalidrawImperativeAPI | null>
  canBroadcast: boolean
}) {
  const { socket, presenceJoined } = useMeetingSocket()
  const roomId = useAppSelector(selectMeetingRoomId)
  const userId = useAppSelector(selectMeetingUserId)
  const displayName = useAppSelector(selectMeetingDisplayName)
  const meetingLive = useAppSelector(selectIsMeetingLive)

  const remoteByUserRef = useRef<Map<string, WhiteboardPointerPayload>>(new Map())
  const emitStateRef = useRef<{
    timer: ReturnType<typeof setTimeout> | null
    lastEmitAt: number
    pending: PointerUpdatePayload | null
  }>({ timer: null, lastEmitAt: 0, pending: null })

  const syncCollaboratorsToCanvas = useCallback(() => {
    const api = apiRef.current
    if (!api) return

    const collaborators = new Map<string, Collaborator>()
    for (const [remoteUserId, entry] of remoteByUserRef.current) {
      if (remoteUserId === userId || entry.pageKey !== pageKey) continue
      collaborators.set(remoteUserId, {
        username: entry.username,
        pointer: entry.pointer,
        button: entry.button,
      })
    }

    api.updateScene({
      collaborators: collaborators as Parameters<ExcalidrawImperativeAPI['updateScene']>[0]['collaborators'],
      captureUpdate: CaptureUpdateAction.NEVER,
    })
  }, [apiRef, pageKey, userId])

  const applyRemotePointer = useCallback(
    (payload: WhiteboardPointerPayload) => {
      if (payload.userId === userId) return

      if (payload.cleared || payload.button === 'up') {
        remoteByUserRef.current.delete(payload.userId)
      } else if (payload.pageKey === pageKey) {
        remoteByUserRef.current.set(payload.userId, payload)
      } else {
        remoteByUserRef.current.delete(payload.userId)
      }

      syncCollaboratorsToCanvas()
    },
    [pageKey, syncCollaboratorsToCanvas, userId],
  )

  useEffect(() => {
    if (!socket) return

    const onPointer = (payload: WhiteboardPointerPayload) => {
      applyRemotePointer(payload)
    }

    const onPeerLeft = ({ userId: leftUserId }: { userId: string }) => {
      remoteByUserRef.current.delete(leftUserId)
      syncCollaboratorsToCanvas()
    }

    socket.on(WHITEBOARD_POINTER_SOCKET_EVENT, onPointer)
    socket.on('peer_left', onPeerLeft)
    return () => {
      socket.off(WHITEBOARD_POINTER_SOCKET_EVENT, onPointer)
      socket.off('peer_left', onPeerLeft)
    }
  }, [socket, applyRemotePointer, syncCollaboratorsToCanvas])

  useEffect(() => {
    syncCollaboratorsToCanvas()
  }, [pageKey, syncCollaboratorsToCanvas])

  useEffect(() => {
    return () => {
      if (emitStateRef.current.timer) {
        clearTimeout(emitStateRef.current.timer)
      }
    }
  }, [])

  const emitPointerUpdate = useCallback(
    (payload: PointerUpdatePayload) => {
      if (!socket?.connected || !roomId || !userId || !canBroadcast || !meetingLive || !presenceJoined) {
        return
      }

      const send = (next: PointerUpdatePayload) => {
        socket.emit(WHITEBOARD_POINTER_SOCKET_EVENT, {
          roomId,
          pageKey,
          username: displayName,
          pointer: next.pointer,
          button: next.button,
        })
      }

      if (payload.button === 'up') {
        if (emitStateRef.current.timer) {
          clearTimeout(emitStateRef.current.timer)
          emitStateRef.current.timer = null
        }
        emitStateRef.current.pending = null
        send(payload)
        return
      }

      throttlePointerEmit(send, payload, emitStateRef.current)
    },
    [socket, roomId, userId, displayName, pageKey, canBroadcast, meetingLive, presenceJoined],
  )

  const onPointerUpdate = useCallback(
    (payload: PointerUpdatePayload) => {
      emitPointerUpdate(payload)
    },
    [emitPointerUpdate],
  )

  const isCollaborating = meetingLive && presenceJoined

  return { onPointerUpdate, isCollaborating }
}
