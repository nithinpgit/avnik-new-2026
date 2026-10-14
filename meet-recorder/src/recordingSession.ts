import { existsSync } from 'node:fs'
import { mkdir } from 'node:fs/promises'
import { join } from 'node:path'
import puppeteer, { type Browser, type Page } from 'puppeteer-core'
import { config } from './config.js'
import {
  finalizeRecordingDir,
  readChunkSequence,
  writeRecordingMeta,
} from './chunkMerger.js'
import { logger } from './logger.js'

export type RecordingStatus =
  | 'starting'
  | 'waiting_ready'
  | 'recording'
  | 'stopping'
  | 'completed'
  | 'failed'

export type RecordingSessionInfo = {
  recordingId: string
  roomId: string
  hostUserId: string
  status: RecordingStatus
  startedAt: string
  stoppedAt?: string
  error?: string
  outputPath?: string
  outputSizeBytes?: number
  chunkCount: number
}

function resolveChromePath(): string {
  if (config.chromeExecutablePath) {
    return config.chromeExecutablePath
  }
  const candidates = [
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
    '/usr/bin/google-chrome-stable',
    '/usr/bin/google-chrome',
  ]
  for (const path of candidates) {
    if (existsSync(path)) {
      return path
    }
  }
  return candidates[0]
}

function resolveChromeLaunchArgs(): string[] {
  return [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage',
    '--autoplay-policy=no-user-gesture-required',
    '--disable-background-timer-throttling',
    '--disable-backgrounding-occluded-windows',
    '--disable-renderer-backgrounding',
    '--window-size=1920,1080',
    '--disable-gpu',
    '--no-first-run',
    '--no-zygote',
  ]
}

function resolveChromeLaunchEnv(): NodeJS.ProcessEnv {
  return {
    ...process.env,
    DBUS_SESSION_BUS_ADDRESS: process.env.DBUS_SESSION_BUS_ADDRESS ?? 'disabled:',
    HOME: process.env.HOME ?? '/tmp',
  }
}

/** Skip mediaWs when Puppeteer can reach SFU via meet-frontend same-origin paths. */
function shouldEmbedMediaWsInRecordUrl(): boolean {
  if (!config.mediaPublicWsUrl) return false
  try {
    const frontendHost = new URL(config.frontendUrl).hostname
    return frontendHost !== 'meet-frontend'
  } catch {
    return Boolean(config.mediaPublicWsUrl)
  }
}

function meetRecordPageBase(frontendUrl: string): string {
  const base = frontendUrl.replace(/\/$/, '')
  if (base.endsWith('/join')) {
    return `${base}/record`
  }
  return `${base}/join/record`
}

function buildRecordUrl(input: {
  roomId: string
  recordingId: string
  userId: string
}): string {
  const params = new URLSearchParams({
    rm: input.roomId,
    userId: input.userId,
    name: 'Recorder',
    mode: 'recorder',
    recordingId: input.recordingId,
    recorderApi: config.recorderPublicUrl,
    autoJoin: '1',
  })
  if (shouldEmbedMediaWsInRecordUrl()) {
    params.set('mediaWs', config.mediaPublicWsUrl)
  }
  return `${meetRecordPageBase(config.frontendUrl)}?${params.toString()}`
}

export class RecordingSession {
  readonly recordingId: string
  readonly roomId: string
  readonly hostUserId: string
  readonly recorderUserId: string
  readonly startedAt = new Date().toISOString()
  readonly recordingDir: string

  private status: RecordingStatus = 'starting'
  private browser: Browser | null = null
  private page: Page | null = null
  private chunkCount = 0
  private error: string | undefined
  private outputPath: string | undefined
  private outputSizeBytes: number | undefined
  private stoppedAt: string | undefined
  private stopRequested = false

  constructor(input: { recordingId: string; roomId: string; hostUserId: string }) {
    this.recordingId = input.recordingId
    this.roomId = input.roomId
    this.hostUserId = input.hostUserId
    this.recorderUserId = `recorder-${input.recordingId}`
    this.recordingDir = join(config.storageDir, 'recordings', input.recordingId)
  }

  getRecordingDir(): string {
    return this.recordingDir
  }

  getInfo(): RecordingSessionInfo {
    return {
      recordingId: this.recordingId,
      roomId: this.roomId,
      hostUserId: this.hostUserId,
      status: this.status,
      startedAt: this.startedAt,
      stoppedAt: this.stoppedAt,
      error: this.error,
      outputPath: this.outputPath,
      outputSizeBytes: this.outputSizeBytes,
      chunkCount: this.chunkCount,
    }
  }

  noteChunkSaved(sequence: number, bytes: number): void {
    this.chunkCount = Math.max(this.chunkCount, sequence + 1)
    logger.info({ recordingId: this.recordingId, sequence, bytes }, 'chunk received')
  }

  async start(): Promise<void> {
    await mkdir(this.recordingDir, { recursive: true })
    await writeRecordingMeta(this.recordingDir, {
      recordingId: this.recordingId,
      roomId: this.roomId,
      hostUserId: this.hostUserId,
      recorderUserId: this.recorderUserId,
      startedAt: this.startedAt,
    })

    const recordUrl = buildRecordUrl({
      roomId: this.roomId,
      recordingId: this.recordingId,
      userId: this.recorderUserId,
    })

    logger.info({ recordingId: this.recordingId, recordUrl }, 'launching headless browser')

    try {
      this.browser = await puppeteer.launch({
        executablePath: resolveChromePath(),
        headless: true,
        env: resolveChromeLaunchEnv(),
        args: resolveChromeLaunchArgs(),
        defaultViewport: {
          width: config.viewportWidth,
          height: config.viewportHeight,
        },
      })

      this.page = await this.browser.newPage()
      await this.page.setUserAgent(
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
      )
      await this.page.setExtraHTTPHeaders({ 'Accept-Language': 'en-US,en;q=0.9' })

      await this.page.exposeFunction('__meetRecorderSignalReady', async () => {
        if (this.status === 'waiting_ready') {
          this.status = 'recording'
          logger.info({ recordingId: this.recordingId }, 'recorder page ready (MediaRecorder)')
        }
        return { ok: true }
      })

      await this.page.exposeFunction('__meetRecorderSignalError', async (message: string) => {
        this.error = message
        this.status = 'failed'
        logger.error({ recordingId: this.recordingId, message }, 'recorder page error')
        return { ok: true }
      })

      this.status = 'waiting_ready'

      this.page.on('pageerror', (err) => {
        logger.error({ recordingId: this.recordingId, err: String(err) }, 'page error')
      })

      this.page.on('console', (msg) => {
        const text = msg.text()
        if (text.includes('[recording]')) {
          logger.info({ recordingId: this.recordingId, text }, 'recorder page')
          return
        }
        if (msg.type() === 'error') {
          logger.warn({ recordingId: this.recordingId, text }, 'page console error')
        }
      })

      await this.page.goto(recordUrl, { waitUntil: 'domcontentloaded', timeout: config.readyTimeoutMs })

      await this.page.waitForFunction(
        () =>
          (window as unknown as { __MEET_RECORDING_STATUS__?: string }).__MEET_RECORDING_STATUS__ ===
          'recording',
        { timeout: config.readyTimeoutMs, polling: 500 },
      )

      if (this.status === 'waiting_ready') {
        this.status = 'recording'
      }

      logger.info({ recordingId: this.recordingId }, 'in-page MediaRecorder capture active')
    } catch (err) {
      let detail = String(err)
      if (this.page && !this.page.isClosed()) {
        try {
          const snapshot = await this.page.evaluate(() => {
            const w = window as unknown as {
              __MEET_RECORDING_STATUS__?: unknown
              __MEET_RECORDING_DEBUG__?: unknown
            }
            return {
              status: w.__MEET_RECORDING_STATUS__,
              debug: w.__MEET_RECORDING_DEBUG__,
              ui: document.querySelector('.recording-app__status')?.textContent?.trim() ?? null,
            }
          })
          detail = `${detail} | page=${JSON.stringify(snapshot)}`
        } catch {
          /* ignore snapshot errors */
        }
      }
      this.error = detail
      this.status = 'failed'
      logger.error({ recordingId: this.recordingId, err: detail }, 'recording session failed to start')
      await this.closeBrowser()
      throw err
    }
  }

  private async closeBrowser(): Promise<void> {
    try {
      if (this.browser) {
        await this.browser.close()
      }
    } catch {
      /* ignore */
    } finally {
      this.browser = null
      this.page = null
    }
  }

  async stop(): Promise<RecordingSessionInfo> {
    if (this.status === 'completed' || this.status === 'failed') {
      return this.getInfo()
    }

    this.stopRequested = true
    this.status = 'stopping'
    this.stoppedAt = new Date().toISOString()

    try {
      if (this.page && !this.page.isClosed()) {
        await this.page.evaluate(async () => {
          const stop = (window as unknown as { __MEET_STOP_RECORDING__?: () => Promise<void> })
            .__MEET_STOP_RECORDING__
          if (stop) {
            await stop()
          }
        })
      }
    } catch (err) {
      logger.warn({ recordingId: this.recordingId, err: String(err) }, 'stop signal failed')
    }

    await this.closeBrowser()
    await new Promise((r) =>
      setTimeout(r, config.stopGraceMs > 0 ? Math.min(config.stopGraceMs, 5000) : 2000),
    )

    try {
      const nextSeq = await readChunkSequence(this.recordingDir)
      this.chunkCount = Math.max(this.chunkCount, nextSeq)
      if (this.chunkCount === 0) {
        throw new Error('No recording chunks were captured')
      }
      const merged = await finalizeRecordingDir(this.recordingDir, this.recordingId)
      if (merged.sizeBytes < 1024) {
        throw new Error(`Recording output too small (${merged.sizeBytes} bytes)`)
      }
      this.outputPath = merged.outputPath
      this.outputSizeBytes = merged.sizeBytes
      this.status = 'completed'
      await writeRecordingMeta(this.recordingDir, {
        ...this.getInfo(),
        outputPath: this.outputPath,
        outputSizeBytes: this.outputSizeBytes,
      })
      logger.info(
        { recordingId: this.recordingId, outputPath: this.outputPath, chunkCount: this.chunkCount },
        'recording completed',
      )
    } catch (err) {
      this.error = String(err)
      this.status = 'failed'
      logger.error({ recordingId: this.recordingId, err: this.error }, 'recording finalize failed')
    }

    return this.getInfo()
  }
}

export class RecordingManager {
  private readonly sessions = new Map<string, RecordingSession>()
  private readonly roomActive = new Map<string, string>()

  getSession(recordingId: string): RecordingSession | undefined {
    return this.sessions.get(recordingId)
  }

  getActiveRecordingIdForRoom(roomId: string): string | undefined {
    return this.roomActive.get(roomId)
  }

  listSessions(): RecordingSessionInfo[] {
    return [...this.sessions.values()].map((s) => s.getInfo())
  }

  async start(input: { recordingId: string; roomId: string; hostUserId: string }): Promise<RecordingSessionInfo> {
    if (this.sessions.size >= config.maxParallelRecordings) {
      throw new Error(`Maximum parallel recordings (${config.maxParallelRecordings}) reached`)
    }

    const existingRoomRecording = this.roomActive.get(input.roomId)
    if (existingRoomRecording) {
      const existing = this.sessions.get(existingRoomRecording)
      if (existing && ['starting', 'waiting_ready', 'recording'].includes(existing.getInfo().status)) {
        throw new Error(`Room ${input.roomId} already has an active recording`)
      }
    }

    const session = new RecordingSession(input)
    this.sessions.set(input.recordingId, session)
    this.roomActive.set(input.roomId, input.recordingId)

    void session.start().catch((err) => {
      logger.error({ recordingId: input.recordingId, err: String(err) }, 'recording session failed to start')
      this.sessions.delete(input.recordingId)
      this.roomActive.delete(input.roomId)
    })

    return session.getInfo()
  }

  async stop(recordingId: string): Promise<RecordingSessionInfo> {
    const session = this.sessions.get(recordingId)
    if (!session) {
      throw new Error(`Recording ${recordingId} not found`)
    }
    const info = await session.stop()
    this.roomActive.delete(info.roomId)
    return info
  }

  async stopForRoom(roomId: string): Promise<RecordingSessionInfo | null> {
    const recordingId = this.roomActive.get(roomId)
    if (!recordingId) return null
    return this.stop(recordingId)
  }
}

export const recordingManager = new RecordingManager()

export { puppeteer }
