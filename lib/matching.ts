import type { Match } from './types'

/**
 * Contact-gate (spec §3): a mentor/investor may see a founder's contact details
 * ONLY after an admin has approved (or connected) the match between them.
 */
export function isContactRevealed(
  matches: Match[],
  founderApplicationId: string,
  counterpartUserId: string,
): boolean {
  return matches.some(
    (m) =>
      m.founderApplicationId === founderApplicationId &&
      m.counterpartUserId === counterpartUserId &&
      (m.status === 'admin_approved' || m.status === 'connected'),
  )
}

/** The current match (if any) between a counterpart and a founder application. */
export function findMatch(
  matches: Match[],
  founderApplicationId: string,
  counterpartUserId: string,
): Match | undefined {
  return matches.find(
    (m) =>
      m.founderApplicationId === founderApplicationId &&
      m.counterpartUserId === counterpartUserId,
  )
}
