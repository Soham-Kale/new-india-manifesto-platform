'use client'

import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'accent' | 'secondary' | 'ghost' | 'danger'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  fullWidthOnMobile?: boolean
  children: ReactNode
}

const base =
  'group inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-medium transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50'

const variants: Record<Variant, string> = {
  // Editorial dark → violet on hover.
  primary:
    'bg-ink text-canvas shadow-sm hover:bg-accent hover:shadow-glow hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]',
  // Brand-forward solid violet, for the primary conversion CTAs.
  accent:
    'bg-accent text-white shadow-sm hover:bg-accent-hover hover:shadow-glow hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]',
  secondary:
    'border border-line-strong bg-surface text-ink hover:border-ink/40 hover:shadow-card active:scale-[0.98]',
  ghost: 'text-muted hover:text-accent',
  danger: 'bg-danger text-white hover:opacity-90 active:scale-[0.98]',
}

export default function Button({
  variant = 'primary',
  fullWidthOnMobile = false,
  className = '',
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`${base} ${variants[variant]} ${
        fullWidthOnMobile ? 'w-full sm:w-auto' : ''
      } ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}
