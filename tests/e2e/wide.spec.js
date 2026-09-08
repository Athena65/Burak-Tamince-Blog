import { test, expect } from '@playwright/test'

/**
 * Very large displays used to freeze: the column stopped growing at 1312px, the
 * margins were lopsided because the rail's 140px reservation stayed in place,
 * and nothing scaled the type. These assertions pin that fix down.
 *
 * The spec drives its own viewports, so it runs once per project and skips the
 * mobile one rather than testing the same thing twice.
 */
test.describe('very large screens', () => {
  test.skip(({ viewport }) => (viewport?.width ?? 0) < 1280, 'desktop project only')

  const metrics = (page) =>
    page.evaluate(() => {
      const container = document.querySelector('#about .container')
      const style = getComputedStyle(container)
      const box = container.getBoundingClientRect()
      const header = document.querySelector('#header').getBoundingClientRect()

      return {
        left: box.left + parseFloat(style.paddingLeft),
        right: window.innerWidth - box.right + parseFloat(style.paddingRight),
        width: box.width - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight),
        rootFontPx: parseFloat(getComputedStyle(document.documentElement).fontSize),
        railRight: header.right,
        overflow: document.documentElement.scrollWidth - window.innerWidth,
      }
    })

  test('the content column keeps growing past 1600px', async ({ page }) => {
    await page.setViewportSize({ width: 1600, height: 900 })
    await page.goto('/')
    const narrow = await metrics(page)

    await page.setViewportSize({ width: 3840, height: 1200 })
    await page.waitForTimeout(200)
    const wide = await metrics(page)

    expect(wide.width).toBeGreaterThan(narrow.width)
    expect(wide.width).toBeGreaterThan(1600)
  })

  test('margins are symmetric once the rail no longer needs reserved space', async ({ page }) => {
    for (const width of [1920, 2560, 3840]) {
      await page.setViewportSize({ width, height: 1000 })
      await page.goto('/')
      const m = await metrics(page)

      // A couple of pixels of rounding is fine; the old layout was ~90px off.
      expect(Math.abs(m.left - m.right), `centred at ${width}px`).toBeLessThanOrEqual(4)
    }
  })

  test('type scales up on very large displays', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1000 })
    await page.goto('/')
    expect((await metrics(page)).rootFontPx).toBe(16)

    await page.setViewportSize({ width: 3840, height: 1200 })
    await page.waitForTimeout(200)
    expect((await metrics(page)).rootFontPx).toBeGreaterThan(16)
  })

  test('the rail stays beside the content, never stranded at the far edge', async ({ page }) => {
    await page.setViewportSize({ width: 3840, height: 1200 })
    await page.goto('/')
    const m = await metrics(page)

    expect(m.railRight).toBeLessThan(m.left)
    expect(m.left - m.railRight).toBeLessThan(200)
  })

  test('card grids take a fourth column when there is room', async ({ page }) => {
    const columns = () =>
      page.evaluate(() => {
        const grid = document.querySelector('#portfolio article')?.parentElement
        return getComputedStyle(grid).gridTemplateColumns.split(' ').length
      })

    await page.setViewportSize({ width: 1536, height: 1000 })
    await page.goto('/')
    expect(await columns()).toBe(3)

    await page.setViewportSize({ width: 2560, height: 1000 })
    await page.goto('/')
    expect(await columns()).toBe(4)
  })

  test('no horizontal overflow at any large width', async ({ page }) => {
    for (const width of [1600, 1920, 2560, 3440, 3840]) {
      await page.setViewportSize({ width, height: 1000 })
      await page.goto('/')
      expect((await metrics(page)).overflow, `overflow at ${width}px`).toBeLessThanOrEqual(1)
    }
  })
})
