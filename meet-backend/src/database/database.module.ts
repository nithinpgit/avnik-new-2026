import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ChatMessageEntity } from '../chat/entities/chat-message.entity'
import { ChatMessageReadEntity } from '../chat/entities/chat-message-read.entity'
import { RoomFileEntity } from '../files/entities/room-file.entity'
import { RoomBlockedUserEntity } from '../waiting-room/entities/room-blocked-user.entity'
import { DatabaseBootstrapService } from './database-bootstrap.service'

function databaseUrl(): string {
  const url = process.env.DATABASE_URL?.trim()
  if (url) return url
  if (process.env.NODE_ENV === 'production') {
    throw new Error('DATABASE_URL is required in production')
  }
  const host = process.env.POSTGRES_HOST?.trim() || 'postgres'
  const port = process.env.POSTGRES_PORT?.trim() || '5432'
  const user = process.env.POSTGRES_USER?.trim() || 'meet'
  const pass = process.env.POSTGRES_PASSWORD?.trim() || 'meet'
  const db = process.env.POSTGRES_DB?.trim() || 'meet'
  return `postgresql://${encodeURIComponent(user)}:${encodeURIComponent(pass)}@${host}:${port}/${db}`
}

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: databaseUrl(),
      entities: [ChatMessageEntity, ChatMessageReadEntity, RoomFileEntity, RoomBlockedUserEntity],
      synchronize:
        process.env.DATABASE_SYNC === 'true' ||
        (process.env.DATABASE_SYNC !== 'false' && process.env.NODE_ENV !== 'production'),
      logging: process.env.DATABASE_LOGGING === 'true',
    }),
  ],
  providers: [DatabaseBootstrapService],
})
export class DatabaseModule {}
