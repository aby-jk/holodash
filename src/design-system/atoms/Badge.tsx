export type BadgeVariant = 'success' | 'error' | 'warning' | 'default'

interface BadgeProps {
  variant?: BadgeVariant
  label: string
}

const dotColor: Record<BadgeVariant, string> = {
  success: '#6DB611',
  error:   '#FF1111',
  warning: '#FFB700',
  default: '#9E9E9E',
}

export function Badge({ variant = 'default', label }: BadgeProps) {
  return (
    <span className="inline-flex items-center gap-1">
      <span
        className="shrink-0 rounded-full"
        style={{ width: 8, height: 8, backgroundColor: dotColor[variant] }}
      />
      <span className="text-[14px] leading-none text-gray-2 whitespace-nowrap">{label}</span>
    </span>
  )
}
