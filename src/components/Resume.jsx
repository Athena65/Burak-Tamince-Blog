import { useState } from 'react'

const Resume = () => {
  const [showPreview, setShowPreview] = useState(false)

  return (
    <section id="resume" className="resume section relative rounded-xl border border-white/10 bg-black/50 py-24 shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-[12px] z-[5]">
      {/* Background accents container - maintains containment while letting the preview pop out */}
      <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
        <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-accent/10 blur-[100px]"></div>
        <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-blue-500/10 blur-[100px]"></div>
      </div>
      <div className="container relative z-10 px-4">
        <div className="section-title mb-16 text-center" data-aos="fade-up">
          <h2 className="relative mb-6 inline-block pb-4 text-4xl font-extrabold tracking-tight text-white uppercase">
            Resume
            <span className="absolute bottom-0 left-1/2 h-[4px] w-[80px] -translate-x-1/2 rounded-full bg-gradient-to-r from-accent to-blue-500"></span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-white/70 leading-relaxed">
            Click below to download my comprehensive resume detailing my journey as a Computer Engineer.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-8" data-aos="fade-up" data-aos-delay="100">
          <div className="relative group">
            {/* Download Button */}
            <a
              href="/assets/resume/BT_1611_CV.pdf"
              download="Burak_Tamince_CV.pdf"
              className="relative flex items-center justify-center gap-3 overflow-hidden rounded-full bg-accent px-10 py-5 text-lg font-bold text-white transition-all duration-300 hover:scale-105 hover:bg-accent/90 hover:shadow-[0_0_30px_rgba(var(--accent-rgb),0.5)] focus:outline-none"
              onMouseEnter={() => setShowPreview(true)}
              onMouseLeave={() => setShowPreview(false)}
            >
              <i className="bi bi-file-earmark-arrow-down-fill text-2xl"></i>
              <span>Download CV</span>
            </a>

            {/* Preview Popup */}
            <div
              className={`absolute bottom-full left-1/2 mb-10 -translate-x-1/2 z-[999] transition-all duration-500 ease-out pointer-events-none ${showPreview
                ? 'opacity-100 translate-y-0 scale-100'
                : 'opacity-0 translate-y-10 scale-95'
                }`}
            >
              <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-white/10 p-3 shadow-2xl backdrop-blur-xl">
                <div className="w-56 h-60 overflow-hidden rounded-lg">
                  <img
                    src="/assets/resume/cv_preview.png"
                    alt="CV Preview"
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                </div>
                {/* Decorative arrow */}
                <div className="absolute -bottom-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 border-b border-r border-white/20 bg-white/10 backdrop-blur-xl"></div>
              </div>
            </div>
          </div>

          <p className="text-sm text-white/40 italic">
            * PDF includes contact details, experience, and certifications
          </p>
        </div>
      </div>

    </section>
  )
}

export default Resume

