import { CaptureUpdateAction, Excalidraw } from '@excalidraw/excalidraw'
import '@excalidraw/excalidraw/index.css'
import type { ExcalidrawImperativeAPI } from '@excalidraw/excalidraw/types'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useAppSelector } from '../../app/hooks'
import { selectActivePresentation } from '../documents/documentsSlice'
import { selectPreMeetingEntryCompleted } from '../preMeeting/preMeetingSlice'
import { useMeetingSocket } from '../meetingRoom/MeetingSocketProvider'
import { useMeetingPermissions } from '../participantControls/useMeetingPermissions'
import { selectConferenceMode } from '../videoConference/videoConferenceSlice'
import { PresentationLayer } from '../documents/PresentationLayer'
import { usePresentationSync } from '../documents/usePresentationSync'
import { selectWhiteboardTheme } from './whiteboardSlice'
import {
  getWhiteboardPageKey,
  getWhiteboardSyncChannel,
  resolveWhiteboardChannelPayload,
} from './whiteboardPageKey'
import {
  applyWhiteboardPayload,
  parseWhiteboardPayload,
  sceneContentFingerprint,
  serializeCurrentScene,
} from './whiteboardScene'
import { useWhiteboardPointerSync } from './useWhiteboardPointerSync'
import './whiteboard.css'

export type WhiteboardSyncPayload = {
  format: 'excalidraw-json'
  body: string
}

const DEFAULT_VIEW_BG = '#ffffff'
const TRANSPARENT_VIEW_BG = 'transparent'
const PAGE_SWITCH_MS = 120
const SYNC_DEBOUNCE_MS = 350
const SUPPRESS_EMIT_MS = 120

function cancelScheduledPush(debounceTimerRef: { current: ReturnType<typeof setTimeout> | null }) {
  if (debounceTimerRef.current) {
    clearTimeout(debounceTimerRef.current)
    debounceTimerRef.current = null
  }
}

export function WhiteboardModule() {
  const theme = useAppSelector(selectWhiteboardTheme)
  const presentation = useAppSelector(selectActivePresentation)
  const presentationActive = Boolean(presentation?.active)
  const conferenceMode = useAppSelector(selectConferenceMode)
  const entryCompleted = useAppSelector(selectPreMeetingEntryCompleted)
  const roomChannels = useAppSelector((s) => s.roomSync.channels)
  const { emitRoomSync } = useMeetingSocket()
  const { canEditWhiteboard } = useMeetingPermissions()
  const { patchPresentationLocal, schedulePresentationBroadcast } = usePresentationSync()

  const pageKey = useMemo(
    () => getWhiteboardPageKey(presentation),
    [presentation?.active, presentation?.fileId, presentation?.currentPage],
  )
  const syncChannel = useMemo(() => getWhiteboardSyncChannel(pageKey), [pageKey])

  const presentationCamera = useMemo(() => {
    if (!presentation?.active) return null
    return {
      zoom: Math.max(0.1, (presentation.zoomPercent || 100) / 100),
      scrollX: presentation.panX ?? 0,
      scrollY: presentation.panY ?? 0,
    }
  }, [presentation?.active, presentation?.zoomPercent, presentation?.panX, presentation?.panY])

  const apiRef = useRef<ExcalidrawImperativeAPI | null>(null)
  const pageKeyRef = useRef(pageKey)
  const presentationRef = useRef(presentation)
  presentationRef.current = presentation
  const lastLocalPanRef = useRef({ x: 0, y: 0 })
  const initializedRef = useRef(false)
  const suppressEmitRef = useRef(false)
  const suppressEmitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const lastAppliedFingerprintByPageRef = useRef<Map<string, string>>(new Map())
  const lastEmittedFingerprintByPageRef = useRef<Map<string, string>>(new Map())
  const localSceneByPageRef = useRef<Map<string, string>>(new Map())
  const flushSaveRef = useRef<(targetPageKey: string) => void>(() => {})
  const loadPageRef = useRef<(targetPageKey: string) => void>(() => {})
  const pageSwitchGenRef = useRef(0)

  const [canvasSwitching, setCanvasSwitching] = useState(false)

  const { onPointerUpdate, isCollaborating } = useWhiteboardPointerSync({
    pageKey,
    apiRef,
    canBroadcast: canEditWhiteboard,
  })

  const sceneAppearance = useMemo(
    () => ({
      viewBackgroundColor: presentationActive ? TRANSPARENT_VIEW_BG : theme === 'dark' ? '#121212' : DEFAULT_VIEW_BG,
      gridModeEnabled: !presentationActive,
      viewModeEnabled: !canEditWhiteboard,
    }),
    [presentationActive, theme, canEditWhiteboard],
  )

  const beginSuppressEmit = useCallback(() => {
    suppressEmitRef.current = true
    if (suppressEmitTimerRef.current) {
      clearTimeout(suppressEmitTimerRef.current)
    }
  }, [])

  const endSuppressEmitLater = useCallback(() => {
    if (suppressEmitTimerRef.current) {
      clearTimeout(suppressEmitTimerRef.current)
    }
    suppressEmitTimerRef.current = setTimeout(() => {
      suppressEmitRef.current = false
      suppressEmitTimerRef.current = null
    }, SUPPRESS_EMIT_MS)
  }, [])

  const pushSceneIfChanged = useCallback(
    (targetPageKey: string, payload: WhiteboardSyncPayload) => {
      const fingerprint = sceneContentFingerprint(payload.body)
      if (lastEmittedFingerprintByPageRef.current.get(targetPageKey) === fingerprint) {
        return false
      }
      lastEmittedFingerprintByPageRef.current.set(targetPageKey, fingerprint)
      lastAppliedFingerprintByPageRef.current.set(targetPageKey, fingerprint)
      localSceneByPageRef.current.set(targetPageKey, payload.body)
      emitRoomSync(getWhiteboardSyncChannel(targetPageKey), payload)
      return true
    },
    [emitRoomSync],
  )

  const flushSave = useCallback(
    (targetPageKey: string) => {
      cancelScheduledPush(debounceTimerRef)
      const api = apiRef.current
      if (!api || !entryCompleted || suppressEmitRef.current || !canEditWhiteboard) return

      const payload = serializeCurrentScene(api, {
        normalizeCamera: Boolean(presentationRef.current?.active),
      })
      if (!payload) return
      pushSceneIfChanged(targetPageKey, payload)
    },
    [entryCompleted, canEditWhiteboard, pushSceneIfChanged],
  )

  const applyRemoteScene = useCallback(
    (targetPageKey: string, payload: WhiteboardSyncPayload, force = false) => {
      const api = apiRef.current
      if (!api) return

      const fingerprint = sceneContentFingerprint(payload.body)
      if (
        !force &&
        lastAppliedFingerprintByPageRef.current.get(targetPageKey) === fingerprint
      ) {
        return
      }

      cancelScheduledPush(debounceTimerRef)
      beginSuppressEmit()
      applyWhiteboardPayload(api, payload, {
        ...sceneAppearance,
        camera: presentationCamera ?? undefined,
      })
      lastAppliedFingerprintByPageRef.current.set(targetPageKey, fingerprint)
      localSceneByPageRef.current.set(targetPageKey, payload.body)
      endSuppressEmitLater()
    },
    [sceneAppearance, presentationCamera, beginSuppressEmit, endSuppressEmitLater],
  )

  const loadPage = useCallback(
    (targetPageKey: string) => {
      const api = apiRef.current
      if (!api) return

      const raw = resolveWhiteboardChannelPayload(roomChannels, targetPageKey)
      const remotePayload = parseWhiteboardPayload(raw)
      const cachedBody = localSceneByPageRef.current.get(targetPageKey)
      const payload =
        remotePayload ??
        (cachedBody != null ? { format: 'excalidraw-json' as const, body: cachedBody } : null)

      // Always force-apply on page switch so a fingerprint match cannot leave the previous page drawn.
      if (!payload) {
        beginSuppressEmit()
        applyWhiteboardPayload(api, null, {
          ...sceneAppearance,
          camera: presentationCamera ?? undefined,
        })
        lastAppliedFingerprintByPageRef.current.set(targetPageKey, '')
        endSuppressEmitLater()
        return
      }

      applyRemoteScene(targetPageKey, payload, true)
    },
    [
      roomChannels,
      sceneAppearance,
      presentationCamera,
      applyRemoteScene,
      beginSuppressEmit,
      endSuppressEmitLater,
    ],
  )

  flushSaveRef.current = flushSave
  loadPageRef.current = loadPage

  const schedulePush = useCallback(() => {
    if (!entryCompleted || suppressEmitRef.current || !canEditWhiteboard) return
    cancelScheduledPush(debounceTimerRef)
    debounceTimerRef.current = setTimeout(() => {
      debounceTimerRef.current = null
      if (suppressEmitRef.current || !canEditWhiteboard) return
      const api = apiRef.current
      if (!api) return
      const payload = serializeCurrentScene(api, {
        normalizeCamera: Boolean(presentationRef.current?.active),
      })
      if (!payload) return
      pushSceneIfChanged(pageKeyRef.current, payload)
    }, SYNC_DEBOUNCE_MS)
  }, [entryCompleted, canEditWhiteboard, pushSceneIfChanged])

  useEffect(() => {
    return () => {
      cancelScheduledPush(debounceTimerRef)
      if (suppressEmitTimerRef.current) clearTimeout(suppressEmitTimerRef.current)
    }
  }, [])

  useEffect(() => {
    if (canEditWhiteboard) return
    cancelScheduledPush(debounceTimerRef)
  }, [canEditWhiteboard])

  useEffect(() => {
    const flushActivePage = () => {
      if (pageKeyRef.current) {
        flushSave(pageKeyRef.current)
      }
    }
    const onVisibility = () => {
      if (document.visibilityState === 'hidden') flushActivePage()
    }
    window.addEventListener('beforeunload', flushActivePage)
    window.addEventListener('pagehide', flushActivePage)
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      window.removeEventListener('beforeunload', flushActivePage)
      window.removeEventListener('pagehide', flushActivePage)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [flushSave])

  useEffect(() => {
    if (!initializedRef.current || !apiRef.current) return

    const prevKey = pageKeyRef.current
    if (prevKey === pageKey) return

    const switchGen = ++pageSwitchGenRef.current
    setCanvasSwitching(true)

    void (async () => {
      flushSaveRef.current(prevKey)
      if (switchGen !== pageSwitchGenRef.current) return

      pageKeyRef.current = pageKey
      loadPageRef.current(pageKey)
      await new Promise((r) => setTimeout(r, PAGE_SWITCH_MS))

      if (switchGen === pageSwitchGenRef.current) {
        setCanvasSwitching(false)
      }
    })()
  }, [pageKey])

  useEffect(() => {
    if (!apiRef.current || pageKeyRef.current !== pageKey) return

    const raw = resolveWhiteboardChannelPayload(roomChannels, pageKey)
    const payload = parseWhiteboardPayload(raw)
    if (!payload) return

    applyRemoteScene(pageKey, payload)
  }, [roomChannels, pageKey, syncChannel, applyRemoteScene])

  useEffect(() => {
    const api = apiRef.current
    if (!api || pageKeyRef.current !== pageKey) return
    api.updateScene({
      appState: {
        viewBackgroundColor: sceneAppearance.viewBackgroundColor,
        gridModeEnabled: sceneAppearance.gridModeEnabled,
        viewModeEnabled: sceneAppearance.viewModeEnabled,
      },
      captureUpdate: CaptureUpdateAction.NEVER,
    })
  }, [sceneAppearance, pageKey])

  // Lock Excalidraw camera to document zoom/pan so drawings stay on the text.
  useEffect(() => {
    if (!presentationActive || !presentationCamera) return
    const api = apiRef.current
    if (!api) return
    const state = api.getAppState()
    const zoomValue =
      typeof state.zoom === 'object' && state.zoom && 'value' in state.zoom
        ? Number(state.zoom.value)
        : Number(state.zoom)
    const zoomMatches = Math.abs(zoomValue - presentationCamera.zoom) < 0.001
    const handActive = canEditWhiteboard && state.activeTool?.type === 'hand'
    // While the presenter is hand-panning, scroll is the source of truth (synced out to pan).
    const scrollMatches =
      handActive ||
      (Math.abs(state.scrollX - presentationCamera.scrollX) < 0.5 &&
        Math.abs(state.scrollY - presentationCamera.scrollY) < 0.5)
    if (zoomMatches && scrollMatches) return
    beginSuppressEmit()
    api.updateScene({
      appState: {
        zoom: { value: presentationCamera.zoom as never },
        ...(handActive
          ? {}
          : { scrollX: presentationCamera.scrollX, scrollY: presentationCamera.scrollY }),
      } as never,
      captureUpdate: CaptureUpdateAction.NEVER,
    })
    endSuppressEmitLater()
  }, [
    presentationActive,
    presentationCamera,
    canEditWhiteboard,
    beginSuppressEmit,
    endSuppressEmitLater,
  ])

  const syncDocumentPanFromHandTool = useCallback(() => {
    const api = apiRef.current
    const pres = presentationRef.current
    if (!api || !pres?.active || !canEditWhiteboard || suppressEmitRef.current) return
    if (api.getAppState().activeTool?.type !== 'hand') return
    const { scrollX, scrollY } = api.getAppState()
    const panX = Math.round(scrollX)
    const panY = Math.round(scrollY)
    const prev = lastLocalPanRef.current
    if (panX === prev.x && panY === prev.y) return
    lastLocalPanRef.current = { x: panX, y: panY }
    patchPresentationLocal({ panX, panY })
    schedulePresentationBroadcast()
  }, [canEditWhiteboard, patchPresentationLocal, schedulePresentationBroadcast])

  return (
    <section
      className={`whiteboard-module${presentationActive ? ' whiteboard-module--over-document' : ''}${conferenceMode ? ' whiteboard-module--conference-hidden' : ''}${!canEditWhiteboard ? ' whiteboard-module--view-only' : ''}`}
      aria-label="Whiteboard workspace"
    >
      <PresentationLayer />
      <div
        className={`whiteboard-module__canvas${canvasSwitching ? ' whiteboard-module__canvas--switching' : ''}`}
      >
        <Excalidraw
          theme={theme}
          viewModeEnabled={!canEditWhiteboard}
          isCollaborating={isCollaborating}
          initialData={{
            appState: {
              viewBackgroundColor: sceneAppearance.viewBackgroundColor,
              gridModeEnabled: sceneAppearance.gridModeEnabled,
              gridStep: 5,
            },
          }}
          excalidrawAPI={(api) => {
            const firstReady = !apiRef.current
            apiRef.current = api
            if (firstReady && !initializedRef.current) {
              initializedRef.current = true
              pageKeyRef.current = pageKey
              requestAnimationFrame(() => loadPage(pageKey))
            }
          }}
          onChange={() => {
            schedulePush()
            syncDocumentPanFromHandTool()
          }}
          onPointerUpdate={onPointerUpdate}
        />
      </div>
    </section>
  )
}
