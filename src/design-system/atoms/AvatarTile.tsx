import { Avatar, type AvatarVariant } from './Avatar'

interface AvatarTileProps {
  variant?: AvatarVariant
  label: string
  selected?: boolean
  onClick?: () => void
  className?: string
}

export function AvatarTile({
  variant = 'default',
  label,
  selected = false,
  onClick,
  className = '',
}: AvatarTileProps) {
  return (
    <button
      onClick={onClick}
      className={[
        'relative flex flex-col gap-1 items-center justify-center p-3 bg-surface',
        'rounded-lg border size-[130px] shrink-0 overflow-clip transition-colors duration-150',
        selected ? 'border-primary' : 'border-gray-3',
        className,
      ].join(' ')}
    >
      {/* Gray name strip behind the label */}
      <div className="absolute top-[79px] left-0 w-full h-[50px] bg-gray-3" />

      <Avatar variant={variant} size="lg" shape="square" className="relative mt-[10px]" />
      <span className="text-h3 text-white relative -mt-[12px]">{label}</span>

      {selected && (
        <>
          <div className="absolute top-0 right-0 size-[27px] bg-primary rounded-bl-[8px] flex items-center justify-center">
            <svg width="13" height="10" viewBox="0 0 13 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.5 5L5 8.5L11.5 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="absolute top-0 right-[27px] size-2 bg-surface rounded-br-[8px] pointer-events-none" />
          <div className="absolute top-[27px] right-0 size-2 bg-surface rounded-tl-[8px] pointer-events-none" />
        </>
      )}
    </button>
  )
}
