import type { ReactNode } from 'react'

export default function LegalShell({
  title,
  updated,
  children,
}: {
  title: string
  updated: string
  children: ReactNode
}) {
  return (
    <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8 lg:py-20">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Legal</p>
      <h1 className="mt-3 font-serif text-4xl font-medium tracking-tight text-ink">{title}</h1>
      <p className="mt-2 text-sm text-muted">Last updated {updated}</p>
      <div className="prose-legal mt-8 space-y-5 text-[15px] leading-relaxed text-muted [&_h2]:mt-8 [&_h2]:font-serif [&_h2]:text-xl [&_h2]:font-medium [&_h2]:text-ink [&_strong]:text-ink">
        {children}
      </div>
      <div className="mt-10 rounded-xl border border-accent/20 bg-accent-soft/50 p-4 text-sm text-ink">
        This is placeholder legal content for the demo. Final copy must be reviewed by counsel and
        reflect the registered business entity, GST details, and DPDP obligations before go-live.
      </div>
    </div>
  )
}
