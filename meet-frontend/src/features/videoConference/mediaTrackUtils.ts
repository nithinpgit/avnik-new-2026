export type VideoTrackRole = 'local' | 'remote'

/** Whether a video track is actively sending visible frames. */
export function isVideoTrackActive(track: MediaStreamTrack, role: VideoTrackRole): boolean {
  if (track.kind !== 'video' || track.readyState !== 'live' || !track.enabled) {
    return false
  }
  // Remote SFU consumers stay "live" when the producer is paused; track.muted is true then.
  if (role === 'remote' && track.muted) {
    return false
  }
  return true
}

export function activeVideoTrack(
  stream: MediaStream | null | undefined,
  role: VideoTrackRole,
): MediaStreamTrack | undefined {
  return stream?.getVideoTracks().find((t) => isVideoTrackActive(t, role))
}

export function hasActiveVideo(
  stream: MediaStream | null | undefined,
  role: VideoTrackRole,
): boolean {
  return Boolean(activeVideoTrack(stream, role))
}
