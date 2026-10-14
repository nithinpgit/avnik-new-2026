import { Logger } from '@nestjs/common'
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import { plainToInstance } from 'class-transformer'
import { validateSync } from 'class-validator'
import type { Server, Socket } from 'socket.io'
import { ChatService } from '../chat/chat.service'
import { ChatMarkReadDto } from '../chat/dto/chat-mark-read.dto'
import { ChatSendDto } from '../chat/dto/chat-send.dto'
import { MEETING_LIFECYCLE_CHANNEL } from '../meeting/meeting-lifecycle.types'
import { MeetingLifecycleService } from '../meeting/meeting-lifecycle.service'
import { RoomSyncDto } from '../sync/dto/room-sync.dto'
import { MAX_ROOM_SYNC_CHANNEL_BYTES, RoomSyncService } from '../sync/room-sync.service'
import { JoinRoomDto } from './dto/join-room.dto'
import { ParticipantControlDto } from './dto/participant-control.dto'
import { ParticipantBulkControlDto } from './dto/participant-bulk-control.dto'
import { WhiteboardPointerDto } from './dto/whiteboard-pointer.dto'
import { PrivateMeetingSignalDto } from './dto/private-meeting-signal.dto'
import { RecordingService } from '../recording/recording.service'
import { isRecorderPeer } from '../recording/recording.types'
import { BlockedUsersService } from '../waiting-room/blocked-users.service'
import { AdmissionActionDto, SetAutoAcceptAllDto } from '../waiting-room/dto/admission-action.dto'
import {
  WAITING_ROOM_CHANNEL,
  parseWaitingRoomPayload,
  type WaitingReason,
  type WaitingRoomSyncPayload,
} from '../waiting-room/waiting-room.types'
import type { Room, WaitingPeer } from './room'
import { RoomsService } from './rooms.service'
import {
  PARTICIPANT_MODERATION_CHANNEL,
  applyBulkModerationAction,
  applyModerationAction,
  moderationStateForUser,
  parseModerationPayload,
  type ParticipantBulkControlAction,
  type ParticipantControlAction,
} from '../participant/participant-moderation.types'

type SocketData = {
  roomId?: string
  userId?: string
  admitted?: boolean
}

@WebSocketGateway({
  cors: {
    origin: process.env.CORS_ORIGIN?.split(',').map((s) => s.trim()) ?? ['http://localhost:5173'],
    credentials: true,
  },
  transports: ['websocket', 'polling'],
})
export class RoomsGateway implements OnGatewayInit, OnGatewayDisconnect {
  private readonly logger = new Logger(RoomsGateway.name)

  @WebSocketServer()
  server!: Server

  constructor(
    private readonly roomsService: RoomsService,
    private readonly roomSyncService: RoomSyncService,
    private readonly meetingLifecycle: MeetingLifecycleService,
    private readonly chatService: ChatService,
    private readonly blockedUsersService: BlockedUsersService,
    private readonly recordingService: RecordingService,
  ) {}

  broadcastRoomSync(roomId: string, channel: string, payload: unknown): void {
    this.server.to(roomId).emit('room_sync', { channel, payload })
  }

  afterInit(server: Server) {
    server.use((socket, next) => {
      // Reserved for auth: socket.handshake.auth.token, signed cookies, etc.
      void socket.handshake.address
      next()
    })
  }

  handleDisconnect(client: Socket) {
    const data = client.data as SocketData
    const roomId = data.roomId
    if (!roomId) {
      return
    }
    const room = this.roomsService.getRoom(roomId)
    if (!room) {
      return
    }
    const left = room.removeBySocketId(client.id)
    room.removeWaitingBySocketId(client.id)
    void client.leave(roomId)
    this.roomsService.pruneEmpty(roomId)
    if (left && !isRecorderPeer(left.userId)) {
      client.to(roomId).emit('peer_left', { userId: left.userId })
      client.to(roomId).emit('whiteboard_pointer', { userId: left.userId, cleared: true })
      void this.emitRoomSnapshot(roomId)
    }
  }

  @SubscribeMessage('join_room')
  async joinRoom(@ConnectedSocket() client: Socket, @MessageBody() body: unknown): Promise<void> {
    const dto = plainToInstance(JoinRoomDto, body ?? {})
    const errors = validateSync(dto, { forbidUnknownValues: false })
    if (errors.length > 0) {
      client.emit('join_error', {
        message: 'Invalid join payload',
        details: errors.map((e) => ({ property: e.property, constraints: e.constraints })),
      })
      return
    }

    const prevRoomId = (client.data as SocketData).roomId
    if (prevRoomId && prevRoomId !== dto.roomId) {
      this.leaveRoomSocket(client, prevRoomId)
    }

    try {
      const blocked = await this.blockedUsersService.isBlocked(dto.roomId, dto.userId)
      if (blocked) {
        client.emit('join_error', {
          code: 'blocked',
          message: 'You are blocked for this room please contact host',
        })
        return
      }
    } catch (e) {
      this.logger.warn(`blocked check failed for ${dto.roomId}/${dto.userId}: ${String(e)}`)
    }

    const room = this.roomsService.joinRoom(dto.roomId)
    const existingPeer = room.peersByUserId.get(dto.userId)
    if (existingPeer) {
      if (existingPeer.socketId !== client.id) {
        this.server.sockets.sockets.get(existingPeer.socketId)?.disconnect(true)
      }
      await this.finalizeAdmission(client, dto, room)
      return
    }

    if (isRecorderPeer(dto.userId)) {
      if (!room.hasAdmittedHost()) {
        client.emit('join_error', {
          code: 'waiting_for_host',
          message: 'Meeting host must be present before recording can start',
        })
        return
      }
      await this.finalizeAdmission(client, dto, room)
      return
    }

    const canClaimHost =
      dto.role === 'host' && (room.hostUserId === null || room.hostUserId === dto.userId)
    if (canClaimHost) {
      await this.finalizeAdmission(client, dto, room)
      await this.processWaitingQueue(dto.roomId)
      return
    }

    const waitingRoom = await this.getWaitingRoomState(dto.roomId)
    if (!room.hasAdmittedHost()) {
      await this.placeInWaitingRoom(client, dto, room, 'waiting_for_host')
      return
    }

    if (waitingRoom.autoAcceptAll) {
      await this.finalizeAdmission(client, dto, room)
      return
    }

    const waiting = await this.placeInWaitingRoom(client, dto, room, 'waiting_for_admission')
    this.emitJoinRequestToHosts(dto.roomId, waiting)
  }

  @SubscribeMessage('admit_participant')
  async admitParticipant(@ConnectedSocket() client: Socket, @MessageBody() body: unknown): Promise<void> {
    const dto = plainToInstance(AdmissionActionDto, body ?? {})
    const errors = validateSync(dto, { forbidUnknownValues: false })
    if (errors.length > 0) {
      client.emit('admission_action_error', { message: 'Invalid admit payload' })
      return
    }
    if (!(await this.assertHost(client, dto.roomId))) return
    await this.admitWaitingUser(dto.roomId, dto.targetUserId, client)
  }

  @SubscribeMessage('deny_participant')
  async denyParticipant(@ConnectedSocket() client: Socket, @MessageBody() body: unknown): Promise<void> {
    const dto = plainToInstance(AdmissionActionDto, body ?? {})
    const errors = validateSync(dto, { forbidUnknownValues: false })
    if (errors.length > 0) {
      client.emit('admission_action_error', { message: 'Invalid deny payload' })
      return
    }
    const data = client.data as SocketData
    if (!(await this.assertHost(client, dto.roomId))) return
    await this.denyWaitingUser(dto.roomId, dto.targetUserId, false, data.userId)
  }

  @SubscribeMessage('block_participant')
  async blockParticipant(@ConnectedSocket() client: Socket, @MessageBody() body: unknown): Promise<void> {
    const dto = plainToInstance(AdmissionActionDto, body ?? {})
    const errors = validateSync(dto, { forbidUnknownValues: false })
    if (errors.length > 0) {
      client.emit('admission_action_error', { message: 'Invalid block payload' })
      return
    }
    const data = client.data as SocketData
    if (!(await this.assertHost(client, dto.roomId))) return
    await this.denyWaitingUser(dto.roomId, dto.targetUserId, dto.block === true, data.userId)
  }

  @SubscribeMessage('set_auto_accept_all')
  async setAutoAcceptAll(@ConnectedSocket() client: Socket, @MessageBody() body: unknown): Promise<void> {
    const dto = plainToInstance(SetAutoAcceptAllDto, body ?? {})
    const errors = validateSync(dto, { forbidUnknownValues: false })
    if (errors.length > 0) {
      client.emit('admission_action_error', { message: 'Invalid auto-accept payload' })
      return
    }
    if (!(await this.assertHost(client, dto.roomId))) return

    const payload: WaitingRoomSyncPayload = { autoAcceptAll: dto.enabled }
    try {
      await this.roomSyncService.setChannel(dto.roomId, WAITING_ROOM_CHANNEL, payload)
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Could not save auto-accept setting'
      client.emit('admission_action_error', { message: msg })
      return
    }

    this.server.to(dto.roomId).emit('room_sync', {
      channel: WAITING_ROOM_CHANNEL,
      payload,
    })

    if (dto.enabled) {
      await this.processWaitingQueue(dto.roomId)
    }
  }

  /**
   * Generic room document sync (whiteboard, future shared state). Persists to Redis and
   * broadcasts to other peers in the same Socket.IO room (excluding sender).
   */
  @SubscribeMessage('room_sync')
  async roomSync(@ConnectedSocket() client: Socket, @MessageBody() body: unknown): Promise<void> {
    const dto = plainToInstance(RoomSyncDto, body ?? {})
    const errors = validateSync(dto, { forbidUnknownValues: false })
    if (errors.length > 0) {
      client.emit('room_sync_error', {
        message: 'Invalid room_sync payload',
        details: errors.map((e) => ({ property: e.property, constraints: e.constraints })),
      })
      return
    }

    const data = client.data as SocketData
    if (!data.roomId || data.roomId !== dto.roomId) {
      client.emit('room_sync_error', { message: 'Must join_room before room_sync' })
      return
    }

    const size = Buffer.byteLength(JSON.stringify(dto.payload ?? null), 'utf8')
    if (size > MAX_ROOM_SYNC_CHANNEL_BYTES) {
      client.emit('room_sync_error', {
        message: `Payload exceeds max size (${MAX_ROOM_SYNC_CHANNEL_BYTES} bytes)`,
      })
      return
    }

    if (dto.channel === MEETING_LIFECYCLE_CHANNEL) {
      client.emit('room_sync_error', {
        message: 'meeting_lifecycle is server-controlled; use start_meeting',
      })
      return
    }

    if (dto.channel === WAITING_ROOM_CHANNEL) {
      client.emit('room_sync_error', {
        message: 'waiting_room is server-controlled; use set_auto_accept_all',
      })
      return
    }

    try {
      await this.roomSyncService.setChannel(dto.roomId, dto.channel, dto.payload)
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Persist failed'
      client.emit('room_sync_error', { message: msg })
      return
    }

    client.to(dto.roomId).emit('room_sync', {
      channel: dto.channel,
      payload: dto.payload,
    })
  }

  /** Ephemeral whiteboard pointer/laser updates — relay only, not persisted. */
  @SubscribeMessage('whiteboard_pointer')
  whiteboardPointer(@ConnectedSocket() client: Socket, @MessageBody() body: unknown): void {
    const dto = plainToInstance(WhiteboardPointerDto, body ?? {})
    const errors = validateSync(dto, { forbidUnknownValues: false })
    if (errors.length > 0) {
      return
    }

    const data = client.data as SocketData
    if (!data.roomId || data.roomId !== dto.roomId || !data.userId || data.admitted !== true) {
      return
    }

    client.to(dto.roomId).emit('whiteboard_pointer', {
      userId: data.userId,
      username: dto.username,
      pageKey: dto.pageKey,
      pointer: dto.pointer,
      button: dto.button,
    })
  }

  /** Ephemeral private-meeting handshake — relay only, not persisted. */
  @SubscribeMessage('private_meeting_signal')
  privateMeetingSignal(@ConnectedSocket() client: Socket, @MessageBody() body: unknown): void {
    const dto = plainToInstance(PrivateMeetingSignalDto, body ?? {})
    const errors = validateSync(dto, { forbidUnknownValues: false })
    if (errors.length > 0) {
      return
    }

    const data = client.data as SocketData
    if (!data.roomId || data.roomId !== dto.roomId || !data.userId || data.admitted !== true) {
      return
    }

    if (isRecorderPeer(data.userId)) {
      return
    }

    client.to(dto.roomId).emit('private_meeting_signal', {
      method: dto.method,
      receiverId: dto.receiverId,
      senderId: dto.senderId,
      senderName: dto.senderName,
    })
  }

  @SubscribeMessage('pause_meeting')
  async pauseMeeting(@ConnectedSocket() client: Socket, @MessageBody() body: unknown): Promise<void> {
    const data = client.data as SocketData
    const roomId = typeof body === 'object' && body !== null && 'roomId' in body
      ? String((body as { roomId: unknown }).roomId)
      : data.roomId
    if (!roomId || data.roomId !== roomId || !data.userId) {
      client.emit('meeting_error', { message: 'Must join_room before pause_meeting' })
      return
    }

    const room = this.roomsService.getRoom(roomId)
    if (!room) {
      client.emit('meeting_error', { message: 'Room not found' })
      return
    }

    if (room.hostUserId !== data.userId) {
      client.emit('meeting_error', { message: 'Only the host can pause the meeting' })
      return
    }

    try {
      const meeting = await this.meetingLifecycle.pauseMeeting(roomId, data.userId)
      this.broadcastMeetingLifecycle(roomId, meeting)
      this.logger.debug(`Meeting paused in ${roomId} by ${data.userId}`)
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Pause failed'
      client.emit('meeting_error', { message: msg })
    }
  }

  @SubscribeMessage('start_meeting')
  async startMeeting(@ConnectedSocket() client: Socket, @MessageBody() body: unknown): Promise<void> {
    const data = client.data as SocketData
    const roomId = typeof body === 'object' && body !== null && 'roomId' in body
      ? String((body as { roomId: unknown }).roomId)
      : data.roomId
    if (!roomId || data.roomId !== roomId || !data.userId) {
      client.emit('meeting_error', { message: 'Must join_room before start_meeting' })
      return
    }

    const room = this.roomsService.getRoom(roomId)
    if (!room) {
      client.emit('meeting_error', { message: 'Room not found' })
      return
    }

    if (room.hostUserId !== data.userId) {
      client.emit('meeting_error', { message: 'Only the host can start the meeting' })
      return
    }

    try {
      const meeting = await this.meetingLifecycle.startMeeting(roomId, data.userId)
      this.broadcastMeetingLifecycle(roomId, meeting)
      this.logger.debug(`Meeting started in ${roomId} by ${data.userId}`)
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Start failed'
      client.emit('meeting_error', { message: msg })
    }
  }

  @SubscribeMessage('end_meeting')
  async endMeeting(@ConnectedSocket() client: Socket, @MessageBody() body: unknown): Promise<void> {
    const data = client.data as SocketData
    const roomId =
      typeof body === 'object' && body !== null && 'roomId' in body
        ? String((body as { roomId: unknown }).roomId)
        : data.roomId
    if (!roomId || data.roomId !== roomId || !data.userId) {
      client.emit('meeting_error', { message: 'Must join_room before end_meeting' })
      return
    }

    const room = this.roomsService.getRoom(roomId)
    if (!room) {
      client.emit('meeting_error', { message: 'Room not found' })
      return
    }

    if (room.hostUserId !== data.userId) {
      client.emit('meeting_error', { message: 'Only the host can end the meeting' })
      return
    }

    try {
      const meeting = await this.meetingLifecycle.endMeeting(roomId, data.userId)
      this.broadcastMeetingLifecycle(roomId, meeting)
      try {
        const recording = await this.recordingService.getState(roomId)
        if (recording?.active) {
          const stopped = await this.recordingService.stop(roomId)
          this.server.to(roomId).emit('room_sync', {
            channel: 'recording',
            payload: stopped,
          })
        }
      } catch (e) {
        this.logger.warn(`auto-stop recording failed for ${roomId}: ${String(e)}`)
      }
      const redirectUrl = process.env.MEETING_REDIRECT_URL?.trim() || '/'
      this.server.to(roomId).emit('meeting_ended', { redirectUrl })
      this.logger.debug(`Meeting ended in ${roomId} by ${data.userId}`)
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'End meeting failed'
      client.emit('meeting_error', { message: msg })
    }
  }

  @SubscribeMessage('chat_send')
  async chatSend(@ConnectedSocket() client: Socket, @MessageBody() body: unknown): Promise<void> {
    const dto = plainToInstance(ChatSendDto, body ?? {})
    const errors = validateSync(dto, { forbidUnknownValues: false })
    if (errors.length > 0) {
      client.emit('chat_error', {
        message: 'Invalid chat_send payload',
        details: errors.map((e) => ({ property: e.property, constraints: e.constraints })),
      })
      return
    }

    const data = client.data as SocketData
    if (!data.roomId || data.roomId !== dto.roomId || !data.userId || data.admitted !== true) {
      client.emit('chat_error', { message: 'Must be admitted to the room before chat_send' })
      return
    }

    const room = this.roomsService.getRoom(dto.roomId)
    if (!room) {
      client.emit('chat_error', { message: 'Room not found' })
      return
    }

    const sender = room.peersByUserId.get(data.userId)
    if (!sender) {
      client.emit('chat_error', { message: 'Sender not in room' })
      return
    }

    if (dto.kind === 'private') {
      const recipient = room.peersByUserId.get(dto.recipientId!)
      if (!recipient) {
        client.emit('chat_error', { message: 'Recipient not in room' })
        return
      }
    }

    try {
      const message = await this.chatService.createMessage({
        roomId: dto.roomId,
        senderId: data.userId,
        senderName: sender.name,
        kind: dto.kind,
        recipientId: dto.recipientId ?? null,
        body: dto.body,
      })

      const payload = { message }
      if (dto.kind === 'public') {
        this.server.to(dto.roomId).emit('chat_message', payload)
      } else {
        this.emitChatToUsers(dto.roomId, [data.userId, dto.recipientId!], payload)
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Send failed'
      client.emit('chat_error', { message: msg })
    }
  }

  @SubscribeMessage('participant_bulk_control')
  async participantBulkControl(
    @ConnectedSocket() client: Socket,
    @MessageBody() body: unknown,
  ): Promise<void> {
    const dto = plainToInstance(ParticipantBulkControlDto, body ?? {})
    const errors = validateSync(dto, { forbidUnknownValues: false })
    if (errors.length > 0) {
      client.emit('participant_control_error', {
        message: 'Invalid participant_bulk_control payload',
        details: errors.map((e) => ({ property: e.property, constraints: e.constraints })),
      })
      return
    }

    const data = client.data as SocketData
    if (!data.roomId || data.roomId !== dto.roomId || !data.userId) {
      client.emit('participant_control_error', {
        message: 'Must join_room before participant_bulk_control',
      })
      return
    }

    const room = this.roomsService.getRoom(dto.roomId)
    if (!room) {
      client.emit('participant_control_error', { message: 'Room not found' })
      return
    }

    if (room.hostUserId !== data.userId) {
      client.emit('participant_control_error', { message: 'Only the host can control participants' })
      return
    }

    const participantIds = [...room.peersByUserId.keys()].filter(
      (id) =>
        !isRecorderPeer(id) &&
        id !== room.hostUserId &&
        room.peersByUserId.get(id)?.role !== 'host',
    )

    try {
      const currentRaw = await this.roomSyncService.getChannel(dto.roomId, PARTICIPANT_MODERATION_CHANNEL)
      const current = parseModerationPayload(currentRaw)
      const next = applyBulkModerationAction(current, dto.action, participantIds)
      await this.roomSyncService.setChannel(dto.roomId, PARTICIPANT_MODERATION_CHANNEL, next)
      this.server.to(dto.roomId).emit('room_sync', {
        channel: PARTICIPANT_MODERATION_CHANNEL,
        payload: next,
      })
      this.emitBulkMediaPolicies(dto.roomId, next, dto.action)
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Bulk control failed'
      client.emit('participant_control_error', { message: msg })
    }
  }

  @SubscribeMessage('participant_control')
  async participantControl(
    @ConnectedSocket() client: Socket,
    @MessageBody() body: unknown,
  ): Promise<void> {
    const dto = plainToInstance(ParticipantControlDto, body ?? {})
    const errors = validateSync(dto, { forbidUnknownValues: false })
    if (errors.length > 0) {
      client.emit('participant_control_error', {
        message: 'Invalid participant_control payload',
        details: errors.map((e) => ({ property: e.property, constraints: e.constraints })),
      })
      return
    }

    const data = client.data as SocketData
    if (!data.roomId || data.roomId !== dto.roomId || !data.userId) {
      client.emit('participant_control_error', { message: 'Must join_room before participant_control' })
      return
    }

    const room = this.roomsService.getRoom(dto.roomId)
    if (!room) {
      client.emit('participant_control_error', { message: 'Room not found' })
      return
    }

    if (room.hostUserId !== data.userId) {
      client.emit('participant_control_error', { message: 'Only the host can control participants' })
      return
    }

    const target = room.peersByUserId.get(dto.targetUserId)
    if (!target) {
      client.emit('participant_control_error', { message: 'Participant not in room' })
      return
    }

    if (dto.targetUserId === data.userId) {
      client.emit('participant_control_error', { message: 'Cannot control yourself' })
      return
    }

    if (target.role === 'host') {
      client.emit('participant_control_error', { message: 'Cannot control the meeting host' })
      return
    }

    if (dto.action === 'kick') {
      await this.kickParticipant(dto.roomId, dto.targetUserId, client)
      return
    }

    try {
      const currentRaw = await this.roomSyncService.getChannel(dto.roomId, PARTICIPANT_MODERATION_CHANNEL)
      const current = parseModerationPayload(currentRaw)
      const next = applyModerationAction(current, dto.targetUserId, dto.action)
      await this.roomSyncService.setChannel(dto.roomId, PARTICIPANT_MODERATION_CHANNEL, next)
      this.server.to(dto.roomId).emit('room_sync', {
        channel: PARTICIPANT_MODERATION_CHANNEL,
        payload: next,
      })
      this.emitParticipantMediaCommand(dto.roomId, dto.targetUserId, dto.action, next)
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Control failed'
      client.emit('participant_control_error', { message: msg })
    }
  }

  private emitParticipantMediaCommand(
    roomId: string,
    targetUserId: string,
    action: ParticipantControlAction,
    moderation: ReturnType<typeof parseModerationPayload>,
  ) {
    const room = this.roomsService.getRoom(roomId)
    const target = room?.peersByUserId.get(targetUserId)
    if (!target) return

    if (
      action === 'mute_mic' ||
      action === 'unmute_mic' ||
      action === 'disable_cam' ||
      action === 'enable_cam'
    ) {
      const resolved = moderationStateForUser(
        moderation,
        targetUserId,
        room?.hostUserId ?? null,
      )
      const payload: { micAllowed?: boolean; camAllowed?: boolean } = {}
      if (action === 'mute_mic' || action === 'unmute_mic') {
        payload.micAllowed = resolved.micAllowed
      } else if (action === 'disable_cam' || action === 'enable_cam') {
        payload.camAllowed = resolved.camAllowed
      }
      this.server.to(target.socketId).emit('participant_media_policy', payload)
    }

    if (action === 'make_presenter' || action === 'revoke_presenter') {
      this.server.to(target.socketId).emit('presenter_power_changed', {
        isPresenter: action === 'make_presenter',
      })
    }
  }

  private emitBulkMediaPolicies(
    roomId: string,
    moderation: ReturnType<typeof parseModerationPayload>,
    _action: ParticipantBulkControlAction,
  ) {
    const room = this.roomsService.getRoom(roomId)
    if (!room) return

    const micAction = _action === 'mute_all' || _action === 'unmute_all'
    const camAction = _action === 'disable_cam_all' || _action === 'enable_cam_all'

    for (const [userId, peer] of room.peersByUserId) {
      if (isRecorderPeer(userId) || userId === room.hostUserId || peer.role === 'host') continue
      const resolved = moderationStateForUser(moderation, userId, room.hostUserId)
      this.server.to(peer.socketId).emit('participant_media_policy', {
        micAllowed: micAction ? resolved.micAllowed : undefined,
        camAllowed: camAction ? resolved.camAllowed : undefined,
      })
    }
  }

  private async applyModerationForJoiningPeer(
    roomId: string,
    userId: string,
    role: string,
  ): Promise<void> {
    if (role === 'host' || isRecorderPeer(userId)) return
    const room = this.roomsService.getRoom(roomId)
    if (!room) return
    const peer = room.peersByUserId.get(userId)
    if (!peer) return

    try {
      const currentRaw = await this.roomSyncService.getChannel(roomId, PARTICIPANT_MODERATION_CHANNEL)
      const current = parseModerationPayload(currentRaw)
      if (!current.muteAll && !current.camOffAll) return

      const resolved = moderationStateForUser(current, userId, room.hostUserId)
      this.server.to(peer.socketId).emit('participant_media_policy', {
        micAllowed: current.muteAll ? resolved.micAllowed : undefined,
        camAllowed: current.camOffAll ? resolved.camAllowed : undefined,
      })
    } catch {
      /* best-effort */
    }
  }

  private async kickParticipant(roomId: string, targetUserId: string, hostClient: Socket): Promise<void> {
    const room = this.roomsService.getRoom(roomId)
    if (!room) return

    const target = room.peersByUserId.get(targetUserId)
    if (!target) {
      hostClient.emit('participant_control_error', { message: 'Participant not in room' })
      return
    }

    try {
      const currentRaw = await this.roomSyncService.getChannel(roomId, PARTICIPANT_MODERATION_CHANNEL)
      const current = parseModerationPayload(currentRaw)
      const next = applyModerationAction(current, targetUserId, 'kick')
      await this.roomSyncService.setChannel(roomId, PARTICIPANT_MODERATION_CHANNEL, next)
      this.server.to(roomId).emit('room_sync', {
        channel: PARTICIPANT_MODERATION_CHANNEL,
        payload: next,
      })
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Kick failed'
      hostClient.emit('participant_control_error', { message: msg })
      return
    }

    this.server.to(target.socketId).emit('kicked_from_meeting', {
      message: 'You were removed from the meeting by the host.',
    })
    this.server.sockets.sockets.get(target.socketId)?.disconnect(true)
    room.removeByUserId(targetUserId)
    this.roomsService.pruneEmpty(roomId)
    hostClient.to(roomId).emit('peer_left', { userId: targetUserId })
    void this.emitRoomSnapshot(roomId)
  }

  @SubscribeMessage('chat_mark_read')
  async chatMarkRead(@ConnectedSocket() client: Socket, @MessageBody() body: unknown): Promise<void> {
    const dto = plainToInstance(ChatMarkReadDto, body ?? {})
    const errors = validateSync(dto, { forbidUnknownValues: false })
    if (errors.length > 0) {
      client.emit('chat_error', {
        message: 'Invalid chat_mark_read payload',
        details: errors.map((e) => ({ property: e.property, constraints: e.constraints })),
      })
      return
    }

    const data = client.data as SocketData
    if (!data.roomId || data.roomId !== dto.roomId || !data.userId) {
      client.emit('chat_error', { message: 'Must join_room before chat_mark_read' })
      return
    }

    const room = this.roomsService.getRoom(dto.roomId)
    const reader = room?.peersByUserId.get(data.userId)
    if (!reader) {
      client.emit('chat_error', { message: 'Reader not in room' })
      return
    }

    try {
      const result = await this.chatService.markRead({
        roomId: dto.roomId,
        userId: data.userId,
        userName: reader.name,
        messageIds: dto.messageIds,
      })
      if (result.messageIds.length === 0) return

      this.server.to(dto.roomId).emit('chat_read', {
        roomId: dto.roomId,
        messageIds: result.messageIds,
        userId: data.userId,
        userName: reader.name,
        readAt: result.readAt,
      })
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Mark read failed'
      client.emit('chat_error', { message: msg })
    }
  }

  private emitChatToUsers(roomId: string, userIds: string[], payload: unknown) {
    const room = this.roomsService.getRoom(roomId)
    if (!room) return
    const seen = new Set<string>()
    for (const uid of userIds) {
      if (seen.has(uid)) continue
      seen.add(uid)
      const peer = room.peersByUserId.get(uid)
      if (peer) {
        this.server.to(peer.socketId).emit('chat_message', payload)
      }
    }
  }

  private leaveRoomSocket(client: Socket, roomId: string) {
    const room = this.roomsService.getRoom(roomId)
    if (!room) {
      void client.leave(roomId)
      return
    }
    const left = room.removeBySocketId(client.id)
    room.removeWaitingBySocketId(client.id)
    void client.leave(roomId)
    this.roomsService.pruneEmpty(roomId)
    if (left && !isRecorderPeer(left.userId)) {
      client.to(roomId).emit('peer_left', { userId: left.userId })
      void this.emitRoomSnapshot(roomId)
    }
    delete (client.data as SocketData).roomId
    delete (client.data as SocketData).userId
  }

  private async getWaitingRoomState(roomId: string): Promise<WaitingRoomSyncPayload> {
    try {
      const raw = await this.roomSyncService.getChannel(roomId, WAITING_ROOM_CHANNEL)
      return parseWaitingRoomPayload(raw)
    } catch {
      return { autoAcceptAll: false }
    }
  }

  private async assertHost(client: Socket, roomId: string): Promise<boolean> {
    const data = client.data as SocketData
    if (!data.roomId || data.roomId !== roomId || !data.userId || data.admitted !== true) {
      client.emit('admission_action_error', { message: 'Must join room as host before this action' })
      return false
    }
    const room = this.roomsService.getRoom(roomId)
    if (!room || room.hostUserId !== data.userId) {
      client.emit('admission_action_error', { message: 'Only the host can manage admission' })
      return false
    }
    return true
  }

  private async placeInWaitingRoom(
    client: Socket,
    dto: JoinRoomDto,
    room: Room,
    reason: WaitingReason,
  ): Promise<WaitingPeer> {
    const previousWaiting = room.waitingByUserId.get(dto.userId)
    if (previousWaiting && previousWaiting.socketId !== client.id) {
      this.server.sockets.sockets.get(previousWaiting.socketId)?.disconnect(true)
    }

    void client.join(dto.roomId)
    ;(client.data as SocketData).roomId = dto.roomId
    ;(client.data as SocketData).userId = dto.userId
    ;(client.data as SocketData).admitted = false

    const waiting = room.upsertWaiting({
      userId: dto.userId,
      name: dto.name,
      profileImage: dto.profileImage ?? null,
      socketId: client.id,
      waitingReason: reason,
    })

    const message =
      reason === 'waiting_for_host'
        ? 'Please wait for the host to enter the meeting room'
        : 'Please wait for the host to accept you in the meeting room'

    client.emit('admission_pending', { message, reason })
    this.logger.debug(`User ${dto.userId} waiting in ${dto.roomId} (${reason})`)
    return waiting
  }

  private async finalizeAdmission(client: Socket, dto: JoinRoomDto, room: Room): Promise<void> {
    room.removeWaitingByUserId(dto.userId)

    const previous = room.peersByUserId.get(dto.userId)
    const { peer, roleAssigned } = room.upsertPeer({
      userId: dto.userId,
      name: dto.name,
      requestedRole: dto.role,
      profileImage: dto.profileImage ?? null,
      socketId: client.id,
    })
    if (previous && previous.socketId !== client.id) {
      this.server.sockets.sockets.get(previous.socketId)?.disconnect(true)
    }

    void client.join(dto.roomId)
    ;(client.data as SocketData).roomId = dto.roomId
    ;(client.data as SocketData).userId = dto.userId
    ;(client.data as SocketData).admitted = true

    const meeting = await this.meetingLifecycle.ensure(dto.roomId)
    client.emit('admission_granted', { peer: peer.toPublic() })
    client.emit('room_snapshot', room.snapshot(meeting))

    try {
      const states = await this.roomSyncService.getAllParsed(dto.roomId)
      client.emit('room_sync_bulk', { states })
    } catch (e) {
      this.logger.warn(`room_sync_bulk failed for ${dto.roomId}: ${String(e)}`)
      client.emit('room_sync_bulk', { states: {} })
    }

    if (roleAssigned !== dto.role) {
      client.emit('role_updated', { userId: dto.userId, role: roleAssigned })
    }

    if (!previous && !isRecorderPeer(dto.userId)) {
      client.to(dto.roomId).emit('peer_joined', { peer: peer.toPublic() })
    }

    void this.applyModerationForJoiningPeer(dto.roomId, dto.userId, peer.role)
    this.logger.debug(`Socket ${client.id} admitted to ${dto.roomId} as ${dto.userId}`)
  }

  private async admitWaitingUser(
    roomId: string,
    targetUserId: string,
    hostClient?: Socket,
  ): Promise<void> {
    const room = this.roomsService.getRoom(roomId)
    if (!room) {
      hostClient?.emit('admission_action_error', { message: 'Room not found' })
      return
    }

    const waiting = room.waitingByUserId.get(targetUserId)
    if (!waiting) {
      hostClient?.emit('admission_action_error', { message: 'Participant is not waiting for admission' })
      return
    }

    const targetSocket = this.server.sockets.sockets.get(waiting.socketId)
    if (!targetSocket) {
      room.removeWaitingByUserId(targetUserId)
      hostClient?.emit('admission_action_error', { message: 'Waiting participant disconnected' })
      return
    }

    await this.finalizeAdmission(
      targetSocket,
      {
        roomId,
        userId: waiting.userId,
        name: waiting.name,
        role: 'participant',
        profileImage: waiting.profileImage,
      },
      room,
    )
    hostClient?.emit('admission_action_ok', { targetUserId, action: 'admit' })
  }

  private async denyWaitingUser(
    roomId: string,
    targetUserId: string,
    block: boolean,
    hostUserId?: string,
  ): Promise<void> {
    const room = this.roomsService.getRoom(roomId)
    if (!room) return

    if (block) {
      try {
        await this.blockedUsersService.blockUser(roomId, targetUserId, hostUserId)
      } catch (e) {
        this.logger.warn(`block user failed ${roomId}/${targetUserId}: ${String(e)}`)
      }
    }

    const waiting = room.removeWaitingByUserId(targetUserId)
    const admittedPeer = room.peersByUserId.get(targetUserId)
    const targetSocketId = waiting?.socketId ?? admittedPeer?.socketId
    if (!targetSocketId) return

    const targetSocket = this.server.sockets.sockets.get(targetSocketId)
    const message = block
      ? 'You are blocked for this room please contact host'
      : 'The host has denied you access to the meeting room'

    if (admittedPeer && !waiting) {
      targetSocket?.emit('kicked_from_meeting', { message })
    } else {
      targetSocket?.emit('admission_denied', { message, blocked: block })
    }
    targetSocket?.disconnect(true)

    if (admittedPeer) {
      room.removeByUserId(targetUserId)
      this.roomsService.pruneEmpty(roomId)
      this.server.to(roomId).emit('peer_left', { userId: targetUserId })
      void this.emitRoomSnapshot(roomId)
    }
  }

  private emitJoinRequestToHosts(roomId: string, waiting: WaitingPeer): void {
    const room = this.roomsService.getRoom(roomId)
    if (!room) return

    const payload = {
      userId: waiting.userId,
      name: waiting.name,
      profileImage: waiting.profileImage,
    }

    for (const [userId, peer] of room.peersByUserId) {
      if (userId === room.hostUserId || peer.role === 'host') {
        this.server.to(peer.socketId).emit('join_request', payload)
      }
    }
  }

  private async processWaitingQueue(roomId: string): Promise<void> {
    const room = this.roomsService.getRoom(roomId)
    if (!room?.hasAdmittedHost()) return

    const state = await this.getWaitingRoomState(roomId)

    for (const [userId, waiting] of [...room.waitingByUserId.entries()]) {
      const targetSocket = this.server.sockets.sockets.get(waiting.socketId)
      if (!targetSocket) {
        room.removeWaitingByUserId(userId)
        continue
      }

      if (waiting.waitingReason === 'waiting_for_host') {
        waiting.waitingReason = 'waiting_for_admission'
      }

      if (state.autoAcceptAll) {
        await this.admitWaitingUser(roomId, userId)
        continue
      }

      targetSocket.emit('admission_pending', {
        message: 'Please wait for the host to accept you in the meeting room',
        reason: 'waiting_for_admission',
      })
      this.emitJoinRequestToHosts(roomId, waiting)
    }
  }

  private async emitRoomSnapshot(roomId: string): Promise<void> {
    const room = this.roomsService.getRoom(roomId)
    if (!room) return
    const meeting = await this.meetingLifecycle.get(roomId)
    this.server.to(roomId).emit('room_snapshot', room.snapshot(meeting))
  }

  private broadcastMeetingLifecycle(roomId: string, meeting: Awaited<ReturnType<MeetingLifecycleService['startMeeting']>>) {
    this.server.to(roomId).emit('meeting_lifecycle', { meeting })
    this.server.to(roomId).emit('room_sync', {
      channel: MEETING_LIFECYCLE_CHANNEL,
      payload: meeting,
    })
  }
}
