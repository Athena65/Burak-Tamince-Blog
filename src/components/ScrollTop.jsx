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
      className={`fixed right-4 z-[99999] flex h-11 w-11 items-center justify-center rounded-full bg-accent transition-all duration-400 ${
        showScrollTop
          ? 'bottom-4 visible opacity-100'
          : 'bottom-[-15px] invisible opacity-0'
      }`}
    >
      <i className="bi bi-arrow-up-short text-2xl text-white"></i>
    </a>
  )
}

export default ScrollTop

