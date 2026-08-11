'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ChevronDown, Menu, X, LayoutDashboard } from 'lucide-react'
import { useMockAuth } from '@/lib/MockAuthProvider'
import PillLink from '@/components/ui/PillLink'

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
  const [hidden, setHidden] = useState(false)

  // Auto-hide on scroll down, reveal on scroll up.
  useEffect(() => {
    let lastY = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      if (y < 80) {
        setHidden(false)
      } else if (y > lastY + 4) {
        setHidden(true)
        setApplyOpen(false)
      } else if (y < lastY - 4) {
        setHidden(false)
      }
      lastY = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <header
      className={`sticky top-0 z-40 px-4 pt-4 transition-transform duration-300 will-change-transform sm:px-6 ${
        hidden ? '-translate-y-[150%]' : 'translate-y-0'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
        {/* Wordmark */}
        <Link
          href="/"
          className="flex flex-col rounded-full bg-surface/90 px-4 py-2 leading-none shadow-card ring-1 ring-line backdrop-blur"
        >
          <span className="font-display text-base font-bold tracking-tight text-ink sm:text-lg">
            The New India Manifesto
          </span>
          <span className="mt-0.5 text-center text-[9px] uppercase tracking-[0.2em] text-accent sm:text-[10px]">
            Rohan Deshmukh
          </span>
        </Link>

        {/* Centered pill nav (desktop) */}
        <nav className="hidden items-center gap-1 rounded-full bg-surface/90 p-1.5 shadow-card ring-1 ring-line backdrop-blur lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                isActive(item.href)
                  ? 'bg-accent text-white'
                  : 'text-muted hover:bg-accent-soft hover:text-accent'
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
              className={`flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                pathname.startsWith('/apply')
                  ? 'bg-accent text-white'
                  : 'text-muted hover:bg-accent-soft hover:text-accent'
              }`}
            >
              Apply
              <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
            {applyOpen && (
              <div className="absolute right-0 top-full w-56 rounded-2xl border border-line bg-surface p-1.5 shadow-lift">
                {APPLY.map((a) => (
                  <Link
                    key={a.href}
                    href={a.href}
                    className="block rounded-xl px-3 py-2 text-sm text-ink transition hover:bg-accent-soft hover:text-accent"
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
              className="flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-accent-soft hover:text-accent"
            >
              <LayoutDashboard className="h-4 w-4" aria-hidden="true" />
              Admin
            </Link>
          )}
          {(identity === 'mentor' || identity === 'investor') && (
            <Link
              href={identity === 'mentor' ? '/mentor' : '/investor'}
              className="flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-accent-soft hover:text-accent"
            >
              <LayoutDashboard className="h-4 w-4" aria-hidden="true" />
              Dashboard
            </Link>
          )}
        </nav>

        {/* Right CTA (desktop) */}
        <div className="hidden lg:block">
          <PillLink href="/pledge" variant="accent">
            Join the Movement
          </PillLink>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="rounded-full bg-surface/90 p-2.5 text-ink shadow-card ring-1 ring-line backdrop-blur lg:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="mx-auto mt-3 max-w-6xl rounded-2xl border border-line bg-surface p-3 shadow-lift lg:hidden">
          <nav className="flex flex-col">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-3 py-2.5 text-sm font-medium text-ink hover:bg-accent-soft"
              >
                {item.label}
              </Link>
            ))}
            <p className="mt-2 px-3 text-[11px] font-semibold uppercase tracking-widest text-muted">
              Apply
            </p>
            {APPLY.map((a) => (
              <Link
                key={a.href}
                href={a.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-3 py-2.5 text-sm text-ink hover:bg-accent-soft"
              >
                {a.label}
              </Link>
            ))}
            {identity === 'admin' && (
              <Link
                href="/admin"
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-3 py-2.5 text-sm font-medium text-accent hover:bg-accent-soft"
              >
                Admin control room
              </Link>
            )}
            {(identity === 'mentor' || identity === 'investor') && (
              <Link
                href={identity === 'mentor' ? '/mentor' : '/investor'}
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-3 py-2.5 text-sm font-medium text-accent hover:bg-accent-soft"
              >
                My dashboard
              </Link>
            )}
            <Link
              href="/pledge"
              onClick={() => setMenuOpen(false)}
              className="mt-2 rounded-xl bg-accent px-3 py-2.5 text-center text-sm font-semibold text-white"
            >
              Join the Movement
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
