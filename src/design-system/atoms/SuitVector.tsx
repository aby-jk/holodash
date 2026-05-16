export type SuitView = 'front' | 'back'
export type SuitZone = 1 | 2 | 3 | 4

export interface SuitVectorProps {
  view?: SuitView
  zone?: SuitZone
  selected?: boolean
  height?: number
  className?: string
}

export function SuitVector({
  view = 'front',
  zone,
  selected = false,
  height = 200,
  className = '',
}: SuitVectorProps) {
  const src = zone
    ? `/suit/zone-${zone}-${view === 'front' ? 'f' : 'b'}.svg`
    : selected
      ? `/suit/${view}-selected.svg`
      : `/suit/${view}.svg`

  return (
    <img
      src={src}
      alt={`Suit ${view}${zone ? ` zone ${zone}` : ''}`}
      style={{ height }}
      className={`w-auto ${className}`}
      draggable={false}
    />
  )
}
