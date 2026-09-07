/**
 * Shared chapter head for every section.
 *
 * Layout: the section name set wide in Archivo on the left, the deck paragraph
 * on the right. Left-aligned and asymmetric on purpose — no centered title,
 * no underline bar, no eyebrow label.
 *
 *   ┌────────────────────────┬───────────────────────────────────────┐
 *   │ Experience             │ Deck paragraph, ≤ 62ch, paper-dim.    │
 *   │ (Archivo, wide, big)   │ [aside slot — e.g. a data figure]     │
 *   └────────────────────────┴───────────────────────────────────────┘
 *
 * Props
 *  - title   : string   — the chapter word (matches the nav label)
 *  - deck    : string   — one or two plain sentences, optional
 *  - aside   : node     — optional extra content under the deck (figures, filters)
 *  - id      : string   — optional id for the <h2> (aria-labelledby)
 *  - className: string  — optional extra classes on the wrapper
 */
const SectionHeader = ({ title, deck, aside, id, className = '' }) => {
  return (
    <header
      className={`section-head mb-12 grid gap-5 md:mb-16 md:grid-cols-12 md:gap-8 ${className}`}
      data-aos="fade-up"
    >
      <div className="md:col-span-5 lg:col-span-4">
        <h2
          id={id}
          className="font-display stretch-wide text-[clamp(2.5rem,6vw,4.25rem)] font-bold leading-[0.95] tracking-[-0.02em] text-paper"
        >
          {title}
        </h2>
      </div>
      <div className="md:col-span-7 lg:col-span-8 md:pt-2">
        {deck && (
          <p className="max-w-measure text-[1.0625rem] leading-relaxed text-paper-dim">
            {deck}
          </p>
        )}
        {aside && <div className={deck ? 'mt-6' : ''}>{aside}</div>}
      </div>
    </header>
  )
}

export default SectionHeader
