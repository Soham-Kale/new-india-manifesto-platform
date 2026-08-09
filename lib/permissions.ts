import type { Identity } from './types'

// Encodes the spec §3 permission matrix. Client-side guards read from here;
// a real backend will enforce the same table server-side.
export type Capability =
  | 'view_all_records' // see all enrollments / orders / pledges
  | 'change_status' // change application status
  | 'approve_profiles' // approve mentors / investors / experts
  | 'browse_founders' // browse the founder list
  | 'express_interest' // express interest in a founder (V2)
  | 'buy_and_pledge' // buy the book, take the pledge

const MATRIX: Record<Capability, Identity[]> = {
  view_all_records: ['admin'],
  change_status: ['admin'],
  approve_profiles: ['admin'],
  browse_founders: ['admin', 'mentor', 'investor'],
  express_interest: ['admin', 'mentor', 'investor'],
  buy_and_pledge: ['admin', 'founder', 'mentor', 'investor', 'expert', 'guest'],
}

export function can(identity: Identity, capability: Capability): boolean {
  return MATRIX[capability].includes(identity)
}

export function isAdmin(identity: Identity): boolean {
  return identity === 'admin'
}
