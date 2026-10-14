import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { IoAdapter } from '@nestjs/platform-socket.io'
import { existsSync, mkdirSync } from 'fs'
import helmet from 'helmet'
import { join } from 'path'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { bufferLogs: true })

  app.useWebSocketAdapter(new IoAdapter(app))
  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: 'cross-origin' },
    }),
  )

  let corsOrigins = process.env.CORS_ORIGIN?.split(',').map((s) => s.trim()).filter(Boolean)
  if (!corsOrigins?.length) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('CORS_ORIGIN is required in production')
    }
    corsOrigins = ['http://localhost:5173']
  }
  app.enableCors({
    origin: corsOrigins,
    credentials: true,
  })

  const uploadDir = process.env.UPLOAD_DIR?.trim() || join(process.cwd(), 'uploads')
  if (!existsSync(uploadDir)) {
    mkdirSync(uploadDir, { recursive: true })
  }
  app.useStaticAssets(uploadDir, { prefix: '/uploads/' })

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  )

  const apiPrefix = (process.env.API_PREFIX ?? 'meet/api').replace(/^\/+|\/+$/g, '')
  app.setGlobalPrefix(apiPrefix)

  const port = Number(process.env.PORT)
  if (!Number.isFinite(port) || port <= 0) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('PORT is required in production')
    }
  }
  const listenPort = Number.isFinite(port) && port > 0 ? port : 3000
  await app.listen(listenPort, '0.0.0.0')
  // eslint-disable-next-line no-console
  console.log(`HTTP + Socket.IO listening on http://0.0.0.0:${listenPort} (API prefix /${apiPrefix})`)
}

void bootstrap()
