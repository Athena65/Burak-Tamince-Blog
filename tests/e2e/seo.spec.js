import { test, expect } from '@playwright/test'

const content = (page, selector) => page.locator(selector).getAttribute('content')

test.describe('SEO head', () => {
  test('title and meta description are present', async ({ page }) => {
    await page.goto('/')

    await expect(page).toHaveTitle(/Burak Tamince/)

    const description = await content(page, 'meta[name="description"]')
    expect(description).toBeTruthy()
    expect(description.length).toBeGreaterThan(60)
    expect(description).toContain('Burak Tamince')
  })

  test('canonical and the three hreflang alternates', async ({ page }) => {
    await page.goto('/')

    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://buraktamince.net.tr/',
    )

    await expect(page.locator('link[rel="alternate"][hreflang]')).toHaveCount(3)
    await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute(
      'href',
      'https://buraktamince.net.tr/',
    )
    await expect(page.locator('link[rel="alternate"][hreflang="tr"]')).toHaveAttribute(
      'href',
      'https://buraktamince.net.tr/?lang=tr',
    )
    await expect(page.locator('link[rel="alternate"][hreflang="x-default"]')).toHaveAttribute(
      'href',
      'https://buraktamince.net.tr/',
    )
  })

  test('?lang=tr rewrites the canonical to the tr URL', async ({ page }) => {
    await page.goto('/?lang=tr')

    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://buraktamince.net.tr/?lang=tr',
    )
  })

  test('og:image is the 1200x630 card and it is actually served', async ({ page }) => {
    await page.goto('/')

    const image = await content(page, 'meta[property="og:image"]')
    expect(image).toMatch(/\/assets\/img\/og-card\.png$/)
    expect(await content(page, 'meta[property="og:image:width"]')).toBe('1200')
    expect(await content(page, 'meta[property="og:image:height"]')).toBe('630')

    const res = await page.request.get('/assets/img/og-card.png')
    expect(res.status()).toBe(200)
  })

  test('JSON-LD parses and carries the Person node', async ({ page }) => {
    await page.goto('/')

    const raw = await page.locator('script[type="application/ld+json"]').first().textContent()
    expect(raw).toBeTruthy()

    let data
    expect(() => {
      data = JSON.parse(raw)
    }, 'JSON-LD must parse').not.toThrow()

    expect(data['@context']).toBe('https://schema.org')
    expect(Array.isArray(data['@graph'])).toBe(true)

    const person = data['@graph'].find((node) => node['@type'] === 'Person')
    expect(person, 'the graph must contain a Person node').toBeTruthy()
    expect(person.name).toBe('Burak Tamince')
    expect(person.alternateName).toContain('buraktamince')
    expect(person.sameAs).toContain('https://github.com/Athena65')
  })
})
