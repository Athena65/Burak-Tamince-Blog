import { test, expect } from '@playwright/test'
import { isDesktop } from './helpers.js'

test.describe('navigation', () => {
  test('desktop rail link scrolls to the section', async ({ page }) => {
    test.skip(!isDesktop(page), 'the rail is only mounted visible at xl (>=1280px)')

    await page.goto('/')

    // The rail is a fixed column of icon links; the accessible name is the nav word.
    const link = page.locator('#navmenu').getByRole('link', { name: 'Certificates', exact: true })
    await expect(link).toBeVisible()

    expect(await page.evaluate(() => window.scrollY)).toBeLessThan(50)

    await link.click()

    // scroll-behavior: smooth is on, so poll until the band settles at the top.
    await expect
      .poll(async () => {
        const box = await page.locator('section#certificates').boundingBox()
        return Math.round(box?.y ?? 9999)
      }, { timeout: 10000, message: '#certificates should come to rest at the viewport top' })
      .toBeLessThanOrEqual(2)

    expect(page.url()).toContain('#certificates')
    expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(200)
  })

  test('mobile toggle opens the panel and a link closes it', async ({ page }) => {
    test.skip(isDesktop(page), 'below xl only: at xl the rail is always visible')

    await page.goto('/')

    const toggle = page.getByRole('button', { name: /Open menu|Menüyü aç/ })
    await expect(toggle).toBeVisible()
    await expect(toggle).toHaveAttribute('aria-expanded', 'false')
    // Collapsed: the header is invisible and h-0, so Playwright sees it as hidden.
    await expect(page.locator('#header')).toBeHidden()

    await toggle.click()

    await expect(page.locator('#header')).toBeVisible()
    await expect(page.locator('#navmenu')).toBeVisible()
    const closeToggle = page.getByRole('button', { name: /Close menu|Menüyü kapat/ })
    await expect(closeToggle).toHaveAttribute('aria-expanded', 'true')

    const link = page.locator('#navmenu').getByRole('link', { name: 'Projects', exact: true })
    await expect(link).toBeVisible()
    await link.click()

    // Clicking a nav item sets isMenuOpen(false) — the panel collapses again.
    await expect(page.locator('#header')).toBeHidden()
    await expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(page.url()).toContain('#portfolio')
  })
})
