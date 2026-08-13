'use client'

import { Check } from 'lucide-react'
import { useT } from '@/lib/i18n'

const CHAPTER_KEYS = ['ch1', 'ch2', 'ch3', 'ch4', 'ch5', 'ch6', 'ch7', 'ch8', 'ch9', 'ch10'] as const

export default function BookIntro() {
  const { t } = useT()
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">{t('book.eyebrow')}</p>
      <h1 className="mt-3 font-display text-4xl font-bold uppercase leading-[1.02] tracking-tight text-ink sm:text-5xl">
        {t('book.title')}
      </h1>
      <p className="mt-2 text-lg text-muted">{t('book.subtitle')}</p>

      <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-muted">{t('book.synopsis')}</p>

      <div className="mt-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
          {t('book.chaptersHeading')}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {CHAPTER_KEYS.map((k) => (
            <span
              key={k}
              className="rounded-full border border-line bg-surface px-3 py-1.5 text-xs text-ink"
            >
              {t(`book.${k}`)}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-8 flex items-center gap-2 rounded-xl border border-accent/20 bg-accent-soft/60 px-4 py-3 text-sm text-ink">
        <Check className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
        {t('book.note')}
      </div>
    </div>
  )
}
