import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { randomUUID } from 'node:crypto'
import type { Response } from 'express'
import { RoomSyncService } from '../sync/room-sync.service'
import { RECORDING_CHANNEL, type RecordingLibraryEntry, type RecordingSyncPayload } from './recording.types'

@Injectable()
export class RecordingService {
  private readonly logger = new Logger(RecordingService.name)
  private readonly recorderBaseUrl =
    process.env.RECORDER_SERVICE_URL?.trim()?.replace(/\/$/, '') || 'http://meet-recorder:4000'

  constructor(private readonly roomSyncService: RoomSyncService) {}

  async getState(roomId: string): Promise<RecordingSyncPayload | null> {
    const raw = await this.roomSyncService.getChannel(roomId, RECORDING_CHANNEL)
    if (!raw) return null
    return raw as RecordingSyncPayload
  }

  async start(roomId: string, hostUserId: string): Promise<RecordingSyncPayload> {
    const existing = await this.getState(roomId)
    if (existing?.active && existing.status === 'recording') {
      throw new Error('Recording is already active for this room')
    }
    if (existing?.active && existing.status === 'starting') {
      this.logger.warn(`Replacing stale starting recording state for room ${roomId}`)
    }

    const recordingId = randomUUID()
    const startedAt = new Date().toISOString()
    const pending: RecordingSyncPayload = {
      active: true,
      recordingId,
      startedAt,
      startedBy: hostUserId,
      status: 'starting',
      stoppedAt: null,
      outputPath: null,
      error: null,
    }
    await this.roomSyncService.setChannel(roomId, RECORDING_CHANNEL, pending)

    try {
      const res = await fetch(`${this.recorderBaseUrl}/api/recordings/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomId, hostUserId, recordingId }),
      })
      const body = (await res.json()) as { ok?: boolean; error?: string }
      if (!res.ok || !body.ok) {
        throw new Error(body.error || `Recorder service error (${res.status})`)
      }

      const active: RecordingSyncPayload = { ...pending, status: 'recording' }
      await this.roomSyncService.setChannel(roomId, RECORDING_CHANNEL, active)
      return active
    } catch (err) {
      const failed: RecordingSyncPayload = {
        active: false,
        recordingId,
        startedAt,
        startedBy: hostUserId,
        stoppedAt: new Date().toISOString(),
        status: 'failed',
        error: String(err),
        outputPath: null,
      }
      await this.roomSyncService.setChannel(roomId, RECORDING_CHANNEL, failed)
      this.logger.error(`start recording failed for ${roomId}: ${String(err)}`)
      throw err
    }
  }

  async stop(roomId: string): Promise<RecordingSyncPayload> {
    const existing = await this.getState(roomId)
    if (!existing?.active || !existing.recordingId) {
      throw new Error('No active recording for this room')
    }

    const stopping: RecordingSyncPayload = {
      ...existing,
      status: 'stopping',
    }
    await this.roomSyncService.setChannel(roomId, RECORDING_CHANNEL, stopping)

    try {
      const res = await fetch(
        `${this.recorderBaseUrl}/api/recordings/${encodeURIComponent(existing.recordingId)}/stop`,
        { method: 'POST' },
      )
      const body = (await res.json()) as {
        ok?: boolean
        error?: string
        recording?: { outputPath?: string; error?: string; status?: string }
      }
      if (!res.ok || !body.ok) {
        throw new Error(body.error || `Recorder stop failed (${res.status})`)
      }

      const completed: RecordingSyncPayload = {
        active: false,
        recordingId: existing.recordingId,
        startedAt: existing.startedAt,
        startedBy: existing.startedBy,
        stoppedAt: new Date().toISOString(),
        status: body.recording?.status === 'failed' ? 'failed' : 'completed',
        outputPath: body.recording?.outputPath ?? null,
        error: body.recording?.error ?? null,
      }
      await this.roomSyncService.setChannel(roomId, RECORDING_CHANNEL, completed)
      return completed
    } catch (err) {
      const failed: RecordingSyncPayload = {
        ...existing,
        active: false,
        stoppedAt: new Date().toISOString(),
        status: 'failed',
        error: String(err),
      }
      await this.roomSyncService.setChannel(roomId, RECORDING_CHANNEL, failed)
      throw err
    }
  }

  async listLibrary(): Promise<RecordingLibraryEntry[]> {
    const res = await fetch(`${this.recorderBaseUrl}/api/recordings/library`)
    const body = (await res.json()) as { ok?: boolean; recordings?: RecordingLibraryEntry[]; error?: string }
    if (!res.ok || !body.ok) {
      throw new Error(body.error || `Recorder library failed (${res.status})`)
    }
    return body.recordings ?? []
  }

  /**
   * Legacy `/recordings/:id/file` — 302 to nginx `/static/recordings/:id`
   * (nginx try_files picks .webm / .mp4). Avoids proxying the video body through Nest.
   */
  async redirectRecordingFile(recordingId: string, res: Response): Promise<void> {
    const id = recordingId.trim()
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) {
      throw new NotFoundException('Recording file not found')
    }
    res.redirect(302, `/static/recordings/${encodeURIComponent(id)}`)
  }
}
