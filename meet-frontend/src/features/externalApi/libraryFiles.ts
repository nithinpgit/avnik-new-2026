import { fetchRoomFiles } from '../documents/documentsApi'
import type { RoomFileRecord } from '../documents/presentationTypes'
import { listFileManagerFiles, mapExternalFileToLibraryItem } from './client'

export type LibraryFileRecord = RoomFileRecord & { external?: boolean }

function dedupeByUrl(files: LibraryFileRecord[]): LibraryFileRecord[] {
  const seen = new Set<string>()
  const out: LibraryFileRecord[] = []
  for (const file of files) {
    const key = file.url || file.id
    if (seen.has(key)) continue
    seen.add(key)
    out.push(file)
  }
  return out
}

/** Merges room-scoped Nest files with external Laravel fileManager library. */
export async function fetchMergedLibraryFiles(roomId: string): Promise<LibraryFileRecord[]> {
  const [localFiles, externalFiles] = await Promise.all([
    fetchRoomFiles(roomId).catch(() => [] as RoomFileRecord[]),
    listFileManagerFiles().catch(() => []),
  ])

  const mappedExternal = externalFiles.map((f) => mapExternalFileToLibraryItem(f))
  return dedupeByUrl([...localFiles, ...mappedExternal])
}

export function isExternalLibraryFile(file: LibraryFileRecord): boolean {
  return file.external === true || String(file.id).startsWith('external-')
}

export function libraryFileShareUrl(file: LibraryFileRecord): string {
  if (isExternalLibraryFile(file)) {
    return file.url
  }
  return file.url
}
