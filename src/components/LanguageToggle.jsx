import { useLanguage, SUPPORTED } from '../i18n/LanguageContext'
import { trackEvent } from '../utils/analytics'

// Two-letter codes, not styled caps. Each button is labelled in its own language.
const LANGUAGES = {
  en: { label: 'EN', name: 'English' },
  tr: { label: 'TR', name: 'Türkçe' },
}

const LanguageToggle = ({ className = '' }) => {
  const { lang, setLang, t } = useLanguage()

  const select = (code) => {
    setLang(code)
    trackEvent('language_change', { language: code })
  }

  return (
    <div
      className={`inline-flex overflow-hidden rounded-md border border-rule ${className}`}
      role="group"
      aria-label={t({ en: 'Language', tr: 'Dil' })}
    >
      {SUPPORTED.map((code) => {
        const active = lang === code
        return (
          <button
            key={code}
            type="button"
            onClick={() => select(code)}
            aria-pressed={active}
            aria-label={LANGUAGES[code].name}
            className={`px-2.5 py-1.5 text-sm font-semibold transition-colors ${
              active ? 'bg-accent text-ink' : 'text-paper-dim hover:bg-ink-3 hover:text-paper'
            }`}
          >
            {LANGUAGES[code].label}
          </button>
        )
      })}
    </div>
  )
}

export default LanguageToggle
