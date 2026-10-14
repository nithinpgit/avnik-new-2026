import { Type } from 'class-transformer'
import { IsIn, IsNumber, IsString, MaxLength, MinLength, ValidateNested } from 'class-validator'

class WhiteboardPointerCoordsDto {
  @IsNumber()
  x!: number

  @IsNumber()
  y!: number

  @IsIn(['pointer', 'laser'])
  tool!: 'pointer' | 'laser'
}

export class WhiteboardPointerDto {
  @IsString()
  @MinLength(1)
  @MaxLength(128)
  roomId!: string

  @IsString()
  @MinLength(1)
  @MaxLength(128)
  pageKey!: string

  @IsString()
  @MinLength(1)
  @MaxLength(200)
  username!: string

  @ValidateNested()
  @Type(() => WhiteboardPointerCoordsDto)
  pointer!: WhiteboardPointerCoordsDto

  @IsIn(['up', 'down'])
  button!: 'up' | 'down'
}
