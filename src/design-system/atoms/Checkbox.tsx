import type { ReactNode } from 'react'

export interface CheckboxProps {
  checked?: boolean
  indeterminate?: boolean
  label?: ReactNode
  onChange?: (checked: boolean) => void
  disabled?: boolean
}

const boxShadow =
  '0px 0.71px 2.14px rgba(0,0,0,0.66), 0px 0px 1.43px rgba(0,0,0,0.25), inset 0px 0.71px 0.71px rgba(255,255,255,0.33)'

export function Checkbox({
  checked = false,
  indeterminate = false,
  label,
  onChange,
  disabled,
}: CheckboxProps) {
  const bg = checked ? 'bg-primary' : indeterminate ? 'bg-[#3a3a3a]' : 'bg-gray-3'

  return (
    <label
      className={[
        'inline-flex items-center gap-2 select-none',
        disabled ? 'cursor-not-allowed opacity-40' : 'cursor-pointer',
      ].join(' ')}
    >
      <button
        role="checkbox"
        aria-checked={indeterminate ? 'mixed' : checked}
        disabled={disabled}
        onClick={() => onChange?.(!checked)}
        className={[
          'relative w-5 h-5 rounded-[4px] flex items-center justify-center shrink-0',
          'transition-colors duration-150 focus:outline-none',
          bg,
        ].join(' ')}
        style={{ boxShadow }}
      >
        {checked && !indeterminate && (
          <svg width="13" height="10" viewBox="0 0 13 10" fill="none" className="shrink-0">
            <path
              d="M4.40667 7.3125L11.4692 0.25C11.6358 0.0833333 11.8303 0 12.0525 0C12.2747 0 12.4692 0.0833333 12.6358 0.25C12.8025 0.416667 12.8858 0.614583 12.8858 0.84375C12.8858 1.07292 12.8025 1.27083 12.6358 1.4375L4.99 9.10417C4.82333 9.27083 4.62889 9.35417 4.40667 9.35417C4.18444 9.35417 3.99 9.27083 3.82333 9.10417L0.24 5.52083C0.0733333 5.35417 -0.00652778 5.15625 0.000416667 4.92708C0.00736111 4.69792 0.0941667 4.5 0.260833 4.33333C0.4275 4.16667 0.625417 4.08333 0.854583 4.08333C1.08375 4.08333 1.28167 4.16667 1.44833 4.33333L4.40667 7.3125Z"
              fill="white"
            />
          </svg>
        )}
        {indeterminate && (
          <span
            className="block w-[14px] h-1 rounded-full"
            style={{ background: 'rgba(255,255,255,0.85)' }}
          />
        )}
      </button>
      {label && <span className="text-body text-white">{label}</span>}
    </label>
  )
}

export function RecaptchaWidget({
  checked = false,
  onChange,
}: {
  checked?: boolean
  onChange?: (v: boolean) => void
}) {
  return (
    <div
      className="flex items-center bg-gray-4 border border-gray-3 rounded-lg shrink-0"
      style={{ width: 228, height: 64, gap: 12, paddingLeft: 24, paddingRight: 24 }}
    >
      <Checkbox checked={checked} onChange={onChange} />
      <span className="text-body text-white whitespace-nowrap" style={{ width: 105 }}>
        I am not a robot
      </span>
      <img
        src={`${import.meta.env.BASE_URL}recaptcha_logo.png`}
        alt="reCAPTCHA"
        width={31}
        height={29}
        className="shrink-0 object-contain"
        draggable={false}
      />
    </div>
  )
}
