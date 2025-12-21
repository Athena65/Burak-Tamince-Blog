const Languages = () => {
  const languages = [
    {
      name: 'Turkish',
      level: 'Native',
      badge: 'bg-success',
      badgeText: 'Native',
      skills: [
        { name: 'Speaking', level: 'Native', percent: 100, color: 'bg-success' },
        { name: 'Writing', level: 'Native', percent: 100, color: 'bg-success' },
        { name: 'Reading', level: 'Native', percent: 100, color: 'bg-success' },
        { name: 'Listening', level: 'Native', percent: 100, color: 'bg-success' },
      ],
      note: null,
    },
    {
      name: 'English',
      level: 'B2',
      badge: 'bg-primary',
      badgeText: 'B2',
      skills: [
        { name: 'Speaking', level: 'B2', percent: 70, color: 'bg-accent' },
        { name: 'Writing', level: 'B2', percent: 70, color: 'bg-accent' },
        { name: 'Reading', level: 'B2', percent: 70, color: 'bg-accent' },
        { name: 'Listening', level: 'B2', percent: 70, color: 'bg-accent' },
      ],
      note: 'Upper Intermediate Level',
    },
    {
      name: 'German',
      level: 'A2',
      badge: 'bg-primary',
      badgeText: 'A2',
      skills: [
        { name: 'Speaking', level: 'A2', percent: 40, color: 'bg-accent' },
        { name: 'Writing', level: 'A2', percent: 40, color: 'bg-accent' },
        { name: 'Reading', level: 'A2', percent: 40, color: 'bg-accent' },
        { name: 'Listening', level: 'A2', percent: 40, color: 'bg-accent' },
      ],
      note: 'Elementary Level',
    },
  ]

  return (
    <section id="languages" className="languages section relative overflow-hidden rounded-xl border border-white/10 bg-black/50 py-24 shadow-2xl backdrop-blur-md">
      {/* Background Glows */}
      <div className="absolute -left-24 top-0 h-96 w-96 rounded-full bg-accent/10 blur-[120px]"></div>
      <div className="absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-blue-500/5 blur-[120px]"></div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="section-title mb-16 text-center" data-aos="fade-up">
          <h2 className="relative mb-6 inline-block pb-4 text-4xl font-extrabold tracking-tight text-white uppercase">
            Languages
            <span className="absolute bottom-0 left-1/2 h-[4px] w-[80px] -translate-x-1/2 rounded-full bg-gradient-to-r from-accent to-blue-500"></span>
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-white/70 leading-relaxed">
            Multi-lingual proficiency enabling cross-cultural communication and access to diverse technical resources.
          </p>
        </div>

        <div className="flex flex-wrap" data-aos="fade-up" data-aos-delay="100">
          {languages.map((lang, index) => (
            <div key={lang.name} className="w-full p-3 md:w-1/2 lg:w-1/3 group">
              <div className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 transition-all duration-500 hover:border-accent/30 hover:bg-white/10 hover:shadow-2xl hover:-translate-y-2">
                <div className="mb-6 flex items-center justify-between">
                  <h4 className="text-2xl font-bold text-white group-hover:text-accent transition-colors">{lang.name}</h4>
                  <span className="rounded-full bg-accent/20 px-3 py-1 text-xs font-bold text-accent border border-accent/20">
                    {lang.badgeText}
                  </span>
                </div>

                <div className="space-y-4">
                  {lang.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="mb-2 flex justify-between text-xs">
                        <span className="font-bold text-white/70 tracking-wider uppercase">{skill.name}</span>
                        <span className="text-accent font-medium">{skill.level}</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-accent to-blue-400 shadow-[0_0_8px_rgba(5,99,187,0.4)] transition-all duration-1000 ease-out"
                          role="progressbar"
                          style={{ width: `${skill.percent}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>

                {lang.note && (
                  <div className="mt-6 pt-4 border-t border-white/5 italic text-white/40 text-[11px] text-center">
                    {lang.note}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Languages

