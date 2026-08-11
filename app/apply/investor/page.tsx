'use client'

import { useState } from 'react'
import type { Sector, FounderStage, InvestorType } from '@/lib/types'
import { useMockData } from '@/lib/MockDataProvider'
import { useMockAuth } from '@/lib/MockAuthProvider'
import { useT, useOptions } from '@/lib/i18n'
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
  const { t } = useT()
  const { sectors, stages, investorTypes } = useOptions()
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
  const set = <K extends keyof typeof f>(k: K, v: (typeof f)[K]) => setF((s) => ({ ...s, [k]: v }))

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const err: Record<string, string> = {}
    if (!req(f.fullName)) err.fullName = t('apply.vNameShort')
    if (!isEmail(f.email)) err.email = t('apply.vEmail')
    if (!isPhone(f.phone)) err.phone = t('apply.vPhone')
    if (!f.investorType) err.investorType = t('apply.vInvestorType')
    if (f.sectors.length === 0) err.sectors = t('apply.vSectors')
    if (f.stageFocus.length === 0) err.stageFocus = t('apply.vStageFocus')
    if (!f.consent) err.consent = t('apply.vConsent')
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
        <ApplicationSuccess title={t('apply.investorSuccessTitle')} message={t('apply.investorSuccessMsg')} />
      </ApplyShell>
    )
  }

  return (
    <ApplyShell>
      <StepHeading eyebrow={t('apply.investorEyebrow')} title={t('apply.investorTitle')} subtitle={t('apply.investorSubtitle')} />
      <form onSubmit={submit} className="space-y-5" noValidate>
        <FormInput label={t('apply.fullName')} name="fullName" required value={f.fullName} error={errors.fullName} onChange={(e) => set('fullName', e.target.value)} />
        <div className="grid gap-5 sm:grid-cols-2">
          <FormInput label={t('apply.email')} name="email" type="email" required value={f.email} error={errors.email} onChange={(e) => set('email', e.target.value)} />
          <FormInput label={t('apply.phone')} name="phone" type="tel" required value={f.phone} error={errors.phone} onChange={(e) => set('phone', e.target.value)} />
        </div>
        <FormInput label={t('apply.iFirm')} name="firmName" value={f.firmName} onChange={(e) => set('firmName', e.target.value)} />
        <SelectField label={t('apply.iType')} name="investorType" required options={investorTypes} value={f.investorType} onChange={(v) => set('investorType', v as InvestorType)} error={errors.investorType} />
        <div className="grid gap-5 sm:grid-cols-2">
          <FormInput label={t('apply.iTicketMin')} name="ticketMin" type="number" min={0} value={f.ticketMin} onChange={(e) => set('ticketMin', e.target.value)} />
          <FormInput label={t('apply.iTicketMax')} name="ticketMax" type="number" min={0} value={f.ticketMax} onChange={(e) => set('ticketMax', e.target.value)} />
        </div>
        <MultiSelectField label={t('apply.iSectors')} name="sectors" required options={sectors} values={f.sectors} onChange={(v) => set('sectors', v as Sector[])} error={errors.sectors} />
        <MultiSelectField label={t('apply.iStageFocus')} name="stageFocus" required options={stages} values={f.stageFocus} onChange={(v) => set('stageFocus', v as FounderStage[])} error={errors.stageFocus} />
        <FormInput label={t('apply.linkedin')} name="linkedin" value={f.linkedin} onChange={(e) => set('linkedin', e.target.value)} />
        <CheckboxConsent name="consent" checked={f.consent} onChange={(v) => set('consent', v)} error={errors.consent}>
          {t('apply.iConsent')}
        </CheckboxConsent>
        <Button type="submit" className="w-full">{t('apply.iSubmit')}</Button>
      </form>
    </ApplyShell>
  )
}
