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
      className="progress-item mb-4 rounded-lg border border-white/10 bg-black/92 p-4 shadow-[0_2px_15px_rgba(0,0,0,0.3)] transition-all duration-300 hover:-translate-y-2 hover:border-white/20 hover:bg-black/95 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
      data-value={skill.value}
    >
      <span className="skill mb-1.5 block text-sm font-semibold text-white">
        <span>{skill.name}</span>
        <i className="val float-right font-bold text-accent">{skill.value}%</i>
      </span>
      <div className="progress-bar-wrap h-2.5 overflow-hidden rounded bg-[rgba(40,40,40,0.8)] shadow-[inset_0_1px_2px_rgba(0,0,0,0.3)]">
        <div
          className="progress-bar h-full rounded bg-accent transition-all duration-1000 ease-in-out"
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
    <section id="skills" className="skills section relative overflow-hidden rounded-lg border border-white/18 bg-black/85 py-16 shadow-[0_8px_32px_rgba(0,0,0,0.1)] backdrop-blur-[5px]">
      <div className="container">
        <div className="section-title mb-16 text-center" data-aos="fade-up">
          <h2 className="relative mb-5 pb-5 text-3xl font-bold text-white">
            Skills
            <span className="absolute bottom-0 left-1/2 h-[3px] w-[60px] -translate-x-1/2 bg-accent"></span>
          </h2>
          <p className="m-0 text-white">
            My expertise in software development includes the following skills and technical proficiencies
          </p>
        </div>
        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div
            ref={skillsContainerRef}
            className="skills-content skills-animation flex flex-wrap gap-4 rounded-lg bg-black/92 p-8 shadow-[0_5px_15px_rgba(0,0,0,0.05)]"
          >
            <div className="left-skills w-full lg:w-1/2">
              {leftSkills.map((skill) => (
                <SkillItem key={skill.name} skill={skill} />
              ))}
            </div>
            <div className="right-skills w-full lg:w-1/2">
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

