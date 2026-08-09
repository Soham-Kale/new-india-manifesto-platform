'use client'

import { useState } from 'react'
import type { Sector } from '@/lib/types'
import { SECTORS } from '@/lib/options'
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

export default function MentorApplyPage() {
  const { addMentorProfile } = useMockData()
  const { signIn } = useMockAuth()
  const [done, setDone] = useState(false)

  const [f, setF] = useState({
    fullName: '',
    email: '',
    phone: '',
    roleCompany: '',
    yearsExperience: '',
    capacity: '',
    expertise: '',
    sectors: [] as Sector[],
    linkedin: '',
    bio: '',
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
    if (!isPhone(f.phone)) err.phone = 'Enter a valid phone number.'
    if (!req(f.expertise)) err.expertise = 'List at least one area of expertise.'
    if (f.sectors.length === 0) err.sectors = 'Choose at least one sector.'
    if (!minLen(f.bio, 20)) err.bio = 'Please add a short bio (20+ characters).'
    if (!f.consent) err.consent = 'This consent is required to submit.'
    setErrors(err)
    if (Object.keys(err).length > 0) return

    addMentorProfile({
      userId: `usr_${f.email.split('@')[0]}`,
      fullName: f.fullName,
      email: f.email,
      phone: f.phone,
      expertiseAreas: f.expertise.split(',').map((s) => s.trim()).filter(Boolean),
      sectors: f.sectors,
      roleCompany: f.roleCompany,
      yearsExperience: Number(f.yearsExperience) || 0,
      capacity: Number(f.capacity) || 1,
      linkedin: f.linkedin,
      bio: f.bio,
    })
    signIn({ email: f.email, fullName: f.fullName, phone: f.phone, role: 'mentor' })
    setDone(true)
    window.scrollTo({ top: 0 })
  }

  if (done) {
    return (
      <ApplyShell>
        <ApplicationSuccess
          title="Thank you — application received."
          message="Your mentor profile is pending review. Our team approves mentors before they're matched with founders. We'll be in touch."
        />
      </ApplyShell>
    )
  }

  return (
    <ApplyShell>
      <StepHeading
        eyebrow="Apply · Mentor"
        title="Mentor a founder"
        subtitle="Share your expertise with builders across Maharashtra's rural heartland."
      />
      <form onSubmit={submit} className="space-y-5" noValidate>
        <FormInput label="Full name" name="fullName" required value={f.fullName} error={errors.fullName} onChange={(e) => set('fullName', e.target.value)} />
        <div className="grid gap-5 sm:grid-cols-2">
          <FormInput label="Email" name="email" type="email" required value={f.email} error={errors.email} onChange={(e) => set('email', e.target.value)} />
          <FormInput label="Phone" name="phone" type="tel" required value={f.phone} error={errors.phone} onChange={(e) => set('phone', e.target.value)} />
        </div>
        <FormInput label="Current role & company" name="roleCompany" value={f.roleCompany} onChange={(e) => set('roleCompany', e.target.value)} />
        <div className="grid gap-5 sm:grid-cols-2">
          <FormInput label="Years of experience" name="yearsExperience" type="number" min={0} value={f.yearsExperience} onChange={(e) => set('yearsExperience', e.target.value)} />
          <FormInput label="Founders you can mentor" name="capacity" type="number" min={1} hint="Your capacity" value={f.capacity} onChange={(e) => set('capacity', e.target.value)} />
        </div>
        <FormInput label="Areas of expertise" name="expertise" required hint="Comma-separated, e.g. Supply chain, Branding, Operations" value={f.expertise} error={errors.expertise} onChange={(e) => set('expertise', e.target.value)} />
        <MultiSelectField label="Sectors you can help with" name="sectors" required options={SECTORS} values={f.sectors} onChange={(v) => set('sectors', v as Sector[])} error={errors.sectors} />
        <FormInput label="LinkedIn" name="linkedin" value={f.linkedin} onChange={(e) => set('linkedin', e.target.value)} />
        <FormTextarea label="Short bio" name="bio" required showCount rows={4} value={f.bio} error={errors.bio} onChange={(e) => set('bio', e.target.value)} />
        <CheckboxConsent name="consent" checked={f.consent} onChange={(v) => set('consent', v)} error={errors.consent}>
          I agree to my details being processed for the mentor programme. (Required — DPDP consent.)
        </CheckboxConsent>
        <Button type="submit" className="w-full">Submit mentor application</Button>
      </form>
    </ApplyShell>
  )
}
