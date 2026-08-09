import type { Metadata } from 'next'
import LegalShell from '@/components/site/LegalShell'

export const metadata: Metadata = { title: 'Privacy Policy — The New India Manifesto' }

export default function PrivacyPage() {
  return (
    <LegalShell title="Privacy Policy" updated="August 2026">
      <p>
        We respect your privacy and process personal data in line with the Digital Personal Data
        Protection Act, 2023 (DPDP). We collect only what we need to fulfil the purpose you consented
        to.
      </p>
      <h2>Consent is explicit and unbundled</h2>
      <p>
        We ask for <strong>separate consent</strong> for (a) processing your application or order and
        (b) receiving campaign updates. You may opt out of updates at any time without affecting your
        application or order.
      </p>
      <h2>Purpose limitation</h2>
      <p>
        Application data is used only to assess and support your participation in the initiative.
        Book buyers are <strong>never</strong> auto-added to any campaign or supporter list.
      </p>
      <h2>Sharing with mentors / investors</h2>
      <p>
        A founder&apos;s information is shared with a mentor or investor <strong>only</strong> if the
        founder ticked &ldquo;share my application,&rdquo; and contact details are revealed only after
        an admin approves a match.
      </p>
      <h2>Retention &amp; your rights</h2>
      <p>
        You can request access, correction, or deletion of your data. Contact us on WhatsApp at +91
        82087 37624.
      </p>
    </LegalShell>
  )
}
