import { useEffect, useState } from 'react'
import { isAnalyticsDebug } from '../utils/analytics'

/**
 * Only rendered when the page is opened with ?debug=analytics.
 * Lists events as they fire so tracking can be checked without GA4 DebugView.
 */
const AnalyticsDebugPanel = () => {
  const [enabled] = useState(() => isAnalyticsDebug())
  const [events, setEvents] = useState([])

  useEffect(() => {
    if (!enabled) return
    setEvents(window.__btEvents ? [...window.__btEvents] : [])
    const onEvent = (e) => setEvents((prev) => [...prev, { ...e.detail, at: new Date().toISOString() }])
    window.addEventListener('bt-analytics', onEvent)
    return () => window.removeEventListener('bt-analytics', onEvent)
  }, [enabled])

  if (!enabled) return null

  const gtagReady = typeof window !== 'undefined' && typeof window.gtag === 'function'

  return (
    <aside className="fixed bottom-4 left-4 z-[10005] max-h-[60vh] w-[min(24rem,calc(100vw-2rem))] overflow-auto rounded-md border border-rule bg-ink-2 p-4 text-sm">
      <div className="flex items-baseline justify-between gap-3 border-b border-rule pb-2">
        <span className="font-semibold text-paper">Analytics events</span>
        <span className={gtagReady ? 'text-accent' : 'text-brass'}>
          {gtagReady ? 'gtag ready' : 'gtag missing'}
        </span>
      </div>

      {events.length === 0 ? (
        <p className="pt-3 text-paper-dim">
          Nothing fired yet. Click a CV download, a project link or a social icon.
        </p>
      ) : (
        <ol className="pt-2">
          {events.map((e, i) => (
            <li key={`${e.at}-${i}`} className="border-b border-rule py-2 last:border-b-0">
              <span className="font-medium text-accent">{e.name}</span>
              <span className="ml-2 tabular-nums text-paper-mute">{e.at.slice(11, 19)}</span>
              <pre className="mt-1 whitespace-pre-wrap break-all text-paper-dim">
                {JSON.stringify(e.params)}
              </pre>
            </li>
          ))}
        </ol>
      )}
    </aside>
  )
}

export default AnalyticsDebugPanel
