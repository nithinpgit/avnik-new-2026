import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { validateSync } from 'class-validator'
import { BlockUserDto } from './dto/block-user.dto'
import { BlockedUsersService } from './blocked-users.service'

@Controller('rooms')
export class BlockedUsersController {
  constructor(private readonly blockedUsers: BlockedUsersService) {}

  @Post(':roomId/blocked-users')
  async blockUser(@Param('roomId') roomId: string, @Body() body: unknown) {
    const dto = plainToInstance(BlockUserDto, body ?? {})
    const errors = validateSync(dto, { forbidUnknownValues: false })
    if (errors.length > 0) {
      return { ok: false, message: 'Invalid payload' }
    }
    await this.blockedUsers.blockUser(roomId, dto.userId, dto.blockedBy)
    return { ok: true }
  }

  @Get(':roomId/blocked-users/check/:userId')
  async checkBlocked(@Param('roomId') roomId: string, @Param('userId') userId: string) {
    const blocked = await this.blockedUsers.isBlocked(roomId, userId)
    return {
      blocked,
      message: blocked ? 'You are blocked for this room please contact host' : null,
    }
  }

  @Get(':roomId/blocked-users')
  async listBlocked(@Param('roomId') roomId: string) {
    const rows = await this.blockedUsers.listBlocked(roomId)
    return {
      roomId,
      users: rows.map((r) => ({
        userId: r.userId,
        blockedBy: r.blockedBy,
        blockedAt: r.blockedAt.toISOString(),
      })),
    }
  }

  @Delete(':roomId/blocked-users/:userId')
  async unblockUser(@Param('roomId') roomId: string, @Param('userId') userId: string) {
    const removed = await this.blockedUsers.unblockUser(roomId, userId)
    return { ok: removed }
  }
}
