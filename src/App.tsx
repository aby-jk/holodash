import { useState } from 'react'
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

type Page = 'signIn' | 'signUp' | 'home' | 'holosuit'

export default function App() {
  const [page, setPage] = useState<Page>('signIn')
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
      <div
        className="relative overflow-auto"
        style={{
          width: 'min(100vw, calc(100vh * 45 / 32))',
          aspectRatio: '45 / 32',
        }}
      >
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
  )
}
