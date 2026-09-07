import { useEffect, useState } from 'react'
import SectionHeader from './SectionHeader'
import { useLanguage } from '../i18n/LanguageContext'

const About = () => {
  const { t } = useLanguage()
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
    <section id="about" className="about section relative border-t border-rule py-20 md:py-28">
      <div className="container">
        <SectionHeader
          title={t({ en: 'About', tr: 'Hakkımda' })}
          deck={t({
            en: 'Computer engineer from Istanbul Gedik University: first in the Computer Engineering department, first in the Faculty of Engineering and third across the university, with a 3.88 GPA. I build full-stack products, ASP.NET Core and React on AWS at Rapidsol, and a PHP and Moodle coaching platform with AI integrations at Waytogo.',
            tr: "İstanbul Gedik Üniversitesi mezunu bilgisayar mühendisiyim: 3,88 ortalamayla Bilgisayar Mühendisliği bölüm birincisi, Mühendislik Fakültesi birincisi ve üniversite üçüncüsüyüm. Rapidsol'da AWS üzerinde ASP.NET Core ve React ile full-stack ürünler, Waytogo'da ise yapay zeka entegrasyonlu PHP ve Moodle tabanlı bir koçluk platformu geliştiriyorum.",
          })}
        />

        <div className="grid items-start gap-10 md:grid-cols-12 md:gap-8" data-aos="fade-up" data-aos-delay="100">
          <div className="md:col-span-5 lg:col-span-4">
            <img
              src="/assets/img/profile-img.jpg"
              className="w-full rounded-md border border-rule"
              alt={t({
                en: 'Burak Tamince — Computer Engineer and full-stack developer, Istanbul; ASP.NET Core, React, AWS, PHP, Moodle.',
                tr: 'Burak Tamince — Bilgisayar mühendisi ve full-stack geliştirici, İstanbul; ASP.NET Core, React, AWS, PHP, Moodle.',
              })}
            />
            <p className="mt-3 text-sm text-paper-mute">{t({ en: 'Istanbul, Türkiye', tr: 'İstanbul, Türkiye' })}</p>
          </div>

          <div className="md:col-span-7 lg:col-span-8">
            <h3 className="font-display stretch-normal text-2xl font-semibold tracking-tight text-paper">
              {t({ en: 'Computer engineer and full-stack developer', tr: 'Bilgisayar mühendisi ve full-stack geliştirici' })}
            </h3>
            <p className="mt-4 max-w-measure leading-relaxed text-paper-dim">
              {t({
                en: 'I graduated from Istanbul Gedik University with a ',
                tr: "İstanbul Gedik Üniversitesi'nden ",
              })}
              <span className="tabular-nums text-brass">{t({ en: '3.88', tr: '3,88' })}</span>
              {t({
                en: ' GPA, first in the Computer Engineering department, first in the Faculty of Engineering and third across the university. I work as a full-stack developer on two products at once: a .NET and React stack at Rapidsol, and a PHP platform at Waytogo.',
                tr: " ortalamayla mezun oldum; Bilgisayar Mühendisliği bölüm birincisi, Mühendislik Fakültesi birincisi ve üniversite üçüncüsüyüm. Aynı anda iki üründe full-stack geliştirici olarak çalışıyorum: Rapidsol'da .NET ve React yığını, Waytogo'da PHP tabanlı bir platform.",
              })}
            </p>

            {/* Facts as a definition list; Experience and Age are computed values, so they read in brass */}
            <dl className="mt-8 grid gap-x-10 sm:grid-cols-2">
              {[
                { id: 'experience', label: { en: 'Experience', tr: 'Deneyim' }, value: experience, isData: true },
                { id: 'degree', label: { en: 'Degree', tr: 'Derece' }, value: { en: "Bachelor's degree", tr: 'Lisans' } },
                { id: 'city', label: { en: 'City', tr: 'Şehir' }, value: { en: 'Istanbul, Türkiye', tr: 'İstanbul, Türkiye' } },
                { id: 'age', label: { en: 'Age', tr: 'Yaş' }, value: age, isData: true },
                { id: 'website', label: { en: 'Website', tr: 'Web sitesi' }, value: website },
                { id: 'email', label: { en: 'Email', tr: 'E-posta' }, value: 'btamince@gmail.com', isEmail: true },
              ].map((info) => (
                <div key={info.id} className="border-t border-rule py-3">
                  <dt className="text-sm text-paper-mute">{t(info.label)}</dt>
                  <dd className={info.isData ? 'text-brass tabular-nums' : 'text-paper'}>
                    {info.isEmail ? (
                      <a href={`mailto:${info.value}`} className="text-accent underline-offset-4 hover:underline">
                        {info.value}
                      </a>
                    ) : (
                      t(info.value)
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
