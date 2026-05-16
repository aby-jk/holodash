const buttonFilter =
  'drop-shadow(0px 1px 0.75px rgba(0,0,0,0.5)) drop-shadow(0px 0px 1px rgba(0,0,0,0.25))'
const activeInnerShadow =
  'inset 0px 1px 1px 0px rgba(255,255,255,0.5), inset 0px -2px 4px 0px rgba(255,255,255,0.25), inset 0px 2px 4px 0px rgba(0,0,0,0.25)'

type DotStatus = 'ok' | 'error' | 'none'

const DOT: Record<DotStatus, string> = {
  ok: 'bg-status-success',
  error: 'bg-status-error',
  none: 'bg-gray-2',
}

export type SegmentValue = 'mocap' | 'haptics'

export interface SegmentControlProps {
  selected?: SegmentValue
  onChange?: (value: SegmentValue) => void
  mocapStatus?: DotStatus
  hapticsStatus?: DotStatus
  className?: string
}

const ITEMS: { value: SegmentValue; label: string }[] = [
  { value: 'mocap', label: 'MoCap' },
  { value: 'haptics', label: 'Haptics' },
]

export function SegmentControl({
  selected = 'mocap',
  onChange,
  mocapStatus = 'ok',
  hapticsStatus = 'ok',
  className = '',
}: SegmentControlProps) {
  const statuses: Record<SegmentValue, DotStatus> = {
    mocap: mocapStatus,
    haptics: hapticsStatus,
  }

  return (
    <div className={`inline-flex w-fit items-center border border-gray-3 rounded-[8px] p-[2px] ${className}`}>
      {ITEMS.map(item => {
        const isActive = selected === item.value
        return (
          <button
            key={item.value}
            onClick={() => onChange?.(item.value)}
            className={`h-[30px] px-3 py-2 rounded-[6px] flex items-center justify-center relative shrink-0 transition-colors duration-150 ${isActive ? 'bg-primary' : ''}`}
            style={{
              filter: buttonFilter,
              ...(isActive ? { boxShadow: activeInnerShadow } : {}),
            }}
          >
            <div className="flex gap-1 h-4 items-center">
              <div className={`size-[7.2px] rounded-full shrink-0 ${DOT[statuses[item.value]]}`} />
              <span className="text-h3 text-white whitespace-nowrap">{item.label}</span>
            </div>
          </button>
        )
      })}
    </div>
  )
}
