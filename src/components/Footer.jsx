import { useLanguage } from '../i18n/LanguageContext'
import { trackOutbound } from '../utils/analytics'

const socials = [
  {
    href: 'https://github.com/Athena65',
    icon: 'bi-github',
    kind: 'github',
    label: { en: 'GitHub profile', tr: 'GitHub profili' },
  },
  {
    href: 'https://www.linkedin.com/in/burak-tamince/',
    icon: 'bi-linkedin',
    kind: 'linkedin',
    label: { en: 'LinkedIn profile', tr: 'LinkedIn profili' },
  },
  {
    href: 'https://www.youtube.com/@buraktamince251',
    icon: 'bi-youtube',
    kind: 'youtube',
    label: { en: 'YouTube channel', tr: 'YouTube kanalı' },
  },
  {
    href: 'https://www.instagram.com/tmncburak/',
    icon: 'bi-instagram',
    kind: 'instagram',
    label: { en: 'Instagram profile', tr: 'Instagram profili' },
  },
]

const links = [
  { href: '#hero', label: { en: 'Home', tr: 'Ana sayfa' } },
  { href: '#about', label: { en: 'About', tr: 'Hakkımda' } },
  { href: '#portfolio', label: { en: 'Projects', tr: 'Projeler' } },
]

const Footer = () => {
  const { t } = useLanguage()
  const year = new Date().getFullYear()

  return (
    <footer id="footer" className="footer relative border-t border-rule bg-ink py-14">
      <div className="container">
        <div className="grid gap-8 md:grid-cols-12 md:items-start">
          {/* Identity */}
          <div className="md:col-span-6">
            <p className="font-display stretch-wide text-2xl font-semibold text-paper">
              Burak Tamince
            </p>
            <p className="mt-2 max-w-measure text-paper-dim">
              {t({
                en: 'Computer engineer and full-stack developer, Istanbul.',
                tr: 'Bilgisayar mühendisi ve full-stack geliştirici, İstanbul.',
              })}
            </p>
            <a
              href="mailto:btamince@gmail.com"
              className="mt-3 inline-block text-accent underline-offset-4 hover:underline"
            >
              btamince@gmail.com
            </a>
          </div>

          {/* Navigation and social */}
          <div className="md:col-span-6 md:justify-self-end">
            <nav aria-label={t({ en: 'Footer', tr: 'Alt bilgi' })} className="flex gap-6 text-sm">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-paper-dim transition-colors hover:text-paper"
                >
                  {t(link.label)}
                </a>
              ))}
            </nav>

            <div className="mt-5 flex gap-3">
              {socials.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackOutbound(social.kind, social.href)}
                  aria-label={t(social.label)}
                  className="flex h-10 w-10 items-center justify-center rounded-sm border border-rule text-lg text-paper-dim transition-colors hover:border-accent hover:text-accent"
                >
                  <i className={`bi ${social.icon}`}></i>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-rule pt-6 text-sm text-paper-mute">
          <p>
            {t({
              en: `© ${year} Burak Tamince. All rights reserved.`,
              tr: `© ${year} Burak Tamince. Tüm hakları saklıdır.`,
            })}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
