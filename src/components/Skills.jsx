import { Fragment, useMemo, useEffect, useState } from 'react'
import SectionHeader from './SectionHeader'
import { useLanguage } from '../i18n/LanguageContext'
import { trackOutbound } from '../utils/analytics'

const LOGOS = {
  waytogo: '/assets/skills/waytogodc_logo.jpeg',
  rapidsol: '/assets/skills/rapidsol_consulting_logo.jpeg',
  arkhe: '/assets/skills/arkheuav_logo.jpeg',
  mobitek: '/assets/skills/mobitek_logo.jpeg',
  tomya: '/assets/skills/tomya_logo.jpg',
}

/**
 * One position (under a company header).
 *
 * role / employment / location / highlights hold { en, tr } pairs and are read
 * through t(). `period` MUST stay a plain English string — tenureMonthsFromPeriod
 * and periodToExclusiveMonthRange parse its month names. `tags` stay untranslated.
 */
const roleTemplate = (overrides) => ({
  role: '',
  employment: '',
  period: '',
  location: '',
  highlights: [],
  tags: [],
  ...overrides,
})

const ROLE_TITLES = {
  fullStack: { en: 'Full Stack Developer', tr: 'Full Stack Geliştirici' },
  backEnd: { en: 'Back End Developer', tr: 'Back End Geliştirici' },
  software: { en: 'Software Developer', tr: 'Yazılım Geliştirici' },
  support: { en: 'Software Support Engineer', tr: 'Yazılım Destek Mühendisi' },
  intern: { en: 'Software Development Intern', tr: 'Yazılım Geliştirme Stajyeri' },
}

const EMPLOYMENT = {
  partTime: { en: 'Part-time', tr: 'Yarı zamanlı' },
  fullTime: { en: 'Full-time', tr: 'Tam zamanlı' },
  internship: { en: 'Internship', tr: 'Staj' },
  freelance: { en: 'Freelance', tr: 'Serbest' },
}

const LOCATIONS = {
  kartalOnSite: { en: 'Kartal, Istanbul, Türkiye · On-site', tr: 'Kartal, İstanbul, Türkiye · Ofiste' },
  maslakOnSite: { en: 'Maslak, Istanbul, Türkiye · On-site', tr: 'Maslak, İstanbul, Türkiye · Ofiste' },
  istanbulOnSite: { en: 'Istanbul, Türkiye · On-site', tr: 'İstanbul, Türkiye · Ofiste' },
  istanbulHybrid: { en: 'Istanbul, Türkiye · Hybrid', tr: 'İstanbul, Türkiye · Hibrit' },
}

/**
 * Ortak yapı: her blokta logo + şirket adı (başta), sonra rol(lar).
 * timeline: true → Waytogo gibi çoklu rol + dikey çizgi.
 */
const experienceBlocks = [
  {
    company: 'Rapidsol',
    companyLegalName: 'Rapidsol Information Technologies',
    companyUrl: 'http://rapidsol.com.tr/',
    logoSrc: LOGOS.rapidsol,
    timeline: false,
    roles: [
      roleTemplate({
        role: ROLE_TITLES.fullStack,
        employment: EMPLOYMENT.partTime,
        period: 'Feb 2025 – Present',
        location: LOCATIONS.kartalOnSite,
        highlights: [
          {
            en: 'Handle AWS operations and server-side work across EC2, Lightsail, CodeBuild, CodePipeline, and related cloud infrastructure.',
            tr: 'EC2, Lightsail, CodeBuild, CodePipeline ve ilgili bulut altyapısında AWS operasyonlarını ve sunucu tarafı işleri yürütüyorum.',
          },
          {
            en: 'Run and improve OSTicket support workflows, including PHP-based feature work and troubleshooting.',
            tr: 'OSTicket destek akışlarını işletiyor, PHP tabanlı geliştirmeler ve hata çözümleriyle iyileştiriyorum.',
          },
          {
            en: 'Deliver React SPAs and ASP.NET Core–based human resources (HR / workforce) applications for internal product needs.',
            tr: 'Şirket içi ürün ihtiyaçları için React SPA ve ASP.NET Core tabanlı insan kaynakları (İK) uygulamaları geliştiriyorum.',
          },
          {
            en: 'Ship ASP.NET Core Web API backends and React frontends; deploy to IIS and migrate or tune workloads between EC2 and Lightsail.',
            tr: 'ASP.NET Core Web API arka uçları ve React ön yüzleri yayına alıyorum; IIS üzerinde dağıtım yapıyor, iş yüklerini EC2 ile Lightsail arasında taşıyor ve iyileştiriyorum.',
          },
          {
            en: 'Work in an Agile cadence; plan and track tasks with Microsoft Planner together with the team.',
            tr: 'Agile bir ritimde çalışıyor; görevleri ekiple birlikte Microsoft Planner üzerinde planlayıp takip ediyorum.',
          },
        ],
        tags: [
          'React.js',
          'ASP.NET Core',
          'ASP.NET Web API',
          'ASP.NET MVC',
          'C#',
          'PHP',
          'Docker',
          'Microsoft SQL Server',
          'AWS',
          'Amazon EC2',
          'Amazon Lightsail',
          'AWS CodeBuild',
          'AWS CodePipeline',
          'IIS',
          'OSTicket',
          'HR Software',
          'Microsoft Planner',
          'Agile Methodologies',
          'MCP',
          'Claude Code',
        ],
      }),
    ],
  },
  {
    company: 'Waytogo',
    companyUrl: 'https://waytogo.live/',
    logoSrc: LOGOS.waytogo,
    timeline: true,
    roles: [
      roleTemplate({
        role: ROLE_TITLES.fullStack,
        employment: EMPLOYMENT.partTime,
        period: 'Oct 2024 – Present',
        location: LOCATIONS.istanbulHybrid,
        highlights: [
          {
            en: 'Own end-to-end development on the PHP Moodle–based mentorship and coaching platform (features, plugins, and integrations).',
            tr: 'PHP Moodle tabanlı mentorluk ve koçluk platformunun uçtan uca geliştirmesini üstleniyorum (özellikler, eklentiler ve entegrasyonlar).',
          },
          {
            en: 'Connect the stack to AWS Bedrock and to Python/Django services for AI and backend capabilities.',
            tr: 'Yapay zekâ ve arka uç yetenekleri için sistemi AWS Bedrock ile Python/Django servislerine bağlıyorum.',
          },
          {
            en: 'Fine-tuned an open-source speech-to-text model with Python for supervision in coaching workflows.',
            tr: 'Koçluk süreçlerindeki süpervizyon için açık kaynaklı bir konuşmadan metne modelini Python ile ince ayardan geçirdim.',
          },
          {
            en: 'Maintained WordPress touchpoints and shipped a custom plugin where the product required it.',
            tr: 'WordPress temas noktalarının bakımını yaptım ve ürünün gerektirdiği yerde özel bir eklenti yayına aldım.',
          },
          {
            en: 'Deliver in an Agile rhythm; organize work with Trello alongside Scrum-style collaboration.',
            tr: 'Agile bir ritimde teslimat yapıyor; işleri Scrum tarzı iş birliğinin yanında Trello ile organize ediyorum.',
          },
        ],
        tags: [
          'PHP',
          'Moodle',
          'WordPress',
          'Python',
          'Django',
          'MariaDB',
          'AWS',
          'AWS Bedrock',
          'Speech-to-Text',
          'Fine-tuning',
          'Artificial Intelligence',
          'AI Software Development',
          'Agile Methodologies',
          'Scrum',
          'Trello',
          'Git',
          'GitHub',
          'MCP',
          'Claude Code',
        ],
      }),
      roleTemplate({
        role: ROLE_TITLES.fullStack,
        employment: EMPLOYMENT.fullTime,
        period: 'Jun 2024 – Sep 2024',
        location: LOCATIONS.istanbulHybrid,
        highlights: [
          {
            en: 'Full-stack work on the Moodle mentorship platform—PHP extensions and features leading into later Bedrock and Django integrations.',
            tr: 'Moodle mentorluk platformunda full stack geliştirme: sonraki Bedrock ve Django entegrasyonlarına zemin hazırlayan PHP eklentileri ve özellikler.',
          },
        ],
        tags: ['PHP', 'Moodle', 'MariaDB', 'Git', 'Agile Methodologies'],
      }),
      roleTemplate({
        role: ROLE_TITLES.intern,
        employment: EMPLOYMENT.internship,
        period: 'Feb 2024 – May 2024',
        location: LOCATIONS.istanbulHybrid,
        highlights: [
          {
            en: 'Built hands-on experience with Moodle infrastructure for a digital coaching product.',
            tr: 'Dijital bir koçluk ürünü için Moodle altyapısında uygulamalı deneyim kazandım.',
          },
          {
            en: 'Operated the default Moodle LMS, improving usability and configuration.',
            tr: 'Varsayılan Moodle LMS kurulumunu işlettim; kullanılabilirliği ve yapılandırmayı iyileştirdim.',
          },
          {
            en: 'Developed local/mod plugins and PHP triggers to customize platform behavior.',
            tr: 'Platform davranışını özelleştirmek için local/mod eklentileri ve PHP tetikleyicileri geliştirdim.',
          },
        ],
        tags: ['PHP', 'Moodle', 'MariaDB', 'Git'],
      }),
    ],
  },
  {
    company: 'Tomya',
    companyUrl: null,
    logoSrc: LOGOS.tomya,
    timeline: false,
    roles: [
      roleTemplate({
        role: ROLE_TITLES.backEnd,
        employment: EMPLOYMENT.internship,
        period: 'Jul 2022 – Sep 2022',
        location: LOCATIONS.maslakOnSite,
        highlights: [
          {
            en: 'Developed ASP.NET Core Web APIs (.NET Core 3.1 / 6), focusing on API design and database integration.',
            tr: 'API tasarımına ve veritabanı entegrasyonuna odaklanarak ASP.NET Core Web API (.NET Core 3.1 / 6) geliştirdim.',
          },
          {
            en: 'Collaborated with peers on backend best practices in a startup environment.',
            tr: 'Girişim ortamında arka uç iyi uygulamaları üzerine ekip arkadaşlarımla birlikte çalıştım.',
          },
        ],
        tags: ['ASP.NET Core', 'ASP.NET Web API', 'SQL', 'C#'],
      }),
    ],
  },
  {
    company: 'ARKHE',
    companyUrl: null,
    logoSrc: LOGOS.arkhe,
    timeline: false,
    roles: [
      roleTemplate({
        role: ROLE_TITLES.software,
        employment: EMPLOYMENT.freelance,
        period: 'Sep 2023 – Jul 2024',
        location: LOCATIONS.istanbulHybrid,
        highlights: [
          {
            en: 'Worked with a drone technology team at Gedik University to improve software delivery.',
            tr: 'Gedik Üniversitesi’ndeki bir drone teknolojisi ekibiyle yazılım teslimatını iyileştirmek için çalıştım.',
          },
          {
            en: 'Applied Python and computer vision skills from coursework to drone-related projects.',
            tr: 'Derslerde edindiğim Python ve bilgisayarlı görü bilgisini drone projelerine uyguladım.',
          },
        ],
        tags: ['Python', 'Computer Vision', 'Image Processing'],
      }),
    ],
  },
  {
    company: 'Mobitek Marketing Group',
    companyUrl: null,
    logoSrc: LOGOS.mobitek,
    timeline: false,
    roles: [
      roleTemplate({
        role: ROLE_TITLES.support,
        employment: EMPLOYMENT.internship,
        period: 'Nov 2023 – Dec 2023',
        location: LOCATIONS.istanbulOnSite,
        highlights: [
          {
            en: 'Provided software support for the company e-commerce site and day-to-day operations.',
            tr: 'Şirketin e-ticaret sitesi ve günlük operasyonları için yazılım desteği verdim.',
          },
          {
            en: 'Implemented changes in admin panels and Excel-driven workflows to improve usability.',
            tr: 'Kullanılabilirliği artırmak için yönetim panellerinde ve Excel tabanlı akışlarda değişiklikler yaptım.',
          },
          {
            en: 'Collaborated with the team to troubleshoot and resolve production issues quickly.',
            tr: 'Canlı ortam sorunlarını hızlıca tespit edip çözmek için ekiple birlikte çalıştım.',
          },
        ],
        tags: ['SQL', 'Microsoft SQL Server'],
      }),
    ],
  },
]

const MONTH_MAP = {
  jan: 0,
  feb: 1,
  mar: 2,
  apr: 3,
  may: 4,
  jun: 5,
  jul: 6,
  aug: 7,
  sep: 8,
  oct: 9,
  nov: 10,
  dec: 11,
}

function parseMonthYearPart(s) {
  const t = s.trim().toLowerCase()
  const [monStr, yearStr] = t.split(/\s+/)
  if (!monStr || !yearStr) return null
  const m = MONTH_MAP[monStr.slice(0, 3)]
  const y = parseInt(yearStr, 10)
  if (m === undefined || Number.isNaN(y)) return null
  return { y, m }
}

/** Inclusive month count from first day of start month to end (Present = reference date, default now). */
function tenureMonthsFromPeriod(period, refDate = new Date()) {
  const parts = period.split(/\s*[–-]\s*/)
  if (parts.length < 2) return null
  const start = parseMonthYearPart(parts[0])
  if (!start) return null
  const rawEnd = parts[1].trim()
  const isPresent = /^present$/i.test(rawEnd)

  const startDate = new Date(start.y, start.m, 1)
  let endDate
  if (isPresent) {
    endDate = refDate
  } else {
    const end = parseMonthYearPart(rawEnd)
    if (!end) return null
    endDate = new Date(end.y, end.m + 1, 1)
  }

  const months =
    (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth())
  if (months < 1) return null
  return months
}

/**
 * Unit words for "3 yrs 2 mos" / "3 yıl 2 ay". Resolved with t() by the caller and
 * passed down, because formatTenureLabel runs inside useMemo and plain helpers.
 */
const tenureUnits = (t) => ({
  yr: t({ en: 'yr', tr: 'yıl' }),
  yrs: t({ en: 'yrs', tr: 'yıl' }),
  mo: t({ en: 'mo', tr: 'ay' }),
  mos: t({ en: 'mos', tr: 'ay' }),
})

function formatTenureLabel(months, units) {
  const y = Math.floor(months / 12)
  const m = months % 12
  const parts = []
  if (y > 0) parts.push(`${y} ${y === 1 ? units.yr : units.yrs}`)
  if (m > 0) parts.push(`${m} ${m === 1 ? units.mo : units.mos}`)
  return parts.length ? parts.join(' ') : null
}

function getTenureLabel(period, refDate, units) {
  const total = tenureMonthsFromPeriod(period, refDate)
  if (!total) return null
  return formatTenureLabel(total, units)
}

/** Half-open month index range [start, end) for overlap merge; Present extends through refDate's month. */
function periodToExclusiveMonthRange(period, refDate) {
  const parts = period.split(/\s*[–-]\s*/)
  if (parts.length < 2) return null
  const start = parseMonthYearPart(parts[0])
  if (!start) return null
  const rawEnd = parts[1].trim()
  const isPresent = /^present$/i.test(rawEnd)
  const startIdx = start.y * 12 + start.m
  let endIdxExclusive
  if (isPresent) {
    endIdxExclusive = refDate.getFullYear() * 12 + refDate.getMonth() + 1
  } else {
    const end = parseMonthYearPart(rawEnd)
    if (!end) return null
    endIdxExclusive = end.y * 12 + end.m + 1
  }
  if (endIdxExclusive <= startIdx) return null
  return { start: startIdx, end: endIdxExclusive }
}

function mergeMonthRanges(ranges) {
  const sorted = [...ranges].sort((a, b) => a.start - b.start)
  const out = []
  for (const r of sorted) {
    if (!out.length || r.start > out[out.length - 1].end) {
      out.push({ start: r.start, end: r.end })
    } else {
      out[out.length - 1].end = Math.max(out[out.length - 1].end, r.end)
    }
  }
  return out
}

/** Overlapping roles counted once (e.g. concurrent part-time jobs). */
function combinedExperienceMonths(blocks, refDate) {
  const ranges = []
  for (const block of blocks) {
    for (const role of block.roles) {
      const r = periodToExclusiveMonthRange(role.period, refDate)
      if (r) ranges.push(r)
    }
  }
  return mergeMonthRanges(ranges).reduce((sum, iv) => sum + (iv.end - iv.start), 0)
}

function collectAllTags(blocks) {
  const list = []
  for (const block of blocks) {
    for (const r of block.roles) {
      list.push(...(r.tags || []))
    }
  }
  return list
}

function dedupeSkills(tags) {
  const seen = new Map()
  for (const t of tags) {
    const key = t.trim().toLowerCase()
    if (!key || seen.has(key)) continue
    seen.set(key, t.trim())
  }
  return [...seen.values()].sort((a, b) => a.localeCompare(b, 'en'))
}

const CompanyHeading = ({ href, company, children }) => {
  const base =
    'font-display stretch-normal text-xl font-semibold tracking-tight text-paper transition-colors rounded-sm'
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} hover:text-accent`}
        onClick={() => trackOutbound('company', href, { company })}
      >
        {children}
      </a>
    )
  }
  return <span className={base}>{children}</span>
}

const CompanyLogo = ({ src, company }) => {
  if (src) {
    return (
      <img src={src} alt="" className="h-11 w-11 shrink-0 rounded-sm border border-rule object-cover" />
    )
  }
  const initial = company && company[0] ? company[0].toUpperCase() : '?'
  return (
    <div
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-rule bg-ink-3 text-base font-semibold text-paper"
      aria-hidden
    >
      {initial}
    </div>
  )
}

/** Thin vertical hairline between meta parts (period, tenure, location). */
const MetaDivider = () => <span aria-hidden className="inline-block h-3 w-px self-center bg-rule-strong" />

/** Tek rol bloğu: şirket üstte olduğu için önce rol, altında alt başlık. */
const ExperienceRoleContent = ({ role, subtitle, period, location, highlights, tenureRef }) => {
  const { t } = useLanguage()
  const tenure = getTenureLabel(period, tenureRef, tenureUnits(t))
  // Location data keeps its ' · ' joiner; the page renders the parts with hairlines instead.
  const locationText = t(location)
  const locationParts = locationText ? locationText.split(' · ').filter(Boolean) : []
  const meta = [
    { key: 'period', node: <span className="text-sm tabular-nums text-brass">{period}</span> },
    ...(tenure
      ? [
          {
            key: 'tenure',
            node: (
              <span className="text-sm text-paper-mute" title={t({ en: 'Tenure', tr: 'Görev süresi' })}>
                {tenure}
              </span>
            ),
          },
        ]
      : []),
    ...locationParts.map((part, i) => ({
      key: `location-${i}`,
      node: <span className="text-sm text-paper-mute">{part}</span>,
    })),
  ]
  return (
    <div className="min-w-0 flex-1">
      <h3 className="font-display stretch-normal text-lg font-semibold leading-snug tracking-tight text-paper">
        {t(role)}
      </h3>
      {subtitle && <p className="mt-1 text-sm leading-snug text-paper-dim">{subtitle}</p>}
      <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
        {meta.map((item, i) => (
          <Fragment key={item.key}>
            {i > 0 && <MetaDivider />}
            {item.node}
          </Fragment>
        ))}
      </p>
      <ul className="mt-3.5 max-w-measure list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-paper-dim marker:text-accent">
        {highlights.map((line, i) => (
          <li key={i}>{t(line)}</li>
        ))}
      </ul>
    </div>
  )
}

function roleSubtitle(block, r, t) {
  const employment = t(r.employment)
  if (block.timeline) {
    return employment
  }
  if (block.companyLegalName) {
    return `${block.companyLegalName}, ${employment}`
  }
  return employment
}

const Skills = () => {
  const { t } = useLanguage()
  const allSkills = useMemo(() => dedupeSkills(collectAllTags(experienceBlocks)), [])
  const [tenureRef, setTenureRef] = useState(() => new Date())

  const totalExperienceLabel = useMemo(() => {
    const months = combinedExperienceMonths(experienceBlocks, tenureRef)
    return months > 0 ? formatTenureLabel(months, tenureUnits(t)) : null
  }, [tenureRef, t])

  useEffect(() => {
    const refresh = () => setTenureRef(new Date())
    const intervalId = window.setInterval(refresh, 1000 * 60 * 60 * 12)
    window.addEventListener('focus', refresh)
    return () => {
      window.clearInterval(intervalId)
      window.removeEventListener('focus', refresh)
    }
  }, [])

  return (
    <section id="skills" className="skills section relative border-t border-rule py-20 md:py-28">
      <div className="container">
        <SectionHeader
          title={t({ en: 'Experience', tr: 'Deneyim' })}
          deck={t({
            en: 'Real roles across full-stack delivery, cloud operations, LMS products and AI-enabled features.',
            tr: 'Full stack geliştirme, bulut operasyonları, LMS ürünleri ve yapay zekâ destekli özellikler üzerine gerçek roller.',
          })}
          aside={
            totalExperienceLabel ? (
              <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span
                  className="font-display text-3xl font-semibold tabular-nums text-brass"
                  title={t({
                    en: 'Non-overlapping months across all roles; concurrent jobs are merged.',
                    tr: 'Tüm rollerdeki çakışmayan aylar; eş zamanlı işler tek sayılır.',
                  })}
                >
                  {totalExperienceLabel}
                </span>
                <span className="text-paper-dim">
                  {t({
                    en: 'combined experience, concurrent roles counted once',
                    tr: 'toplam deneyim, eş zamanlı roller bir kez sayıldı',
                  })}
                </span>
              </p>
            ) : undefined
          }
        />

        <div
          className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2 lg:items-start"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          {experienceBlocks.map((block, blockIdx) => {
            const showTimeline = !!block.timeline && block.roles.length > 1
            const isMobitek = block.company === 'Mobitek Marketing Group'

            return (
              <div
                key={`${block.company}-${blockIdx}`}
                className={`relative rounded-md border border-rule bg-ink-2/70 p-5 md:p-7 ${
                  isMobitek ? 'lg:col-span-2' : ''
                }`}
              >
                <div className="flex gap-4 md:gap-5">
                  <CompanyLogo src={block.logoSrc} company={block.company} />
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="shrink-0 border-b border-rule pb-3 pt-2">
                      <CompanyHeading href={block.companyUrl || undefined} company={block.company}>
                        {block.company}
                      </CompanyHeading>
                    </div>

                    {showTimeline ? (
                      <div className="mt-6">
                        <p className="mb-4 text-sm text-paper-mute">
                          {t({
                            en: `${block.roles.length} roles, newest first`,
                            tr: `${block.roles.length} rol, en yenisi başta`,
                          })}
                        </p>
                        <div className="relative border-l border-rule pl-6">
                          {block.roles.map((r, i) => (
                            <div key={i} className="relative pb-10 last:pb-0">
                              <span
                                className="absolute -left-[30px] top-2 h-2.5 w-2.5 rounded-full bg-accent ring-2 ring-ink"
                                aria-hidden
                              />
                              <ExperienceRoleContent
                                role={r.role}
                                subtitle={roleSubtitle(block, r, t)}
                                period={r.period}
                                location={r.location}
                                highlights={r.highlights}
                                tenureRef={tenureRef}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      block.roles.map((r, i) => (
                        <div key={i} className={i === 0 ? 'pt-5' : 'mt-8 border-t border-rule pt-8'}>
                          <ExperienceRoleContent
                            role={r.role}
                            subtitle={roleSubtitle(block, r, t)}
                            period={r.period}
                            location={r.location}
                            highlights={r.highlights}
                            tenureRef={tenureRef}
                          />
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-16 rounded-md border border-rule bg-ink-2/70 p-6 md:p-8" data-aos="fade-up">
          <h3 className="font-display stretch-normal text-2xl font-semibold text-paper">
            {t({ en: 'Skills', tr: 'Yetkinlikler' })}
          </h3>
          <p className="mt-2 max-w-measure text-sm leading-relaxed text-paper-dim">
            {t({
              en: 'Technologies and tools consolidated from the roles above, deduplicated and ordered A–Z.',
              tr: 'Yukarıdaki rollerden derlenen teknolojiler ve araçlar; tekrarlar ayıklandı, A–Z sıralandı.',
            })}
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {allSkills.map((skill) => (
              <li
                key={skill}
                className="rounded-sm border border-rule bg-ink-3/60 px-2.5 py-1 text-[13px] text-paper-dim"
              >
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Skills
