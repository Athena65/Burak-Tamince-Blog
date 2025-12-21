import { useScroll } from '../hooks/useScroll'

const ScrollTop = () => {
  const { showScrollTop } = useScroll()

  const handleClick = (e) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <a
      href="#"
      id="scroll-top"
      onClick={handleClick}
      className={`fixed right-4 z-[10002] flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-400 shadow-lg shadow-black/20 hover:bg-accent hover:border-accent ${showScrollTop
          ? 'bottom-4 visible opacity-100 translate-y-0'
          : 'bottom-0 invisible opacity-0 translate-y-10'
        }`}
    >
      <i className="bi bi-arrow-up-short text-3xl text-white"></i>
    </a>
  )
}

export default ScrollTop

