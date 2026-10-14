import { forwardRef, Module } from '@nestjs/common'
import { SyncModule } from '../sync/sync.module'
import { RoomsModule } from '../rooms/rooms.module'
import { RecordingController } from './recording.controller'
import { RecordingsLibraryController } from './recordings-library.controller'
import { RecordingService } from './recording.service'

@Module({
  imports: [SyncModule, forwardRef(() => RoomsModule)],
  controllers: [RecordingController, RecordingsLibraryController],
  providers: [RecordingService],
  exports: [RecordingService],
})
export class RecordingModule {}
