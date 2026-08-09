'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Download, Lock, Search, RotateCcw, ArrowLeft } from 'lucide-react'
import { useMockAuth } from '@/lib/MockAuthProvider'
import { useMockData } from '@/lib/MockDataProvider'
import { downloadCsv } from '@/lib/store'
import {
  INTERNAL_STATUSES,
  APPROVAL_STATUSES,
  FULFILLMENT_STATUSES,
  MATCH_STATUSES,
  labelDistrict,
  labelSector,
  labelStage,
  labelInvestorType,
  labelCommitment,
  labelContribution,
} from '@/lib/options'
import type {
  InternalStatus,
  ApprovalStatus,
  FulfillmentStatus,
  Match,
} from '@/lib/types'
import Button from '@/components/ui/Button'

type Tab = 'overview' | 'founders' | 'mentors' | 'investors' | 'experts' | 'pledges' | 'orders' | 'matches'

const TABS: { id: Tab; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'founders', label: 'Founders' },
  { id: 'mentors', label: 'Mentors' },
  { id: 'investors', label: 'Investors' },
  { id: 'experts', label: 'Experts' },
  { id: 'pledges', label: 'Pledges' },
  { id: 'orders', label: 'Book Orders' },
  { id: 'matches', label: 'Matches' },
]

function matches(q: string, ...fields: (string | undefined)[]): boolean {
  if (!q.trim()) return true
  const hay = fields.filter(Boolean).join(' ').toLowerCase()
  return hay.includes(q.trim().toLowerCase())
}

export default function AdminRoom() {
  const { identity, ready, switchRole } = useMockAuth()
  const {
    store,
    ready: dataReady,
    setFounderStatus,
    setApprovalStatus,
    setOrderFulfillment,
    setMatchStatus,
    reset,
  } = useMockData()
  const [tab, setTab] = useState<Tab>('overview')
  const [q, setQ] = useState('')

  const counts = useMemo(
    () => ({
      overview: store.founderApplications.length + store.pledges.length,
      founders: store.founderApplications.length,
      mentors: store.mentorProfiles.length,
      investors: store.investorProfiles.length,
      experts: store.expertProfiles.length,
      pledges: store.pledges.length,
      orders: store.bookOrders.length,
      matches: store.matches.length,
    }),
    [store],
  )

  // Look up a founder's venture + a match counterpart's display name.
  const founderLabel = (id: string) => {
    const a = store.founderApplications.find((f) => f.id === id)
    return a ? a.ventureName || `${a.fullName} (idea)` : id
  }
  const counterpartLabel = (m: Match) => {
    const mentor = store.mentorProfiles.find((p) => p.userId === m.counterpartUserId)
    if (mentor) return `${mentor.fullName} · mentor`
    const inv = store.investorProfiles.find((p) => p.userId === m.counterpartUserId)
    if (inv) return `${inv.fullName} · investor`
    return m.counterpartUserId
  }

  if (!ready || !dataReady) {
    return <div className="p-10 text-center text-muted">Loading…</div>
  }

  // Route guard — admin only (spec §3).
  if (identity !== 'admin') {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-canvas px-5 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-soft text-accent">
          <Lock className="h-6 w-6" aria-hidden="true" />
        </span>
        <h1 className="mt-5 font-serif text-2xl font-medium text-ink">Admin only</h1>
        <p className="mt-2 max-w-sm text-sm text-muted">
          The control room is restricted to administrators. Sign in as an admin, or use the demo
          switcher in the corner.
        </p>
        <div className="mt-6 flex gap-3">
          <Button onClick={() => switchRole('admin')}>Enter as admin (demo)</Button>
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
    if (tab === 'founders')
      downloadCsv(
        'founders.csv',
        store.founderApplications.map((a) => ({
          venture: a.ventureName ?? '(idea)',
          name: a.fullName,
          email: a.email,
          phone: a.phone,
          district: labelDistrict(a.district),
          sector: labelSector(a.sector),
          stage: labelStage(a.stage),
          looking_for: a.lookingFor.join('; '),
          share_consent: a.consentShareWithMentors,
          status: a.internalStatus,
          created: a.createdAt,
        })),
      )
    else if (tab === 'mentors')
      downloadCsv('mentors.csv', store.mentorProfiles.map((m) => ({ name: m.fullName, email: m.email, phone: m.phone, role: m.roleCompany, sectors: m.sectors.join('; '), capacity: m.capacity, status: m.approvalStatus })))
    else if (tab === 'investors')
      downloadCsv('investors.csv', store.investorProfiles.map((i) => ({ name: i.fullName, email: i.email, firm: i.firmName, type: i.investorType, ticket: `${i.ticketMin}-${i.ticketMax}`, sectors: i.sectors.join('; '), status: i.approvalStatus })))
    else if (tab === 'experts')
      downloadCsv('experts.csv', store.expertProfiles.map((e) => ({ name: e.fullName, email: e.email, domain: e.domain, contribution: e.contribution.join('; '), status: e.approvalStatus })))
    else if (tab === 'pledges')
      downloadCsv('pledges.csv', store.pledges.map((p) => ({ name: p.name, email: p.email, phone: p.phone, district: labelDistrict(p.district), commitment: p.commitment.join('; ') })))
    else if (tab === 'orders')
      downloadCsv('book-orders.csv', store.bookOrders.map((o) => ({ buyer: o.buyerName, email: o.buyerEmail, format: o.format, qty: o.quantity, amount: o.amount, payment: o.paymentStatus, fulfillment: o.fulfillmentStatus })))
    else if (tab === 'matches')
      downloadCsv('matches.csv', store.matches.map((m) => ({ founder: founderLabel(m.founderApplicationId), counterpart: counterpartLabel(m), type: m.type, initiated_by: m.initiatedBy, status: m.status, created: m.createdAt })))
  }

  return (
    <div className="min-h-screen bg-canvas">
      {/* Admin top bar */}
      <header className="sticky top-0 z-30 border-b border-line bg-night text-canvas">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 sm:px-8">
          <div>
            <p className="font-serif text-base font-medium">Control Room</p>
            <p className="text-[10px] uppercase tracking-[0.2em] text-canvas/45">
              The New India Manifesto — Admin
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={reset}
              className="hidden items-center gap-1.5 rounded-lg px-3 py-2 text-xs text-canvas/70 transition hover:bg-canvas/10 sm:flex"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" /> Reset data
            </button>
            <Link href="/" className="text-sm text-canvas/80 transition hover:text-accent-ring">
              View site
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
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

        {tab === 'overview' && <Overview store={store} />}

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

        {/* Table */}
        {tab !== 'overview' && (
        <div className="mt-4 overflow-x-auto rounded-2xl border border-line bg-surface shadow-card">
          {tab === 'founders' && (
            <Table head={['Venture', 'Applicant', 'District', 'Sector · Stage', 'Consent', 'Status']}>
              {store.founderApplications
                .filter((a) => matches(q, a.ventureName ?? '', a.fullName, a.email, a.sector))
                .map((a) => (
                  <tr key={a.id} className="border-t border-line align-top">
                    <Td>
                      <p className="font-medium text-ink">{a.ventureName || <span className="italic text-muted">Just an idea</span>}</p>
                      <p className="max-w-xs text-xs text-muted">{a.oneLiner}</p>
                    </Td>
                    <Td>
                      <p className="text-ink">{a.fullName}</p>
                      <p className="text-xs text-muted">{a.email}</p>
                      <p className="text-xs text-muted">{a.phone}</p>
                    </Td>
                    <Td>{labelDistrict(a.district)}</Td>
                    <Td>
                      {labelSector(a.sector)}
                      <span className="block text-xs text-muted">{labelStage(a.stage)}</span>
                    </Td>
                    <Td>
                      <span className={`rounded-full px-2 py-0.5 text-xs ${a.consentShareWithMentors ? 'bg-success/10 text-success' : 'bg-line text-muted'}`}>
                        {a.consentShareWithMentors ? 'Shareable' : 'Private'}
                      </span>
                    </Td>
                    <Td>
                      <StatusSelect
                        value={a.internalStatus}
                        options={INTERNAL_STATUSES}
                        onChange={(v) => setFounderStatus(a.id, v as InternalStatus)}
                      />
                    </Td>
                  </tr>
                ))}
            </Table>
          )}

          {tab === 'mentors' && (
            <Table head={['Name', 'Contact', 'Expertise', 'Sectors', 'Capacity', 'Approval']}>
              {store.mentorProfiles
                .filter((m) => matches(q, m.fullName, m.email, m.roleCompany))
                .map((m) => (
                  <tr key={m.id} className="border-t border-line align-top">
                    <Td><p className="font-medium text-ink">{m.fullName}</p><p className="text-xs text-muted">{m.roleCompany}</p></Td>
                    <Td><p className="text-xs text-muted">{m.email}</p><p className="text-xs text-muted">{m.phone}</p></Td>
                    <Td className="max-w-[14rem] text-xs">{m.expertiseAreas.join(', ')}</Td>
                    <Td className="text-xs">{m.sectors.map(labelSector).join(', ')}</Td>
                    <Td>{m.capacity}</Td>
                    <Td><StatusSelect value={m.approvalStatus} options={APPROVAL_STATUSES} onChange={(v) => setApprovalStatus('mentor', m.id, v as ApprovalStatus)} /></Td>
                  </tr>
                ))}
            </Table>
          )}

          {tab === 'investors' && (
            <Table head={['Name', 'Firm', 'Type', 'Ticket (₹)', 'Sectors', 'Approval']}>
              {store.investorProfiles
                .filter((i) => matches(q, i.fullName, i.email, i.firmName))
                .map((i) => (
                  <tr key={i.id} className="border-t border-line align-top">
                    <Td><p className="font-medium text-ink">{i.fullName}</p><p className="text-xs text-muted">{i.email}</p></Td>
                    <Td>{i.firmName}</Td>
                    <Td>{labelInvestorType(i.investorType)}</Td>
                    <Td className="text-xs">{i.ticketMin.toLocaleString('en-IN')}–{i.ticketMax.toLocaleString('en-IN')}</Td>
                    <Td className="text-xs">{i.sectors.map(labelSector).join(', ')}</Td>
                    <Td><StatusSelect value={i.approvalStatus} options={APPROVAL_STATUSES} onChange={(v) => setApprovalStatus('investor', i.id, v as ApprovalStatus)} /></Td>
                  </tr>
                ))}
            </Table>
          )}

          {tab === 'experts' && (
            <Table head={['Name', 'Contact', 'Domain', 'Contribution', 'Approval']}>
              {store.expertProfiles
                .filter((e) => matches(q, e.fullName, e.email, e.domain))
                .map((e) => (
                  <tr key={e.id} className="border-t border-line align-top">
                    <Td><p className="font-medium text-ink">{e.fullName}</p></Td>
                    <Td><p className="text-xs text-muted">{e.email}</p><p className="text-xs text-muted">{e.phone}</p></Td>
                    <Td>{e.domain}</Td>
                    <Td className="text-xs">{e.contribution.map(labelContribution).join(', ')}</Td>
                    <Td><StatusSelect value={e.approvalStatus} options={APPROVAL_STATUSES} onChange={(v) => setApprovalStatus('expert', e.id, v as ApprovalStatus)} /></Td>
                  </tr>
                ))}
            </Table>
          )}

          {tab === 'pledges' && (
            <Table head={['Name', 'Contact', 'District', 'Commitment']}>
              {store.pledges
                .filter((p) => matches(q, p.name, p.email, p.phone))
                .map((p) => (
                  <tr key={p.id} className="border-t border-line align-top">
                    <Td><p className="font-medium text-ink">{p.name}</p></Td>
                    <Td><p className="text-xs text-muted">{p.email}</p><p className="text-xs text-muted">{p.phone}</p></Td>
                    <Td>{labelDistrict(p.district)}</Td>
                    <Td className="text-xs">{p.commitment.map(labelCommitment).join(', ')}</Td>
                  </tr>
                ))}
            </Table>
          )}

          {tab === 'orders' && (
            <Table head={['Buyer', 'Format', 'Qty', 'Amount', 'Payment', 'Fulfillment']}>
              {store.bookOrders
                .filter((o) => matches(q, o.buyerName, o.buyerEmail))
                .map((o) => (
                  <tr key={o.id} className="border-t border-line align-top">
                    <Td><p className="font-medium text-ink">{o.buyerName}</p><p className="text-xs text-muted">{o.buyerEmail}</p></Td>
                    <Td className="capitalize">{o.format}</Td>
                    <Td>{o.quantity}</Td>
                    <Td>₹{o.amount.toLocaleString('en-IN')}</Td>
                    <Td>
                      <span className={`rounded-full px-2 py-0.5 text-xs ${o.paymentStatus === 'paid' ? 'bg-success/10 text-success' : 'bg-line text-muted'}`}>
                        {o.paymentStatus}
                      </span>
                    </Td>
                    <Td>
                      {o.format === 'ebook' ? (
                        <span className="text-xs text-muted">delivered</span>
                      ) : (
                        <StatusSelect value={o.fulfillmentStatus} options={FULFILLMENT_STATUSES} onChange={(v) => setOrderFulfillment(o.id, v as FulfillmentStatus)} />
                      )}
                    </Td>
                  </tr>
                ))}
            </Table>
          )}

          {tab === 'matches' && (
            <Table head={['Founder', 'Counterpart', 'Type', 'Initiated by', 'Status']}>
              {store.matches.length === 0 && (
                <tr className="border-t border-line">
                  <Td className="text-muted">No matches yet. Mentors/investors create these by expressing interest.</Td>
                </tr>
              )}
              {store.matches
                .filter((m) => matches(q, founderLabel(m.founderApplicationId), counterpartLabel(m)))
                .map((m) => (
                  <tr key={m.id} className="border-t border-line align-top">
                    <Td className="font-medium text-ink">{founderLabel(m.founderApplicationId)}</Td>
                    <Td>{counterpartLabel(m)}</Td>
                    <Td className="capitalize">{m.type}</Td>
                    <Td className="capitalize text-muted">{m.initiatedBy}</Td>
                    <Td>
                      <StatusSelect
                        value={m.status}
                        options={MATCH_STATUSES}
                        onChange={(v) => setMatchStatus(m.id, v as Match['status'])}
                      />
                    </Td>
                  </tr>
                ))}
            </Table>
          )}
        </div>
        )}
      </div>
    </div>
  )
}

function Overview({ store }: { store: import('@/lib/types').StoreShape }) {
  const founders = store.founderApplications
  const shortlisted = founders.filter((a) => ['shortlisted', 'matched'].includes(a.internalStatus)).length
  const matched = founders.filter((a) => a.internalStatus === 'matched').length
  const paidOrders = store.bookOrders.filter((o) => o.paymentStatus === 'paid').length
  const revenue = store.bookOrders
    .filter((o) => o.paymentStatus === 'paid')
    .reduce((sum, o) => sum + o.amount, 0)

  const tiles = [
    { label: 'Pledges', value: store.pledges.length },
    { label: 'Founder applications', value: founders.length },
    { label: 'Shortlisted', value: shortlisted },
    { label: 'Matched', value: matched },
    { label: 'Mentors / Investors / Experts', value: store.mentorProfiles.length + store.investorProfiles.length + store.expertProfiles.length },
    { label: 'Book orders (paid)', value: paidOrders },
    { label: 'Book revenue', value: `₹${revenue.toLocaleString('en-IN')}` },
    { label: 'Active matches', value: store.matches.length },
  ]

  // Simple funnel bars (pledge → apply → shortlist → match).
  const funnel = [
    { label: 'Pledged', n: store.pledges.length },
    { label: 'Applied (founders)', n: founders.length },
    { label: 'Shortlisted', n: shortlisted },
    { label: 'Matched', n: matched },
  ]
  const max = Math.max(...funnel.map((f) => f.n), 1)

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
          {funnel.map((f) => (
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

function StatusSelect({
  value,
  options,
  onChange,
}: {
  value: string
  options: { value: string; label: string }[]
  onChange: (v: string) => void
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-lg border border-line bg-surface px-2.5 py-1.5 text-xs font-medium text-ink focus:border-ink"
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  )
}
