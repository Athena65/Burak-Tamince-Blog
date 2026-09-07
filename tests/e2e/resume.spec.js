import { test, expect } from '@playwright/test'

test.describe('resume', () => {
  test('Download CV points at the PDF and carries the download attribute', async ({ page }) => {
    await page.goto('/')

    const cv = page.locator('#resume').getByRole('link', { name: /Download CV/ })
    await expect(cv).toHaveAttribute('href', '/assets/resume/BT_1611_CV.pdf')
    await expect(cv).toHaveAttribute('download', 'Burak_Tamince_CV.pdf')

    const openInTab = page.locator('#resume').getByRole('link', { name: /Open in new tab/ })
    await expect(openInTab).toHaveAttribute('href', '/assets/resume/BT_1611_CV.pdf')
    await expect(openInTab).toHaveAttribute('target', '_blank')

    // The file the link points at must actually be served.
    const res = await page.request.get('/assets/resume/BT_1611_CV.pdf')
    expect(res.status()).toBe(200)
  })

  test('hovering Download CV reveals the preview, unclipped', async ({ page }) => {
    await page.goto('/')

    const cv = page.locator('#resume').getByRole('link', { name: /Download CV/ })
    await cv.scrollIntoViewIfNeeded()

    const previewImg = page.locator('#resume img[src*="cv_preview"]')
    const previewPanel = previewImg.locator('xpath=ancestor::div[@aria-hidden="true"][1]')

    await expect(previewPanel).toHaveCSS('opacity', '0')

    await cv.hover()

    await expect(previewPanel).toHaveCSS('opacity', '1')

    // The regression: the preview used to be clipped by an overflow-hidden
    // ancestor down to a sliver. w-56 = 224px, so anything under 200 is the bug.
    const box = await previewImg.boundingBox()
    expect(box, 'the preview image should have a layout box').not.toBeNull()
    expect(box.width, `preview width was ${box?.width}px — it is being clipped`).toBeGreaterThanOrEqual(200)
    expect(box.height).toBeGreaterThanOrEqual(200)
  })
})
