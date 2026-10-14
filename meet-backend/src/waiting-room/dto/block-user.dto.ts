import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator'

export class BlockUserDto {
  @IsString()
  @MinLength(1)
  @MaxLength(128)
  userId!: string

  @IsOptional()
  @IsString()
  @MaxLength(128)
  blockedBy?: string
}
