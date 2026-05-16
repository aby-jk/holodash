import { Icon } from '../atoms/Icon'
import { Button } from '../atoms/Button'
import { Checkbox } from '../atoms/Checkbox'
import { Divider } from '../atoms/Divider'
import { Slider } from '../molecules/Slider'
import { DeviceVector, type DeviceProperty } from '../atoms/DeviceVector'

export type CardVariant = 'connected' | 'with-checkbox' | 'pairing'

export interface CalibrationItem {
  label: string
  ok: boolean
}

export interface CardProps {
  variant?: CardVariant
  property?: DeviceProperty
  deviceActive?: boolean
  serialNumber?: string
  name?: string
  version?: string
  connectionType?: 'wifi' | 'usb'
  batteryPercent?: number
  calibrations?: CalibrationItem[]
  hapticPower?: number
  onHapticPowerChange?: (v: number) => void
  onDisconnect?: () => void
  onRestart?: () => void
  onPair?: () => void
  pairLabel?: string
  selected?: boolean
  onSelect?: (v: boolean) => void
  className?: string
}

const cardShadow =
  '0px 5px 8px rgba(0,0,0,0.5), inset 0px 4px 4px rgba(255,255,255,0.1)'
const cardShadowSelected =
  '0px 5px 8px rgba(242,92,0,0.1), inset 0px 4px 4px rgba(255,255,255,0.1)'

export function Card({
  variant = 'connected',
  property = 'jacket',
  deviceActive = true,
  serialNumber = 'SN0123-G5L0003',
  name = 'P1 Holo Jacket',
  version = 'Version 2.3',
  connectionType = 'wifi',
  batteryPercent = 25,
  calibrations = [
    { label: 'Haptics', ok: true },
    { label: 'MoCap', ok: true },
  ],
  hapticPower = 26,
  onHapticPowerChange,
  onDisconnect,
  onRestart,
  onPair,
  pairLabel = 'Pair',
  selected = false,
  onSelect,
  className = '',
}: CardProps) {
  const isPairing = variant === 'pairing'
  const hasCheckbox = variant === 'with-checkbox'

  return (
    <div
      className={[
        'relative flex flex-col items-center p-4 rounded-lg bg-surface-elevated border',
        isPairing ? 'h-[360px] justify-between' : 'gap-5',
        selected ? 'border-primary' : 'border-gray-3',
        className,
      ].join(' ')}
      style={{
        width: 288,
        boxShadow: selected ? cardShadowSelected : cardShadow,
      }}
    >
      {/* ── Top bar ── */}
      <div className="flex items-center justify-between w-full h-6 shrink-0">
        <div className="flex items-center gap-1.5">
          <Icon name={connectionType} size={16} className="text-white" />
          <Icon name="battery" size={16} className="text-white" />
          <span className="text-body text-white">{batteryPercent}%</span>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" shape="circle-sm">
            <Icon name="info_i" size={12} />
          </Button>
          {hasCheckbox && (
            <Checkbox checked={selected} onChange={onSelect} />
          )}
        </div>
      </div>

      {isPairing ? (
        /* ── Pairing body ── */
        <div className="flex flex-col items-center gap-5 w-full">
          <DeviceVector property={property} state={deviceActive} width={144} height={180} />
          <div className="flex flex-col items-center gap-2.5">
            <span className="text-h3 text-white text-center">{serialNumber}</span>
            <span className="text-body-muted text-gray-2">{version}</span>
          </div>
        </div>
      ) : (
        /* ── Connected body ── */
        <>
          {/* Device info row */}
          <div className="flex items-center justify-between w-full">
            {/* Left column: details + divider + calibration */}
            <div className="flex-1 flex flex-col gap-5 self-stretch justify-center min-w-0 pr-2">
              <div className="flex flex-col gap-3">
                <span className="text-body text-gray-2 whitespace-nowrap">{serialNumber}</span>
                <div className="flex flex-col">
                  <span className="text-h3 text-white">{name}</span>
                  <span className="text-body-muted text-gray-2">{version}</span>
                </div>
              </div>
              <Divider />
              <div className="flex flex-col gap-3">
                <span className="text-body text-white">Calibration</span>
                <div className="flex items-center gap-3">
                  {calibrations.map(c => (
                    <div key={c.label} className="flex items-center gap-1 h-4">
                      <div
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ backgroundColor: c.ok ? '#6DB611' : '#9E9E9E' }}
                      />
                      <span className="text-body text-gray-2 whitespace-nowrap">{c.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Right: device vector */}
            <div className="w-28 h-[140px] overflow-hidden shrink-0">
              <DeviceVector property={property} state={deviceActive} width={112} height={140} />
            </div>
          </div>

          <Divider />

          {/* Slider */}
          <Slider
            label="Global Haptic Power"
            value={hapticPower}
            onChange={onHapticPowerChange}
            unit="%"
          />

          {/* Actions */}
          <div className="flex items-center justify-between w-full">
            <div className="w-6 h-6 opacity-0 pointer-events-none shrink-0" />
            <Button variant="secondary" size="sm" label="Disconnect" onClick={onDisconnect} />
            <Button variant="secondary" shape="circle" onClick={onRestart}>
              <Icon name="restart_alt" size={16} />
            </Button>
          </div>
        </>
      )}

      {isPairing && (
        <Button variant="secondary" size="sm" label={pairLabel} onClick={onPair} />
      )}
    </div>
  )
}
