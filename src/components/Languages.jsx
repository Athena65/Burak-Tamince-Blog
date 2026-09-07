import SectionHeader from './SectionHeader'
import { useLanguage } from '../i18n/LanguageContext'

// CEFR codes stay as codes; only "Native" is a word, so only it gets a pair.
const nativeLevel = { en: 'Native', tr: 'Ana dil' }

const skillLabels = {
  speaking: { en: 'Speaking', tr: 'Konuşma' },
  writing: { en: 'Writing', tr: 'Yazma' },
  reading: { en: 'Reading', tr: 'Okuma' },
  listening: { en: 'Listening', tr: 'Dinleme' },
}

const Languages = () => {
  const { t } = useLanguage()

  const languages = [
    {
      id: 'turkish',
      name: { en: 'Turkish', tr: 'Türkçe' },
      level: nativeLevel,
      skills: [
        { id: 'speaking', name: skillLabels.speaking, percent: 100 },
        { id: 'writing', name: skillLabels.writing, percent: 100 },
        { id: 'reading', name: skillLabels.reading, percent: 100 },
        { id: 'listening', name: skillLabels.listening, percent: 100 },
      ],
      note: null,
    },
    {
      id: 'english',
      name: { en: 'English', tr: 'İngilizce' },
      level: 'B2',
      skills: [
        { id: 'speaking', name: skillLabels.speaking, percent: 70 },
        { id: 'writing', name: skillLabels.writing, percent: 70 },
        { id: 'reading', name: skillLabels.reading, percent: 70 },
        { id: 'listening', name: skillLabels.listening, percent: 70 },
      ],
      note: { en: 'Upper intermediate', tr: 'Orta-üstü' },
    },
    {
      id: 'german',
      name: { en: 'German', tr: 'Almanca' },
      level: 'A2',
      skills: [
        { id: 'speaking', name: skillLabels.speaking, percent: 40 },
        { id: 'writing', name: skillLabels.writing, percent: 40 },
        { id: 'reading', name: skillLabels.reading, percent: 40 },
        { id: 'listening', name: skillLabels.listening, percent: 40 },
      ],
      note: { en: 'Elementary', tr: 'Başlangıç' },
    },
  ]

  return (
    <section id="languages" className="languages section relative border-t border-rule py-20 md:py-28">
      <div className="container">
        <SectionHeader
          title={t({ en: 'Languages', tr: 'Diller' })}
          deck={t({
            en: 'Turkish native, English B2, German A2.',
            tr: 'Türkçe ana dil, İngilizce B2, Almanca A2.',
          })}
        />

        {/* One row per language; rows share hairlines, the wrapper closes the last one */}
        <ul className="border-b border-rule" data-aos="fade-up" data-aos-delay="100">
          {languages.map((language) => (
            <li key={language.id} className="grid items-baseline gap-4 border-t border-rule py-6 md:grid-cols-12">
              <div className="md:col-span-3">
                <div className="flex items-baseline">
                  <h3 className="font-display stretch-normal text-xl font-semibold tracking-tight text-paper">{t(language.name)}</h3>
                  <span className="ml-3 text-brass tabular-nums">{t(language.level)}</span>
                </div>
                {language.note && <p className="mt-1 text-sm text-paper-mute">{t(language.note)}</p>}
              </div>

              <div className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4 md:col-span-9">
                {language.skills.map((skill) => (
                  <div key={skill.id}>
                    <p className="text-sm text-paper-mute">{t(skill.name)}</p>
                    <div
                      className="mt-2 h-1 rounded-none bg-ink-3"
                      role="progressbar"
                      aria-valuenow={skill.percent}
                      aria-valuemin="0"
                      aria-valuemax="100"
                      aria-label={`${t(language.name)} ${t(skill.name)}`}
                    >
                      <div className="h-full bg-accent" style={{ width: `${skill.percent}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Languages
