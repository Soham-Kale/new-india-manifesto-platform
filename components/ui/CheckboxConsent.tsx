'use client'

import type { ReactNode } from 'react'

interface CheckboxConsentProps {
  name: string
  checked: boolean
  onChange: (checked: boolean) => void
  children: ReactNode
  error?: string
}

export default function CheckboxConsent({
  name,
  checked,
  onChange,
  children,
  error,
}: CheckboxConsentProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="flex cursor-pointer items-start gap-3 rounded-xl border border-line bg-surface p-3.5 transition hover:border-ink/30"
      >
        <input
          id={name}
          name={name}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-line accent-accent"
        />
        <span className="text-sm leading-relaxed text-ink">{children}</span>
      </label>
      {error && <p className="mt-1 text-xs text-danger">{error}</p>}
    </div>
  )
}
