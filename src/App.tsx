import { useState, useEffect } from 'react'
import SignInPage from './pages/SignInPage'
import SignUpPage from './pages/SignUpPage'
import HomePage, {
  type ConnectedDevice,
  type AvailableDevice,
  INITIAL_CONNECTED,
  INITIAL_AVAILABLE,
  DEVICE_NAMES,
} from './pages/HomePage'
import HoloSuitPage from './pages/HoloSuitPage'
import DesignSystemPage from './design-system/DesignSystemPage'

const DESIGN_W = 1440
const DESIGN_H = 1024

function computeScale() {
  const w = Math.min(window.innerWidth, window.innerHeight * DESIGN_W / DESIGN_H)
  return w / DESIGN_W
}

type Page = 'signIn' | 'signUp' | 'home' | 'holosuit'

export default function App() {
  const [page, setPage] = useState<Page>('signIn')
  const [scale, setScale] = useState(computeScale)

  useEffect(() => {
    function onResize() { setScale(computeScale()) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  const [connected, setConnected] = useState<ConnectedDevice[]>(INITIAL_CONNECTED)
  const [available, setAvailable] = useState<AvailableDevice[]>(INITIAL_AVAILABLE)
  const isDS = new URLSearchParams(window.location.search).has('ds')

  function handlePair(deviceId: string) {
    const device = available.find(d => d.id === deviceId)
    if (!device) return
    setAvailable(prev => prev.filter(d => d.id !== deviceId))
    setConnected(prev => [
      ...prev,
      {
        ...device,
        name: DEVICE_NAMES[device.property],
        calibrations: [{ label: 'Haptics', ok: false }, { label: 'MoCap', ok: false }],
        hapticPower: 26,
      },
    ])
  }

  function handleDisconnect(deviceId: string) {
    const device = connected.find(d => d.id === deviceId)
    if (!device) return
    setConnected(prev => prev.filter(d => d.id !== deviceId))
    setAvailable(prev => [...prev, { ...device, pairLabel: 'Connect' }])
  }

  function handleHapticPowerChange(deviceId: string, value: number) {
    setConnected(prev => prev.map(d => d.id === deviceId ? { ...d, hapticPower: value } : d))
  }

  const connectedDeviceIds = connected.map(d => d.id)

  return (
    <div className="w-screen h-screen bg-black flex items-center justify-center overflow-hidden">
      {/* Outer shell — same aspect ratio as design frame, fills available space */}
      <div style={{
        width: DESIGN_W * scale,
        height: DESIGN_H * scale,
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Inner canvas — always 1440×1024, scaled down to fit */}
        <div style={{
          width: DESIGN_W,
          height: DESIGN_H,
          transformOrigin: 'top left',
          transform: `scale(${scale})`,
          position: 'absolute',
          top: 0,
          left: 0,
        }}>
          {isDS
            ? <DesignSystemPage />
            : page === 'holosuit'
              ? <HoloSuitPage
                  connectedDeviceIds={connectedDeviceIds}
                  onHome={() => setPage('home')}
                />
              : page === 'home'
                ? <HomePage
                    connected={connected}
                    available={available}
                    onPair={handlePair}
                    onDisconnect={handleDisconnect}
                    onHapticPowerChange={handleHapticPowerChange}
                    onLaunch={() => setPage('holosuit')}
                  />
                : page === 'signUp'
                  ? <SignUpPage onSignUp={() => setPage('home')} onSignIn={() => setPage('signIn')} />
                  : <SignInPage onSignIn={() => setPage('home')} onSignUp={() => setPage('signUp')} />
          }
        </div>
      </div>
    </div>
  )
}
