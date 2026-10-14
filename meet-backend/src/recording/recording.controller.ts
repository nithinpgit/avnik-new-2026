import { Body, Controller, Get, Inject, Param, Post, forwardRef } from '@nestjs/common'
import { RoomsGateway } from '../rooms/rooms.gateway'
import { RECORDING_CHANNEL } from './recording.types'
import { RecordingService } from './recording.service'

@Controller('rooms/:roomId/recording')
export class RecordingController {
  constructor(
    private readonly recordingService: RecordingService,
    @Inject(forwardRef(() => RoomsGateway))
    private readonly roomsGateway: RoomsGateway,
  ) {}

  @Get()
  async getState(@Param('roomId') roomId: string) {
    const recording = await this.recordingService.getState(roomId)
    return { ok: true, recording }
  }

  @Post('start')
  async start(@Param('roomId') roomId: string, @Body() body: { hostUserId?: string }) {
    const hostUserId = body.hostUserId?.trim()
    if (!hostUserId) {
      return { ok: false, error: 'hostUserId is required' }
    }
    const recording = await this.recordingService.start(roomId, hostUserId)
    this.roomsGateway.broadcastRoomSync(roomId, RECORDING_CHANNEL, recording)
    return { ok: true, recording }
  }

  @Post('stop')
  async stop(@Param('roomId') roomId: string) {
    const recording = await this.recordingService.stop(roomId)
    this.roomsGateway.broadcastRoomSync(roomId, RECORDING_CHANNEL, recording)
    return { ok: true, recording }
  }
}
