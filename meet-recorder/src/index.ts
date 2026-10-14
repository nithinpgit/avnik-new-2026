import cors from 'cors'
import express from 'express'
import multer from 'multer'
import { config } from './config.js'
import { isValidWebmInitChunk, MIN_WEBM_BYTES, readChunkSequence, writeChunk, writeRecordingMeta } from './chunkMerger.js'
import { listRecordingLibrary, streamRecordingFile } from './recordingLibrary.js'
import { logger } from './logger.js'
import { recordingManager } from './recordingSession.js'

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 64 * 1024 * 1024 } })

function param(value: string | string[]): string {
  return Array.isArray(value) ? value[0] : value
}

export function createApp() {
  const app = express()

  app.use(
    cors({
      origin: true,
      credentials: true,
      methods: ['GET', 'POST', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      maxAge: 86400,
    }),
  )
  app.options(/.*/, cors())

  app.use(express.json({ limit: '1mb' }))

  app.get('/health', (_req, res) => {
    res.json({
      status: 'ok',
      service: 'meet-recorder',
      activeSessions: recordingManager.listSessions().filter((s) =>
        ['starting', 'waiting_ready', 'recording', 'stopping'].includes(s.status),
      ).length,
      ts: new Date().toISOString(),
    })
  })

  app.post('/api/recordings/start', async (req, res) => {
    try {
      const roomId = String(req.body?.roomId ?? '').trim()
      const hostUserId = String(req.body?.hostUserId ?? '').trim()
      const recordingId = String(req.body?.recordingId ?? '').trim() || crypto.randomUUID()

      if (!roomId || !hostUserId) {
        res.status(400).json({ ok: false, error: 'roomId and hostUserId are required' })
        return
      }

      const info = await recordingManager.start({ recordingId, roomId, hostUserId })
      res.status(201).json({ ok: true, recording: info })
    } catch (err) {
      logger.warn({ err: String(err) }, 'start recording failed')
      res.status(409).json({ ok: false, error: String(err) })
    }
  })

  app.post('/api/recordings/:recordingId/stop', async (req, res) => {
    try {
      const recordingId = param(req.params.recordingId)
      const info = await recordingManager.stop(recordingId)
      res.json({ ok: true, recording: info })
    } catch (err) {
      res.status(404).json({ ok: false, error: String(err) })
    }
  })

  app.post('/api/recordings/stop-by-room', async (req, res) => {
    try {
      const roomId = String(req.body?.roomId ?? '').trim()
      if (!roomId) {
        res.status(400).json({ ok: false, error: 'roomId is required' })
        return
      }
      const info = await recordingManager.stopForRoom(roomId)
      if (!info) {
        res.status(404).json({ ok: false, error: 'No active recording for room' })
        return
      }
      res.json({ ok: true, recording: info })
    } catch (err) {
      res.status(500).json({ ok: false, error: String(err) })
    }
  })

  app.get('/api/recordings/library', async (_req, res) => {
    try {
      const recordings = await listRecordingLibrary(config.storageDir)
      res.json({ ok: true, recordings })
    } catch (err) {
      res.status(500).json({ ok: false, error: String(err) })
    }
  })

  app.get('/api/recordings/:recordingId/file', async (req, res) => {
    try {
      const recordingId = param(req.params.recordingId)
      const ok = await streamRecordingFile(config.storageDir, recordingId, req, res)
      if (!ok) {
        res.status(404).json({ ok: false, error: 'Recording file not found' })
      }
    } catch (err) {
      if (!res.headersSent) {
        res.status(500).json({ ok: false, error: String(err) })
      }
    }
  })

  app.get('/api/recordings/:recordingId', (req, res) => {
    const session = recordingManager.getSession(param(req.params.recordingId))
    if (!session) {
      res.status(404).json({ ok: false, error: 'Recording not found' })
      return
    }
    res.json({ ok: true, recording: session.getInfo() })
  })

  app.get('/api/recordings', (_req, res) => {
    res.json({ ok: true, recordings: recordingManager.listSessions() })
  })

  /** Fallback chunk upload from the recording page (when exposeFunction is unavailable). */
  app.post('/api/recordings/:recordingId/chunks', upload.single('chunk'), async (req, res) => {
    try {
      const recordingId = param(req.params.recordingId)
      const session = recordingManager.getSession(recordingId)
      if (!session) {
        res.status(404).json({ ok: false, error: 'Recording not found' })
        return
      }

      const seqRaw = req.body?.sequence ?? req.query.sequence
      const sequence = Number.parseInt(String(seqRaw ?? ''), 10)
      const buffer = req.file?.buffer
      if (!Number.isFinite(sequence) || sequence < 0 || !buffer?.length) {
        res.status(400).json({ ok: false, error: 'Invalid chunk payload' })
        return
      }

      await writeChunk(session.getRecordingDir(), sequence, buffer)
      res.json({ ok: true, sequence })
    } catch (err) {
      res.status(500).json({ ok: false, error: String(err) })
    }
  })

  app.post('/api/recordings/:recordingId/chunks/raw', express.raw({ type: '*/*', limit: '64mb' }), async (req, res) => {
    try {
      const recordingId = param(req.params.recordingId)
      const session = recordingManager.getSession(recordingId)
      const recordingDir = session?.getRecordingDir() ?? `${config.storageDir}/recordings/${recordingId}`

      const sequence = Number.parseInt(String(req.query.sequence ?? ''), 10)
      const buffer = Buffer.isBuffer(req.body) ? req.body : Buffer.from('')
      if (!Number.isFinite(sequence) || sequence < 0 || buffer.length === 0) {
        res.status(400).json({ ok: false, error: 'Invalid chunk payload' })
        return
      }

      if (buffer.length < MIN_WEBM_BYTES) {
        logger.warn({ recordingId, sequence, sizeBytes: buffer.length }, 'ignored tiny chunk')
        res.json({ ok: true, sequence, skipped: true })
        return
      }

      if (sequence === 0 && !isValidWebmInitChunk(buffer)) {
        logger.warn({ recordingId, sequence, sizeBytes: buffer.length }, 'ignored invalid init chunk')
        res.json({ ok: true, sequence, skipped: true })
        return
      }

      await writeChunk(recordingDir, sequence, buffer)
      session?.noteChunkSaved(sequence, buffer.length)
      await writeRecordingMeta(recordingDir, {
        lastChunkAt: new Date().toISOString(),
        lastSequence: sequence,
      })
      res.json({ ok: true, sequence })
    } catch (err) {
      res.status(500).json({ ok: false, error: String(err) })
    }
  })

  app.get('/api/recordings/:recordingId/next-sequence', async (req, res) => {
    const recordingId = param(req.params.recordingId)
    const recordingDir = `${config.storageDir}/recordings/${recordingId}`
    const next = await readChunkSequence(recordingDir)
    res.json({ ok: true, nextSequence: next })
  })

  return app
}

export function startServer() {
  const app = createApp()
  app.listen(config.port, '0.0.0.0', () => {
    logger.info(
      {
        port: config.port,
        storageDir: config.storageDir,
        frontendUrl: config.frontendUrl,
        maxParallel: config.maxParallelRecordings,
      },
      'meet-recorder listening',
    )
  })
}
