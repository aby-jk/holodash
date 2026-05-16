export type AvatarVariant = 'trooper' | 'cop' | 'girl' | 'bot' | 'default'
export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg'
export type AvatarShape = 'square' | 'rounded' | 'circle'

const AVATAR_SRC: Record<AvatarVariant, string> = {
  trooper: `${import.meta.env.BASE_URL}avatars/trooper.png`,
  cop:     `${import.meta.env.BASE_URL}avatars/cop.png`,
  girl:    `${import.meta.env.BASE_URL}avatars/girl.png`,
  bot:     `${import.meta.env.BASE_URL}avatars/bot.png`,
  default: `${import.meta.env.BASE_URL}avatars/default.png`,
}

const SIZE_CLASS: Record<AvatarSize, string> = {
  xs: 'size-6',       // 24px — inline / tight contexts
  sm: 'size-10',      // 40px — navbar, lists
  md: 'size-16',      // 64px — cards, menus
  lg: 'size-[100px]', // 100px — profile selection (Figma native)
}

const SHAPE_CLASS: Record<AvatarShape, string> = {
  square:  'rounded-none',
  rounded: 'rounded-lg',
  circle:  'rounded-full',
}

interface AvatarProps {
  variant?: AvatarVariant
  src?: string
  size?: AvatarSize
  shape?: AvatarShape
  alt?: string
  className?: string
}

export function Avatar({
  variant = 'default',
  src,
  size = 'sm',
  shape = 'circle',
  alt,
  className = '',
}: AvatarProps) {
  const imgSrc = src ?? AVATAR_SRC[variant]

  return (
    <div
      className={[
        'shrink-0 overflow-hidden',
        SIZE_CLASS[size],
        SHAPE_CLASS[shape],
        className,
      ].join(' ')}
    >
      <img
        src={imgSrc}
        alt={alt ?? variant}
        className="size-full object-cover object-top"
        draggable={false}
      />
    </div>
  )
}
