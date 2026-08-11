'use client'

import { useState } from 'react'
import type { Contribution } from '@/lib/types'
import { useMockData } from '@/lib/MockDataProvider'
import { useMockAuth } from '@/lib/MockAuthProvider'
import { useT, useOptions } from '@/lib/i18n'
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
  const { t } = useT()
  const { contributions } = useOptions()
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
  const set = <K extends keyof typeof f>(k: K, v: (typeof f)[K]) => setF((s) => ({ ...s, [k]: v }))

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const err: Record<string, string> = {}
    if (!req(f.fullName)) err.fullName = t('apply.vNameShort')
    if (!isEmail(f.email)) err.email = t('apply.vEmail')
    if (!isPhone(f.phone)) err.phone = t('apply.vPhone')
    if (!req(f.domain)) err.domain = t('apply.vDomain')
    if (f.contribution.length === 0) err.contribution = t('apply.vContribution')
    if (!minLen(f.bio, 20)) err.bio = t('apply.vBio')
    if (!f.consent) err.consent = t('apply.vConsent')
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
        <ApplicationSuccess title={t('apply.expertSuccessTitle')} message={t('apply.expertSuccessMsg')} />
      </ApplyShell>
    )
  }

  return (
    <ApplyShell>
      <StepHeading eyebrow={t('apply.expertEyebrow')} title={t('apply.expertTitle')} subtitle={t('apply.expertSubtitle')} />
      <form onSubmit={submit} className="space-y-5" noValidate>
        <FormInput label={t('apply.fullName')} name="fullName" required value={f.fullName} error={errors.fullName} onChange={(e) => set('fullName', e.target.value)} />
        <div className="grid gap-5 sm:grid-cols-2">
          <FormInput label={t('apply.email')} name="email" type="email" required value={f.email} error={errors.email} onChange={(e) => set('email', e.target.value)} />
          <FormInput label={t('apply.phone')} name="phone" type="tel" required value={f.phone} error={errors.phone} onChange={(e) => set('phone', e.target.value)} />
        </div>
        <FormInput label={t('apply.eDomain')} name="domain" required hint={t('apply.eDomainHint')} value={f.domain} error={errors.domain} onChange={(e) => set('domain', e.target.value)} />
        <MultiSelectField label={t('apply.eContribution')} name="contribution" required options={contributions} values={f.contribution} onChange={(v) => set('contribution', v as Contribution[])} error={errors.contribution} />
        <FormInput label={t('apply.linkedin')} name="linkedin" value={f.linkedin} onChange={(e) => set('linkedin', e.target.value)} />
        <FormTextarea label={t('apply.eBio')} name="bio" required showCount rows={4} value={f.bio} error={errors.bio} onChange={(e) => set('bio', e.target.value)} />
        <CheckboxConsent name="consent" checked={f.consent} onChange={(v) => set('consent', v)} error={errors.consent}>
          {t('apply.eConsent')}
        </CheckboxConsent>
        <Button type="submit" className="w-full">{t('apply.eSubmit')}</Button>
      </form>
    </ApplyShell>
  )
}
