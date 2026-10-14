import { IsBoolean, IsOptional, IsString, MaxLength, MinLength } from 'class-validator'

export class AdmissionActionDto {
  @IsString()
  @MinLength(1)
  @MaxLength(128)
  roomId!: string

  @IsString()
  @MinLength(1)
  @MaxLength(128)
  targetUserId!: string

  @IsOptional()
  @IsBoolean()
  block?: boolean
}

export class SetAutoAcceptAllDto {
  @IsString()
  @MinLength(1)
  @MaxLength(128)
  roomId!: string

  @IsBoolean()
  enabled!: boolean
}
