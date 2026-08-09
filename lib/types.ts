// ============================================================================
// Data model — mirrors the build spec §5. Frontend-only for now: these types
// are the contract the mock store implements and that a real backend/Prisma
// schema will later satisfy 1:1.
// ============================================================================

export type Role = 'admin' | 'founder' | 'mentor' | 'investor' | 'expert'
export type Identity = Role | 'guest'

export type District =
  | 'pune'
  | 'solapur'
  | 'sangli'
  | 'satara'
  | 'kolhapur'
  | 'other'

export type FounderStage = 'idea' | 'prototype' | 'early_revenue' | 'growth'

export type Sector =
  | 'agritech'
  | 'edtech'
  | 'healthtech'
  | 'fintech'
  | 'consumer'
  | 'deeptech'
  | 'social'
  | 'other'

export type LookingFor =
  | 'mentorship'
  | 'capital'
  | 'network'
  | 'pilot_customers'

export type InternalStatus =
  | 'received'
  | 'under_review'
  | 'shortlisted'
  | 'matched'
  | 'rejected'

// The only two states an applicant is ever allowed to see (spec §4 + §11).
export type PublicStatus = 'received' | 'under_review'

export type ApprovalStatus = 'pending' | 'approved' | 'rejected'
export type InvestorType = 'angel' | 'vc' | 'family_office' | 'hni'
export type Contribution = 'judge' | 'speak' | 'curriculum' | 'policy'

export type BookFormat = 'physical' | 'ebook'
export type PaymentStatus = 'created' | 'paid' | 'failed' | 'refunded'
export type FulfillmentStatus = 'pending' | 'shipped' | 'delivered'
export type Commitment = 'incubate' | 'mentor' | 'support' | 'spread'

// ----------------------------------------------------------------------------

export interface User {
  id: string
  email: string
  phone: string
  fullName: string
  role: Role
  district: District
  status: 'active' | 'suspended'
  createdAt: string
}

export interface FounderApplication {
  id: string
  userId: string
  // denormalised contact for the admin table (a real backend joins users)
  fullName: string
  email: string
  phone: string
  district: District
  ventureName: string | null // null = just an idea
  stage: FounderStage
  sector: Sector
  oneLiner: string // ≤140
  problem: string
  whatBuilt: string
  teamSize: number
  lookingFor: LookingFor[]
  capitalContext: string // "what would you use support for" — never an amount
  links: string
  videoUrl: string | null // optional "your story" — retained feature
  videoDuration: number | null
  consentShareWithMentors: boolean
  consentDataProcessing: boolean
  consentCampaignUpdates: boolean
  internalStatus: InternalStatus // NEVER exposed to the applicant
  createdAt: string
}

export interface MentorProfile {
  id: string
  userId: string
  fullName: string
  email: string
  phone: string
  expertiseAreas: string[]
  sectors: Sector[]
  roleCompany: string
  yearsExperience: number
  capacity: number
  linkedin: string
  bio: string
  approvalStatus: ApprovalStatus
  createdAt: string
}

export interface InvestorProfile {
  id: string
  userId: string
  fullName: string
  email: string
  phone: string
  investorType: InvestorType
  ticketMin: number
  ticketMax: number
  sectors: Sector[]
  stageFocus: FounderStage[]
  firmName: string
  linkedin: string
  approvalStatus: ApprovalStatus
  createdAt: string
}

export interface ExpertProfile {
  id: string
  userId: string
  fullName: string
  email: string
  phone: string
  domain: string
  contribution: Contribution[]
  bio: string
  linkedin: string
  approvalStatus: ApprovalStatus
  createdAt: string
}

export interface BookOrder {
  id: string
  buyerName: string
  buyerEmail: string
  buyerPhone: string
  format: BookFormat
  quantity: number
  amount: number
  shippingAddress: string | null // null for ebook
  paymentGateway: 'razorpay'
  paymentId: string
  paymentStatus: PaymentStatus
  fulfillmentStatus: FulfillmentStatus
  consentCampaignUpdates: boolean
  createdAt: string
}

export interface Pledge {
  id: string
  name: string
  email: string
  phone: string
  district: District
  commitment: Commitment[]
  consentCampaignUpdates: boolean
  createdAt: string
}

// V2 — stubbed so the admin "Matches" tab and future work have a shape.
export interface Match {
  id: string
  founderApplicationId: string
  counterpartUserId: string
  type: 'mentor' | 'investor'
  status: 'interest' | 'admin_approved' | 'connected' | 'declined'
  initiatedBy: 'mentor' | 'investor' | 'admin'
  createdAt: string
}

export interface StoreShape {
  users: User[]
  founderApplications: FounderApplication[]
  mentorProfiles: MentorProfile[]
  investorProfiles: InvestorProfile[]
  expertProfiles: ExpertProfile[]
  bookOrders: BookOrder[]
  pledges: Pledge[]
  matches: Match[]
}
