import type {
  District,
  FounderStage,
  Sector,
  LookingFor,
  InternalStatus,
  PublicStatus,
  ApprovalStatus,
  InvestorType,
  Contribution,
  Commitment,
  BookFormat,
  PaymentStatus,
  FulfillmentStatus,
} from './types'

export interface Option<T extends string> {
  value: T
  label: string
}

export const DISTRICTS: Option<District>[] = [
  { value: 'pune', label: 'Pune' },
  { value: 'solapur', label: 'Solapur' },
  { value: 'sangli', label: 'Sangli' },
  { value: 'satara', label: 'Satara' },
  { value: 'kolhapur', label: 'Kolhapur' },
  { value: 'other', label: 'Other' },
]

export const FOUNDER_STAGES: Option<FounderStage>[] = [
  { value: 'idea', label: 'Idea' },
  { value: 'prototype', label: 'Prototype' },
  { value: 'early_revenue', label: 'Early revenue' },
  { value: 'growth', label: 'Growth' },
]

export const SECTORS: Option<Sector>[] = [
  { value: 'agritech', label: 'Agritech' },
  { value: 'edtech', label: 'Edtech' },
  { value: 'healthtech', label: 'Healthtech' },
  { value: 'fintech', label: 'Fintech' },
  { value: 'consumer', label: 'Consumer' },
  { value: 'deeptech', label: 'Deeptech' },
  { value: 'social', label: 'Social enterprise' },
  { value: 'other', label: 'Other' },
]

export const LOOKING_FOR: Option<LookingFor>[] = [
  { value: 'mentorship', label: 'Mentorship' },
  { value: 'capital', label: 'Revolving support (micro-equity)' },
  { value: 'network', label: 'Network' },
  { value: 'pilot_customers', label: 'Pilot customers' },
]

export const INVESTOR_TYPES: Option<InvestorType>[] = [
  { value: 'angel', label: 'Angel' },
  { value: 'vc', label: 'VC' },
  { value: 'family_office', label: 'Family office' },
  { value: 'hni', label: 'HNI' },
]

export const CONTRIBUTIONS: Option<Contribution>[] = [
  { value: 'judge', label: 'Judge' },
  { value: 'speak', label: 'Speak' },
  { value: 'curriculum', label: 'Curriculum' },
  { value: 'policy', label: 'Policy' },
]

export const COMMITMENTS: Option<Commitment>[] = [
  { value: 'incubate', label: 'Incubate an enterprise' },
  { value: 'mentor', label: 'Mentor a founder' },
  { value: 'support', label: 'Back a founder' },
  { value: 'spread', label: 'Spread the word' },
]

export const BOOK_FORMATS: Option<BookFormat>[] = [
  { value: 'physical', label: 'Physical' },
  { value: 'ebook', label: 'eBook' },
]

export const INTERNAL_STATUSES: Option<InternalStatus>[] = [
  { value: 'received', label: 'Received' },
  { value: 'under_review', label: 'Under review' },
  { value: 'shortlisted', label: 'Shortlisted' },
  { value: 'matched', label: 'Matched' },
  { value: 'rejected', label: 'Rejected' },
]

export const APPROVAL_STATUSES: Option<ApprovalStatus>[] = [
  { value: 'pending', label: 'Pending' },
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' },
]

export const MATCH_STATUSES: Option<'interest' | 'admin_approved' | 'connected' | 'declined'>[] = [
  { value: 'interest', label: 'Interest' },
  { value: 'admin_approved', label: 'Approved' },
  { value: 'connected', label: 'Connected' },
  { value: 'declined', label: 'Declined' },
]

export const PAYMENT_STATUSES: Option<PaymentStatus>[] = [
  { value: 'created', label: 'Created' },
  { value: 'paid', label: 'Paid' },
  { value: 'failed', label: 'Failed' },
  { value: 'refunded', label: 'Refunded' },
]

export const FULFILLMENT_STATUSES: Option<FulfillmentStatus>[] = [
  { value: 'pending', label: 'Pending' },
  { value: 'shipped', label: 'Shipped' },
  { value: 'delivered', label: 'Delivered' },
]

// The public-facing label an applicant sees (spec §4/§11). Anything past
// under_review still shows "Under review" so decisions stay internal.
export const PUBLIC_STATUS_LABEL: Record<PublicStatus, string> = {
  received: 'Received',
  under_review: 'Under review',
}

export function toPublicStatus(internal: InternalStatus): PublicStatus {
  return internal === 'received' ? 'received' : 'under_review'
}

function makeLabeler<T extends string>(opts: Option<T>[]) {
  const map = new Map(opts.map((o) => [o.value, o.label]))
  return (v: T): string => map.get(v) ?? String(v)
}

export const labelDistrict = makeLabeler(DISTRICTS)
export const labelStage = makeLabeler(FOUNDER_STAGES)
export const labelSector = makeLabeler(SECTORS)
export const labelLookingFor = makeLabeler(LOOKING_FOR)
export const labelInvestorType = makeLabeler(INVESTOR_TYPES)
export const labelContribution = makeLabeler(CONTRIBUTIONS)
export const labelCommitment = makeLabeler(COMMITMENTS)
export const labelInternalStatus = makeLabeler(INTERNAL_STATUSES)
export const labelApprovalStatus = makeLabeler(APPROVAL_STATUSES)
