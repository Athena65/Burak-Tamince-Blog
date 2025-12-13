import { useEffect } from 'react'
import GLightbox from 'glightbox'

const Certificates = () => {
  useEffect(() => {
    GLightbox({
      selector: '.glightbox',
    })
  }, [])

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
      gallery: 'certificate-gallery',
      hasLink: false,
    },
    {
      title: 'Microservices Architecture',
      description: 'Certification in Microservices Development',
      image: '/assets/certificates/img/mikroserviscert.jpg',
      gallery: 'certificate-gallery',
      hasLink: false,
    },
    {
      title: 'UX Design',
      description: 'Certification in User Experience Design',
      image: '/assets/certificates/img/uxcert.jpg',
      gallery: 'certificate-gallery',
      hasLink: false,
    },
    {
      title: 'University Ranking Achievements',
      description: 'Official document showcasing academic excellence and university ranking',
      image: '/assets/certificates/img/ranks.jpeg',
      gallery: 'certificate-gallery',
      hasLink: false,
    },
  ]

  return (
    <section id="certificates" className="certificates section relative overflow-hidden rounded-lg border border-white/18 bg-black/85 py-16 shadow-[0_8px_32px_rgba(0,0,0,0.1)] backdrop-blur-[5px]">
      <div className="container">
        <div className="section-title mb-16 text-center" data-aos="fade-up">
          <h2 className="relative mb-5 pb-5 text-3xl font-bold text-white">
            Certificates
            <span className="absolute bottom-0 left-1/2 h-[3px] w-[60px] -translate-x-1/2 bg-accent"></span>
          </h2>
          <p className="m-0 text-white">
            Below are some of the professional certificates I've earned throughout my career. Each certificate represents my commitment to continuous learning and professional development in the field of technology.
          </p>
        </div>
        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className="flex flex-wrap justify-center gap-4">
            {certificates.map((cert, index) => (
              <div
                key={index}
                className={`certificate-item w-full cursor-pointer rounded-lg border border-white/10 bg-black/92 shadow-[0_2px_15px_rgba(0,0,0,0.3)] transition-all duration-300 hover:-translate-y-2.5 hover:border-white/20 hover:bg-black/95 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] md:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.67rem)] ${
                  !cert.hasLink ? 'certificate-no-link' : ''
                }`}
                onClick={cert.hasLink ? () => window.open(cert.verifyUrl, '_blank') : undefined}
              >
                {cert.hasLink ? (
                  <>
                    <img
                      src={cert.image}
                      className="certificate-thumbnail h-auto max-h-[280px] w-full rounded-t-lg bg-black/92 object-contain p-5 transition-all duration-300 hover:scale-105 hover:brightness-110"
                      alt={`${cert.title} Certificate`}
                    />
                    <div className="certificate-info p-5 text-center">
                      <h4 className="mb-2.5 text-lg font-semibold text-white transition-colors duration-300 hover:text-accent">
                        {cert.title}
                      </h4>
                      <p className="mb-1.5 text-sm text-[#eee]">Issued by: {cert.issuer}</p>
                      {cert.date && <p className="mb-1.5 text-sm text-[#eee]">Date: {cert.date}</p>}
                      <p>
                        <a
                          href={cert.verifyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="verify-link inline-block font-medium text-accent transition-all duration-300 hover:translate-x-1 hover:text-white hover:underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Verify Certificate
                          <i className="bi bi-box-arrow-up-right ml-1"></i>
                        </a>
                      </p>
                    </div>
                  </>
                ) : (
                  <a
                    href={cert.image}
                    title={cert.title}
                    data-gallery={cert.gallery}
                    className="glightbox certificate-link block no-underline"
                  >
                    <img
                      src={cert.image}
                      className="certificate-thumbnail h-auto max-h-[280px] w-full rounded-t-lg bg-black/92 object-contain p-5 transition-all duration-300 hover:scale-105 hover:brightness-110"
                      alt={`${cert.title} Certificate`}
                    />
                    <div className="certificate-info p-5 text-center">
                      <h4 className="mb-2.5 text-lg font-semibold text-white transition-colors duration-300 hover:text-accent">
                        {cert.title}
                      </h4>
                      <p className="mb-1.5 text-sm text-[#eee]">{cert.description}</p>
                      <p>
                        <span className="view-certificate inline-block cursor-pointer font-medium text-accent transition-all duration-300 hover:translate-x-1 hover:text-white">
                          View Certificate
                          <i className="bi bi-zoom-in ml-1"></i>
                        </span>
                      </p>
                    </div>
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Certificates

