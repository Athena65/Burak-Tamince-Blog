import { useState, useEffect } from 'react'
import { useScroll } from '../hooks/useScroll'
import { smoothScrollTo } from '../utils/scroll'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { activeSection } = useScroll()

  const navItems = [
    { id: 'hero', icon: 'bi-house', label: 'Home' },
    { id: 'about', icon: 'bi-person', label: 'About' },
    { id: 'skills', icon: 'bi-bar-chart', label: 'Skills' },
    { id: 'certificates', icon: 'bi-award', label: 'Certificates' },
    { id: 'resume', icon: 'bi-file-earmark-text', label: 'Resume' },
    { id: 'portfolio', icon: 'bi-images', label: 'Projects' },
    { id: 'videos', icon: 'bi-youtube', label: 'Videos' },
  ]

  const handleNavClick = () => {
    setIsMenuOpen(false)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <>
      <i
        className={`header-toggle bi ${isMenuOpen ? 'bi-x' : 'bi-list'} fixed right-4 top-4 z-[10001] flex h-12 w-12 cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-white/5 text-2xl text-white backdrop-blur-md transition-all duration-300 hover:bg-accent hover:border-accent xl:hidden shadow-lg shadow-black/20`}
        onClick={toggleMenu}
      ></i>
      <header
        id="header"
        className={`fixed z-[10000] transition-all duration-300 ease-in-out
          /* Mobile: Top Bar Overlay */
          left-0 top-0 w-full overflow-hidden
          ${isMenuOpen ? 'h-auto py-8 bg-black/95 backdrop-blur-xl border-b border-white/10 opacity-100 visible' : 'h-0 opacity-0 invisible xl:h-screen xl:opacity-100 xl:visible'}
          
          /* Desktop: Sidebar Reset */
          xl:left-0 xl:top-0 xl:w-auto xl:bg-transparent xl:border-none xl:py-0 xl:flex xl:flex-col xl:justify-start xl:pt-20 xl:px-4 xl:backdrop-blur-none xl:overflow-visible
        `}
      >
        <nav id="navmenu" className="navmenu w-full xl:w-[140px]">
          <ul className={`m-0 p-0 flex items-center justify-center gap-6 flex-wrap xl:block xl:gap-0`}>
            {navItems.map((item) => (
              <li key={item.id} className="xl:mb-3 xl:w-full">
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`group flex items-center overflow-hidden rounded-full font-medium text-white transition-all duration-300
                    
                    /* Mobile Item Styles */
                    justify-center items-center p-2 text-xl hover:text-accent
                    
                    /* Desktop Pill Styles */
                    xl:h-12 xl:px-4 xl:py-2.5 xl:text-[14px] xl:justify-start xl:border xl:backdrop-blur-md
                    ${activeSection === item.id
                      ? 'text-accent xl:text-white xl:w-12 xl:bg-accent xl:border-accent xl:shadow-lg xl:shadow-accent/40'
                      : 'xl:w-12 xl:bg-white/5 xl:border-white/10'
                    }
                    xl:hover:w-full xl:hover:bg-accent xl:hover:border-accent
                  `}
                >
                  <i className={`${item.icon} text-2xl xl:text-lg xl:mr-3 xl:text-center xl:w-4 flex-shrink-0`}></i>

                  {/* Label: Hidden on mobile (icon only), hidden on desktop default (w-0 or hidden), shown on desktop hover */}
                  <span className="hidden xl:hidden xl:group-hover:inline-block xl:pl-0 whitespace-nowrap opacity-0 xl:group-hover:opacity-100 transition-opacity duration-300 delay-75">
                    {item.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-[1] bg-black/50 xl:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  )
}

export default Header

