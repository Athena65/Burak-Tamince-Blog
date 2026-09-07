import { test, expect } from '@playwright/test'
import { readEvents, eventsNamed, switchLanguage } from './helpers.js'

test.describe('analytics events', () => {
  test('the event buffer starts empty', async ({ page }) => {
    await page.goto('/')
    await page.waitForTimeout(500)

    const events = await readEvents(page)
    expect(events).toEqual([])
  })

  test('a project GitHub link pushes outbound_click', async ({ page, context }) => {
    // Stub github.com at the context level so the popup never leaves the sandbox.
    await context.route(/github\.com/, (route) =>
      route.fulfill({ status: 200, contentType: 'text/html', body: '<html><body>stub</body></html>' }),
    )

    await page.goto('/')

    const card = page
      .locator('#portfolio article')
      .filter({ has: page.getByRole('heading', { name: 'E-Commerce Laravel' }) })
    const link = card.getByRole('link', { name: /Open E-Commerce Laravel on GitHub/ })
    await link.scrollIntoViewIfNeeded()

    const popupPromise = page.waitForEvent('popup')
    await link.click()
    const popup = await popupPromise
    await popup.close()

    const outbound = eventsNamed(await readEvents(page), 'outbound_click')
    expect(outbound).toHaveLength(1)
    expect(outbound[0].params).toMatchObject({
      link_kind: 'github',
      link_url: 'https://github.com/Athena65/E-Commerce-Laravel',
      project: 'E-Commerce Laravel',
    })
  })

  test('the resume Download CV pushes cv_download', async ({ page }) => {
    await page.goto('/')

    const cv = page.locator('#resume').getByRole('link', { name: /Download CV/ })
    await cv.scrollIntoViewIfNeeded()

    const downloadPromise = page.waitForEvent('download')
    await cv.click()
    const download = await downloadPromise
    expect(download.suggestedFilename()).toBe('Burak_Tamince_CV.pdf')

    const downloads = eventsNamed(await readEvents(page), 'cv_download')
    expect(downloads).toHaveLength(1)
    expect(downloads[0].params).toEqual({ location: 'resume' })
  })

  test('switching language pushes language_change', async ({ page }) => {
    await page.goto('/')

    await switchLanguage(page)
    await expect(page.locator('html')).toHaveAttribute('lang', 'tr')

    const changes = eventsNamed(await readEvents(page), 'language_change')
    expect(changes).toHaveLength(1)
    expect(changes[0].params).toEqual({ language: 'tr' })
  })
})
