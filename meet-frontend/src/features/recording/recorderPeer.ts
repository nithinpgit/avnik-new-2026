/** Headless recording bot — joined for capture only, never shown in UI or counts. */
export function isRecorderPeer(userId: string | null | undefined): boolean {
  return typeof userId === 'string' && userId.startsWith('recorder-')
}
