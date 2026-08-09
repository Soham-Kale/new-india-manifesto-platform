'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from 'react'
import type { User, Role, Identity, District } from './types'

const KEY = 'nim.auth.v1'

interface SignInInput {
  email: string
  fullName?: string
  phone?: string
  role?: Role
  district?: District
}

interface MockAuthContextValue {
  currentUser: User | null
  identity: Identity
  ready: boolean
  signIn: (input: SignInInput) => User
  switchRole: (identity: Identity) => void
  logout: () => void
}

const MockAuthContext = createContext<MockAuthContextValue | null>(null)

const DEMO_USERS: Record<Role, User> = {
  admin: {
    id: 'usr_admin',
    email: 'admin@newindiamanifesto.in',
    phone: '+91 82087 37624',
    fullName: 'Control Room',
    role: 'admin',
    district: 'solapur',
    status: 'active',
    createdAt: '2026-06-01T09:00:00.000Z',
  },
  founder: {
    id: 'usr_f1',
    email: 'sanika@shivardairy.in',
    phone: '+91 90210 11223',
    fullName: 'Sanika Pawar',
    role: 'founder',
    district: 'solapur',
    status: 'active',
    createdAt: '2026-07-02T09:00:00.000Z',
  },
  mentor: {
    id: 'usr_m1',
    email: 'meera@agritechlab.in',
    phone: '+91 98220 10101',
    fullName: 'Dr. Meera Kulkarni',
    role: 'mentor',
    district: 'pune',
    status: 'active',
    createdAt: '2026-06-15T09:00:00.000Z',
  },
  investor: {
    id: 'usr_i1',
    email: 'anjali@deccanangels.in',
    phone: '+91 98110 50505',
    fullName: 'Anjali Mehta',
    role: 'investor',
    district: 'pune',
    status: 'active',
    createdAt: '2026-06-20T09:00:00.000Z',
  },
  expert: {
    id: 'usr_e1',
    email: 'sunita@agriuniv.in',
    phone: '+91 98220 80808',
    fullName: 'Prof. Sunita Deshmukh',
    role: 'expert',
    district: 'solapur',
    status: 'active',
    createdAt: '2026-06-19T09:00:00.000Z',
  },
}

export function MockAuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEY)
      if (raw) setCurrentUser(JSON.parse(raw) as User)
    } catch {
      /* ignore */
    }
    setReady(true)
  }, [])

  const persist = useCallback((user: User | null) => {
    setCurrentUser(user)
    try {
      if (user) window.localStorage.setItem(KEY, JSON.stringify(user))
      else window.localStorage.removeItem(KEY)
    } catch {
      /* ignore */
    }
  }, [])

  const signIn = useCallback(
    (input: SignInInput): User => {
      const user: User = {
        id: `usr_${input.email.split('@')[0]}`,
        email: input.email,
        phone: input.phone ?? '',
        fullName: input.fullName ?? input.email.split('@')[0],
        role: input.role ?? 'founder',
        district: input.district ?? 'other',
        status: 'active',
        createdAt: new Date().toISOString(),
      }
      persist(user)
      return user
    },
    [persist],
  )

  const switchRole = useCallback(
    (identity: Identity) => {
      if (identity === 'guest') persist(null)
      else persist(DEMO_USERS[identity])
    },
    [persist],
  )

  const logout = useCallback(() => persist(null), [persist])

  const identity: Identity = currentUser?.role ?? 'guest'

  return (
    <MockAuthContext.Provider
      value={{ currentUser, identity, ready, signIn, switchRole, logout }}
    >
      {children}
    </MockAuthContext.Provider>
  )
}

export function useMockAuth(): MockAuthContextValue {
  const ctx = useContext(MockAuthContext)
  if (!ctx) throw new Error('useMockAuth must be used within MockAuthProvider')
  return ctx
}
