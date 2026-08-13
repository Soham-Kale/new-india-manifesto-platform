'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ShieldCheck } from 'lucide-react'
import type { Role } from '@/lib/types'
import { authClient } from '@/lib/auth-client'
import { isEmail } from '@/lib/validation'
import { useT } from '@/lib/i18n'
import Button from '@/components/ui/Button'
import FormInput from '@/components/ui/FormInput'
import LangToggle from '@/components/site/LangToggle'

function routeForRole(role: Role): string {
  if (role === 'admin') return '/admin'
  if (role === 'founder') return '/dashboard'
  if (role === 'mentor') return '/mentor'
  if (role === 'investor') return '/investor'
  return '/'
}

export default function LoginPage() {
  const { t } = useT()
  const router = useRouter()
  const [adminMode, setAdminMode] = useState(false)
  const [stage, setStage] = useState<'email' | 'otp'>('email')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const sendCode = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isEmail(email)) {
      setError(t('login.errEmail'))
      return
    }
    setError('')
    setLoading(true)
    const { error: err } = await authClient.emailOtp.sendVerificationOtp({ email, type: 'sign-in' })
    setLoading(false)
    if (err) {
      setError(t('login.errSend'))
      return
    }
    setStage('otp')
  }

  const verify = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!/^\d{6}$/.test(otp.trim())) {
      setError(t('login.errCode'))
      return
    }
    setError('')
    setLoading(true)
    const { data, error: err } = await authClient.signIn.emailOtp({ email, otp: otp.trim() })
    setLoading(false)
    if (err || !data?.user) {
      setError(t('login.errVerify'))
      return
    }
    router.push(routeForRole((data.user.role as Role) ?? 'founder'))
  }

  const adminSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isEmail(email) || !password) {
      setError(t('login.errAdmin'))
      return
    }
    setError('')
    setLoading(true)
    const { data, error: err } = await authClient.signIn.email({ email, password })
    setLoading(false)
    if (err || !data?.user) {
      setError(t('login.errAdmin'))
      return
    }
    router.push(routeForRole((data.user.role as Role) ?? 'founder'))
  }

  const resetTo = (toAdmin: boolean) => {
    setAdminMode(toAdmin)
    setStage('email')
    setOtp('')
    setPassword('')
    setError('')
  }

  return (
    <div className="flex min-h-screen flex-col bg-canvas">
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-5 py-16">
        <div className="mb-8 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {t('login.back')}
          </Link>
          <LangToggle />
        </div>

        <div className="rounded-2xl border border-line bg-surface p-6 shadow-card sm:p-8">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
            <ShieldCheck className="h-5 w-5" aria-hidden="true" />
          </span>
          <h1 className="mt-5 font-serif text-2xl font-medium tracking-tight text-ink">
            {adminMode ? t('login.adminTitle') : t('login.title')}
          </h1>
          <p className="mt-2 text-sm text-muted">
            {adminMode
              ? t('login.adminStep')
              : stage === 'email'
                ? t('login.emailStep')
                : `${t('login.otpStep')} ${email}.`}
          </p>

          {adminMode ? (
            <form onSubmit={adminSubmit} className="mt-6 space-y-4" noValidate>
              <FormInput
                label={t('login.emailLabel')}
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <FormInput
                label={t('login.passwordLabel')}
                name="password"
                type="password"
                required
                value={password}
                error={error}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? t('login.verifying') : t('login.adminSignIn')}
              </Button>
              <button
                type="button"
                onClick={() => resetTo(false)}
                className="w-full text-center text-sm text-muted hover:text-ink"
              >
                {t('login.backToOtp')}
              </button>
            </form>
          ) : stage === 'email' ? (
            <form onSubmit={sendCode} className="mt-6 space-y-4" noValidate>
              <FormInput
                label={t('login.emailLabel')}
                name="email"
                type="email"
                required
                value={email}
                error={error}
                hint={t('login.emailHint')}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? t('login.sending') : t('login.sendCode')}
              </Button>
            </form>
          ) : (
            <form onSubmit={verify} className="mt-6 space-y-4" noValidate>
              <FormInput
                label={t('login.codeLabel')}
                name="otp"
                inputMode="numeric"
                placeholder="000000"
                required
                value={otp}
                error={error}
                onChange={(e) => setOtp(e.target.value)}
              />
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? t('login.verifying') : t('login.verify')}
              </Button>
              <button
                type="button"
                onClick={() => {
                  setStage('email')
                  setOtp('')
                  setError('')
                }}
                className="w-full text-center text-sm text-muted hover:text-ink"
              >
                {t('login.differentEmail')}
              </button>
            </form>
          )}

          {!adminMode && (
            <p className="mt-6 rounded-lg bg-accent-soft/60 px-3 py-2 text-center text-xs text-muted">
              {t('login.consoleNote')}
            </p>
          )}

          {!adminMode && stage === 'email' && (
            <button
              type="button"
              onClick={() => resetTo(true)}
              className="mt-4 w-full text-center text-xs font-medium text-muted hover:text-accent"
            >
              {t('login.adminLink')}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
