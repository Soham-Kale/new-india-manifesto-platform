'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from 'react'
import type {
  StoreShape,
  FounderApplication,
  MentorProfile,
  InvestorProfile,
  ExpertProfile,
  BookOrder,
  Pledge,
  Match,
  InternalStatus,
  ApprovalStatus,
  FulfillmentStatus,
} from './types'
import { loadStore, saveStore, resetStore, emptyStore, newId, nowIso } from './store'
import { api, apiEnabled } from './api'

type NewFounder = Omit<FounderApplication, 'id' | 'createdAt' | 'internalStatus'>
type NewMentor = Omit<MentorProfile, 'id' | 'createdAt' | 'approvalStatus'>
type NewInvestor = Omit<InvestorProfile, 'id' | 'createdAt' | 'approvalStatus'>
type NewExpert = Omit<ExpertProfile, 'id' | 'createdAt' | 'approvalStatus'>
type NewOrder = Omit<
  BookOrder,
  'id' | 'createdAt' | 'paymentGateway' | 'paymentId' | 'paymentStatus' | 'fulfillmentStatus'
> & { paymentId?: string }
type NewPledge = Omit<Pledge, 'id' | 'createdAt'>
type NewMatch = Pick<
  Match,
  'founderApplicationId' | 'counterpartUserId' | 'type' | 'initiatedBy'
>

type CreateResult<T> =
  | { ok: true; record: T }
  | { ok: false; reason: 'already_applied'; existing: T }

interface MockDataContextValue {
  store: StoreShape
  ready: boolean
  findFounderByEmail: (email: string) => FounderApplication | undefined
  addFounderApplication: (input: NewFounder) => Promise<CreateResult<FounderApplication>>
  addMentorProfile: (input: NewMentor) => MentorProfile
  addInvestorProfile: (input: NewInvestor) => InvestorProfile
  addExpertProfile: (input: NewExpert) => ExpertProfile
  addBookOrder: (input: NewOrder) => BookOrder
  addPledge: (input: NewPledge) => Pledge
  setFounderStatus: (id: string, status: InternalStatus) => void
  setApprovalStatus: (
    kind: 'mentor' | 'investor' | 'expert',
    id: string,
    status: ApprovalStatus,
  ) => void
  setOrderFulfillment: (id: string, status: FulfillmentStatus) => void
  createMatch: (input: NewMatch) => Match
  setMatchStatus: (id: string, status: Match['status']) => void
  reset: () => void
}

const MockDataContext = createContext<MockDataContextValue | null>(null)

export function MockDataProvider({ children }: { children: ReactNode }) {
  const [store, setStore] = useState<StoreShape>(emptyStore)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setStore(loadStore())
    setReady(true)
  }, [])

  useEffect(() => {
    if (ready) saveStore(store)
  }, [store, ready])

  const findFounderByEmail = useCallback(
    (email: string) =>
      store.founderApplications.find(
        (a) => a.email.trim().toLowerCase() === email.trim().toLowerCase(),
      ),
    [store.founderApplications],
  )

  const makeFounderRecord = useCallback((input: NewFounder): FounderApplication => {
    const record: FounderApplication = {
      ...input,
      id: newId('fa'),
      internalStatus: 'received',
      createdAt: nowIso(),
    }
    setStore((s) => ({ ...s, founderApplications: [record, ...s.founderApplications] }))
    return record
  }, [])

  const addFounderApplication = useCallback(
    async (input: NewFounder): Promise<CreateResult<FounderApplication>> => {
      // When the backend is connected it is the source of truth for dedup
      // (works across devices, not just this browser).
      if (apiEnabled()) {
        const res = await api.submitFounder({
          fullName: input.fullName,
          email: input.email,
          phone: input.phone,
          district: input.district,
          ventureName: input.ventureName,
          stage: input.stage,
          sector: input.sector,
          oneLiner: input.oneLiner,
          problem: input.problem,
          whatBuilt: input.whatBuilt,
          teamSize: input.teamSize,
          lookingFor: input.lookingFor,
          capitalContext: input.capitalContext,
          links: input.links,
          videoUrl: input.videoUrl,
          consentDataProcessing: input.consentDataProcessing,
          consentShareWithMentors: input.consentShareWithMentors,
          consentCampaignUpdates: input.consentCampaignUpdates,
        })
        const code = res.error && typeof res.error === 'object' ? res.error.code : undefined
        if (res.status === 409 || code === 'already_applied') {
          const existing =
            store.founderApplications.find(
              (a) => a.email.trim().toLowerCase() === input.email.trim().toLowerCase(),
            ) ?? ({ ...input, id: '', internalStatus: 'received', createdAt: nowIso() } as FounderApplication)
          return { ok: false, reason: 'already_applied', existing }
        }
        // Success, or a transient backend error → optimistically record locally.
        return { ok: true, record: makeFounderRecord(input) }
      }

      // No backend configured: local (per-browser) dedup.
      const existing = store.founderApplications.find(
        (a) => a.email.trim().toLowerCase() === input.email.trim().toLowerCase(),
      )
      if (existing) return { ok: false, reason: 'already_applied', existing }
      return { ok: true, record: makeFounderRecord(input) }
    },
    [store.founderApplications, makeFounderRecord],
  )

  const addMentorProfile = useCallback((input: NewMentor): MentorProfile => {
    const record: MentorProfile = {
      ...input,
      id: newId('mp'),
      approvalStatus: 'pending',
      createdAt: nowIso(),
    }
    setStore((s) => ({ ...s, mentorProfiles: [record, ...s.mentorProfiles] }))
    void api.submitMentor({
      fullName: input.fullName,
      email: input.email,
      phone: input.phone,
      expertiseAreas: input.expertiseAreas,
      sectors: input.sectors,
      roleCompany: input.roleCompany,
      yearsExperience: input.yearsExperience,
      capacity: input.capacity,
      linkedin: input.linkedin,
      bio: input.bio,
      consent: true, // the form enforces consent before this runs
    })
    return record
  }, [])

  const addInvestorProfile = useCallback((input: NewInvestor): InvestorProfile => {
    const record: InvestorProfile = {
      ...input,
      id: newId('ip'),
      approvalStatus: 'pending',
      createdAt: nowIso(),
    }
    setStore((s) => ({ ...s, investorProfiles: [record, ...s.investorProfiles] }))
    void api.submitInvestor({
      fullName: input.fullName,
      email: input.email,
      phone: input.phone,
      investorType: input.investorType,
      ticketMin: input.ticketMin,
      ticketMax: input.ticketMax,
      sectors: input.sectors,
      stageFocus: input.stageFocus,
      firmName: input.firmName,
      linkedin: input.linkedin,
      consent: true,
    })
    return record
  }, [])

  const addExpertProfile = useCallback((input: NewExpert): ExpertProfile => {
    const record: ExpertProfile = {
      ...input,
      id: newId('ep'),
      approvalStatus: 'pending',
      createdAt: nowIso(),
    }
    setStore((s) => ({ ...s, expertProfiles: [record, ...s.expertProfiles] }))
    void api.submitExpert({
      fullName: input.fullName,
      email: input.email,
      phone: input.phone,
      domain: input.domain,
      contribution: input.contribution,
      bio: input.bio,
      linkedin: input.linkedin,
      consent: true,
    })
    return record
  }, [])

  const addBookOrder = useCallback((input: NewOrder): BookOrder => {
    const record: BookOrder = {
      ...input,
      id: newId('bo'),
      paymentGateway: 'razorpay',
      paymentId: input.paymentId ?? newId('pay'),
      paymentStatus: 'paid',
      fulfillmentStatus: input.format === 'ebook' ? 'delivered' : 'pending',
      createdAt: nowIso(),
    }
    setStore((s) => ({ ...s, bookOrders: [record, ...s.bookOrders] }))
    return record
  }, [])

  const addPledge = useCallback((input: NewPledge): Pledge => {
    const record: Pledge = { ...input, id: newId('pl'), createdAt: nowIso() }
    setStore((s) => ({ ...s, pledges: [record, ...s.pledges] }))
    void api.submitPledge({
      name: input.name,
      email: input.email,
      phone: input.phone,
      district: input.district,
      commitment: input.commitment,
      consent: input.consentCampaignUpdates,
    })
    return record
  }, [])

  const setFounderStatus = useCallback((id: string, status: InternalStatus) => {
    setStore((s) => ({
      ...s,
      founderApplications: s.founderApplications.map((a) =>
        a.id === id ? { ...a, internalStatus: status } : a,
      ),
    }))
  }, [])

  const setApprovalStatus = useCallback(
    (kind: 'mentor' | 'investor' | 'expert', id: string, status: ApprovalStatus) => {
      setStore((s) => {
        const key =
          kind === 'mentor'
            ? 'mentorProfiles'
            : kind === 'investor'
              ? 'investorProfiles'
              : 'expertProfiles'
        return {
          ...s,
          [key]: (s[key] as { id: string; approvalStatus: ApprovalStatus }[]).map((p) =>
            p.id === id ? { ...p, approvalStatus: status } : p,
          ),
        }
      })
    },
    [],
  )

  const setOrderFulfillment = useCallback((id: string, status: FulfillmentStatus) => {
    setStore((s) => ({
      ...s,
      bookOrders: s.bookOrders.map((o) =>
        o.id === id ? { ...o, fulfillmentStatus: status } : o,
      ),
    }))
  }, [])

  const createMatch = useCallback((input: NewMatch): Match => {
    // Guard against a duplicate interest for the same founder + counterpart + type.
    const existing = store.matches.find(
      (m) =>
        m.founderApplicationId === input.founderApplicationId &&
        m.counterpartUserId === input.counterpartUserId &&
        m.type === input.type,
    )
    if (existing) return existing
    const record: Match = {
      ...input,
      id: newId('mt'),
      status: 'interest',
      createdAt: nowIso(),
    }
    setStore((s) => ({ ...s, matches: [record, ...s.matches] }))
    return record
  }, [store.matches])

  const setMatchStatus = useCallback((id: string, status: Match['status']) => {
    setStore((s) => ({
      ...s,
      matches: s.matches.map((m) => (m.id === id ? { ...m, status } : m)),
    }))
  }, [])

  const reset = useCallback(() => setStore(resetStore()), [])

  return (
    <MockDataContext.Provider
      value={{
        store,
        ready,
        findFounderByEmail,
        addFounderApplication,
        addMentorProfile,
        addInvestorProfile,
        addExpertProfile,
        addBookOrder,
        addPledge,
        setFounderStatus,
        setApprovalStatus,
        setOrderFulfillment,
        createMatch,
        setMatchStatus,
        reset,
      }}
    >
      {children}
    </MockDataContext.Provider>
  )
}

export function useMockData(): MockDataContextValue {
  const ctx = useContext(MockDataContext)
  if (!ctx) throw new Error('useMockData must be used within MockDataProvider')
  return ctx
}
