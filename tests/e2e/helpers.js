/**
 * Shared helpers.
 *
 * The two projects (desktop 1280, mobile 390) render the same DOM but the nav
 * behaves differently: below xl (1280px) `#header` is `invisible h-0 opacity-0
 * pointer-events-none` and the language toggle lives inside it. So anything that
 * touches the rail has to open the mobile panel first.
 */

export const isDesktop = (page) => (page.viewportSize()?.width ?? 0) >= 1280

/** The mobile menu toggle. Identified by aria-controls, not by its copy. */
export const menuToggle = (page) => page.locator('button[aria-controls="navmenu"]')

/**
 * Opens the mobile nav panel if we are on a narrow viewport and it is not
 * already open. Idempotent: a language switch leaves the panel open (only nav
 * links close it), so callers may hit this twice in one test.
 */
export async function openNavIfMobile(page) {
  if (isDesktop(page)) return
  const toggle = menuToggle(page)
  if ((await toggle.getAttribute('aria-expanded')) === 'true') return
  await toggle.click()
  await page.locator('#navmenu').waitFor({ state: 'visible' })
}

/**
 * The single language switch. #navmenu holds exactly one <button> (every nav
 * item is an <a>), so this stays correct as the button's copy evolves.
 */
export const languageToggle = (page) => page.locator('#navmenu button')

/** Switch language via the UI, opening the mobile panel when needed. */
export async function switchLanguage(page) {
  await openNavIfMobile(page)
  await languageToggle(page).click()
}

/**
 * Third-party hosts whose failures are outside this site's control and are
 * allowed to log console errors. Anything served from 127.0.0.1 is the site's
 * own problem and is never filtered here.
 */
export const THIRD_PARTY_NOISE = [
  'api.github.com',
  'googletagmanager.com',
  'google-analytics.com',
  'analytics.google.com',
  // YouTube thumbnails: VideoCard intentionally falls back to hqdefault when
  // maxresdefault 404s, so that 404 is expected behaviour, not a defect.
  'img.youtube.com',
  'youtube.com',
  // Webfonts: the sandbox may be offline; the CSS declares real fallback stacks.
  'fonts.googleapis.com',
  'fonts.gstatic.com',
]

export const isThirdPartyNoise = (text = '', url = '') =>
  THIRD_PARTY_NOISE.some((host) => text.includes(host) || url.includes(host))

/**
 * Collects uncaught page errors and console errors. Attach BEFORE goto().
 * Returns { pageErrors, consoleErrors } — both already filtered.
 */
export function collectPageProblems(page) {
  const pageErrors = []
  const consoleErrors = []

  page.on('pageerror', (err) => {
    if (isThirdPartyNoise(err.message)) return
    pageErrors.push(`${err.name}: ${err.message}`)
  })

  page.on('console', (msg) => {
    if (msg.type() !== 'error') return
    const url = msg.location()?.url || ''
    if (isThirdPartyNoise(msg.text(), url)) return
    consoleErrors.push(`${msg.text()} @ ${url}`)
  })

  return { pageErrors, consoleErrors }
}

/** window.__btEvents, normalised to an array. */
export const readEvents = (page) => page.evaluate(() => window.__btEvents ?? [])

export const eventsNamed = (events, name) => events.filter((e) => e.name === name)
