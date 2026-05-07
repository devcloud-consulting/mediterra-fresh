import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { siteConfig } from '@/lib/site';
import { Logo } from './Logo';
import type { Locale } from '@/i18n/routing';

export function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const locale = useLocale() as Locale;
  const year = new Date().getFullYear();

  return (
    <footer className="mt-32 bg-olive-950 text-cream-100 relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 bg-paper opacity-[0.03]" />
      <div className="relative max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Big footer headline */}
        <div className="py-16 sm:py-20 border-b border-cream-100/10">
          <h2 className="headline-lg max-w-3xl text-cream-50">
            {t('tagline')}
          </h2>
          <p className="mt-6 max-w-xl text-cream-200/70 text-base leading-relaxed">
            {siteConfig.description[locale]}
          </p>
        </div>

        <div className="py-14 grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <Logo variant="light" />
            <div className="mt-6 flex items-center gap-3">
              <a href={siteConfig.social.instagram} aria-label="Instagram" className="text-cream-200/60 hover:text-cream-50 transition-colors">
                <SocialIcon name="instagram" />
              </a>
              <a href={siteConfig.social.facebook} aria-label="Facebook" className="text-cream-200/60 hover:text-cream-50 transition-colors">
                <SocialIcon name="facebook" />
              </a>
              <a href={siteConfig.social.linkedin} aria-label="LinkedIn" className="text-cream-200/60 hover:text-cream-50 transition-colors">
                <SocialIcon name="linkedin" />
              </a>
            </div>
          </div>

          <div className="md:col-span-2">
            <h3 className="eyebrow text-cream-200/60 mb-4">{t('navTitle')}</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/" className="hover:text-white transition-colors">{tNav('home')}</Link></li>
              <li><Link href="/catalogue" className="hover:text-white transition-colors">{tNav('catalogue')}</Link></li>
              <li><Link href="/pourquoi-nous" className="hover:text-white transition-colors">{tNav('why')}</Link></li>
              <li><Link href="/references" className="hover:text-white transition-colors">{tNav('references')}</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">{tNav('blog')}</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">{tNav('contact')}</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className="eyebrow text-cream-200/60 mb-4">{t('legalTitle')}</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/mentions-legales" className="hover:text-white transition-colors">{t('links.mentions')}</Link></li>
              <li><Link href="/politique-confidentialite" className="hover:text-white transition-colors">{t('links.privacy')}</Link></li>
              <li><Link href="/cgv" className="hover:text-white transition-colors">{t('links.cgv')}</Link></li>
            </ul>
            <p className="mt-6 text-xs text-cream-200/55 leading-relaxed">
              {siteConfig.legal.cndp}
            </p>
          </div>

          <div className="md:col-span-3">
            <h3 className="eyebrow text-cream-200/60 mb-4">{t('contactTitle')}</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href={`tel:${siteConfig.phone}`} className="hover:text-white transition-colors">
                  {siteConfig.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.email}`} className="hover:text-white transition-colors break-all">
                  {siteConfig.email}
                </a>
              </li>
              <li className="text-cream-200/75">
                {siteConfig.address.street},<br />
                {siteConfig.address.postal} {siteConfig.address.city}, {siteConfig.address.country}
              </li>
              <li className="text-cream-200/75">{siteConfig.hours[locale]}</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-cream-100/10">
          <div className="py-6 text-xs text-cream-200/55 flex flex-col sm:flex-row justify-between gap-2">
            <p>© {year} {siteConfig.legalName}. {t('rights')}</p>
            <p>RC {siteConfig.legal.rc.replace('RC Agadir ', '')} · ICE {siteConfig.legal.ice}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ name }: { name: 'instagram' | 'facebook' | 'linkedin' }) {
  const common = { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'currentColor' as const };
  if (name === 'instagram') {
    return (
      <svg {...common} aria-hidden="true">
        <path d="M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 1.8.3 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.2.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.3 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.2.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-1.8-.3-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2-.1-1.2-.1-1.6-.1-4.8s0-3.6.1-4.8c.1-1.2.3-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4 1.2-.1 1.6-.1 4.8-.1zm0 2.2c-3.1 0-3.5 0-4.7.1-1.1.1-1.7.2-2 .4-.5.2-.9.4-1.2.7-.3.3-.5.7-.7 1.2-.2.3-.3.9-.4 2-.1 1.2-.1 1.6-.1 4.7s0 3.5.1 4.7c.1 1.1.2 1.7.4 2 .2.5.4.9.7 1.2.3.3.7.5 1.2.7.3.2.9.3 2 .4 1.2.1 1.6.1 4.7.1s3.5 0 4.7-.1c1.1-.1 1.7-.2 2-.4.5-.2.9-.4 1.2-.7.3-.3.5-.7.7-1.2.2-.3.3-.9.4-2 .1-1.2.1-1.6.1-4.7s0-3.5-.1-4.7c-.1-1.1-.2-1.7-.4-2-.2-.5-.4-.9-.7-1.2-.3-.3-.7-.5-1.2-.7-.3-.2-.9-.3-2-.4-1.2-.1-1.6-.1-4.7-.1zm0 3.6a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9zm0 7.4a2.9 2.9 0 1 0 0-5.8 2.9 2.9 0 0 0 0 5.8zm5.7-7.6a1.05 1.05 0 1 1-2.1 0 1.05 1.05 0 0 1 2.1 0z" />
      </svg>
    );
  }
  if (name === 'facebook') {
    return (
      <svg {...common} aria-hidden="true">
        <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H8v-2.9h2.4v-2.2c0-2.4 1.4-3.7 3.6-3.7 1 0 2.1.2 2.1.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6v1.7h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12z" />
      </svg>
    );
  }
  return (
    <svg {...common} aria-hidden="true">
      <path d="M20.4 20.4h-3.5v-5.5c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.6H9.5V9h3.4v1.6h.1a3.7 3.7 0 0 1 3.4-1.8c3.6 0 4.3 2.4 4.3 5.4v6.2zM5.6 7.4a2 2 0 1 1 0-4 2 2 0 0 1 0 4zM7.3 20.4H3.6V9h3.5v11.4zM22.2 0H1.8C.8 0 0 .8 0 1.8v20.4C0 23.2.8 24 1.8 24h20.4c1 0 1.8-.8 1.8-1.8V1.8C24 .8 23.2 0 22.2 0z" />
    </svg>
  );
}
