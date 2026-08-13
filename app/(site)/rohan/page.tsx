import type { Metadata } from 'next'
import {
  AboutStory,
  AuthorVideo,
  WorkGrid,
  VisionBand,
  ContactSection,
  InvitationCTA,
  JourneyTimeline,
} from '@/components/site/sections'
import RohanHero from '@/components/site/RohanHero'

export const metadata: Metadata = {
  title: 'About Rohan Deshmukh — The New India Manifesto',
  description:
    'Rohan Subhash Deshmukh — Solapur roots, the Lokmangal / Subhash Deshmukh legacy, and a builder-not-politician vision for a self-reliant India.',
}

export default function RohanPage() {
  return (
    <>
      <RohanHero />
      <AboutStory />
      <JourneyTimeline />
      <AuthorVideo />
      <VisionBand />
      <WorkGrid />
      <InvitationCTA />
      <ContactSection />
    </>
  )
}
