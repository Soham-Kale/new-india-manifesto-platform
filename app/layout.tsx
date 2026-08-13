import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { cookies } from 'next/headers'
import { Parkinsans, Inter, Noto_Sans_Devanagari, Noto_Serif_Devanagari } from 'next/font/google'
import './globals.css'
import Providers from '@/components/Providers'
import type { Lang } from '@/lib/i18n'

// Latin type: Parkinsans for headings/display, Inter for body — matched to the
// campaign's editorial reference. Marathi swaps to Noto Devanagari (below).
const parkinsans = Parkinsans({
  variable: '--font-parkinsans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

const notoDeva = Noto_Sans_Devanagari({
  variable: '--font-deva',
  subsets: ['devanagari'],
  weight: ['400', '500', '600', '700'],
})

const notoDevaSerif = Noto_Serif_Devanagari({
  variable: '--font-deva-serif',
  subsets: ['devanagari'],
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Rohan Deshmukh — The New India Manifesto',
  description:
    'The New India Manifesto: Going Beyond Possible. Read the argument, take the pledge, and act — apply as a founder, mentor, investor or industry expert to help incubate India from its rural heartland.',
}

export default async function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const cookieLang = (await cookies()).get('nim.lang')?.value
  const lang: Lang = cookieLang === 'en' ? 'en' : 'mr'

  return (
    <html
      lang={lang}
      data-lang={lang}
      className={`${parkinsans.variable} ${inter.variable} ${notoDeva.variable} ${notoDevaSerif.variable} h-full antialiased`}
    >
      <body className="flex min-h-screen flex-col bg-canvas text-ink">
        <Providers initialLang={lang}>{children}</Providers>
      </body>
    </html>
  )
}
