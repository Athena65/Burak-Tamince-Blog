import { useEffect, useMemo, useState } from 'react'
import SectionHeader from './SectionHeader'
import { useLanguage } from '../i18n/LanguageContext'
import { trackOutbound } from '../utils/analytics'

/**
 * Public GitHub activity — aggregate numbers only.
 *
 * Two optional sources, in order:
 *   1. /data/github-stats.json — written by a scheduled GitHub Action. It is the
 *      only source for the contribution calendar (REST does not expose it).
 *   2. the unauthenticated REST API — numbers only, no token, no calendar.
 *
 * The site is static: there is no backend and no key in the bundle. The
 * unauthenticated limit is 60 requests/hour/IP, so failure is the normal case —
 * everything is wrapped, nothing is logged, and the whole section renders
 * nothing rather than an error or a skeleton.
 *
 * Privacy: only counts and public repository languages are read. No repository
 * name, PR title or organisation name is ever put in state or rendered.
 */

const GITHUB_USER = 'Athena65'
const PROFILE_URL = 'https://github.com/Athena65'
const STATS_URL = '/data/github-stats.json'

// level 0 = ink-3, then four steps of the çini turquoise (accent 900/700/500/300)
const LEVEL_COLORS = ['#132630', '#14514C', '#1B837B', '#2EC4B6', '#67D9CF']

const CELL = 11
const GAP = 3
const PITCH = CELL + GAP
const WEEKS = 53
const GUTTER = 30 // weekday label column
const MONTH_ROW = 18 // month label strip above the grid

/** A Sunday, used only to name the weekday rows in the current language. */
const WEEKDAY_ANCHOR = Date.UTC(2024, 0, 7)

const toCount = (value) => {
  const n = Number(value)
  return Number.isFinite(n) && n >= 0 ? Math.round(n) : null
}

/** Parse YYYY-MM-DD in UTC — local parsing shifts the weekday west of Greenwich. */
const parseUtcDate = (value) => {
  if (typeof value !== 'string') return null
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(value)
  if (!match) return null
  const date = new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3])))
  return Number.isNaN(date.getTime()) ? null : date
}

const clampLevel = (level, count) => {
  const n = Number(level)
  if (Number.isFinite(n)) return Math.min(4, Math.max(0, Math.round(n)))
  const c = Number(count)
  return Number.isFinite(c) && c > 0 ? 1 : 0
}

const formatNumber = (value, lang) => {
  try {
    return new Intl.NumberFormat(lang).format(value)
  } catch {
    return String(value)
  }
}

const normaliseContributions = (raw) => {
  if (!raw || typeof raw !== 'object' || !Array.isArray(raw.days)) return null

  const days = raw.days
    .map((day) => {
      const date = parseUtcDate(day?.date)
      if (!date) return null
      const count = toCount(day?.count) ?? 0
      return { date, count, level: clampLevel(day?.level, count) }
    })
    .filter(Boolean)
    .sort((a, b) => a.date - b.date)

  if (!days.length) return null

  const total = toCount(raw.total) ?? days.reduce((sum, day) => sum + day.count, 0)
  const activeDays = days.filter((day) => day.count > 0).length

  return { total, activeDays, days }
}

const normaliseLanguages = (list) => {
  if (!Array.isArray(list)) return []
  return list
    .map((item) => {
      const name = typeof item?.name === 'string' ? item.name.trim() : ''
      const count = toCount(item?.count)
      return name && count ? { name, count } : null
    })
    .filter(Boolean)
    .sort((a, b) => b.count - a.count)
    .slice(0, 8)
}

const isUsable = (stats) =>
  Boolean(
    stats &&
      (stats.publicRepos != null ||
        stats.stars != null ||
        stats.contributions ||
        stats.languages.length > 0),
  )

/** Weeks as columns, weekdays as rows — the first day keeps its real weekday. */
const buildGrid = (days) => {
  const offset = days[0].date.getUTCDay()
  const columns = []

  days.forEach((day, index) => {
    const slot = index + offset
    const col = Math.floor(slot / 7)
    const row = slot % 7
    if (!columns[col]) columns[col] = new Array(7).fill(null)
    columns[col][row] = day
  })

  for (let i = 0; i < columns.length; i += 1) {
    if (!columns[i]) columns[i] = new Array(7).fill(null)
  }

  return columns.slice(Math.max(0, columns.length - WEEKS))
}

const GitHubActivity = () => {
  const { t, lang } = useLanguage()
  const [data, setData] = useState(null)

  useEffect(() => {
    const controller = new AbortController()
    let live = true

    const stop = () => !live || controller.signal.aborted

    // Source 1: the file the scheduled Action commits. Missing file, a 404 page
    // served as HTML, or malformed JSON all fall through to the REST numbers.
    const readStaticFile = async () => {
      const res = await fetch(STATS_URL, {
        signal: controller.signal,
        headers: { Accept: 'application/json' },
      })
      if (!res.ok) return null
      const type = res.headers.get('content-type') || ''
      if (!type.includes('json')) return null

      const json = await res.json()
      if (!json || typeof json !== 'object') return null

      const repos = json.repos && typeof json.repos === 'object' ? json.repos : {}
      const parsed = {
        generatedAt: typeof json.generatedAt === 'string' ? json.generatedAt : null,
        publicRepos: toCount(repos.public),
        stars: toCount(repos.stars),
        contributions: normaliseContributions(json.contributions),
        languages: normaliseLanguages(json.languages),
      }
      // A file that parsed but holds nothing usable counts as a miss, so the
      // REST numbers still get their turn.
      return isUsable(parsed) ? parsed : null
    }

    // Source 2: public REST, no token. Reduced to aggregates here so no
    // repository name ever reaches state or the DOM. No calendar from REST.
    const readRestApi = async () => {
      const options = {
        signal: controller.signal,
        headers: { Accept: 'application/vnd.github+json' },
      }
      const [userResult, reposResult] = await Promise.allSettled([
        fetch(`https://api.github.com/users/${GITHUB_USER}`, options),
        fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`, options),
      ])
      if (stop()) return null

      let publicRepos = null
      if (userResult.status === 'fulfilled' && userResult.value.ok) {
        const user = await userResult.value.json()
        publicRepos = toCount(user?.public_repos)
      }

      let stars = null
      let languages = []
      if (reposResult.status === 'fulfilled' && reposResult.value.ok) {
        const list = await reposResult.value.json()
        if (Array.isArray(list)) {
          const own = list.filter((repo) => repo && !repo.fork && !repo.private)
          stars = own.reduce((sum, repo) => sum + (toCount(repo?.stargazers_count) ?? 0), 0)

          const tally = new Map()
          own.forEach((repo) => {
            const name = typeof repo?.language === 'string' ? repo.language.trim() : ''
            if (name) tally.set(name, (tally.get(name) || 0) + 1)
          })
          languages = normaliseLanguages(
            Array.from(tally, ([name, count]) => ({ name, count })),
          )
        }
      }

      if (publicRepos == null && stars == null) return null
      return { generatedAt: null, publicRepos, stars, contributions: null, languages }
    }

    const load = async () => {
      let next = null

      try {
        next = await readStaticFile()
      } catch (error) {
        if (error?.name === 'AbortError') return
        next = null
      }
      if (stop()) return

      if (!next) {
        try {
          next = await readRestApi()
        } catch (error) {
          if (error?.name === 'AbortError') return
          next = null
        }
      }
      if (stop()) return
      if (isUsable(next)) setData(next)
    }

    load()

    return () => {
      live = false
      controller.abort()
    }
  }, [])

  const contributions = data?.contributions ?? null

  const calendar = useMemo(() => {
    if (!contributions) return null

    const columns = buildGrid(contributions.days)
    if (!columns.length) return null

    let monthFormatter = null
    try {
      monthFormatter = new Intl.DateTimeFormat(lang, { month: 'short', timeZone: 'UTC' })
    } catch {
      monthFormatter = null
    }

    const months = []
    let lastMonth = -1
    let lastLabelCol = -3
    columns.forEach((column, col) => {
      const first = column.find(Boolean)
      if (!first) return
      const month = first.date.getUTCMonth()
      if (month === lastMonth) return
      lastMonth = month
      // Keep labels apart, and never start one so near the right edge that the
      // svg's own clip cuts it in half.
      if (col - lastLabelCol < 3 || col > columns.length - 3) return
      lastLabelCol = col
      const label = monthFormatter
        ? monthFormatter.format(first.date)
        : String(month + 1).padStart(2, '0')
      months.push({ key: `${first.date.toISOString().slice(0, 7)}-${col}`, col, label })
    })

    return {
      columns,
      months,
      width: GUTTER + columns.length * PITCH - GAP,
      height: MONTH_ROW + 7 * PITCH - GAP,
    }
  }, [contributions, lang])

  const weekdays = useMemo(() => {
    let formatter = null
    try {
      formatter = new Intl.DateTimeFormat(lang, { weekday: 'short', timeZone: 'UTC' })
    } catch {
      formatter = null
    }
    if (!formatter) return []
    // Monday, Wednesday, Friday — the usual three, so the rows stay readable.
    return [1, 3, 5].map((row) => ({
      row,
      label: formatter.format(new Date(WEEKDAY_ANCHOR + row * 86400000)),
    }))
  }, [lang])

  const updatedLabel = useMemo(() => {
    if (!data?.generatedAt) return null
    const date = new Date(data.generatedAt)
    if (Number.isNaN(date.getTime())) return null
    try {
      return new Intl.DateTimeFormat(lang, { dateStyle: 'medium' }).format(date)
    } catch {
      return date.toISOString().slice(0, 10)
    }
  }, [data, lang])

  // Loading, rate-limited, offline, or no usable data: render nothing at all.
  if (!data) return null

  const figures = []
  if (data.publicRepos != null) {
    figures.push({
      key: 'repos',
      value: data.publicRepos,
      label: { en: 'Public repositories', tr: 'Herkese açık depo' },
    })
  }
  if (data.stars != null) {
    figures.push({
      key: 'stars',
      value: data.stars,
      label: { en: 'Total stars', tr: 'Toplam yıldız' },
    })
  }
  if (contributions) {
    figures.push({
      key: 'contributions',
      value: contributions.total,
      label: { en: 'Contributions in the last year', tr: 'Son bir yıldaki katkı' },
    })
    figures.push({
      key: 'active-days',
      value: contributions.activeDays,
      label: { en: 'Active days', tr: 'Aktif gün' },
    })
  }

  const calendarLabel = contributions
    ? t({
        en: `Contribution heatmap: ${formatNumber(contributions.total, lang)} contributions in the last year, spread over ${formatNumber(contributions.activeDays, lang)} active days.`,
        tr: `Katkı ısı haritası: son bir yılda ${formatNumber(contributions.total, lang)} katkı, ${formatNumber(contributions.activeDays, lang)} aktif güne yayılmış.`,
      })
    : ''

  return (
    <section id="github" className="github section relative border-t border-rule py-20 md:py-28">
      <div className="container">
        <SectionHeader
          title={t({ en: 'GitHub', tr: 'GitHub' })}
          deck={t({
            en: 'Public open-source activity: repositories, commit history over the last year, and the languages they are written in. Numbers only, refreshed automatically.',
            tr: 'Herkese açık kaynak çalışmaları: depolar, son bir yılın katkı geçmişi ve bu depolarda kullanılan diller. Yalnızca sayılar, otomatik olarak güncellenir.',
          })}
        />

        <div data-aos="fade-up">
          {figures.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {figures.map((figure) => (
                <p key={figure.key}>
                  <span className="font-display text-3xl font-semibold tabular-nums text-brass">
                    {formatNumber(figure.value, lang)}
                  </span>
                  <span className="mt-1 block text-sm text-paper-dim">{t(figure.label)}</span>
                </p>
              ))}
            </div>
          )}

          {calendar && (
            <div className={figures.length > 0 ? 'mt-12' : ''}>
              <div className="overflow-x-auto">
                <svg
                  role="img"
                  aria-label={calendarLabel}
                  width={calendar.width}
                  height={calendar.height}
                  viewBox={`0 0 ${calendar.width} ${calendar.height}`}
                  className="block"
                >
                  <title>{calendarLabel}</title>

                  {calendar.months.map((month) => (
                    <text
                      key={month.key}
                      x={GUTTER + month.col * PITCH}
                      y={11}
                      fill="currentColor"
                      className="text-xs text-paper-mute"
                    >
                      {month.label}
                    </text>
                  ))}

                  {weekdays.map((weekday) => (
                    <text
                      key={weekday.row}
                      x={0}
                      y={MONTH_ROW + weekday.row * PITCH + CELL - 1}
                      fill="currentColor"
                      className="text-xs text-paper-mute"
                    >
                      {weekday.label}
                    </text>
                  ))}

                  {calendar.columns.map((column, col) =>
                    column.map((day, row) =>
                      day ? (
                        <rect
                          key={day.date.toISOString().slice(0, 10)}
                          x={GUTTER + col * PITCH}
                          y={MONTH_ROW + row * PITCH}
                          width={CELL}
                          height={CELL}
                          rx={2}
                          fill={LEVEL_COLORS[day.level]}
                        />
                      ) : null,
                    ),
                  )}
                </svg>
              </div>

              <div className="mt-4 flex items-center gap-2 text-sm text-paper-mute">
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
              </div>
            </div>
          )}

          {data.languages.length > 0 && (
            <div className="mt-12">
              <p className="text-sm text-paper-dim">
                {t({ en: 'Most used languages', tr: 'En çok kullanılan diller' })}
              </p>
              <ul className="mt-3 flex list-none flex-wrap gap-2 p-0">
                {data.languages.map((language) => (
                  <li
                    key={language.name}
                    className="rounded-sm border border-rule bg-ink-3/60 px-2.5 py-1 text-[13px] text-paper-dim"
                  >
                    {language.name}{' '}
                    <span className="tabular-nums text-brass">
                      {formatNumber(language.count, lang)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3">
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

            {updatedLabel && (
              <p className="text-sm text-paper-mute">
                {t({
                  en: `Last updated ${updatedLabel}`,
                  tr: `Son güncelleme: ${updatedLabel}`,
                })}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default GitHubActivity
