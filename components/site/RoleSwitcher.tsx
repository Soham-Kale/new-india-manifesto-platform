'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FlaskConical, ChevronUp, RotateCcw, X } from 'lucide-react'
import type { Identity } from '@/lib/types'
import { useMockAuth } from '@/lib/MockAuthProvider'
import { useMockData } from '@/lib/MockDataProvider'
import { useT } from '@/lib/i18n'

const IDENTITIES: { id: Identity; labelKey: string; hintKey: string }[] = [
  { id: 'guest', labelKey: 'demo.guest', hintKey: 'demo.guestHint' },
  { id: 'founder', labelKey: 'demo.founder', hintKey: 'demo.founderHint' },
  { id: 'mentor', labelKey: 'demo.mentor', hintKey: 'demo.mentorHint' },
  { id: 'investor', labelKey: 'demo.investor', hintKey: 'demo.investorHint' },
  { id: 'expert', labelKey: 'demo.expert', hintKey: 'demo.expertHint' },
  { id: 'admin', labelKey: 'demo.admin', hintKey: 'demo.adminHint' },
]

// Frontend-only demo widget: simulates login by switching the active identity
// so reviewers can see role-scoped views without a real auth backend.
export default function RoleSwitcher() {
  const { identity, switchRole } = useMockAuth()
  const { reset } = useMockData()
  const { t } = useT()
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const current = IDENTITIES.find((i) => i.id === identity) ?? IDENTITIES[0]

  return (
    <div className="fixed bottom-4 right-4 z-50 print:hidden">
      {open ? (
        <div className="w-64 overflow-hidden rounded-2xl border border-night-soft bg-night text-canvas shadow-lift">
          <div className="flex items-center justify-between border-b border-canvas/10 px-4 py-3">
            <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent-ring">
              <FlaskConical className="h-4 w-4" aria-hidden="true" />
              {t('demo.mode')}
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-md p-1 text-canvas/60 hover:text-canvas"
              aria-label="Close demo panel"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="p-2">
            <p className="px-2 pb-1 pt-1 text-[11px] text-canvas/45">{t('demo.viewAs')}</p>
            {IDENTITIES.map((i) => (
              <button
                key={i.id}
                type="button"
                onClick={() => switchRole(i.id)}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition ${
                  identity === i.id
                    ? 'bg-accent/20 text-canvas'
                    : 'text-canvas/70 hover:bg-canvas/5'
                }`}
              >
                <span>{t(i.labelKey)}</span>
                <span className="text-[11px] text-canvas/40">{t(i.hintKey)}</span>
              </button>
            ))}
          </div>

          <div className="border-t border-canvas/10 p-2">
            <button
              type="button"
              onClick={() => {
                reset()
                router.refresh()
              }}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-canvas/70 transition hover:bg-canvas/5"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              {t('demo.reset')}
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 rounded-full border border-night-soft bg-night px-4 py-2.5 text-sm font-medium text-canvas shadow-lift transition hover:bg-night-soft"
        >
          <FlaskConical className="h-4 w-4 text-accent-ring" aria-hidden="true" />
          {t('demo.current')} {t(current.labelKey)}
          <ChevronUp className="h-4 w-4 text-canvas/50" aria-hidden="true" />
        </button>
      )}
    </div>
  )
}
