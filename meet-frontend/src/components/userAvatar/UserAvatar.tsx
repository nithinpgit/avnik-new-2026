import {
  getUserInitials,
  paletteForUser,
  radialGradientStyle,
} from './userAvatarUtils'
import './userAvatar.css'

export type UserAvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'tile'

export type UserAvatarProps = {
  name: string
  imageUrl?: string | null
  size?: UserAvatarSize
  className?: string
  hidden?: boolean
}

export function UserAvatar({
  name,
  imageUrl,
  size = 'md',
  className = '',
  hidden = false,
}: UserAvatarProps) {
  const palette = paletteForUser(name)
  const initial = getUserInitials(name)
  const isTile = size === 'tile'
  const showPhoto = Boolean(imageUrl)

  const rootClass = [
    'user-avatar',
    `user-avatar--${size}`,
    isTile ? '' : 'user-avatar--circle',
    hidden ? 'user-avatar--hidden' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  if (isTile) {
    return (
      <div
        className={rootClass}
        style={{ background: radialGradientStyle(palette) }}
        aria-hidden
      >
        <div className="user-avatar__disc" style={{ backgroundColor: palette.disc }}>
          {showPhoto && imageUrl ? (
            <img className="user-avatar__disc-photo" src={imageUrl} alt="" />
          ) : (
            initial
          )}
        </div>
      </div>
    )
  }

  if (showPhoto && imageUrl) {
    return (
      <div className={rootClass} aria-hidden>
        <img className="user-avatar__photo" src={imageUrl} alt="" />
      </div>
    )
  }

  return (
    <div
      className={rootClass}
      style={{ backgroundColor: palette.disc }}
      aria-hidden
    >
      <span className="user-avatar__initials">{initial}</span>
    </div>
  )
}
