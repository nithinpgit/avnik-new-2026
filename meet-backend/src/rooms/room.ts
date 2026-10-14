import type { MeetingLifecycleState } from '../meeting/meeting-lifecycle.types'
import { isRecorderPeer } from '../recording/recording.types'
import type { WaitingReason } from '../waiting-room/waiting-room.types'
import { Peer, type MeetingRole, type PeerProps, type PeerPublicView } from './peer'

export type RoomSnapshot = {
  roomId: string
  peers: PeerPublicView[]
  meeting: MeetingLifecycleState
}

export type WaitingPeer = {
  userId: string
  name: string
  profileImage: string | null
  socketId: string
  waitingReason: WaitingReason
}

/**
 * One meeting room and its peers (in-memory).
 */
export class Room {
  readonly peersByUserId = new Map<string, Peer>()
  readonly waitingByUserId = new Map<string, WaitingPeer>()
  hostUserId: string | null = null

  constructor(readonly id: string) {}

  hasAdmittedHost(): boolean {
    if (!this.hostUserId) return false
    const host = this.peersByUserId.get(this.hostUserId)
    return host?.role === 'host'
  }

  /**
   * Registers or refreshes a peer. Enforces a single host per room.
   */
  upsertPeer(input: {
    userId: string
    name: string
    requestedRole: MeetingRole
    profileImage?: string | null
    socketId: string
  }): { peer: Peer; roleAssigned: MeetingRole } {
    let role: MeetingRole = input.requestedRole

    if (role === 'host') {
      if (this.hostUserId !== null && this.hostUserId !== input.userId) {
        role = 'participant'
      } else {
        this.hostUserId = input.userId
      }
    } else if (this.hostUserId === input.userId) {
      this.hostUserId = null
    }

    const props: PeerProps = {
      userId: input.userId,
      name: input.name,
      role,
      profileImage: input.profileImage ?? null,
      socketId: input.socketId,
    }
    const peer = new Peer(props)
    this.peersByUserId.set(input.userId, peer)
    return { peer, roleAssigned: role }
  }

  removeBySocketId(socketId: string): Peer | undefined {
    for (const [userId, peer] of this.peersByUserId) {
      if (peer.socketId === socketId) {
        this.peersByUserId.delete(userId)
        if (this.hostUserId === userId) {
          this.hostUserId = null
        }
        return peer
      }
    }
    return undefined
  }

  removeByUserId(userId: string): Peer | undefined {
    const peer = this.peersByUserId.get(userId)
    if (!peer) return undefined
    this.peersByUserId.delete(userId)
    if (this.hostUserId === userId) {
      this.hostUserId = null
    }
    return peer
  }

  upsertWaiting(input: {
    userId: string
    name: string
    profileImage?: string | null
    socketId: string
    waitingReason: WaitingReason
  }): WaitingPeer {
    const waiting: WaitingPeer = {
      userId: input.userId,
      name: input.name,
      profileImage: input.profileImage ?? null,
      socketId: input.socketId,
      waitingReason: input.waitingReason,
    }
    this.waitingByUserId.set(input.userId, waiting)
    return waiting
  }

  removeWaitingBySocketId(socketId: string): WaitingPeer | undefined {
    for (const [userId, waiting] of this.waitingByUserId) {
      if (waiting.socketId === socketId) {
        this.waitingByUserId.delete(userId)
        return waiting
      }
    }
    return undefined
  }

  removeWaitingByUserId(userId: string): WaitingPeer | undefined {
    const waiting = this.waitingByUserId.get(userId)
    if (!waiting) return undefined
    this.waitingByUserId.delete(userId)
    return waiting
  }

  snapshot(meeting: MeetingLifecycleState): RoomSnapshot {
    return {
      roomId: this.id,
      peers: [...this.peersByUserId.values()]
        .filter((p) => !isRecorderPeer(p.userId))
        .map((p) => p.toPublic()),
      meeting,
    }
  }
}
