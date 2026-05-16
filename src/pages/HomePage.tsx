import { useRef, useState } from 'react'
import { Navbar } from '../design-system/organisms/Navbar'
import { Card, type CalibrationItem } from '../design-system/organisms/Card'
import { Button } from '../design-system/atoms/Button'
import { ScrollBar } from '../design-system/molecules/ScrollBar'
import { type DeviceProperty } from '../design-system/atoms/DeviceVector'

// ── Shared types & data (exported so App.tsx can own the state) ───────────────

export interface BaseDevice {
  id: string
  property: DeviceProperty
  serialNumber: string
  version: string
  connectionType: 'wifi' | 'usb'
  batteryPercent: number
}

export interface ConnectedDevice extends BaseDevice {
  name: string
  calibrations: CalibrationItem[]
  hapticPower: number
}

export interface AvailableDevice extends BaseDevice {
  pairLabel: string
}

export const DEVICE_NAMES: Record<DeviceProperty, string> = {
  jacket:       'P1 HoloJacket',
  pants:        'P1 HoloPants',
  holoface:     'P1 HoloFace',
  'left glove': 'P1 Left Glove',
  'right glove':'P1 Right Glove',
}

export const INITIAL_CONNECTED: ConnectedDevice[] = [
  {
    id: 'jacket', property: 'jacket', serialNumber: 'SN0123-G5L0003',
    name: 'P1 HoloJacket', version: 'Version 2.3', connectionType: 'wifi',
    batteryPercent: 25, calibrations: [{ label: 'Haptics', ok: true }, { label: 'MoCap', ok: true }],
    hapticPower: 26,
  },
  {
    id: 'pants', property: 'pants', serialNumber: 'SN0123-G5L0003',
    name: 'P1 HoloPants', version: 'Version 2.3', connectionType: 'wifi',
    batteryPercent: 25, calibrations: [{ label: 'Haptics', ok: true }, { label: 'MoCap', ok: true }],
    hapticPower: 26,
  },
  {
    id: 'holoface', property: 'holoface', serialNumber: 'SN0123-G5L0003',
    name: 'P1 HoloFace', version: 'Version 2.3', connectionType: 'wifi',
    batteryPercent: 25, calibrations: [{ label: 'Haptics', ok: false }, { label: 'MoCap', ok: false }],
    hapticPower: 26,
  },
]

export const INITIAL_AVAILABLE: AvailableDevice[] = [
  { id: 'lglove',    property: 'left glove',  serialNumber: 'SN0123-G5L0003', version: 'Version 2.3', connectionType: 'usb',  batteryPercent: 25, pairLabel: 'Connect' },
  { id: 'rglove',    property: 'right glove', serialNumber: 'SN0123-G5L0003', version: 'Version 2.3', connectionType: 'usb',  batteryPercent: 25, pairLabel: 'Connect' },
  { id: 'jacket2',   property: 'jacket',      serialNumber: 'SN0123-G5L0003', version: 'Version 2.3', connectionType: 'wifi', batteryPercent: 25, pairLabel: 'Pair'    },
  { id: 'pants2',    property: 'pants',       serialNumber: 'SN0123-G5L0003', version: 'Version 2.3', connectionType: 'wifi', batteryPercent: 25, pairLabel: 'Pair'    },
  { id: 'holoface2', property: 'holoface',    serialNumber: 'SN0123-G5L0003', version: 'Version 2.3', connectionType: 'wifi', batteryPercent: 25, pairLabel: 'Pair'    },
]

// ── Component ─────────────────────────────────────────────────────────────────

interface HomePageProps {
  connected: ConnectedDevice[]
  available: AvailableDevice[]
  onPair: (deviceId: string) => void
  onDisconnect: (deviceId: string) => void
  onHapticPowerChange: (deviceId: string, value: number) => void
  onLaunch?: () => void
}

export default function HomePage({
  connected,
  available,
  onPair,
  onDisconnect,
  onHapticPowerChange,
  onLaunch,
}: HomePageProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [selectMode, setSelectMode] = useState(false)
  const [selectedCards, setSelectedCards] = useState<Set<string>>(new Set())

  function toggleSelect(id: string, on: boolean) {
    setSelectedCards(prev => {
      const next = new Set(prev)
      on ? next.add(id) : next.delete(id)
      return next
    })
  }

  function handleDisconnect(deviceId: string) {
    setSelectedCards(prev => { const next = new Set(prev); next.delete(deviceId); return next })
    onDisconnect(deviceId)
  }

  return (
    <div className="min-h-screen bg-surface">
      <div className="sticky top-0 z-10">
        <Navbar wifiConnected bluetoothConnected profileName="Profile 1" wifiLabel="HS WiFi" />
      </div>

      {/* ── Profile 1's Devices ── */}
      <section className="px-10 pt-[30px] pb-0 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h2 className="text-h2 text-white">Profile 1's Devices</h2>
          <div className="flex items-center gap-3">
            <Button
              variant="secondary"
              size="sm"
              label={selectMode ? 'Done' : 'Select'}
              onClick={() => { setSelectMode(v => !v); setSelectedCards(new Set()) }}
            />
            <Button variant="primary" size="sm" label="Launch HoloSuit" onClick={onLaunch} />
          </div>
        </div>

        <div className="flex gap-6 flex-wrap">
          {connected.map(device => (
            <Card
              key={device.id}
              variant={selectMode ? 'with-checkbox' : 'connected'}
              property={device.property}
              deviceActive
              serialNumber={device.serialNumber}
              name={device.name}
              version={device.version}
              connectionType={device.connectionType}
              batteryPercent={device.batteryPercent}
              calibrations={device.calibrations}
              hapticPower={device.hapticPower}
              onHapticPowerChange={v => onHapticPowerChange(device.id, v)}
              selected={selectedCards.has(device.id)}
              onSelect={v => toggleSelect(device.id, v)}
              onDisconnect={() => handleDisconnect(device.id)}
            />
          ))}
        </div>
      </section>

      {/* ── Available Devices ── */}
      <section className="px-10 py-[30px] flex flex-col gap-6">
        <h2 className="text-h2 text-white">Available Devices</h2>

        <div ref={scrollRef} className="overflow-x-auto -mx-10 -my-4 py-4" style={{ scrollbarWidth: 'none' }}>
          <div className="flex gap-6 px-10">
            {available.map(device => (
              <Card
                key={device.id}
                className="shrink-0"
                variant="pairing"
                property={device.property}
                deviceActive={false}
                serialNumber={device.serialNumber}
                version={device.version}
                connectionType={device.connectionType}
                batteryPercent={device.batteryPercent}
                pairLabel={device.pairLabel}
                onPair={() => onPair(device.id)}
              />
            ))}
          </div>
        </div>

        <ScrollBar scrollRef={scrollRef} className="w-full" />
      </section>
    </div>
  )
}
