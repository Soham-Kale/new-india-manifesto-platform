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
  InternalStatus,
  ApprovalStatus,
  FulfillmentStatus,
} from './types'
import { loadStore, saveStore, resetStore, emptyStore, newId, nowIso } from './store'

type NewFounder = Omit<FounderApplication, 'id' | 'createdAt' | 'internalStatus'>
type NewMentor = Omit<MentorProfile, 'id' | 'createdAt' | 'approvalStatus'>
type NewInvestor = Omit<InvestorProfile, 'id' | 'createdAt' | 'approvalStatus'>
type NewExpert = Omit<ExpertProfile, 'id' | 'createdAt' | 'approvalStatus'>
type NewOrder = Omit<
  BookOrder,
  'id' | 'createdAt' | 'paymentGateway' | 'paymentId' | 'paymentStatus' | 'fulfillmentStatus'
>
type NewPledge = Omit<Pledge, 'id' | 'createdAt'>

type CreateResult<T> =
  | { ok: true; record: T }
  | { ok: false; reason: 'already_applied'; existing: T }

interface MockDataContextValue {
  store: StoreShape
  ready: boolean
  findFounderByEmail: (email: string) => FounderApplication | undefined
  addFounderApplication: (input: NewFounder) => CreateResult<FounderApplication>
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

  const addFounderApplication = useCallback(
    (input: NewFounder): CreateResult<FounderApplication> => {
      const existing = store.founderApplications.find(
        (a) => a.email.trim().toLowerCase() === input.email.trim().toLowerCase(),
      )
      if (existing) return { ok: false, reason: 'already_applied', existing }
      const record: FounderApplication = {
        ...input,
        id: newId('fa'),
        internalStatus: 'received',
        createdAt: nowIso(),
      }
      setStore((s) => ({
        ...s,
        founderApplications: [record, ...s.founderApplications],
      }))
      return { ok: true, record }
    },
    [store.founderApplications],
  )

  const addMentorProfile = useCallback((input: NewMentor): MentorProfile => {
    const record: MentorProfile = {
      ...input,
      id: newId('mp'),
      approvalStatus: 'pending',
      createdAt: nowIso(),
    }
    setStore((s) => ({ ...s, mentorProfiles: [record, ...s.mentorProfiles] }))
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
    return record
  }, [])

  const addBookOrder = useCallback((input: NewOrder): BookOrder => {
    const record: BookOrder = {
      ...input,
      id: newId('bo'),
      paymentGateway: 'razorpay',
      paymentId: newId('pay'),
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
