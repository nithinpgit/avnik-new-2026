import { useCallback, useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { store } from '../../app/store'
import { selectIsMeetingLive } from '../meeting/meetingLifecycleSlice'
import { useMeetingPermissions } from '../participantControls/useMeetingPermissions'
import { useMeetingSocket } from '../meetingRoom/MeetingSocketProvider'
import { pushToast } from './notificationsSlice'
import { setPresentation, selectActivePresentation } from './documentsSlice'
import { patchFilePageCount } from './documentsApi'
import { getPdfPageCount } from './pdfUtils'
import {
  PRESENTATION_CHANNEL,
  parsePresentationPayload,
  type PresentationSyncPayload,
  type RoomFileRecord,
  isPresentableExtension,
} from './presentationTypes'
import { VIDEO_SHARE_CHANNEL } from '../videoShare/videoShareTypes'

/** Ignore stale room_sync pan echoes while the local presenter is dragging. */
const localPanGuardUntilMs = { current: 0 }

export function usePresentationSync() {
  const dispatch = useAppDispatch()
  const { emitRoomSync } = useMeetingSocket()
  const { canPresentContent } = useMeetingPermissions()
  const meetingLive = useAppSelector(selectIsMeetingLive)
  const presentationDoc = useAppSelector((s) => s.roomSync.channels[PRESENTATION_CHANNEL])
  const panBroadcastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const parsed = parsePresentationPayload(presentationDoc)
    if (parsed && Date.now() < localPanGuardUntilMs.current) {
      const current = store.getState().documents.presentation
      if (current?.active && current.fileId === parsed.fileId) {
        // Keep fresher local pan; ignore stale room echo while presenter is panning.
        dispatch(
          setPresentation({
            ...parsed,
            panX: current.panX,
            panY: current.panY,
          }),
        )
        return
      }
    }
    dispatch(setPresentation(parsed))
  }, [presentationDoc, dispatch])

  const emitPresentation = useCallback(
    (payload: PresentationSyncPayload | null) => {
      dispatch(setPresentation(payload))
      emitRoomSync(PRESENTATION_CHANNEL, payload ?? { active: false })
    },
    [dispatch, emitRoomSync],
  )

  const resolvePageCount = useCallback(async (file: RoomFileRecord): Promise<number> => {
    if (file.extension !== 'pdf') return file.pageCount || 1
    if (file.pageCount > 1) return file.pageCount
    if (String(file.id).startsWith('external-')) return file.pageCount || 1
    try {
      const count = await getPdfPageCount(file.url, file.id)
      if (count > 1) {
        void patchFilePageCount(file.id, count).catch(() => undefined)
      }
      return count
    } catch {
      return file.pageCount || 1
    }
  }, [])

  const loadPresentation = useCallback(
    async (file: RoomFileRecord) => {
      if (!canPresentContent) {
        dispatch(pushToast({ message: 'Only the host or a presenter can share a document.', variant: 'error' }))
        return
      }
      if (!meetingLive) {
        dispatch(
          pushToast({
            message: 'Start the meeting before sharing a document.',
            variant: 'error',
          }),
        )
        return
      }
      if (!isPresentableExtension(file.extension)) {
        dispatch(
          pushToast({
            message: 'Only PDF and image files can be presented on the whiteboard.',
            variant: 'error',
          }),
        )
        return
      }

      let pageCount = file.pageCount
      try {
        pageCount = await resolvePageCount(file)
      } catch {
        dispatch(pushToast({ message: 'Could not read document pages.', variant: 'error' }))
        return
      }

      emitRoomSync(VIDEO_SHARE_CHANNEL, { active: false })

      const payload: PresentationSyncPayload = {
        active: true,
        fileId: file.id,
        fileUrl: file.url,
        originalName: file.originalName,
        mimeType: file.mimeType,
        extension: file.extension,
        pageCount,
        currentPage: 1,
        zoomPercent: 100,
        panX: 0,
        panY: 0,
      }
      emitPresentation(payload)
      dispatch(
        pushToast({ message: 'Document shared with everyone.', variant: 'success', durationMs: 3500 }),
      )
    },
    [dispatch, emitPresentation, emitRoomSync, canPresentContent, meetingLive, resolvePageCount],
  )

  const closePresentation = useCallback(() => {
    if (!canPresentContent) return
    emitPresentation(null)
    dispatch(pushToast({ message: 'Document closed.', variant: 'info', durationMs: 2500 }))
  }, [dispatch, emitPresentation, canPresentContent])

  const patchPresentation = useCallback(
    (patch: Partial<PresentationSyncPayload>) => {
      if (!canPresentContent) return
      const prev = store.getState().documents.presentation
      if (!prev) return
      emitPresentation({ ...prev, ...patch })
    },
    [emitPresentation, canPresentContent],
  )

  /** Instant local pan for the presenter (no room_sync). Room sync is debounced separately. */
  const patchPresentationLocal = useCallback(
    (patch: Partial<PresentationSyncPayload>) => {
      if (!canPresentContent) return
      const prev = store.getState().documents.presentation
      if (!prev) return
      localPanGuardUntilMs.current = Date.now() + 500
      dispatch(setPresentation({ ...prev, ...patch }))
    },
    [dispatch, canPresentContent],
  )

  /** Debounced room broadcast of current presentation (trailing). */
  const schedulePresentationBroadcast = useCallback(() => {
    if (!canPresentContent) return
    localPanGuardUntilMs.current = Date.now() + 500
    if (panBroadcastTimerRef.current) clearTimeout(panBroadcastTimerRef.current)
    panBroadcastTimerRef.current = setTimeout(() => {
      panBroadcastTimerRef.current = null
      const prev = store.getState().documents.presentation
      if (!prev) return
      emitRoomSync(PRESENTATION_CHANNEL, prev)
      localPanGuardUntilMs.current = Date.now() + 300
    }, 150)
  }, [canPresentContent, emitRoomSync])

  const presentation = useAppSelector(selectActivePresentation)

  return {
    presentation,
    loadPresentation,
    closePresentation,
    patchPresentation,
    patchPresentationLocal,
    schedulePresentationBroadcast,
  }
}
