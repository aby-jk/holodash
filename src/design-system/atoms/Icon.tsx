export type IconName =
  | 'bell'
  | 'person'
  | 'settings'
  | 'battery'
  | 'wifi'
  | 'bluetooth'
  | 'question_mark'
  | 'info_i'
  | 'restart_alt'
  | 'usb'
  | 'play_arrow'
  | 'home'
  | 'warning'
  | 'error'
  | 'autorenew'
  | '360'
  | 'move'
  | 'fit_frame'
  | 'zoom_in'
  | 'recenter'
  | 'close'
  | 'close_small'
  | 'expand_content'
  | 'collapse_content'

interface IconProps {
  name: IconName
  size?: number
  className?: string
}

export function Icon({ name, size = 24, className = '' }: IconProps) {
  return (
    <img
      src={`/icons/${name}.svg`}
      alt={name}
      width={size}
      height={size}
      className={`inline-block shrink-0 select-none ${className}`}
      style={{ width: size, height: size, objectFit: 'contain' }}
      draggable={false}
      aria-hidden="true"
    />
  )
}
