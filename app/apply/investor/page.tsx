'use client'

import { useState } from 'react'
import type { Sector, FounderStage, InvestorType } from '@/lib/types'
import { SECTORS, FOUNDER_STAGES, INVESTOR_TYPES } from '@/lib/options'
import { useMockData } from '@/lib/MockDataProvider'
import { useMockAuth } from '@/lib/MockAuthProvider'
import { isEmail, isPhone, req } from '@/lib/validation'
import ApplyShell from '@/components/apply/ApplyShell'
import ApplicationSuccess from '@/components/apply/ApplicationSuccess'
import StepHeading from '@/components/ui/StepHeading'
import Button from '@/components/ui/Button'
import FormInput from '@/components/ui/FormInput'
import SelectField from '@/components/ui/SelectField'
import MultiSelectField from '@/components/ui/MultiSelectField'
import CheckboxConsent from '@/components/ui/CheckboxConsent'

export default function InvestorApplyPage() {
  const { addInvestorProfile } = useMockData()
  const { signIn } = useMockAuth()
  const [done, setDone] = useState(false)

  const [f, setF] = useState({
    fullName: '',
    email: '',
    phone: '',
    firmName: '',
    investorType: '' as InvestorType | '',
    ticketMin: '',
    ticketMax: '',
    sectors: [] as Sector[],
    stageFocus: [] as FounderStage[],
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
    if (!isPhone(f.phone)) err.phone = 'Enter a valid phone number.'
    if (!f.investorType) err.investorType = 'Select an investor type.'
    if (f.sectors.length === 0) err.sectors = 'Choose at least one sector.'
    if (f.stageFocus.length === 0) err.stageFocus = 'Choose at least one stage.'
    if (!f.consent) err.consent = 'This consent is required to submit.'
    setErrors(err)
    if (Object.keys(err).length > 0) return

    addInvestorProfile({
      userId: `usr_${f.email.split('@')[0]}`,
      fullName: f.fullName,
      email: f.email,
      phone: f.phone,
      investorType: f.investorType as InvestorType,
      ticketMin: Number(f.ticketMin) || 0,
      ticketMax: Number(f.ticketMax) || 0,
      sectors: f.sectors,
      stageFocus: f.stageFocus,
      firmName: f.firmName,
      linkedin: f.linkedin,
    })
    signIn({ email: f.email, fullName: f.fullName, phone: f.phone, role: 'investor' })
    setDone(true)
    window.scrollTo({ top: 0 })
  }

  if (done) {
    return (
      <ApplyShell>
        <ApplicationSuccess
          title="Thank you — application received."
          message="Your investor profile is pending review. We curate deal-flow carefully and reveal founder contact only after a match is approved. We'll be in touch."
        />
      </ApplyShell>
    )
  }

  return (
    <ApplyShell>
      <StepHeading
        eyebrow="Apply · Investor"
        title="Back a founder"
        subtitle="Support vetted founders through a transparent, revolving model."
      />
      <form onSubmit={submit} className="space-y-5" noValidate>
        <FormInput label="Full name" name="fullName" required value={f.fullName} error={errors.fullName} onChange={(e) => set('fullName', e.target.value)} />
        <div className="grid gap-5 sm:grid-cols-2">
          <FormInput label="Email" name="email" type="email" required value={f.email} error={errors.email} onChange={(e) => set('email', e.target.value)} />
          <FormInput label="Phone" name="phone" type="tel" required value={f.phone} error={errors.phone} onChange={(e) => set('phone', e.target.value)} />
        </div>
        <FormInput label="Firm / entity name" name="firmName" value={f.firmName} onChange={(e) => set('firmName', e.target.value)} />
        <SelectField label="Investor type" name="investorType" required options={INVESTOR_TYPES} value={f.investorType} onChange={(v) => set('investorType', v as InvestorType)} error={errors.investorType} />
        <div className="grid gap-5 sm:grid-cols-2">
          <FormInput label="Typical ticket — min (₹)" name="ticketMin" type="number" min={0} value={f.ticketMin} onChange={(e) => set('ticketMin', e.target.value)} />
          <FormInput label="Typical ticket — max (₹)" name="ticketMax" type="number" min={0} value={f.ticketMax} onChange={(e) => set('ticketMax', e.target.value)} />
        </div>
        <MultiSelectField label="Sectors of interest" name="sectors" required options={SECTORS} values={f.sectors} onChange={(v) => set('sectors', v as Sector[])} error={errors.sectors} />
        <MultiSelectField label="Stage focus" name="stageFocus" required options={FOUNDER_STAGES} values={f.stageFocus} onChange={(v) => set('stageFocus', v as FounderStage[])} error={errors.stageFocus} />
        <FormInput label="LinkedIn" name="linkedin" value={f.linkedin} onChange={(e) => set('linkedin', e.target.value)} />
        <CheckboxConsent name="consent" checked={f.consent} onChange={(v) => set('consent', v)} error={errors.consent}>
          I agree to my details being processed for the investor programme. (Required — DPDP consent.)
        </CheckboxConsent>
        <Button type="submit" className="w-full">Submit investor application</Button>
      </form>
    </ApplyShell>
  )
}
