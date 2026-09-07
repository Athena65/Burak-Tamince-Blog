import { useScroll } from '../hooks/useScroll'
import { useLanguage } from '../i18n/LanguageContext'

const ScrollTop = () => {
  const { showScrollTop } = useScroll()
  const { t } = useLanguage()

  const handleClick = (e) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <a
      href="#"
      id="scroll-top"
      onClick={handleClick}
      aria-label={t({ en: 'Back to top', tr: 'Başa dön' })}
      className={`fixed right-4 z-[10002] flex h-11 w-11 items-center justify-center rounded-md border border-rule bg-ink-2/90 text-paper transition-colors hover:border-accent hover:text-accent ${showScrollTop
          ? 'bottom-4 visible opacity-100 translate-y-0'
          : 'bottom-0 invisible opacity-0 translate-y-10'
        }`}
    >
      <i className="bi bi-arrow-up-short text-3xl"></i>
    </a>
  )
}

export default ScrollTop
