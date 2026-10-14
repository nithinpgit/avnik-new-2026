import type { Socket } from 'socket.io-client'

type Pending = { resolve: (v: unknown) => void; reject: (e: Error) => void }

const MEDIA_EVENT = 'media'

export class MediaSignaling {
  private nextReq = 1
  private readonly pending = new Map<number, Pending>()
  private readonly pushListeners = new Set<(msg: Record<string, unknown>) => void>()

  constructor(private readonly socket: Socket) {
    this.socket.on(MEDIA_EVENT, this.onMessage)
  }

  dispose(): void {
    this.socket.off(MEDIA_EVENT, this.onMessage)
    this.pending.clear()
    this.pushListeners.clear()
  }

  onPush(cb: (msg: Record<string, unknown>) => void): () => void {
    this.pushListeners.add(cb)
    return () => {
      this.pushListeners.delete(cb)
    }
  }

  private readonly onMessage = (msg: Record<string, unknown>): void => {
    const req = msg.req as number | undefined
    if (req != null) {
      const p = this.pending.get(req)
      if (!p) return
      this.pending.delete(req)
      if (msg.ok === true) {
        p.resolve(msg.data)
      } else {
        p.reject(new Error(String(msg.error ?? 'media signaling error')))
      }
      return
    }
    if (msg.t === 'ready' || msg.t === 'pong') return
    this.pushListeners.forEach((l) => l(msg))
  }

  request(t: string, d?: unknown): Promise<unknown> {
    const req = this.nextReq++
    return new Promise((resolve, reject) => {
      this.pending.set(req, { resolve, reject })
      this.socket.emit(MEDIA_EVENT, { t, req, d })
    })
  }

  static waitReady(socket: Socket, timeoutMs = 15_000): Promise<void> {
    return new Promise((resolve, reject) => {
      const to = window.setTimeout(() => {
        socket.off(MEDIA_EVENT, onMedia)
        reject(new Error('media socket ready timeout'))
      }, timeoutMs)

      const onMedia = (msg: Record<string, unknown>) => {
        if (msg.t !== 'ready') return
        window.clearTimeout(to)
        socket.off(MEDIA_EVENT, onMedia)
        resolve()
      }

      socket.on(MEDIA_EVENT, onMedia)
    })
  }
}
