export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
// An Indian mobile number: exactly 10 digits, starting 6–9.
export const PHONE_RE = /^[6-9]\d{9}$/

export function isEmail(v: string): boolean {
  return EMAIL_RE.test(v.trim())
}

/**
 * Accepts ONLY a 10-digit Indian mobile number. Spaces, dashes and brackets
 * are ignored, but the number itself must be exactly 10 digits (starting 6–9),
 * so 11- and 12-digit inputs are rejected.
 */
export function isPhone(v: string): boolean {
  const digits = v.replace(/[\s()+-]/g, '')
  return PHONE_RE.test(digits)
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
