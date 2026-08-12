'use client'

import { useState } from 'react'
import { Globe, ChevronDown, Check } from 'lucide-react'
import { useT, type Lang } from '@/lib/i18n'

const LANGS: { value: Lang; label: string; short: string }[] = [
  { value: 'mr', label: 'मराठी', short: 'मराठी' },
  { value: 'en', label: 'English', short: 'EN' },
]

/** Compact language dropdown (Marathi default). Matches the "Apply" dropdown style. */
export default function LangToggle({ className = '' }: { className?: string }) {
  const { lang, setLang } = useT()
  const [open, setOpen] = useState(false)
  const current = LANGS.find((l) => l.value === lang) ?? LANGS[0]

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Language"
        className="flex items-center gap-1.5 rounded-full bg-surface/90 px-3 py-2 text-sm font-medium text-muted shadow-card ring-1 ring-line backdrop-blur transition-colors hover:text-accent"
      >
        <Globe className="h-4 w-4" aria-hidden="true" />
        {current.short}
        <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
      </button>

      {open && (
        <>
          {/* click-away backdrop */}
          <button
            type="button"
            aria-hidden="true"
            tabIndex={-1}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 cursor-default"
          />
          <div
            role="listbox"
            className="absolute right-0 top-full z-50 mt-1 w-36 rounded-2xl border border-line bg-surface p-1.5 shadow-lift"
          >
            {LANGS.map((l) => (
              <button
                key={l.value}
                type="button"
                role="option"
                aria-selected={l.value === lang}
                onClick={() => {
                  setLang(l.value)
                  setOpen(false)
                }}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm transition ${
                  l.value === lang
                    ? 'bg-accent-soft text-accent'
                    : 'text-ink hover:bg-accent-soft hover:text-accent'
                }`}
              >
                {l.label}
                {l.value === lang && <Check className="h-4 w-4" aria-hidden="true" />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
