import { useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'

const Certificates = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const certificates = [
    {
      title: 'Introduction to Cybersecurity',
      issuer: 'Cisco',
      image: '/assets/certificates/img/introduction-to-cybersecurity.png',
      verifyUrl: 'https://www.credly.com/badges/258d34dd-7b4e-4845-b78f-285cf1dec6ae/public_url',
      hasLink: true,
    },
    {
      title: 'CCNA: Introduction to Networks',
      issuer: 'Cisco',
      image: '/assets/certificates/img/ccna-introduction-to-networks.png',
      verifyUrl: 'https://www.credly.com/badges/ae74d60d-8b16-414a-b351-f08245ad375a/public_url',
      hasLink: true,
    },
    {
      title: 'CCNA: Switching, Routing and Wireless Essentials',
      issuer: 'Cisco',
      image: '/assets/certificates/img/ccna-switching-routing-and-wireless-essentials.1.png',
      verifyUrl: 'https://www.credly.com/badges/84862bff-8571-442a-904c-a53c84f626cb/public_url',
      hasLink: true,
    },
    {
      title: 'Online Personal Development Summit',
      issuer: 'Digicertify',
      date: '15/12/2021',
      image: '/assets/certificates/img/girisim_zirvesi.png',
      verifyUrl: 'https://digicertify.net//c/M5XXrGA5',
      hasLink: true,
    },
    {
      title: 'Java Development',
      description: 'Certification in Java Programming',
      image: '/assets/certificates/img/javacert.jpg',
      hasLink: false,
    },
    {
      title: 'Microservices Architecture',
      description: 'Certification in Microservices Development',
      image: '/assets/certificates/img/mikroserviscert.jpg',
      hasLink: false,
    },
    {
      title: 'UX Design',
      description: 'Certification in User Experience Design',
      image: '/assets/certificates/img/uxcert.jpg',
      hasLink: false,
    },
    {
      title: 'University Ranking Achievements',
      description: 'Official document showcasing academic excellence and university ranking',
      image: '/assets/certificates/img/ranks.jpeg',
      hasLink: false,
    },
  ]

  const handleImageClick = (index) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  const lightboxSlides = certificates.map(cert => ({
    src: cert.image,
    title: cert.title,
    description: cert.description || cert.issuer
  }))

  return (
    <section id="certificates" className="certificates section relative overflow-hidden rounded-xl border border-white/10 bg-black/50 py-24 shadow-2xl backdrop-blur-md">
      {/* Background Glows */}
      <div className="absolute -left-24 top-0 h-96 w-96 rounded-full bg-accent/10 blur-[120px]"></div>
      <div className="absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-blue-500/5 blur-[120px]"></div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="section-title mb-16 text-center" data-aos="fade-up">
          <h2 className="relative mb-6 inline-block pb-4 text-4xl font-extrabold tracking-tight text-white uppercase">
            Certificates
            <span className="absolute bottom-0 left-1/2 h-[4px] w-[80px] -translate-x-1/2 rounded-full bg-gradient-to-r from-accent to-blue-500"></span>
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-white/70 leading-relaxed">
            Professional honors and industry certifications validating my technical expertise and commitment to
            excellence in cybersecurity and software engineering.
          </p>
        </div>

        <div className="flex flex-wrap" data-aos="fade-up" data-aos-delay="100">
          {certificates.map((cert, index) => (
            <div key={index} className="w-full p-3 md:w-1/2 lg:w-1/3 group">
              <div className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-all duration-500 hover:border-accent/30 hover:bg-white/10 hover:shadow-2xl hover:-translate-y-2">
                {/* Image Container */}
                <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl bg-black/20 p-4">
                  <img
                    src={cert.image}
                    className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-110"
                    alt={cert.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40"></div>
                </div>

                {/* Card Content */}
                <div className="flex flex-col p-6">
                  <span className="mb-2 text-[10px] font-bold uppercase tracking-widest text-accent">
                    {cert.issuer || 'Official Certification'}
                  </span>
                  <h4 className="mb-3 text-lg font-bold text-white group-hover:text-accent transition-colors duration-300">
                    {cert.title}
                  </h4>
                  {cert.description && (
                    <p className="mb-4 text-sm text-white/60 line-clamp-2">
                      {cert.description}
                    </p>
                  )}
                  {cert.date && (
                    <div className="mb-4 flex items-center gap-2 text-xs text-white/40">
                      <i className="bi bi-calendar3"></i>
                      <span>Issued: {cert.date}</span>
                    </div>
                  )}

                  <div className="mt-auto flex gap-3 pt-4 border-t border-white/5">
                    {cert.hasLink ? (
                      <a
                        href={cert.verifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-accent/20 px-4 py-2 text-xs font-bold text-white transition-all hover:bg-accent hover:shadow-lg hover:shadow-accent/40"
                      >
                        Verify
                        <i className="bi bi-patch-check"></i>
                      </a>
                    ) : (
                      <button
                        onClick={() => handleImageClick(index)}
                        className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-xs font-bold text-white transition-all hover:bg-white/20"
                      >
                        View Image
                        <i className="bi bi-eye"></i>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
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

export default Certificates

