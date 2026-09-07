import { useMemo } from 'react'
import { useTyped } from '../hooks/useTyped'
import { useLanguage } from '../i18n/LanguageContext'
import { trackCvDownload, trackOutbound } from '../utils/analytics'

const socialLinks = [
  {
    href: 'https://github.com/Athena65',
    icon: 'bi-github',
    kind: 'github',
    label: { en: 'GitHub profile', tr: 'GitHub profili' },
  },
  {
    href: 'https://www.linkedin.com/in/burak-tamince/',
    icon: 'bi-linkedin',
    kind: 'linkedin',
    label: { en: 'LinkedIn profile', tr: 'LinkedIn profili' },
  },
  {
    href: 'https://www.youtube.com/@buraktamince251',
    icon: 'bi-youtube',
    kind: 'youtube',
    label: { en: 'YouTube channel', tr: 'YouTube kanalı' },
  },
  {
    href: 'https://www.instagram.com/tmncburak/',
    icon: 'bi-instagram',
    kind: 'instagram',
    label: { en: 'Instagram profile', tr: 'Instagram profili' },
  },
]

/* Real, current roles. Mirrors the Experience section so the hero stays honest. */
const nowRoles = [
  {
    company: 'Rapidsol',
    href: 'http://rapidsol.com.tr/',
    role: { en: 'Full Stack Developer, part-time', tr: 'Full stack geliştirici, yarı zamanlı' },
    period: 'Feb 2025 – Present',
    stack: 'AWS (EC2, Lightsail, CodeBuild, CodePipeline), ASP.NET Core Web API, React, IIS',
  },
  {
    company: 'Waytogo',
    href: 'https://waytogo.live/',
    role: { en: 'Full Stack Developer, part-time', tr: 'Full stack geliştirici, yarı zamanlı' },
    period: 'Oct 2024 – Present',
    stack: {
      en: 'PHP Moodle coaching platform, AWS Bedrock, Python and Django services',
      tr: 'PHP Moodle koçluk platformu, AWS Bedrock, Python ve Django servisleri',
    },
  },
]

const Hero = () => {
  const { t, lang } = useLanguage()

  // Rebuilt on a language switch: the new array identity restarts the typed animation.
  const typedStrings = useMemo(() => [
    t({ en: 'ASP.NET Core and React apps', tr: 'ASP.NET Core ve React uygulamaları' }),
    t({ en: 'PHP and Moodle platforms', tr: 'PHP ve Moodle platformları' }),
    t({ en: 'AWS infrastructure', tr: 'AWS altyapısı' }),
    t({ en: 'AI integrations', tr: 'yapay zekâ entegrasyonları' }),
  ], [t, lang])

  const typedRef = useTyped(typedStrings)

  return (
    <section
      id="hero"
      className="hero section relative flex min-h-screen flex-col overflow-hidden"
    >
      {/* Faint drafting grid, confined to the hero and fading out toward the next band */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.22]"
        style={{
          backgroundImage:
            'linear-gradient(var(--rule) 1px, transparent 1px), linear-gradient(90deg, var(--rule) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
        }}
      ></div>

      <div className="relative flex w-full flex-1 flex-col justify-center py-24 md:py-28">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-10">

            {/* Nameplate */}
            <div className="lg:col-span-7" data-aos="fade-right">
              <p className="text-lg text-paper-dim">
                {t({
                  en: 'Computer engineer and full-stack developer, Istanbul.',
                  tr: 'Bilgisayar mühendisi ve full-stack geliştirici, İstanbul.',
                })}
              </p>

              <h1 className="mt-3 font-display stretch-xwide font-bold leading-[0.9] tracking-[-0.03em] text-paper text-[clamp(3rem,9vw,7.25rem)]">
                Burak<br />Tamince
              </h1>

              {/* Typed.js line, the hero's one moving element. The cursor is styled in index.css. */}
              <p className="mt-6 min-h-[3.5rem] text-xl text-paper-dim sm:min-h-0">
                {t({
                  en: 'Full-stack developer at Rapidsol and Waytogo, building',
                  tr: 'Rapidsol ve Waytogo’da full-stack geliştirici. Geliştirdiklerim:',
                })}{' '}
                <span ref={typedRef} className="font-medium text-paper"></span>
              </p>

              <div className="mt-8 flex items-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.kind}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t(social.label)}
                    onClick={() => trackOutbound(social.kind, social.href)}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-rule text-lg text-paper-dim transition-colors hover:border-accent hover:text-accent"
                  >
                    <i className={`bi ${social.icon}`}></i>
                  </a>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#portfolio"
                  className="inline-flex items-center gap-2 rounded-sm bg-accent px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-accent-300"
                >
                  <i className="bi bi-arrow-down"></i>
                  {t({ en: 'See projects', tr: 'Projelere bak' })}
                </a>
                <a
                  href="/assets/resume/BT_1611_CV.pdf"
                  download="Burak_Tamince_CV.pdf"
                  onClick={() => trackCvDownload('hero')}
                  className="inline-flex items-center gap-2 rounded-sm border border-rule-strong px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:border-accent hover:text-accent"
                >
                  <i className="bi bi-download"></i>
                  {t({ en: 'Download CV', tr: 'CV indir' })}
                </a>
                <a
                  href="#about"
                  className="text-sm text-accent underline-offset-4 hover:underline"
                >
                  {t({ en: 'About me', tr: 'Hakkımda' })}
                </a>
              </div>
            </div>

            {/* Now panel: current roles and the one figure that matters */}
            <aside className="lg:col-span-5" data-aos="fade-left" data-aos-delay="200">
              <div className="rounded-md border border-rule bg-ink-2/70 p-6 md:p-7">
                <div className="flex items-baseline justify-between gap-4">
                  <h2 className="font-display stretch-normal text-lg font-semibold text-paper">
                    {t({ en: 'Now', tr: 'Şu anda' })}
                  </h2>
                  <span className="text-sm text-paper-mute">
                    {t({ en: 'two part-time roles', tr: 'iki yarı zamanlı rol' })}
                  </span>
                </div>

                <ul className="mt-5">
                  {nowRoles.map((item) => (
                    <li key={item.company} className="border-t border-rule py-4">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => trackOutbound('company', item.href, { company: item.company })}
                          className="font-semibold text-paper transition-colors hover:text-accent"
                        >
                          {item.company}
                        </a>
                        <span className="text-sm tabular-nums text-brass">{item.period}</span>
                      </div>
                      <p className="mt-0.5 text-sm text-paper-dim">{t(item.role)}</p>
                      <p className="mt-2 text-sm leading-relaxed text-paper-dim">{t(item.stack)}</p>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-t border-rule pt-4">
                  <p className="text-sm text-paper-dim">
                    {t({
                      en: 'Istanbul Gedik University, first in the department and third in the university',
                      tr: 'İstanbul Gedik Üniversitesi, bölüm birincisi ve üniversite üçüncüsü',
                    })}
                  </p>
                  <p className="text-sm text-paper-dim">
                    {t({ en: 'GPA', tr: 'GNO' })}{' '}
                    <span className="font-semibold tabular-nums text-brass">3.88</span>
                  </p>
                </div>
              </div>
            </aside>

          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
