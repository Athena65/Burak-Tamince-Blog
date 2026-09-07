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
import { useLanguage } from './i18n/LanguageContext'
import AOS from 'aos'
import 'aos/dist/aos.css'

function App() {
  const { t, lang } = useLanguage()

  // The tab title and the description are visitor-facing strings too. index.html
  // keeps the English copy as the crawler / first-paint default; this follows the
  // language switch so a Turkish reader does not sit under an English tab title.
  useEffect(() => {
    document.title = t({
      en: 'Burak Tamince | Full-Stack Developer & Computer Engineer',
      tr: 'Burak Tamince | Full-Stack Geliştirici ve Bilgisayar Mühendisi',
    })

    const description = document.querySelector('meta[name="description"]')
    if (description) {
      description.setAttribute(
        'content',
        t({
          en: 'Portfolio of Burak Tamince — Computer Engineer and full-stack developer in Istanbul. ASP.NET Core, React, AWS, PHP, Moodle, AI (Bedrock), and HR software. Experience at Rapidsol and Waytogo; projects, certificates, and resume.',
          tr: "Burak Tamince'nin portföyü — İstanbul'da bilgisayar mühendisi ve full-stack geliştirici. ASP.NET Core, React, AWS, PHP, Moodle, yapay zekâ (Bedrock) ve İK yazılımları. Rapidsol ve Waytogo deneyimi; projeler, sertifikalar ve özgeçmiş.",
        }),
      )
    }
  }, [lang, t])

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

