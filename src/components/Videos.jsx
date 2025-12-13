const Videos = () => {
  const videos = [
    {
      title: 'David Blaine Real or Magic',
      description: 'Magic performance with Turkish subtitles featuring the famous illusionist David Blaine.',
      youtubeId: 'ovMID6_2kig',
    },
    {
      title: 'Forza Horizon 5 FPS Test',
      description: 'Performance benchmark of Forza Horizon 5 running on an RTX 4050 graphics card.',
      youtubeId: 'LaxoA4EYlzo',
    },
    {
      title: 'Forza Horizon 4 Ultra Graphics',
      description: 'FPS test of Forza Horizon 4 on ultra settings using GTX 1650 on Excalibur G770.',
      youtubeId: 'BAMnMtAlCHk',
    },
    {
      title: 'First Valley Snowboard',
      description: 'Short clip of my first snowboarding experience in a valley with beautiful scenery.',
      youtubeId: 'WvaUXEnsLOE',
    },
    {
      title: 'Backcountry Snowboard',
      description: 'Exciting backcountry snowboarding adventure through untouched powder snow.',
      youtubeId: 'h4vr32PzZ0k',
    },
    {
      title: 'Off Pist Snowboarding',
      description: 'High-quality 1080p footage of off-piste snowboarding through fresh powder.',
      youtubeId: '6u62l-ernA8',
    },
    {
      title: 'Off Pist Snowboarding 2',
      description: 'Another thrilling off-piste snowboarding adventure captured in 1080p resolution.',
      youtubeId: 'bbhIUDxHluU',
    },
    {
      title: 'Money - Levent Kırca',
      description: 'A humorous clip from the famous Turkish comedy show "Olacak O Kadar" by Levent Kırca.',
      youtubeId: '4ywlF7E0Ybc',
    },
  ]

  return (
    <section id="videos" className="videos section relative overflow-hidden rounded-lg border border-white/18 bg-black/85 py-16 shadow-[0_8px_32px_rgba(0,0,0,0.1)] backdrop-blur-[5px]">
      <div className="container">
        <div className="section-title mb-16 text-center" data-aos="fade-up">
          <h2 className="relative mb-5 pb-5 text-3xl font-bold text-white">
            My Videos
            <span className="absolute bottom-0 left-1/2 h-[3px] w-[60px] -translate-x-1/2 bg-accent"></span>
          </h2>
          <p className="m-0 text-white">
            A collection of my personal videos including gaming benchmarks, snowboarding adventures, and entertainment content. These videos showcase my interests and experiences outside of software development.
          </p>
        </div>
        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className="flex flex-wrap gap-4">
            {videos.map((video, index) => (
              <div
                key={index}
                className="card h-full w-full rounded-lg border border-white/10 bg-black/92 shadow-[0_2px_15px_rgba(0,0,0,0.3)] transition-all duration-300 hover:-translate-y-2.5 hover:border-white/20 hover:bg-black/95 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] md:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.67rem)]"
              >
                <div className="ratio ratio-16x9 relative overflow-hidden rounded-t-lg border-b-0">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.youtubeId}`}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute left-0 top-0 h-full w-full transition-all duration-300 hover:brightness-110"
                  ></iframe>
                </div>
                <div className="card-body bg-transparent p-5">
                  <h5 className="card-title mb-2.5 text-lg font-semibold text-white transition-colors duration-300 hover:text-accent">
                    {video.title}
                  </h5>
                  <p className="card-text text-sm text-white transition-colors duration-300 hover:text-[#e0e6ed]">
                    {video.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Videos

