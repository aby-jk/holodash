import { useState } from 'react'
import { Button } from '../design-system/atoms/Button'
import { TextInput } from '../design-system/molecules/TextInput'

interface SignInPageProps {
  onSignIn?: () => void
  onSignUp?: () => void
}

export default function SignInPage({ onSignIn, onSignUp }: SignInPageProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

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

      {/* ── Sign In form ── */}
      <div className="absolute left-[calc(47.92%+80px)] right-10 top-10 bottom-10 flex items-center">
        <div className="w-[490px] flex flex-col gap-6">

          <h1 className="text-h1 text-white">Sign In</h1>

          {/* Email */}
          <TextInput
            variant="floating"
            label="Email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            autoComplete="email"
          />

          {/* Password */}
          <TextInput
            variant="floating"
            label="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoComplete="current-password"
          />

          {/* Forgot password */}
          <p className="text-btn text-white cursor-pointer hover:text-gray-1 transition-colors w-fit">
            Forgot password?
          </p>

          {/* Sign In button */}
          <button
            onClick={onSignIn}
            className="h-16 w-full max-w-[350px] mx-auto bg-primary border border-white/40 rounded-[8px] text-[20px] font-medium text-white leading-7 hover:bg-primary-hover transition-colors"
            style={{ boxShadow: '-1px 1px 5.5px rgba(0,0,0,0.75)' }}
          >
            Sign In
          </button>

          {/* Sign Up button */}
          <button
            onClick={onSignUp}
            className="h-16 w-full max-w-[350px] mx-auto bg-gray-3 border border-white/40 rounded-[8px] text-[20px] font-medium text-white leading-7 hover:bg-gray-2/20 transition-colors"
            style={{ boxShadow: '-1px 1px 5.5px rgba(0,0,0,0.75)' }}
          >
            New User? Sign Up
          </button>

          {/* Terms */}
          <p className="text-[12px] text-white text-center leading-4">
            By logging in you are agreeing to our{' '}
            <span className="underline cursor-pointer">Terms of Service</span>
            {' and '}
            <span className="underline cursor-pointer">Privacy Policy</span>
          </p>

        </div>
      </div>

      {/* ── Continue Offline — on top ── */}
      <div className="absolute top-10 right-10 z-10">
        <Button variant="secondary" size="sm" label="Continue Offline" onClick={onSignIn} />
      </div>

    </div>
  )
}
