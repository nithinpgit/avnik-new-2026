import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BlockedUsersController } from './blocked-users.controller'
import { BlockedUsersService } from './blocked-users.service'
import { RoomBlockedUserEntity } from './entities/room-blocked-user.entity'

@Module({
  imports: [TypeOrmModule.forFeature([RoomBlockedUserEntity])],
  controllers: [BlockedUsersController],
  providers: [BlockedUsersService],
  exports: [BlockedUsersService],
})
export class WaitingRoomModule {}
