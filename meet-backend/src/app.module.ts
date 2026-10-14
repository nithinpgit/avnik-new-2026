import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { httpRequestContextMiddleware } from './common/middleware/http-request-context.middleware'
import { ChatModule } from './chat/chat.module'
import { DatabaseModule } from './database/database.module'
import { HealthModule } from './health/health.module'
import { MediaModule } from './media/media.module'
import { MeetingModule } from './meeting/meeting.module'
import { FilesModule } from './files/files.module'
import { RecordingModule } from './recording/recording.module'
import { RoomsModule } from './rooms/rooms.module'
import { WaitingRoomModule } from './waiting-room/waiting-room.module'

@Module({
  imports: [
    DatabaseModule,
    HealthModule,
    MediaModule,
    MeetingModule,
    ChatModule,
    FilesModule,
    WaitingRoomModule,
    RecordingModule,
    RoomsModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(httpRequestContextMiddleware).forRoutes('*')
  }
}
