import { test, expect } from '@playwright/test'
import { openNavIfMobile, languageToggle, switchLanguage } from './helpers.js'

// Turkish strings taken verbatim from the components.
const TR_HERO_DECK = 'Bilgisayar mühendisi ve full-stack geliştirici, İstanbul.'
const TR_ABOUT_TITLE = 'Hakkımda'
const EN_HERO_DECK = 'Computer engineer and full-stack developer, Istanbul.'

test.describe('language switch', () => {
  test('default render is English', async ({ page }) => {
    await page.goto('/')

    await expect(page.locator('html')).toHaveAttribute('lang', 'en')
    await expect(page.locator('#hero').getByText(EN_HERO_DECK)).toBeVisible()
    await expect(page.locator('section#about').getByRole('heading', { name: 'About', level: 2 })).toBeVisible()

    await openNavIfMobile(page)
    // The plate shows the language you are reading now and offers the other one.
    // Below xl the target label is a second, visible span, so match the prefix.
    await expect(languageToggle(page)).toHaveText(/^EN/)
    await expect(languageToggle(page)).toHaveAttribute('aria-label', /Turkish|Türkçe/)
  })

  test('clicking the toggle switches the copy to Turkish and sets lang="tr"', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('#hero').getByText(EN_HERO_DECK)).toBeVisible()

    await switchLanguage(page)

    await expect(page.locator('html')).toHaveAttribute('lang', 'tr')
    await expect(page.locator('#hero').getByText(TR_HERO_DECK)).toBeVisible()
    await expect(
      page.locator('section#about').getByRole('heading', { name: TR_ABOUT_TITLE, level: 2 }),
    ).toBeVisible()
    await expect(page.locator('#hero').getByText(EN_HERO_DECK)).toHaveCount(0)

    await openNavIfMobile(page)
    await expect(languageToggle(page)).toHaveText(/^TR/)
    await expect(languageToggle(page)).toHaveAttribute('aria-label', /English|İngilizce/)
  })

  test('the choice is stored and survives a reload', async ({ page }) => {
    await page.goto('/')
    await switchLanguage(page)
    await expect(page.locator('html')).toHaveAttribute('lang', 'tr')

    expect(await page.evaluate(() => window.localStorage.getItem('bt-lang'))).toBe('tr')

    await page.reload()

    await expect(page.locator('html')).toHaveAttribute('lang', 'tr')
    await expect(page.locator('#hero').getByText(TR_HERO_DECK)).toBeVisible()
  })

  test('?lang=tr starts in Turkish', async ({ page }) => {
    await page.goto('/?lang=tr')

    await expect(page.locator('html')).toHaveAttribute('lang', 'tr')
    await expect(page.locator('#hero').getByText(TR_HERO_DECK)).toBeVisible()
    await expect(
      page
        .locator('section#portfolio')
        .getByRole('heading', { name: 'GitHub Projeleri', level: 2, exact: true }),
    ).toBeVisible()
  })
})
