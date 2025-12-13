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
    <section id="about" className="about section relative overflow-hidden rounded-lg border border-white/18 bg-black/85 py-16 shadow-[0_8px_32px_rgba(0,0,0,0.1)] backdrop-blur-[5px]">
      <div className="container">
        <div className="section-title mb-16 text-center" data-aos="fade-up">
          <h2 className="relative mb-5 pb-5 text-3xl font-bold text-white">
            About
            <span className="absolute bottom-0 left-1/2 h-[3px] w-[60px] -translate-x-1/2 bg-accent"></span>
          </h2>
          <p className="m-0 text-white">
            I am an <i className="text-accent">innovative</i> and <i className="text-accent">passionate learner</i> with extensive experience in technology and software development. Throughout my career, I have specialized in <strong className="text-accent">web</strong> and <strong className="text-accent">mobile application development</strong>, <i className="text-accent">project management</i>, and <i className="text-accent">software architecture</i>. I am a <strong className="text-accent">determined</strong> and <strong className="text-accent">hardworking</strong> individual who, alongside my <i className="text-accent">academic success</i>, have gained <strong className="text-accent">real-world experience</strong> through <i className="text-accent">internships</i> and continuously strive for <i className="text-accent">self-improvement</i>. I graduated from Istanbul Gedik University Computer Engineering Department with a <strong className="text-accent">GPA of 3.88</strong>, demonstrating my <strong className="text-accent">exceptional academic performance</strong> and <i className="text-accent">dedication</i> to my field. I achieved the distinction of being the <strong className="text-accent">top student</strong> in my faculty and department, and ranked <strong className="text-accent">3rd in the entire university</strong>, showcasing my outstanding commitment to excellence. In addition to my studies, I am currently completing an <strong className="text-accent">internship</strong>, where I am gaining <i className="text-accent">hands-on experience</i> in software development, <strong className="text-accent">problem-solving</strong>, and <i className="text-accent">collaborative teamwork</i>, further enhancing my technical skills and professional growth.
          </p>
        </div>
        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className="flex flex-wrap justify-center gap-4">
            <div className="w-full lg:w-1/3">
              <img
                src="/assets/img/profile-img.jpg"
                className="img-fluid h-auto w-full rounded-xl border border-white/10 shadow-[0_2px_15px_rgba(0,0,0,0.3)] transition-all duration-300 hover:-translate-y-2 hover:scale-[1.03] hover:border-white/20 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                alt="Burak Tamince"
              />
            </div>
            <div className="w-full lg:w-2/3">
              <div className="content rounded-lg border border-white/10 bg-black/92 p-8 shadow-[0_2px_15px_rgba(0,0,0,0.3)] transition-all duration-300 hover:-translate-y-2.5 hover:border-white/20 hover:bg-black/95 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                <h2 className="mb-3 text-2xl font-bold text-white">Computer Engineer & Full-Stack Developer</h2>
                <p className="py-3 italic text-white">
                  I adopt a user-focused, efficiency-driven, and collaborative approach to software projects. My ability to work in teams and my leadership skills have been instrumental in successfully delivering projects.
                </p>
                <div className="row flex flex-wrap">
                  <div className="col-lg-6 w-full lg:w-1/2">
                    <ul className="m-0 list-none p-0">
                      <li className="mb-5 rounded px-2 py-2 transition-all duration-300 hover:translate-x-1 hover:bg-accent/10">
                        <i className="bi bi-chevron-right mr-1 text-accent"></i>
                        <strong className="mr-2.5 text-white">Work Experience:</strong>
                        <span className="text-white" id="experience">{experience}</span>
                      </li>
                      <li className="mb-5 rounded px-2 py-2 transition-all duration-300 hover:translate-x-1 hover:bg-accent/10">
                        <i className="bi bi-chevron-right mr-1 text-accent"></i>
                        <strong className="mr-2.5 text-white">Website:</strong>
                        <span className="text-white" id="website">{website}</span>
                      </li>
                      <li className="mb-5 rounded px-2 py-2 transition-all duration-300 hover:translate-x-1 hover:bg-accent/10">
                        <i className="bi bi-chevron-right mr-1 text-accent"></i>
                        <strong className="mr-2.5 text-white">City:</strong>
                        <span className="text-white">Istanbul, Türkiye</span>
                      </li>
                    </ul>
                  </div>
                  <div className="col-lg-6 w-full lg:w-1/2">
                    <ul className="m-0 list-none p-0">
                      <li className="mb-5 rounded px-2 py-2 transition-all duration-300 hover:translate-x-1 hover:bg-accent/10">
                        <i className="bi bi-chevron-right mr-1 text-accent"></i>
                        <strong className="mr-2.5 text-white">Age:</strong>
                        <span className="text-white" id="age">{age}</span>
                      </li>
                      <li className="mb-5 rounded px-2 py-2 transition-all duration-300 hover:translate-x-1 hover:bg-accent/10">
                        <i className="bi bi-chevron-right mr-1 text-accent"></i>
                        <strong className="mr-2.5 text-white">Degree:</strong>
                        <span className="text-white">Bachelor's Degree</span>
                      </li>
                      <li className="mb-5 rounded px-2 py-2 transition-all duration-300 hover:translate-x-1 hover:bg-accent/10">
                        <i className="bi bi-chevron-right mr-1 text-accent"></i>
                        <strong className="mr-2.5 text-white">Email:</strong>
                        <span className="text-white">
                          <a
                            href="mailto:btamince@gmail.com"
                            className="email-link text-accent transition-colors duration-300 hover:text-white"
                            title="Click to send an email"
                          >
                            btamince@gmail.com
                          </a>
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About

