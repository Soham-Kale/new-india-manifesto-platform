'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { Download, Lock, Search, ArrowLeft, LogOut, RefreshCw } from 'lucide-react'
import { useMockAuth } from '@/lib/MockAuthProvider'
import { api, apiEnabled } from '@/lib/api'
import { downloadCsv } from '@/lib/store'
import {
  INTERNAL_STATUSES,
  APPROVAL_STATUSES,
  MATCH_STATUSES,
  labelDistrict,
  labelSector,
  labelStage,
  labelInvestorType,
  labelCommitment,
  labelContribution,
} from '@/lib/options'
import Button from '@/components/ui/Button'

const backend = apiEnabled()

type Tab = 'overview' | 'founders' | 'mentors' | 'investors' | 'experts' | 'pledges' | 'matches'

const TABS: { id: Tab; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'founders', label: 'Founders' },
  { id: 'mentors', label: 'Mentors' },
  { id: 'investors', label: 'Investors' },
  { id: 'experts', label: 'Experts' },
  { id: 'pledges', label: 'Pledges' },
  { id: 'matches', label: 'Matches' },
]

// Backend rows are plain objects that mirror the model fields + an `id`.
type Row = Record<string, unknown>

interface Overview {
  counts: Record<Tab, number> | Record<string, number>
  funnel: Record<string, number>
  pendingApprovals: Record<string, number>
}

function localFilter(q: string, ...fields: (string | undefined)[]): boolean {
  if (!q.trim()) return true
  const hay = fields.filter(Boolean).join(' ').toLowerCase()
  return hay.includes(q.trim().toLowerCase())
}

const str = (v: unknown) => (v == null ? '' : String(v))
const arr = (v: unknown): string[] => (Array.isArray(v) ? (v as string[]) : [])
const num = (v: unknown) => (typeof v === 'number' ? v : 0)

export default function AdminRoom() {
  const { currentUser, token, ready, logout } = useMockAuth()
  const [tab, setTab] = useState<Tab>('overview')
  const [q, setQ] = useState('')

  const [overview, setOverview] = useState<Overview | null>(null)
  const [rows, setRows] = useState<Row[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const isAdmin = currentUser?.role === 'admin'
  const canQuery = backend && isAdmin && !!token

  const loadOverview = useCallback(async () => {
    if (!canQuery || !token) return
    const res = await api.adminOverview(token)
    if (res.ok && res.data) setOverview(res.data as Overview)
  }, [canQuery, token])

  const loadTab = useCallback(
    async (t: Tab) => {
      if (t === 'overview' || !canQuery || !token) return
      setLoading(true)
      setError('')
      const res = await api.adminList(token, t)
      setLoading(false)
      if (res.ok && Array.isArray(res.data)) setRows(res.data as Row[])
      else {
        setRows([])
        setError('Could not load data from the server.')
      }
    },
    [canQuery, token],
  )

  useEffect(() => {
    if (canQuery) loadOverview()
  }, [canQuery, loadOverview])

  useEffect(() => {
    if (tab !== 'overview') loadTab(tab)
  }, [tab, loadTab])

  const refresh = () => {
    loadOverview()
    if (tab !== 'overview') loadTab(tab)
  }

  // ── Mutations (commit only when the admin clicks "Update") ───────────────
  // Each returns true on success; rows update only after the backend confirms.
  const commitFounder = async (id: string, status: string): Promise<boolean> => {
    if (!token) return false
    const res = await api.adminSetFounderStatus(token, id, status)
    if (!res.ok) return false
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, internalStatus: status } : r)))
    loadOverview()
    return true
  }
  const commitApproval = async (kind: 'mentor' | 'investor' | 'expert', id: string, status: string): Promise<boolean> => {
    if (!token) return false
    const res = await api.adminSetApproval(token, kind, id, status)
    if (!res.ok) return false
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, approvalStatus: status } : r)))
    loadOverview()
    return true
  }
  const commitMatch = async (id: string, status: string): Promise<boolean> => {
    if (!token) return false
    const res = await api.adminSetMatchStatus(token, id, status)
    if (!res.ok) return false
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, status } : r)))
    return true
  }

  const counts = useMemo(() => {
    const c = (overview?.counts ?? {}) as Record<string, number>
    return {
      overview: (c.founders ?? 0) + (c.pledges ?? 0),
      founders: c.founders ?? 0,
      mentors: c.mentors ?? 0,
      investors: c.investors ?? 0,
      experts: c.experts ?? 0,
      pledges: c.pledges ?? 0,
      matches: c.matches ?? 0,
    } as Record<Tab, number>
  }, [overview])

  if (!ready) {
    return <div className="p-10 text-center text-muted">Loading…</div>
  }

  // Route guard — real admin only. No demo bypass.
  if (!isAdmin) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-canvas px-5 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-soft text-accent">
          <Lock className="h-6 w-6" aria-hidden="true" />
        </span>
        <h1 className="mt-5 font-serif text-2xl font-medium text-ink">Admin only</h1>
        <p className="mt-2 max-w-sm text-sm text-muted">
          The control room is restricted to administrators. Please sign in with your admin account.
        </p>
        <div className="mt-6 flex gap-3">
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 rounded-xl bg-ink px-5 py-3 text-sm font-medium text-canvas transition hover:bg-ink/90"
          >
            Admin sign in
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-surface px-5 py-3 text-sm font-medium text-ink transition hover:border-ink/40"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Home
          </Link>
        </div>
      </div>
    )
  }

  const exportCurrent = () => {
    if (rows.length === 0) return
    const clean = rows.map((r) => {
      const { _id, __v, userId, ...rest } = r as Record<string, unknown>
      void _id
      void __v
      void userId
      return rest
    })
    downloadCsv(`${tab}.csv`, clean as Record<string, unknown>[])
  }

  return (
    <div className="min-h-screen bg-canvas">
      {/* Admin top bar */}
      <header className="sticky top-0 z-30 border-b border-line bg-night text-canvas">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 sm:px-8">
          <div>
            <p className="font-serif text-base font-medium">Control Room</p>
            <p className="text-[10px] uppercase tracking-[0.2em] text-canvas/45">
              The New India Manifesto — Admin{currentUser?.email ? ` · ${currentUser.email}` : ''}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={refresh}
              className="hidden items-center gap-1.5 rounded-lg px-3 py-2 text-xs text-canvas/70 transition hover:bg-canvas/10 sm:flex"
            >
              <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" /> Refresh
            </button>
            <Link href="/" className="text-sm text-canvas/80 transition hover:text-accent-ring">
              View site
            </Link>
            <button
              onClick={logout}
              className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs text-canvas/70 transition hover:bg-canvas/10"
            >
              <LogOut className="h-3.5 w-3.5" aria-hidden="true" /> Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
        {!backend && (
          <p className="mb-4 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            The backend API is not configured (NEXT_PUBLIC_API_URL is unset), so no live data can be
            shown here.
          </p>
        )}

        {/* Tabs */}
        <div className="flex flex-wrap gap-2">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                setTab(t.id)
                setQ('')
              }}
              className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition ${
                tab === t.id
                  ? 'border-ink bg-ink text-canvas'
                  : 'border-line bg-surface text-muted hover:border-ink/40 hover:text-ink'
              }`}
            >
              {t.label}
              <span
                className={`rounded-full px-1.5 text-xs tabular-nums ${
                  tab === t.id ? 'bg-canvas/20' : 'bg-line text-muted'
                }`}
              >
                {counts[t.id]}
              </span>
            </button>
          ))}
        </div>

        {tab === 'overview' && <OverviewPanel overview={overview} />}

        {/* Toolbar */}
        {tab !== 'overview' && (
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden="true" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search…"
                className="w-full rounded-xl border border-line bg-surface py-2.5 pl-9 pr-3 text-sm text-ink placeholder:text-muted/60 focus:border-ink"
              />
            </div>
            <Button variant="secondary" onClick={exportCurrent}>
              <Download className="h-4 w-4" aria-hidden="true" /> Export CSV
            </Button>
          </div>
        )}

        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

        {/* Table */}
        {tab !== 'overview' && (
          <div className="mt-4 overflow-x-auto rounded-2xl border border-line bg-surface shadow-card">
            {loading ? (
              <p className="p-10 text-center text-sm text-muted">Loading…</p>
            ) : rows.length === 0 ? (
              <p className="p-10 text-center text-sm text-muted">No records yet.</p>
            ) : (
              <>
                {tab === 'founders' && (
                  <Table head={['Venture', 'Applicant', 'District', 'Sector · Stage', 'Consent', 'Status']}>
                    {rows
                      .filter((a) => localFilter(q, str(a.ventureName), str(a.fullName), str(a.email), str(a.sector)))
                      .map((a) => (
                        <tr key={str(a.id)} className="border-t border-line align-top">
                          <Td>
                            <p className="font-medium text-ink">
                              {a.ventureName ? str(a.ventureName) : <span className="italic text-muted">Just an idea</span>}
                            </p>
                            <p className="max-w-xs text-xs text-muted">{str(a.oneLiner)}</p>
                          </Td>
                          <Td>
                            <p className="text-ink">{str(a.fullName)}</p>
                            <p className="text-xs text-muted">{str(a.email)}</p>
                            <p className="text-xs text-muted">{str(a.phone)}</p>
                          </Td>
                          <Td>{labelDistrict(str(a.district))}</Td>
                          <Td>
                            {labelSector(str(a.sector))}
                            <span className="block text-xs text-muted">{labelStage(str(a.stage))}</span>
                          </Td>
                          <Td>
                            <span className={`rounded-full px-2 py-0.5 text-xs ${a.consentShareWithMentors ? 'bg-success/10 text-success' : 'bg-line text-muted'}`}>
                              {a.consentShareWithMentors ? 'Shareable' : 'Private'}
                            </span>
                          </Td>
                          <Td>
                            <StatusCell
                              current={str(a.internalStatus)}
                              options={INTERNAL_STATUSES}
                              onCommit={(v) => commitFounder(str(a.id), v)}
                            />
                          </Td>
                        </tr>
                      ))}
                  </Table>
                )}

                {tab === 'mentors' && (
                  <Table head={['Name', 'Contact', 'Expertise', 'Sectors', 'Capacity', 'Approval']}>
                    {rows
                      .filter((m) => localFilter(q, str(m.fullName), str(m.email), str(m.roleCompany)))
                      .map((m) => (
                        <tr key={str(m.id)} className="border-t border-line align-top">
                          <Td><p className="font-medium text-ink">{str(m.fullName)}</p><p className="text-xs text-muted">{str(m.roleCompany)}</p></Td>
                          <Td><p className="text-xs text-muted">{str(m.email)}</p><p className="text-xs text-muted">{str(m.phone)}</p></Td>
                          <Td className="max-w-[14rem] text-xs">{arr(m.expertiseAreas).join(', ')}</Td>
                          <Td className="text-xs">{arr(m.sectors).map(labelSector).join(', ')}</Td>
                          <Td>{num(m.capacity)}</Td>
                          <Td><StatusCell current={str(m.approvalStatus)} options={APPROVAL_STATUSES} onCommit={(v) => commitApproval('mentor', str(m.id), v)} /></Td>
                        </tr>
                      ))}
                  </Table>
                )}

                {tab === 'investors' && (
                  <Table head={['Name', 'Firm', 'Type', 'Ticket (₹)', 'Sectors', 'Approval']}>
                    {rows
                      .filter((i) => localFilter(q, str(i.fullName), str(i.email), str(i.firmName)))
                      .map((i) => (
                        <tr key={str(i.id)} className="border-t border-line align-top">
                          <Td><p className="font-medium text-ink">{str(i.fullName)}</p><p className="text-xs text-muted">{str(i.email)}</p></Td>
                          <Td>{str(i.firmName)}</Td>
                          <Td>{labelInvestorType(str(i.investorType))}</Td>
                          <Td className="text-xs">{num(i.ticketMin).toLocaleString('en-IN')}–{num(i.ticketMax).toLocaleString('en-IN')}</Td>
                          <Td className="text-xs">{arr(i.sectors).map(labelSector).join(', ')}</Td>
                          <Td><StatusCell current={str(i.approvalStatus)} options={APPROVAL_STATUSES} onCommit={(v) => commitApproval('investor', str(i.id), v)} /></Td>
                        </tr>
                      ))}
                  </Table>
                )}

                {tab === 'experts' && (
                  <Table head={['Name', 'Contact', 'Domain', 'Contribution', 'Approval']}>
                    {rows
                      .filter((e) => localFilter(q, str(e.fullName), str(e.email), str(e.domain)))
                      .map((e) => (
                        <tr key={str(e.id)} className="border-t border-line align-top">
                          <Td><p className="font-medium text-ink">{str(e.fullName)}</p></Td>
                          <Td><p className="text-xs text-muted">{str(e.email)}</p><p className="text-xs text-muted">{str(e.phone)}</p></Td>
                          <Td>{str(e.domain)}</Td>
                          <Td className="text-xs">{arr(e.contribution).map(labelContribution).join(', ')}</Td>
                          <Td><StatusCell current={str(e.approvalStatus)} options={APPROVAL_STATUSES} onCommit={(v) => commitApproval('expert', str(e.id), v)} /></Td>
                        </tr>
                      ))}
                  </Table>
                )}

                {tab === 'pledges' && (
                  <Table head={['Name', 'Contact', 'District', 'Commitment']}>
                    {rows
                      .filter((p) => localFilter(q, str(p.name), str(p.email), str(p.phone)))
                      .map((p) => (
                        <tr key={str(p.id)} className="border-t border-line align-top">
                          <Td><p className="font-medium text-ink">{str(p.name)}</p></Td>
                          <Td><p className="text-xs text-muted">{str(p.email)}</p><p className="text-xs text-muted">{str(p.phone)}</p></Td>
                          <Td>{labelDistrict(str(p.district))}</Td>
                          <Td className="text-xs">{arr(p.commitment).map(labelCommitment).join(', ')}</Td>
                        </tr>
                      ))}
                  </Table>
                )}

                {tab === 'matches' && (
                  <Table head={['Founder application', 'Counterpart', 'Type', 'Initiated by', 'Status']}>
                    {rows.map((m) => (
                      <tr key={str(m.id)} className="border-t border-line align-top">
                        <Td className="font-mono text-xs text-muted">{str(m.founderApplicationId)}</Td>
                        <Td className="font-mono text-xs text-muted">{str(m.counterpartUserId)}</Td>
                        <Td className="capitalize">{str(m.type)}</Td>
                        <Td className="capitalize text-muted">{str(m.initiatedBy)}</Td>
                        <Td>
                          <StatusCell
                            current={str(m.status)}
                            options={MATCH_STATUSES}
                            onCommit={(v) => commitMatch(str(m.id), v)}
                          />
                        </Td>
                      </tr>
                    ))}
                  </Table>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function OverviewPanel({ overview }: { overview: Overview | null }) {
  const c = (overview?.counts ?? {}) as Record<string, number>
  const funnel = overview?.funnel ?? {}
  const pending = overview?.pendingApprovals ?? {}

  const shortlisted = (funnel.shortlisted ?? 0) + (funnel.matched ?? 0)
  const matched = funnel.matched ?? 0

  const tiles = [
    { label: 'Pledges', value: c.pledges ?? 0 },
    { label: 'Founder applications', value: c.founders ?? 0 },
    { label: 'Shortlisted', value: shortlisted },
    { label: 'Matched', value: matched },
    { label: 'Mentors / Investors / Experts', value: (c.mentors ?? 0) + (c.investors ?? 0) + (c.experts ?? 0) },
    { label: 'Pending approvals', value: (pending.mentor ?? 0) + (pending.investor ?? 0) + (pending.expert ?? 0) },
    { label: 'Active matches', value: c.matches ?? 0 },
  ]

  const bars = [
    { label: 'Pledged', n: c.pledges ?? 0 },
    { label: 'Applied (founders)', n: c.founders ?? 0 },
    { label: 'Shortlisted', n: shortlisted },
    { label: 'Matched', n: matched },
  ]
  const max = Math.max(...bars.map((f) => f.n), 1)

  return (
    <div className="mt-6 space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {tiles.map((t) => (
          <div key={t.label} className="rounded-2xl border border-line bg-surface p-5 shadow-sm">
            <p className="font-serif text-3xl font-medium text-ink">{t.value}</p>
            <p className="mt-1 text-xs text-muted">{t.label}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-line bg-surface p-6 shadow-card">
        <p className="text-sm font-medium text-ink">Funnel</p>
        <div className="mt-4 space-y-3">
          {bars.map((f) => (
            <div key={f.label} className="flex items-center gap-3">
              <span className="w-40 shrink-0 text-sm text-muted">{f.label}</span>
              <div className="h-6 flex-1 overflow-hidden rounded-full bg-line">
                <div
                  className="flex h-full items-center justify-end rounded-full bg-accent px-2 text-xs font-medium text-canvas transition-all"
                  style={{ width: `${Math.max((f.n / max) * 100, 8)}%` }}
                >
                  {f.n}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Table({ head, children }: { head: string[]; children: React.ReactNode }) {
  return (
    <table className="w-full min-w-[720px] text-left text-sm">
      <thead>
        <tr className="bg-canvas/60">
          {head.map((h) => (
            <th key={h} className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  )
}

function Td({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <td className={`px-4 py-3 text-ink ${className}`}>{children}</td>
}

// Dropdown that does NOT auto-save. The admin picks a status, an "Update" button
// appears, and only on click does it persist to the DB (and email the applicant).
function StatusCell({
  current,
  options,
  onCommit,
}: {
  current: string
  options: { value: string; label: string }[]
  onCommit: (v: string) => Promise<boolean>
}) {
  const [value, setValue] = useState(current)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [failed, setFailed] = useState(false)

  // Re-sync when the saved value changes (after a successful commit or a reload).
  useEffect(() => {
    setValue(current)
  }, [current])

  const changed = value !== current

  const commit = async () => {
    setSaving(true)
    setSaved(false)
    setFailed(false)
    const ok = await onCommit(value)
    setSaving(false)
    if (ok) {
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    } else {
      setFailed(true)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <select
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
          setFailed(false)
        }}
        className="rounded-lg border border-line bg-surface px-2.5 py-1.5 text-xs font-medium text-ink focus:border-ink"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>

      {changed && !saving && (
        <button
          type="button"
          onClick={commit}
          className="rounded-lg bg-ink px-2.5 py-1.5 text-xs font-medium text-canvas transition hover:bg-ink/90"
        >
          Update
        </button>
      )}
      {saving && <span className="text-xs text-muted">Updating…</span>}
      {saved && !changed && <span className="text-xs font-medium text-success">✓ Saved</span>}
      {failed && <span className="text-xs font-medium text-red-600">Failed — retry</span>}
    </div>
  )
}
