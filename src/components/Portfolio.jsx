import { useEffect, useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import SectionHeader from './SectionHeader'
import { useLanguage } from '../i18n/LanguageContext'
import { trackEvent, trackOutbound } from '../utils/analytics'

const portfolioItems = [
  {
    title: { en: 'Rates from Everywhere', tr: 'Her yerden ürün puanları' },
    category: 'web',
    description: {
      en: 'A platform that aggregates product ratings from multiple websites and identifies categories.',
      tr: 'Birden çok siteden ürün puanlarını toplayan ve ürünleri kategorilere ayıran bir platform.'
    },
    image: '/assets/img/portfolio/ratesfromeverywhere.png',
    githubUrl: 'https://github.com/Athena65/ratesfromeverywhere2',
    tech: ['React', 'Node.js', 'Python'],
    features: [
      { en: 'Multi-site scraper', tr: 'Çok siteli veri toplama' },
      { en: 'Sentiment analysis', tr: 'Duygu analizi' },
      { en: 'Category classification', tr: 'Kategori sınıflandırma' }
    ]
  },
  {
    title: { en: 'Dinner Project with Flutter', tr: 'Flutter ile yemek uygulaması' },
    category: 'mobile',
    description: {
      en: 'A Flutter-based mobile app for providing recipes and restaurant suggestions.',
      tr: 'Yemek tarifleri ve restoran önerileri sunan Flutter tabanlı bir mobil uygulama.'
    },
    image: '/assets/img/portfolio/dinnerproject.png',
    githubUrl: 'https://github.com/Athena65/Dinner_Project_Flutter',
    tech: ['Flutter', 'Firebase', 'Dart'],
    features: [
      { en: 'Real-time search', tr: 'Anlık arama' },
      { en: 'Offline access', tr: 'Çevrimdışı erişim' },
      { en: 'Personalized suggestions', tr: 'Kişiselleştirilmiş öneriler' }
    ]
  },
  {
    // Repository name, kept as-is in both languages.
    title: 'BinaryToDecimalWithArduino',
    category: 'arduino',
    description: {
      en: 'This Arduino-based project converts 4-bit binary inputs into decimal/hexadecimal and displays results on an LCD monitor.',
      tr: '4 bitlik ikili girişleri onluk ve on altılık tabana çeviren, sonucu LCD ekranda gösteren Arduino projesi.'
    },
    image: '/assets/img/portfolio/binarytodecimal.png',
    githubUrl: 'https://github.com/Athena65/BinaryToDecimalWithArduino',
    tech: ['Arduino', 'C++', 'I2C'],
    features: [
      { en: 'Binary input via buttons', tr: 'Butonlarla ikili giriş' },
      { en: 'Real-time conversion', tr: 'Anlık dönüşüm' },
      { en: 'LCD status display', tr: 'LCD durum ekranı' }
    ],
    hardware: [
      'Arduino Uno',
      { en: '4 push buttons', tr: '4 buton' },
      { en: '16x2 LCD display', tr: '16x2 LCD ekran' },
      { en: '10k resistors', tr: '10k direnç' }
    ]
  },
  {
    title: { en: 'E-Commerce Laravel', tr: 'Laravel e-ticaret' },
    category: 'web',
    description: {
      en: 'Feature-rich e-commerce platform with a comprehensive admin panel for efficient management.',
      tr: 'Kapsamlı bir yönetim paneli sunan, geniş özellikli bir e-ticaret platformu.'
    },
    image: '/assets/img/portfolio/ecommercelaravel.png',
    githubUrl: 'https://github.com/Athena65/E-Commerce-Laravel',
    tech: ['Laravel', 'PHP', 'MySQL'],
    features: [
      { en: 'User authentication', tr: 'Kullanıcı girişi' },
      { en: 'Product and order management', tr: 'Ürün ve sipariş yönetimi' },
      { en: 'Shopping cart', tr: 'Alışveriş sepeti' },
      { en: 'Responsive design', tr: 'Duyarlı tasarım' }
    ]
  },
  {
    title: { en: 'ThinkSpeak Data Fetch', tr: 'ThinkSpeak veri çekme' },
    category: 'arduino',
    description: {
      en: 'IoT project fetching weather and sensor data from ThinkSpeak API to an LCD interface.',
      tr: 'ThinkSpeak API üzerinden hava durumu ve sensör verilerini çekip LCD ekranda gösteren IoT projesi.'
    },
    image: '/assets/img/portfolio/thinkspeakdatafetch.jpg',
    githubUrl: 'https://github.com/Athena65/ThinkSpeakDataFetch',
    tech: ['ESP8266', 'IoT', 'JSON'],
    features: [
      { en: 'API integration', tr: 'API entegrasyonu' },
      { en: 'Deep sleep mode', tr: 'Derin uyku modu' },
      { en: 'Auto-updating values', tr: 'Otomatik değer güncelleme' }
    ]
  },
  {
    title: { en: 'Find Similar Products', tr: 'Benzer ürün bulma' },
    category: 'ai',
    description: {
      en: 'AI-powered project using YOLOv8 to identify products and extract ratings from various platforms.',
      tr: 'Ürünleri YOLOv8 ile tanıyan ve farklı platformlardaki puanları çıkaran yapay zekâ projesi.'
    },
    image: '/assets/img/portfolio/findsimilar,ratingextraction.png',
    githubUrl: 'https://github.com/Athena65/python_find_similar_products',
    tech: ['Python', 'YOLOv8', 'PyTorch'],
    features: [
      { en: 'Image recognition', tr: 'Görüntü tanıma' },
      { en: 'OCR text extraction', tr: 'OCR ile metin çıkarma' },
      { en: 'Cross-platform matching', tr: 'Platformlar arası eşleştirme' }
    ]
  },
  {
    // Project name, kept as-is in both languages.
    title: 'VirtualCash',
    category: 'software',
    description: {
      en: 'Simulated virtual banking system allowing users to manage accounts and monitor financial activities securely.',
      tr: 'Hesapları yönetmeyi ve finansal hareketleri güvenle takip etmeyi sağlayan sanal bankacılık simülasyonu.'
    },
    image: '/assets/img/portfolio/virtualcashjava.png',
    githubUrl: 'https://github.com/Athena65/VirtualCash',
    tech: ['Java', 'Eclipse', 'Swing'],
    features: [
      { en: 'Secure deposit and withdrawal', tr: 'Güvenli para yatırma ve çekme' },
      { en: 'Fund transfers', tr: 'Para transferi' },
      { en: 'Transaction history', tr: 'İşlem geçmişi' }
    ]
  },
]

/** English title — used for analytics payloads so both languages report the same value. */
const englishTitle = (item) => (typeof item.title === 'string' ? item.title : item.title.en)

/** Last path segment of a GitHub URL, lowercased — the key the live repo stats are stored under. */
const repoKeyFromUrl = (url) => {
  if (typeof url !== 'string') return ''
  const segments = url.split('/').filter(Boolean)
  return segments.length ? segments[segments.length - 1].toLowerCase() : ''
}

/** "Sep 2025" / "Eyl 2025". Returns null for a missing or unparsable timestamp. */
const formatPushedMonth = (pushedAt, lang) => {
  if (!pushedAt) return null
  try {
    const date = new Date(pushedAt)
    if (Number.isNaN(date.getTime())) return null
    return new Intl.DateTimeFormat(lang === 'tr' ? 'tr-TR' : 'en-GB', {
      year: 'numeric',
      month: 'short'
    }).format(date)
  } catch {
    return null
  }
}

const PortfolioCard = ({ item, index, stats, onOpenLightbox }) => {
  const { t, lang } = useLanguage()
  const title = t(item.title)
  const pushedMonth = stats ? formatPushedMonth(stats.pushedAt, lang) : null

  return (
    <article className="group relative flex h-full flex-col rounded-md border border-rule bg-ink-2/70 transition-colors hover:border-rule-strong">
      {/* Card head: image — click to open the preview */}
      <button
        type="button"
        onClick={() => onOpenLightbox(index, englishTitle(item))}
        aria-label={t({ en: `Preview ${title}`, tr: `${title} önizlemesi` })}
        className="relative block aspect-video w-full overflow-hidden rounded-t-md"
      >
        <img
          src={item.image}
          className="h-full w-full object-cover"
          alt={title}
        />
        {/* Hover veil with a zoom cue */}
        <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-ink/70 opacity-0 group-hover:opacity-100">
          <span className="inline-flex items-center gap-2 rounded-sm border border-rule-strong bg-ink-2 px-3 py-1.5 text-sm font-medium text-paper">
            <i className="bi bi-zoom-in" aria-hidden="true"></i>
            {t({ en: 'Preview', tr: 'Önizleme' })}
          </span>
        </span>
      </button>

      {/* Card body */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display stretch-normal text-lg font-semibold tracking-tight text-paper md:text-xl">
          {title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-paper-dim">
          {t(item.description)}
        </p>

        {/* Tech tags */}
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {item.tech.map((tag, i) => (
            <li key={i} className="rounded-sm border border-rule bg-ink-3/60 px-2.5 py-1 text-[13px] text-paper-dim">
              {tag}
            </li>
          ))}
        </ul>

        {/* Key features — always visible, never behind a toggle */}
        <div className="mt-4">
          <p className="text-sm text-paper-mute">{t({ en: 'Key features', tr: 'Öne çıkanlar' })}</p>
          <ul className="mt-2 space-y-1.5">
            {item.features.map((f, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-paper-dim">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true"></span>
                {t(f)}
              </li>
            ))}
          </ul>
        </div>

        {/* Parts list — only the hardware projects carry one */}
        {item.hardware && (
          <div className="mt-4">
            <p className="text-sm text-paper-mute">{t({ en: 'Hardware', tr: 'Donanım' })}</p>
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {item.hardware.map((part, i) => (
                <li key={i} className="rounded-sm border border-rule bg-ink-3/60 px-2.5 py-1 text-[13px] text-paper-dim">
                  {t(part)}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-auto border-t border-rule pt-4">
          {/* Live GitHub figures — rendered only when the public API answered.
              No data (rate limit, offline, repo renamed) simply shows nothing. */}
          {stats && (
            <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-paper-mute">
              <span className="inline-flex items-center gap-1.5">
                <i className="bi bi-star-fill" aria-hidden="true"></i>
                <span className="tabular-nums text-brass">{stats.stars}</span>
                <span className="sr-only">{t({ en: 'GitHub stars', tr: 'GitHub yıldızı' })}</span>
              </span>
              {pushedMonth && (
                <span className="inline-flex items-center gap-1.5">
                  {t({ en: 'Updated', tr: 'Güncellendi' })}
                  <span className="tabular-nums text-brass">{pushedMonth}</span>
                </span>
              )}
            </div>
          )}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => onOpenLightbox(index, englishTitle(item))}
              className="inline-flex items-center gap-2 text-sm text-paper-dim transition-colors hover:text-paper"
            >
              <i className="bi bi-zoom-in" aria-hidden="true"></i>
              {t({ en: 'Preview', tr: 'Önizleme' })}
            </button>
            <a
              href={item.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackOutbound('github', item.githubUrl, { project: englishTitle(item) })}
              aria-label={t({
                en: `Open ${title} on GitHub`,
                tr: `${title} projesini GitHub'da aç`
              })}
              className="inline-flex items-center gap-2 rounded-sm border border-rule-strong px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:border-accent hover:text-accent"
            >
              <i className="bi bi-github" aria-hidden="true"></i>
              {t({ en: 'Open on GitHub', tr: "GitHub'da aç" })}
            </a>
          </div>
        </div>
      </div>
    </article>
  )
}

const Portfolio = () => {
  const { t } = useLanguage()
  const [filterKey, setFilterKey] = useState('*')
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [repoStats, setRepoStats] = useState({})

  // Live repo figures from the public GitHub REST API, unauthenticated — the
  // site is static and no token may ever reach the browser bundle.
  //
  // Unauthenticated calls are capped at 60 requests/hour/IP, so getting nothing
  // back is entirely expected: a rate-limited, offline or blocked visitor just
  // sees the cards without the extra line. Every failure stays silent — no
  // error message, no console noise, no layout shift.
  //
  // The endpoint returns public repositories only, and only the star count and
  // push timestamp are kept: no private or organisation repository name, and
  // nothing but public aggregate numbers, ever reaches the page.
  useEffect(() => {
    const controller = new AbortController()

    const loadRepoStats = async () => {
      try {
        const response = await fetch(
          'https://api.github.com/users/Athena65/repos?per_page=100&sort=pushed',
          { signal: controller.signal }
        )
        if (!response.ok) return

        const repos = await response.json()
        if (!Array.isArray(repos) || controller.signal.aborted) return

        const next = {}
        for (const repo of repos) {
          if (!repo || typeof repo.name !== 'string' || repo.private) continue
          next[repo.name.toLowerCase()] = {
            stars: repo.stargazers_count ?? 0,
            pushedAt: repo.pushed_at
          }
        }
        setRepoStats(next)
      } catch {
        // AbortError on unmount, a network failure or the hourly rate limit —
        // all expected, all silent.
      }
    }

    loadRepoStats()

    return () => controller.abort()
  }, [])

  const lightboxSlides = portfolioItems.map((item) => ({
    src: item.image,
    title: t(item.title),
    description: t(item.description)
  }))

  const handleOpenLightbox = (index, title) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
    trackEvent('lightbox_open', { section: 'projects', item: title })
  }

  const handleFilter = (key) => {
    setFilterKey(key)
    trackEvent('filter_used', { section: 'projects', value: key === '*' ? 'all' : key })
  }

  // Plain React filtering. `filter` hands back the very same objects held in
  // portfolioItems, so indexOf below recovers each card's full-array position.
  const visible = filterKey === '*' ? portfolioItems : portfolioItems.filter((i) => i.category === filterKey)

  const categories = [
    { label: { en: 'All', tr: 'Tümü' }, key: '*' },
    { label: { en: 'Web', tr: 'Web' }, key: 'web' },
    { label: { en: 'Mobile', tr: 'Mobil' }, key: 'mobile' },
    { label: { en: 'Arduino', tr: 'Arduino' }, key: 'arduino' },
    { label: { en: 'AI', tr: 'Yapay zekâ' }, key: 'ai' },
    { label: { en: 'Software', tr: 'Yazılım' }, key: 'software' },
  ]

  const filterTabs = (
    <div className="flex flex-wrap gap-6" data-aos="fade-up" data-aos-delay="100">
      {categories.map((cat) => (
        <button
          key={cat.key}
          type="button"
          onClick={() => handleFilter(cat.key)}
          aria-pressed={filterKey === cat.key}
          className={`border-b-2 pb-2 text-sm font-medium transition-colors ${filterKey === cat.key
            ? 'border-brass text-paper'
            : 'border-transparent text-paper-mute hover:text-paper'
            }`}
        >
          {t(cat.label)}
        </button>
      ))}
    </div>
  )

  return (
    <section id="portfolio" className="portfolio section relative border-t border-rule py-20 md:py-28">
      <div className="container">
        <SectionHeader
          title={t({ en: 'Projects', tr: 'Projeler' })}
          deck={t({
            en: `${portfolioItems.length} repositories on GitHub, from an Arduino binary converter to a Laravel storefront and a YOLOv8 product matcher.`,
            tr: `GitHub'da ${portfolioItems.length} depo: Arduino ile ikili sayı çeviricisinden Laravel mağazasına ve YOLOv8 ürün eşleştiricisine uzanıyor.`
          })}
          aside={filterTabs}
        />

        {/* Plain CSS grid: the grid sizes every card, so rows always line up. */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" data-aos="fade-up" data-aos-delay="200">
          {visible.map((item) => (
            <PortfolioCard
              key={item.githubUrl}
              item={item}
              /* Position in the FULL array, so the lightbox opens the right
                 slide whatever the active filter is. */
              index={portfolioItems.indexOf(item)}
              stats={repoStats[repoKeyFromUrl(item.githubUrl)]}
              onOpenLightbox={handleOpenLightbox}
            />
          ))}
        </div>
      </div>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={lightboxSlides}
        styles={{
          container: { backgroundColor: 'rgba(0, 0, 0, 0.95)' },
          root: { zIndex: 10003 }
        }}
      />
    </section>
  )
}

export default Portfolio
