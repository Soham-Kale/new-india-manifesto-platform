import type { Metadata } from 'next'
import {
  AboutStory,
  AuthorVideo,
  WorkGrid,
  VisionBand,
  ContactSection,
  InvitationCTA,
} from '@/components/site/sections'

export const metadata: Metadata = {
  title: 'About Rohan Deshmukh — The New India Manifesto',
  description:
    'Rohan Subhash Deshmukh — Solapur roots, the Lokmangal / Subhash Deshmukh legacy, and a builder-not-politician vision for a self-reliant India.',
}

export default function RohanPage() {
  return (
    <>
      <div className="border-b border-line bg-surface/60">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 lg:py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            About Rohan
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl">
            A builder, not a politician
          </h1>
          <p className="mt-4 max-w-2xl text-muted">
            The son of a first-generation entrepreneur, carrying a legacy of enterprise and
            service from Solapur to a national vision for New India.
          </p>
        </div>
      </div>
      <AboutStory />
      <AuthorVideo />
      <VisionBand />
      <WorkGrid />
      <InvitationCTA />
      <ContactSection />
    </>
  )
}
