import { useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Languages from './components/Languages'
import Skills from './components/Skills'
import Certificates from './components/Certificates'
import Resume from './components/Resume'
import Portfolio from './components/Portfolio'
import Videos from './components/Videos'
import Footer from './components/Footer'
import ScrollTop from './components/ScrollTop'
import MouseTrail from './components/MouseTrail'
import AnalyticsDebugPanel from './components/AnalyticsDebugPanel'
import AOS from 'aos'
import 'aos/dist/aos.css'

function App() {
  useEffect(() => {
    AOS.init({
      // One quiet reveal per block: a short fade, no slide.
      duration: 450,
      easing: 'ease-out',
      offset: 40,
      once: true,
      mirror: false,
      // Below xl, observers can fail to fire; content would stay opacity:0 (black screen).
      // Also respect reduced-motion (index.css forces opacity:1 there too).
      disable: () =>
        typeof window !== 'undefined' &&
        (window.innerWidth < 1280 || window.matchMedia('(prefers-reduced-motion: reduce)').matches),
    })
  }, [])

  return (
    <div className="index-page">
      <main id="main-content" className="main min-h-screen relative">
        <Header />
        <Hero />
        <About />
        <Languages />
        <Skills />
        <Certificates />
        <Resume />
        <Portfolio />
        <Videos />
      </main>
      <Footer />
      <ScrollTop />
      <MouseTrail />
      <AnalyticsDebugPanel />
    </div>
  )
}

export default App

