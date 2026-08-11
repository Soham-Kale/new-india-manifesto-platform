'use client'

import type { ReactNode } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useT } from '@/lib/i18n'
import LangToggle from '@/components/site/LangToggle'

export default function ApplyShell({ children }: { children: ReactNode }) {
  const { t } = useT()
  return (
    <div className="flex min-h-screen flex-col bg-canvas">
      <header className="sticky top-0 z-20 border-b border-line bg-canvas/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-3.5 sm:px-8">
          <Link href="/" className="flex flex-col leading-none">
            <span className="font-display text-base font-bold tracking-tight text-ink">
              {t('home.hero.author')}
            </span>
            <span className="mt-0.5 text-[10px] uppercase tracking-[0.18em] text-accent">
              {t('nav.manifesto')}
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <LangToggle />
            <Link
              href="/"
              className="flex items-center gap-1.5 text-sm text-muted transition hover:text-ink"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              {t('apply.home')}
            </Link>
          </div>
        </div>
      </header>
      <main className="flex flex-1 flex-col">
        <div className="mx-auto w-full max-w-2xl px-5 py-10 sm:px-8 sm:py-14">{children}</div>
      </main>
    </div>
  )
}
