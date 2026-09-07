import { useState } from 'react'
import SectionHeader from './SectionHeader'
import { useLanguage } from '../i18n/LanguageContext'
import { trackEvent, trackOutbound } from '../utils/analytics'

/** Category values stay English: they are the filter state and the data key.
 *  Only the label a visitor reads goes through t(). */
const categoryLabels = {
  All: { en: 'All', tr: 'Tümü' },
  Sports: { en: 'Sports', tr: 'Spor' },
}

const categoryLabel = (category) => categoryLabels[category] || category

const VideoCard = ({ video }) => {
  const { t } = useLanguage()
  const [thumb, setThumb] = useState(`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`)
  const watchUrl = `https://www.youtube.com/watch?v=${video.youtubeId}`

  return (
    <div className="flex h-full flex-col rounded-md border border-rule bg-ink-2/70 transition-colors hover:border-rule-strong">
      {/* Card head: thumbnail */}
      <div className="relative aspect-video overflow-hidden rounded-t-md">
        <img
          src={thumb}
          onError={() => setThumb(`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`)}
          className="h-full w-full object-cover"
          alt={t(video.title)}
        />
        {/* Play plate: always visible, carries the category */}
        <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-sm border border-rule bg-ink/85 px-2 py-1 text-sm text-paper">
          <i className="bi bi-play-fill"></i>
          {t(categoryLabel(video.category))}
        </span>
      </div>

      {/* Card body */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display stretch-normal text-lg font-semibold tracking-tight text-paper md:text-xl">
          {t(video.title)}
        </h3>
        <p className="mb-4 mt-2 text-sm leading-relaxed text-paper-dim">
          {t(video.description)}
        </p>

        <div className="mt-auto border-t border-rule pt-4">
          <a
            href={watchUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackOutbound('youtube', watchUrl, { video: video.title.en })}
            className="inline-flex w-full items-center justify-center gap-2 rounded-sm border border-rule-strong px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:border-accent hover:text-accent"
          >
            <i className="bi bi-youtube"></i>
            {t({ en: 'Watch on YouTube', tr: "YouTube'da izle" })}
          </a>
        </div>
      </div>
    </div>
  )
}

const Videos = () => {
  const { t } = useLanguage()
  const [activeCategory, setActiveCategory] = useState('All')

  const videos = [
    {
      title: { en: 'First Valley Snowboard', tr: 'Vadide ilk snowboard' },
      category: 'Sports',
      description: {
        en: 'Short clip of my first snowboarding experience in a valley with beautiful scenery.',
        tr: 'Manzarası güzel bir vadide ilk snowboard deneyimimden kısa bir klip.',
      },
      youtubeId: 'WvaUXEnsLOE',
    },
    {
      title: { en: 'Backcountry Snowboard', tr: 'Backcountry snowboard' },
      category: 'Sports',
      description: {
        en: 'Exciting backcountry snowboarding adventure through untouched powder snow.',
        tr: 'El değmemiş toz karda heyecanlı bir backcountry snowboard macerası.',
      },
      youtubeId: 'h4vr32PzZ0k',
    },
    {
      title: { en: 'Off Pist Snowboarding', tr: 'Pist dışı snowboard' },
      category: 'Sports',
      description: {
        en: 'High-quality 1080p footage of off-piste snowboarding through fresh powder.',
        tr: 'Taze toz karda pist dışı snowboard; 1080p yüksek kaliteli görüntü.',
      },
      youtubeId: '6u62l-ernA8',
    },
    {
      title: { en: 'Off Pist Snowboarding 2', tr: 'Pist dışı snowboard 2' },
      category: 'Sports',
      description: {
        en: 'Another thrilling off-piste snowboarding adventure captured in 1080p resolution.',
        tr: '1080p çözünürlükte kaydedilmiş bir başka nefes kesici pist dışı snowboard macerası.',
      },
      youtubeId: 'bbhIUDxHluU',
    },
  ]

  const categories = ['All', ...new Set(videos.map(v => v.category))]

  const filteredVideos = activeCategory === 'All'
    ? videos
    : videos.filter(v => v.category.toLowerCase() === activeCategory.toLowerCase())

  const filterTabs = (
    <div className="flex flex-wrap gap-6" data-aos="fade-up" data-aos-delay="100">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => {
            setActiveCategory(cat)
            trackEvent('filter_used', { section: 'videos', value: cat })
          }}
          aria-pressed={activeCategory === cat}
          className={`border-b-2 pb-2 text-sm font-medium transition-colors ${activeCategory === cat
            ? 'border-brass text-paper'
            : 'border-transparent text-paper-mute hover:text-paper'
            }`}
        >
          {t(categoryLabel(cat))}
        </button>
      ))}
    </div>
  )

  return (
    <section id="videos" className="videos section relative border-t border-rule py-20 md:py-28">
      <div className="container">
        <SectionHeader
          title={t({ en: 'Videos', tr: 'Videolar' })}
          deck={t({
            en: 'Snowboarding clips, from a first run in the valley to off-piste powder.',
            tr: 'Snowboard klipleri: vadideki ilk inişten pist dışı toz kara.',
          })}
          aside={filterTabs}
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" data-aos="fade-up" data-aos-delay="200">
          {filteredVideos.length > 0 ? (
            filteredVideos.map((video) => (
              <VideoCard key={`${activeCategory}-${video.youtubeId}`} video={video} />
            ))
          ) : (
            <div className="col-span-full py-12">
              <p className="text-paper-dim">
                {t({ en: 'No videos in this category yet.', tr: 'Bu kategoride henüz video yok.' })}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Videos
