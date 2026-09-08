import { useState, useEffect } from 'react'
import { useScroll } from '../hooks/useScroll'
import { useLanguage } from '../i18n/LanguageContext'
import LanguageToggle from './LanguageToggle'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { activeSection } = useScroll()
  const { t } = useLanguage()

  const navItems = [
    { id: 'hero', icon: 'bi-house', label: { en: 'Home', tr: 'Ana sayfa' } },
    { id: 'about', icon: 'bi-person', label: { en: 'About', tr: 'Hakkımda' } },
    { id: 'skills', icon: 'bi-briefcase', label: { en: 'Experience & Skills', tr: 'Deneyim ve yetenekler' } },
    { id: 'certificates', icon: 'bi-award', label: { en: 'Certificates', tr: 'Sertifikalar' } },
    { id: 'resume', icon: 'bi-file-earmark-text', label: { en: 'Resume', tr: 'Özgeçmiş' } },
    { id: 'portfolio', icon: 'bi-github', label: { en: 'GitHub Projects', tr: 'GitHub Projeleri' } },
    { id: 'videos', icon: 'bi-youtube', label: { en: 'Videos', tr: 'Videolar' } },
  ]

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) { // xl breakpoint
        setIsMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleNavClick = (e, id) => {
    // Close mobile menu
    setIsMenuOpen(false)

    // We let the native anchor behavior handle the scroll to the ID.
    // This is cleaner and avoids unnecessary history state manipulation
    // that could trigger Chrome's 'intermediate navigation' warnings.
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <>
      {/* Mobile toggle: a 44px plate in the top-right corner, hidden on xl where the rail is always visible */}
      <button
        type="button"
        aria-label={
          isMenuOpen
            ? t({ en: 'Close menu', tr: 'Menüyü kapat' })
            : t({ en: 'Open menu', tr: 'Menüyü aç' })
        }
        aria-expanded={isMenuOpen}
        aria-controls="navmenu"
        className="header-toggle fixed right-4 top-4 z-[10001] flex h-11 w-11 items-center justify-center rounded-md border border-rule bg-ink-2/90 text-paper text-2xl transition-colors hover:border-accent hover:text-accent xl:hidden"
        onClick={toggleMenu}
      >
        <i className={`bi ${isMenuOpen ? 'bi-x' : 'bi-list'}`}></i>
      </button>

      {/*
        Mobile: a top panel that collapses to nothing (pointer-events off so the fixed bar cannot block taps).
        Desktop (xl+): a fixed, vertically centred icon rail on the left edge.
      */}
      <header
        id="header"
        className={`fixed left-0 top-0 z-[10000] w-full overflow-hidden xl:flex xl:w-auto xl:flex-col xl:justify-center xl:overflow-visible xl:border-none xl:bg-transparent xl:px-4 xl:py-0 ${
          isMenuOpen
            ? 'pointer-events-auto visible h-auto border-b border-rule bg-ink/95 py-6 opacity-100'
            : 'pointer-events-none invisible h-0 opacity-0 xl:pointer-events-auto xl:visible xl:h-screen xl:opacity-100'
        }`}
      >
        {/* Below xl the list keeps clear of the toggle plate on the right; on xl it is a 140px column */}
        <nav
          id="navmenu"
          className="navmenu w-full overflow-visible px-5 pr-16 sm:px-8 sm:pr-20 xl:w-[140px] xl:overflow-visible xl:px-0"
        >
          {/* Language switch sits at the head of the menu, sized like a rail plate */}
          <div className="mb-4 flex xl:mb-3 xl:block">
            <LanguageToggle />
          </div>

          <ul className="m-0 flex flex-wrap items-center gap-x-7 gap-y-1 overflow-visible p-0 xl:block xl:gap-0 xl:overflow-visible">
            {navItems.map((item) => {
              const isActive = activeSection === item.id
              const label = t(item.label)

              return (
                <li
                  key={item.id}
                  className="relative z-0 xl:mb-3 xl:w-full xl:overflow-visible hover:z-[10050] focus-within:z-[10050]"
                >
                  <a
                    href={`#${item.id}`}
                    title={label}
                    aria-label={label}
                    onClick={(e) => handleNavClick(e, item.id)}
                    className={`group flex items-center gap-2.5 rounded-md py-2 text-base font-medium transition-colors xl:h-11 xl:w-11 xl:justify-center xl:gap-0 xl:overflow-visible xl:border xl:px-3 xl:py-0 xl:text-sm xl:hover:w-max xl:hover:max-w-[min(20rem,calc(100vw-3rem))] xl:focus-visible:w-max xl:focus-visible:max-w-[min(20rem,calc(100vw-3rem))] ${
                      isActive
                        ? 'text-accent xl:border-accent xl:bg-accent xl:text-ink'
                        : 'text-paper-dim hover:text-paper xl:border-rule xl:bg-ink-2/80 xl:hover:border-rule-strong xl:hover:bg-ink-3 xl:hover:text-paper'
                    }`}
                  >
                    <i className={`bi ${item.icon} flex-shrink-0 text-lg xl:w-4 xl:text-center`}></i>

                    {/* Label: always shown below xl; on the rail it appears on hover/focus and w-max on the link keeps it from clipping to the column width */}
                    <span className="whitespace-nowrap xl:ml-3 xl:hidden xl:group-hover:inline-block xl:group-focus-visible:inline-block">
                      {label}
                    </span>
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>
      </header>
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-[9] bg-ink/70 xl:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  )
}

export default Header
