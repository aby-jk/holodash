import { useState, useRef, useEffect } from 'react'
import { Navbar } from '../design-system/organisms/Navbar'
import { Icon, type IconName } from '../design-system/atoms/Icon'
import { Toggle } from '../design-system/atoms/Toggle'
import { Button } from '../design-system/atoms/Button'
import { Divider } from '../design-system/atoms/Divider'
import { CalibrationStatus } from '../design-system/molecules/CalibrationStatus'
import { SegmentControl } from '../design-system/molecules/SegmentControl'
import { Slider } from '../design-system/molecules/Slider'
import { DeviceTile } from '../design-system/atoms/DeviceTile'
import { type DeviceProperty } from '../design-system/atoms/DeviceVector'
import { SuitVector } from '../design-system/atoms/SuitVector'
import { AlertsDropdown, type Alert } from '../design-system/organisms/NavDropdowns'

interface HoloSuitPageProps {
  onHome?: () => void
  connectedDeviceIds?: string[]
}

const DEVICES: { id: string; property: DeviceProperty; label: string }[] = [
  { id: 'jacket',    property: 'jacket',      label: 'HoloJacket' },
  { id: 'pants',     property: 'pants',       label: 'HoloPants'  },
  { id: 'holoface',  property: 'holoface',    label: 'HoloFace'   },
  { id: 'lglove',    property: 'left glove',  label: 'Left Glove' },
  { id: 'rglove',    property: 'right glove', label: 'Right Glove'},
]

const FALLBACK_SELECTED = new Set(['jacket', 'pants', 'holoface'])

const INITIAL_ERRORS: Alert[] = [
  { id: 'e1', title: 'HoloJacket Disconnected', code: 'E-101', description: 'Connection lost. Check WiFi and retry.' },
  { id: 'e2', title: 'Calibration Error', code: 'E-204' },
]

const INITIAL_WARNINGS: Alert[] = [
  { id: 'w1', title: 'Low Battery – HoloJacket', code: 'W-001', description: '15% battery remaining.' },
  { id: 'w2', title: 'Sync Lag Detected', code: 'W-102' },
]

const AVATARS = [
  { id: 'default', src: '/avatars/default.png', label: 'Default' },
  { id: 'trooper', src: '/avatars/trooper.png', label: 'Trooper' },
  { id: 'girl',    src: '/avatars/girl.png',    label: 'Girl'    },
  { id: 'cop',     src: '/avatars/cop.png',     label: 'Cop'     },
  { id: 'bot',     src: '/avatars/bot.png',     label: 'Robot'   },
]

export default function HoloSuitPage({ onHome, connectedDeviceIds = [] }: HoloSuitPageProps) {
  const [activeTab, setActiveTab] = useState<'mocap' | 'haptics'>('mocap')
  const [selectedAvatar, setSelectedAvatar] = useState('default')

  // Only show devices that are connected; fall back to all if none provided
  const visibleDevices = connectedDeviceIds.length > 0
    ? DEVICES.filter(d => connectedDeviceIds.includes(d.id))
    : DEVICES

  // All visible device IDs — used by the "select all" toggle
  const allVisibleIds = visibleDevices.map(d => d.id)

  // Initial selection = all connected devices (or hardcoded fallback)
  const [initialSelected] = useState<Set<string>>(() =>
    new Set(connectedDeviceIds.length > 0
      ? connectedDeviceIds.filter(id => DEVICES.some(d => d.id === id))
      : Array.from(FALLBACK_SELECTED)
    )
  )

  const [allDevices, setAllDevices]           = useState(false)
  const [selectedDevices, setSelectedDevices] = useState(() => new Set(initialSelected))
  const [expanded, setExpanded]               = useState(false)

  const [openAlert, setOpenAlert]   = useState<'error' | 'warning' | null>(null)
  const [errors, setErrors]         = useState<Alert[]>(INITIAL_ERRORS)
  const [warnings, setWarnings]     = useState<Alert[]>(INITIAL_WARNINGS)

  const [globalPower, setGlobalPower]   = useState(50)
  const [zonePower, setZonePower]       = useState<[number, number, number, number]>([50, 50, 50, 50])
  const [activeZone, setActiveZone]         = useState<1 | 2 | 3 | 4 | null>(null)
  const [testingZone, setTestingZone]       = useState<1 | 2 | 3 | 4 | null>(null)
  const [testingGlobal, setTestingGlobal]   = useState(false)
  const testTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const toolbarAlertsRef = useRef<HTMLDivElement>(null)
  const errorBtnRef      = useRef<HTMLDivElement>(null)
  const warningBtnRef    = useRef<HTMLDivElement>(null)

  // AlertsDropdown: width 411, caretLeft 353 → caretRight = 411 - 353 - 35 = 23
  const ALERT_CARET_RIGHT = 23
  const CARET_HALF = 17.5

  function getAlertRight(btnRef: React.RefObject<HTMLDivElement>): number {
    const el = btnRef.current
    const container = toolbarAlertsRef.current
    if (!el || !container) return 0
    const btnRect = el.getBoundingClientRect()
    const cRect   = container.getBoundingClientRect()
    const centerFromRight = cRect.right - (btnRect.left + btnRect.width / 2)
    return centerFromRight - (ALERT_CARET_RIGHT + CARET_HALF)
  }

  useEffect(() => {
    function handleOut(e: MouseEvent) {
      if (toolbarAlertsRef.current && !toolbarAlertsRef.current.contains(e.target as Node)) {
        setOpenAlert(null)
      }
    }
    document.addEventListener('mousedown', handleOut)
    return () => document.removeEventListener('mousedown', handleOut)
  }, [])

  useEffect(() => () => { if (testTimerRef.current) clearTimeout(testTimerRef.current) }, [])

  function handleAllDevicesToggle(checked: boolean) {
    setAllDevices(checked)
    setSelectedDevices(checked ? new Set(allVisibleIds) : new Set(initialSelected))
  }

  function toggleDevice(id: string) {
    setSelectedDevices(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  return (
    <div className="w-full h-full bg-[#161616] flex flex-col overflow-hidden">
      <Navbar
        wifiConnected
        bluetoothConnected
        profileName="Profile 1"
        wifiLabel="HS WiFi"
      />

      {/* ── Content ── */}
      <div className="flex-1 flex gap-5 items-stretch p-6 min-h-0">

        {/* ── Left: Viewport ── */}
        <div className="flex-1 bg-gray-4 rounded-xl flex flex-col overflow-hidden min-w-0">

          {/* Toolbar */}
          <div className="flex items-center justify-between px-5 py-4 shrink-0">
            {/* Home */}
            <div className="flex-1">
              <CircleBtn icon="home" size={32} iconSize={20} onClick={onHome} />
            </div>

            {/* MoCap / Haptics segment control */}
            <SegmentControl
              selected={activeTab}
              onChange={setActiveTab}
              mocapStatus="ok"
              hapticsStatus="ok"
            />

            {/* Right icons */}
            <div ref={toolbarAlertsRef} className="flex-1 relative flex items-center justify-end gap-4">
              <div ref={errorBtnRef}>
                <CircleBtn icon="error" size={32} iconSize={20}
                  onClick={() => setOpenAlert(o => o === 'error' ? null : 'error')} />
              </div>
              <div ref={warningBtnRef}>
                <CircleBtn icon="warning" size={32} iconSize={20}
                  onClick={() => setOpenAlert(o => o === 'warning' ? null : 'warning')} />
              </div>
              {activeTab === 'mocap' && (
                <CircleBtn
                  icon={expanded ? 'collapse_content' : 'expand_content'}
                  size={32} iconSize={20}
                  onClick={() => setExpanded(v => !v)}
                />
              )}

              {/* Shared dropdown — positioned like the Navbar */}
              {openAlert && (
                <div
                  className="absolute top-[calc(100%+21px)] z-50"
                  style={{ right: getAlertRight(openAlert === 'error' ? errorBtnRef : warningBtnRef) }}
                >
                  {openAlert === 'error' && (
                    <AlertsDropdown
                      alerts={errors}
                      onDismiss={id => setErrors(es => es.filter(e => e.id !== id))}
                      onClearAll={() => setErrors([])}
                    />
                  )}
                  {openAlert === 'warning' && (
                    <AlertsDropdown
                      alerts={warnings}
                      onDismiss={id => setWarnings(ws => ws.filter(w => w.id !== id))}
                      onClearAll={() => setWarnings([])}
                    />
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Viewport body */}
          {activeTab === 'mocap' ? (
            <div className="flex-1 relative flex items-center justify-center overflow-hidden">
              <img
                src="/viewport-bg.png"
                alt=""
                className={`absolute pointer-events-none select-none transition-all duration-300 ${
                  expanded
                    ? 'top-[62%] left-1/2 -translate-x-1/2 w-[117%] object-bottom'
                    : 'bottom-0 left-0 w-full'
                }`}
                draggable={false}
              />
              <img
                src={AVATARS.find(a => a.id === selectedAvatar)?.src}
                alt="HoloSuit avatar"
                className="relative h-full object-contain select-none"
                draggable={false}
              />

              {/* View controls sidebar */}
              <div className="absolute left-5 top-1/2 -translate-y-1/2 flex flex-col gap-3 bg-gray-4 border border-gray-3 rounded-[8px] p-2"
                style={{ boxShadow: 'inset 0px -2px 4px rgba(255,255,255,0.25), inset 0px 2px 4px rgba(0,0,0,0.25)' }}>
                <Icon name="360"      size={24} className="cursor-pointer opacity-80 hover:opacity-100" />
                <Icon name="move"     size={24} className="cursor-pointer opacity-80 hover:opacity-100" />
                <Icon name="zoom_in"  size={24} className="cursor-pointer opacity-80 hover:opacity-100" />
                <Icon name="recenter" size={24} className="cursor-pointer opacity-80 hover:opacity-100" />
              </div>
            </div>
          ) : (
            /* Haptics viewport — front + back suit vectors */
            <div className="flex-1 flex flex-col items-center justify-between py-6 gap-6 overflow-hidden min-h-0">
              <div className="flex-1 min-h-0 flex items-center justify-center gap-[100px]">
                <SuitVector view="front" zone={activeZone ?? undefined} selected={testingGlobal} height={9999} className="max-h-[80%]" />
                <SuitVector view="back"  zone={activeZone ?? undefined} selected={testingGlobal} height={9999} className="max-h-[80%]" />
              </div>
              <Button variant="primary" size="sm" label="Check Global Haptics" onClick={() => {
                setTestingGlobal(true)
                if (testTimerRef.current) clearTimeout(testTimerRef.current)
                testTimerRef.current = setTimeout(() => setTestingGlobal(false), 5000)
              }} />
            </div>
          )}
        </div>

        {/* ── Right: Settings panel ── */}
        {(activeTab === 'haptics' || !expanded) && (
          <div className="bg-gray-4 rounded-xl flex flex-col p-6 w-[475px] shrink-0 overflow-y-auto"
            style={{ scrollbarWidth: 'none' }}>

            {activeTab === 'mocap' ? (
              /* ── MoCap panel ── */
              <div className="flex flex-col gap-6">
                {/* Header */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <h2 className="text-h2 text-white">Profile 1's HoloSuit</h2>
                    <CircleBtn icon="restart_alt" size={24} iconSize={16} />
                  </div>
                  <div className="flex items-center gap-10">
                    <span className="text-h3 text-white">SN0123-G5L0003</span>
                    <span className="text-h3 text-gray-2">Version 2.3</span>
                  </div>
                </div>

                <Divider />

                {/* Calibration */}
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-2">
                    <span className="text-h3 text-white">Calibration</span>
                    <CalibrationStatus state="success" label="Successful" />
                  </div>
                  <Button variant="primary" size="sm" label="Calibrate" />
                </div>

                <Divider />

                {/* All Devices */}
                <div className="flex flex-col gap-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="text-h3 text-white">All Devices</span>
                      <CircleBtn icon="info_i" size={16} iconSize={12} />
                    </div>
                    <Toggle checked={allDevices} onChange={handleAllDevicesToggle} />
                  </div>
                  <div className="flex flex-wrap gap-[18.5px]">
                    {visibleDevices.map(d => (
                      <DeviceTile
                        key={d.id}
                        property={d.property}
                        label={d.label}
                        selected={selectedDevices.has(d.id)}
                        onClick={() => toggleDevice(d.id)}
                      />
                    ))}
                  </div>
                </div>

                <Divider />

                {/* Avatar Selection */}
                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-1.5">
                    <span className="text-h3 text-white">Avatar Selection</span>
                    <CircleBtn icon="info_i" size={16} iconSize={12} />
                  </div>
                  <div className="flex flex-wrap gap-[18.5px]">
                    {AVATARS.map(a => (
                      <AvatarTile
                        key={a.id}
                        src={a.src}
                        label={a.label}
                        selected={selectedAvatar === a.id}
                        onClick={() => setSelectedAvatar(a.id)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* ── Haptics panel ── */
              <div className="flex flex-col justify-between h-full gap-6">
                <div className="flex flex-col gap-6">
                  {/* Header */}
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <h2 className="text-h2 text-white">Profile 1's HoloSuit</h2>
                      <CircleBtn icon="restart_alt" size={24} iconSize={16} />
                    </div>
                    <div className="flex items-center gap-10">
                      <span className="text-h3 text-white">SN0123-G5L0003</span>
                      <span className="text-h3 text-gray-2">Version 2.3</span>
                    </div>
                  </div>

                  <Divider />

                  {/* Calibration */}
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-2">
                      <span className="text-h3 text-white">Calibration</span>
                      <CalibrationStatus state="success" label="Successful" />
                    </div>
                    <Button variant="secondary" size="sm" label="Recalibrate" />
                  </div>

                  <Divider />

                  {/* Global Haptic Power */}
                  <div className="flex flex-col gap-6">
                    <div className="flex items-center justify-between h-5">
                      <div className="flex items-center gap-1.5">
                        <span className="text-h3 text-white">Global Haptic Power</span>
                        <CircleBtn icon="info_i" size={16} iconSize={12} />
                      </div>
                      <CircleBtn icon="restart_alt" size={24} iconSize={16}
                        onClick={() => setGlobalPower(50)} />
                    </div>
                    <Slider
                      variant="long"
                      value={globalPower}
                      onChange={setGlobalPower}
                      onTest={() => {
                        setTestingGlobal(true)
                        if (testTimerRef.current) clearTimeout(testTimerRef.current)
                        testTimerRef.current = setTimeout(() => setTestingGlobal(false), 5000)
                      }}
                    />
                  </div>

                  <Divider />

                  {/* Zonal Haptic Power */}
                  <div className="flex flex-col gap-6">
                    <div className="flex items-center justify-between h-5">
                      <div className="flex items-center gap-1.5">
                        <span className="text-h3 text-white">Zonal Haptic Power</span>
                        <CircleBtn icon="info_i" size={16} iconSize={12} />
                      </div>
                      <CircleBtn icon="restart_alt" size={24} iconSize={16}
                        onClick={() => setZonePower([50, 50, 50, 50])} />
                    </div>
                    <div className="flex flex-col gap-10">
                      {(['Zone 1', 'Zone 2', 'Zone 3', 'Zone 4'] as const).map((label, i) => {
                        const zoneNum = (i + 1) as 1 | 2 | 3 | 4
                        const isDisabled = testingZone !== null && testingZone !== zoneNum
                        return (
                          <div key={label} className="flex flex-col gap-[10px]">
                            <span className="text-body text-white">{label}</span>
                              <Slider
                                variant={isDisabled ? 'long-inactive' : 'long'}
                                value={zonePower[i]}
                                onChange={v => {
                                  setActiveZone(zoneNum)
                                  setZonePower(prev => {
                                    const next = [...prev] as [number, number, number, number]
                                    next[i] = v
                                    return next
                                  })
                                }}
                                onTest={() => {
                                  setActiveZone(zoneNum)
                                  setTestingZone(zoneNum)
                                  if (testTimerRef.current) clearTimeout(testTimerRef.current)
                                  testTimerRef.current = setTimeout(() => {
                                    setTestingZone(null)
                                    setActiveZone(null)
                                  }, 5000)
                                }}
                              />
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>

                <Button variant="secondary" size="sm" label="Apply Changes" className="self-center" />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

// ── Internal helpers ────────────────────────────────────────────────────────

function CircleBtn({
  icon, size = 24, iconSize = 16, onClick,
}: {
  icon: IconName
  size?: number
  iconSize?: number
  onClick?: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="relative flex items-center justify-center bg-gray-3 rounded-full shrink-0 transition-colors hover:bg-gray-2/40 focus:outline-none"
      style={{
        width: size,
        height: size,
        boxShadow: '0px 1px 0.75px rgba(0,0,0,0.5), 0px 0px 1px rgba(0,0,0,0.25)',
      }}
    >
      <Icon name={icon} size={iconSize} />
      <span className="absolute inset-0 rounded-full pointer-events-none"
        style={{ boxShadow: 'inset 0px 1px 1px rgba(255,255,255,0.5)' }} />
    </button>
  )
}


function AvatarTile({
  src, label, selected, onClick,
}: {
  src: string
  label: string
  selected: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={[
        'relative flex flex-col gap-1 items-center justify-center p-3 bg-surface',
        'rounded-lg border size-[130px] shrink-0 overflow-hidden transition-colors duration-150',
        selected ? 'border-primary' : 'border-gray-3',
      ].join(' ')}
    >
      {/* Gray nameplate — absolute at top-[79px], same as Figma */}
      <div className="absolute left-0 right-0 top-[79px] h-[50px] bg-gray-3" />

      {/* Avatar image — in flex flow, 100×100 */}
      <img
        src={src}
        alt={label}
        className="relative shrink-0 size-[100px] object-cover object-top"
        draggable={false}
      />

      {/* Label — in flex flow after gap-1; naturally falls inside the gray bar */}
      <span className={`relative text-h3 ${selected ? 'text-white' : 'text-gray-2'}`}>
        {label}
      </span>

      {/* Selected badge — identical to DeviceTile */}
      {selected && (
        <>
          <div className="absolute top-0 right-0 size-[27px] bg-primary rounded-bl-[8px] flex items-center justify-center">
            <svg width="13" height="10" viewBox="0 0 13 10" fill="none">
              <path d="M1.5 5L5 8.5L11.5 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="absolute top-0 right-[27px] size-2 bg-surface rounded-br-[8px] pointer-events-none" />
          <div className="absolute top-[27px] right-0 size-2 bg-surface rounded-tl-[8px] pointer-events-none" />
        </>
      )}
    </button>
  )
}
