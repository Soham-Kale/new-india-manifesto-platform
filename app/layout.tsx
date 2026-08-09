import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Poppins, Fraunces } from 'next/font/google'
import './globals.css'
import Providers from '@/components/Providers'
import RoleSwitcher from '@/components/site/RoleSwitcher'

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
})

const fraunces = Fraunces({
  variable: '--font-fraunces',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
})

export const metadata: Metadata = {
  title: 'Rohan Deshmukh — The New India Manifesto',
  description:
    'The New India Manifesto: Going Beyond Possible. Read the argument, take the pledge, and act — apply as a founder, mentor, investor or industry expert to help incubate India from its rural heartland.',
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${poppins.variable} ${fraunces.variable} h-full antialiased`}>
      <body className="flex min-h-screen flex-col bg-canvas text-ink">
        <Providers>
          {children}
          <RoleSwitcher />
        </Providers>
      </body>
    </html>
  )
}
