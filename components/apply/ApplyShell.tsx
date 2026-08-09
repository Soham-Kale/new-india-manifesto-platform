import type { ReactNode } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function ApplyShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-canvas">
      <header className="sticky top-0 z-20 border-b border-line bg-canvas/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-3.5 sm:px-8">
          <Link href="/" className="flex flex-col leading-none">
            <span className="font-serif text-base font-semibold tracking-tight text-ink">
              Rohan Deshmukh
            </span>
            <span className="mt-0.5 text-[10px] uppercase tracking-[0.18em] text-accent">
              The New India Manifesto
            </span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm text-muted transition hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Home
          </Link>
        </div>
      </header>
      <main className="flex flex-1 flex-col">
        <div className="mx-auto w-full max-w-2xl px-5 py-10 sm:px-8 sm:py-14">{children}</div>
      </main>
    </div>
  )
}
