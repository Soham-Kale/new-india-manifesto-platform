'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import { en } from './messages/en'
import { mr } from './messages/mr'

export type Lang = 'mr' | 'en'

const DICTS: Record<Lang, typeof en> = { en, mr }
const STORAGE_KEY = 'nim.lang'

function lookup(dict: unknown, path: string): string {
  const value = path
    .split('.')
    .reduce<unknown>((o, k) => (o && typeof o === 'object' ? (o as Record<string, unknown>)[k] : undefined), dict)
  return typeof value === 'string' ? value : path
}

interface LanguageContextValue {
  lang: Lang
  setLang: (l: Lang) => void
  t: (path: string) => string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({
  initialLang = 'mr',
  children,
}: {
  initialLang?: Lang
  children: ReactNode
}) {
  const [lang, setLangState] = useState<Lang>(initialLang)

  // Hydrate from a previously saved choice.
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored === 'en' || stored === 'mr') setLangState(stored)
    } catch {
      /* ignore */
    }
  }, [])

  // Keep <html lang> / data-lang in sync so CSS can swap the Devanagari font.
  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.setAttribute('data-lang', lang)
  }, [lang])

  const setLang = useCallback((l: Lang) => {
    setLangState(l)
    try {
      localStorage.setItem(STORAGE_KEY, l)
    } catch {
      /* ignore */
    }
    document.cookie = `${STORAGE_KEY}=${l};path=/;max-age=31536000;samesite=lax`
  }, [])

  const t = useCallback((path: string) => lookup(DICTS[lang], path), [lang])

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>{children}</LanguageContext.Provider>
  )
}

export function useT(): LanguageContextValue {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useT must be used within LanguageProvider')
  return ctx
}
