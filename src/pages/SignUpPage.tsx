import { useState } from 'react'
import { Button } from '../design-system/atoms/Button'
import { TextInput } from '../design-system/molecules/TextInput'
import { Checkbox, RecaptchaWidget } from '../design-system/atoms/Checkbox'

interface SignUpPageProps {
  onSignUp?: () => void
  onSignIn?: () => void
}

export default function SignUpPage({ onSignUp, onSignIn }: SignUpPageProps) {
  const [form, setForm] = useState({
    email: '', firstName: '', lastName: '',
    company: '', role: '', password: '', confirmPassword: '',
  })
  const [accepted, setAccepted] = useState(false)
  const [notRobot, setNotRobot] = useState(false)

  function field(key: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm(prev => ({ ...prev, [key]: e.target.value }))
  }

  return (
    <div className="relative w-full h-full bg-[#161616] overflow-hidden">

      {/* ── Cover image panel ── */}
      <div className="absolute left-10 top-10 bottom-10 w-[47.92%] rounded-xl overflow-hidden">
        <img
          src={`${import.meta.env.BASE_URL}signin-cover.webp`}
          alt="HoloSuit 3.0"
          className="w-full h-full object-cover object-[45%_47%]"
        />
      </div>

      {/* ── Sign Up form ── */}
      <div className="absolute left-[calc(47.92%+80px)] right-10 top-10 bottom-10 flex items-center">
        <div className="w-[630px] flex flex-col gap-20">

          {/* Fields */}
          <div className="flex flex-col gap-6">
            <h1 className="text-h1 text-white">Sign Up</h1>

            <TextInput variant="floating" label="Email" type="email" value={form.email} onChange={field('email')} autoComplete="email" />

            <div className="flex gap-6">
              <TextInput variant="floating" label="First name" value={form.firstName} onChange={field('firstName')} autoComplete="given-name" className="flex-1 min-w-0" />
              <TextInput variant="floating" label="Last name" value={form.lastName} onChange={field('lastName')} autoComplete="family-name" className="flex-1 min-w-0" />
            </div>

            <div className="flex gap-6">
              <TextInput variant="floating" label="Company/Organization" value={form.company} onChange={field('company')} autoComplete="organization" className="flex-1 min-w-0" />
              <TextInput variant="floating" label="Job/Role" value={form.role} onChange={field('role')} className="flex-1 min-w-0" />
            </div>

            <div className="flex gap-6">
              <TextInput variant="floating" label="Password" type="password" value={form.password} onChange={field('password')} autoComplete="new-password" className="flex-1 min-w-0" />
              <TextInput variant="floating" label="Re enter Password" type="password" value={form.confirmPassword} onChange={field('confirmPassword')} autoComplete="new-password" className="flex-1 min-w-0" />
            </div>

            <Checkbox
              checked={accepted}
              onChange={setAccepted}
              label={
                <span>
                  {'I accept the '}
                  <span className="underline">Terms of Service</span>
                  {' and '}
                  <span className="underline">Privacy Policy.</span>
                </span>
              }
            />

            <RecaptchaWidget checked={notRobot} onChange={setNotRobot} />
          </div>

          {/* Create Account button */}
          <div className="flex justify-center">
            <button
              onClick={onSignUp}
              className="h-16 w-full max-w-[350px] bg-primary border border-white/40 rounded-[8px] text-[20px] font-medium text-white leading-7 hover:bg-primary-hover transition-colors"
              style={{ boxShadow: '-1px 1px 5.5px rgba(0,0,0,0.75)' }}
            >
              Create Account
            </button>
          </div>

        </div>
      </div>

      {/* ── Continue Offline ── */}
      <div className="absolute top-10 right-10 z-10">
        <Button variant="secondary" size="sm" label="Continue Offline" onClick={onSignIn} />
      </div>

    </div>
  )
}
