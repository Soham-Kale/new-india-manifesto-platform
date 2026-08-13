'use client'

import { createAuthClient } from 'better-auth/react'
import { emailOTPClient, adminClient } from 'better-auth/client/plugins'

// The backend origin (Express + Better Auth). Better Auth appends /api/auth.
const BASE = (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/$/, '')

const TOKEN_KEY = 'bearer_token'

// Frontend and backend are on different domains, so we use bearer tokens (not
// cookies): store the token returned on sign-in and send it on every request.
export const authClient = createAuthClient({
  baseURL: BASE,
  plugins: [emailOTPClient(), adminClient()],
  fetchOptions: {
    auth: {
      type: 'Bearer',
      token: () => (typeof window !== 'undefined' ? localStorage.getItem(TOKEN_KEY) || '' : ''),
    },
    onSuccess: (ctx) => {
      const t = ctx.response.headers.get('set-auth-token')
      if (t && typeof window !== 'undefined') localStorage.setItem(TOKEN_KEY, t)
    },
  },
})

export function getBearerToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(TOKEN_KEY)
}

export function clearBearerToken(): void {
  if (typeof window !== 'undefined') localStorage.removeItem(TOKEN_KEY)
}
