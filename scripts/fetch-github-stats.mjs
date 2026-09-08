/**
 * Writes public/data/github-stats.json, the file the GitHub panel reads.
 *
 * Runs in CI during the deploy build, so no token ever reaches the browser and
 * nothing has to be committed back to the repository (main is protected by a
 * ruleset that only accepts pull requests).
 *
 * Privacy: the output carries aggregate numbers and per-day contribution counts
 * only — never a repository name, organisation name or pull request title.
 * Forked and private repositories are excluded from every total.
 *
 * Exits 0 even on failure. The committed file stays in place as the fallback,
 * and a failed stats refresh must never fail a deploy.
 */
import { writeFile, mkdir, readFile } from 'node:fs/promises'
import { dirname } from 'node:path'

const USER = 'Athena65'
const OUT = 'public/data/github-stats.json'
const token = process.env.GH_TOKEN

const LEVELS = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
}

const headers = {
  'User-Agent': 'btblog-stats',
  Accept: 'application/vnd.github+json',
  ...(token ? { Authorization: `bearer ${token}` } : {}),
}

/** Contribution calendar. GraphQL only — REST does not expose it. */
async function fetchCalendar() {
  if (!token) {
    console.warn('No GH_TOKEN in the environment; skipping the contribution calendar.')
    return null
  }

  const query = `query($login:String!){
    user(login:$login){
      contributionsCollection{
        contributionCalendar{
          totalContributions
          weeks{ contributionDays{ date contributionCount contributionLevel } }
        }
      }
    }
  }`

  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables: { login: USER } }),
  })

  if (!res.ok) {
    console.warn(`GraphQL request failed with ${res.status}; skipping the calendar.`)
    return null
  }

  const body = await res.json()
  const calendar = body?.data?.user?.contributionsCollection?.contributionCalendar

  if (!calendar) {
    console.warn(
      'GraphQL returned no contribution calendar. If this persists, add a classic PAT\n' +
        'with only the read:user scope as the repository secret GH_STATS_TOKEN.',
    )
    if (body?.errors) console.warn(JSON.stringify(body.errors))
    return null
  }

  const days = calendar.weeks.flatMap((week) =>
    week.contributionDays.map((day) => ({
      date: day.date,
      count: day.contributionCount,
      level: LEVELS[day.contributionLevel] ?? 0,
    })),
  )

  return { total: calendar.totalContributions, days }
}

/** Public profile and repository aggregates. */
async function fetchRepos() {
  const [userRes, reposRes] = await Promise.all([
    fetch(`https://api.github.com/users/${USER}`, { headers }),
    fetch(`https://api.github.com/users/${USER}/repos?per_page=100`, { headers }),
  ])

  if (!userRes.ok || !reposRes.ok) {
    throw new Error(`REST request failed (${userRes.status}/${reposRes.status})`)
  }

  const profile = await userRes.json()
  const list = await reposRes.json()
  const own = Array.isArray(list) ? list.filter((r) => !r.fork && !r.private) : []

  const counts = {}
  for (const repo of own) {
    if (repo.language) counts[repo.language] = (counts[repo.language] || 0) + 1
  }

  return {
    repos: {
      public: profile.public_repos,
      stars: own.reduce((sum, r) => sum + r.stargazers_count, 0),
      forks: own.reduce((sum, r) => sum + r.forks_count, 0),
    },
    languages: Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
      .slice(0, 8),
  }
}

/** Whatever is already committed, so a failed call degrades instead of erasing. */
async function readExisting() {
  try {
    return JSON.parse(await readFile(OUT, 'utf8'))
  } catch {
    return null
  }
}

try {
  const [calendar, repoData, existing] = await Promise.all([
    fetchCalendar(),
    fetchRepos(),
    readExisting(),
  ])

  // A calendar we could not fetch must never blank out one we already have:
  // the heatmap would silently disappear on a single API hiccup.
  const contributions =
    calendar ??
    (existing?.contributions?.days?.length ? existing.contributions : { total: 0, days: [] })

  if (!calendar && contributions.days.length) {
    console.warn('Keeping the previously stored contribution calendar.')
  }

  const payload = {
    generatedAt: new Date().toISOString(),
    user: USER,
    contributions,
    ...repoData,
  }

  await mkdir(dirname(OUT), { recursive: true })
  await writeFile(OUT, `${JSON.stringify(payload, null, 2)}\n`, 'utf8')

  const active = payload.contributions.days.filter((d) => d.count > 0).length
  console.log(
    `Wrote ${OUT}: ${payload.repos.public} repos, ${payload.repos.stars} stars, ` +
      `${payload.contributions.total} contributions across ${active} active days.`,
  )
} catch (error) {
  // Never fail the deploy over statistics; the committed file remains in place.
  console.warn(`Stats refresh failed, keeping the existing file. ${error.message}`)
}
