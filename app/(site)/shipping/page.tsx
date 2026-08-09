import type { Metadata } from 'next'
import LegalShell from '@/components/site/LegalShell'

export const metadata: Metadata = { title: 'Shipping Policy — The New India Manifesto' }

export default function ShippingPage() {
  return (
    <LegalShell title="Shipping Policy" updated="August 2026">
      <p>This policy applies to physical copies of the book. eBooks are delivered digitally.</p>
      <h2>Dispatch &amp; delivery</h2>
      <p>
        Physical orders are dispatched within 3–5 business days and typically delivered within 7–10
        business days across India, depending on your location.
      </p>
      <h2>Tracking</h2>
      <p>
        Once shipped, a tracking number is shared by email. eBook orders receive a secure download
        link immediately after successful payment.
      </p>
      <h2>Charges</h2>
      <p>Shipping charges, if any, are shown at checkout before payment.</p>
    </LegalShell>
  )
}
