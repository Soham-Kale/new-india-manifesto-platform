'use client'

import Link from 'next/link'
import { CheckCircle2, Clock, FileText } from 'lucide-react'
import { useMockAuth } from '@/lib/MockAuthProvider'
import { useMockData } from '@/lib/MockDataProvider'
import { toPublicStatus, PUBLIC_STATUS_LABEL, labelStage, labelSector } from '@/lib/options'
import Button from '@/components/ui/Button'

export default function DashboardPage() {
  const { currentUser, ready } = useMockAuth()
  const { findFounderByEmail, ready: dataReady } = useMockData()

  if (!ready || !dataReady) {
    return <div className="mx-auto max-w-2xl px-5 py-24 text-center text-muted">Loading…</div>
  }

  const application = currentUser ? findFounderByEmail(currentUser.email) : undefined

  if (!application) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-20 text-center sm:px-8">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-soft text-accent">
          <FileText className="h-6 w-6" aria-hidden="true" />
        </span>
        <h1 className="mt-5 font-serif text-3xl font-medium tracking-tight text-ink">
          No application yet
        </h1>
        <p className="mt-3 text-muted">
          Once you apply to be incubated, you&apos;ll be able to track your application status here.
        </p>
        <Link
          href="/apply/founder"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-ink px-6 py-3.5 text-sm font-medium text-canvas transition hover:bg-accent"
        >
          Apply to be incubated
        </Link>
      </div>
    )
  }

  // Applicant only ever sees Received → Under review (never internal decisions).
  const publicStatus = toPublicStatus(application.internalStatus)
  const stages = [
    { key: 'received', label: 'Received', icon: CheckCircle2 },
    { key: 'under_review', label: 'Under review', icon: Clock },
  ] as const

  return (
    <div className="mx-auto max-w-2xl px-5 py-14 sm:px-8 lg:py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Your application</p>
      <h1 className="mt-3 font-serif text-3xl font-medium tracking-tight text-ink sm:text-4xl">
        {application.ventureName || 'Your idea'}
      </h1>
      <p className="mt-2 text-muted">
        {labelStage(application.stage)} · {labelSector(application.sector)}
      </p>

      {/* Status track */}
      <div className="mt-8 rounded-2xl border border-line bg-surface p-6 shadow-card">
        <p className="text-sm font-medium text-ink">Status</p>
        <div className="mt-5 space-y-4">
          {stages.map((s) => {
            const reached =
              s.key === 'received' || (s.key === 'under_review' && publicStatus === 'under_review')
            const Icon = s.icon
            return (
              <div key={s.key} className="flex items-center gap-3">
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-full ${
                    reached ? 'bg-success/10 text-success' : 'bg-line text-muted'
                  }`}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className={`text-sm font-medium ${reached ? 'text-ink' : 'text-muted'}`}>
                    {s.label}
                  </p>
                  {reached && publicStatus === s.key && (
                    <p className="text-xs text-muted">Current status</p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
        <div className="mt-6 rounded-xl bg-accent-soft/60 px-4 py-3 text-sm text-ink">
          {PUBLIC_STATUS_LABEL[publicStatus] === 'Received'
            ? "We've received your application and you're on the waitlist. We'll reach out if there's a fit."
            : "Your application is under review. We'll be in touch — thank you for your patience."}
        </div>
      </div>

      <p className="mt-6 text-center text-xs text-muted">
        Submitted {new Date(application.createdAt).toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })}
      </p>
    </div>
  )
}
