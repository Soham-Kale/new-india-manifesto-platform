'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { CheckCircle2, Clock, FileText } from 'lucide-react'
import { useMockAuth } from '@/lib/MockAuthProvider'
import { useMockData } from '@/lib/MockDataProvider'
import { api, apiEnabled } from '@/lib/api'
import { toPublicStatus, PUBLIC_STATUS_LABEL, labelStage, labelSector } from '@/lib/options'
import type { FounderStage, Sector } from '@/lib/types'

type StatusView = {
  ventureName: string | null
  stage: FounderStage
  sector: Sector
  publicStatus: 'received' | 'under_review'
  createdAt: string
} | null

export default function DashboardPage() {
  const { currentUser, token, ready } = useMockAuth()
  const { findFounderByEmail, ready: dataReady } = useMockData()

  // Prefer the real backend (cross-device) when a JWT session exists.
  const useBackend = apiEnabled() && !!token
  const [loading, setLoading] = useState(useBackend)
  const [backendApp, setBackendApp] = useState<StatusView>(null)

  useEffect(() => {
    let active = true
    if (useBackend && token) {
      setLoading(true)
      api.founderStatus(token).then((res) => {
        if (!active) return
        setBackendApp((res.data as StatusView) ?? null)
        setLoading(false)
      })
    }
    return () => {
      active = false
    }
  }, [useBackend, token])

  if (!ready || (!useBackend && !dataReady) || (useBackend && loading)) {
    return <div className="mx-auto max-w-2xl px-5 py-24 text-center text-muted">Loading…</div>
  }

  // Resolve the application view from whichever source is active.
  let view: StatusView = null
  if (useBackend) {
    view = backendApp
  } else {
    const app = currentUser ? findFounderByEmail(currentUser.email) : undefined
    if (app) {
      view = {
        ventureName: app.ventureName,
        stage: app.stage,
        sector: app.sector,
        publicStatus: toPublicStatus(app.internalStatus),
        createdAt: app.createdAt,
      }
    }
  }

  if (!view) {
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
  const publicStatus = view.publicStatus
  const stages = [
    { key: 'received', label: 'Received', icon: CheckCircle2 },
    { key: 'under_review', label: 'Under review', icon: Clock },
  ] as const

  return (
    <div className="mx-auto max-w-2xl px-5 py-14 sm:px-8 lg:py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Your application</p>
      <h1 className="mt-3 font-serif text-3xl font-medium tracking-tight text-ink sm:text-4xl">
        {view.ventureName || 'Your idea'}
      </h1>
      <p className="mt-2 text-muted">
        {labelStage(view.stage)} · {labelSector(view.sector)}
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
        Submitted {new Date(view.createdAt).toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })}
      </p>
    </div>
  )
}
