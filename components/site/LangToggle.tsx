'use client'

import { useT } from '@/lib/i18n'

/** मराठी / EN pill toggle. */
export default function LangToggle({ className = '' }: { className?: string }) {
  const { lang, setLang } = useT()
  return (
    <div
      className={`inline-flex items-center rounded-full bg-surface/90 p-1 text-xs font-semibold shadow-card ring-1 ring-line ${className}`}
      role="group"
      aria-label="Language"
    >
      <button
        type="button"
        onClick={() => setLang('mr')}
        aria-pressed={lang === 'mr'}
        className={`rounded-full px-3 py-1.5 transition-colors ${
          lang === 'mr' ? 'bg-accent text-white' : 'text-muted hover:text-accent'
        }`}
      >
        मराठी
      </button>
      <button
        type="button"
        onClick={() => setLang('en')}
        aria-pressed={lang === 'en'}
        className={`rounded-full px-3 py-1.5 transition-colors ${
          lang === 'en' ? 'bg-accent text-white' : 'text-muted hover:text-accent'
        }`}
      >
        EN
      </button>
    </div>
  )
}
