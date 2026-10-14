let audioCtx: AudioContext | null = null

/** Short chime when a new in-meeting notification arrives (reference: `playAudio(0.3)`). */
export function playNotificationSound(volume = 0.3): void {
  if (typeof window === 'undefined') return
  try {
    const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!Ctx) return
    if (!audioCtx) {
      audioCtx = new Ctx()
    }
    const ctx = audioCtx
    if (ctx.state === 'suspended') {
      void ctx.resume()
    }
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.value = 880
    gain.gain.value = Math.min(1, Math.max(0, volume))
    osc.connect(gain)
    gain.connect(ctx.destination)
    const now = ctx.currentTime
    osc.start(now)
    osc.stop(now + 0.18)
  } catch {
    // Autoplay policies or missing Web Audio — ignore
  }
}
