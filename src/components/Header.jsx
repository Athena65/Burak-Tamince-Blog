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

  const handleNavClick = (e, itemId) => {
    e.preventDefault()
    smoothScrollTo(`#${itemId}`)
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
        className={`fixed left-0 top-0 z-[3] flex h-screen min-w-[200px] flex-col justify-center overflow-y-auto bg-transparent px-4 transition-all duration-300 ${
          isMenuOpen ? 'left-0' : '-left-full'
        } xl:left-0`}
      >
        <nav id="navmenu" className="z-[3] p-0">
          <ul className="m-0 w-[140px] list-none p-0 pb-5 xl:w-[140px]">
            {navItems.map((item) => (
              <li key={item.id} className="mb-2">
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`nav-link group flex h-14 items-center overflow-hidden rounded-full px-[18px] py-2.5 text-[15px] text-white transition-all duration-300 hover:translate-y-[-2px] ${
                    activeSection === item.id
                      ? 'w-14 bg-accent text-white shadow-[0_4px_12px_rgba(5,99,187,0.3)]'
                      : 'w-14'
                  } hover:w-full`}
                >
                  <i className={`${item.icon} navicon text-xl flex-shrink-0`}></i>
                  <span className="nav-label px-1 pl-1.5 whitespace-nowrap">{item.label}</span>
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

