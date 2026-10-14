import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm'

@Entity('room_blocked_users')
@Unique('uq_room_blocked_users_room_user', ['roomId', 'userId'])
@Index('idx_room_blocked_users_room', ['roomId'])
export class RoomBlockedUserEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ name: 'room_id', type: 'varchar', length: 128 })
  roomId!: string

  @Column({ name: 'user_id', type: 'varchar', length: 128 })
  userId!: string

  @Column({ name: 'blocked_by', type: 'varchar', length: 128, nullable: true })
  blockedBy!: string | null

  @CreateDateColumn({ name: 'blocked_at', type: 'timestamptz' })
  blockedAt!: Date
}
