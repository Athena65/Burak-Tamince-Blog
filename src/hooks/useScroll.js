import { useEffect, useState } from 'react'
import { getActiveSection, smoothScrollTo } from '../utils/scroll'

export const useScroll = () => {
  const [activeSection, setActiveSection] = useState('hero')
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const section = getActiveSection()
      if (section) {
        setActiveSection(section)
      } else {
        // If no section found, check if we're at the top
        if (window.scrollY < 200) {
          setActiveSection('hero')
        }
      }
      setShowScrollTop(window.scrollY > 100)
    }

    // Handle hash on load
    const handleHash = () => {
      if (window.location.hash) {
        setTimeout(() => {
          smoothScrollTo(window.location.hash)
        }, 100)
      }
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('load', handleHash)
    handleScroll() // Initial check
    handleHash() // Check hash on mount

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('load', handleHash)
    }
  }, [])

  return { activeSection, showScrollTop }
}

