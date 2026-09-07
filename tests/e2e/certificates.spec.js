import { test, expect } from '@playwright/test'

test.describe('certificates', () => {
  test('renders 10 certificate cards', async ({ page }) => {
    await page.goto('/')

    await expect(page.locator('section#certificates article')).toHaveCount(10)
    await expect(
      page.locator('section#certificates').getByRole('heading', { name: 'Introduction to Cybersecurity' }),
    ).toBeVisible()
    // Verifiable ones link out; the rest open as images.
    await expect(
      page.locator('section#certificates').getByRole('link', { name: /Verify certificate/ }),
    ).toHaveCount(5)
    await expect(
      page.locator('section#certificates').getByRole('button', { name: /View certificate/ }),
    ).toHaveCount(5)
  })

  test('clicking a certificate image opens the lightbox and Escape closes it', async ({ page }) => {
    await page.goto('/')

    const trigger = page
      .locator('section#certificates')
      .getByRole('button', { name: /View Introduction to Cybersecurity full size/ })
    await trigger.scrollIntoViewIfNeeded()

    await expect(page.locator('.yarl__portal')).toHaveCount(0)

    await trigger.click()

    const lightbox = page.locator('.yarl__portal')
    await expect(lightbox).toBeVisible()
    await expect(lightbox).toHaveClass(/yarl__portal_open/)
    await expect(page.locator('.yarl__container')).toBeVisible()

    await page.keyboard.press('Escape')

    // The portal unmounts after the close transition rather than staying hidden.
    await expect(page.locator('.yarl__portal')).toHaveCount(0)
  })
})
