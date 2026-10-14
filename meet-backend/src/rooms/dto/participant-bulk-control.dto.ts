import { IsIn, IsString, MaxLength, MinLength } from 'class-validator'
import type { ParticipantBulkControlAction } from '../../participant/participant-moderation.types'

const BULK_ACTIONS: ParticipantBulkControlAction[] = [
  'mute_all',
  'unmute_all',
  'disable_cam_all',
  'enable_cam_all',
]

export class ParticipantBulkControlDto {
  @IsString()
  @MinLength(1)
  @MaxLength(128)
  roomId!: string

  @IsString()
  @IsIn(BULK_ACTIONS)
  action!: ParticipantBulkControlAction
}
