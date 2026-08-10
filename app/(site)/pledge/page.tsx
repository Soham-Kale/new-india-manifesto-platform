'use client'

import { useState } from 'react'
import { Check, HandHeart } from 'lucide-react'
import type { District, Commitment } from '@/lib/types'
import { DISTRICTS, COMMITMENTS } from '@/lib/options'
import { useMockData } from '@/lib/MockDataProvider'
import { isEmail, isPhone, req } from '@/lib/validation'
import Button from '@/components/ui/Button'
import FormInput from '@/components/ui/FormInput'
import SelectField from '@/components/ui/SelectField'
import MultiSelectField from '@/components/ui/MultiSelectField'
import CheckboxConsent from '@/components/ui/CheckboxConsent'

export default function PledgePage() {
  const { addPledge } = useMockData()
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
    if (!req(name)) err.name = 'Please enter your name.'
    if (!isEmail(email)) err.email = 'Enter a valid email.'
    if (!isPhone(phone)) err.phone = 'Enter a valid 10-digit phone number.'
    if (!district) err.district = 'Please select your district.'
    if (commitment.length === 0) err.commitment = 'Choose at least one way to take part.'
    if (!consent) err.consent = 'Please agree to receive updates so we can add you.'
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
        <h1 className="font-serif text-3xl font-medium tracking-tight text-ink">You&apos;re in.</h1>
        <p className="mt-3 text-muted">
          Thank you, {name.split(' ')[0]}. You&apos;ve joined the movement for a new India. We&apos;ll
          keep you posted on what&apos;s next.
        </p>
        <Button className="mt-8" onClick={() => window.location.assign('/')}>
          Back to home
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
        <h1 className="mt-5 font-serif text-4xl font-medium tracking-tight text-ink">
          Yes, I Am In
        </h1>
        <p className="mt-3 text-muted">
          Add your name to the movement in under a minute. No account needed.
        </p>
      </div>

      <form onSubmit={submit} className="space-y-5" noValidate>
        <FormInput
          label="Full name"
          name="name"
          required
          value={name}
          error={errors.name}
          onChange={(e) => setName(e.target.value)}
        />
        <FormInput
          label="Email"
          name="email"
          type="email"
          required
          value={email}
          error={errors.email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormInput
          label="Phone / WhatsApp"
          name="phone"
          type="tel"
          required
          value={phone}
          error={errors.phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <SelectField
          label="District"
          name="district"
          required
          options={DISTRICTS}
          value={district}
          onChange={(v) => setDistrict(v as District)}
          error={errors.district}
        />
        <MultiSelectField
          label="How do you want to take part?"
          name="commitment"
          required
          options={COMMITMENTS}
          values={commitment}
          onChange={(v) => setCommitment(v as Commitment[])}
          error={errors.commitment}
        />
        <CheckboxConsent name="consent" checked={consent} onChange={setConsent} error={errors.consent}>
          I agree to receive campaign updates about the New India movement. (Required to add you to
          the supporter list — DPDP consent.)
        </CheckboxConsent>

        <Button type="submit" className="w-full">
          Take the pledge
        </Button>
      </form>
    </div>
  )
}
