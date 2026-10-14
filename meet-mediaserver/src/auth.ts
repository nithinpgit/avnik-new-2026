import jwt from 'jsonwebtoken'
import type { IncomingMessage } from 'node:http'
import type { Socket } from 'socket.io'
import { config } from './config.js'

export type MediaTokenPayload = {
  roomId: string
  peerId: string
  name?: string
}

/** @deprecated Native WebSocket query token — kept for reference during migration. */
export function parseTokenFromRequest(req: IncomingMessage): string | null {
  try {
    const host = req.headers.host ?? '127.0.0.1'
    const u = new URL(req.url ?? '/', `http://${host}`)
    return u.searchParams.get('token')
  } catch {
    return null
  }
}

export function parseTokenFromHandshake(handshake: Socket['handshake']): string | null {
  const authToken = handshake.auth?.token
  if (typeof authToken === 'string' && authToken.trim()) {
    return authToken.trim()
  }
  const queryToken = handshake.query?.token
  if (typeof queryToken === 'string' && queryToken.trim()) {
    return queryToken.trim()
  }
  if (Array.isArray(queryToken) && typeof queryToken[0] === 'string' && queryToken[0].trim()) {
    return queryToken[0].trim()
  }
  return null
}

export function parseCredentialsFromHandshake(handshake: Socket['handshake']): MediaTokenPayload | null {
  const auth = handshake.auth as Record<string, unknown> | undefined
  const roomId = auth?.roomId
  const peerId = auth?.peerId
  if (typeof roomId === 'string' && roomId.trim() && typeof peerId === 'string' && peerId.trim()) {
    return {
      roomId: roomId.trim(),
      peerId: peerId.trim(),
      name: typeof auth?.name === 'string' && auth.name.trim() ? auth.name.trim() : undefined,
    }
  }

  const token = parseTokenFromHandshake(handshake)
  if (!token) return null
  return verifyMediaToken(token)
}

export function verifyMediaToken(token: string): MediaTokenPayload {
  const decoded = jwt.verify(token, config.mediaJwtSecret)
  if (typeof decoded !== 'object' || decoded === null) {
    throw new Error('invalid token payload')
  }
  const { roomId, peerId, name } = decoded as Record<string, unknown>
  if (typeof roomId !== 'string' || typeof peerId !== 'string') {
    throw new Error('invalid token fields')
  }
  return { roomId, peerId, name: typeof name === 'string' ? name : undefined }
}
