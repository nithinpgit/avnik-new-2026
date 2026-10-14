import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import { createServer } from 'node:http'
import { Server as SocketIOServer, type Socket } from 'socket.io'
import { parseCredentialsFromHandshake, type MediaTokenPayload } from './auth.js'
import { config } from './config.js'
import { logger } from './logger.js'
import { RoomManager } from './roomManager.js'
import { handleClientMessage } from './signaling.js'

type MediaSocketData = MediaTokenPayload

export async function startServer(): Promise<void> {
  const roomManager = new RoomManager()

  const app = express()
  app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }))
  app.use(cors({ origin: true, credentials: true }))
  app.use(express.json({ limit: '512kb' }))

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok', service: 'meet-mediaserver', ts: new Date().toISOString() })
  })

  const httpServer = createServer(app)

  const io = new SocketIOServer(httpServer, {
    path: config.socketIoPath,
    cors: { origin: true, credentials: true },
    transports: ['websocket', 'polling'],
    pingInterval: 25_000,
    pingTimeout: 120_000,
    allowEIO3: true,
  })

  io.use((socket, next) => {
    try {
      const payload = parseCredentialsFromHandshake(socket.handshake)
      if (!payload) {
        logger.warn({ id: socket.id }, 'socket.io rejected: missing credentials')
        next(new Error('Unauthorized'))
        return
      }
      ;(socket.data as MediaSocketData) = payload
      next()
    } catch (err) {
      logger.warn({ err: String(err), id: socket.id }, 'socket.io rejected: invalid credentials')
      next(new Error('Unauthorized'))
    }
  })

  io.on('connection', async (socket: Socket) => {
    const { roomId, peerId, name } = socket.data as MediaSocketData
    const room = await roomManager.getOrCreateRoom(roomId)

    const send = (payload: Record<string, unknown>) => {
      socket.emit('media', payload)
    }

    room.addPeer(peerId, name ?? peerId, send)

    socket.emit('media', { t: 'ready', ok: true, data: { roomId, peerId } })

    socket.on('media', (raw: unknown) => {
      void handleClientMessage(room, peerId, raw, send).catch((e) => {
        logger.warn({ err: String(e), peerId }, 'media message failed')
        send({ t: 'error', ok: false, error: 'media handler failed' })
      })
    })

    socket.on('disconnect', (reason) => {
      logger.info({ roomId, peerId, reason }, 'mediasoup socket disconnected')
      room.removePeer(peerId)
    })
  })

  await new Promise<void>((resolve, reject) => {
    httpServer.listen(config.httpPort, '0.0.0.0', () => resolve())
    httpServer.on('error', reject)
  })

  logger.info(
    {
      port: config.httpPort,
      socketIoPath: config.socketIoPath,
      announcedIps: config.announcedIps,
      turnUrls: config.iceServers.flatMap((s) => (Array.isArray(s.urls) ? s.urls : [s.urls])),
    },
    'meet-mediaserver listening',
  )
}
