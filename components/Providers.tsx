'use client'

import type { ReactNode } from 'react'
import { LanguageProvider, type Lang } from '@/lib/i18n'
import { MockAuthProvider } from '@/lib/MockAuthProvider'
import { MockDataProvider } from '@/lib/MockDataProvider'

export default function Providers({
  children,
  initialLang = 'mr',
}: {
  children: ReactNode
  initialLang?: Lang
}) {
  return (
    <LanguageProvider initialLang={initialLang}>
      <MockAuthProvider>
        <MockDataProvider>{children}</MockDataProvider>
      </MockAuthProvider>
    </LanguageProvider>
  )
}
