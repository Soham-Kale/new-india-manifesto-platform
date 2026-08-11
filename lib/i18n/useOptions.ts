'use client'

import {
  DISTRICTS,
  FOUNDER_STAGES,
  SECTORS,
  LOOKING_FOR,
  INVESTOR_TYPES,
  CONTRIBUTIONS,
  COMMITMENTS,
  type Option,
} from '@/lib/options'
import { useT } from './LanguageProvider'

/** Returns the shared option lists with labels translated to the active language. */
export function useOptions() {
  const { t } = useT()
  const tr = <T extends string>(arr: Option<T>[], kind: string): Option<T>[] =>
    arr.map((o) => ({ value: o.value, label: t(`opt.${kind}.${o.value}`) }))

  return {
    districts: tr(DISTRICTS, 'districts'),
    stages: tr(FOUNDER_STAGES, 'stages'),
    sectors: tr(SECTORS, 'sectors'),
    lookingFor: tr(LOOKING_FOR, 'lookingFor'),
    investorTypes: tr(INVESTOR_TYPES, 'investorTypes'),
    contributions: tr(CONTRIBUTIONS, 'contributions'),
    commitments: tr(COMMITMENTS, 'commitments'),
  }
}
