'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { ArrowRight, ChevronDown, Menu, X, LayoutDashboard } from 'lucide-react'
import { useMockAuth } from '@/lib/MockAuthProvider'

const NAV = [
  { label: 'The Book', href: '/book' },
  { label: 'About Rohan', href: '/rohan' },
  { label: 'Initiative', href: '/initiative' },
  { label: 'Pledge', href: '/pledge' },
]

const APPLY = [
  { label: 'As a Founder', href: '/apply/founder' },
  { label: 'As a Mentor', href: '/apply/mentor' },
  { label: 'As an Investor', href: '/apply/investor' },
  { label: 'As an Industry Expert', href: '/apply/expert' },
]

export default function SiteHeader() {
  const pathname = usePathname()
  const { identity } = useMockAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const [applyOpen, setApplyOpen] = useState(false)

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-canvas/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 sm:px-8">
        <Link href="/" className="flex flex-col leading-none">
          <span className="font-serif text-lg font-semibold tracking-tight text-ink sm:text-xl">
            Rohan Deshmukh
          </span>
          <span className="mt-0.5 text-[10px] uppercase tracking-[0.2em] text-accent sm:text-[11px]">
            The New India Manifesto
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-colors hover:text-accent ${
                isActive(item.href) ? 'text-accent' : 'text-muted'
              }`}
            >
              {item.label}
            </Link>
          ))}

          {/* Apply dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setApplyOpen(true)}
            onMouseLeave={() => setApplyOpen(false)}
          >
            <button
              type="button"
              onClick={() => setApplyOpen((v) => !v)}
              className="flex items-center gap-1 text-sm font-medium text-muted transition-colors hover:text-accent"
            >
              Apply
              <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
            {applyOpen && (
              <div className="absolute right-0 top-full w-56 rounded-xl border border-line bg-surface p-1.5 shadow-lift">
                {APPLY.map((a) => (
                  <Link
                    key={a.href}
                    href={a.href}
                    className="block rounded-lg px-3 py-2 text-sm text-ink transition hover:bg-accent-soft hover:text-accent"
                  >
                    {a.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {identity === 'admin' && (
            <Link
              href="/admin"
              className="flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-accent"
            >
              <LayoutDashboard className="h-4 w-4" aria-hidden="true" />
              Admin
            </Link>
          )}
          {(identity === 'mentor' || identity === 'investor') && (
            <Link
              href={identity === 'mentor' ? '/mentor' : '/investor'}
              className="flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-accent"
            >
              <LayoutDashboard className="h-4 w-4" aria-hidden="true" />
              Dashboard
            </Link>
          )}

          <Link
            href="/apply/founder"
            className="inline-flex items-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-sm font-medium text-canvas transition-all hover:bg-accent hover:shadow-lift"
          >
            Apply
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          className="rounded-lg p-2 text-ink lg:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-line bg-canvas px-5 py-3 lg:hidden">
          <nav className="flex flex-col">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-2 py-2.5 text-sm font-medium text-ink hover:bg-accent-soft"
              >
                {item.label}
              </Link>
            ))}
            <p className="mt-2 px-2 text-[11px] font-semibold uppercase tracking-widest text-muted">
              Apply
            </p>
            {APPLY.map((a) => (
              <Link
                key={a.href}
                href={a.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-2 py-2.5 text-sm text-ink hover:bg-accent-soft"
              >
                {a.label}
              </Link>
            ))}
            {identity === 'admin' && (
              <Link
                href="/admin"
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-2 py-2.5 text-sm font-medium text-accent hover:bg-accent-soft"
              >
                Admin control room
              </Link>
            )}
            {(identity === 'mentor' || identity === 'investor') && (
              <Link
                href={identity === 'mentor' ? '/mentor' : '/investor'}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-2 py-2.5 text-sm font-medium text-accent hover:bg-accent-soft"
              >
                My dashboard
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
