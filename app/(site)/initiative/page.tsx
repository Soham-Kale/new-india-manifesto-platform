import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  Rocket,
  Users,
  Landmark,
  GraduationCap,
  RefreshCw,
  ShieldCheck,
  Target,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'The Initiative — A Nation Waiting To Be Incubated',
  description:
    'How the incubation programme works: the 100,000 goal, the revolving Village Venture Fund model, and how to take part as a founder, mentor, investor or industry expert.',
}

const ROLES = [
  {
    icon: Rocket,
    title: 'Founder',
    desc: 'You have a business or an idea and want to be incubated.',
    href: '/apply/founder',
  },
  {
    icon: Users,
    title: 'Mentor',
    desc: 'Guide founders with your expertise and experience.',
    href: '/apply/mentor',
  },
  {
    icon: Landmark,
    title: 'Investor',
    desc: 'Back vetted founders through the revolving support model.',
    href: '/apply/investor',
  },
  {
    icon: GraduationCap,
    title: 'Industry Expert',
    desc: 'Judge, speak, shape curriculum or advise on policy.',
    href: '/apply/expert',
  },
]

const PILLARS = [
  {
    icon: RefreshCw,
    title: 'Revolving, not a giveaway',
    desc: 'The Village Venture Fund offers circular micro-equity (₹10k–₹2L) that is repaid and recycled — so support keeps reaching the next founder.',
  },
  {
    icon: ShieldCheck,
    title: 'Criteria-based & transparent',
    desc: 'Support is earned on clear criteria and accountability. We connect founders to mentors and vetted investors — we do not hand out open grants.',
  },
  {
    icon: Target,
    title: 'Rooted in the rural heartland',
    desc: 'Priority to founders building in towns and villages, solving real problems for their own communities.',
  },
]

export default function InitiativePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line bg-night text-canvas">
        <div className="bg-night-aura">
          <div className="mx-auto max-w-5xl px-5 py-20 text-center sm:px-8 lg:py-28">
            <p className="flex items-center justify-center gap-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              <span className="h-px w-7 bg-gold/60" aria-hidden="true" />
              The Initiative
              <span className="h-px w-7 bg-gold/60" aria-hidden="true" />
            </p>
            <h1 className="mx-auto mt-5 max-w-3xl font-serif text-4xl font-medium leading-tight tracking-tight sm:text-6xl">
              A Nation Waiting To Be Incubated
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-canvas/70">
              The pledge from the book, made operational. Our goal:{' '}
              <strong className="text-canvas">incubate 100,000 entrepreneurs</strong> from India&apos;s
              rural heartland — by connecting them to mentorship, network and a revolving,
              accountability-first support model.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Link
                href="/apply/founder"
                className="group inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-sm font-medium text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-glow"
              >
                Apply to be incubated
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
              <Link
                href="/pledge"
                className="inline-flex items-center gap-2 rounded-xl border border-canvas/25 px-6 py-3.5 text-sm font-medium text-canvas transition hover:border-canvas/50 hover:bg-canvas/5"
              >
                Take the pledge
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How it works — pillars */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              How the programme works
            </p>
            <h2 className="mt-3 font-serif text-3xl font-medium tracking-tight text-ink sm:text-4xl">
              Support that recycles, by design
            </h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {PILLARS.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-2xl border border-line bg-surface p-6 shadow-sm">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-medium text-ink">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Role lanes */}
      <section className="border-b border-line bg-surface/60">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Choose your lane
            </p>
            <h2 className="mt-3 font-serif text-3xl font-medium tracking-tight text-ink sm:text-4xl">
              Four ways to fulfil the pledge
            </h2>
            <p className="mt-3 text-muted">
              Every role is a lane for acting on the manifesto. Pick the one that fits you.
            </p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {ROLES.map(({ icon: Icon, title, desc, href }) => (
              <Link
                key={title}
                href={href}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-surface p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/30 hover:shadow-lift"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-linear-to-r from-accent to-gold transition-transform duration-300 group-hover:scale-x-100"
                />
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-soft text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-medium text-ink">{title}</h3>
                <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted">{desc}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition group-hover:gap-2.5">
                  Apply
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
