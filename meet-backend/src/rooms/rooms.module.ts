import { forwardRef, Module } from '@nestjs/common'
import { ChatModule } from '../chat/chat.module'
import { MeetingModule } from '../meeting/meeting.module'
import { SyncModule } from '../sync/sync.module'
import { RecordingModule } from '../recording/recording.module'
import { WaitingRoomModule } from '../waiting-room/waiting-room.module'
import { RoomsGateway } from './rooms.gateway'
import { RoomsService } from './rooms.service'

@Module({
  imports: [
    SyncModule,
    ChatModule,
    MeetingModule,
    WaitingRoomModule,
    forwardRef(() => RecordingModule),
  ],
  providers: [RoomsService, RoomsGateway],
  exports: [RoomsService, RoomsGateway],
})
export class RoomsModule {}
