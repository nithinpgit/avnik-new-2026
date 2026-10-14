import type { AppDispatch } from '../../app/store'
import { store } from '../../app/store'
import { setCameraStatus, setLocalStream } from '../videoConference/videoConferenceSlice'

/** Stop publishing local A/V so the user cannot stay in the live session during review. */
export function stopLocalSessionMedia(dispatch: AppDispatch): void {
  const stream = store.getState().videoConference.localStream
  stream?.getTracks().forEach((t) => {
    try {
      t.stop()
    } catch {
      /* ignore */
    }
  })
  dispatch(setLocalStream(null))
  dispatch(setCameraStatus('idle'))
}
