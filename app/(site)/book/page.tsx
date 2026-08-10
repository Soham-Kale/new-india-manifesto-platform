import type { Metadata } from 'next'
import { Check } from 'lucide-react'
import BookCheckout from '@/components/site/BookCheckout'

export const metadata: Metadata = {
  title: 'The New India Manifesto — Going Beyond Possible',
  description:
    'The New India Manifesto by Rohan Deshmukh — not a biography, a manifesto. A call to India’s youth to build a self-reliant New India. Get your copy.',
}

// Actual chapters from the book.
const CHAPTERS = [
  'Born in Solapur, Built for Bharat',
  'The Lokmangal Way',
  'The Subtle Power of Social Impact',
  'Revolution Is Responsibility',
  'A Hunger-Free, Educated India',
  'The Enemy Within: Mediocrity',
  'The Youth Manifesto',
  'Revolution Without Violence',
  'A Nation Waiting To Be Incubated',
  'Final Call',
]

const TAKEAWAYS = [
  'The real enemy isn’t outside — it’s mediocrity, complacency, and the shrug of “chalta hai.”',
  'A Revolution of Responsibility — where skills and ideas are the weapons, and dignity is the victory.',
  'A New India is built by you, not for you — the book asks not when India will change, but when you will.',
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

          {/* Short synopsis */}
          <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-muted">
            Not a biography or a success story — <strong className="font-medium text-ink">a
            manifesto</strong>. Written from Solapur, it carries his father Subhash Deshmukh&apos;s
            dream — to incubate <strong className="font-medium text-ink">1,00,000 entrepreneurs</strong>{' '}
            from India&apos;s youth — and turns it into a direct call to action for a self-reliant,
            enterprise-led <strong className="font-medium text-ink">New India</strong>.
          </p>

          {/* What it tells you */}
          <ul className="mt-6 max-w-xl space-y-2.5">
            {TAKEAWAYS.map((t) => (
              <li key={t} className="flex items-start gap-2.5 text-[15px] leading-relaxed text-ink">
                <Check className="mt-1 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>

          {/* Chapters — compact */}
          <div className="mt-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              Inside the book
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {CHAPTERS.map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-line bg-surface px-3 py-1.5 text-xs text-ink"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-center gap-2 rounded-xl border border-accent/20 bg-accent-soft/60 px-4 py-3 text-sm text-ink">
            <Check className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
            Buying the book never adds you to any campaign list. Updates are a separate, optional
            opt-in.
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
