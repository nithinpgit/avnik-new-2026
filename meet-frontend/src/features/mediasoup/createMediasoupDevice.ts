import { Device } from 'mediasoup-client'
import { isAutomatedRecorder } from '../recording/recordingRuntime'

/**
 * Puppeteer headless reports `HeadlessChrome/…` which mediasoup-client does not
 * detect — force a Chromium handler so receive-only recording can consume media.
 */
export function createMediasoupDevice(): Device {
  if (isAutomatedRecorder() || (typeof navigator !== 'undefined' && navigator.webdriver)) {
    return new Device({ handlerName: 'Chrome111' })
  }
  return new Device()
}
