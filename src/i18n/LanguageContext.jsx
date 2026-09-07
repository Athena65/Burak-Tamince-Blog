import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'bt-lang'
export const SUPPORTED = ['en', 'tr']
const DEFAULT = 'en'

const LanguageContext = createContext(null)

/** ?lang=tr wins (it is what the hreflang alternates point at), then a saved
 *  choice, then the browser's own preference. */
const detectLanguage = () => {
  if (typeof window === 'undefined') return DEFAULT

  try {
    const fromQuery = new URLSearchParams(window.location.search).get('lang')
    if (fromQuery && SUPPORTED.includes(fromQuery.toLowerCase())) return fromQuery.toLowerCase()
  } catch {
    // malformed query string, fall through
  }

  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (saved && SUPPORTED.includes(saved)) return saved
  } catch {
    // storage blocked (private mode), fall through
  }

  const navLangs = window.navigator.languages || [window.navigator.language]
  for (const raw of navLangs) {
    if (!raw) continue
    const base = raw.toLowerCase().split('-')[0]
    if (SUPPORTED.includes(base)) return base
  }

  return DEFAULT
}

export const LanguageProvider = ({ children }) => {
  const [lang, setLangState] = useState(DEFAULT)

  // Detect after mount so the first paint matches the server-rendered markup.
  useEffect(() => {
    setLangState(detectLanguage())
  }, [])

  useEffect(() => {
    if (typeof document !== 'undefined') document.documentElement.lang = lang
  }, [lang])

  const setLang = useCallback((next) => {
    if (!SUPPORTED.includes(next)) return
    setLangState(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // storage blocked; the choice still applies for this page view
    }
  }, [])

  /**
   * Translate an inline pair. Strings live next to the markup that uses them:
   *
   *   t({ en: 'Projects', tr: 'Projeler' })
   *
   * A plain string passes through unchanged, so untranslated values (names,
   * URLs, technology labels) can be handed to t() safely.
   */
  const t = useCallback(
    (value) => {
      if (value == null) return value
      if (typeof value === 'string') return value
      if (Array.isArray(value)) return value
      return value[lang] ?? value[DEFAULT] ?? ''
    },
    [lang],
  )

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export const useLanguage = () => {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used inside <LanguageProvider>')
  return ctx
}
