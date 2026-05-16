interface LogoProps {
  height?: number
  className?: string
}

export function Logo({ height = 40, className = '' }: LogoProps) {
  const width = Math.round((347 / 40) * height)
  return (
    <img
      src={`${import.meta.env.BASE_URL}logo.svg`}
      alt="HOLOSUIT"
      width={width}
      height={height}
      style={{ width, height }}
      className={`select-none shrink-0 ${className}`}
    />
  )
}
