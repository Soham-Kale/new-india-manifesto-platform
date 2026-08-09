'use client'

import { useCallback, useMemo, useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  Loader2,
  RotateCcw,
  Upload,
  Video,
  Send,
} from 'lucide-react'
import type { District, FounderStage, Sector, LookingFor } from '@/lib/types'
import { DISTRICTS, FOUNDER_STAGES, SECTORS, LOOKING_FOR } from '@/lib/options'
import { useMockData } from '@/lib/MockDataProvider'
import { useMockAuth } from '@/lib/MockAuthProvider'
import { isEmail, isPhone, req, minLen } from '@/lib/validation'
import ApplicationLayout from './ApplicationLayout'
import ApplyShell from './ApplyShell'
import ApplicationSuccess from './ApplicationSuccess'
import { FOUNDER_STEPS } from './wizardSteps'
import VideoRecorder from './VideoRecorder'
import VideoUploader from './VideoUploader'
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
  videoUrl: null,
  videoDuration: null,
  consentShareWithMentors: false,
  consentDataProcessing: false,
  consentCampaignUpdates: false,
}

type Errors = Partial<Record<keyof Form, string>>
type VideoMode = 'idle' | 'record' | 'upload'
type Status = 'filling' | 'submitting' | 'success' | 'already'

export default function FounderWizard() {
  const { addFounderApplication } = useMockData()
  const { signIn } = useMockAuth()

  const [form, setForm] = useState<Form>(INITIAL)
  const [step, setStep] = useState(0)
  const [maxReached, setMaxReached] = useState(0)
  const [errors, setErrors] = useState<Errors>({})
  const [videoMode, setVideoMode] = useState<VideoMode>('idle')
  const [status, setStatus] = useState<Status>('filling')

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
        if (!req(form.fullName)) e.fullName = 'Please enter your full name.'
        if (!isEmail(form.email)) e.email = 'Enter a valid email.'
        if (!isPhone(form.phone)) e.phone = 'Enter a valid phone number.'
        if (!form.district) e.district = 'Please select your district.'
      }
      if (i === 1) {
        if (!form.stage) e.stage = 'Select your stage.'
        if (!form.sector) e.sector = 'Select a sector.'
        if (!req(form.oneLiner)) e.oneLiner = 'A one-line summary is required.'
        else if (form.oneLiner.length > 140) e.oneLiner = 'Keep it under 140 characters.'
        if (!minLen(form.problem, 20)) e.problem = 'Please add a little more detail (20+ characters).'
        if (!minLen(form.whatBuilt, 20)) e.whatBuilt = 'Please add a little more detail (20+ characters).'
        if (form.lookingFor.length === 0) e.lookingFor = 'Choose at least one kind of support.'
      }
      return e
    },
    [form],
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
    // Final guard across steps.
    const all = { ...validateStep(0), ...validateStep(1) }
    if (!form.consentDataProcessing) all.consentDataProcessing = 'This consent is required to submit.'
    if (Object.keys(all).length > 0) {
      setErrors(all)
      if (all.fullName || all.email || all.phone || all.district) goToStep(0)
      else if (all.stage || all.sector || all.oneLiner || all.problem || all.whatBuilt || all.lookingFor)
        goToStep(1)
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
        links: '',
        videoUrl: form.videoUrl,
        videoDuration: form.videoDuration,
        consentShareWithMentors: form.consentShareWithMentors,
        consentDataProcessing: form.consentDataProcessing,
        consentCampaignUpdates: form.consentCampaignUpdates,
      })
      // Sign the applicant in (fake) so /dashboard resolves to their status.
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
  }, [form, validateStep, goToStep, addFounderApplication, signIn])

  const stepValid = useMemo(() => {
    if (step === 0 || step === 1) return Object.keys(validateStep(step)).length === 0
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
          <h1 className="mt-6 font-serif text-2xl font-medium tracking-tight text-ink">
            Submitting your application…
          </h1>
          <p className="mt-2 text-sm text-muted">Just a moment while we send everything over.</p>
        </div>
      </ApplyShell>
    )
  }

  if (status === 'success') {
    return (
      <ApplyShell>
        <ApplicationSuccess
          title="Welcome to the movement."
          message="Thank you for sharing your story. Your application has reached Team Rohan Deshmukh — you're on the waitlist and we'll reach out if there's a fit."
          primaryHref="/dashboard"
          primaryLabel="View my application"
        />
      </ApplyShell>
    )
  }

  if (status === 'already') {
    return (
      <ApplyShell>
        <ApplicationSuccess
          title="You've already applied."
          message="An application already exists for this email. It's on the waitlist — we'll reach out if there's a fit. You can check its status anytime."
          primaryHref="/dashboard"
          primaryLabel="View my application"
        />
      </ApplyShell>
    )
  }

  const hasVideo = !!form.videoUrl

  // ---- wizard ---------------------------------------------------------------
  return (
    <ApplicationLayout
      steps={FOUNDER_STEPS}
      currentStep={step}
      maxReached={maxReached}
      goToStep={goToStep}
    >
      {step === 0 && (
        <div className="animate-fade-up">
          <StepHeading
            eyebrow="Step 01 · About you"
            title="Tell us about yourself"
            subtitle="A few quick details so we know who we're speaking with."
          />
          <div className="space-y-5">
            <FormInput label="Full name" name="fullName" required value={form.fullName} error={errors.fullName} onChange={(e) => set('fullName', e.target.value)} />
            <FormInput label="Email" name="email" type="email" required value={form.email} error={errors.email} onChange={(e) => set('email', e.target.value)} />
            <FormInput label="Phone / WhatsApp" name="phone" type="tel" required value={form.phone} error={errors.phone} onChange={(e) => set('phone', e.target.value)} />
            <SelectField label="District" name="district" required options={DISTRICTS} value={form.district} onChange={(v) => set('district', v as District)} error={errors.district} />
          </div>
          <div className="mt-8 flex justify-end">
            <Button onClick={handleNext} fullWidthOnMobile>
              Continue <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="animate-fade-up">
          <StepHeading
            eyebrow="Step 02 · Your idea"
            title="Tell us about your idea"
            subtitle="What are you building and what problem are you solving in your community?"
          />
          <div className="space-y-6">
            <FormInput label="Venture / idea name" name="ventureName" hint="Leave blank if it's just an idea for now." value={form.ventureName} onChange={(e) => set('ventureName', e.target.value)} />
            <SelectField label="Stage" name="stage" required options={FOUNDER_STAGES} value={form.stage} onChange={(v) => set('stage', v as FounderStage)} error={errors.stage} />
            <SelectField label="Sector" name="sector" required options={SECTORS} value={form.sector} onChange={(v) => set('sector', v as Sector)} error={errors.sector} />
            <FormInput label="One-line summary" name="oneLiner" required hint={`${form.oneLiner.length}/140 characters`} maxLength={140} value={form.oneLiner} error={errors.oneLiner} onChange={(e) => set('oneLiner', e.target.value)} />
            <FormTextarea label="What problem are you solving for your community?" name="problem" required showCount rows={4} value={form.problem} error={errors.problem} onChange={(e) => set('problem', e.target.value)} />
            <FormTextarea label="What have you built, or what do you want to build?" name="whatBuilt" required showCount rows={4} value={form.whatBuilt} error={errors.whatBuilt} onChange={(e) => set('whatBuilt', e.target.value)} />
            <FormInput label="Team size" name="teamSize" type="number" min={1} hint="Roughly how many people are working on this?" value={form.teamSize} onChange={(e) => set('teamSize', e.target.value)} />
            <MultiSelectField label="What support are you looking for?" name="lookingFor" required options={LOOKING_FOR} values={form.lookingFor} onChange={(v) => set('lookingFor', v as LookingFor[])} error={errors.lookingFor} />
            <FormTextarea label="What would you use that support for?" name="capitalContext" hint="Not an amount — just what support would help you do next." rows={3} value={form.capitalContext} onChange={(e) => set('capitalContext', e.target.value)} />
          </div>
          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
            <Button variant="secondary" onClick={() => goToStep(0)} fullWidthOnMobile>
              <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back
            </Button>
            <Button onClick={handleNext} fullWidthOnMobile>
              Continue <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="animate-fade-up">
          <StepHeading
            eyebrow="Step 03 · Your story"
            title="Tell us your story (optional)"
            subtitle="A short 60-second video helps us understand you and your vision. You can skip this."
          />

          {videoMode === 'record' && (
            <VideoRecorder
              onUse={(_f, url, dur) => {
                set('videoUrl', url)
                set('videoDuration', dur)
                setVideoMode('idle')
              }}
              onCancel={() => setVideoMode('idle')}
            />
          )}
          {videoMode === 'upload' && (
            <VideoUploader
              onSelect={(_f, url, dur) => {
                set('videoUrl', url)
                set('videoDuration', dur)
                setVideoMode('idle')
              }}
              onCancel={() => setVideoMode('idle')}
            />
          )}

          {videoMode === 'idle' && !hasVideo && (
            <div className="group rounded-2xl border-2 border-dashed border-line bg-surface/60 px-6 py-14 text-center transition-colors duration-300 hover:border-accent/40 hover:bg-accent-soft/20">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-soft text-accent">
                <Video className="h-7 w-7" aria-hidden="true" />
              </div>
              <p className="text-base font-medium text-ink">Record a video</p>
              <p className="mt-1 text-sm text-muted">Up to 60 seconds</p>
              <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                <Button onClick={() => setVideoMode('record')} fullWidthOnMobile>
                  <Camera className="h-4 w-4" aria-hidden="true" /> Record Video
                </Button>
                <Button variant="secondary" onClick={() => setVideoMode('upload')} fullWidthOnMobile>
                  <Upload className="h-4 w-4" aria-hidden="true" /> Upload Video
                </Button>
              </div>
            </div>
          )}

          {videoMode === 'idle' && hasVideo && (
            <div className="animate-fade-in overflow-hidden rounded-2xl border border-line bg-surface shadow-card">
              <video src={form.videoUrl!} controls playsInline className="aspect-video w-full bg-black object-cover" />
              <div className="flex flex-wrap items-center justify-between gap-3 p-4">
                <p className="text-sm text-muted">
                  {form.videoDuration ? `${form.videoDuration}s · ` : ''}Ready
                </p>
                <div className="flex gap-3">
                  <Button variant="secondary" onClick={() => setVideoMode('record')}>
                    <RotateCcw className="h-4 w-4" aria-hidden="true" /> Record Again
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      set('videoUrl', null)
                      set('videoDuration', null)
                    }}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
            <Button variant="secondary" onClick={() => goToStep(1)} fullWidthOnMobile>
              <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back
            </Button>
            <Button onClick={() => goToStep(3)} fullWidthOnMobile>
              {hasVideo ? 'Continue' : 'Skip for now'}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="animate-fade-up">
          <StepHeading
            eyebrow="Step 04 · Review"
            title="Review & submit"
            subtitle="Check your details, agree to the consents, and send your application."
          />

          <div className="space-y-4">
            <ReviewCard title="About you" onEdit={() => goToStep(0)}>
              <Row label="Name" value={form.fullName} />
              <Row label="Email" value={form.email} />
              <Row label="Phone" value={form.phone} />
              <Row label="District" value={DISTRICTS.find((d) => d.value === form.district)?.label} />
            </ReviewCard>
            <ReviewCard title="Your idea" onEdit={() => goToStep(1)}>
              <Row label="Venture" value={form.ventureName || 'Just an idea'} />
              <Row label="Stage" value={FOUNDER_STAGES.find((s) => s.value === form.stage)?.label} />
              <Row label="Sector" value={SECTORS.find((s) => s.value === form.sector)?.label} />
              <Row label="Summary" value={form.oneLiner} block />
              <Row label="Support" value={form.lookingFor.map((l) => LOOKING_FOR.find((o) => o.value === l)?.label).join(', ')} />
            </ReviewCard>
            <ReviewCard title="Your story" onEdit={() => goToStep(2)} editLabel={hasVideo ? 'Replace' : 'Add video'}>
              {hasVideo ? (
                <video src={form.videoUrl!} controls playsInline className="aspect-video w-full rounded-xl bg-black object-cover sm:w-64" />
              ) : (
                <p className="text-sm italic text-muted/70">No video added (optional)</p>
              )}
            </ReviewCard>
          </div>

          <div className="mt-6 space-y-3">
            <CheckboxConsent name="c_data" checked={form.consentDataProcessing} onChange={(v) => set('consentDataProcessing', v)} error={errors.consentDataProcessing}>
              I agree to my application being processed for the incubation programme. (Required — DPDP consent.)
            </CheckboxConsent>
            <CheckboxConsent name="c_share" checked={form.consentShareWithMentors} onChange={(v) => set('consentShareWithMentors', v)}>
              Share my application with relevant mentors and vetted investors. (Optional — contact details are only revealed after an admin approves a match.)
            </CheckboxConsent>
            <CheckboxConsent name="c_campaign" checked={form.consentCampaignUpdates} onChange={(v) => set('consentCampaignUpdates', v)}>
              Send me campaign updates about the New India movement. (Optional.)
            </CheckboxConsent>
          </div>
          {errors.consentDataProcessing && <FormError message={errors.consentDataProcessing} />}

          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
            <Button variant="secondary" onClick={() => goToStep(2)} fullWidthOnMobile>
              <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back
            </Button>
            <Button onClick={handleSubmit} fullWidthOnMobile>
              Submit application <Send className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      )}
      {/* stepValid is derived for potential future disabling; referenced to avoid unused warnings */}
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
          {empty ? 'Not provided' : value}
        </p>
      </div>
    )
  }
  return (
    <div className="flex items-baseline justify-between gap-4">
      <p className="shrink-0 text-xs text-muted">{label}</p>
      <p className={`text-right text-sm ${empty ? 'italic text-muted/60' : 'text-ink'}`}>
        {empty ? 'Not provided' : value}
      </p>
    </div>
  )
}
