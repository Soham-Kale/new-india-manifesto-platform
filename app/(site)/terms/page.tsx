import type { Metadata } from 'next'
import LegalShell from '@/components/site/LegalShell'

export const metadata: Metadata = { title: 'Terms of Use — The New India Manifesto' }

export default function TermsPage() {
  return (
    <LegalShell title="Terms of Use" updated="August 2026">
      <p>
        By using this website and its services, you agree to these terms. The initiative is a
        criteria-based, revolving support programme.
      </p>
      <h2>No guarantee of capital</h2>
      <p>
        Participation does <strong>not</strong> guarantee funding, investment, or any financial
        outcome. The Village Venture Fund operates as circular micro-equity that is repaid and
        recycled; support is discretionary and criteria-based.
      </p>
      <h2>Applications</h2>
      <p>
        One application is permitted per person. Submitting an application does not create any
        obligation on our part. Internal review decisions are confidential.
      </p>
      <h2>Book purchases</h2>
      <p>
        The book is sold and fulfilled through Amazon. Purchases, payments, shipping and returns are
        handled by Amazon under Amazon&apos;s own terms; we do not process payments or store any card
        details.
      </p>
    </LegalShell>
  )
}
