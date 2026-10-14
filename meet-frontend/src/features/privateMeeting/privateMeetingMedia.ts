import { store } from '../../app/store'
import { bumpLocalMediaRevision } from '../videoConference/videoConferenceSlice'
import type { PrivateMeetingJoinMode } from './privateMeetingTypes'

export function captureLocalMediaState(): { micEnabled: boolean; camEnabled: boolean } {
  const stream = store.getState().videoConference.localStream
  const audioTrack = stream?.getAudioTracks()[0]
  const videoTrack = stream?.getVideoTracks()[0]
  return {
    micEnabled: audioTrack?.enabled ?? true,
    camEnabled: videoTrack?.enabled ?? true,
  }
}

export function applyPrivateJoinMedia(mode: PrivateMeetingJoinMode): {
  savedMicEnabled: boolean
  savedCamEnabled: boolean
} {
  const stream = store.getState().videoConference.localStream
  const audioTrack = stream?.getAudioTracks()[0]
  const videoTrack = stream?.getVideoTracks()[0]
  const savedMicEnabled = audioTrack?.enabled ?? true
  const savedCamEnabled = videoTrack?.enabled ?? true

  if (audioTrack) audioTrack.enabled = true
  if (videoTrack) {
    videoTrack.enabled = mode === 'cammic'
  }

  store.dispatch(bumpLocalMediaRevision())
  return { savedMicEnabled, savedCamEnabled }
}

export function restorePrivateJoinMedia(savedMicEnabled: boolean, savedCamEnabled: boolean): void {
  const stream = store.getState().videoConference.localStream
  const audioTrack = stream?.getAudioTracks()[0]
  const videoTrack = stream?.getVideoTracks()[0]
  if (audioTrack) audioTrack.enabled = savedMicEnabled
  if (videoTrack) videoTrack.enabled = savedCamEnabled
  store.dispatch(bumpLocalMediaRevision())
}
