'use client'

import { useMemo, useState } from 'react'
import type { Sector } from '@/lib/types'
import { SECTORS, labelSector } from '@/lib/options'
import { useMockAuth } from '@/lib/MockAuthProvider'
import { useMockData } from '@/lib/MockDataProvider'
import { findMatch, isContactRevealed } from '@/lib/matching'
import AccessDenied from './AccessDenied'
import FounderCard from './FounderCard'

export default function MentorDashboard() {
  const { identity, currentUser, ready } = useMockAuth()
  const { store, ready: dataReady, createMatch } = useMockData()
  const [sectorFilter, setSectorFilter] = useState<Sector | 'all'>('all')
  const [q, setQ] = useState('')

  const mentorProfile = useMemo(
    () => store.mentorProfiles.find((m) => m.userId === currentUser?.id || m.email === currentUser?.email),
    [store.mentorProfiles, currentUser],
  )

  if (!ready || !dataReady) {
    return <div className="px-5 py-24 text-center text-muted">Loading…</div>
  }
  if (identity !== 'mentor') {
    return <AccessDenied role="mentor" label="Mentor" />
  }

  const mentorSectors = mentorProfile?.sectors ?? []

  // Consent-gate: only founders who ticked "share with mentors".
  const founders = store.founderApplications
    .filter((a) => a.consentShareWithMentors)
    .filter((a) => (mentorSectors.length === 0 ? true : mentorSectors.includes(a.sector)))
    .filter((a) => (sectorFilter === 'all' ? true : a.sector === sectorFilter))
    .filter(
      (a) =>
        !q.trim() ||
        `${a.ventureName ?? ''} ${a.oneLiner} ${a.problem}`.toLowerCase().includes(q.toLowerCase()),
    )

  const sectorChips: (Sector | 'all')[] = ['all', ...(mentorSectors.length ? mentorSectors : SECTORS.map((s) => s.value))]

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Mentor dashboard</p>
      <h1 className="mt-3 font-serif text-3xl font-medium tracking-tight text-ink sm:text-4xl">
        Founders you can help
      </h1>
      <p className="mt-2 max-w-2xl text-muted">
        Founders who opted to be shared with mentors, matched to your sectors. You&apos;ll see a limited
        profile — contact is unlocked only after an admin approves your interest.
      </p>

      {/* Filters */}
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
          placeholder="Search founders…"
          className="w-full rounded-xl border border-line bg-surface px-3 py-2.5 text-sm text-ink placeholder:text-muted/60 focus:border-ink sm:max-w-xs"
        />
      </div>

      {founders.length === 0 ? (
        <p className="mt-10 rounded-2xl border border-dashed border-line bg-surface/60 p-10 text-center text-sm text-muted">
          No matching founders right now. Try a different sector filter.
        </p>
      ) : (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {founders.map((a) => {
            const match = currentUser ? findMatch(store.matches, a.id, currentUser.id) : undefined
            const revealed = currentUser
              ? isContactRevealed(store.matches, a.id, currentUser.id)
              : false
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
                    type: 'mentor',
                    initiatedBy: 'mentor',
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
