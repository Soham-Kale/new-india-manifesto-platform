'use client'

import type { ReactNode } from 'react'
import { MockAuthProvider } from '@/lib/MockAuthProvider'
import { MockDataProvider } from '@/lib/MockDataProvider'

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <MockAuthProvider>
      <MockDataProvider>{children}</MockDataProvider>
    </MockAuthProvider>
  )
}
