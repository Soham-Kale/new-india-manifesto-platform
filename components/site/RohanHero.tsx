'use client'

import { useT } from '@/lib/i18n'

export default function RohanHero() {
  const { t } = useT()
  return (
    <div className="border-b border-line bg-surface/60">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 lg:py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          {t('rohan.eyebrow')}
        </p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold uppercase leading-[1.02] tracking-tight text-ink sm:text-5xl">
          {t('rohan.title')}
        </h1>
        <p className="mt-4 max-w-2xl text-muted">{t('rohan.subcopy')}</p>
      </div>
    </div>
  )
}
