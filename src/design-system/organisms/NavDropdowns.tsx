import { Icon } from '../atoms/Icon'
import { Toggle } from '../atoms/Toggle'
import { Button } from '../atoms/Button'
import { Divider } from '../atoms/Divider'

// ── Shared styles ─────────────────────────────────────────────────────────────

const popupShadow =
  '0px 12px 8px 0px rgba(0,0,0,0.25), 0px 5px 16px 0px rgba(0,0,0,0.5)'
const innerHighlight =
  'inset 0px 4px 4px 0px rgba(255,255,255,0.1)'
const circleShadow =
  'inset 0px 1px 1px 0px rgba(255,255,255,0.5)'
const circleFilter =
  'drop-shadow(0px 1px 0.75px rgba(0,0,0,0.25)) drop-shadow(0px 0px 1px rgba(0,0,0,0.25))'

// ── Popup shell + caret ───────────────────────────────────────────────────────

function Shell({
  children,
  caretRight = 16,
  className = '',
}: {
  children: React.ReactNode
  caretRight?: string | number
  className?: string
}) {
  return (
    <div className={`relative flex flex-col items-end ${className}`}>
      {/* Caret */}
      <div className="absolute -top-[22px] z-10" style={{ right: caretRight }}>
        <svg width="35" height="23" viewBox="0 0 35 23" fill="none">
          {/* Filled triangle with rounded tip via quadratic bezier */}
          <path d="M0 23 L15.5 2.5 Q17.5 0 19.5 2.5 L35 23 Z" fill="rgba(89,89,89,0.8)" />
          {/* Border on the two angled edges only */}
          <path d="M1.5 23 L15.5 3 Q17.5 1 19.5 3 L33.5 23" stroke="#9E9E9E" strokeWidth="0.75" fill="none" />
        </svg>
      </div>

      {/* Panel */}
      <div
        className="relative w-full rounded-[12px] border border-gray-2 p-5 overflow-hidden"
        style={{ boxShadow: popupShadow }}
      >
        <div className="absolute inset-0 backdrop-blur-[5px] bg-[rgba(89,89,89,0.8)] rounded-[12px] pointer-events-none" />
        <div className="absolute inset-0 rounded-[12px] pointer-events-none" style={{ boxShadow: innerHighlight }} />
        <div className="relative z-10">{children}</div>
      </div>
    </div>
  )
}

// ── Section header ────────────────────────────────────────────────────────────

function Header({ title, action }: { title: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between w-full">
      <span className="text-h3 text-white">{title}</span>
      {action}
    </div>
  )
}

// ── Circle icon button + label row ────────────────────────────────────────────

type RowIconName = 'wifi' | 'person' | 'question_mark'

function ItemRow({
  icon,
  label,
  active = false,
  onRemove,
  onClick,
}: {
  icon: RowIconName
  label: string
  active?: boolean
  onRemove?: () => void
  onClick?: () => void
}) {
  return (
    <div className="flex items-center gap-1.5 w-full">
      <button
        onClick={onClick}
        className={`size-6 rounded-full flex items-center justify-center shrink-0 ${active ? 'bg-primary' : 'bg-gray-3'}`}
        style={{ boxShadow: circleShadow, filter: circleFilter }}
      >
        <Icon name={icon} size={14} className="text-white" />
      </button>
      <span className="text-body text-white whitespace-nowrap flex-1">{label}</span>
      {onRemove && (
        <button onClick={onRemove} className="shrink-0">
          <Icon name="close_small" size={24} className="text-white" />
        </button>
      )}
    </div>
  )
}

// ── Wi-Fi Dropdown ────────────────────────────────────────────────────────────

export interface WifiNetwork {
  id: string
  name: string
}

export interface WifiDropdownProps {
  enabled?: boolean
  onToggle?: () => void
  knownNetworks?: WifiNetwork[]
  availableNetworks?: WifiNetwork[]
  selectedNetworkId?: string
  onSelectNetwork?: (id: string) => void
  onConnectNew?: (network: WifiNetwork) => void
  onDisconnect?: () => void
  caretRight?: string | number
  className?: string
}

export function WifiDropdown({
  enabled = false,
  onToggle,
  knownNetworks = [],
  availableNetworks = [],
  selectedNetworkId,
  onSelectNetwork,
  onConnectNew,
  onDisconnect,
  caretRight = 19,
  className = '',
}: WifiDropdownProps) {
  return (
    <Shell caretRight={caretRight} className={`w-[272px] ${className}`}>
      <div className="flex flex-col gap-5">
        <Header title="Wi-Fi" action={<Toggle checked={enabled} onChange={onToggle} />} />

        {enabled && (knownNetworks.length > 0 || availableNetworks.length > 0) && (
          <>
            <Divider />
            <div className="flex flex-col gap-4">
              {knownNetworks.length > 0 && (
                <div className="flex flex-col gap-3">
                  <span className="text-body text-white">Known Networks</span>
                  {knownNetworks.map(n => (
                    <ItemRow
                      key={n.id}
                      icon="wifi"
                      label={n.name}
                      active={n.id === selectedNetworkId}
                      onClick={() => onSelectNetwork?.(n.id)}
                    />
                  ))}
                </div>
              )}
              {availableNetworks.length > 0 && (
                <>
                  <Divider />
                  <div className="flex flex-col gap-3">
                    <span className="text-body text-white">Available Networks</span>
                    {availableNetworks.map(n => (
                      <ItemRow
                        key={n.id}
                        icon="wifi"
                        label={n.name}
                        onClick={() => onConnectNew ? onConnectNew(n) : onSelectNetwork?.(n.id)}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
            <Divider />
            <div className="flex justify-center">
              <Button variant="secondary" size="sm" label="Disconnect" onClick={onDisconnect} />
            </div>
          </>
        )}
      </div>
    </Shell>
  )
}

// ── Profile Dropdown ──────────────────────────────────────────────────────────

export interface Profile {
  id: string
  name: string
  active?: boolean
}

export interface ProfileDropdownProps {
  profiles?: Profile[]
  mode?: 'view' | 'manage'
  onManage?: () => void
  onDone?: () => void
  onAddNew?: () => void
  onDeleteProfile?: (id: string) => void
  caretRight?: string | number
  className?: string
}

export function ProfileDropdown({
  profiles = [],
  mode = 'view',
  onManage,
  onDone,
  onAddNew,
  onDeleteProfile,
  caretRight = 19,
  className = '',
}: ProfileDropdownProps) {
  const isManaging = mode === 'manage'

  return (
    <Shell caretRight={caretRight} className={`w-[272px] ${className}`}>
      <div className="flex flex-col gap-5">
        <Header
          title="Profile"
          action={
            <Button
              variant="secondary"
              size="sm"
              label={isManaging ? 'Done' : 'Manage'}
              onClick={isManaging ? onDone : onManage}
            />
          }
        />
        <Divider />
        <div className="flex flex-col gap-3">
          {profiles.map(p => (
            <ItemRow
              key={p.id}
              icon="person"
              label={p.name}
              active={p.active}
              onRemove={isManaging ? () => onDeleteProfile?.(p.id) : undefined}
            />
          ))}
        </div>
        <div className="flex justify-center">
          <Button variant="primary" size="sm" label="Add New" onClick={onAddNew} />
        </div>
      </div>
    </Shell>
  )
}

// ── Others Dropdown ───────────────────────────────────────────────────────────

export interface OthersDropdownProps {
  onFaqs?: () => void
  onUserGuide?: () => void
  caretRight?: string | number
  className?: string
}

export function OthersDropdown({
  onFaqs,
  onUserGuide,
  caretRight = 16,
  className = '',
}: OthersDropdownProps) {
  return (
    <Shell caretRight={caretRight} className={`w-[156px] ${className}`}>
      <div className="flex flex-col gap-3">
        <ItemRow icon="question_mark" label="FAQs" onClick={onFaqs} />
        <ItemRow icon="person" label="User guide" onClick={onUserGuide} />
      </div>
    </Shell>
  )
}

// ── Alerts Dropdown ───────────────────────────────────────────────────────────

export interface Alert {
  id: string
  title: string
  code?: string
  description?: string
}

export interface AlertsDropdownProps {
  alerts?: Alert[]
  onDismiss?: (id: string) => void
  onClearAll?: () => void
  caretRight?: string | number
  className?: string
}

export function AlertsDropdown({
  alerts = [],
  onDismiss,
  onClearAll,
  caretRight = 23,
  className = '',
}: AlertsDropdownProps) {
  return (
    <Shell caretRight={caretRight} className={`w-[411px] ${className}`}>
      <div className="flex flex-col gap-3">
        <Header
          title="Alerts"
          action={<Button variant="secondary" size="sm" label="Clear All" onClick={onClearAll} />}
        />
        <Divider />
        <div className="flex flex-col gap-1">
          {alerts.map((alert, i) => (
            <div key={alert.id}>
              {alert.code || alert.description ? (
                <div className="bg-gray-3 rounded flex flex-col gap-1 px-3 pt-1 pb-3">
                  <div className="flex items-center justify-between">
                    <span className="text-btn text-white">{alert.title}</span>
                    <button onClick={() => onDismiss?.(alert.id)} className="shrink-0">
                      <Icon name="close_small" size={24} className="text-white" />
                    </button>
                  </div>
                  {alert.code && (
                    <span className="text-body-muted text-white">Alert Code: {alert.code}</span>
                  )}
                  {alert.description && (
                    <span className="text-body-muted text-white">{alert.description}</span>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-between px-3 py-1">
                  <span className="text-btn text-white">{alert.title}</span>
                  <button onClick={() => onDismiss?.(alert.id)} className="shrink-0">
                    <Icon name="close_small" size={24} className="text-white" />
                  </button>
                </div>
              )}
              {i < alerts.length - 1 && <Divider className="my-1" />}
            </div>
          ))}
        </div>
        <Divider />
      </div>
    </Shell>
  )
}
