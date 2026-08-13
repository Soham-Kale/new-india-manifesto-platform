'use client'

import { createContext, useContext, useCallback, type ReactNode } from 'react'
import type { User, Role, Identity, District } from './types'
import { authClient, clearBearerToken, getBearerToken } from './auth-client'

interface SignInInput {
  email: string
  fullName?: string
  phone?: string
  role?: Role
  district?: District
}

interface BackendUser {
  id: string
  email: string
  fullName?: string
  role: Role
  district?: District
  status?: 'active' | 'suspended'
}

interface MockAuthContextValue {
  currentUser: User | null
  identity: Identity
  token: string | null
  ready: boolean
  signIn: (input: SignInInput) => User
  signInWithSession: (session: { accessToken: string; user: BackendUser }) => User
  switchRole: (identity: Identity) => void
  logout: () => void
}

const MockAuthContext = createContext<MockAuthContextValue | null>(null)

// Map a Better Auth session user to the app's User shape.
function toUser(u: Record<string, unknown>): User {
  const email = String(u.email ?? '')
  return {
    id: String(u.id ?? ''),
    email,
    phone: String(u.phone ?? ''),
    fullName: String(u.name ?? '') || email.split('@')[0],
    role: (u.role as Role) ?? 'founder',
    district: (u.district as District) ?? 'other',
    status: (u.status as 'active' | 'suspended') ?? 'active',
    createdAt: String(u.createdAt ?? new Date().toISOString()),
  }
}

export function MockAuthProvider({ children }: { children: ReactNode }) {
  // Better Auth's reactive session (bearer token in localStorage).
  const { data: session, isPending } = authClient.useSession()

  const currentUser = session?.user ? toUser(session.user as Record<string, unknown>) : null
  const identity: Identity = currentUser?.role ?? 'guest'
  const token = getBearerToken()

  const logout = useCallback(() => {
    authClient.signOut().catch(() => {})
    clearBearerToken()
  }, [])

  // Legacy no-ops kept so older callers don't break. Real sign-in now happens
  // through authClient in the login page; the session hook above updates state.
  const signInWithSession = useCallback(
    (s: { accessToken: string; user: BackendUser }): User => ({
      id: s.user.id,
      email: s.user.email,
      phone: '',
      fullName: s.user.fullName ?? s.user.email.split('@')[0],
      role: s.user.role,
      district: s.user.district ?? 'other',
      status: s.user.status ?? 'active',
      createdAt: new Date().toISOString(),
    }),
    [],
  )
  const signIn = useCallback((input: SignInInput): User => {
    return {
      id: `usr_${input.email.split('@')[0]}`,
      email: input.email,
      phone: input.phone ?? '',
      fullName: input.fullName ?? input.email.split('@')[0],
      role: input.role ?? 'founder',
      district: input.district ?? 'other',
      status: 'active',
      createdAt: new Date().toISOString(),
    }
  }, [])
  const switchRole = useCallback(() => {}, [])

  return (
    <MockAuthContext.Provider
      value={{
        currentUser,
        identity,
        token,
        ready: !isPending,
        signIn,
        signInWithSession,
        switchRole,
        logout,
      }}
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
