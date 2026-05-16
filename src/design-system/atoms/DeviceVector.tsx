export type DeviceProperty = 'jacket' | 'pants' | 'holoface' | 'left glove' | 'right glove'

interface DeviceVectorProps {
  property: DeviceProperty
  state: boolean
  width?: number
  height?: number
}

const slugMap: Record<DeviceProperty, string> = {
  'jacket':      'device_jacket',
  'pants':       'device_pants',
  'holoface':    'device_holoface',
  'left glove':  'device_left_glove',
  'right glove': 'device_right_glove',
}

export function DeviceVector({ property, state, width = 120, height = 150 }: DeviceVectorProps) {
  const slug = slugMap[property]
  const suffix = state ? 'active' : 'inactive'
  const src = `${import.meta.env.BASE_URL}${slug}_${suffix}.svg`

  return (
    <img
      src={src}
      alt={`${property} ${suffix}`}
      width={width}
      height={height}
      style={{ width, height, objectFit: 'contain' }}
    />
  )
}
