import { useEffect, useState } from 'react'

const About = () => {
  const [age, setAge] = useState('')
  const [experience, setExperience] = useState('')
  const [website, setWebsite] = useState('')

  useEffect(() => {
    // Calculate age
    const calculateAge = () => {
      const birthDate = new Date(2002, 5, 17)
      const today = new Date()
      let age = today.getFullYear() - birthDate.getFullYear()
      const monthDiff = today.getMonth() - birthDate.getMonth()
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--
      }
      setAge(age.toString())
    }

    // Calculate experience
    const calculateExperience = () => {
      const startDate = new Date()
      startDate.setFullYear(startDate.getFullYear() - 3)
      const today = new Date()
      let years = today.getFullYear() - startDate.getFullYear()
      let months = today.getMonth() - startDate.getMonth()
      if (months < 0) {
        years--
        months += 12
      }
      let expText = `+${years} year${years !== 1 ? 's' : ''}`
      if (months > 0) {
        expText += ` ${months} month${months !== 1 ? 's' : ''}`
      }
      setExperience(expText)
    }

    // Set website
    const setWebsiteName = () => {
      setWebsite(window.location.hostname)
    }

    calculateAge()
    calculateExperience()
    setWebsiteName()

    // Update age daily
    const ageInterval = setInterval(calculateAge, 86400000) // 24 hours
    // Update experience monthly
    const expInterval = setInterval(calculateExperience, 2592000000) // ~30 days

    return () => {
      clearInterval(ageInterval)
      clearInterval(expInterval)
    }
  }, [])

  return (
    <section id="about" className="about section relative overflow-hidden rounded-xl border border-white/10 bg-black/50 py-24 shadow-2xl backdrop-blur-md">
      {/* Background Glows */}
      <div className="absolute -left-24 top-0 h-96 w-96 rounded-full bg-accent/10 blur-[120px]"></div>
      <div className="absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-blue-500/5 blur-[120px]"></div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="section-title mb-16 text-center" data-aos="fade-up">
          <h2 className="relative mb-6 inline-block pb-4 text-4xl font-extrabold tracking-tight text-white uppercase text-center">
            About Me
            <span className="absolute bottom-0 left-1/2 h-[4px] w-[80px] -translate-x-1/2 rounded-full bg-gradient-to-r from-accent to-blue-500"></span>
          </h2>
          <p className="mx-auto max-w-4xl text-lg text-white/80 leading-relaxed italic">
            "An <span className="text-accent font-semibold">innovative</span> and <span className="text-accent font-semibold">passionate learner</span> with a deep focus on building scalable solutions and mastering modern software architectures."
          </p>
        </div>

        <div className="flex flex-wrap lg:flex-nowrap items-center gap-12" data-aos="fade-up" data-aos-delay="100">
          <div className="w-full lg:w-1/3 flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-accent to-blue-600 opacity-25 blur transition duration-1000 group-hover:opacity-50 group-hover:duration-200"></div>
              <img
                src="/assets/img/profile-img.jpg"
                className="relative h-auto max-w-[320px] w-full rounded-2xl border border-white/20 shadow-2xl transition-all duration-500 group-hover:scale-[1.02]"
                alt="Burak Tamince"
              />
            </div>
          </div>

          <div className="w-full lg:w-2/3">
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-white tracking-tight">
                Computer Engineer & <span className="text-accent">Full-Stack Developer</span>
              </h3>
              <p className="text-white/70 text-lg leading-relaxed">
                I graduated from Istanbul Gedik University as the <span className="text-white font-bold">top student</span> of my faculty with an exceptional <span className="text-white font-bold">GPA of 3.88</span>. My approach is user-centric, efficiency-driven, and highly collaborative. I specialize in turning complex problems into elegant, maintainable code.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 pt-4">
                {[
                  { label: 'Experience', value: experience, icon: 'bi-briefcase' },
                  { label: 'Degree', value: "Bachelor's Degree", icon: 'bi-mortarboard' },
                  { label: 'City', value: 'Istanbul, Türkiye', icon: 'bi-geo-alt' },
                  { label: 'Age', value: age, icon: 'bi-calendar-event' },
                  { label: 'Website', value: website, icon: 'bi-globe' },
                  { label: 'Email', value: 'btamince@gmail.com', icon: 'bi-envelope', isEmail: true },
                ].map((info, i) => (
                  <div key={i} className="flex items-center gap-4 group/item">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 border border-white/10 group-hover/item:border-accent group-hover/item:bg-accent/10 transition-colors">
                      <i className={`bi ${info.icon} text-accent`}></i>
                    </div>
                    <div>
                      <span className="block text-[11px] font-bold uppercase tracking-widest text-white/40">{info.label}</span>
                      {info.isEmail ? (
                        <a href={`mailto:${info.value}`} className="text-white hover:text-accent transition-colors font-medium">{info.value}</a>
                      ) : (
                        <span className="text-white font-medium">{info.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About

