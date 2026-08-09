import Link from 'next/link'

const COLS = [
  {
    title: 'Explore',
    links: [
      { label: 'The Book', href: '/book' },
      { label: 'About Rohan', href: '/rohan' },
      { label: 'The Initiative', href: '/initiative' },
      { label: 'Take the Pledge', href: '/pledge' },
    ],
  },
  {
    title: 'Apply',
    links: [
      { label: 'Founder', href: '/apply/founder' },
      { label: 'Mentor', href: '/apply/mentor' },
      { label: 'Investor', href: '/apply/investor' },
      { label: 'Industry Expert', href: '/apply/expert' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
      { label: 'Shipping', href: '/shipping' },
      { label: 'Refund', href: '/refund' },
    ],
  },
]

export default function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line bg-night text-canvas">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-serif text-lg font-medium">Rohan Subhash Deshmukh</p>
            <p className="mt-1 text-sm text-canvas/55">
              The New India Manifesto — Going Beyond Possible
            </p>
            <a
              href="https://wa.me/918208737624"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-sm text-canvas/80 transition-colors hover:text-accent-ring"
            >
              WhatsApp: +91 82087 37624
            </a>
          </div>

          {COLS.map((col) => (
            <div key={col.title}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-canvas/45">
                {col.title}
              </p>
              <ul className="mt-3 space-y-2">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-canvas/75 transition-colors hover:text-accent-ring"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-2 border-t border-canvas/10 pt-6 text-xs text-canvas/40 sm:flex-row sm:items-center">
          <p>© 2026 The New India Manifesto. All rights reserved.</p>
          <p>A criteria-based, revolving initiative — not an offer of grants or guaranteed capital.</p>
        </div>
      </div>
    </footer>
  )
}
