import { test, expect } from '@playwright/test'
import { collectPageProblems } from './helpers.js'

const SECTION_IDS = [
  'hero',
  'about',
  'languages',
  'skills',
  'certificates',
  'resume',
  'portfolio',
  'videos',
]

test.describe('site shell', () => {
  test('homepage loads with the nameplate as the only h1', async ({ page }) => {
    await page.goto('/')

    const h1 = page.locator('h1')
    await expect(h1).toHaveCount(1)
    // The name is split by a <br>, so textContent has no space between the words.
    await expect(h1).toHaveText(/Burak\s*Tamince/)
  })

  test('every section band is present and rendered', async ({ page }) => {
    await page.goto('/')

    for (const id of SECTION_IDS) {
      const section = page.locator(`section#${id}`)
      await expect(section, `section#${id} should exist`).toHaveCount(1)
      await expect(section, `section#${id} should be visible`).toBeVisible()
    }
  })

  test('the footer renders with identity, contact and socials', async ({ page }) => {
    await page.goto('/')

    const footer = page.locator('footer#footer')
    await expect(footer).toBeVisible()
    await expect(footer.getByText('Burak Tamince', { exact: true })).toBeVisible()
    await expect(footer.getByRole('link', { name: 'btamince@gmail.com' })).toHaveAttribute(
      'href',
      'mailto:btamince@gmail.com',
    )
    await expect(footer.getByRole('link', { name: /GitHub profile|GitHub profili/ })).toHaveAttribute(
      'href',
      'https://github.com/Athena65',
    )
    await expect(footer.getByText(new RegExp(`© ${new Date().getFullYear()} Burak Tamince`))).toBeVisible()
  })

  test('no uncaught page errors or first-party console errors during load', async ({ page }) => {
    const { pageErrors, consoleErrors } = collectPageProblems(page)

    await page.goto('/', { waitUntil: 'load' })
    // Wait for the post-mount effects to settle — language detection, AOS, and
    // the GitHub REST calls, which may reject late. A fixed timeout would let a
    // slow rejection land after the assertion and pass by luck.
    await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {})
    await page.waitForTimeout(500)

    expect(pageErrors, `uncaught page errors: ${pageErrors.join(' | ')}`).toEqual([])
    expect(consoleErrors, `console errors: ${consoleErrors.join(' | ')}`).toEqual([])
  })
})
