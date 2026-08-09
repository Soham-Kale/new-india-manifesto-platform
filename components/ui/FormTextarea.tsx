'use client'

import { forwardRef } from 'react'
import type { TextareaHTMLAttributes } from 'react'
import FormError from './FormError'

interface FormTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  name: string
  required?: boolean
  error?: string
  hint?: string
  showCount?: boolean
}

const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  (
    { label, name, required, error, hint, showCount = false, className = '', rows = 4, value, ...rest },
    ref,
  ) => {
    const errorId = error ? `${name}-error` : undefined
    const count = typeof value === 'string' ? value.length : 0
    return (
      <div className={className}>
        <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-ink">
          {label}
          {required && <span className="ml-0.5 text-accent">*</span>}
        </label>
        {hint && <p className="mb-1.5 text-xs text-muted">{hint}</p>}
        <textarea
          ref={ref}
          id={name}
          name={name}
          rows={rows}
          required={required}
          value={value}
          aria-invalid={!!error}
          aria-describedby={errorId}
          className={`w-full resize-y rounded-xl border bg-surface px-4 py-3 text-sm leading-relaxed text-ink placeholder:text-muted/50 shadow-sm transition-all duration-200 focus:border-ink focus:shadow-card ${
            error ? 'border-danger' : 'border-line hover:border-ink/30'
          }`}
          {...rest}
        />
        <div className="mt-1.5 flex items-start justify-between gap-3">
          <FormError id={errorId} message={error} />
          {showCount && (
            <span className="ml-auto shrink-0 text-[11px] tabular-nums text-muted/70">
              {count} characters
            </span>
          )}
        </div>
      </div>
    )
  },
)

FormTextarea.displayName = 'FormTextarea'
export default FormTextarea
