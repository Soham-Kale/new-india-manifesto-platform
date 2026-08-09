import type { Metadata } from 'next'
import { Star, Check } from 'lucide-react'
import BookCheckout from '@/components/site/BookCheckout'

export const metadata: Metadata = {
  title: 'The New India Manifesto — Going Beyond Possible',
  description:
    'The New India Manifesto: Going Beyond Possible by Rohan Deshmukh. Read the synopsis and get your copy — physical or eBook.',
}

const CHAPTERS = [
  'A Nation of Builders',
  'The Rural Heartland Awakens',
  'Enterprise as Service',
  'The Village Venture Fund',
  'A Nation Waiting To Be Incubated',
  'Going Beyond Possible',
]

const TESTIMONIALS = [
  {
    quote:
      'A rare book that turns conviction into a concrete plan for rural enterprise.',
    name: 'A reader from Solapur',
  },
  {
    quote: 'Reads like a call to action — and then gives you a way to answer it.',
    name: 'A young founder',
  },
]

export default function BookPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 lg:py-20">
      <div className="grid gap-10 lg:grid-cols-[1fr_360px] lg:gap-14">
        {/* Left: content */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">The Book</p>
          <h1 className="mt-3 font-serif text-4xl font-medium leading-tight tracking-tight text-ink sm:text-5xl">
            The New India Manifesto
          </h1>
          <p className="mt-2 text-lg text-muted">Going Beyond Possible — by Rohan Deshmukh</p>

          <div className="mt-6 flex items-center gap-1 text-accent">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-current" aria-hidden="true" />
            ))}
            <span className="ml-2 text-sm text-muted">Early readers&apos; favourite</span>
          </div>

          <div className="mt-8 space-y-4 text-[15px] leading-relaxed text-muted">
            <p>
              A hundred years ago, &ldquo;an independent India&rdquo; was just an idea — until
              someone dared to see it. <em>The New India Manifesto</em> argues that history is
              repeating: the next revolution will rise from our towns and villages, led by
              first-time founders and everyday builders.
            </p>
            <p>
              The book makes the case for a self-reliant, enterprise-led India and ends with a
              pledge — to incubate one enterprise and mentor others. It introduces the{' '}
              <strong className="font-medium text-ink">Village Venture Fund</strong>: a circular
              micro-equity model (₹10k–₹2L) that is repaid and recycled, so support keeps
              flowing rather than running dry.
            </p>
          </div>

          {/* Chapters */}
          <div className="mt-10">
            <h2 className="font-serif text-2xl font-medium text-ink">Inside the book</h2>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {CHAPTERS.map((c, i) => (
                <li key={c} className="flex items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-soft text-xs font-semibold text-accent">
                    {i + 1}
                  </span>
                  <span className="text-sm text-ink">{c}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Testimonials */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {TESTIMONIALS.map((t) => (
              <blockquote key={t.name} className="rounded-2xl border border-line bg-surface p-5">
                <p className="font-serif text-base italic leading-relaxed text-ink">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <footer className="mt-3 text-xs uppercase tracking-widest text-muted">
                  {t.name}
                </footer>
              </blockquote>
            ))}
          </div>

          <div className="mt-8 flex items-center gap-2 rounded-xl border border-accent/20 bg-accent-soft/60 px-4 py-3 text-sm text-ink">
            <Check className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
            Buying the book never adds you to any campaign list. Updates are a separate,
            optional opt-in.
          </div>
        </div>

        {/* Right: sticky buy panel */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="mb-5 overflow-hidden rounded-2xl border border-line shadow-lift">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/book-cover.jpg"
              alt="The New India Manifesto: Going Beyond Possible"
              className="w-full"
            />
          </div>
          <BookCheckout />
        </div>
      </div>
    </div>
  )
}
