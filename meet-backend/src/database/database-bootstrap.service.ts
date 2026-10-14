import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common'
import { InjectDataSource } from '@nestjs/typeorm'
import { DataSource } from 'typeorm'

const REQUIRED_TABLES = ['chat_messages', 'chat_message_reads', 'room_files', 'room_blocked_users'] as const

/**
 * When DATABASE_SYNC=false (production), TypeORM does not create tables.
 * On first deploy against an empty database, create the schema once from entities.
 */
@Injectable()
export class DatabaseBootstrapService implements OnApplicationBootstrap {
  private readonly logger = new Logger(DatabaseBootstrapService.name)

  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async onApplicationBootstrap(): Promise<void> {
    if (process.env.DATABASE_SYNC === 'true') {
      return
    }

    const missing = await this.findMissingTables()
    if (missing.length === 0) {
      return
    }

    this.logger.warn(`Missing tables: ${missing.join(', ')} — creating schema from entities`)
    await this.dataSource.synchronize()
    this.logger.log('Database schema initialized')
  }

  private async findMissingTables(): Promise<string[]> {
    const missing: string[] = []
    for (const table of REQUIRED_TABLES) {
      const rows = (await this.dataSource.query(`SELECT to_regclass($1) AS reg`, [
        `public.${table}`,
      ])) as { reg: string | null }[]
      if (!rows[0]?.reg) {
        missing.push(table)
      }
    }
    return missing
  }
}
