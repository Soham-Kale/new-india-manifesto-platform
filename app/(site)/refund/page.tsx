import type { Metadata } from 'next'
import LegalShell from '@/components/site/LegalShell'

export const metadata: Metadata = { title: 'Refund Policy — The New India Manifesto' }

export default function RefundPage() {
  return (
    <LegalShell title="Refund &amp; Cancellation Policy" updated="August 2026">
      <p>We want you to be satisfied with your purchase. This policy explains refunds and cancellations.</p>
      <h2>Physical books</h2>
      <p>
        Damaged or defective books may be returned within 7 days of delivery for a replacement or
        refund. Refunds are processed to the original payment method within 5–7 business days.
      </p>
      <h2>eBooks</h2>
      <p>
        Due to the nature of digital goods, eBook purchases are non-refundable once the download link
        has been accessed, except in cases of a technical fault we cannot resolve.
      </p>
      <h2>Cancellations</h2>
      <p>Physical orders can be cancelled before dispatch for a full refund.</p>
    </LegalShell>
  )
}
