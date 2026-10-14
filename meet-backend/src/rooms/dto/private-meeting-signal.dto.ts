import { IsIn, IsString, MaxLength, MinLength } from 'class-validator'

export class PrivateMeetingSignalDto {
  @IsString()
  @MinLength(1)
  @MaxLength(128)
  roomId!: string

  @IsIn(['requestPvMeeting', 'rejectPvMeeting', 'acceptPvMeeting', 'stopPvMeeting'])
  method!: 'requestPvMeeting' | 'rejectPvMeeting' | 'acceptPvMeeting' | 'stopPvMeeting'

  @IsString()
  @MinLength(1)
  @MaxLength(128)
  receiverId!: string

  @IsString()
  @MinLength(1)
  @MaxLength(128)
  senderId!: string

  @IsString()
  @MinLength(1)
  @MaxLength(200)
  senderName!: string
}
