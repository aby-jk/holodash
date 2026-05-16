interface DividerProps {
  orientation?: 'horizontal' | 'vertical'
  className?: string
}

export function Divider({ orientation = 'horizontal', className = '' }: DividerProps) {
  if (orientation === 'vertical') {
    return <div className={`w-px self-stretch bg-gray-4 ${className}`} />
  }
  return <hr className={`border-0 border-t border-gray-3 w-full ${className}`} />
}
