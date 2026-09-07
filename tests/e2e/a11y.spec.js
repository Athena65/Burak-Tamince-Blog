import { test, expect } from '@playwright/test'
import { openNavIfMobile } from './helpers.js'

test.describe('accessibility basics', () => {
  test('every image has an alt attribute', async ({ page }) => {
    await page.goto('/')
    await page.waitForTimeout(800)

    const missing = await page.$$eval('img', (imgs) =>
      imgs.filter((img) => !img.hasAttribute('alt')).map((img) => img.getAttribute('src') || '(no src)'),
    )
    expect(missing, `images without alt: ${missing.join(', ')}`).toEqual([])
  })

  test('every icon-only button and link has an accessible name', async ({ page }) => {
    await page.goto('/')
    // The nav rail plates are the main icon-only controls; open the panel on mobile.
    await openNavIfMobile(page)

    const unnamed = await page.$$eval('button, a[href]', (els) =>
      els
        .filter((el) => {
          // Only judge controls that are actually laid out.
          if (!el.getClientRects().length) return false
          const name =
            el.getAttribute('aria-label') ||
            el.getAttribute('title') ||
            el.textContent.trim() ||
            Array.from(el.querySelectorAll('img'))
              .map((img) => img.getAttribute('alt') || '')
              .join('')
              .trim()
          return !name
        })
        .map((el) => `${el.tagName.toLowerCase()}[class="${el.className}"]`),
    )
    expect(unnamed, `controls without an accessible name: ${unnamed.join(' | ')}`).toEqual([])
  })

  test('the page has exactly one h1', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('h1')).toHaveCount(1)
  })

  test('no horizontal overflow at 390px', async ({ page }) => {
    // Pinned so the assertion means the same thing in both projects.
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/')
    await page.waitForTimeout(1200)

    const { scrollWidth, clientWidth } = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }))

    expect(
      scrollWidth,
      `document scrollWidth ${scrollWidth} exceeds the ${clientWidth}px viewport`,
    ).toBeLessThanOrEqual(clientWidth + 1)
  })
})
