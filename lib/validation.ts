export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
export const PHONE_RE = /^[+]?[\d\s()-]{7,20}$/

export function isEmail(v: string): boolean {
  return EMAIL_RE.test(v.trim())
}

export function isPhone(v: string): boolean {
  return PHONE_RE.test(v.trim())
}

export function req(v: string): boolean {
  return v.trim().length > 0
}

export function minLen(v: string, n: number): boolean {
  return v.trim().length >= n
}

export type Errors<T extends string> = Partial<Record<T, string>>

export function hasErrors(errors: Record<string, string | undefined>): boolean {
  return Object.values(errors).some(Boolean)
}
