import Link from 'next/link'
import type { ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'

type Variant = 'accent' | 'light' | 'dark' | 'outline'

const wrap: Record<Variant, string> = {
  // solid crimson pill
  accent: 'bg-accent text-white hover:bg-accent-hover',
  // white pill on dark/photo backgrounds
  light: 'bg-white text-ink hover:bg-white/90',
  // dark ink pill on light backgrounds
  dark: 'bg-ink text-canvas hover:bg-accent',
  // translucent outline pill for dark/photo backgrounds
  outline: 'border border-white/30 text-white hover:bg-white/10',
}

const badge: Record<Variant, string> = {
  accent: 'bg-white/20 text-white',
  light: 'bg-accent text-white',
  dark: 'bg-white/15 text-canvas',
  outline: 'bg-white/15 text-white',
}

/**
 * Rounded pill CTA with a trailing circular-arrow badge — the Politian button.
 * Renders as a Next.js Link.
 */
export default function PillLink({
  href,
  children,
  variant = 'accent',
  className = '',
  external = false,
}: {
  href: string
  children: ReactNode
  variant?: Variant
  className?: string
  external?: boolean
}) {
  const cls = `group inline-flex items-center gap-3 rounded-full py-2 pl-6 pr-2 text-sm font-semibold shadow-sm transition-all duration-200 hover:-translate-y-0.5 ${wrap[variant]} ${className}`
  const inner = (
    <>
      {children}
      <span
        className={`flex h-8 w-8 items-center justify-center rounded-full ${badge[variant]}`}
        aria-hidden="true"
      >
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </>
  )
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {inner}
      </a>
    )
  }
  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  )
}
