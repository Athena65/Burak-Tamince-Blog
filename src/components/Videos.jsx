import { useState } from 'react'

const VideoCard = ({ video }) => {
  const [thumb, setThumb] = useState(`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`)

  return (
    <div className="w-full p-3 md:w-1/2 lg:w-1/3 group">
      <div className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-all duration-500 hover:border-white/20 hover:bg-white/10 hover:shadow-2xl hover:-translate-y-2">
        {/* Card Head: Thumbnail */}
        <div className="relative aspect-video overflow-hidden rounded-t-2xl">
          <img
            src={thumb}
            onError={() => setThumb(`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`)}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            alt={video.title}
          />
          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600 text-white shadow-xl transition-transform duration-300 group-hover:scale-110">
              <i className="bi bi-play-fill text-4xl"></i>
            </div>
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>

          {/* Category Badge */}
          <div className="absolute left-4 top-4">
            <span className="rounded-md bg-black/60 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
              {video.category}
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="flex flex-col p-6">
          <h4 className="mb-3 text-xl font-bold text-white group-hover:text-accent transition-colors duration-300">
            {video.title}
          </h4>
          <p className="mb-4 text-sm text-white/60 line-clamp-2">
            {video.description}
          </p>

          <div className="mt-auto pt-4 border-t border-white/5">
            <a
              href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-sm font-bold text-white transition-all hover:bg-red-600 hover:shadow-lg hover:shadow-red-600/40"
            >
              Watch on YouTube
              <i className="bi bi-youtube text-lg"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

const Videos = () => {
  const [activeCategory, setActiveCategory] = useState('All')

  const videos = [
    {
      title: 'David Blaine Real or Magic',
      category: 'Magic',
      description: 'Magic performance with Turkish subtitles featuring the famous illusionist David Blaine.',
      youtubeId: 'ovMID6_2kig',
    },
    {
      title: 'Forza Horizon 5 FPS Test',
      category: 'Gaming',
      description: 'Performance benchmark of Forza Horizon 5 running on an RTX 4050 graphics card.',
      youtubeId: 'LaxoA4EYlzo',
    },
    {
      title: 'Forza Horizon 4 Ultra Graphics',
      category: 'Gaming',
      description: 'FPS test of Forza Horizon 4 on ultra settings using GTX 1650 on Excalibur G770.',
      youtubeId: 'BAMnMtAlCHk',
    },
    {
      title: 'First Valley Snowboard',
      category: 'Sports',
      description: 'Short clip of my first snowboarding experience in a valley with beautiful scenery.',
      youtubeId: 'WvaUXEnsLOE',
    },
    {
      title: 'Backcountry Snowboard',
      category: 'Sports',
      description: 'Exciting backcountry snowboarding adventure through untouched powder snow.',
      youtubeId: 'h4vr32PzZ0k',
    },
    {
      title: 'Off Pist Snowboarding',
      category: 'Sports',
      description: 'High-quality 1080p footage of off-piste snowboarding through fresh powder.',
      youtubeId: '6u62l-ernA8',
    },
    {
      title: 'Off Pist Snowboarding 2',
      category: 'Sports',
      description: 'Another thrilling off-piste snowboarding adventure captured in 1080p resolution.',
      youtubeId: 'bbhIUDxHluU',
    },
    {
      title: 'Money - Levent Kırca',
      category: 'Comedy',
      description: 'A humorous clip from the famous Turkish comedy show "Olacak O Kadar" by Levent Kırca.',
      youtubeId: '4ywlF7E0Ybc',
    },
  ]

  const categories = ['All', ...new Set(videos.map(v => v.category))]

  const filteredVideos = activeCategory === 'All'
    ? videos
    : videos.filter(v => v.category.toLowerCase() === activeCategory.toLowerCase())

  return (
    <section id="videos" className="videos section relative overflow-hidden rounded-xl border border-white/10 bg-black/50 py-24 shadow-2xl backdrop-blur-md">
      {/* Background Glows */}
      <div className="absolute -right-24 top-0 h-96 w-96 rounded-full bg-accent/10 blur-[120px]"></div>
      <div className="absolute -left-24 bottom-0 h-96 w-96 rounded-full bg-red-600/5 blur-[120px]"></div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="section-title mb-16 text-center" data-aos="fade-up">
          <h2 className="relative mb-6 inline-block pb-4 text-4xl font-extrabold tracking-tight text-white uppercase">
            My Videos
            <span className="absolute bottom-0 left-1/2 h-[4px] w-[80px] -translate-x-1/2 rounded-full bg-gradient-to-r from-accent to-red-600"></span>
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-white/70 leading-relaxed">
            A collection of my personal videos including gaming benchmarks, snowboarding adventures, and entertainment content.
          </p>
        </div>

        {/* Categories */}
        <div className="mb-12 flex flex-wrap justify-center gap-4" data-aos="fade-up" data-aos-delay="100">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-6 py-2 text-sm font-semibold transition-all duration-300 ${activeCategory === cat
                ? 'bg-red-600 text-white shadow-lg shadow-red-600/20'
                : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap" data-aos="fade-up" data-aos-delay="200">
          {filteredVideos.length > 0 ? (
            filteredVideos.map((video) => (
              <VideoCard key={`${activeCategory}-${video.youtubeId}`} video={video} />
            ))
          ) : (
            <div className="w-full text-center py-12">
              <p className="text-white/60 text-lg">No videos found in this category.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Videos

