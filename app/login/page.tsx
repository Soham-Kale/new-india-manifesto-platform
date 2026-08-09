'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ShieldCheck } from 'lucide-react'
import type { Role } from '@/lib/types'
import { useMockAuth } from '@/lib/MockAuthProvider'
import { isEmail } from '@/lib/validation'
import Button from '@/components/ui/Button'
import FormInput from '@/components/ui/FormInput'
import SelectField from '@/components/ui/SelectField'

const ROLE_OPTIONS = [
  { value: 'founder', label: 'Founder' },
  { value: 'mentor', label: 'Mentor' },
  { value: 'investor', label: 'Investor' },
  { value: 'expert', label: 'Expert' },
  { value: 'admin', label: 'Admin' },
]

export default function LoginPage() {
  const { signIn, switchRole } = useMockAuth()
  const router = useRouter()
  const [stage, setStage] = useState<'email' | 'otp'>('email')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState<Role>('founder')
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')

  const sendCode = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isEmail(email)) {
      setError('Enter a valid email.')
      return
    }
    setError('')
    setStage('otp')
  }

  const verify = (e: React.FormEvent) => {
    e.preventDefault()
    if (otp.trim().length < 4) {
      setError('Enter the 6-digit code (any digits work in this demo).')
      return
    }
    if (role === 'admin') switchRole('admin')
    else signIn({ email, role })
    router.push(role === 'admin' ? '/admin' : role === 'founder' ? '/dashboard' : '/')
  }

  return (
    <div className="flex min-h-screen flex-col bg-canvas">
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-5 py-16">
        <Link href="/" className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to home
        </Link>

        <div className="rounded-2xl border border-line bg-surface p-6 shadow-card sm:p-8">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
            <ShieldCheck className="h-5 w-5" aria-hidden="true" />
          </span>
          <h1 className="mt-5 font-serif text-2xl font-medium tracking-tight text-ink">
            Sign in
          </h1>
          <p className="mt-2 text-sm text-muted">
            {stage === 'email'
              ? 'Enter your email to receive a one-time code.'
              : `We sent a code to ${email}. Enter it below.`}
          </p>

          {stage === 'email' ? (
            <form onSubmit={sendCode} className="mt-6 space-y-4" noValidate>
              <FormInput label="Email" name="email" type="email" required value={email} error={error} onChange={(e) => setEmail(e.target.value)} />
              <SelectField label="Sign in as" name="role" options={ROLE_OPTIONS} value={role} onChange={(v) => setRole(v as Role)} />
              <Button type="submit" className="w-full">Send code</Button>
            </form>
          ) : (
            <form onSubmit={verify} className="mt-6 space-y-4" noValidate>
              <FormInput label="6-digit code" name="otp" inputMode="numeric" placeholder="000000" required value={otp} error={error} onChange={(e) => setOtp(e.target.value)} />
              <Button type="submit" className="w-full">Verify & continue</Button>
              <button type="button" onClick={() => setStage('email')} className="w-full text-center text-sm text-muted hover:text-ink">
                Use a different email
              </button>
            </form>
          )}

          <p className="mt-6 rounded-lg bg-accent-soft/60 px-3 py-2 text-center text-xs text-muted">
            Demo only — no real code is sent. Any 6 digits work.
          </p>
        </div>
      </div>
    </div>
  )
}
