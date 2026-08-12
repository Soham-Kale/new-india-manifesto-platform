'use client'

import { useCallback, useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight, Loader2, Upload, Video, Send } from 'lucide-react'
import type { District, FounderStage, Sector, LookingFor } from '@/lib/types'
import { useMockData } from '@/lib/MockDataProvider'
import { useMockAuth } from '@/lib/MockAuthProvider'
import { useT, useOptions } from '@/lib/i18n'
import { isEmail, isPhone, req, minLen } from '@/lib/validation'
import ApplicationLayout from './ApplicationLayout'
import ApplyShell from './ApplyShell'
import ApplicationSuccess from './ApplicationSuccess'
import Button from '@/components/ui/Button'
import FormInput from '@/components/ui/FormInput'
import FormTextarea from '@/components/ui/FormTextarea'
import SelectField from '@/components/ui/SelectField'
import MultiSelectField from '@/components/ui/MultiSelectField'
import CheckboxConsent from '@/components/ui/CheckboxConsent'
import StepHeading from '@/components/ui/StepHeading'
import FormError from '@/components/ui/FormError'

interface Form {
  fullName: string
  email: string
  phone: string
  district: District | ''
  ventureName: string
  stage: FounderStage | ''
  sector: Sector | ''
  oneLiner: string
  problem: string
  whatBuilt: string
  teamSize: string
  lookingFor: LookingFor[]
  capitalContext: string
  links: string
  pitchDeckName: string
  videoUrl: string | null
  videoDuration: number | null
  consentShareWithMentors: boolean
  consentDataProcessing: boolean
  consentCampaignUpdates: boolean
}

const INITIAL: Form = {
  fullName: '',
  email: '',
  phone: '',
  district: '',
  ventureName: '',
  stage: '',
  sector: '',
  oneLiner: '',
  problem: '',
  whatBuilt: '',
  teamSize: '',
  lookingFor: [],
  capitalContext: '',
  links: '',
  pitchDeckName: '',
  videoUrl: null,
  videoDuration: null,
  consentShareWithMentors: false,
  consentDataProcessing: false,
  consentCampaignUpdates: false,
}

type Errors = Partial<Record<keyof Form, string>>
type Status = 'filling' | 'submitting' | 'success' | 'already'

export default function FounderWizard() {
  const { addFounderApplication } = useMockData()
  const { signIn } = useMockAuth()
  const { t } = useT()
  const { districts, stages, sectors, lookingFor } = useOptions()

  const [form, setForm] = useState<Form>(INITIAL)
  const [step, setStep] = useState(0)
  const [maxReached, setMaxReached] = useState(0)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>('filling')

  const STEPS = [
    { number: '01', label: t('apply.s1Label'), hint: t('apply.s1Hint') },
    { number: '02', label: t('apply.s2Label'), hint: t('apply.s2Hint') },
    { number: '03', label: t('apply.s3Label'), hint: t('apply.s3Hint') },
    { number: '04', label: t('apply.s4Label'), hint: t('apply.s4Hint') },
  ]

  const set = useCallback(<K extends keyof Form>(key: K, value: Form[K]) => {
    setForm((f) => ({ ...f, [key]: value }))
    setErrors((e) => {
      if (!e[key]) return e
      const next = { ...e }
      delete next[key]
      return next
    })
  }, [])

  const goToStep = useCallback((i: number) => {
    setErrors({})
    setStep(i)
    setMaxReached((m) => Math.max(m, i))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const validateStep = useCallback(
    (i: number): Errors => {
      const e: Errors = {}
      if (i === 0) {
        if (!req(form.fullName)) e.fullName = t('apply.vName')
        if (!isEmail(form.email)) e.email = t('apply.vEmail')
        if (!isPhone(form.phone)) e.phone = t('apply.vPhone')
        if (!form.district) e.district = t('apply.vDistrict')
      }
      if (i === 1) {
        if (!form.stage) e.stage = t('apply.vStage')
        if (!form.sector) e.sector = t('apply.vSector')
        if (!req(form.oneLiner)) e.oneLiner = t('apply.vOneLiner')
        else if (form.oneLiner.length > 140) e.oneLiner = t('apply.vOneLinerMax')
        if (!minLen(form.problem, 20)) e.problem = t('apply.vProblem')
        if (!minLen(form.whatBuilt, 20)) e.whatBuilt = t('apply.vWhatBuilt')
        if (form.lookingFor.length === 0) e.lookingFor = t('apply.vLookingFor')
      }
      if (i === 2) {
        const url = (form.videoUrl ?? '').trim()
        if (!url) e.videoUrl = t('apply.vVideoRequired')
        else if (!/^https?:\/\/.+/i.test(url)) e.videoUrl = t('apply.vVideoUrl')
      }
      return e
    },
    [form, t],
  )

  const handleNext = useCallback(() => {
    const e = validateStep(step)
    if (Object.keys(e).length > 0) {
      setErrors(e)
      return
    }
    goToStep(step + 1)
  }, [step, validateStep, goToStep])

  const handleSubmit = useCallback(() => {
    const all = { ...validateStep(0), ...validateStep(1), ...validateStep(2) }
    if (!form.consentDataProcessing) all.consentDataProcessing = t('apply.vConsent')
    if (Object.keys(all).length > 0) {
      setErrors(all)
      if (all.fullName || all.email || all.phone || all.district) goToStep(0)
      else if (all.stage || all.sector || all.oneLiner || all.problem || all.whatBuilt || all.lookingFor)
        goToStep(1)
      else if (all.videoUrl) goToStep(2)
      return
    }

    setStatus('submitting')
    window.setTimeout(() => {
      const result = addFounderApplication({
        userId: `usr_${form.email.split('@')[0]}`,
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        district: form.district as District,
        ventureName: form.ventureName.trim() || null,
        stage: form.stage as FounderStage,
        sector: form.sector as Sector,
        oneLiner: form.oneLiner.trim(),
        problem: form.problem.trim(),
        whatBuilt: form.whatBuilt.trim(),
        teamSize: Number(form.teamSize) || 1,
        lookingFor: form.lookingFor,
        capitalContext: form.capitalContext.trim(),
        links: form.links.trim(),
        videoUrl: form.videoUrl,
        videoDuration: form.videoDuration,
        consentShareWithMentors: form.consentShareWithMentors,
        consentDataProcessing: form.consentDataProcessing,
        consentCampaignUpdates: form.consentCampaignUpdates,
      })
      signIn({
        email: form.email,
        fullName: form.fullName,
        phone: form.phone,
        role: 'founder',
        district: form.district as District,
      })
      setStatus(result.ok ? 'success' : 'already')
      window.scrollTo({ top: 0 })
    }, 1600)
  }, [form, validateStep, goToStep, addFounderApplication, signIn, t])

  const stepValid = useMemo(() => {
    if (step <= 2) return Object.keys(validateStep(step)).length === 0
    return true
  }, [step, validateStep])

  // ---- terminal states -----------------------------------------------------
  if (status === 'submitting') {
    return (
      <ApplyShell>
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <span className="relative flex h-16 w-16 items-center justify-center">
            <span className="absolute inset-0 rounded-full bg-accent-soft" />
            <Loader2 className="relative h-7 w-7 animate-spin text-accent" aria-hidden="true" />
          </span>
          <h1 className="mt-6 font-display text-2xl font-semibold tracking-tight text-ink">
            {t('apply.submitting')}
          </h1>
          <p className="mt-2 text-sm text-muted">{t('apply.submittingSub')}</p>
        </div>
      </ApplyShell>
    )
  }

  if (status === 'success') {
    return (
      <ApplyShell>
        <ApplicationSuccess
          title={t('apply.founderSuccessTitle')}
          message={t('apply.founderSuccessMsg')}
          primaryHref="/dashboard"
          primaryLabel={t('apply.viewApplication')}
        />
      </ApplyShell>
    )
  }

  if (status === 'already') {
    return (
      <ApplyShell>
        <ApplicationSuccess
          title={t('apply.founderAlreadyTitle')}
          message={t('apply.founderAlreadyMsg')}
          primaryHref="/dashboard"
          primaryLabel={t('apply.viewApplication')}
        />
      </ApplyShell>
    )
  }

  // ---- wizard ---------------------------------------------------------------
  return (
    <ApplicationLayout steps={STEPS} currentStep={step} maxReached={maxReached} goToStep={goToStep}>
      {step === 0 && (
        <div className="animate-fade-up">
          <StepHeading eyebrow={t('apply.f1Eyebrow')} title={t('apply.f1Title')} subtitle={t('apply.f1Subtitle')} />
          <div className="space-y-5">
            <FormInput label={t('apply.fullName')} name="fullName" required value={form.fullName} error={errors.fullName} onChange={(e) => set('fullName', e.target.value)} />
            <FormInput label={t('apply.email')} name="email" type="email" required value={form.email} error={errors.email} onChange={(e) => set('email', e.target.value)} />
            <FormInput label={t('apply.phoneWa')} name="phone" type="tel" required value={form.phone} error={errors.phone} onChange={(e) => set('phone', e.target.value)} />
            <SelectField label={t('apply.rDistrict')} name="district" required options={districts} value={form.district} onChange={(v) => set('district', v as District)} error={errors.district} />
          </div>
          <div className="mt-8 flex justify-end">
            <Button onClick={handleNext} fullWidthOnMobile>
              {t('apply.continue')} <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="animate-fade-up">
          <StepHeading eyebrow={t('apply.f2Eyebrow')} title={t('apply.f2Title')} subtitle={t('apply.f2Subtitle')} />
          <div className="space-y-6">
            <FormInput label={t('apply.fVenture')} name="ventureName" hint={t('apply.fVentureHint')} value={form.ventureName} onChange={(e) => set('ventureName', e.target.value)} />
            <SelectField label={t('apply.fStage')} name="stage" required options={stages} value={form.stage} onChange={(v) => set('stage', v as FounderStage)} error={errors.stage} />
            <SelectField label={t('apply.fSector')} name="sector" required options={sectors} value={form.sector} onChange={(v) => set('sector', v as Sector)} error={errors.sector} />
            <FormInput label={t('apply.fOneLiner')} name="oneLiner" required hint={`${form.oneLiner.length}/140`} maxLength={140} value={form.oneLiner} error={errors.oneLiner} onChange={(e) => set('oneLiner', e.target.value)} />
            <FormTextarea label={t('apply.fProblem')} name="problem" required showCount rows={4} value={form.problem} error={errors.problem} onChange={(e) => set('problem', e.target.value)} />
            <FormTextarea label={t('apply.fWhatBuilt')} name="whatBuilt" required showCount rows={4} value={form.whatBuilt} error={errors.whatBuilt} onChange={(e) => set('whatBuilt', e.target.value)} />
            <FormInput label={t('apply.fTeamSize')} name="teamSize" type="number" min={1} hint={t('apply.fTeamSizeHint')} value={form.teamSize} onChange={(e) => set('teamSize', e.target.value)} />
            <MultiSelectField label={t('apply.fLookingFor')} name="lookingFor" required options={lookingFor} values={form.lookingFor} onChange={(v) => set('lookingFor', v as LookingFor[])} error={errors.lookingFor} />
            <FormTextarea label={t('apply.fCapital')} name="capitalContext" hint={t('apply.fCapitalHint')} rows={3} value={form.capitalContext} onChange={(e) => set('capitalContext', e.target.value)} />
            <FormInput label={t('apply.fLinks')} name="links" hint={t('apply.fLinksHint')} value={form.links} onChange={(e) => set('links', e.target.value)} />
          </div>
          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
            <Button variant="secondary" onClick={() => goToStep(0)} fullWidthOnMobile>
              <ArrowLeft className="h-4 w-4" aria-hidden="true" /> {t('apply.back')}
            </Button>
            <Button onClick={handleNext} fullWidthOnMobile>
              {t('apply.continue')} <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="animate-fade-up">
          <StepHeading eyebrow={t('apply.f3Eyebrow')} title={t('apply.f3Title')} subtitle={t('apply.f3Subtitle')} />

          <div className="rounded-2xl border border-line bg-surface p-5 shadow-card">
            <div className="mb-4 flex items-start gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-accent-soft text-accent">
                <Video className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-medium text-ink">{t('apply.videoCardTitle')}</p>
                <p className="mt-0.5 text-xs text-muted">{t('apply.videoCardDesc')}</p>
              </div>
            </div>

            <FormInput
              label={t('apply.videoLabel')}
              name="videoUrl"
              type="url"
              required
              placeholder="https://youtube.com/watch?v=..."
              hint={t('apply.videoHint')}
              value={form.videoUrl ?? ''}
              error={errors.videoUrl}
              onChange={(e) => set('videoUrl', e.target.value)}
            />

            {form.videoUrl && /^https?:\/\/.+/i.test(form.videoUrl.trim()) && (
              <a
                href={form.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-ink"
              >
                <Video className="h-4 w-4" aria-hidden="true" />
                {t('apply.videoPreview')}
              </a>
            )}
          </div>

          {/* Optional pitch deck (dummy — filename only, no real upload yet) */}
          {/* <div className="mt-6 rounded-2xl border border-line bg-surface p-4">
            <p className="text-sm font-medium text-ink">{t('apply.deckTitle')}</p>
            <p className="mt-0.5 text-xs text-muted">{t('apply.deckDesc')}</p>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-line bg-canvas px-4 py-2.5 text-sm font-medium text-ink transition hover:border-ink/40">
                <Upload className="h-4 w-4" aria-hidden="true" />
                {form.pitchDeckName ? t('apply.deckReplace') : t('apply.deckChoose')}
                <input
                  type="file"
                  accept=".pdf,.ppt,.pptx,.key"
                  className="sr-only"
                  onChange={(e) => set('pitchDeckName', e.target.files?.[0]?.name ?? '')}
                />
              </label>
              {form.pitchDeckName && <span className="text-sm text-muted">{form.pitchDeckName}</span>}
            </div>
          </div> */}

          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
            <Button variant="secondary" onClick={() => goToStep(1)} fullWidthOnMobile>
              <ArrowLeft className="h-4 w-4" aria-hidden="true" /> {t('apply.back')}
            </Button>
            <Button onClick={handleNext} fullWidthOnMobile>
              {t('apply.continue')} <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="animate-fade-up">
          <StepHeading eyebrow={t('apply.f4Eyebrow')} title={t('apply.f4Title')} subtitle={t('apply.f4Subtitle')} />

          <div className="space-y-4">
            <ReviewCard title={t('apply.reviewAbout')} onEdit={() => goToStep(0)} editLabel={t('apply.reviewEdit')}>
              <Row label={t('apply.rName')} value={form.fullName} />
              <Row label={t('apply.rEmail')} value={form.email} />
              <Row label={t('apply.rPhone')} value={form.phone} />
              <Row label={t('apply.rDistrict')} value={districts.find((d) => d.value === form.district)?.label} />
            </ReviewCard>
            <ReviewCard title={t('apply.reviewIdea')} onEdit={() => goToStep(1)} editLabel={t('apply.reviewEdit')}>
              <Row label={t('apply.rVenture')} value={form.ventureName || t('apply.justAnIdea')} />
              <Row label={t('apply.rStage')} value={stages.find((s) => s.value === form.stage)?.label} />
              <Row label={t('apply.rSector')} value={sectors.find((s) => s.value === form.sector)?.label} />
              <Row label={t('apply.rSummary')} value={form.oneLiner} block />
              <Row label={t('apply.rSupport')} value={form.lookingFor.map((l) => lookingFor.find((o) => o.value === l)?.label).join(', ')} />
            </ReviewCard>
            <ReviewCard title={t('apply.reviewStory')} onEdit={() => goToStep(2)} editLabel={t('apply.reviewEdit')}>
              {form.videoUrl ? (
                <a href={form.videoUrl} target="_blank" rel="noopener noreferrer" className="break-all text-sm font-medium text-accent hover:text-ink">
                  {form.videoUrl}
                </a>
              ) : (
                <p className="text-sm italic text-muted/70">{t('apply.noVideoLink')}</p>
              )}
            </ReviewCard>
          </div>

          <div className="mt-6 space-y-3">
            <CheckboxConsent name="c_data" checked={form.consentDataProcessing} onChange={(v) => set('consentDataProcessing', v)} error={errors.consentDataProcessing}>
              {t('apply.consentData')}
            </CheckboxConsent>
            <CheckboxConsent name="c_share" checked={form.consentShareWithMentors} onChange={(v) => set('consentShareWithMentors', v)}>
              {t('apply.consentShare')}
            </CheckboxConsent>
            <CheckboxConsent name="c_campaign" checked={form.consentCampaignUpdates} onChange={(v) => set('consentCampaignUpdates', v)}>
              {t('apply.consentCampaign')}
            </CheckboxConsent>
          </div>
          {errors.consentDataProcessing && <FormError message={errors.consentDataProcessing} />}

          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
            <Button variant="secondary" onClick={() => goToStep(2)} fullWidthOnMobile>
              <ArrowLeft className="h-4 w-4" aria-hidden="true" /> {t('apply.back')}
            </Button>
            <Button onClick={handleSubmit} fullWidthOnMobile>
              {t('apply.submitApp')} <Send className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      )}
      <span className="hidden" aria-hidden data-valid={stepValid} />
    </ApplicationLayout>
  )
}

function ReviewCard({
  title,
  onEdit,
  editLabel = 'Edit',
  children,
}: {
  title: string
  onEdit: () => void
  editLabel?: string
  children: React.ReactNode
}) {
  return (
    <section className="rounded-2xl border border-line bg-surface p-5 shadow-card">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-muted">{title}</h2>
        <button type="button" onClick={onEdit} className="text-xs font-medium text-accent transition hover:text-ink">
          {editLabel}
        </button>
      </div>
      <div className="space-y-3">{children}</div>
    </section>
  )
}

function Row({ label, value, block = false }: { label: string; value?: string; block?: boolean }) {
  const empty = !value || !value.trim()
  if (block) {
    return (
      <div>
        <p className="text-xs text-muted">{label}</p>
        <p className={`mt-1 whitespace-pre-wrap text-sm leading-relaxed ${empty ? 'italic text-muted/60' : 'text-ink'}`}>
          {empty ? '—' : value}
        </p>
      </div>
    )
  }
  return (
    <div className="flex items-baseline justify-between gap-4">
      <p className="shrink-0 text-xs text-muted">{label}</p>
      <p className={`text-right text-sm ${empty ? 'italic text-muted/60' : 'text-ink'}`}>
        {empty ? '—' : value}
      </p>
    </div>
  )
}
