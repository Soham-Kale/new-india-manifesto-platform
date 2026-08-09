'use client'

import Link from 'next/link'
import { Lock } from 'lucide-react'
import type { Identity } from '@/lib/types'
import { useMockAuth } from '@/lib/MockAuthProvider'
import Button from '@/components/ui/Button'

export default function AccessDenied({
  role,
  label,
}: {
  role: Identity
  label: string
}) {
  const { switchRole } = useMockAuth()
  return (
    <div className="mx-auto max-w-md px-5 py-24 text-center">
      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-soft text-accent">
        <Lock className="h-6 w-6" aria-hidden="true" />
      </span>
      <h1 className="mt-5 font-serif text-2xl font-medium text-ink">{label} only</h1>
      <p className="mt-2 text-sm text-muted">
        This dashboard is restricted to {label.toLowerCase()}s. Sign in with the right role, or use the
        demo switcher in the corner.
      </p>
      <div className="mt-6 flex justify-center gap-3">
        <Button onClick={() => switchRole(role)}>Enter as {label.toLowerCase()} (demo)</Button>
        <Link
          href="/"
          className="inline-flex items-center rounded-xl border border-line bg-surface px-5 py-3 text-sm font-medium text-ink transition hover:border-ink/40"
        >
          Home
        </Link>
      </div>
    </div>
  )
}
