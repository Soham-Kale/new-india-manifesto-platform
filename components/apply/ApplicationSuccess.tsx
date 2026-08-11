'use client'

import Link from 'next/link'
import { Check } from 'lucide-react'
import { useT } from '@/lib/i18n'

interface Props {
  title: string
  message: string
  primaryHref?: string
  primaryLabel?: string
}

export default function ApplicationSuccess({ title, message, primaryHref = '/', primaryLabel }: Props) {
  const { t } = useT()
  const label = primaryLabel ?? t('apply.backHome')
  return (
    <div className="animate-fade-up py-10 text-center">
      <div className="mx-auto mb-6 flex h-16 w-16 animate-scale-in items-center justify-center rounded-full bg-success/10">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-success text-white">
          <Check className="h-6 w-6" strokeWidth={2.5} aria-hidden="true" />
        </span>
      </div>
      <h1 className="font-display text-3xl font-semibold uppercase tracking-tight text-ink">{title}</h1>
      <p className="mx-auto mt-3 max-w-md text-balance text-sm leading-relaxed text-muted sm:text-base">
        {message}
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Link
          href={primaryHref}
          className="inline-flex items-center gap-2 rounded-xl bg-ink px-5 py-3 text-sm font-medium text-canvas transition hover:bg-accent"
        >
          {label}
        </Link>
      </div>
    </div>
  )
}
