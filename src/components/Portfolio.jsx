import { useEffect, useRef, useState } from 'react'
import Isotope from 'isotope-layout'
import imagesLoaded from 'imagesloaded'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'

const PortfolioCard = ({ item, index, onToggle, onOpenLightbox }) => {
  const [showFeatures, setShowFeatures] = useState(false)

  const handleToggle = () => {
    setShowFeatures(!showFeatures)

    // Refresh Isotope layout at multiple intervals to ensure smooth expansion
    const intervals = [50, 150, 300, 550]
    intervals.forEach(ms => {
      setTimeout(() => {
        onToggle()
      }, ms)
    })
  }

  return (
    <div className={`isotope-item ${item.category} p-3 w-full md:w-1/2 lg:w-1/3`}>
      <div className="relative group overflow-visible rounded-2xl border border-white/10 bg-white/5 transition-all duration-500 hover:border-white/20 hover:bg-white/10 hover:shadow-2xl">
        {/* Card Head: Image */}
        <div className="relative aspect-video overflow-hidden rounded-t-2xl">
          <img
            src={item.image}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            alt={item.title}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>

          {/* Floating Tech Badges */}
          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            {item.tech.slice(0, 2).map((t, i) => (
              <span key={i} className="rounded-md bg-black/50 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Card Body */}
        <div className="flex flex-col p-6">
          <h4 className="mb-3 text-xl font-bold text-white group-hover:text-accent transition-colors duration-100">
            {item.title}
          </h4>
          <p className="mb-4 text-sm text-white/60 line-clamp-2">
            {item.description}
          </p>

          {/* Features List (Collapsible) */}
          <div className="min-h-[40px]">
            <button
              onClick={handleToggle}
              className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-accent transition-all hover:text-white"
            >
              {showFeatures ? 'Hide Features' : 'Show Key Features'}
              <i className={`bi bi-chevron-${showFeatures ? 'up' : 'down'}`}></i>
            </button>

            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${showFeatures ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
              <ul className="space-y-1 pb-4">
                {item.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-white/70">
                    <span className="h-1 w-1 rounded-full bg-accent"></span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-4">
            <button
              onClick={() => onOpenLightbox(index)}
              className="flex items-center gap-2 text-sm font-medium text-white/60 transition-colors hover:text-white"
            >
              <i className="bi bi-zoom-in text-lg"></i>
              Preview
            </button>
            <a
              href={item.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-sm font-bold text-white transition-all hover:bg-accent hover:shadow-lg hover:shadow-accent/40"
            >
              GitHub
              <i className="bi bi-github"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

const Portfolio = () => {
  const isotopeRef = useRef(null)
  const isotopeInstanceRef = useRef(null)
  const [filterKey, setFilterKey] = useState('*')
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const refreshIsotope = () => {
    if (isotopeInstanceRef.current) {
      isotopeInstanceRef.current.layout()
    }
  }

  const portfolioItems = [
    {
      title: 'Rates from Everywhere',
      category: 'web',
      description: 'A platform that aggregates product ratings from multiple websites and identifies categories.',
      image: '/assets/img/portfolio/ratesfromeverywhere.png',
      githubUrl: 'https://github.com/Athena65/ratesfromeverywhere2',
      tech: ['React', 'Node.js', 'Python'],
      features: ['Multi-site Scraper', 'Sentiment Analysis', 'Category Classification']
    },
    {
      title: 'Dinner Project with Flutter',
      category: 'mobile',
      description: 'A Flutter-based mobile app for providing recipes and restaurant suggestions.',
      image: '/assets/img/portfolio/dinnerproject.png',
      githubUrl: 'https://github.com/Athena65/Dinner_Project_Flutter',
      tech: ['Flutter', 'Firebase', 'Dart'],
      features: ['Real-time Search', 'Offline Access', 'Personalized Suggestions']
    },
    {
      title: 'BinaryToDecimalWithArduino',
      category: 'arduino',
      description: 'This Arduino-based project converts 4-bit binary inputs into decimal/hexadecimal and displays results on an LCD monitor.',
      image: '/assets/img/portfolio/binarytodecimal.png',
      githubUrl: 'https://github.com/Athena65/BinaryToDecimalWithArduino',
      tech: ['Arduino', 'C++', 'I2C'],
      features: ['Binary Input via Buttons', 'Real-Time Conversion', 'LCD Status Display'],
      hardware: ['Arduino Uno', '4 Push Buttons', '16x2 LCD display', '10k Resistors']
    },
    {
      title: 'E-Commerce Laravel',
      category: 'web',
      description: 'Feature-rich e-commerce platform with a comprehensive admin panel for efficient management.',
      image: '/assets/img/portfolio/ecommercelaravel.png',
      githubUrl: 'https://github.com/Athena65/E-Commerce-Laravel',
      tech: ['Laravel', 'PHP', 'MySQL'],
      features: ['User Authentication', 'Product/Order Management', 'Shopping Cart', 'Responsive Design']
    },
    {
      title: 'ThinkSpeak Data Fetch',
      category: 'arduino',
      description: 'IoT project fetching weather and sensor data from ThinkSpeak API to an LCD interface.',
      image: '/assets/img/portfolio/thinkspeakdatafetch.jpg',
      githubUrl: 'https://github.com/Athena65/ThinkSpeakDataFetch',
      tech: ['ESP8266', 'IoT', 'JSON'],
      features: ['API Integration', 'Deep Sleep Mode', 'Auto-update Values']
    },
    {
      title: 'Find Similar Products',
      category: 'ai',
      description: 'AI-powered project using YOLOv8 to identify products and extract ratings from various platforms.',
      image: '/assets/img/portfolio/findsimilar,ratingextraction.png',
      githubUrl: 'https://github.com/Athena65/python_find_similar_products',
      tech: ['Python', 'YOLOv8', 'PyTorch'],
      features: ['Image Recognition', 'OCR Text Extraction', 'Cross-platform Matching']
    },
    {
      title: 'VirtualCash',
      category: 'software',
      description: 'Simulated virtual banking system allowing users to manage accounts and monitor financial activities securely.',
      image: '/assets/img/portfolio/virtualcashjava.png',
      githubUrl: 'https://github.com/Athena65/VirtualCash',
      tech: ['Java', 'Eclipse', 'Swing'],
      features: ['Security Deposit/Withdraw', 'Fund Transfers', 'Transaction History']
    },
  ]

  const lightboxSlides = portfolioItems.map(item => ({
    src: item.image,
    title: item.title,
    description: item.description
  }))

  const handleOpenLightbox = (index) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  useEffect(() => {
    if (isotopeRef.current) {
      imagesLoaded(isotopeRef.current, () => {
        isotopeInstanceRef.current = new Isotope(isotopeRef.current, {
          itemSelector: '.isotope-item',
          layoutMode: 'masonry',
        })
      })
    }

    return () => {
      if (isotopeInstanceRef.current) {
        isotopeInstanceRef.current.destroy()
      }
    }
  }, [])

  useEffect(() => {
    if (isotopeInstanceRef.current) {
      filterKey === '*'
        ? isotopeInstanceRef.current.arrange({ filter: `*` })
        : isotopeInstanceRef.current.arrange({ filter: `.${filterKey}` })
    }
  }, [filterKey])

  const categories = [
    { label: 'All', key: '*' },
    { label: 'Web', key: 'web' },
    { label: 'Mobile', key: 'mobile' },
    { label: 'Arduino', key: 'arduino' },
    { label: 'AI', key: 'ai' },
  ]

  return (
    <section id="portfolio" className="portfolio section relative overflow-hidden rounded-xl border border-white/10 bg-black/50 py-24 shadow-2xl backdrop-blur-md">
      {/* Background Glows */}
      <div className="absolute -left-24 top-0 h-96 w-96 rounded-full bg-accent/10 blur-[120px]"></div>
      <div className="absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-blue-500/5 blur-[120px]"></div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="section-title mb-16 text-center" data-aos="fade-up">
          <h2 className="relative mb-6 inline-block pb-4 text-4xl font-extrabold tracking-tight text-white uppercase">
            My GitHub Projects
            <span className="absolute bottom-0 left-1/2 h-[4px] w-[80px] -translate-x-1/2 rounded-full bg-gradient-to-r from-accent to-blue-500"></span>
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-white/70 leading-relaxed">
            Explore my technical journey through code. From hardware integration to sophisticated web architectures,
            each repository represents a solved challenge and a new skill mastered.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="mb-12 flex flex-wrap justify-center gap-4" data-aos="fade-up" data-aos-delay="100">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setFilterKey(cat.key)}
              className={`rounded-full px-6 py-2 text-sm font-semibold transition-all duration-100 ${filterKey === cat.key
                ? 'bg-accent text-white shadow-lg shadow-accent/20'
                : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div
          ref={isotopeRef}
          className="isotope-container flex flex-wrap"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          {portfolioItems.map((item, index) => (
            <PortfolioCard key={index} item={item} index={index} onToggle={refreshIsotope} onOpenLightbox={handleOpenLightbox} />
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
