'use client'

import { forwardRef } from 'react'
import type { InputHTMLAttributes } from 'react'
import FormError from './FormError'

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  name: string
  required?: boolean
  error?: string
  hint?: string
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, name, required, error, hint, className = '', ...rest }, ref) => {
    const errorId = error ? `${name}-error` : undefined
    return (
      <div className={className}>
        <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-ink">
          {label}
          {required && <span className="ml-0.5 text-accent">*</span>}
        </label>
        {hint && <p className="mb-1.5 text-xs text-muted">{hint}</p>}
        <input
          ref={ref}
          id={name}
          name={name}
          required={required}
          aria-invalid={!!error}
          aria-describedby={errorId}
          className={`w-full rounded-xl border bg-surface px-4 py-3 text-sm text-ink placeholder:text-muted/50 shadow-sm transition-all duration-200 focus:border-ink focus:shadow-card ${
            error ? 'border-danger' : 'border-line hover:border-ink/30'
          }`}
          {...rest}
        />
        <FormError id={errorId} message={error} />
      </div>
    )
  },
)

FormInput.displayName = 'FormInput'
export default FormInput
