import { useEffect, useMemo, useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { trackOutbound } from '../utils/analytics'

const PROFILE_URL = 'https://github.com/Athena65'
const STATS_URL = '/data/github-stats.json'

// Level 0 is the empty cell; 1-4 climb the accent turquoise.
const LEVEL_COLORS = ['#132630', '#14514C', '#1B837B', '#2EC4B6', '#67D9CF']

// Chart geometry, in SVG user units.
const CELL = 11
const GAP = 3
const STEP = CELL + GAP
const ROWS = 7
const LABEL_H = 16
const GUTTER = 30

// GitHub labels alternate rows only, so the column stays readable.
const WEEKDAY_ROWS = [
  { row: 1, label: { en: 'Mon', tr: 'Pzt' } },
  { row: 3, label: { en: 'Wed', tr: 'Çar' } },
  { row: 5, label: { en: 'Fri', tr: 'Cum' } },
]

/**
 * Group a chronological day list into GitHub-style week columns.
 * The first column is padded so every row is a fixed weekday (Sunday first).
 */
const toWeeks = (days) => {
  if (!days.length) return []

  const weeks = []
  let column = new Array(new Date(`${days[0].date}T00:00:00Z`).getUTCDay()).fill(null)

  for (const day of days) {
    column.push(day)
    if (column.length === ROWS) {
      weeks.push(column)
      column = []
    }
  }
  if (column.length) weeks.push([...column, ...new Array(ROWS - column.length).fill(null)])

  return weeks
}

/** First column of each month, so labels sit where the month actually starts. */
const monthTicks = (weeks, formatter) => {
  const ticks = []
  let previous = null

  weeks.forEach((week, index) => {
    const first = week.find(Boolean)
    if (!first) return
    const month = first.date.slice(0, 7)
    if (month !== previous && index < weeks.length - 1) {
      ticks.push({ index, label: formatter.format(new Date(`${first.date}T00:00:00Z`)) })
      previous = month
    }
  })

  return ticks
}

const Figure = ({ value, label }) => (
  <div>
    <p className="font-display text-3xl font-semibold tabular-nums text-brass">{value}</p>
    <p className="mt-1 text-sm text-paper-dim">{label}</p>
  </div>
)

/**
 * Public GitHub activity, rendered above the project grid.
 *
 * Data comes from /data/github-stats.json, refreshed by a scheduled Action.
 * The file carries dates and counts only — never a repository or organisation
 * name — so nothing private can leak onto a public page. If the file is
 * missing the panel falls back to the public REST API for the headline
 * numbers; the contribution calendar is not exposed there, so the heatmap is
 * simply omitted in that case. Every failure path renders nothing.
 */
const GitHubStats = () => {
  const { t, lang } = useLanguage()
  const [data, setData] = useState(null)

  useEffect(() => {
    const controller = new AbortController()
    let live = true

    const load = async () => {
      try {
        const res = await fetch(STATS_URL, { signal: controller.signal })
        if (res.ok && res.headers.get('content-type')?.includes('json')) {
          const json = await res.json()
          if (live && json?.repos) {
            setData(json)
            return
          }
        }
      } catch {
        // Missing file or offline — fall through to the REST fallback.
      }

      // Unauthenticated REST allows 60 requests per hour per IP, so this can
      // fail for ordinary visitors. That is expected: we render nothing.
      try {
        const [user, repos] = await Promise.all([
          fetch('https://api.github.com/users/Athena65', { signal: controller.signal }),
          fetch('https://api.github.com/users/Athena65/repos?per_page=100', { signal: controller.signal }),
        ])
        if (!user.ok || !repos.ok) return

        const profile = await user.json()
        const list = await repos.json()
        if (!live || !Array.isArray(list)) return

        const own = list.filter((r) => !r.fork && !r.private)
        const counts = {}
        for (const repo of own) {
          if (repo.language) counts[repo.language] = (counts[repo.language] || 0) + 1
        }

        setData({
          repos: {
            public: profile.public_repos,
            stars: own.reduce((sum, r) => sum + r.stargazers_count, 0),
          },
          languages: Object.entries(counts)
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 8),
        })
      } catch {
        // Aborted, offline or rate-limited — stay silent.
      }
    }

    load()
    return () => {
      live = false
      controller.abort()
    }
  }, [])

  const locale = lang === 'tr' ? 'tr-TR' : 'en-GB'

  const chart = useMemo(() => {
    const days = data?.contributions?.days
    if (!Array.isArray(days) || days.length === 0) return null

    const weeks = toWeeks(days)
    const formatter = new Intl.DateTimeFormat(locale, { month: 'short', timeZone: 'UTC' })

    return {
      weeks,
      ticks: monthTicks(weeks, formatter),
      width: GUTTER + weeks.length * STEP,
      height: ROWS * STEP + LABEL_H,
      activeDays: days.filter((d) => d.count > 0).length,
      best: days.reduce((a, b) => (b.count > a.count ? b : a), days[0]),
    }
  }, [data, locale])

  if (!data) return null

  const totalContributions = data.contributions?.total
  const languages = data.languages || []
  const languageTotal = languages.reduce((sum, l) => sum + l.count, 0)

  const dayLabel = new Intl.DateTimeFormat(locale, { dateStyle: 'long', timeZone: 'UTC' })

  const dayTooltip = (day) => {
    const when = dayLabel.format(new Date(`${day.date}T00:00:00Z`))
    if (day.count === 0) return t({ en: `No contributions on ${when}`, tr: `${when} tarihinde katkı yok` })
    return t({
      en: `${day.count} ${day.count === 1 ? 'contribution' : 'contributions'} on ${when}`,
      tr: `${when} tarihinde ${day.count} katkı`,
    })
  }

  return (
    <div
      className="mb-14 rounded-md border border-rule bg-ink-2/50 p-5 md:mb-16 md:p-7"
      data-aos="fade-up"
      data-aos-delay="100"
    >
      {/* Headline figures */}
      <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
        <Figure
          value={data.repos.public}
          label={t({ en: 'Public repositories', tr: 'Herkese açık depo' })}
        />
        <Figure value={data.repos.stars} label={t({ en: 'Stars earned', tr: 'Alınan yıldız' })} />
        {typeof totalContributions === 'number' && (
          <Figure
            value={totalContributions}
            label={t({ en: 'Contributions this year', tr: 'Bu yılki katkı' })}
          />
        )}
        {chart && (
          <Figure value={chart.activeDays} label={t({ en: 'Active days', tr: 'Aktif gün' })} />
        )}
      </div>

      {/* Contribution calendar */}
      {chart && (
        <div className="mt-8 border-t border-rule pt-6">
          <div className="overflow-x-auto pb-1">
            <svg
              viewBox={`0 0 ${chart.width} ${chart.height}`}
              preserveAspectRatio="xMidYMid meet"
              role="img"
              aria-label={t({
                en: `${totalContributions} contributions over the last year, across ${chart.activeDays} active days.`,
                tr: `Son bir yılda ${chart.activeDays} aktif günde ${totalContributions} katkı.`,
              })}
              className="block h-auto w-full min-w-[34rem]"
            >
              <title>
                {t({ en: 'Contribution calendar', tr: 'Katkı takvimi' })}
              </title>

              {chart.ticks.map((tick) => (
                <text
                  key={tick.index}
                  x={GUTTER + tick.index * STEP}
                  y={11}
                  fill="#6E8590"
                  fontSize="10"
                  fontFamily="inherit"
                >
                  {tick.label}
                </text>
              ))}

              {WEEKDAY_ROWS.map((day) => (
                <text
                  key={day.row}
                  x={0}
                  y={LABEL_H + day.row * STEP + CELL - 1}
                  fill="#6E8590"
                  fontSize="10"
                  fontFamily="inherit"
                >
                  {t(day.label)}
                </text>
              ))}

              {chart.weeks.map((week, x) =>
                week.map((day, y) =>
                  day ? (
                    <rect
                      key={day.date}
                      x={GUTTER + x * STEP}
                      y={LABEL_H + y * STEP}
                      width={CELL}
                      height={CELL}
                      rx="2"
                      fill={LEVEL_COLORS[day.level] || LEVEL_COLORS[0]}
                      strokeWidth="1.5"
                      className="stroke-transparent transition-colors duration-150 hover:stroke-paper"
                    >
                      <title>{dayTooltip(day)}</title>
                    </rect>
                  ) : null,
                ),
              )}
            </svg>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-paper-mute">
            <p>
              {t({ en: 'Busiest day', tr: 'En yoğun gün' })}{' '}
              <span className="tabular-nums text-brass">{chart.best.count}</span>{' '}
              {dayLabel.format(new Date(`${chart.best.date}T00:00:00Z`))}
            </p>

            <p className="flex items-center gap-2">
              <span>{t({ en: 'Less', tr: 'Az' })}</span>
              {LEVEL_COLORS.map((color) => (
                <span
                  key={color}
                  aria-hidden="true"
                  className="inline-block h-[11px] w-[11px] rounded-[2px]"
                  style={{ backgroundColor: color }}
                />
              ))}
              <span>{t({ en: 'More', tr: 'Çok' })}</span>
            </p>
          </div>
        </div>
      )}

      {/* Language mix, drawn as one proportional bar */}
      {languageTotal > 0 && (
        <div className="mt-8 border-t border-rule pt-6">
          <p className="text-sm text-paper-dim">
            {t({ en: 'Languages across those repositories', tr: 'Bu depolarda kullanılan diller' })}
          </p>

          <div className="mt-3 flex h-2.5 w-full overflow-hidden rounded-sm" aria-hidden="true">
            {languages.map((language, i) => (
              <span
                key={language.name}
                className="block h-full"
                style={{
                  width: `${(language.count / languageTotal) * 100}%`,
                  backgroundColor: LEVEL_COLORS[4 - (i % 4)],
                }}
              />
            ))}
          </div>

          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {languages.map((language, i) => (
              <li key={language.name} className="flex items-center gap-2 text-paper-dim">
                <span
                  aria-hidden="true"
                  className="inline-block h-2.5 w-2.5 rounded-[2px]"
                  style={{ backgroundColor: LEVEL_COLORS[4 - (i % 4)] }}
                />
                {language.name}
                <span className="tabular-nums text-paper-mute">{language.count}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Profile link */}
      <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-rule pt-6">
        <a
          href={PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackOutbound('github', PROFILE_URL, { source: 'activity' })}
          className="inline-flex items-center gap-2 rounded-sm border border-rule-strong px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:border-accent hover:text-accent"
        >
          <i className="bi bi-github" aria-hidden="true"></i>
          {t({ en: 'View profile on GitHub', tr: "GitHub'da profili gör" })}
        </a>

        {data.generatedAt && (
          <p className="text-sm text-paper-mute">
            {t({ en: 'Updated', tr: 'Güncellendi' })}{' '}
            {new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }).format(new Date(data.generatedAt))}
          </p>
        )}
      </div>
    </div>
  )
}

export default GitHubStats
