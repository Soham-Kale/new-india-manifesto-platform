'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import type { FounderApplication, Match, Sector } from '@/lib/types'
import { SECTORS, labelSector } from '@/lib/options'
import { useMockAuth } from '@/lib/MockAuthProvider'
import { api, apiEnabled } from '@/lib/api'
import AccessDenied from './AccessDenied'
import FounderCard from './FounderCard'

const backend = apiEnabled()

type FounderRow = Partial<FounderApplication> & { id: string; contactRevealed?: boolean }

export default function MentorDashboard() {
  const { currentUser, token, ready } = useMockAuth()
  const [sectorFilter, setSectorFilter] = useState<Sector | 'all'>('all')
  const [q, setQ] = useState('')
  const [rows, setRows] = useState<FounderRow[]>([])
  const [matchMap, setMatchMap] = useState<Record<string, Match['status']>>({})
  const [loading, setLoading] = useState(true)
  const [notice, setNotice] = useState('')

  const load = useCallback(async () => {
    if (!backend || !token) {
      setLoading(false)
      return
    }
    setLoading(true)
    setNotice('')
    const [fRes, mRes] = await Promise.all([api.listFounders(token), api.myMatches(token)])
    setLoading(false)
    if (fRes.ok && Array.isArray(fRes.data)) {
      setRows(fRes.data as FounderRow[])
    } else {
      const code = fRes.error && typeof fRes.error === 'object' ? fRes.error.code : undefined
      setRows([])
      if (code === 'no_profile') setNotice('Your mentor profile is still being set up by our team. Please check back soon.')
    }
    if (mRes.ok && Array.isArray(mRes.data)) {
      const map: Record<string, Match['status']> = {}
      for (const m of mRes.data as { founderApplicationId: string; status: Match['status'] }[]) {
        map[m.founderApplicationId] = m.status
      }
      setMatchMap(map)
    }
  }, [token])

  useEffect(() => {
    if (ready) load()
  }, [ready, load])

  const founders = useMemo(
    () =>
      rows
        .filter((a) => (sectorFilter === 'all' ? true : a.sector === sectorFilter))
        .filter(
          (a) =>
            !q.trim() ||
            `${a.ventureName ?? ''} ${a.oneLiner ?? ''} ${a.problem ?? ''}`
              .toLowerCase()
              .includes(q.toLowerCase()),
        ),
    [rows, sectorFilter, q],
  )

  const expressInterest = async (id: string) => {
    if (!token) return
    setMatchMap((m) => ({ ...m, [id]: 'interest' }))
    await api.expressInterest(token, id)
    load()
  }

  if (!ready || loading) {
    return <div className="px-5 py-24 text-center text-muted">Loading…</div>
  }
  if (currentUser?.role !== 'mentor') {
    return <AccessDenied role="mentor" label="Mentor" />
  }

  const sectorChips: (Sector | 'all')[] = ['all', ...SECTORS.map((s) => s.value)]

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

      {notice ? (
        <p className="mt-10 rounded-2xl border border-dashed border-line bg-surface/60 p-10 text-center text-sm text-muted">
          {notice}
        </p>
      ) : founders.length === 0 ? (
        <p className="mt-10 rounded-2xl border border-dashed border-line bg-surface/60 p-10 text-center text-sm text-muted">
          No matching founders right now. Try a different sector filter.
        </p>
      ) : (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {founders.map((a) => {
            const status = matchMap[a.id]
            const match = status ? ({ status } as Match) : undefined
            return (
              <FounderCard
                key={a.id}
                app={a as FounderApplication}
                match={match}
                contactRevealed={!!a.contactRevealed}
                onExpressInterest={() => expressInterest(a.id)}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}
