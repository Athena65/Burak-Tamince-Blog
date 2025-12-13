import { useTyped } from '../hooks/useTyped'

const Hero = () => {
  const typedRef = useTyped([
    'Developer',
    'Software Enthusiast',
    'Engineer',
    'Learner',
  ])

  return (
    <section
      id="hero"
      className="hero section light-background relative flex min-h-screen items-center justify-center overflow-hidden py-20"
    >
      <img
        src="/assets/img/hero-bg.jpg"
        alt=""
        className="hero-bg fixed left-0 top-0 z-[1] h-screen w-screen scale-[1.02] object-cover brightness-[0.3] transition-transform duration-[10s] animate-[subtle-zoom_20s_infinite_alternate]"
      />
      <div className="hero-overlay absolute left-0 top-0 z-[2] h-full w-full bg-black/70"></div>
      <div className="container relative z-[3]" data-aos="zoom-out">
        <div className="flex justify-center">
          <div className="w-full lg:w-9/12">
            <h2 className="mb-1 text-4xl font-bold text-white transition-transform duration-300 hover:-translate-y-1 md:text-5xl lg:text-6xl">
              Burak Tamince
            </h2>
            <p className="mt-1 text-xl text-[#e0e6ed] transition-all duration-300 hover:translate-y-[-3px] hover:text-white md:text-2xl lg:text-[26px]">
              I'm{' '}
              <span
                ref={typedRef}
                className="border-b-2 border-accent tracking-wide shadow-[0_4px_6px_-6px_rgba(5,99,187,0.6)] transition-shadow duration-300"
              ></span>
              <span
                className="typed-cursor typed-cursor--blink ml-1"
                aria-hidden="true"
              >
                |
              </span>
            </p>
            <div className="social-links mt-6">
              <a
                href="https://www.instagram.com/tmncburak/"
                target="_blank"
                rel="noopener noreferrer"
                className="mr-5 inline-block text-xl text-white/80 transition-all duration-300 hover:-translate-y-1 hover:text-accent"
              >
                <i className="bi bi-instagram"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/burak-tamince/"
                target="_blank"
                rel="noopener noreferrer"
                className="mr-5 inline-block text-xl text-white/80 transition-all duration-300 hover:-translate-y-1 hover:text-accent"
              >
                <i className="bi bi-linkedin"></i>
              </a>
              <a
                href="https://www.youtube.com/@buraktamince251"
                target="_blank"
                rel="noopener noreferrer"
                className="mr-5 inline-block text-xl text-white/80 transition-all duration-300 hover:-translate-y-1 hover:text-accent"
              >
                <i className="fab fa-youtube"></i>
              </a>
              <a
                href="https://github.com/Athena65"
                target="_blank"
                rel="noopener noreferrer"
                className="mr-5 inline-block text-xl text-white/80 transition-all duration-300 hover:-translate-y-1 hover:text-accent"
              >
                <i className="fab fa-github"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero

