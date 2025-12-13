const Resume = () => {
  return (
    <section id="resume" className="resume section relative overflow-hidden rounded-lg border border-white/18 bg-black/85 py-16 shadow-[0_8px_32px_rgba(0,0,0,0.1)] backdrop-blur-[5px]">
      <div className="container">
        <div className="section-title mb-16 text-center" data-aos="fade-up">
          <h2 className="relative mb-5 pb-5 text-3xl font-bold text-white">
            Resume
            <span className="absolute bottom-0 left-1/2 h-[3px] w-[60px] -translate-x-1/2 bg-accent"></span>
          </h2>
          <p className="m-0 text-white">
            Below, you can view or download my comprehensive resume detailing my educational background, professional experience, technical skills, and achievements. Feel free to explore it for more insights into my qualifications and expertise.
          </p>
        </div>
        <div className="container">
          <div className="embed-container relative mx-auto max-w-full pb-[56.25%]">
            <iframe
              src="/assets/resume/BT_1611_CV.pdf"
              className="absolute left-0 top-0 h-full w-full border-0"
              title="Resume PDF"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Resume

