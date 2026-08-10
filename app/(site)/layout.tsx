import type { ReactNode } from 'react'
import SiteHeader from '@/components/site/SiteHeader'
import SiteFooter from '@/components/site/SiteFooter'
import { JoinBand } from '@/components/site/sections'

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      {/* pt reserves space for the floating pill nav; the Hero pulls back up under it. */}
      <main className="flex flex-1 flex-col pt-20 lg:pt-24">{children}</main>
      <JoinBand />
      <SiteFooter />
    </>
  )
}
