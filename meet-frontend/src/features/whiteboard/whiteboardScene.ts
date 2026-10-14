import {
  CaptureUpdateAction,
  restore,
  serializeAsJSON,
} from '@excalidraw/excalidraw'
import type { ExcalidrawImperativeAPI } from '@excalidraw/excalidraw/types'
import type { WhiteboardSyncPayload } from './WhiteboardModule'

export function parseWhiteboardPayload(raw: unknown): WhiteboardSyncPayload | null {
  if (!raw || typeof raw !== 'object') return null
  const doc = raw as Partial<WhiteboardSyncPayload>
  if (doc.format !== 'excalidraw-json' || typeof doc.body !== 'string') {
    return null
  }
  return { format: 'excalidraw-json', body: doc.body }
}

export function serializeCurrentScene(
  api: ExcalidrawImperativeAPI,
  options?: { normalizeCamera?: boolean },
): WhiteboardSyncPayload | null {
  try {
    const elements = api.getSceneElementsIncludingDeleted()
    const appState = api.getAppState()
    const files = api.getFiles()
    const stateForSave = options?.normalizeCamera
      ? {
          ...appState,
          zoom: { value: 1 as never },
          scrollX: 0,
          scrollY: 0,
        }
      : appState
    const body = serializeAsJSON(elements, stateForSave as typeof appState, files, 'database')
    return { format: 'excalidraw-json', body }
  } catch {
    return null
  }
}

/** Stable comparison key — ignores volatile appState / serialization ordering noise. */
export function sceneContentFingerprint(body: string): string {
  if (!body) return ''
  try {
    const parsed = JSON.parse(body) as { elements?: Array<Record<string, unknown>> }
    const elements = parsed.elements ?? []
    const slim = elements
      .filter((element) => element.isDeleted !== true)
      .map((element) => ({
        id: String(element.id ?? ''),
        version: Number(element.version ?? 0),
        versionNonce: Number(element.versionNonce ?? 0),
        type: String(element.type ?? ''),
      }))
      .sort((a, b) => a.id.localeCompare(b.id))
    return JSON.stringify(slim)
  } catch {
    return body
  }
}

export function applyWhiteboardPayload(
  api: ExcalidrawImperativeAPI,
  payload: WhiteboardSyncPayload | null,
  options: {
    viewBackgroundColor: string
    gridModeEnabled: boolean
    viewModeEnabled: boolean
    /** When set (document presentation), force camera so annotations track the page. */
    camera?: { zoom: number; scrollX: number; scrollY: number }
  },
): string | null {
  const cameraAppState = options.camera
    ? {
        zoom: { value: options.camera.zoom as never },
        scrollX: options.camera.scrollX,
        scrollY: options.camera.scrollY,
      }
    : null

  if (!payload?.body) {
    api.updateScene({
      elements: [],
      appState: {
        viewBackgroundColor: options.viewBackgroundColor,
        gridModeEnabled: options.gridModeEnabled,
        viewModeEnabled: options.viewModeEnabled,
        ...cameraAppState,
      } as never,
      captureUpdate: CaptureUpdateAction.NEVER,
    })
    return ''
  }

  try {
    const parsed = JSON.parse(payload.body) as Parameters<typeof restore>[0]
    const restored = restore(parsed, null, null)
    const { viewModeEnabled: _viewMode, zenModeEnabled: _zenMode, ...restAppState } = restored.appState
    api.updateScene({
      elements: restored.elements,
      appState: {
        ...restAppState,
        viewBackgroundColor: options.viewBackgroundColor,
        gridModeEnabled: options.gridModeEnabled,
        viewModeEnabled: options.viewModeEnabled,
        zenModeEnabled: false,
        // Presentation camera wins over whatever was baked into the page scene.
        ...cameraAppState,
      } as never,
      captureUpdate: CaptureUpdateAction.NEVER,
    })
    if (restored.files && Object.keys(restored.files).length > 0) {
      api.addFiles(Object.values(restored.files))
    }
    return payload.body
  } catch {
    api.updateScene({
      elements: [],
      appState: {
        viewBackgroundColor: options.viewBackgroundColor,
        gridModeEnabled: options.gridModeEnabled,
        viewModeEnabled: options.viewModeEnabled,
        ...cameraAppState,
      } as never,
      captureUpdate: CaptureUpdateAction.NEVER,
    })
    return null
  }
}
