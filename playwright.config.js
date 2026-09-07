import { defineConfig } from '@playwright/test'

/**
 * End-to-end suite for the static site. `vite preview` serves `dist/`, so the
 * build must be current before a run — `npx vite build` first if you changed src.
 *
 * NOTE on `--host 127.0.0.1`: without it, vite preview binds to `::1` only on
 * this machine (Node resolves `localhost` to IPv6 first), and the IPv4 baseURL
 * below never answers. The flag pins it to the address the tests actually use.
 */
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: [['list']],

  use: {
    baseURL: 'http://127.0.0.1:4173',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'desktop',
      use: {
        browserName: 'chromium',
        viewport: { width: 1280, height: 800 },
      },
    },
    {
      name: 'mobile',
      use: {
        browserName: 'chromium',
        // Viewport only — deliberately NOT devices['iPhone …']: isMobile/hasTouch
        // changes hover semantics and the resume preview test needs a real hover.
        viewport: { width: 390, height: 844 },
      },
    },
  ],

  webServer: {
    command: 'npx vite preview --port 4173 --strictPort --host 127.0.0.1',
    url: 'http://127.0.0.1:4173',
    reuseExistingServer: true,
    timeout: 120000,
  },
})
