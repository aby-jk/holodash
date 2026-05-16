import { useState } from 'react'
import { Icon } from '../atoms/Icon'
import { Divider } from '../atoms/Divider'

interface DropdownItem {
  label: string
  value: string
  icon?: string
  description?: string
}

interface DropdownProps {
  items: DropdownItem[]
  value?: string
  placeholder?: string
  label?: string
  onChange?: (value: string) => void
}

export function Dropdown({ items, value, placeholder = 'Select...', label, onChange }: DropdownProps) {
  const [open, setOpen] = useState(false)
  const selected = items.find(i => i.value === value)

  return (
    <div className="relative w-full">
      {label && (
        <span className="block text-[9px] text-gray-2 uppercase tracking-wider mb-1">{label}</span>
      )}
      <button
        onClick={() => setOpen(o => !o)}
        className={[
          'w-full flex items-center justify-between gap-2 h-16 px-4 rounded border',
          'text-sm text-white bg-surface-elevated transition-colors duration-150',
          'hover:border-gray-2 focus:outline-none',
          open ? 'border-primary' : 'border-gray-3',
        ].join(' ')}
      >
        <div className="flex items-center gap-2 min-w-0">
          <Icon name="wifi" size={20} className="text-gray-2 shrink-0" />
          <span className="truncate text-[10px]">{selected?.label ?? placeholder}</span>
        </div>
        <Icon
          name="expand_content"
          size={16}
          className={`text-gray-2 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-surface-elevated border border-gray-3 rounded shadow-xl z-50 overflow-hidden">
          {items.map((item, i) => (
            <div key={item.value}>
              <button
                onClick={() => { onChange?.(item.value); setOpen(false) }}
                className={[
                  'w-full flex items-center gap-3 px-4 py-3 text-left transition-colors duration-100',
                  'hover:bg-surface-overlay',
                  item.value === value ? 'text-primary' : 'text-white',
                ].join(' ')}
              >
                {item.icon && (
                  <Icon name="wifi" size={16} className="text-gray-2 shrink-0" />
                )}
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] font-medium truncate">{item.label}</span>
                  {item.description && (
                    <span className="text-[9px] text-gray-2 truncate">{item.description}</span>
                  )}
                </div>
                {item.value === value && (
                  <Icon name="close" size={14} className="ml-auto text-primary shrink-0" />
                )}
              </button>
              {i < items.length - 1 && <Divider />}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
