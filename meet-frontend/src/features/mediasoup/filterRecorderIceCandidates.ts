import type { IceCandidate } from 'mediasoup-client/types'
import { isAutomatedRecorder } from '../recording/recordingRuntime'

/** Headless recorder in Docker cannot use 127.0.0.1 ICE (points at its own container). */
export function filterRecorderIceCandidates(candidates: IceCandidate[]): IceCandidate[] {
  if (!isAutomatedRecorder()) return candidates
  const filtered = candidates.filter((c) => {
    const ip = c.ip?.trim()
    return ip && ip !== '127.0.0.1' && ip !== '::1'
  })
  return filtered.length > 0 ? filtered : candidates
}
