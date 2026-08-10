'use client'

import { useState } from 'react'
import type { Contribution } from '@/lib/types'
import { CONTRIBUTIONS } from '@/lib/options'
import { useMockData } from '@/lib/MockDataProvider'
import { useMockAuth } from '@/lib/MockAuthProvider'
import { isEmail, isPhone, req, minLen } from '@/lib/validation'
import ApplyShell from '@/components/apply/ApplyShell'
import ApplicationSuccess from '@/components/apply/ApplicationSuccess'
import StepHeading from '@/components/ui/StepHeading'
import Button from '@/components/ui/Button'
import FormInput from '@/components/ui/FormInput'
import FormTextarea from '@/components/ui/FormTextarea'
import MultiSelectField from '@/components/ui/MultiSelectField'
import CheckboxConsent from '@/components/ui/CheckboxConsent'

export default function ExpertApplyPage() {
  const { addExpertProfile } = useMockData()
  const { signIn } = useMockAuth()
  const [done, setDone] = useState(false)

  const [f, setF] = useState({
    fullName: '',
    email: '',
    phone: '',
    domain: '',
    contribution: [] as Contribution[],
    bio: '',
    linkedin: '',
    consent: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const set = <K extends keyof typeof f>(k: K, v: (typeof f)[K]) =>
    setF((s) => ({ ...s, [k]: v }))

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const err: Record<string, string> = {}
    if (!req(f.fullName)) err.fullName = 'Please enter your name.'
    if (!isEmail(f.email)) err.email = 'Enter a valid email.'
    if (!isPhone(f.phone)) err.phone = 'Enter a valid 10-digit phone number.'
    if (!req(f.domain)) err.domain = 'Please enter your domain.'
    if (f.contribution.length === 0) err.contribution = 'Choose at least one way to contribute.'
    if (!minLen(f.bio, 20)) err.bio = 'Please add a short bio (20+ characters).'
    if (!f.consent) err.consent = 'This consent is required to submit.'
    setErrors(err)
    if (Object.keys(err).length > 0) return

    addExpertProfile({
      userId: `usr_${f.email.split('@')[0]}`,
      fullName: f.fullName,
      email: f.email,
      phone: f.phone,
      domain: f.domain,
      contribution: f.contribution,
      bio: f.bio,
      linkedin: f.linkedin,
    })
    signIn({ email: f.email, fullName: f.fullName, phone: f.phone, role: 'expert' })
    setDone(true)
    window.scrollTo({ top: 0 })
  }

  if (done) {
    return (
      <ApplyShell>
        <ApplicationSuccess
          title="Thank you — application received."
          message="Your expert profile is pending review. We'll reach out about judging, speaking, curriculum or policy opportunities that fit your domain."
        />
      </ApplyShell>
    )
  }

  return (
    <ApplyShell>
      <StepHeading
        eyebrow="Apply · Industry Expert"
        title="Lend your expertise"
        subtitle="Judge, speak, shape curriculum, or advise on policy for the initiative."
      />
      <form onSubmit={submit} className="space-y-5" noValidate>
        <FormInput label="Full name" name="fullName" required value={f.fullName} error={errors.fullName} onChange={(e) => set('fullName', e.target.value)} />
        <div className="grid gap-5 sm:grid-cols-2">
          <FormInput label="Email" name="email" type="email" required value={f.email} error={errors.email} onChange={(e) => set('email', e.target.value)} />
          <FormInput label="Phone" name="phone" type="tel" required value={f.phone} error={errors.phone} onChange={(e) => set('phone', e.target.value)} />
        </div>
        <FormInput label="Your domain" name="domain" required hint="e.g. Agricultural sciences, Public policy, Product design" value={f.domain} error={errors.domain} onChange={(e) => set('domain', e.target.value)} />
        <MultiSelectField label="How would you like to contribute?" name="contribution" required options={CONTRIBUTIONS} values={f.contribution} onChange={(v) => set('contribution', v as Contribution[])} error={errors.contribution} />
        <FormInput label="LinkedIn" name="linkedin" value={f.linkedin} onChange={(e) => set('linkedin', e.target.value)} />
        <FormTextarea label="Short bio" name="bio" required showCount rows={4} value={f.bio} error={errors.bio} onChange={(e) => set('bio', e.target.value)} />
        <CheckboxConsent name="consent" checked={f.consent} onChange={(v) => set('consent', v)} error={errors.consent}>
          I agree to my details being processed for the expert programme. (Required — DPDP consent.)
        </CheckboxConsent>
        <Button type="submit" className="w-full">Submit expert application</Button>
      </form>
    </ApplyShell>
  )
}
