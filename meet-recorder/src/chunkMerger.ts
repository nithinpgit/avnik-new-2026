import { createWriteStream } from 'node:fs'
import { mkdir, readdir, readFile, rename, rm, stat, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { logger } from './logger.js'

export type MergeResult = {
  outputPath: string
  sizeBytes: number
}

/** WebM/Matroska EBML magic (init segment only — continuation chunks may omit it). */
export const MIN_WEBM_BYTES = 128

export function hasWebmHeader(buffer: Buffer): boolean {
  return (
    buffer.length >= 4 &&
    buffer[0] === 0x1a &&
    buffer[1] === 0x45 &&
    buffer[2] === 0xdf &&
    buffer[3] === 0xa3
  )
}

/** Validate the first MediaRecorder chunk (must contain WebM init). */
export function isValidWebmInitChunk(buffer: Buffer): boolean {
  return buffer.length >= MIN_WEBM_BYTES && hasWebmHeader(buffer)
}

function chunkSortKey(name: string): number {
  const match = /^chunk-(\d+)\.webm$/i.exec(name)
  return match ? Number.parseInt(match[1], 10) : Number.MAX_SAFE_INTEGER
}

async function listChunkFiles(chunksDir: string): Promise<string[]> {
  try {
    const entries = await readdir(chunksDir)
    return entries
      .filter((name) => name.startsWith('chunk-') && name.endsWith('.webm'))
      .sort((a, b) => chunkSortKey(a) - chunkSortKey(b))
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === 'ENOENT') {
      return []
    }
    throw err
  }
}

/**
 * Binary-concatenate MediaRecorder timeslice fragments (VKYC-style).
 * Chunk 0 carries the WebM init segment; later chunks are continuations.
 */
export async function mergeRecordingChunks(
  recordingDir: string,
  recordingId: string,
): Promise<MergeResult> {
  const chunksDir = join(recordingDir, 'chunks')
  await mkdir(recordingDir, { recursive: true })

  const chunkFiles = await listChunkFiles(chunksDir)
  if (chunkFiles.length === 0) {
    throw new Error(`No recording chunks found for ${recordingId}`)
  }

  const outputWebm = join(recordingDir, `${recordingId}.webm`)
  const ws = createWriteStream(outputWebm)

  for (const name of chunkFiles) {
    const path = join(chunksDir, name)
    const buffer = await readFile(path)
    if (buffer.length === 0) continue
    await new Promise<void>((resolve, reject) => {
      ws.write(buffer, (err) => (err ? reject(err) : resolve()))
    })
  }

  await new Promise<void>((resolve, reject) => {
    ws.end((err: Error | null | undefined) => (err ? reject(err) : resolve()))
  })

  const { size } = await stat(outputWebm)
  if (size < MIN_WEBM_BYTES) {
    throw new Error(`Merged recording too small (${size} bytes)`)
  }

  logger.info(
    { recordingId, outputWebm, sizeBytes: size, chunkCount: chunkFiles.length },
    'recording chunks merged to webm',
  )
  return { outputPath: outputWebm, sizeBytes: size }
}

export async function writeChunk(
  recordingDir: string,
  sequence: number,
  buffer: Buffer,
  prefix = 'chunk',
): Promise<string> {
  const chunksDir = join(recordingDir, 'chunks')
  await mkdir(chunksDir, { recursive: true })
  const chunkPath = join(chunksDir, `${prefix}-${String(sequence).padStart(6, '0')}.webm`)
  await writeFile(chunkPath, buffer)
  return chunkPath
}

export async function readChunkSequence(recordingDir: string): Promise<number> {
  const chunksDir = join(recordingDir, 'chunks')
  try {
    const chunkFiles = await listChunkFiles(chunksDir)
    if (chunkFiles.length === 0) return 0
    const last = chunkFiles[chunkFiles.length - 1]
    const match = /^chunk-(\d+)\.webm$/i.exec(last)
    return match ? Number.parseInt(match[1], 10) + 1 : 0
  } catch {
    return 0
  }
}

export async function writeRecordingMeta(
  recordingDir: string,
  meta: Record<string, unknown>,
): Promise<void> {
  await writeFile(join(recordingDir, 'meta.json'), JSON.stringify(meta, null, 2))
}

export async function finalizeRecordingDir(
  recordingDir: string,
  recordingId: string,
): Promise<MergeResult> {
  const tmpFinal = join(recordingDir, 'finalizing')
  await writeFile(tmpFinal, new Date().toISOString())
  const result = await mergeRecordingChunks(recordingDir, recordingId)
  await rm(tmpFinal, { force: true })
  return result
}

export async function moveAsidePartial(recordingDir: string): Promise<void> {
  const failedDir = join(recordingDir, '..', `failed-${Date.now()}`)
  try {
    await rename(recordingDir, failedDir)
  } catch {
    /* ignore */
  }
}
