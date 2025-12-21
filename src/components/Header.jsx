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
        className={`header-toggle bi ${isMenuOpen ? 'bi-x' : 'bi-list'} fixed right-4 top-4 z-[9999] flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-accent text-xl text-white transition-colors duration-300 hover:bg-accent/90 xl:hidden`}
        onClick={toggleMenu}
      ></i>
      <header
        id="header"
        className={`fixed z-[9990] transition-all duration-300 ease-in-out
          /* Mobile: Top Bar Overlay */
          left-0 top-0 w-full overflow-hidden
          ${isMenuOpen ? 'h-auto py-6 bg-black/95 backdrop-blur-xl border-b border-white/10 opacity-100 visible' : 'h-0 opacity-0 invisible xl:h-screen xl:opacity-100 xl:visible'}
          
          /* Desktop: Sidebar Reset */
          xl:left-0 xl:top-0 xl:w-auto xl:bg-transparent xl:border-none xl:py-0 xl:flex xl:flex-col xl:justify-center xl:px-4 xl:backdrop-blur-none xl:overflow-visible
        `}
      >
        <nav id="navmenu" className="navmenu w-full xl:w-[140px]">
          <ul className={`m-0 p-0 flex items-center justify-center gap-6 flex-wrap xl:block xl:gap-0`}>
            {navItems.map((item) => (
              <li key={item.id} className="xl:mb-2 xl:w-full">
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`group flex items-center overflow-hidden rounded-full font-medium text-white transition-all duration-300
                    
                    /* Mobile Item Styles */
                    justify-center items-center p-2 text-xl hover:text-accent
                    
                    /* Desktop Pill Styles */
                    xl:h-14 xl:px-[18px] xl:py-2.5 xl:text-[15px] xl:justify-start
                    ${activeSection === item.id
                      ? 'text-accent xl:text-white xl:w-14 xl:bg-accent xl:shadow-[0_4px_12px_rgba(5,99,187,0.3)]'
                      : 'xl:w-14'
                    }
                    xl:hover:w-full xl:hover:bg-accent
                  `}
                >
                  <i className={`${item.icon} text-2xl xl:text-xl xl:mr-3 xl:text-center xl:w-6`}></i>

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
          className="fixed inset-0 z-[9996] bg-black/50 xl:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  )
}

export default Header

