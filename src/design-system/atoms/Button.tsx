import { type ButtonHTMLAttributes, type ReactNode } from 'react'

export type ButtonVariant = 'primary' | 'secondary'
export type ButtonSize = 'lg' | 'sm' | 'xs'
export type ButtonShape = 'default' | 'circle' | 'circle-lg' | 'circle-sm'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  shape?: ButtonShape
  /** Text label — for default shapes renders inside; for circles renders beside */
  label?: string
  /** Icon to the left of the label */
  leftIcon?: ReactNode
  /** Icon to the right of the label */
  rightIcon?: ReactNode
  /** Fill full container width (default shapes only) */
  fullWidth?: boolean
}

// ─── Shared base ─────────────────────────────────────────────────────────────
const base =
  'relative inline-flex items-center justify-center gap-2 font-medium transition-all duration-150 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed'

// ─── Background ──────────────────────────────────────────────────────────────
const bgClass: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-white',
  secondary: 'bg-gray-3 text-white',
}

// ─── Large ───────────────────────────────────────────────────────────────────
// border + strong outer + inner highlight
const lgStyle = {
  boxShadow: '-1px 1px 5.5px rgba(0,0,0,0.75), inset 0px 1px 1px rgba(255,255,255,0.5)',
}
const lgClass = 'h-16 px-8 rounded-[8px] text-btn-lg border border-white/40'

// ─── Small ───────────────────────────────────────────────────────────────────
const smStyle = {
  boxShadow:
    '0px 1px 0.75px rgba(0,0,0,0.5), 0px 0px 1px rgba(0,0,0,0.25), inset 0px 1px 1px rgba(255,255,255,0.5)',
}
const smClass = 'h-[30px] min-w-[100px] px-3 py-2 rounded-[6px] text-btn'

// ─── XS ──────────────────────────────────────────────────────────────────────
const xsStyle = {
  boxShadow:
    '0px 1px 0.5px rgba(0,0,0,0.25), 0px 0px 1px rgba(0,0,0,0.25), inset 0px 1px 1px rgba(255,255,255,0.25)',
}
const xsClass = 'h-6 px-[6px] rounded-[6px] text-body-muted'

// ─── Circle sizes ─────────────────────────────────────────────────────────────
const circleConfig: Record<string, { cls: string; style: React.CSSProperties }> = {
  'circle-lg': {
    cls: 'w-8 h-8 rounded-full shrink-0',
    style: {
      boxShadow:
        '0px 1px 0.75px rgba(0,0,0,0.25), 0px 0px 1px rgba(0,0,0,0.25), inset 0px 1px 1px rgba(255,255,255,0.5)',
    },
  },
  circle: {
    cls: 'w-6 h-6 rounded-full shrink-0',
    style: {
      boxShadow:
        '0px 1px 0.75px rgba(0,0,0,0.25), 0px 0px 1px rgba(0,0,0,0.25), inset 0px 1px 1px rgba(255,255,255,0.5)',
    },
  },
  'circle-sm': {
    cls: 'w-4 h-4 rounded-full shrink-0',
    style: {
      boxShadow:
        '0px 0.5px 0.75px rgba(0,0,0,0.25), 0px 0px 1px rgba(0,0,0,0.25), inset 0px 0.5px 1px rgba(255,255,255,0.25)',
    },
  },
}

export function Button({
  variant = 'primary',
  size = 'lg',
  shape = 'default',
  label,
  leftIcon,
  rightIcon,
  fullWidth = false,
  children,
  className = '',
  style,
  ...props
}: ButtonProps) {
  // ── Circle shape ──────────────────────────────────────────────────────────
  if (shape !== 'default') {
    const cfg = circleConfig[shape] ?? circleConfig['circle']
    const circleBtn = (
      <button
        className={`${base} ${bgClass[variant]} ${cfg.cls} ${className}`}
        style={{ ...cfg.style, ...style }}
        {...props}
      >
        {children}
      </button>
    )

    if (label) {
      return (
        <span className="inline-flex items-center gap-1.5">
          {circleBtn}
          <span className="text-body text-white">{label}</span>
        </span>
      )
    }
    return circleBtn
  }

  // ── Default shape ─────────────────────────────────────────────────────────
  const sizeClass = size === 'lg' ? lgClass : size === 'sm' ? smClass : xsClass
  const sizeStyle = size === 'lg' ? lgStyle : size === 'sm' ? smStyle : xsStyle

  return (
    <button
      className={[
        base,
        bgClass[variant],
        sizeClass,
        fullWidth ? 'w-full' : size === 'lg' ? 'w-[280px]' : '',
        className,
      ].join(' ')}
      style={{ ...sizeStyle, ...style }}
      {...props}
    >
      {leftIcon}
      {label ?? children}
      {rightIcon}
    </button>
  )
}
