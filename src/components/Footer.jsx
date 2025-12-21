const Footer = () => {
  return (
    <footer
      id="footer"
      className="footer relative border-t border-white/10 bg-black/85 py-12 text-center"
    >
      <div className="container mx-auto px-4">
        <h3 className="sitename mb-4 text-4xl font-bold text-white">Burak Tamince</h3>
        <p className="mb-8 text-[15px] italic text-white">
          Innovating through technology, leaving a mark in every line of code.
        </p>
        <div className="social-links mb-8 flex justify-center gap-3">
          <a
            href="https://www.instagram.com/tmncburak/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-base text-white transition-all duration-300 hover:scale-110 hover:bg-accent/80"
          >
            <i className="bi bi-instagram"></i>
          </a>
          <a
            href="https://www.linkedin.com/in/burak-tamince/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-base text-white transition-all duration-300 hover:scale-110 hover:bg-accent/80"
          >
            <i className="bi bi-linkedin"></i>
          </a>
          <a
            href="https://www.youtube.com/@buraktamince251"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-base text-white transition-all duration-300 hover:scale-110 hover:bg-accent/80"
          >
            <i className="bi bi-youtube"></i>
          </a>
          <a
            href="https://github.com/Athena65"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-base text-white transition-all duration-300 hover:scale-110 hover:bg-accent/80"
          >
            <i className="bi bi-github"></i>
          </a>
        </div>
        <div className="copyright border-t border-white/10 pt-6">
          <span className="text-white">Copyright</span>
          <strong className="sitename px-1 font-bold text-white">Burak Tamince</strong>
          <span className="text-white">All Rights Reserved</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer

