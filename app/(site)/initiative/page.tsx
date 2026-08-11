import type { Metadata } from 'next'
import InitiativeContent from '@/components/site/InitiativeContent'

export const metadata: Metadata = {
  title: 'The Initiative — A Nation Waiting To Be Incubated',
  description:
    'How the incubation programme works: the 100,000 goal, the revolving Village Venture Fund model, and how to take part as a founder, mentor, investor or industry expert.',
}

export default function InitiativePage() {
  return <InitiativeContent />
}
