import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { RoomBlockedUserEntity } from './entities/room-blocked-user.entity'

@Injectable()
export class BlockedUsersService {
  constructor(
    @InjectRepository(RoomBlockedUserEntity)
    private readonly repo: Repository<RoomBlockedUserEntity>,
  ) {}

  async isBlocked(roomId: string, userId: string): Promise<boolean> {
    const row = await this.repo.findOne({ where: { roomId, userId } })
    return row !== null
  }

  async blockUser(roomId: string, userId: string, blockedBy?: string): Promise<void> {
    const existing = await this.repo.findOne({ where: { roomId, userId } })
    if (existing) return
    await this.repo.save(
      this.repo.create({
        roomId,
        userId,
        blockedBy: blockedBy ?? null,
      }),
    )
  }

  async listBlocked(roomId: string): Promise<RoomBlockedUserEntity[]> {
    return this.repo.find({ where: { roomId }, order: { blockedAt: 'DESC' } })
  }

  async unblockUser(roomId: string, userId: string): Promise<boolean> {
    const result = await this.repo.delete({ roomId, userId })
    return (result.affected ?? 0) > 0
  }
}
