const Footer = () => {
  return (
    <footer
      id="footer"
      className="footer relative overflow-hidden border-t border-white/5 bg-black/80 py-16 backdrop-blur-xl"
    >
      {/* Subtle background glow */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 h-32 w-1/2 bg-accent/10 blur-[100px] pointer-events-none"></div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="flex flex-col items-center">
          <h3 className="mb-4 text-4xl font-extrabold tracking-tight text-white uppercase italic">
            Burak <span className="text-accent">Tamince</span>
          </h3>
          <p className="mb-10 max-w-lg text-lg italic text-white/60 leading-relaxed">
            "Innovating through technology, leaving a mark in every line of code."
          </p>

          <div className="mb-12 flex justify-center gap-4">
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
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-xl text-white transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:bg-accent/10 hover:text-accent hover:shadow-lg hover:shadow-accent/20"
              >
                <i className={`bi ${social.icon}`}></i>
              </a>
            ))}
          </div>

          <div className="w-full max-w-4xl border-t border-white/5 pt-8 text-sm">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-white/40">
              <p>&copy; {new Date().getFullYear()} <span className="text-white font-bold">Burak Tamince</span>. All Rights Reserved.</p>
              <div className="flex gap-6 uppercase tracking-widest text-[10px] font-bold">
                <a href="#hero" className="hover:text-accent transition-colors">Home</a>
                <a href="#about" className="hover:text-accent transition-colors">About</a>
                <a href="#portfolio" className="hover:text-accent transition-colors">Projects</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

