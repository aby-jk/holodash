import { DeviceVector, type DeviceProperty } from './DeviceVector'

interface DeviceTileProps {
  property: DeviceProperty
  label: string
  selected?: boolean
  onClick?: () => void
  className?: string
}

export function DeviceTile({ property, label, selected = false, onClick, className = '' }: DeviceTileProps) {
  return (
    <button
      onClick={onClick}
      className={[
        'relative flex flex-col gap-3 items-center justify-center p-3 bg-surface',
        'rounded-lg border size-[130px] shrink-0 transition-colors duration-150',
        selected ? 'border-primary overflow-clip' : 'border-gray-3',
        className,
      ].join(' ')}
    >
      <DeviceVector property={property} state={selected} width={64} height={80} />
      <span className={`text-h3 ${selected ? 'text-white' : 'text-gray-2'}`}>{label}</span>

      {selected && (
        <>
          {/* Orange check badge */}
          <div className="absolute top-0 right-0 size-[27px] bg-primary rounded-bl-[8px] flex items-center justify-center">
            <svg width="13" height="10" viewBox="0 0 13 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.5 5L5 8.5L11.5 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          {/* Inner-radius notch: where badge left edge meets card top */}
          <div className="absolute top-0 right-[27px] size-2 bg-surface rounded-br-[8px] pointer-events-none" />
          {/* Inner-radius notch: where badge bottom edge meets card right */}
          <div className="absolute top-[27px] right-0 size-2 bg-surface rounded-tl-[8px] pointer-events-none" />
        </>
      )}
    </button>
  )
}
