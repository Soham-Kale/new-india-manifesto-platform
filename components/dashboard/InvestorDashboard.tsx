'use client'

import { useMemo, useState } from 'react'
import type { Sector } from '@/lib/types'
import { SECTORS, labelSector } from '@/lib/options'
import { useMockAuth } from '@/lib/MockAuthProvider'
import { useMockData } from '@/lib/MockDataProvider'
import { findMatch, isContactRevealed } from '@/lib/matching'
import AccessDenied from './AccessDenied'
import FounderCard from './FounderCard'

// Investors see an admin-curated deal-flow: consented founders that have moved
// past initial triage (under_review / shortlisted / matched), filtered to the
// investor's sector & stage focus.
const CURATED = new Set(['under_review', 'shortlisted', 'matched'])

export default function InvestorDashboard() {
  const { identity, currentUser, ready } = useMockAuth()
  const { store, ready: dataReady, createMatch } = useMockData()
  const [sectorFilter, setSectorFilter] = useState<Sector | 'all'>('all')
  const [q, setQ] = useState('')

  const profile = useMemo(
    () => store.investorProfiles.find((i) => i.userId === currentUser?.id || i.email === currentUser?.email),
    [store.investorProfiles, currentUser],
  )

  if (!ready || !dataReady) {
    return <div className="px-5 py-24 text-center text-muted">Loading…</div>
  }
  if (identity !== 'investor') {
    return <AccessDenied role="investor" label="Investor" />
  }

  const sectors = profile?.sectors ?? []
  const stageFocus = profile?.stageFocus ?? []

  const founders = store.founderApplications
    .filter((a) => a.consentShareWithMentors && CURATED.has(a.internalStatus))
    .filter((a) => (sectors.length === 0 ? true : sectors.includes(a.sector)))
    .filter((a) => (stageFocus.length === 0 ? true : stageFocus.includes(a.stage)))
    .filter((a) => (sectorFilter === 'all' ? true : a.sector === sectorFilter))
    .filter(
      (a) =>
        !q.trim() ||
        `${a.ventureName ?? ''} ${a.oneLiner} ${a.problem}`.toLowerCase().includes(q.toLowerCase()),
    )

  const sectorChips: (Sector | 'all')[] = ['all', ...(sectors.length ? sectors : SECTORS.map((s) => s.value))]

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Investor dashboard</p>
      <h1 className="mt-3 font-serif text-3xl font-medium tracking-tight text-ink sm:text-4xl">
        Curated deal flow
      </h1>
      <p className="mt-2 max-w-2xl text-muted">
        An admin-curated set of vetted founders matched to your focus. Limited profiles only — contact is
        revealed after an admin approves your interest. Support is criteria-based and revolving, not a
        grant.
      </p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {sectorChips.map((s) => (
            <button
              key={s}
              onClick={() => setSectorFilter(s)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                sectorFilter === s
                  ? 'border-ink bg-ink text-canvas'
                  : 'border-line bg-surface text-muted hover:border-ink/40 hover:text-ink'
              }`}
            >
              {s === 'all' ? 'All sectors' : labelSector(s)}
            </button>
          ))}
        </div>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search deal flow…"
          className="w-full rounded-xl border border-line bg-surface px-3 py-2.5 text-sm text-ink placeholder:text-muted/60 focus:border-ink sm:max-w-xs"
        />
      </div>

      {founders.length === 0 ? (
        <p className="mt-10 rounded-2xl border border-dashed border-line bg-surface/60 p-10 text-center text-sm text-muted">
          No founders in your curated deal flow right now.
        </p>
      ) : (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {founders.map((a) => {
            const match = currentUser ? findMatch(store.matches, a.id, currentUser.id) : undefined
            const revealed = currentUser ? isContactRevealed(store.matches, a.id, currentUser.id) : false
            return (
              <FounderCard
                key={a.id}
                app={a}
                match={match}
                contactRevealed={revealed}
                onExpressInterest={() =>
                  currentUser &&
                  createMatch({
                    founderApplicationId: a.id,
                    counterpartUserId: currentUser.id,
                    type: 'investor',
                    initiatedBy: 'investor',
                  })
                }
              />
            )
          })}
        </div>
      )}
    </div>
  )
}
