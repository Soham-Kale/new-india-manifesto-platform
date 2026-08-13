'use client'

import { useState } from 'react'
import { Check, HandHeart } from 'lucide-react'
import type { District, Commitment } from '@/lib/types'
import { useMockData } from '@/lib/MockDataProvider'
import { useT, useOptions } from '@/lib/i18n'
import { isEmail, isPhone, req } from '@/lib/validation'
import Button from '@/components/ui/Button'
import FormInput from '@/components/ui/FormInput'
import SelectField from '@/components/ui/SelectField'
import MultiSelectField from '@/components/ui/MultiSelectField'
import CheckboxConsent from '@/components/ui/CheckboxConsent'

export default function PledgePage() {
  const { addPledge } = useMockData()
  const { t } = useT()
  const { districts, commitments } = useOptions()
  const [done, setDone] = useState(false)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [district, setDistrict] = useState<District | ''>('')
  const [commitment, setCommitment] = useState<Commitment[]>([])
  const [consent, setConsent] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const err: Record<string, string> = {}
    if (!req(name)) err.name = t('pledge.errName')
    if (!isEmail(email)) err.email = t('pledge.errEmail')
    if (!isPhone(phone)) err.phone = t('pledge.errPhone')
    if (!district) err.district = t('pledge.errDistrict')
    if (commitment.length === 0) err.commitment = t('pledge.errCommitment')
    if (!consent) err.consent = t('pledge.errConsent')
    setErrors(err)
    if (Object.keys(err).length > 0) return

    addPledge({
      name,
      email,
      phone,
      district: district as District,
      commitment,
      consentCampaignUpdates: consent,
    })
    setDone(true)
    window.scrollTo({ top: 0 })
  }

  if (done) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center px-5 py-24 text-center sm:px-8">
        <div className="mb-6 flex h-16 w-16 animate-scale-in items-center justify-center rounded-full bg-success/10">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-success text-white">
            <Check className="h-6 w-6" strokeWidth={2.5} aria-hidden="true" />
          </span>
        </div>
        <h1 className="font-display text-3xl font-semibold uppercase tracking-tight text-ink">
          {t('pledge.doneTitle')}
        </h1>
        <p className="mt-3 text-muted">{t('pledge.doneMsg')}</p>
        <Button className="mt-8" onClick={() => window.location.assign('/')}>
          {t('pledge.backHome')}
        </Button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-xl px-5 py-14 sm:px-8 lg:py-20">
      <div className="mb-8 text-center">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-soft text-accent">
          <HandHeart className="h-6 w-6" aria-hidden="true" />
        </span>
        <h1 className="mt-5 font-display text-4xl font-semibold uppercase tracking-tight text-ink">
          {t('pledge.title')}
        </h1>
        <p className="mt-3 text-muted">{t('pledge.subcopy')}</p>
      </div>

      {/* What a pledge is + how it helps rural India */}
      <div className="mb-8 rounded-2xl border border-line bg-surface/60 p-6 sm:p-7">
        <h2 className="font-display text-lg font-semibold text-ink">{t('pledge.aboutHeading')}</h2>
        <p className="mt-2 text-[15px] leading-relaxed text-muted">{t('pledge.aboutBody')}</p>

        <h3 className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-muted">
          {t('pledge.helpHeading')}
        </h3>
        <ul className="mt-3 space-y-2.5">
          {['pledge.help1', 'pledge.help2', 'pledge.help3'].map((k) => (
            <li key={k} className="flex gap-2.5 text-[15px] leading-relaxed text-ink">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
              <span>{t(k)}</span>
            </li>
          ))}
        </ul>
      </div>

      <form onSubmit={submit} className="space-y-5" noValidate>
        <FormInput
          label={t('pledge.fullName')}
          name="name"
          required
          value={name}
          error={errors.name}
          onChange={(e) => setName(e.target.value)}
        />
        <FormInput
          label={t('pledge.email')}
          name="email"
          type="email"
          required
          value={email}
          error={errors.email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormInput
          label={t('pledge.phone')}
          name="phone"
          type="tel"
          required
          value={phone}
          error={errors.phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <SelectField
          label={t('pledge.district')}
          name="district"
          required
          options={districts}
          value={district}
          onChange={(v) => setDistrict(v as District)}
          error={errors.district}
        />
        <MultiSelectField
          label={t('pledge.commitmentLabel')}
          name="commitment"
          required
          options={commitments}
          values={commitment}
          onChange={(v) => setCommitment(v as Commitment[])}
          error={errors.commitment}
        />
        <CheckboxConsent name="consent" checked={consent} onChange={setConsent} error={errors.consent}>
          {t('pledge.consent')}
        </CheckboxConsent>

        <Button type="submit" className="w-full">
          {t('pledge.submit')}
        </Button>
      </form>
    </div>
  )
}
