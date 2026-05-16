import { useState, useRef, useEffect } from 'react'
import { Logo } from '../atoms/Logo'
import { Button } from '../atoms/Button'
import { Icon } from '../atoms/Icon'
import {
  WifiDropdown,
  ProfileDropdown,
  AlertsDropdown,
  OthersDropdown,
  type WifiNetwork,
  type Profile,
  type Alert,
} from './NavDropdowns'
import { WifiPopup, ProfilePopup } from './Popups'

interface NavbarProps {
  wifiLabel?: string
  wifiConnected?: boolean
  bluetoothConnected?: boolean
  profileName?: string
  onBluetooth?: () => void
  onSettings?: () => void
  className?: string
}

const WIFI_KNOWN: WifiNetwork[]   = [{ id: 'hsw', name: 'HS WiFi' }]
const WIFI_AVAILABLE: WifiNetwork[] = [
  { id: 'net1', name: 'Network 1' },
  { id: 'net2', name: 'Network 2' },
]
const INITIAL_PROFILES: Profile[] = [
  { id: 'p1', name: 'Profile 1', active: true },
  { id: 'p2', name: 'Profile 2' },
]
const INITIAL_ALERTS: Alert[] = [
  {
    id: 'a1',
    title: 'HoloJacket Disconnected',
    code: 'E-101',
    description: 'Check your WiFi connection and try again.',
  },
  { id: 'a2', title: 'Calibration Required' },
]

type OpenDropdown = 'wifi' | 'profile' | 'alerts' | 'help' | null

const navShadow =
  '0px 4px 5px rgba(0,0,0,0.09), inset 0px 0.5px 0.75px rgba(255,255,255,0.5)'

// Each dropdown's width and default caretRight must match NavDropdowns.tsx defaults
const DROPDOWN_CONFIG: Record<NonNullable<OpenDropdown>, { width: number; caretRight: number }> = {
  wifi:    { width: 272, caretRight: 19 },
  profile: { width: 272, caretRight: 19 },
  alerts:  { width: 411, caretRight: 23 },
  help:    { width: 156, caretRight: 16 },
}
const CARET_HALF = 17.5 // half of the 35px caret SVG width

export function Navbar({
  wifiLabel = 'HS WiFi',
  wifiConnected = true,
  bluetoothConnected = true,
  profileName = 'Profile 1',
  onBluetooth,
  onSettings,
  className = '',
}: NavbarProps) {
  const [open, setOpen]                       = useState<OpenDropdown>(null)
  const [wifiEnabled, setWifiEnabled]         = useState(true)
  const [selectedNetwork, setSelectedNetwork] = useState('hsw')
  const [profiles, setProfiles]               = useState<Profile[]>(INITIAL_PROFILES)
  const [profileMode, setProfileMode]         = useState<'view' | 'manage'>('view')
  const [alerts, setAlerts]                   = useState<Alert[]>(INITIAL_ALERTS)

  // Popup state
  const [popup, setPopup]                         = useState<'wifi' | 'profile' | null>(null)
  const [connectingNetwork, setConnectingNetwork] = useState<WifiNetwork | null>(null)
  const [wifiPassword, setWifiPassword]           = useState('')
  const [showWifiPassword, setShowWifiPassword]   = useState(false)
  const [newProfileName, setNewProfileName]       = useState('')

  function openWifiPopup(network: WifiNetwork) {
    setConnectingNetwork(network)
    setOpen(null)
    setPopup('wifi')
  }

  function openProfilePopup() {
    setOpen(null)
    setPopup('profile')
  }

  function closePopup() {
    setPopup(null)
    setWifiPassword('')
    setShowWifiPassword(false)
    setNewProfileName('')
  }

  const navRef  = useRef<HTMLElement>(null)
  const wifiRef = useRef<HTMLDivElement>(null)
  const profRef = useRef<HTMLDivElement>(null)
  const bellRef = useRef<HTMLDivElement>(null)
  const helpRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleOut(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpen(null)
    }
    document.addEventListener('mousedown', handleOut)
    return () => document.removeEventListener('mousedown', handleOut)
  }, [])

  function toggle(name: NonNullable<OpenDropdown>) {
    setOpen(prev => (prev === name ? null : name))
  }

  // Calculate how far the dropdown should be from the navbar's right edge so
  // the caret tip centres exactly over the clicked circle button.
  function getRight(name: NonNullable<OpenDropdown>): number {
    const refs = { wifi: wifiRef, profile: profRef, alerts: bellRef, help: helpRef }
    const el = refs[name].current
    if (!el || !navRef.current) return 0
    const btnRect = el.getBoundingClientRect()
    const navRect = navRef.current.getBoundingClientRect()
    const { caretRight } = DROPDOWN_CONFIG[name]
    const circleCenterFromNavRight = navRect.right - (btnRect.left + btnRect.width / 2)
    return circleCenterFromNavRight - (caretRight + CARET_HALF)
  }

  return (
    <nav
      ref={navRef}
      className={[
        'relative flex items-center justify-between w-full bg-surface-elevated',
        'px-10 py-4 rounded-tl-[25px] rounded-tr-[25px]',
        className,
      ].join(' ')}
      style={{ boxShadow: navShadow }}
    >
      <Logo height={16} />

      <div className="flex items-center gap-4">

        {/* Bluetooth — no dropdown */}
        <Button variant="secondary" shape="circle" onClick={onBluetooth}>
          <Icon name="bluetooth" size={16} className={bluetoothConnected ? 'text-white' : 'text-gray-2'} />
        </Button>

        {/* Wi-Fi */}
        <div className="inline-flex items-center gap-1.5">
          <div ref={wifiRef}>
            <Button
              variant={wifiConnected ? 'primary' : 'secondary'}
              shape="circle"
              onClick={() => toggle('wifi')}
            >
              <Icon name="wifi" size={16} className="text-white" />
            </Button>
          </div>
          <span className="text-body text-white">{wifiLabel}</span>
        </div>

        {/* Profile */}
        <div className="inline-flex items-center gap-1.5">
          <div ref={profRef}>
            <Button variant="secondary" shape="circle" onClick={() => toggle('profile')}>
              <Icon name="person" size={16} />
            </Button>
          </div>
          <span className="text-body text-white">{profileName}</span>
        </div>

        {/* Alerts */}
        <div ref={bellRef}>
          <Button variant="secondary" shape="circle" onClick={() => toggle('alerts')}>
            <Icon name="bell" size={16} />
          </Button>
        </div>

        {/* Help / Others */}
        <div ref={helpRef}>
          <Button variant="secondary" shape="circle" onClick={() => toggle('help')}>
            <Icon name="question_mark" size={16} />
          </Button>
        </div>

        {/* Settings — no dropdown */}
        <Button variant="secondary" shape="circle" onClick={onSettings}>
          <Icon name="settings" size={16} />
        </Button>

      </div>

      {/* All dropdowns render in one container positioned relative to the navbar.
          `right` is calculated so the caret tip aligns with the clicked button. */}
      {open && (
        <div
          className="absolute top-[calc(100%+9px)] z-50"
          style={{ right: getRight(open) }}
        >
          {open === 'wifi' && (
            <WifiDropdown
              enabled={wifiEnabled}
              onToggle={() => setWifiEnabled(v => !v)}
              knownNetworks={WIFI_KNOWN}
              availableNetworks={WIFI_AVAILABLE}
              selectedNetworkId={selectedNetwork}
              onSelectNetwork={setSelectedNetwork}
              onConnectNew={openWifiPopup}
            />
          )}
          {open === 'profile' && (
            <ProfileDropdown
              profiles={profiles}
              mode={profileMode}
              onManage={() => setProfileMode('manage')}
              onDone={() => setProfileMode('view')}
              onDeleteProfile={id => setProfiles(ps => ps.filter(p => p.id !== id))}
              onAddNew={openProfilePopup}
            />
          )}
          {open === 'alerts' && (
            <AlertsDropdown
              alerts={alerts}
              onDismiss={id => setAlerts(as => as.filter(a => a.id !== id))}
              onClearAll={() => setAlerts([])}
            />
          )}
          {open === 'help' && <OthersDropdown />}
        </div>
      )}
      {/* Popup overlays */}
      {popup && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40"
          onMouseDown={closePopup}
        >
          <div onMouseDown={e => e.stopPropagation()}>
            {popup === 'wifi' && (
              <WifiPopup
                networkName={connectingNetwork?.name}
                password={wifiPassword}
                onPasswordChange={setWifiPassword}
                showPassword={showWifiPassword}
                onShowPasswordChange={setShowWifiPassword}
                onContinue={() => {
                  if (connectingNetwork) setSelectedNetwork(connectingNetwork.id)
                  closePopup()
                }}
                onDisconnect={closePopup}
              />
            )}
            {popup === 'profile' && (
              <ProfilePopup
                profileName={newProfileName}
                onProfileNameChange={setNewProfileName}
                onCreateProfile={() => {
                  const name = newProfileName.trim()
                  if (name) setProfiles(ps => [...ps, { id: Date.now().toString(), name }])
                  closePopup()
                }}
                onCancel={closePopup}
              />
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
