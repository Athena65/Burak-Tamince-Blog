/**
 * Thin wrapper over the GA4 tag already loaded in index.html.
 *
 * Every call is also pushed to window.__btEvents so the page can be tested
 * without opening GA4: append ?debug=analytics to see a live panel, or read
 * window.__btEvents in the console.
 */
export const isAnalyticsDebug = () => {
  if (typeof window === 'undefined') return false
  try {
    return new URLSearchParams(window.location.search).get('debug') === 'analytics'
  } catch {
    return false
  }
}

export const trackEvent = (name, params = {}) => {
  if (typeof window === 'undefined' || !name) return

  const payload = { ...params }

  window.__btEvents = window.__btEvents || []
  window.__btEvents.push({ name, params: payload, at: new Date().toISOString() })
  window.dispatchEvent(new CustomEvent('bt-analytics', { detail: { name, params: payload } }))

  if (import.meta.env?.DEV || isAnalyticsDebug()) {
    console.debug('[analytics]', name, payload)
  }

  if (typeof window.gtag === 'function') {
    window.gtag('event', name, payload)
  }
}

/** Outbound link click. `kind` groups them: github, linkedin, youtube, instagram, company. */
export const trackOutbound = (kind, url, extra = {}) =>
  trackEvent('outbound_click', { link_kind: kind, link_url: url, ...extra })

/** CV download. `where` says which section fired it: hero or resume. */
export const trackCvDownload = (where) => trackEvent('cv_download', { location: where })
