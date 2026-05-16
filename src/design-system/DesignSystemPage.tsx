import { useState } from 'react'
import { colors, typography } from './tokens'
import { Button } from './atoms/Button'
import { Toggle } from './atoms/Toggle'
import { Checkbox, RecaptchaWidget } from './atoms/Checkbox'
import { Icon, type IconName } from './atoms/Icon'
import { Badge } from './atoms/Badge'
import { Divider } from './atoms/Divider'
import { Tooltip } from './atoms/Tooltip'
import { TextInput } from './molecules/TextInput'
import { Slider } from './molecules/Slider'
import { ScrollBar } from './molecules/ScrollBar'
import { SegmentControl, type SegmentValue } from './molecules/SegmentControl'
import { Navbar } from './organisms/Navbar'
import { Card, type CalibrationItem } from './organisms/Card'
import { WifiDropdown, ProfileDropdown, OthersDropdown, AlertsDropdown } from './organisms/NavDropdowns'
import { WifiPopup, ProfilePopup } from './organisms/Popups'
import { DeviceVector, type DeviceProperty } from './atoms/DeviceVector'
import { SuitVector, type SuitView, type SuitZone } from './atoms/SuitVector'
import { DeviceTile } from './atoms/DeviceTile'
import { Avatar, type AvatarVariant } from './atoms/Avatar'
import { AvatarTile } from './atoms/AvatarTile'
import { Logo } from './atoms/Logo'

// ─── Section wrapper ──────────────────────────────────────────────────────────
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="ds-section">
      <h2 className="ds-section-title">{title}</h2>
      {children}
    </section>
  )
}

function Sub({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <div className="mb-4">
        <p className="ds-subsection-label">{title}</p>
        {description && <p className="text-body-muted text-gray-2 mt-1">{description}</p>}
      </div>
      {children}
    </div>
  )
}

// ─── Variant column headers ────────────────────────────────────────────────────
function VariantGrid({ rows }: { rows: { label: string; spec?: string; primary?: React.ReactNode; secondary?: React.ReactNode; disabled?: React.ReactNode }[] }) {
  return (
    <div className="ds-variant-grid">
      {/* Header row */}
      <div />
      <span className="ds-col-header">Primary</span>
      <span className="ds-col-header">Secondary</span>
      <span className="ds-col-header">Disabled</span>
      {/* Data rows */}
      {rows.map(row => (
        <>
          <div key={row.label + '-label'}>
            <span className="ds-variant-label">{row.label}</span>
            {row.spec && <p className="ds-spec">{row.spec}</p>}
          </div>
          <div key={row.label + '-p'} className="flex items-center">{row.primary}</div>
          <div key={row.label + '-s'} className="flex items-center">{row.secondary}</div>
          <div key={row.label + '-d'} className="flex items-center">{row.disabled}</div>
        </>
      ))}
    </div>
  )
}

// ─── Color swatch ─────────────────────────────────────────────────────────────
function Swatch({ name, hex }: { name: string; hex: string }) {
  return (
    <div className="flex flex-col gap-1.5 items-start">
      <div
        className="w-16 h-16 rounded-lg border border-white/10 shadow-inner"
        style={{ background: hex }}
      />
      <span className="text-body text-gray-1 font-medium leading-tight">{name}</span>
      <span className="text-body-muted text-gray-2 uppercase font-mono">{hex}</span>
    </div>
  )
}

// ─── Type specimen ────────────────────────────────────────────────────────────
function TypeSpec({
  label,
  size,
  lineHeight,
  weight,
  font,
  sample,
}: {
  label: string
  size: string
  lineHeight: string
  weight: number
  font: string
  sample: string
}) {
  return (
    <div className="flex items-center gap-6 py-4 border-b border-gray-4 last:border-0">
      <div className="w-40 shrink-0">
        <span className="text-body-muted text-gray-1 font-mono font-medium">{label}</span>
        <div className="text-body-muted text-gray-2 mt-0.5">{size} / {lineHeight} / {weight}</div>
        <div className="text-body-muted text-gray-3 mt-0.5 truncate">{font}</div>
      </div>
      <span
        className="text-white min-w-0"
        style={{
          fontSize: size,
          fontWeight: weight,
          lineHeight,
          fontFamily: font.includes('SF') ? 'system-ui, sans-serif' : '"Sharp Grotesk", system-ui, sans-serif',
        }}
      >
        {sample}
      </span>
    </div>
  )
}

// ─── Icon grid item ───────────────────────────────────────────────────────────
function IconItem({ name }: { name: IconName }) {
  return (
    <div className="flex flex-col items-center gap-1.5 p-3 rounded bg-surface-elevated border border-gray-4 hover:border-gray-2 transition-colors cursor-default w-20">
      <Icon name={name} size={24} className="text-gray-1" />
      <span className="text-body-muted text-gray-2 text-center leading-tight truncate w-full text-center">
        {name}
      </span>
    </div>
  )
}

// ─── Device illustration placeholder ─────────────────────────────────────────
// ─── Main page ────────────────────────────────────────────────────────────────
export default function DesignSystemPage() {
  const [toggle1, setToggle1] = useState(true)
  const [toggle2, setToggle2] = useState(false)
  const [checkbox1, setCheckbox1] = useState(false)
  const [checkbox2, setCheckbox2] = useState(true)
  const [recaptcha, setRecaptcha] = useState(false)
  const [sliderVal, setSliderVal] = useState(40)
  const [sliderLong, setSliderLong] = useState(65)
  const [cardSelected, setCardSelected] = useState(false)
  const [hapticPower, setHapticPower] = useState(26)
  const [inputVal, setInputVal] = useState('')
  const [segmentVal, setSegmentVal] = useState<SegmentValue>('mocap')

  const iconNames: IconName[] = [
    'bell', 'person', 'settings', 'battery', 'wifi', 'bluetooth',
    'question_mark', 'info_i', 'restart_alt', 'usb', 'play_arrow', 'home',
    'warning', 'error', 'autorenew', '360', 'move', 'zoom_in',
    'fit_frame', 'recenter', 'close', 'close_small',
    'expand_content', 'collapse_content',
  ]

  const grayEntries = Object.entries(colors.gray) as [string, string][]

  return (
    <div className="min-h-screen bg-surface">
      {/* ── Top navbar preview ── */}
      <div className="sticky top-0 z-40">
        <Navbar wifiConnected bluetoothConnected profileName="Profile 1" wifiLabel="HS WiFi" />
      </div>

      <div className="max-w-5xl mx-auto px-8 py-10">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-2xl font-bold text-white mb-1">
            HOLO<span className="text-primary">SUIT</span> Design System
          </h1>
          <p className="text-gray-2 text-xs">
            Version 3.0 · React + TypeScript · Tailwind CSS · Sharp Grotesk
          </p>
        </div>

        {/* ── 1. Color Palette ── */}
        <Section title="Color Palette">
          <Sub title="Brand & Neutral">
            <div className="flex flex-wrap gap-6">
              <Swatch name="Primary" hex={colors.primary} />
              <Swatch name="Primary Hover" hex={colors.primaryHover} />
              <Swatch name="White" hex={colors.white} />
              <Swatch name="Black" hex={colors.black} />
            </div>
          </Sub>

          <Sub title="Gray Scale">
            <div className="flex flex-wrap gap-6">
              {grayEntries.map(([k, v]) => (
                <Swatch key={k} name={`Gray/${k}`} hex={v} />
              ))}
            </div>
          </Sub>

          <Sub title="Surface Layers">
            <div className="flex flex-wrap gap-6">
              <Swatch name="Surface" hex={colors.surface.base} />
              <Swatch name="Elevated" hex={colors.surface.elevated} />
              <Swatch name="Overlay" hex={colors.surface.overlay} />
            </div>
          </Sub>

          <Sub title="Status">
            <div className="flex flex-wrap gap-6">
              <Swatch name="Success" hex={colors.status.success} />
              <Swatch name="Error" hex={colors.status.error} />
              <Swatch name="Warning" hex={colors.status.warning} />
            </div>
          </Sub>
        </Section>

        <Divider className="my-10" />

        {/* ── 2. Logo ── */}
        <Section title="Logo">
          <Sub title="Wordmark" description="SVG wordmark exported from Figma. Use the height prop to scale; aspect ratio is locked at 347:40.">
            <div className="flex flex-col gap-8">
              <div className="flex items-center gap-10">
                <div className="flex flex-col items-start gap-2">
                  <div className="bg-surface-elevated rounded-lg p-6 flex items-center justify-center">
                    <Logo height={40} />
                  </div>
                  <span className="text-body-muted text-gray-2">40px (default)</span>
                </div>
                <div className="flex flex-col items-start gap-2">
                  <div className="bg-surface-elevated rounded-lg p-6 flex items-center justify-center">
                    <Logo height={24} />
                  </div>
                  <span className="text-body-muted text-gray-2">24px</span>
                </div>
                <div className="flex flex-col items-start gap-2">
                  <div className="bg-surface-elevated rounded-lg p-6 flex items-center justify-center">
                    <Logo height={16} />
                  </div>
                  <span className="text-body-muted text-gray-2">16px</span>
                </div>
              </div>
              <div className="flex flex-col items-start gap-2">
                <div className="bg-white rounded-lg p-6 flex items-center justify-center w-full">
                  <Logo height={40} className="invert" />
                </div>
                <span className="text-body-muted text-gray-2">On light background (CSS invert)</span>
              </div>
            </div>
          </Sub>
        </Section>

        <Divider className="my-10" />

        {/* ── 3. Typography (was 2) ── */}
        <Section title="Typography">
          <div className="bg-surface-elevated rounded-lg px-6 py-2">
            {(Object.entries(typography) as [string, { size: string; lineHeight: string; weight: number; font: string }][]).map(
              ([key, val]) => (
                <TypeSpec
                  key={key}
                  label={key}
                  size={val.size}
                  lineHeight={val.lineHeight}
                  weight={val.weight}
                  font={val.font}
                  sample={
                    key.startsWith('h')
                      ? 'Holosuit System Interface'
                      : key === 'body'
                      ? 'Real-time haptic feedback for immersive experiences.'
                      : key === 'bodyMuted'
                      ? 'Secondary description text appears here.'
                      : 'CONNECT DEVICE'
                  }
                />
              )
            )}
          </div>
        </Section>

        <Divider className="my-10" />

        {/* ── 3. Atoms ── */}
        <Section title="Atoms">

          {/* Buttons */}
          <Sub
            title="Button"
            description="Three sizes — large (full-width CTA), small (inline action), xs (compact badge-style). Two variants — primary (orange) and secondary (Gray/3 filled). All have an inner top highlight and outer drop shadow."
          >
            <VariantGrid
              rows={[
                {
                  label: 'Large',
                  spec: '64px · 8px radius · btn-lg',
                  primary: <Button variant="primary" size="lg" label="Sign In" />,
                  secondary: <Button variant="secondary" size="lg" label="New User? Sign Up" />,
                  disabled: <Button variant="primary" size="lg" label="Sign In" disabled />,
                },
                {
                  label: 'Small',
                  spec: '30px · 6px radius · btn',
                  primary: <Button variant="primary" size="sm" label="Continue Offline" />,
                  secondary: <Button variant="secondary" size="sm" label="Continue Offline" />,
                  disabled: <Button variant="secondary" size="sm" label="Continue Offline" disabled />,
                },
                {
                  label: 'XS',
                  spec: '24px · 6px radius · body-muted',
                  primary: <Button variant="primary" size="xs" label="35%" />,
                  secondary: <Button variant="secondary" size="xs" label="35%" />,
                  disabled: <Button variant="secondary" size="xs" label="35%" disabled />,
                },
                {
                  label: 'Circle Large',
                  spec: '32px · full radius',
                  primary: <Button variant="primary" shape="circle-lg"><Icon name="play_arrow" size={20} /></Button>,
                  secondary: <Button variant="secondary" shape="circle-lg"><Icon name="settings" size={20} /></Button>,
                  disabled: <Button variant="secondary" shape="circle-lg" disabled><Icon name="settings" size={20} /></Button>,
                },
                {
                  label: 'Circle',
                  spec: '24px · full radius',
                  primary: <Button variant="primary" shape="circle"><Icon name="play_arrow" size={16} /></Button>,
                  secondary: <Button variant="secondary" shape="circle"><Icon name="info_i" size={16} /></Button>,
                  disabled: <Button variant="secondary" shape="circle" disabled><Icon name="info_i" size={16} /></Button>,
                },
                {
                  label: 'Circle Small',
                  spec: '16px · full radius',
                  primary: <Button variant="primary" shape="circle-sm"><Icon name="close" size={12} /></Button>,
                  secondary: <Button variant="secondary" shape="circle-sm"><Icon name="close" size={12} /></Button>,
                  disabled: <Button variant="secondary" shape="circle-sm" disabled><Icon name="close" size={12} /></Button>,
                },
              ]}
            />

            {/* Circle + label combination */}
            <div className="mt-8">
              <p className="ds-subsection-label">Circle With Label</p>
              <div className="ds-row mt-4">
                <Button variant="secondary" shape="circle-lg" label="Profile">
                  <Icon name="person" size={20} />
                </Button>
                <Button variant="primary" shape="circle" label="Start">
                  <Icon name="play_arrow" size={16} />
                </Button>
                <Button variant="secondary" shape="circle-sm" label="Close">
                  <Icon name="close" size={12} />
                </Button>
              </div>
            </div>

            {/* Icon inside text button */}
            <div className="mt-8">
              <p className="ds-subsection-label">With Icons</p>
              <div className="ds-row mt-4">
                <Button variant="primary" size="sm" label="Connect" leftIcon={<Icon name="bluetooth" size={16} />} />
                <Button variant="secondary" size="sm" label="Settings" rightIcon={<Icon name="settings" size={16} />} />
                <Button variant="primary" size="lg" label="Start Session" leftIcon={<Icon name="play_arrow" size={20} />} />
              </div>
            </div>
          </Sub>

          {/* Toggle */}
          <Sub title="Toggle" description="Binary on/off control. Primary color when active, Gray/4 when inactive.">
            <div className="ds-row">
              <div className="flex flex-col items-center gap-2">
                <Toggle checked={toggle1} onChange={setToggle1} />
                <span className="ds-spec">On</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Toggle checked={toggle2} onChange={setToggle2} />
                <span className="ds-spec">Off</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Toggle checked disabled />
                <span className="ds-spec">Disabled</span>
              </div>
            </div>
          </Sub>

          {/* Checkbox */}
          <Sub title="Checkbox" description="20×20 filled box. Primary when checked, Gray/3 when unchecked. Indeterminate shows a dash.">
            <div className="flex flex-col gap-6">
              <div>
                <p className="ds-subsection-label mb-3">States — standalone</p>
                <div className="flex items-center gap-6">
                  <div className="flex flex-col items-center gap-2">
                    <Checkbox checked={false} onChange={() => {}} />
                    <span className="ds-spec">Unchecked</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Checkbox checked onChange={() => {}} />
                    <span className="ds-spec">Checked</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Checkbox indeterminate />
                    <span className="ds-spec">Indeterminate</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Checkbox checked disabled />
                    <span className="ds-spec">Disabled</span>
                  </div>
                </div>
              </div>

              <div>
                <p className="ds-subsection-label mb-3">With label</p>
                <div className="flex flex-col gap-3">
                  <Checkbox checked={checkbox1} onChange={setCheckbox1} label="Enable haptic feedback" />
                  <Checkbox checked={checkbox2} onChange={setCheckbox2} label="Auto-calibrate on connect" />
                  <Checkbox indeterminate label="Mixed selection" />
                  <Checkbox checked={false} disabled label="Disabled option" />
                </div>
              </div>

              <div>
                <p className="ds-subsection-label mb-3">reCAPTCHA widget</p>
                <RecaptchaWidget checked={recaptcha} onChange={setRecaptcha} />
              </div>
            </div>
          </Sub>

          {/* Icons */}
          <Sub title="Icons">
            <div className="flex flex-wrap gap-2">
              {iconNames.map(n => (
                <IconItem key={n} name={n} />
              ))}
            </div>
          </Sub>

          {/* Badges */}
          <Sub title="Badges" description="7px dot + Gray/2 text. Four status variants.">
            <div className="ds-row">
              <Badge variant="success" label="Connected" />
              <Badge variant="error" label="Disconnected" />
              <Badge variant="warning" label="Low Battery" />
              <Badge variant="default" label="Not Calibrated" />
            </div>
          </Sub>

          {/* Divider */}
          <Sub title="Dividers">
            <div className="flex flex-col gap-4 w-64">
              <Divider />
              <div className="flex gap-4 items-stretch h-8">
                <span className="text-xs text-gray-2">left</span>
                <Divider orientation="vertical" />
                <span className="text-xs text-gray-2">right</span>
              </div>
            </div>
          </Sub>

          {/* Device Tile */}
          <Sub title="Device Tile" description="130×130 selectable tile for device picker flows. Selected state shows an orange border and check badge; device vector switches to its active variant.">
            <div className="ds-row">
              {(['jacket', 'pants', 'holoface', 'left glove', 'right glove'] as DeviceProperty[]).map(prop => (
                <DeviceTile
                  key={prop}
                  property={prop}
                  label={prop.replace(/\b\w/g, c => c.toUpperCase())}
                  selected={prop === 'jacket'}
                />
              ))}
            </div>
          </Sub>

          {/* Avatar */}
          <Sub title="Avatar" description="Character profile images. 5 predefined variants. Images live in /public/avatars/.">
            <div className="ds-row">
              {(['trooper', 'cop', 'girl', 'bot', 'default'] as AvatarVariant[]).map(v => (
                <div key={v} className="flex flex-col items-center gap-2">
                  <Avatar variant={v} size="lg" shape="rounded" />
                  <span className="text-body-muted text-gray-2 capitalize">{v}</span>
                </div>
              ))}
            </div>
          </Sub>

          {/* Avatar Tile */}
          <Sub title="Avatar Tile" description="130×130 selectable tile for character/profile picker flows. Same selected state as Device Tile.">
            <div className="ds-row">
              {([
                { variant: 'trooper', label: 'Trooper' },
                { variant: 'cop',     label: 'Cop' },
                { variant: 'girl',    label: 'Girl' },
                { variant: 'bot',     label: 'Bot' },
                { variant: 'default', label: 'Default' },
              ] as { variant: AvatarVariant; label: string }[]).map(({ variant, label }, i) => (
                <AvatarTile key={variant} variant={variant} label={label} selected={i === 0} />
              ))}
            </div>
          </Sub>

          {/* Suit Vector */}
          <Sub title="Suit Vector" description="Full-body suit illustration in front and back views. Zone variants highlight one of four haptic zones in orange.">
            <div className="flex flex-wrap gap-10 items-end">
              {/* Base views */}
              <div className="flex flex-col items-center gap-2">
                <SuitVector view="front" height={180} />
                <span className="text-body-muted text-gray-2">Front</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <SuitVector view="back" height={180} />
                <span className="text-body-muted text-gray-2">Back</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <SuitVector view="front" selected height={180} />
                <span className="text-body-muted text-gray-2">Front — Selected</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <SuitVector view="back" selected height={180} />
                <span className="text-body-muted text-gray-2">Back — Selected</span>
              </div>

              {/* Front zones */}
              {([1, 2, 3, 4] as SuitZone[]).map(z => (
                <div key={`f${z}`} className="flex flex-col items-center gap-2">
                  <SuitVector view="front" zone={z} height={180} />
                  <span className="text-body-muted text-gray-2">Zone {z} — Front</span>
                </div>
              ))}

              {/* Back zones */}
              {([1, 2, 3, 4] as SuitZone[]).map(z => (
                <div key={`b${z}`} className="flex flex-col items-center gap-2">
                  <SuitVector view="back" zone={z} height={180} />
                  <span className="text-body-muted text-gray-2">Zone {z} — Back</span>
                </div>
              ))}
            </div>
          </Sub>

          {/* Tooltip */}
          <Sub title="Tooltip" description="Frosted glass pill with a left-pointing arrow. Used for contextual labels on 3D controls.">
            <div className="ds-row pl-6">
              <Tooltip label="Rotate" />
              <Tooltip label="Disconnect" />
              <Tooltip label="Calibrate Device" />
            </div>
          </Sub>
        </Section>

        <Divider className="my-10" />

        {/* ── 4. Molecules ── */}
        <Section title="Molecules">

          <Sub title="Text Input">
            <div className="flex flex-col gap-4 max-w-sm">
              <TextInput
                label="Username"
                placeholder="Enter username…"
                value={inputVal}
                onChange={e => setInputVal(e.target.value)}
              />
              <TextInput
                label="Session Name"
                placeholder="e.g. Morning calibration…"
                variant="empty-stage"
              />
              <TextInput
                label="Compact Input"
                placeholder="Search…"
                variant="small"
              />
              <TextInput
                label="With Error"
                value="bad@value"
                error="Invalid format"
              />
            </div>
          </Sub>

          <Sub title="Sliders">
            <div className="flex flex-col gap-6 max-w-lg">
              <Slider
                value={sliderVal}
                onChange={setSliderVal}
                label="Haptic Intensity"
                unit="%"
              />
              <Slider
                variant="long"
                value={sliderLong}
                onChange={setSliderLong}
                label="Vibration Frequency"
                unit=" Hz"
                min={0}
                max={200}
              />
              <Slider
                variant="long-inactive"
                value={30}
                label="Locked Parameter"
                unit="%"
                disabled
              />
            </div>
          </Sub>

          <Sub title="Scroll Bar">
            <div className="flex flex-col gap-3 w-72">
              <ScrollBar value={30} />
              <ScrollBar value={65} />
              <ScrollBar value={90} />
            </div>
          </Sub>

          <Sub title="Segment Control">
            <div className="flex flex-col gap-4">
              <SegmentControl
                selected={segmentVal}
                onChange={setSegmentVal}
                mocapStatus="ok"
                hapticsStatus="ok"
              />
              <SegmentControl selected="mocap" mocapStatus="ok" hapticsStatus="error" />
              <SegmentControl selected="haptics" mocapStatus="none" hapticsStatus="ok" />
            </div>
          </Sub>
        </Section>

        <Divider className="my-10" />

        {/* ── 5. Organisms ── */}
        <Section title="Organisms">

          <Sub title="Navbar">
            <div className="rounded-lg overflow-hidden border border-gray-4">
              <Navbar wifiConnected bluetoothConnected profileName="Profile 1" wifiLabel="HS WiFi" />
            </div>
          </Sub>

          <Sub title="Cards" description="Three variants — connected (no checkbox), with-checkbox (selectable), and pairing (disconnected device). Selected state uses orange border and glow.">
            <div className="flex flex-wrap gap-6">
              <Card
                variant="connected"
                property="jacket"
                deviceActive
                serialNumber="SN0123-G5L0003"
                name="P1 Holo Jacket"
                version="Version 2.3"
                connectionType="wifi"
                batteryPercent={25}
                calibrations={[{ label: 'Haptics', ok: true }, { label: 'MoCap', ok: true }] satisfies CalibrationItem[]}
                hapticPower={hapticPower}
                onHapticPowerChange={setHapticPower}
              />
              <Card
                variant="with-checkbox"
                property="right glove"
                deviceActive
                serialNumber="SN0123-G5R0001"
                name="P1 Right Glove"
                version="Version 1.8"
                connectionType="wifi"
                batteryPercent={78}
                calibrations={[{ label: 'Haptics', ok: true }, { label: 'MoCap', ok: false }] satisfies CalibrationItem[]}
                hapticPower={50}
                selected={cardSelected}
                onSelect={setCardSelected}
              />
              <Card
                variant="pairing"
                property="holoface"
                deviceActive={false}
                serialNumber="SN0123-HF0002"
                version="Version 1.2"
                connectionType="usb"
                batteryPercent={60}
              />
            </div>
          </Sub>

          <Sub title="Nav Dropdowns" description="Frosted glass popup panels triggered from the navbar. Wi-Fi, Profile, Alerts, and Others variants.">
            <div className="flex flex-wrap gap-16 items-start pt-4">
              <div className="flex flex-col gap-2 items-start">
                <span className="ds-spec">Wi-Fi — off</span>
                <WifiDropdown caretRight={100} />
              </div>
              <div className="flex flex-col gap-2 items-start">
                <span className="ds-spec">Wi-Fi — on + selected</span>
                <WifiDropdown
                  enabled
                  caretRight={100}
                  knownNetworks={[
                    { id: '1', name: 'HS WiFi 1' },
                    { id: '2', name: 'HS WiFi 2' },
                    { id: '3', name: 'HS WiFi 3' },
                  ]}
                  availableNetworks={[
                    { id: '4', name: 'HS WiFi 4' },
                    { id: '5', name: 'HS WiFi 5' },
                  ]}
                  selectedNetworkId="1"
                />
              </div>
              <div className="flex flex-col gap-2 items-start">
                <span className="ds-spec">Profile — view</span>
                <ProfileDropdown
                  caretRight={100}
                  profiles={[
                    { id: '1', name: 'HS Profile 1', active: true },
                    { id: '2', name: 'HS Profile 2' },
                    { id: '3', name: 'HS Profile 3' },
                  ]}
                />
              </div>
              <div className="flex flex-col gap-2 items-start">
                <span className="ds-spec">Profile — manage</span>
                <ProfileDropdown
                  mode="manage"
                  caretRight={100}
                  profiles={[
                    { id: '1', name: 'HS Profile 1', active: true },
                    { id: '2', name: 'HS Profile 2' },
                    { id: '3', name: 'HS Profile 3' },
                  ]}
                />
              </div>
              <div className="flex flex-col gap-2 items-start">
                <span className="ds-spec">Others</span>
                <OthersDropdown caretRight={60} />
              </div>
              <div className="flex flex-col gap-2 items-start">
                <span className="ds-spec">Alerts</span>
                <AlertsDropdown
                  caretRight={200}
                  alerts={[
                    { id: '1', title: 'Syncing Lag Detected', code: '2468DGG', description: 'The data stream is lagging behind real-time.' },
                    { id: '2', title: 'Calibration Lost' },
                    { id: '3', title: 'Suit Disconnected' },
                  ]}
                />
              </div>
            </div>
          </Sub>

          <Sub title="Device Vectors" description="SVG illustrations exported from Figma for each garment. Active state uses orange accent; inactive uses Gray/3.">
            <div className="flex flex-wrap gap-8">
              {(
                [
                  ['jacket', true], ['jacket', false],
                  ['pants', true], ['pants', false],
                  ['holoface', true], ['holoface', false],
                  ['left glove', true], ['left glove', false],
                  ['right glove', true], ['right glove', false],
                ] as [DeviceProperty, boolean][]
              ).map(([prop, active]) => (
                <div key={`${prop}-${active}`} className="flex flex-col items-center gap-2">
                  <DeviceVector property={prop} state={active} />
                  <span className="text-body-muted text-gray-2 capitalize">{prop}</span>
                  <Badge variant={active ? 'success' : 'default'} label={active ? 'Active' : 'Inactive'} />
                </div>
              ))}
            </div>
          </Sub>
        </Section>

        <Divider className="my-10" />

        {/* ── 6. Popups ── */}
        <Section title="Popups">
          <Sub title="Wi-Fi Password" description="Shown when connecting to a password-protected network.">
            <WifiPopup className="w-[573px]" />
          </Sub>

          <Sub title="Add Profile" description="Shown when creating a new profile linked to the account.">
            <ProfilePopup className="w-[573px]" />
          </Sub>
        </Section>

        {/* Footer */}
        <footer className="mt-16 pt-6 border-t border-gray-4 flex items-center justify-between">
          <span className="text-[9px] text-gray-3">
            Holosuit 3.0 Design System · Auto-generated from Figma
          </span>
          <span className="text-[9px] text-gray-3">React + TypeScript + Tailwind CSS + Sharp Grotesk</span>
        </footer>
      </div>
    </div>
  )
}
