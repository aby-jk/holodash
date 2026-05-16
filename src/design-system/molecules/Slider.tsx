import type { ChangeEvent } from 'react'
import { Icon } from '../atoms/Icon'

type SliderVariant = 'default' | 'long' | 'long-inactive'

interface SliderProps {
  variant?: SliderVariant
  value: number
  min?: number
  max?: number
  label?: string
  unit?: string
  disabled?: boolean
  onChange?: (value: number) => void
  testLabel?: string
  onTest?: () => void
  onReset?: () => void
}

const btnShadow =
  '0px 0px 2px rgba(0,0,0,0.25), 0px 1px 1px rgba(0,0,0,0.25), inset 0px 1px 1px rgba(255,255,255,0.25)'

const infoBtnShadow =
  '0px 0px 2px rgba(0,0,0,0.25), 0px 0.5px 1.5px rgba(0,0,0,0.25), inset 0px 0.5px 1px rgba(255,255,255,0.25)'

const thumbShadow = 'inset 0px 0.5px 0.5px rgba(255,255,255,0.33)'

export function Slider({
  variant = 'default',
  value,
  min = 0,
  max = 100,
  label,
  unit = '%',
  disabled,
  onChange,
  testLabel = 'Test',
  onTest,
  onReset,
}: SliderProps) {
  const isLong = variant === 'long' || variant === 'long-inactive'
  const isInactive = variant === 'long-inactive'
  const pct = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100))
  const displayValue = `${Math.round(value)}${unit}`

  return (
    <div
      className={[
        'flex flex-col gap-[10px]',
        isLong ? 'w-full' : 'w-[256px]',
        isInactive ? 'opacity-[0.15]' : '',
      ].join(' ')}
    >
      {/* Title row */}
      {label && (
        <div className="flex items-center justify-between h-5">
          <div className="flex items-center gap-1.5">
            <span className="text-body text-white whitespace-nowrap">{label}</span>
            <button
              className="w-4 h-4 rounded-full bg-gray-3 flex items-center justify-center shrink-0 focus:outline-none"
              style={{ boxShadow: infoBtnShadow }}
            >
              <Icon name="info_i" size={12} />
            </button>
          </div>
          {isLong && (
            <button
              className="w-4 h-4 rounded-full bg-gray-3 flex items-center justify-center shrink-0 focus:outline-none"
              style={{ boxShadow: infoBtnShadow }}
              onClick={onReset}
            >
              <Icon name="restart_alt" size={12} />
            </button>
          )}
        </div>
      )}

      {/* Control row */}
      <div className="flex items-center gap-2 h-6">
        {/* Test button — long variants only */}
        {isLong && (
          <button
            className="flex items-center gap-1.5 px-1.5 py-1.5 bg-gray-3 rounded-[6px] shrink-0 focus:outline-none"
            style={{ boxShadow: btnShadow, width: 55, height: 24 }}
            onClick={onTest}
            disabled={isInactive || disabled}
          >
            <Icon name="play_arrow" size={12} />
            <span className="text-[12px] leading-none text-white">{testLabel}</span>
          </button>
        )}

        {/* Slider track */}
        <div className="relative flex-1 h-5 self-center">
          {/* BG track */}
          <div
            className="absolute inset-x-0 top-[8px] h-1 rounded-full bg-gray-3"
            style={{ mixBlendMode: 'hard-light' }}
          />
          {/* Fill */}
          <div
            className="absolute left-0 top-[8px] h-1 rounded-full bg-primary pointer-events-none"
            style={{ width: `${pct}%` }}
          />
          {/* Thumb */}
          <div
            className="absolute top-0 w-5 h-5 rounded-full bg-gray-1 pointer-events-none"
            style={{
              left: `clamp(0px, calc(${pct}% - 10px), calc(100% - 20px))`,
              boxShadow: thumbShadow,
            }}
          />
          {/* Native range input — invisible, handles all interaction */}
          <input
            type="range"
            min={min}
            max={max}
            value={value}
            disabled={disabled || isInactive}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onChange?.(Number(e.target.value))}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
          />
        </div>

        {/* Value button */}
        <button
          className="flex items-center justify-center px-1.5 py-1.5 bg-gray-3 rounded-[6px] shrink-0 focus:outline-none"
          style={{ boxShadow: btnShadow, minWidth: 37, height: 24 }}
        >
          <span className="text-[12px] leading-none text-white whitespace-nowrap">{displayValue}</span>
        </button>
      </div>
    </div>
  )
}
