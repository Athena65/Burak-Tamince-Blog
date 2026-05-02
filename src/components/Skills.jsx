import { useMemo, useEffect, useState, useRef, useCallback, useLayoutEffect } from 'react'

const LG_GRID_PX = 1024

const LOGOS = {
  waytogo: '/assets/skills/waytogodc_logo.jpeg',
  rapidsol: '/assets/skills/rapidsol_consulting_logo.jpeg',
  arkhe: '/assets/skills/arkheuav_logo.jpeg',
  mobitek: '/assets/skills/mobitek_logo.jpeg',
  tomya: '/assets/skills/tomya_logo.jpg',
}

/** One position (under a company header). */
const roleTemplate = (overrides) => ({
  role: '',
  employment: '',
  period: '',
  location: '',
  highlights: [],
  tags: [],
  ...overrides,
})

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
        role: 'Full Stack Developer',
        employment: 'Part-time',
        period: 'Feb 2025 – Present',
        location: 'Kartal, Istanbul, Türkiye · On-site',
        highlights: [
          'Handle AWS operations and server-side work across EC2, Lightsail, CodeBuild, CodePipeline, and related cloud infrastructure.',
          'Run and improve OSTicket support workflows, including PHP-based feature work and troubleshooting.',
          'Deliver React SPAs and ASP.NET Core–based human resources (HR / workforce) applications for internal product needs.',
          'Ship ASP.NET Core Web API backends and React frontends; deploy to IIS and migrate or tune workloads between EC2 and Lightsail.',
          'Work in an Agile cadence; plan and track tasks with Microsoft Planner together with the team.',
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
        role: 'Full Stack Developer',
        employment: 'Part-time',
        period: 'Oct 2024 – Present',
        location: 'Istanbul, Türkiye · Hybrid',
        highlights: [
          'Own end-to-end development on the PHP Moodle–based mentorship and coaching platform (features, plugins, and integrations).',
          'Connect the stack to AWS Bedrock and to Python/Django services for AI and backend capabilities.',
          'Fine-tuned an open-source speech-to-text model with Python for supervision in coaching workflows.',
          'Maintained WordPress touchpoints and shipped a custom plugin where the product required it.',
          'Deliver in an Agile rhythm; organize work with Trello alongside Scrum-style collaboration.',
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
        role: 'Full Stack Developer',
        employment: 'Full-time',
        period: 'Jun 2024 – Sep 2024',
        location: 'Istanbul, Türkiye · Hybrid',
        highlights: [
          'Full-stack work on the Moodle mentorship platform—PHP extensions and features leading into later Bedrock and Django integrations.',
        ],
        tags: ['PHP', 'Moodle', 'MariaDB', 'Git', 'Agile Methodologies'],
      }),
      roleTemplate({
        role: 'Software Development Intern',
        employment: 'Internship',
        period: 'Feb 2024 – May 2024',
        location: 'Istanbul, Türkiye · Hybrid',
        highlights: [
          'Built hands-on experience with Moodle infrastructure for a digital coaching product.',
          'Operated the default Moodle LMS, improving usability and configuration.',
          'Developed local/mod plugins and PHP triggers to customize platform behavior.',
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
        role: 'Back End Developer',
        employment: 'Internship',
        period: 'Jul 2022 – Sep 2022',
        location: 'Maslak, Istanbul, Türkiye · On-site',
        highlights: [
          'Developed ASP.NET Core Web APIs (.NET Core 3.1 / 6), focusing on API design and database integration.',
          'Collaborated with peers on backend best practices in a startup environment.',
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
        role: 'Software Developer',
        employment: 'Freelance',
        period: 'Sep 2023 – Jul 2024',
        location: 'Istanbul, Türkiye · Hybrid',
        highlights: [
          'Worked with a drone technology team at Gedik University to improve software delivery.',
          'Applied Python and computer vision skills from coursework to drone-related projects.',
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
        role: 'Software Support Engineer',
        employment: 'Internship',
        period: 'Nov 2023 – Dec 2023',
        location: 'Istanbul, Türkiye · On-site',
        highlights: [
          'Provided software support for the company e-commerce site and day-to-day operations.',
          'Implemented changes in admin panels and Excel-driven workflows to improve usability.',
          'Collaborated with the team to troubleshoot and resolve production issues quickly.',
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

function formatTenureLabel(months) {
  const y = Math.floor(months / 12)
  const m = months % 12
  const parts = []
  if (y > 0) parts.push(`${y} ${y === 1 ? 'yr' : 'yrs'}`)
  if (m > 0) parts.push(`${m} ${m === 1 ? 'mo' : 'mos'}`)
  return parts.length ? parts.join(' ') : null
}

function getTenureLabel(period, refDate) {
  const total = tenureMonthsFromPeriod(period, refDate)
  if (!total) return null
  return formatTenureLabel(total)
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

const CompanyHeading = ({ href, children }) => {
  const base =
    'text-lg font-bold tracking-tight text-accent-200 transition-colors sm:text-[1.125rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400/35 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] rounded-sm'
  const linkExtra =
    ' underline-offset-[6px] decoration-accent-400/45 hover:text-accent-100 hover:decoration-accent-300/70 hover:underline'
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={`${base}${linkExtra}`}>
        {children}
      </a>
    )
  }
  return <span className={`${base} text-accent-100/95`}>{children}</span>
}

const CompanyLogo = ({ src, company }) => {
  if (src) {
    return (
      <img
        src={src}
        alt=""
        className="h-12 w-12 shrink-0 rounded-lg border border-white/10 object-cover"
      />
    )
  }
  const initial = company && company[0] ? company[0].toUpperCase() : '?'
  return (
    <div
      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.06] text-base font-bold uppercase tracking-tight text-white/85"
      aria-hidden
    >
      {initial}
    </div>
  )
}

/** Tek rol bloğu: şirket üstte olduğu için önce rol, altında alt başlık. */
const ExperienceRoleContent = ({ role, subtitle, period, location, highlights, tenureRef }) => {
  const tenure = getTenureLabel(period, tenureRef)
  return (
    <div className="min-w-0 flex-1">
      <h3 className="text-base font-bold leading-snug text-white sm:text-[1.0625rem]">{role}</h3>
      {subtitle && <p className="mt-1.5 text-sm font-medium leading-snug text-white/65">{subtitle}</p>}
      <p className="mt-2 text-xs leading-relaxed text-white/40">
        {period}
        {tenure && (
          <span className="text-accent-300/90" title="Tenure">
            {' '}
            · {tenure}
          </span>
        )}
        {location ? ` · ${location}` : ''}
      </p>
      <ul className="mt-3.5 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-white/55 marker:text-accent-400">
        {highlights.map((line, i) => (
          <li key={i}>{line}</li>
        ))}
      </ul>
    </div>
  )
}

function roleSubtitle(block, r) {
  if (block.timeline) {
    return r.employment
  }
  if (block.companyLegalName) {
    return `${block.companyLegalName} · ${r.employment}`
  }
  return r.employment
}

const Skills = () => {
  const allSkills = useMemo(() => dedupeSkills(collectAllTags(experienceBlocks)), [])
  const [tenureRef, setTenureRef] = useState(() => new Date())
  const rapidsolCardRef = useRef(null)
  const waytogoCardRef = useRef(null)
  const [waytogoExpanded, setWaytogoExpanded] = useState(false)
  const [waytogoPreviewMaxPx, setWaytogoPreviewMaxPx] = useState(null)
  const [waytogoHasMore, setWaytogoHasMore] = useState(false)

  const syncWaytogoPreviewHeight = useCallback(() => {
    if (waytogoExpanded) {
      setWaytogoPreviewMaxPx(null)
      return
    }
    if (typeof window === 'undefined') return
    if (window.innerWidth < LG_GRID_PX) {
      setWaytogoPreviewMaxPx(null)
      return
    }
    const h = rapidsolCardRef.current?.offsetHeight
    if (h && h > 0) setWaytogoPreviewMaxPx(h)
  }, [waytogoExpanded])

  useLayoutEffect(() => {
    syncWaytogoPreviewHeight()
    const el = rapidsolCardRef.current
    const ro = el ? new ResizeObserver(() => syncWaytogoPreviewHeight()) : null
    if (el && ro) ro.observe(el)
    window.addEventListener('resize', syncWaytogoPreviewHeight)
    return () => {
      if (ro && el) ro.unobserve(el)
      ro?.disconnect()
      window.removeEventListener('resize', syncWaytogoPreviewHeight)
    }
  }, [syncWaytogoPreviewHeight])

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return
    // While expanded, keep waytogoHasMore so "Show less" stays visible (measuring uses collapsed maxHeight).
    if (waytogoExpanded) return
    if (!waytogoPreviewMaxPx) {
      setWaytogoHasMore(false)
      return
    }
    const node = waytogoCardRef.current
    if (!node) return
    const id = window.requestAnimationFrame(() => {
      setWaytogoHasMore(node.scrollHeight > waytogoPreviewMaxPx + 6)
    })
    return () => window.cancelAnimationFrame(id)
  }, [waytogoPreviewMaxPx, waytogoExpanded, tenureRef])

  const totalExperienceLabel = useMemo(() => {
    const months = combinedExperienceMonths(experienceBlocks, tenureRef)
    return months > 0 ? formatTenureLabel(months) : null
  }, [tenureRef])

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
    <section
      id="skills"
      className="skills section relative overflow-hidden rounded-xl border border-white/10 bg-black/50 py-24 shadow-2xl backdrop-blur-md"
    >
      <div className="absolute -right-24 top-0 h-96 w-96 rounded-full bg-accent/5 blur-[120px]"></div>
      <div className="absolute -left-24 bottom-0 h-96 w-96 rounded-full bg-blue-500/5 blur-[120px]"></div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="section-title mb-14 text-center" data-aos="fade-up">
          <h2 className="relative mb-6 inline-block pb-4 text-4xl font-extrabold tracking-tight text-white uppercase">
            Experience
            <span className="absolute bottom-0 left-1/2 h-[4px] w-[80px] -translate-x-1/2 rounded-full bg-gradient-to-r from-accent to-blue-500"></span>
          </h2>
          <p className="mx-auto max-w-7xl text-lg text-white/60 leading-relaxed">
            Real-world roles across full-stack delivery, cloud DevOps, LMS and AI-enabled products—technologies
            grounded in production work, not abstract percentages.
          </p>
          {totalExperienceLabel && (
            <p className="mx-auto mt-5 flex max-w-7xl flex-col items-center gap-1 sm:flex-row sm:justify-center sm:gap-3">
              <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/40">
                Combined experience
              </span>
              <span
                className="rounded-full border border-accent-400/35 bg-accent-500/15 px-4 py-1.5 text-base font-bold tabular-nums text-accent-100"
                title="Non-overlapping months across all roles; concurrent jobs are merged."
              >
                {totalExperienceLabel}
              </span>
            </p>
          )}
        </div>

        <div
          className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:gap-10 lg:grid-cols-2 lg:items-start"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          {experienceBlocks.map((block, blockIdx) => {
            const showTimeline = !!block.timeline && block.roles.length > 1
            const isRapidsol = block.company === 'Rapidsol'
            const isWaytogo = block.company === 'Waytogo'
            const isMobitek = block.company === 'Mobitek Marketing Group'
            const waytogoClip =
              isWaytogo && waytogoPreviewMaxPx != null && !waytogoExpanded

            return (
              <div
                key={`${block.company}-${blockIdx}`}
                ref={isRapidsol ? rapidsolCardRef : isWaytogo ? waytogoCardRef : undefined}
                className={`relative rounded-xl border border-white/10 bg-white/[0.02] p-4 shadow-lg shadow-black/20 md:p-6 ${
                  waytogoClip ? 'overflow-hidden' : ''
                } ${isMobitek ? 'lg:col-span-2 lg:mx-auto lg:max-w-3xl' : ''}`}
                style={
                  isWaytogo && waytogoPreviewMaxPx != null && !waytogoExpanded
                    ? { maxHeight: waytogoPreviewMaxPx }
                    : undefined
                }
              >
                <div className="flex gap-4 md:gap-6">
                  <CompanyLogo src={block.logoSrc} company={block.company} />
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="shrink-0 border-b border-white/[0.07] bg-gradient-to-r from-accent-600/[0.04] via-white/[0.02] to-transparent px-0 py-3 text-left">
                      <CompanyHeading href={block.companyUrl || undefined}>{block.company}</CompanyHeading>
                    </div>

                    {showTimeline ? (
                      <div className="mt-6">
                        <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">
                          Part-time (Present) → Full-time → Internship
                        </p>
                        <div className="relative border-l border-white/15 pl-6">
                          {block.roles.map((r, i) => (
                            <div key={i} className="relative pb-10 last:pb-0">
                              <span
                                className="absolute -left-[22px] top-2 h-2.5 w-2.5 rounded-full border-2 border-[#0a0a0a] bg-accent shadow-[0_0_0_1px_rgba(255,255,255,0.12)]"
                                aria-hidden
                              />
                              <ExperienceRoleContent
                                role={r.role}
                                subtitle={roleSubtitle(block, r)}
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
                        <div key={i} className={i === 0 ? 'pt-5' : 'mt-10 border-t border-white/[0.06] pt-10'}>
                          <ExperienceRoleContent
                            role={r.role}
                            subtitle={roleSubtitle(block, r)}
                            period={r.period}
                            location={r.location}
                            highlights={r.highlights}
                            tenureRef={tenureRef}
                          />
                        </div>
                      ))
                    )}
                    {isWaytogo && waytogoExpanded && waytogoHasMore && (
                      <div className="mt-6 flex justify-center border-t border-white/10 pt-4 sm:justify-start">
                        <button
                          type="button"
                          onClick={() => setWaytogoExpanded(false)}
                          className="rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white/70 transition-colors hover:border-white/25 hover:bg-white/10 hover:text-white"
                        >
                          Show less
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {isWaytogo && waytogoClip && waytogoHasMore && (
                  <>
                    <div
                      className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-28 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/90 to-transparent"
                      aria-hidden
                    />
                    <div className="absolute bottom-3 left-1/2 z-[2] -translate-x-1/2 px-2">
                      <button
                        type="button"
                        onClick={() => setWaytogoExpanded(true)}
                        className="whitespace-nowrap rounded-lg border border-accent/40 bg-black/60 px-4 py-2 text-xs font-bold uppercase tracking-wider text-accent-100 shadow-lg backdrop-blur-sm transition-colors hover:border-accent/60 hover:bg-accent/20"
                      >
                        Show more
                      </button>
                    </div>
                  </>
                )}
              </div>
            )
          })}
        </div>

        <div
          className="relative mx-auto mt-20 w-full max-w-lg rounded-2xl border border-accent/20 bg-white/[0.03] px-4 py-8 shadow-inner backdrop-blur-sm sm:max-w-2xl sm:px-6 sm:py-10 md:max-w-3xl md:px-8 lg:max-w-5xl lg:px-10 lg:py-11 xl:max-w-6xl 2xl:max-w-7xl 2xl:px-12 2xl:py-12"
          data-aos="fade-up"
        >
          <div className="absolute -top-px left-1/2 h-px w-24 -translate-x-1/2 bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
          <h3 className="mb-2 text-center text-2xl font-extrabold uppercase tracking-tight text-white">
            Skills
          </h3>
          <p className="mx-auto mb-8 max-w-2xl px-1 text-center text-sm text-white/50 sm:max-w-3xl lg:max-w-4xl xl:max-w-5xl">
            Technologies and tools consolidated from the roles above—deduplicated and ordered A–Z.
          </p>
          <div className="flex flex-wrap justify-center gap-2.5 md:gap-3">
            {allSkills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-accent/35 bg-accent/15 px-4 py-2 text-sm font-semibold text-white/95 shadow-sm transition-colors hover:border-accent/50 hover:bg-accent/25"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills
