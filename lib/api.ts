// Thin client for the nim-api backend.
// When NEXT_PUBLIC_API_URL is set, form submissions are persisted to the real
// backend (MongoDB). When it is unset, every call is a no-op so the site keeps
// working in mock-only mode (e.g. before the backend is deployed).

const BASE = (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/$/, '')

export function apiEnabled(): boolean {
  return BASE.length > 0
}

type ApiResult = {
  ok: boolean
  status?: number
  skipped?: boolean
  data?: unknown
  error?: { code?: string; message?: string } | string
}

async function request(method: string, path: string, body?: unknown, token?: string): Promise<ApiResult> {
  if (!BASE) return { ok: false, skipped: true }
  try {
    const res = await fetch(`${BASE}/api/v1${path}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    })
    const json = (await res.json().catch(() => ({}))) as Record<string, unknown>
    return { ok: res.ok, status: res.status, ...json } as ApiResult
  } catch (err) {
    // Network/CORS failure — never throw into the UI; the mock layer already
    // gave the user a success state.
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.warn(`[api] ${method} ${path} failed:`, err)
    }
    return { ok: false, error: String(err) }
  }
}

export const api = {
  // Public application/pledge submissions.
  submitFounder: (p: Record<string, unknown>) => request('POST', '/applications/founder', p),
  submitMentor: (p: Record<string, unknown>) => request('POST', '/applications/mentor', p),
  submitInvestor: (p: Record<string, unknown>) => request('POST', '/applications/investor', p),
  submitExpert: (p: Record<string, unknown>) => request('POST', '/applications/expert', p),
  submitPledge: (p: Record<string, unknown>) => request('POST', '/pledge', p),

  // Auth (email OTP → JWT).
  requestOtp: (email: string) => request('POST', '/auth/otp/request', { email }),
  verifyOtp: (email: string, code: string) => request('POST', '/auth/otp/verify', { email, code }),
  adminLogin: (email: string, password: string) =>
    request('POST', '/auth/admin/login', { email, password }),
  me: (token: string) => request('GET', '/auth/me', undefined, token),

  // A founder's own application status (public status only).
  founderStatus: (token: string) => request('GET', '/applications/founder/me', undefined, token),

  // ── Admin control room (all require an admin JWT) ───────────────────────
  adminOverview: (token: string) => request('GET', '/admin/overview', undefined, token),
  adminList: (token: string, collection: string, search = '') =>
    request(
      'GET',
      `/admin/${collection}${search ? `?search=${encodeURIComponent(search)}` : ''}`,
      undefined,
      token,
    ),
  adminSetFounderStatus: (token: string, id: string, status: string) =>
    request('PATCH', `/admin/founders/${id}/status`, { status }, token),
  adminSetApproval: (token: string, kind: 'mentor' | 'investor' | 'expert', id: string, status: string) =>
    request('PATCH', `/admin/${kind}/${id}/approval`, { status }, token),
  adminSetMatchStatus: (token: string, id: string, status: string) =>
    request('PATCH', `/admin/matches/${id}/status`, { status }, token),

  // ── Mentor / investor deal-flow ─────────────────────────────────────────
  listFounders: (token: string, search = '', sector = '') => {
    const qs = new URLSearchParams()
    if (search) qs.set('search', search)
    if (sector) qs.set('sector', sector)
    const suffix = qs.toString() ? `?${qs.toString()}` : ''
    return request('GET', `/founders${suffix}`, undefined, token)
  },
  expressInterest: (token: string, founderApplicationId: string) =>
    request('POST', '/matches', { founderApplicationId }, token),
  myMatches: (token: string) => request('GET', '/matches/mine', undefined, token),
}
