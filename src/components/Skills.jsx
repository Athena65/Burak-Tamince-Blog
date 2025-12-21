import { useEffect, useRef } from 'react'

const Skills = () => {
  const skillsContainerRef = useRef(null)

  const leftSkills = [
    { name: 'JavaScript | React.js', value: 70 },
    { name: 'HTML,CSS', value: 85 },
    { name: 'Python', value: 70 },
    { name: 'SQL (MSSQL, MySQL)', value: 85 },
    { name: 'PHP', value: 95 },
    { name: 'C#', value: 60 },
    { name: 'Computer Vision', value: 70 },
    { name: 'Wordpress', value: 50 },
    { name: 'Artificial Intelligence & Fine-tuning', value: 80 },
    { name: 'Amazon Web Services', value: 80 },
  ]

  const rightSkills = [
    { name: 'Laravel', value: 80 },
    { name: 'ASP.NET Core', value: 95 },
    { name: 'MySQL', value: 95 },
    { name: 'Computer Networks', value: 40 },
    { name: 'Cyber Security', value: 75 },
    { name: 'Agile/SCRUM Methodoly', value: 95 },
    { name: 'Git-Github', value: 95 },
    { name: 'API Technologies (REST, SOAP, GraphQL)', value: 100 },
    { name: 'Moodle', value: 90 },
    { name: 'Docker', value: 80 },
  ]

  useEffect(() => {
    // Sort skills by value (descending)
    const sortSkills = (container) => {
      if (!container) return
      const progressItems = Array.from(container.querySelectorAll('.progress-item'))
      progressItems.sort((a, b) => {
        const aValue = parseInt(a.getAttribute('data-value'))
        const bValue = parseInt(b.getAttribute('data-value'))
        return bValue - aValue
      })
      progressItems.forEach((item) => container.appendChild(item))
    }

    if (skillsContainerRef.current) {
      const leftCol = skillsContainerRef.current.querySelector('.left-skills')
      const rightCol = skillsContainerRef.current.querySelector('.right-skills')
      sortSkills(leftCol)
      sortSkills(rightCol)
    }
  }, [])

  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px',
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const progressBars = entry.target.querySelectorAll('.progress-bar')
          progressBars.forEach((bar) => {
            const value = bar.getAttribute('data-value')
            bar.style.width = `${value}%`
          })
        }
      })
    }, observerOptions)

    if (skillsContainerRef.current) {
      observer.observe(skillsContainerRef.current)
    }

    return () => {
      if (skillsContainerRef.current) {
        observer.unobserve(skillsContainerRef.current)
      }
    }
  }, [])

  const SkillItem = ({ skill }) => (
    <div
      className="progress-item mb-2 group"
      data-value={skill.value}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-bold text-white/90 group-hover:text-accent transition-colors">{skill.name}</span>
        <span className="text-xs font-bold text-accent bg-accent/10 px-2 py-0.5 rounded-full">{skill.value}%</span>
      </div>
      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
        <div
          className="progress-bar h-full rounded-full bg-gradient-to-r from-accent to-blue-400 shadow-[0_0_10px_rgba(5,99,187,0.5)] transition-all duration-1000 ease-out"
          role="progressbar"
          aria-valuenow={skill.value}
          aria-valuemin="0"
          aria-valuemax="100"
          data-value={skill.value}
          style={{ width: '0%' }}
        ></div>
      </div>
    </div>
  )

  return (
    <section id="skills" className="skills section relative overflow-hidden rounded-xl border border-white/10 bg-black/50 py-24 shadow-2xl backdrop-blur-md">
      {/* Background Glows */}
      <div className="absolute -right-24 top-0 h-96 w-96 rounded-full bg-accent/10 blur-[120px]"></div>
      <div className="absolute -left-24 bottom-0 h-96 w-96 rounded-full bg-blue-500/5 blur-[120px]"></div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="section-title mb-16 text-center" data-aos="fade-up">
          <h2 className="relative mb-6 inline-block pb-4 text-4xl font-extrabold tracking-tight text-white uppercase">
            Technical Skills
            <span className="absolute bottom-0 left-1/2 h-[4px] w-[80px] -translate-x-1/2 rounded-full bg-gradient-to-r from-accent to-blue-500"></span>
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-white/70 leading-relaxed">
            A comprehensive overview of my technical expertise and proficiency in various tools,
            languages, and frameworks developed through years of dedicated practice.
          </p>
        </div>

        <div className="row" data-aos="fade-up" data-aos-delay="100">
          <div
            ref={skillsContainerRef}
            className="flex flex-wrap -mx-4"
          >
            <div className="left-skills w-full lg:w-1/2 px-4 space-y-2">
              {leftSkills.map((skill) => (
                <SkillItem key={skill.name} skill={skill} />
              ))}
            </div>
            <div className="right-skills w-full lg:w-1/2 px-4 space-y-2">
              {rightSkills.map((skill) => (
                <SkillItem key={skill.name} skill={skill} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills

