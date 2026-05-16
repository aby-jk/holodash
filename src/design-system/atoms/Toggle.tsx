interface ToggleProps {
  checked: boolean
  onChange?: (checked: boolean) => void
  disabled?: boolean
}

const bgShadow = {
  boxShadow: 'inset 0px 11px 11px rgba(0,0,0,0.1), inset 0px 0px 1.5px rgba(255,255,255,0.5)',
}

const thumbShadow = {
  boxShadow:
    '0px 0.5px 1.5px rgba(0,0,0,0.66), 0px 0px 1px 1px rgba(0,0,0,0.25), inset 0px 0.5px 0.5px rgba(255,255,255,0.33)',
}

export function Toggle({ checked, onChange, disabled }: ToggleProps) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange?.(!checked)}
      className={[
        'relative w-[39px] h-6 rounded-full transition-colors duration-200 focus:outline-none',
        'disabled:opacity-40 disabled:cursor-not-allowed',
        checked ? 'bg-primary' : 'bg-gray-3',
      ].join(' ')}
      style={bgShadow}
    >
      <span
        className={[
          'absolute top-[2px] left-[2px] w-5 h-5 bg-gray-1 rounded-full transition-transform duration-200',
          checked ? 'translate-x-[15px]' : 'translate-x-0',
        ].join(' ')}
        style={thumbShadow}
      />
    </button>
  )
}
