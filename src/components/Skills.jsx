import { useEffect, useRef } from 'react'

const Skills = () => {
  const skillsContainerRef = useRef(null)

  const skillGroups = [
    {
      category: 'Development',
      icon: 'bi-code-slash',
      skills: [
        { name: 'ASP.NET Core & .NET Core', value: 95 },
        { name: 'ASP.NET Web API', value: 95 },
        { name: 'PHP', value: 95 },
        { name: 'Object-Oriented Programming (OOP)', value: 90 },
        { name: 'HTML, CSS', value: 85 },
        { name: 'Laravel', value: 80 },
        { name: 'React.js', value: 70 },
        { name: 'C#', value: 60 },
        { name: 'WordPress', value: 50 },
      ].sort((a, b) => b.value - a.value)
    },
    {
      category: 'Methods & AI',
      icon: 'bi-gear',
      skills: [
        { name: 'API Technologies', value: 100 },
        { name: 'Git & GitHub', value: 95 },
        { name: 'Agile & Scrum', value: 95 },
        { name: 'Moodle', value: 90 },
        { name: 'AI & Fine-tuning', value: 80 },
        { name: 'Cyber Security', value: 75 },
        { name: 'Computer Vision / Görüntü İşleme', value: 70 },
        { name: 'Python', value: 70 },
      ].sort((a, b) => b.value - a.value)
    },
    {
      category: 'Data & Infrastructure',
      icon: 'bi-database',
      skills: [
        { name: 'MySQL & MariaDB', value: 95 },
        { name: 'Server Side Programming', value: 92 },
        { name: 'SQL Server Management Studio', value: 90 },
        { name: 'Back-end Operations', value: 90 },
        { name: 'SQL / Microsoft SQL Server', value: 85 },
        { name: 'Docker', value: 80 },
        { name: 'Amazon Web Services (AWS)', value: 80 },
      ].sort((a, b) => b.value - a.value)
    }
  ]

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
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
      });
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
    <div className="progress-item mb-4 group" data-value={skill.value}>
      <div className="flex items-center justify-between mb-1.5 px-1">
        <span className="text-sm font-medium text-white/80 group-hover:text-accent transition-colors duration-300">{skill.name}</span>
        <span className="text-xs font-bold text-accent">{skill.value}%</span>
      </div>
      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
        <div
          className="progress-bar h-full rounded-full bg-gradient-to-r from-accent to-blue-400 shadow-[0_0_10px_rgba(5,99,187,0.3)] transition-all duration-1000 ease-out"
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
      <div className="absolute -right-24 top-0 h-96 w-96 rounded-full bg-accent/5 blur-[120px]"></div>
      <div className="absolute -left-24 bottom-0 h-96 w-96 rounded-full bg-blue-500/5 blur-[120px]"></div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="section-title mb-16 text-center" data-aos="fade-up">
          <h2 className="relative mb-6 inline-block pb-4 text-4xl font-extrabold tracking-tight text-white uppercase">
            Technical Skills
            <span className="absolute bottom-0 left-1/2 h-[4px] w-[80px] -translate-x-1/2 rounded-full bg-gradient-to-r from-accent to-blue-500"></span>
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-white/60 leading-relaxed">
            Proficiency across diverse technical domains, from full-stack development to cloud infrastructure and AI integration.
          </p>
        </div>

        <div ref={skillsContainerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-aos="fade-up" data-aos-delay="100">
          {skillGroups.map((group, idx) => (
            <div key={idx} className="relative group/card p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-accent/20 transition-all duration-500">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 border border-accent/20 text-accent group-hover/card:bg-accent group-hover/card:text-white transition-all duration-500">
                  <i className={`bi ${group.icon} text-xl`}></i>
                </div>
                <h3 className="text-xl font-bold text-white">{group.category}</h3>
              </div>
              <div className="space-y-1">
                {group.skills.map((skill) => (
                  <SkillItem key={skill.name} skill={skill} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
