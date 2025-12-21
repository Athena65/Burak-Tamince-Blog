import { useMemo } from 'react'
import { useTyped } from '../hooks/useTyped'

const CodeWindow = () => {
  return (
    <div className="code-window group relative overflow-hidden rounded-xl border border-white/10 bg-[#0d1117]/90 backdrop-blur-xl shadow-2xl transition-all duration-500 hover:border-accent/40">
      <div className="window-header flex items-center justify-between bg-white/5 px-4 py-2 text-white/40">
        <div className="window-controls flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#ff5f56]"></span>
          <span className="h-3 w-3 rounded-full bg-[#ffbd2e]"></span>
          <span className="h-3 w-3 rounded-full bg-[#27c93f]"></span>
        </div>
        <div className="text-[10px] font-mono uppercase tracking-widest">terminal — zsh</div>
      </div>
      <div className="code-content p-6 font-mono text-[13px] leading-relaxed">
        <div className="flex gap-4">
          <span className="w-4 text-right text-white/20 select-none font-sans">1</span>
          <p className="text-white/90">
            <span className="text-accent">$</span> <span className="text-purple-400">npx</span> <span className="text-yellow-200">create-react-app</span> <span className="text-green-300">burak-tamince-blog</span>
          </p>
        </div>
        <div className="flex gap-4">
          <span className="w-4 text-right text-white/20 select-none font-sans">2</span>
          <p className="text-white/90">
            <span className="text-accent">$</span> <span className="text-purple-400">cd</span> <span className="text-blue-300">burak-tamince-blog</span>
          </p>
        </div>
        <div className="flex gap-4">
          <span className="w-4 text-right text-white/20 select-none font-sans">3</span>
          <p className="text-white/90">
            <span className="text-accent">$</span> <span className="text-purple-400">npm</span> <span className="text-yellow-200">run dev</span>
          </p>
        </div>
        <div className="flex gap-4 h-2"></div>
        <div className="flex gap-4">
          <span className="w-4 text-right text-white/20 select-none font-sans">4</span>
          <p className="text-white/40">
            <span className="text-green-400">✓</span> <span className="text-green-400">VITE v5.0.0 </span><span className="text-white/40">ready in  <span className="text-white">150ms</span></span>
          </p>
        </div>
        <div className="flex gap-4 h-2"></div>
        <div className="flex gap-4">
          <span className="w-4 text-right text-white/20 select-none font-sans">5</span>
          <p className="text-white/90">
            <span className="text-blue-300">➜</span> <span className="text-white">Local:</span> <span className="text-cyan-400 hover:underline cursor-pointer">http://localhost:5173/</span>
          </p>
        </div>
        <div className="flex gap-4">
          <span className="w-4 text-right text-white/20 select-none font-sans">6</span>
          <p className="text-white/90">
            <span className="text-blue-300">➜</span> <span className="text-white/40">Network:</span> <span className="text-white">use </span><span className="text-white">--host</span><span className="text-white/40"> to expose</span>
          </p>
        </div>
        <div className="flex gap-4">
          <span className="w-4 text-right text-white/20 select-none font-sans">7</span>
          <p className="text-white/40">
            <span className="text-blue-300">➜</span> <span className="text-white/40">press </span><span className="text-white">h + enter</span><span className="text-white/40"> to show help</span>
          </p>
        </div>

        <div className="mt-2 h-5 w-2 animate-pulse bg-accent/60"></div>
      </div>
    </div>
  )
}


const Hero = () => {
  const typedStrings = useMemo(() => [
    'Developer',
    'Software Enthusiast',
    'Engineer',
    'Learner',
  ], [])

  const typedRef = useTyped(typedStrings)

  return (
    <>
      {/* GLOBAL FIXED BACKGROUND IMAGE - Visible in other sections */}
      <img
        src="/assets/img/hero-bg.jpg"
        alt=""
        className="hero-bg fixed left-0 top-0 z-[1] h-screen w-screen scale-[1.02] object-cover brightness-[0.25] transition-transform duration-[10s] animate-[subtle-zoom_20s_infinite_alternate] pointer-events-none"
      />

      <section
        id="hero"
        className="hero section relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0a0a0a] z-[10] !m-0"
      >

        {/* Decorative Network Grid */}
        <div className="absolute inset-0 z-[0] opacity-[0.03]">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dotGridLarge" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dotGridLarge)" />
          </svg>
        </div>

        <div className="container relative z-[10] mx-auto">
          <div className="flex flex-col items-center gap-16 lg:flex-row lg:text-left">

            {/* Text Side */}
            <div className="flex-1 space-y-8" data-aos="fade-right">
              <div>
                <h2 className="mb-2 text-4xl font-light text-white/90 md:text-5xl">
                  Hi, I'm
                </h2>
                <h1 className="text-6xl font-black tracking-tight text-white md:text-8xl">
                  Burak <span className="text-accent  decoration-accent/30 ">Tamince</span>
                </h1>
              </div>

              <div className="typewriter-container flex items-center justify-center gap-3 text-2xl font-light text-white/50 lg:justify-start">
                <span ref={typedRef} className="text-white font-normal"></span>
                <span className="animate-pulse font-bold text-accent">|</span>
              </div>

              <p className="max-w-xl text-lg text-white/40 leading-relaxed font-light mt-4">
                Computer Engineer • Full-Stack Developer
              </p>

              {/* Social Links - Glass Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                {[
                  { href: 'https://github.com/Athena65', icon: 'bi-github' },
                  { href: 'https://www.linkedin.com/in/burak-tamince/', icon: 'bi-linkedin' },
                  { href: 'https://www.youtube.com/@buraktamince251', icon: 'bi-youtube' },
                  { href: 'https://www.instagram.com/tmncburak/', icon: 'bi-instagram' },
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-xl text-white transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:bg-accent/10 hover:text-accent"
                  >
                    <i className={`bi ${social.icon}`}></i>
                  </a>
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-4 lg:justify-start">
                <a
                  href="#portfolio"
                  className="group flex items-center gap-2 rounded-lg bg-accent px-8 py-4 text-sm font-bold text-white transition-all hover:bg-accent/80 hover:shadow-xl hover:shadow-accent/20"
                >
                  <i className="bi bi-code-slash text-lg group-hover:scale-110 transition-transform"></i>
                  View Projects
                </a>
                <a
                  href="#about"
                  className="group flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-6 py-4 text-sm font-bold text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:border-accent/40"
                >
                  <i className="bi bi-person text-lg"></i>
                  About Me
                </a>
              </div>
            </div>

            {/* Visual Side (Code Window) */}
            <div className="hidden flex-1 lg:block" data-aos="fade-left" data-aos-delay="200">
              <div className="relative">
                <div className="absolute -inset-10 rounded-[40px] bg-accent/10 blur-[80px]"></div>
                <CodeWindow />
              </div>
            </div>

          </div>
        </div>

        {/* Scroll Down Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30 select-none animate-bounce">
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-white">Scroll Down</span>
          <i className="bi bi-chevron-double-down text-lg"></i>
        </div>
      </section>
    </>
  )
}

export default Hero
