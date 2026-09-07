import { test, expect } from '@playwright/test'

const ALL_TITLES = [
  'Rates from Everywhere',
  'Dinner Project with Flutter',
  'BinaryToDecimalWithArduino',
  'E-Commerce Laravel',
  'ThinkSpeak Data Fetch',
  'Find Similar Products',
  'VirtualCash',
]

const cards = (page) => page.locator('#portfolio article')

/** Card titles currently in the grid, in DOM order. */
const cardTitles = (page) =>
  page.evaluate(() =>
    Array.from(document.querySelectorAll('#portfolio article h3')).map((h) => h.textContent.trim()),
  )

test.describe('projects', () => {
  test('all 7 projects render', async ({ page }) => {
    await page.goto('/')

    await expect(cards(page)).toHaveCount(7)
    expect((await cardTitles(page)).sort()).toEqual([...ALL_TITLES].sort())
  })

  test('the Mobile filter narrows the list', async ({ page }) => {
    await page.goto('/')
    await expect(cards(page)).toHaveCount(7)

    await page.locator('#portfolio').getByRole('button', { name: /^(Mobile|Mobil)$/ }).click()

    await expect(cards(page)).toHaveCount(1)
    expect(await cardTitles(page)).toEqual(['Dinner Project with Flutter'])

    await page.locator('#portfolio').getByRole('button', { name: /^(All|Tümü)$/ }).click()
    await expect(cards(page)).toHaveCount(7)
  })

  test('key features are visible without any toggle', async ({ page }) => {
    await page.goto('/')

    const card = cards(page).filter({ has: page.getByRole('heading', { name: 'E-Commerce Laravel' }) })
    await card.scrollIntoViewIfNeeded()

    await expect(card.getByText('Key features')).toBeVisible()
    await expect(card.getByText('Shopping cart')).toBeVisible()
    await expect(card.getByText('Product and order management')).toBeVisible()
    await expect(card.getByText('User authentication')).toBeVisible()

    // The reflow bug came from a per-card show/hide control changing card
    // heights. No such control may exist.
    await expect(
      card.getByRole('button', { name: /features|show (more|less)|read more|daha fazla|göster/i }),
    ).toHaveCount(0)
  })

  test('the card count is stable across a full filter cycle', async ({ page }) => {
    await page.goto('/')
    await expect(cards(page)).toHaveCount(7)

    const cycle = [
      { name: /^(Web)$/, expected: 2 },
      { name: /^(Arduino)$/, expected: 2 },
      { name: /^(AI|Yapay zekâ)$/, expected: 1 },
      { name: /^(Software|Yazılım)$/, expected: 1 },
      { name: /^(Mobile|Mobil)$/, expected: 1 },
    ]

    for (const step of cycle) {
      await page.locator('#portfolio').getByRole('button', { name: step.name }).click()
      await expect(cards(page)).toHaveCount(step.expected)

      // Back to All must restore exactly the seven, with nothing lost, dropped
      // or duplicated by the re-render.
      await page.locator('#portfolio').getByRole('button', { name: /^(All|Tümü)$/ }).click()
      await expect(cards(page)).toHaveCount(7)
      const titles = await cardTitles(page)
      expect(new Set(titles).size, 'no duplicate cards after re-render').toBe(7)
      expect(titles.sort()).toEqual([...ALL_TITLES].sort())
    }
  })
})
