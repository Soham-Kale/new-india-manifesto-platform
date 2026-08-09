import type { StoreShape } from './types'
import { SEED } from './seed'

const KEY = 'nim.store.v1'

export function emptyStore(): StoreShape {
  return {
    users: [],
    founderApplications: [],
    mentorProfiles: [],
    investorProfiles: [],
    expertProfiles: [],
    bookOrders: [],
    pledges: [],
    matches: [],
  }
}

/** Read the store from localStorage, seeding on first run. Client-only. */
export function loadStore(): StoreShape {
  if (typeof window === 'undefined') return emptyStore()
  try {
    const raw = window.localStorage.getItem(KEY)
    if (!raw) {
      const seeded = SEED()
      window.localStorage.setItem(KEY, JSON.stringify(seeded))
      return seeded
    }
    return { ...emptyStore(), ...(JSON.parse(raw) as StoreShape) }
  } catch {
    return SEED()
  }
}

export function saveStore(store: StoreShape): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(KEY, JSON.stringify(store))
  } catch {
    /* quota / private mode — ignore for the demo */
  }
}

export function resetStore(): StoreShape {
  const seeded = SEED()
  saveStore(seeded)
  return seeded
}

export function newId(prefix = 'id'): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return `${prefix}_${crypto.randomUUID().slice(0, 8)}`
  }
  return `${prefix}_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`
}

export function nowIso(): string {
  return new Date().toISOString()
}

/** Build a CSV from row objects and trigger a client-side download. */
export function downloadCsv(
  filename: string,
  rows: Record<string, unknown>[],
): void {
  if (typeof window === 'undefined' || rows.length === 0) return
  const headers = Object.keys(rows[0])
  const escape = (v: unknown) => {
    const s = v == null ? '' : Array.isArray(v) ? v.join('; ') : String(v)
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
  }
  const csv = [
    headers.join(','),
    ...rows.map((r) => headers.map((h) => escape(r[h])).join(',')),
  ].join('\n')

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}
