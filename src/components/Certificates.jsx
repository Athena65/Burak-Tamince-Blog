import { useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import SectionHeader from './SectionHeader'
import { useLanguage } from '../i18n/LanguageContext'
import { trackEvent, trackOutbound } from '../utils/analytics'

const Certificates = () => {
  const { t } = useLanguage()
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const certificates = [
    {
      title: { en: 'Introduction to Cybersecurity', tr: 'Siber Güvenliğe Giriş' },
      issuer: 'Cisco',
      image: '/assets/certificates/img/introduction-to-cybersecurity.png',
      verifyUrl: 'https://www.credly.com/badges/258d34dd-7b4e-4845-b78f-285cf1dec6ae/public_url',
      hasLink: true,
    },
    {
      title: { en: 'CCNA: Introduction to Networks', tr: 'CCNA: Ağlara Giriş' },
      issuer: 'Cisco',
      image: '/assets/certificates/img/ccna-introduction-to-networks.png',
      verifyUrl: 'https://www.credly.com/badges/ae74d60d-8b16-414a-b351-f08245ad375a/public_url',
      hasLink: true,
    },
    {
      title: {
        en: 'CCNA: Switching, Routing and Wireless Essentials',
        tr: 'CCNA: Anahtarlama, Yönlendirme ve Kablosuz Ağ Temelleri',
      },
      issuer: 'Cisco',
      image: '/assets/certificates/img/ccna-switching-routing-and-wireless-essentials.1.png',
      verifyUrl: 'https://www.credly.com/badges/84862bff-8571-442a-904c-a53c84f626cb/public_url',
      hasLink: true,
    },
    {
      title: { en: 'Claude Code in Action', tr: 'Claude Code in Action' },
      issuer: 'Anthropic',
      date: '04/04/2026',
      image: '/assets/certificates/img/claudeinaction-anthropic.png',
      verifyUrl: 'https://verify.skilljar.com/c/6jj54j3f8dix',
      hasLink: true,
    },
    {
      title: { en: 'Online Personal Development Summit', tr: 'Çevrimiçi Kişisel Gelişim Zirvesi' },
      issuer: 'Digicertify',
      date: '15/12/2021',
      image: '/assets/certificates/img/girisim_zirvesi.png',
      verifyUrl: 'https://digicertify.net//c/M5XXrGA5',
      hasLink: true,
    },
    {
      title: { en: 'Java training', tr: 'Java Eğitimi' },
      issuer: 'TÜBİTAK BİLGEM YTE',
      date: '14.10.2023',
      description: {
        en: 'TÜBİTAK BİLGEM YTE Bootcamp 2023 participation certificate.',
        tr: 'TÜBİTAK BİLGEM YTE Bootcamp 2023 katılım sertifikası.',
      },
      image: '/assets/certificates/img/javacert.jpg',
      hasLink: false,
    },
    {
      title: { en: 'Microservice architectures training', tr: 'Mikroservis Mimarileri Eğitimi' },
      issuer: 'TÜBİTAK BİLGEM YTE',
      date: '15.10.2023',
      description: {
        en: 'TÜBİTAK BİLGEM YTE Bootcamp 2023 participation certificate.',
        tr: 'TÜBİTAK BİLGEM YTE Bootcamp 2023 katılım sertifikası.',
      },
      image: '/assets/certificates/img/mikroserviscert.jpg',
      hasLink: false,
    },
    {
      title: {
        en: 'User experience and usability training',
        tr: 'Kullanıcı Deneyimi ve Kullanılabilirlik Eğitimi',
      },
      issuer: 'TÜBİTAK BİLGEM YTE',
      date: '14.10.2023',
      description: {
        en: 'TÜBİTAK BİLGEM YTE Bootcamp 2023 participation certificate.',
        tr: 'TÜBİTAK BİLGEM YTE Bootcamp 2023 katılım sertifikası.',
      },
      image: '/assets/certificates/img/uxcert.jpg',
      hasLink: false,
    },
    {
      title: { en: 'University ranking awards', tr: 'Üniversite derece ödülleri' },
      issuer: 'İstanbul Gedik Üniversitesi',
      date: '2025',
      description: {
        en: 'Three 2025 awards: first in the Computer Engineering department, first in the Faculty of Engineering, and third across the university.',
        tr: '2025 yılına ait üç ödül: Bilgisayar Mühendisliği bölüm birinciliği, Mühendislik Fakültesi birinciliği ve üniversite üçüncülüğü.',
      },
      image: '/assets/certificates/img/ranks.jpeg',
      hasLink: false,
    },
    {
      title: { en: 'AI Training Participation Certificate', tr: 'Yapay Zekâ Eğitimi Katılım Sertifikası' },
      description: {
        en: 'Gebze Technical University & SEM – AI Training participation certificate',
        tr: 'Gebze Teknik Üniversitesi ve SEM Yapay Zekâ Eğitimi katılım sertifikası',
      },
      image: '/assets/certificates/img/ai-certificate-bt.jpeg',
      hasLink: false,
    },
  ]

  const handleImageClick = (index) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  const lightboxSlides = certificates.map(cert => ({
    src: cert.image,
    title: t(cert.title),
    description: t(cert.description) || cert.issuer
  }))

  return (
    <section id="certificates" className="certificates section relative border-t border-rule py-20 md:py-28">
      <div className="container">
        <SectionHeader
          title={t({ en: 'Certificates', tr: 'Sertifikalar' })}
          deck={t({
            en: 'Industry certifications and academic records. Cisco, Anthropic and Digicertify certificates verify online; the others open as images.',
            tr: 'Sektör sertifikaları ve akademik belgeler. Cisco, Anthropic ve Digicertify sertifikaları çevrimiçi doğrulanır; diğerleri görsel olarak açılır.',
          })}
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" data-aos="fade-up" data-aos-delay="100">
          {certificates.map((cert, index) => {
            const title = t(cert.title)
            const description = t(cert.description)

            return (
              <article
                key={index}
                className="group flex flex-col rounded-none border border-rule bg-ink-2/60 transition-colors duration-300 hover:border-accent/60 hover:bg-ink-2"
              >
                {/* Document image — click to open it full size */}
                <button
                  type="button"
                  onClick={() => {
                    trackEvent('lightbox_open', { section: 'certificates', item: cert.title.en })
                    handleImageClick(index)
                  }}
                  aria-label={t({ en: `View ${title} full size`, tr: `Tam boyutta gör: ${title}` })}
                  className="relative block aspect-[4/3] w-full overflow-hidden bg-ink-3/60 p-5"
                >
                  <img
                    src={cert.image}
                    className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.04]"
                    alt={title}
                  />
                  {/* Hover veil with a zoom cue */}
                  <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-ink/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="inline-flex items-center gap-2 rounded-sm border border-rule-strong bg-ink-2 px-3 py-1.5 text-sm font-medium text-paper">
                      <i className="bi bi-arrows-fullscreen" aria-hidden="true"></i>
                      {t({ en: 'View full size', tr: 'Tam boyutta gör' })}
                    </span>
                  </span>
                </button>

                {/* Document body */}
                <div className="flex flex-1 flex-col p-5">
                  <div className="space-y-2 pb-5">
                    <p className="text-sm text-paper-mute">{cert.issuer || t({ en: 'Certificate', tr: 'Sertifika' })}</p>
                    <h3 className="font-display stretch-normal font-semibold text-lg md:text-xl leading-snug text-paper tracking-tight transition-colors duration-300 group-hover:text-accent">
                      {title}
                    </h3>
                    {description && (
                      <p className="text-sm text-paper-dim">{description}</p>
                    )}
                    {cert.date && (
                      <p className="text-sm text-paper-mute">
                        {t({ en: 'Issued', tr: 'Veriliş tarihi' })} <span className="text-brass tabular-nums">{cert.date}</span>
                      </p>
                    )}
                  </div>

                  <div className="mt-auto border-t border-rule pt-4">
                    {cert.hasLink ? (
                      <a
                        href={cert.verifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackOutbound('certificate', cert.verifyUrl, { certificate: cert.title.en })}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-accent px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-accent-300"
                      >
                        {t({ en: 'Verify certificate', tr: 'Sertifikayı doğrula' })}
                        <i className="bi bi-box-arrow-up-right" aria-hidden="true"></i>
                      </a>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          trackEvent('lightbox_open', { section: 'certificates', item: cert.title.en })
                          handleImageClick(index)
                        }}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-sm border border-rule-strong px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:border-accent hover:text-accent"
                      >
                        {t({ en: 'View certificate', tr: 'Sertifikayı görüntüle' })}
                        <i className="bi bi-eye" aria-hidden="true"></i>
                      </button>
                    )}
                  </div>
                </div>
              </article>
            )
          })}
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
