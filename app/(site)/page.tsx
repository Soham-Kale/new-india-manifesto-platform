import {
  Hero,
  BookFeature,
  FunnelSteps,
  CommunityEvents,
  VisionBand,
  WorkGrid,
  InvitationCTA,
} from '@/components/site/sections'

export default function HomePage() {
  return (
    <>
      <Hero />
      <BookFeature />
      <InvitationCTA />
      <VisionBand />
      <FunnelSteps />
      <CommunityEvents />
      <WorkGrid />
    </>
  )
}
