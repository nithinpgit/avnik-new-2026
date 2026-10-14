import { Controller, Get, Param, Res } from '@nestjs/common'
import type { Response } from 'express'
import { RecordingService } from './recording.service'

@Controller('recordings')
export class RecordingsLibraryController {
  constructor(private readonly recordingService: RecordingService) {}

  @Get('library')
  async listLibrary() {
    const recordings = await this.recordingService.listLibrary()
    return { ok: true, recordings }
  }

  @Get(':recordingId/file')
  async streamFile(@Param('recordingId') recordingId: string, @Res() res: Response) {
    await this.recordingService.redirectRecordingFile(recordingId, res)
  }
}
