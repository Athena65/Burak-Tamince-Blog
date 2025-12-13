import { useEffect, useRef } from 'react'
import Isotope from 'isotope-layout'
import imagesLoaded from 'imagesloaded'
import GLightbox from 'glightbox'

const Portfolio = () => {
  const isotopeRef = useRef(null)
  const isotopeInstanceRef = useRef(null)

  useEffect(() => {
    GLightbox({
      selector: '.glightbox',
    })
  }, [])

  useEffect(() => {
    if (isotopeRef.current) {
      imagesLoaded(isotopeRef.current, () => {
        isotopeInstanceRef.current = new Isotope(isotopeRef.current, {
          itemSelector: '.isotope-item',
          layoutMode: 'masonry',
          filter: '*',
          sortBy: 'original-order',
        })
      })
    }

    return () => {
      if (isotopeInstanceRef.current) {
        isotopeInstanceRef.current.destroy()
      }
    }
  }, [])

  const portfolioItems = [
    {
      title: 'Rates from Everywhere',
      description: 'A platform that aggregates product ratings from multiple websites and identifies categories.',
      image: '/assets/img/portfolio/ratesfromeverywhere.png',
      githubUrl: 'https://github.com/Athena65/ratesfromeverywhere2',
    },
    {
      title: 'Dinner Project with Flutter',
      description: 'A Flutter-based mobile app for providing recipes and restaurant suggestions.',
      image: '/assets/img/portfolio/dinnerproject.png',
      githubUrl: 'https://github.com/Athena65/Dinner_Project_Flutter',
    },
    {
      title: 'Binary to Decimal with Arduino',
      description: 'An Arduino project that converts binary numbers to decimal and displays them on an LCD screen.',
      image: '/assets/img/portfolio/binarytodecimal.png',
      githubUrl: 'https://github.com/Athena65/BinaryToDecimalWithArduino',
    },
    {
      title: 'E-Commerce Site with Laravel',
      description: 'An e-commerce platform built with Laravel, featuring an admin panel for product and order management.',
      image: '/assets/img/portfolio/ecommercelaravel.png',
      githubUrl: 'https://github.com/Athena65/E-Commerce-Laravel',
    },
    {
      title: 'ThinkSpeak Data Fetch',
      description: 'An Arduino project that fetches data from the internet and displays it on an LCD screen.',
      image: '/assets/img/portfolio/thinkspeakdatafetch.jpg',
      githubUrl: 'https://github.com/Athena65/ThinkSpeakDataFetch',
    },
    {
      title: 'Find Similar Products with Python',
      description: 'A Python-based project using YOLOv8 to find similar products and extract ratings from various platforms.',
      image: '/assets/img/portfolio/findsimilar,ratingextraction.png',
      githubUrl: 'https://github.com/Athena65/python_find_similar_products',
    },
    {
      title: 'Virtual Cash Application with Java',
      description: 'A Java-based virtual cash application experiment built using Eclipse IDE.',
      image: '/assets/img/portfolio/virtualcashjava.png',
      githubUrl: 'https://github.com/Athena65/VirtualCash',
    },
  ]

  return (
    <section id="portfolio" className="portfolio section relative overflow-hidden rounded-lg border border-white/18 bg-black/85 py-16 shadow-[0_8px_32px_rgba(0,0,0,0.1)] backdrop-blur-[5px]">
      <div className="container">
        <div className="section-title mb-16 text-center" data-aos="fade-up">
          <h2 className="relative mb-5 pb-5 text-3xl font-bold text-white">
            My GitHub Projects
            <span className="absolute bottom-0 left-1/2 h-[3px] w-[60px] -translate-x-1/2 bg-accent"></span>
          </h2>
          <p className="m-0 text-white">
            Explore some of the projects I have worked on, ranging from Arduino experiments to web and mobile applications. Each project showcases unique functionalities, innovative ideas, and real-world applications. Click on "More Details" to visit the respective GitHub repositories for code and documentation.
          </p>
        </div>
        <div className="container">
          <div className="isotope-layout" data-default-filter="*" data-layout="masonry" data-sort="original-order">
            <div
              ref={isotopeRef}
              className="isotope-container flex flex-wrap gap-4"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              {portfolioItems.map((item, index) => (
                <div
                  key={index}
                  className="portfolio-item isotope-item group w-full rounded-lg border border-white/10 bg-black/92 shadow-[0_2px_15px_rgba(0,0,0,0.3)] transition-all duration-300 hover:-translate-y-2.5 hover:border-white/20 hover:bg-black/95 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] md:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.67rem)]"
                >
                  <img
                    src={item.image}
                    className="h-auto w-full rounded-t-lg transition-all duration-300 hover:scale-[1.02] hover:brightness-110"
                    alt={item.title}
                  />
                  <div className="portfolio-info absolute bottom-[-100%] left-3 right-3 z-[3] rounded-lg border border-white/10 bg-black/95 p-4 opacity-0 transition-all duration-300 group-hover:bottom-0 group-hover:opacity-100">
                    <h4 className="mb-2 pr-12 text-lg font-semibold text-white transition-colors duration-300 hover:text-accent">
                      {item.title}
                    </h4>
                    <p className="mb-0 pr-12 text-sm text-white">{item.description}</p>
                    <a
                      href={item.image}
                      title={item.title}
                      data-description={item.description}
                      data-gallery="portfolio-gallery-all"
                      className="preview-link absolute right-12 top-1/2 -translate-y-1/2 text-2xl text-white transition-all duration-300 hover:scale-125 hover:text-accent"
                      onClick={(e) => {
                        e.preventDefault()
                        GLightbox({
                          elements: [
                            {
                              href: item.image,
                              title: item.title,
                              description: item.description,
                            },
                          ],
                        }).open()
                      }}
                    >
                      <i className="bi bi-zoom-in"></i>
                    </a>
                    <a
                      href={item.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="More Details"
                      className="details-link absolute right-3 top-1/2 -translate-y-1/2 text-[28px] text-white transition-all duration-300 hover:scale-125 hover:text-accent"
                    >
                      <i className="bi bi-link-45deg"></i>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Portfolio

