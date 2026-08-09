'use client'

import { Check } from 'lucide-react'
import FormError from './FormError'

interface Opt {
  value: string
  label: string
}

interface MultiSelectFieldProps {
  label: string
  name: string
  options: Opt[]
  values: string[]
  onChange: (values: string[]) => void
  required?: boolean
  error?: string
  hint?: string
}

/** Multi-select pill group (checkbox semantics). */
export default function MultiSelectField({
  label,
  name,
  options,
  values,
  onChange,
  required,
  error,
  hint,
}: MultiSelectFieldProps) {
  const errorId = error ? `${name}-error` : undefined
  const toggle = (v: string) =>
    onChange(values.includes(v) ? values.filter((x) => x !== v) : [...values, v])

  return (
    <div>
      <span className="mb-1.5 block text-sm font-medium text-ink">
        {label}
        {required && <span className="ml-0.5 text-accent">*</span>}
      </span>
      {hint && <p className="mb-2 text-xs text-muted">{hint}</p>}
      <div aria-label={label} aria-describedby={errorId} className="flex flex-wrap gap-2">
        {options.map((o) => {
          const selected = values.includes(o.value)
          return (
            <button
              key={o.value}
              type="button"
              role="checkbox"
              aria-checked={selected}
              onClick={() => toggle(o.value)}
              className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm transition-all duration-200 active:scale-[0.97] ${
                selected
                  ? 'border-accent bg-accent-soft text-accent'
                  : 'border-line bg-surface text-muted hover:border-ink/40 hover:text-ink'
              }`}
            >
              {selected && <Check className="h-3.5 w-3.5" aria-hidden="true" />}
              {o.label}
            </button>
          )
        })}
      </div>
      <FormError id={errorId} message={error} />
    </div>
  )
}
