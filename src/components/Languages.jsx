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
    <section id="languages" className="languages section relative overflow-hidden rounded-lg border border-white/18 bg-black/85 py-16 shadow-[0_8px_32px_rgba(0,0,0,0.1)] backdrop-blur-[5px]">
      <div className="container">
        <div className="section-title mb-16 text-center" data-aos="fade-up">
          <h2 className="relative mb-5 pb-5 text-3xl font-bold text-white">
            Languages
            <span className="absolute bottom-0 left-1/2 h-[3px] w-[60px] -translate-x-1/2 bg-accent"></span>
          </h2>
          <p className="m-0 text-white">My language proficiency levels in different languages</p>
        </div>
        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className="flex flex-wrap justify-center gap-4">
            {languages.map((lang, index) => (
              <div
                key={lang.name}
                className="language-item w-full rounded-lg border border-white/10 bg-black/92 p-8 shadow-[0_2px_15px_rgba(0,0,0,0.3)] transition-all duration-300 hover:-translate-y-2.5 hover:border-white/20 hover:bg-black/95 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] md:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.67rem)]"
                data-aos="fade-up"
                data-aos-delay={(index + 2) * 100}
              >
                <div className="mb-3 flex items-center justify-between">
                  <h4 className="mb-0 text-white">{lang.name}</h4>
                  <span className={`badge ${lang.badge} rounded px-2 py-1 text-sm text-white`}>
                    {lang.badgeText}
                  </span>
                </div>
                <div className="language-details mt-3">
                  {lang.skills.map((skill) => (
                    <div key={skill.name} className="mb-2">
                      <div className="mb-1 flex justify-between">
                        <small className="font-bold text-white">
                          <strong>{skill.name}:</strong>
                        </small>
                        <small className="text-white">{skill.level}</small>
                      </div>
                      <div className="h-2 overflow-hidden rounded bg-[rgba(40,40,40,0.8)] shadow-[inset_0_1px_2px_rgba(0,0,0,0.3)]">
                        <div
                          className={`${skill.color} h-full rounded transition-all duration-1000 ease-in-out`}
                          style={{ width: `${skill.percent}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
                {lang.note && (
                  <p className="mt-2 mb-0 text-sm text-white">
                    <small>{lang.note}</small>
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Languages

