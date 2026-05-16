import { useRef, useState, type InputHTMLAttributes } from 'react'

type InputVariant = 'default' | 'empty-stage' | 'small' | 'floating'

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: InputVariant
  label?: string
  hint?: string
  error?: string
}

export function TextInput({
  variant = 'default',
  label,
  hint,
  error,
  className = '',
  onFocus,
  onBlur,
  ...props
}: TextInputProps) {
  const borderClass = error ? 'border-status-error' : 'border-gray-3'
  const inputRef = useRef<HTMLInputElement>(null)
  const [focused, setFocused] = useState(false)

  if (variant === 'floating') {
    const active = focused || !!(props.value as string)
    return (
      <div className={`flex flex-col gap-1 w-full ${className}`}>
        <div
          className={`relative h-16 bg-white border ${borderClass} rounded-[8px] px-3 cursor-text`}
          onClick={() => inputRef.current?.focus()}
        >
          {label && (
            <span className={`absolute left-3 pointer-events-none text-gray-3 font-display transition-all duration-150 ${
              active
                ? 'text-[12px] leading-[16px] top-[7px]'
                : 'text-[20px] leading-[24px] top-1/2 -translate-y-1/2'
            }`}>
              {label}
            </span>
          )}
          <input
            ref={inputRef}
            {...props}
            onFocus={e => { setFocused(true); onFocus?.(e) }}
            onBlur={e => { setFocused(false); onBlur?.(e) }}
            className={`absolute left-3 right-3 bottom-[10px] bg-transparent text-black text-[20px] leading-[24px] focus:outline-none transition-opacity duration-150 ${
              active ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </div>
        {(hint || error) && (
          <span className={`text-body-muted ${error ? 'text-status-error' : 'text-gray-3'}`}>
            {error ?? hint}
          </span>
        )}
      </div>
    )
  }

  if (variant === 'small') {
    return (
      <div className={`flex flex-col gap-1 w-full ${className}`}>
        <div className={`h-8 flex items-center bg-white border ${borderClass} rounded-[8px] px-3`}>
          <input
            {...props}
            className="w-full bg-transparent text-black text-body focus:outline-none placeholder:text-gray-3"
          />
        </div>
        {(hint || error) && (
          <span className={`text-body-muted ${error ? 'text-status-error' : 'text-gray-3'}`}>
            {error ?? hint}
          </span>
        )}
      </div>
    )
  }

  if (variant === 'empty-stage') {
    return (
      <div className={`flex flex-col gap-1 w-full ${className}`}>
        <div className={`h-16 flex items-center bg-white border ${borderClass} rounded-[8px] px-3`}>
          <input
            {...props}
            placeholder={label ?? props.placeholder}
            className="w-full bg-transparent text-black text-[20px] leading-[24px] focus:outline-none placeholder:text-gray-3"
          />
        </div>
        {(hint || error) && (
          <span className={`text-body-muted ${error ? 'text-status-error' : 'text-gray-3'}`}>
            {error ?? hint}
          </span>
        )}
      </div>
    )
  }

  // default — label pinned at top, value at 20px below
  return (
    <div className={`flex flex-col gap-1 w-full ${className}`}>
      <div className={`h-16 flex flex-col justify-center bg-white border ${borderClass} rounded-[8px] px-3 py-1.5`}>
        {label && (
          <span className="text-[12px] leading-[16px] text-gray-3 pointer-events-none select-none shrink-0">
            {label}
          </span>
        )}
        <input
          {...props}
          className="w-full bg-transparent text-black text-[20px] leading-[24px] focus:outline-none placeholder:text-gray-3"
        />
      </div>
      {(hint || error) && (
        <span className={`text-body-muted ${error ? 'text-status-error' : 'text-gray-3'}`}>
          {error ?? hint}
        </span>
      )}
    </div>
  )
}
