export function getUserInitials(name: string): string {
  const trimmed = name.trim()
  if (!trimmed) return '?'
  return trimmed[0]!.toUpperCase()
}

function hashName(name: string): number {
  let hash = 0
  for (let i = 0; i < name.length; i += 1) {
    hash = (hash << 5) - hash + name.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

export type UserAvatarPalette = {
  dark: string
  mid: string
  light: string
  disc: string
}

/** Theme-based palettes (stable per display name, Google Meet–style). */
const PALETTES: UserAvatarPalette[] = [
  { dark: '#0a2d47', mid: '#145388', light: '#2a7ab0', disc: '#4ba3d4' },
  { dark: '#0c2f4a', mid: '#1a5f8f', light: '#3589b8', disc: '#5aade0' },
  { dark: '#0d3548', mid: '#17607a', light: '#2d96ad', disc: '#45b8cc' },
  { dark: '#102840', mid: '#1e4d73', light: '#3a78a8', disc: '#5699c9' },
  { dark: '#0f2e3e', mid: '#15566b', light: '#2a8499', disc: '#42a8b8' },
  { dark: '#122a45', mid: '#234a75', light: '#3f6f9e', disc: '#5c8fbf' },
  { dark: '#0b3042', mid: '#186880', light: '#2f9bb0', disc: '#48b9ce' },
  { dark: '#142438', mid: '#2d4a6e', light: '#4a7299', disc: '#6a94b8' },
]

export function paletteForUser(name: string): UserAvatarPalette {
  return PALETTES[hashName(name.trim().toLowerCase() || '?') % PALETTES.length]!
}

export function radialGradientStyle(palette: UserAvatarPalette): string {
  return `radial-gradient(ellipse 115% 95% at 50% 28%, ${palette.light} 0%, ${palette.mid} 42%, ${palette.dark} 100%)`
}
