'use client'

import Link from 'next/link'
import { useT } from '@/lib/i18n'

const COLS = [
  {
    titleKey: 'explore',
    links: [
      { key: 'linkBook', href: '/book' },
      { key: 'linkAbout', href: '/rohan' },
      { key: 'linkInitiative', href: '/initiative' },
      { key: 'linkPledge', href: '/pledge' },
    ],
  },
  {
    titleKey: 'apply',
    links: [
      { key: 'linkFounder', href: '/apply/founder' },
      { key: 'linkMentor', href: '/apply/mentor' },
      { key: 'linkInvestor', href: '/apply/investor' },
      { key: 'linkExpert', href: '/apply/expert' },
    ],
  },
  {
    titleKey: 'legal',
    links: [
      { key: 'linkPrivacy', href: '/privacy' },
      { key: 'linkTerms', href: '/terms' },
      { key: 'linkShipping', href: '/shipping' },
      { key: 'linkRefund', href: '/refund' },
    ],
  },
] as const

export default function SiteFooter() {
  const { t } = useT()
  return (
    <footer className="mt-auto border-t border-line bg-night text-canvas">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-serif text-lg font-medium">{t('footer.name')}</p>
            <p className="mt-1 text-sm text-canvas/55">{t('footer.tagline')}</p>
            <a
              href="https://wa.me/918208737624"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-sm text-canvas/80 transition-colors hover:text-accent-ring"
            >
              {t('footer.whatsapp')}
            </a>
          </div>

          {COLS.map((col) => (
            <div key={col.titleKey}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-canvas/45">
                {t(`footer.${col.titleKey}`)}
              </p>
              <ul className="mt-3 space-y-2">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-canvas/75 transition-colors hover:text-accent-ring"
                    >
                      {t(`footer.${l.key}`)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-2 border-t border-canvas/10 pt-6 text-xs text-canvas/40 sm:flex-row sm:items-center">
          <p>{t('footer.copyright')}</p>
          <p>{t('footer.disclaimer')}</p>
        </div>
      </div>
    </footer>
  )
}
