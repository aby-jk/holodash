const tooltipShadow =
  '0px 12px 8px 0px rgba(0,0,0,0.25), 0px 5px 16px 0px rgba(0,0,0,0.5)'
const innerHighlight =
  'inset 0px 4px 4px 0px rgba(255,255,255,0.1)'

export interface TooltipProps {
  label: string
  className?: string
}

export function Tooltip({ label, className = '' }: TooltipProps) {
  return (
    <div className={`relative inline-flex items-center ${className}`}>
      {/* Left-pointing arrow */}
      <div className="absolute left-[-12px] top-[4px] z-10">
        <svg width="12" height="20" viewBox="0 0 12 20" fill="none">
          <path d="M12 0 L2.5 8.5 Q0 10 2.5 11.5 L12 20 Z" fill="rgba(89,89,89,0.8)" />
          <path d="M12 1.5 L3 9 Q1 10 3 11 L12 18.5" stroke="#9E9E9E" strokeWidth="0.75" fill="none" />
        </svg>
      </div>
      {/* Pill */}
      <div
        className="relative h-[28px] px-5 rounded-[8px] border border-gray-2 overflow-hidden flex items-center"
        style={{ boxShadow: tooltipShadow }}
      >
        <div className="absolute inset-0 backdrop-blur-[5px] bg-[rgba(89,89,89,0.8)] rounded-[8px] pointer-events-none" />
        <div className="absolute inset-0 rounded-[8px] pointer-events-none" style={{ boxShadow: innerHighlight }} />
        <span className="relative z-10 text-body text-white whitespace-nowrap">{label}</span>
      </div>
    </div>
  )
}
