'use client'

import FormError from './FormError'

interface Opt {
  value: string
  label: string
}

interface SelectFieldProps {
  label: string
  name: string
  options: Opt[]
  value: string
  onChange: (value: string) => void
  required?: boolean
  error?: string
}

/** Pill/segmented single-select rendered as an accessible radiogroup. */
export default function SelectField({
  label,
  name,
  options,
  value,
  onChange,
  required,
  error,
}: SelectFieldProps) {
  const errorId = error ? `${name}-error` : undefined
  return (
    <div>
      <span className="mb-2 block text-sm font-medium text-ink">
        {label}
        {required && <span className="ml-0.5 text-accent">*</span>}
      </span>
      <div role="radiogroup" aria-label={label} aria-describedby={errorId} className="flex flex-wrap gap-2">
        {options.map((o) => {
          const selected = value === o.value
          return (
            <button
              key={o.value}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(selected ? '' : o.value)}
              className={`rounded-full border px-4 py-2 text-sm transition-all duration-200 active:scale-[0.97] ${
                selected
                  ? 'border-ink bg-ink text-canvas'
                  : 'border-line bg-surface text-muted hover:border-ink/40 hover:text-ink'
              }`}
            >
              {o.label}
            </button>
          )
        })}
      </div>
      <FormError id={errorId} message={error} />
    </div>
  )
}
