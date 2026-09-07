import { useState } from 'react'
import SectionHeader from './SectionHeader'
import { useLanguage } from '../i18n/LanguageContext'
import { trackEvent, trackCvDownload } from '../utils/analytics'

const Resume = () => {
  const { t } = useLanguage()
  const [showPreview, setShowPreview] = useState(false)

  return (
    <section id="resume" className="resume section relative z-[5] border-t border-rule py-20 md:py-28">
      <div className="container">
        <SectionHeader
          title={t({ en: 'Resume', tr: 'Özgeçmiş' })}
          deck={t({
            en: 'One PDF with contact details, experience and certifications.',
            tr: 'İletişim bilgileri, deneyim ve sertifikaları içeren tek bir PDF.',
          })}
        />

        {/* The plate stays overflow-visible so the hover preview can pop out above it */}
        <div className="rounded-md border border-rule bg-ink-2/70 p-6 md:p-8" data-aos="fade-up" data-aos-delay="100">
          <div className="max-w-measure">
            <h3 className="font-display stretch-normal font-semibold text-lg md:text-xl text-paper tracking-tight">
              {t({ en: 'Burak Tamince, CV', tr: 'Burak Tamince, CV' })}
            </h3>
            <p className="mt-2 text-paper-dim">
              {t({
                en: 'PDF in English, with contact details, roles and certifications.',
                tr: 'İngilizce PDF; iletişim bilgileri, görevler ve sertifikaları içerir.',
              })}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <div className="relative">
                {/* Download button */}
                <a
                  href="/assets/resume/BT_1611_CV.pdf"
                  download="Burak_Tamince_CV.pdf"
                  className="inline-flex items-center gap-2 rounded-sm bg-accent px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-accent-300"
                  onMouseEnter={() => setShowPreview(true)}
                  onMouseLeave={() => setShowPreview(false)}
                  onClick={() => trackCvDownload('resume')}
                >
                  <i className="bi bi-download" aria-hidden="true"></i>
                  {t({ en: 'Download CV', tr: 'CV indir' })}
                </a>

                {/* Hover preview (decorative; hidden from assistive tech) */}
                <div
                  aria-hidden="true"
                  className={`pointer-events-none absolute bottom-full left-1/2 z-[999] mb-3 w-max -translate-x-1/2 transition-opacity duration-200 ${showPreview ? 'opacity-100' : 'opacity-0'}`}
                >
                  <div className="relative rounded-md border border-rule bg-ink-2 p-2">
                    <img
                      src="/assets/resume/cv_preview.png"
                      alt=""
                      className="block h-56 w-56 rounded-sm object-contain"
                    />
                    {/* Arrow */}
                    <div className="absolute -bottom-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 border-b border-r border-rule bg-ink-2"></div>
                  </div>
                </div>
              </div>

              <a
                href="/assets/resume/BT_1611_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('cv_open', { location: 'resume' })}
                className="inline-flex items-center gap-2 rounded-sm border border-rule-strong px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:border-accent hover:text-accent"
              >
                <i className="bi bi-box-arrow-up-right" aria-hidden="true"></i>
                {t({ en: 'Open in new tab', tr: 'Yeni sekmede aç' })}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Resume
