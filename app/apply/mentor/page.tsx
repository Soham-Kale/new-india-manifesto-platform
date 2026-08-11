'use client'

import { useState } from 'react'
import type { Sector } from '@/lib/types'
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

export default function MentorApplyPage() {
  const { addMentorProfile } = useMockData()
  const { signIn } = useMockAuth()
  const { t } = useT()
  const { sectors } = useOptions()
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
  const set = <K extends keyof typeof f>(k: K, v: (typeof f)[K]) => setF((s) => ({ ...s, [k]: v }))

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const err: Record<string, string> = {}
    if (!req(f.fullName)) err.fullName = t('apply.vNameShort')
    if (!isEmail(f.email)) err.email = t('apply.vEmail')
    if (!isPhone(f.phone)) err.phone = t('apply.vPhone')
    if (!req(f.expertise)) err.expertise = t('apply.vExpertise')
    if (f.sectors.length === 0) err.sectors = t('apply.vSectors')
    if (!minLen(f.bio, 20)) err.bio = t('apply.vBio')
    if (!f.consent) err.consent = t('apply.vConsent')
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
        <ApplicationSuccess title={t('apply.mentorSuccessTitle')} message={t('apply.mentorSuccessMsg')} />
      </ApplyShell>
    )
  }

  return (
    <ApplyShell>
      <StepHeading eyebrow={t('apply.mentorEyebrow')} title={t('apply.mentorTitle')} subtitle={t('apply.mentorSubtitle')} />
      <form onSubmit={submit} className="space-y-5" noValidate>
        <FormInput label={t('apply.fullName')} name="fullName" required value={f.fullName} error={errors.fullName} onChange={(e) => set('fullName', e.target.value)} />
        <div className="grid gap-5 sm:grid-cols-2">
          <FormInput label={t('apply.email')} name="email" type="email" required value={f.email} error={errors.email} onChange={(e) => set('email', e.target.value)} />
          <FormInput label={t('apply.phone')} name="phone" type="tel" required value={f.phone} error={errors.phone} onChange={(e) => set('phone', e.target.value)} />
        </div>
        <FormInput label={t('apply.mRoleCompany')} name="roleCompany" value={f.roleCompany} onChange={(e) => set('roleCompany', e.target.value)} />
        <div className="grid gap-5 sm:grid-cols-2">
          <FormInput label={t('apply.mYears')} name="yearsExperience" type="number" min={0} value={f.yearsExperience} onChange={(e) => set('yearsExperience', e.target.value)} />
          <FormInput label={t('apply.mCapacity')} name="capacity" type="number" min={1} value={f.capacity} onChange={(e) => set('capacity', e.target.value)} />
        </div>
        <FormInput label={t('apply.mExpertise')} name="expertise" required hint={t('apply.mExpertiseHint')} value={f.expertise} error={errors.expertise} onChange={(e) => set('expertise', e.target.value)} />
        <MultiSelectField label={t('apply.mSectors')} name="sectors" required options={sectors} values={f.sectors} onChange={(v) => set('sectors', v as Sector[])} error={errors.sectors} />
        <FormInput label={t('apply.linkedin')} name="linkedin" value={f.linkedin} onChange={(e) => set('linkedin', e.target.value)} />
        <FormTextarea label={t('apply.mBio')} name="bio" required showCount rows={4} value={f.bio} error={errors.bio} onChange={(e) => set('bio', e.target.value)} />
        <CheckboxConsent name="consent" checked={f.consent} onChange={(v) => set('consent', v)} error={errors.consent}>
          {t('apply.mConsent')}
        </CheckboxConsent>
        <Button type="submit" className="w-full">{t('apply.mSubmit')}</Button>
      </form>
    </ApplyShell>
  )
}
