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
import AOS from 'aos'
import 'aos/dist/aos.css'

function App() {
  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
    })
  }, [])

  return (
    <div className="index-page">
      <main className="main min-h-screen relative">
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
    </div>
  )
}

export default App

