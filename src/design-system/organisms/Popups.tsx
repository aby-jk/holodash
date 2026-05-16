import { Icon } from '../atoms/Icon'
import { Button } from '../atoms/Button'
import { Checkbox } from '../atoms/Checkbox'
import { TextInput } from '../molecules/TextInput'

const popupShadow =
  '0px 12px 8px 0px rgba(0,0,0,0.25), 0px 5px 16px 0px rgba(0,0,0,0.5)'
const innerHighlight =
  'inset 0px 4px 4px 0px rgba(255,255,255,0.1)'

function PopupShell({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`relative rounded-[12px] border border-gray-2 p-10 overflow-hidden ${className}`}
      style={{ boxShadow: popupShadow }}
    >
      <div className="absolute inset-0 backdrop-blur-[5px] bg-[rgba(89,89,89,0.8)] rounded-[12px] pointer-events-none" />
      <div className="absolute inset-0 rounded-[12px] pointer-events-none" style={{ boxShadow: innerHighlight }} />
      <div className="relative z-10">{children}</div>
    </div>
  )
}

// ── Wi-Fi Popup ───────────────────────────────────────────────────────────────

export interface WifiPopupProps {
  networkName?: string
  password?: string
  onPasswordChange?: (value: string) => void
  showPassword?: boolean
  onShowPasswordChange?: (checked: boolean) => void
  onContinue?: () => void
  onDisconnect?: () => void
  className?: string
}

export function WifiPopup({
  networkName = 'HS WiFi 1',
  password = '',
  onPasswordChange,
  showPassword = false,
  onShowPasswordChange,
  onContinue,
  onDisconnect,
  className = '',
}: WifiPopupProps) {
  return (
    <PopupShell className={className}>
      <div className="flex gap-6 items-start">
        <Icon name="wifi" size={64} className="text-white shrink-0" />
        <div className="flex flex-col gap-6">
          <p className="text-h3 text-white">
            The Wi-Fi network "{networkName}" requires a WPA2 password.
          </p>
          <div className="flex flex-col gap-3">
            <TextInput
              variant="small"
              placeholder="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={e => onPasswordChange?.(e.target.value)}
            />
            <Checkbox
              checked={showPassword}
              onChange={onShowPasswordChange}
              label="Show password"
            />
          </div>
          <div className="flex gap-3">
            <Button variant="primary" size="sm" label="Continue" onClick={onContinue} />
            <Button variant="secondary" size="sm" label="Disconnect" onClick={onDisconnect} />
          </div>
        </div>
      </div>
    </PopupShell>
  )
}

// ── Profile Popup ─────────────────────────────────────────────────────────────

export interface ProfilePopupProps {
  profileName?: string
  onProfileNameChange?: (value: string) => void
  onCreateProfile?: () => void
  onCancel?: () => void
  className?: string
}

export function ProfilePopup({
  profileName = '',
  onProfileNameChange,
  onCreateProfile,
  onCancel,
  className = '',
}: ProfilePopupProps) {
  return (
    <PopupShell className={className}>
      <div className="flex gap-6 items-start">
        <Icon name="person" size={64} className="text-white shrink-0" />
        <div className="flex flex-col gap-6">
          <p className="text-h3 text-white">
            Add a profile for another person using your account.
          </p>
          <TextInput
            variant="small"
            placeholder="Profile name"
            value={profileName}
            onChange={e => onProfileNameChange?.(e.target.value)}
          />
          <div className="flex gap-3">
            <Button variant="primary" size="sm" label="Create Profile" onClick={onCreateProfile} />
            <Button variant="secondary" size="sm" label="Cancel" onClick={onCancel} />
          </div>
        </div>
      </div>
    </PopupShell>
  )
}
