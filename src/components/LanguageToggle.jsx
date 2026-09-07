import { useLanguage } from '../i18n/LanguageContext'
import { trackEvent } from '../utils/analytics'

// One button, two languages: the plate shows the language you are reading,
// and pressing it switches to the other one. Styled and sized exactly like a
// nav rail item so it expands on hover to reveal the target language.
const LANGUAGES = {
  en: { code: 'EN', name: { en: 'English', tr: 'İngilizce' } },
  tr: { code: 'TR', name: { en: 'Turkish', tr: 'Türkçe' } },
}

const LanguageToggle = ({ className = '' }) => {
  const { lang, setLang, t } = useLanguage()

  const next = lang === 'tr' ? 'en' : 'tr'
  const targetName = t(LANGUAGES[next].name)
  const action = t({ en: `Switch to ${targetName}`, tr: `${targetName} diline geç` })

  const toggle = () => {
    setLang(next)
    trackEvent('language_change', { language: next })
  }

  return (
    <button
      type="button"
      onClick={toggle}
      title={action}
      aria-label={action}
      className={`group flex items-center gap-2.5 rounded-md py-2 text-base font-medium text-paper-dim transition-colors hover:text-paper xl:h-11 xl:w-11 xl:justify-center xl:gap-0 xl:overflow-visible xl:border xl:border-rule xl:bg-ink-2/80 xl:px-3 xl:py-0 xl:text-sm xl:hover:w-max xl:hover:max-w-[min(20rem,calc(100vw-3rem))] xl:hover:border-rule-strong xl:hover:bg-ink-3 xl:hover:text-paper xl:focus-visible:w-max xl:focus-visible:max-w-[min(20rem,calc(100vw-3rem))] ${className}`}
    >
      {/* Collapsed state: the code of the language currently shown */}
      <span className="flex-shrink-0 font-semibold tracking-tight xl:w-4 xl:text-center">
        {LANGUAGES[lang].code}
      </span>

      {/* Label: always visible below xl, revealed on hover/focus on the rail */}
      <span className="whitespace-nowrap xl:ml-3 xl:hidden xl:group-hover:inline-block xl:group-focus-visible:inline-block">
        {action}
      </span>
    </button>
  )
}

export default LanguageToggle
