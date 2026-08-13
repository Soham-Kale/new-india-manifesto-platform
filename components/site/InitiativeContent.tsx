'use client'

import Link from 'next/link'
import {
  ArrowRight,
  Rocket,
  Users,
  Landmark,
  GraduationCap,
  RefreshCw,
  ShieldCheck,
  Target,
} from 'lucide-react'
import { useT } from '@/lib/i18n'

const ROLES = [
  { icon: Rocket, key: 'roleFounder', href: '/apply/founder' },
  { icon: Users, key: 'roleMentor', href: '/apply/mentor' },
  { icon: Landmark, key: 'roleInvestor', href: '/apply/investor' },
  { icon: GraduationCap, key: 'roleExpert', href: '/apply/expert' },
] as const

const PILLARS = [
  { icon: RefreshCw, key: 'pillar1' },
  { icon: ShieldCheck, key: 'pillar2' },
  { icon: Target, key: 'pillar3' },
] as const

export default function InitiativeContent() {
  const { t } = useT()
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line bg-night text-canvas">
        <div className="bg-night-aura">
          <div className="mx-auto max-w-5xl px-5 py-20 text-center sm:px-8 lg:py-28">
            <p className="flex items-center justify-center gap-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              <span className="h-px w-7 bg-gold/60" aria-hidden="true" />
              {t('initiative.heroEyebrow')}
              <span className="h-px w-7 bg-gold/60" aria-hidden="true" />
            </p>
            <h1 className="mx-auto mt-5 max-w-3xl font-display text-4xl font-bold uppercase leading-[1.02] tracking-tight sm:text-6xl">
              {t('initiative.heroTitle')}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-canvas/70">{t('initiative.heroSubcopy')}</p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Link
                href="/apply/founder"
                className="group inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-sm font-medium text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-glow"
              >
                {t('initiative.ctaApply')}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
              <Link
                href="/pledge"
                className="inline-flex items-center gap-2 rounded-xl border border-canvas/25 px-6 py-3.5 text-sm font-medium text-canvas transition hover:border-canvas/50 hover:bg-canvas/5"
              >
                {t('initiative.ctaPledge')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How it works — pillars */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              {t('initiative.progEyebrow')}
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              {t('initiative.progTitle')}
            </h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {PILLARS.map(({ icon: Icon, key }) => (
              <div key={key} className="rounded-2xl border border-line bg-surface p-6 shadow-sm">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-medium text-ink">{t(`initiative.${key}Title`)}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{t(`initiative.${key}Desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Role lanes */}
      <section className="border-b border-line bg-surface/60">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              {t('initiative.lanesEyebrow')}
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              {t('initiative.lanesTitle')}
            </h2>
            <p className="mt-3 text-muted">{t('initiative.lanesSubcopy')}</p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {ROLES.map(({ icon: Icon, key, href }) => (
              <Link
                key={key}
                href={href}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-surface p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/30 hover:shadow-lift"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-linear-to-r from-accent to-gold transition-transform duration-300 group-hover:scale-x-100"
                />
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-soft text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-medium text-ink">{t(`initiative.${key}Title`)}</h3>
                <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted">{t(`initiative.${key}Desc`)}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition group-hover:gap-2.5">
                  {t('initiative.roleApply')}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
