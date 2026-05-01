import type { Metadata, Viewport } from 'next';
import { Inter, Fraunces, Noto_Naskh_Arabic } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing, localeMeta, hasLocale, type Locale } from '@/i18n/routing';
import { siteConfig } from '@/lib/site';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { OrganizationJsonLd } from '@/components/JsonLd';
import '../globals.css';

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-inter',
});

const fraunces = Fraunces({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-fraunces',
  axes: ['SOFT', 'WONK', 'opsz'],
});

const notoArabic = Noto_Naskh_Arabic({
  subsets: ['arabic'],
  display: 'swap',
  variable: '--font-noto-arabic',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = (hasLocale(routing.locales, locale) ? locale : routing.defaultLocale) as Locale;

  const description = siteConfig.description[safeLocale];
  const title = `${siteConfig.name} — ${siteConfig.tagline[safeLocale]}`;

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: title,
      template: `%s · ${siteConfig.name}`,
    },
    description,
    alternates: {
      canonical: `/${safeLocale}`,
      languages: {
        'fr-MA': '/fr',
        'en': '/en',
        'ar-MA': '/ar',
        'x-default': '/fr',
      },
    },
    openGraph: {
      type: 'website',
      locale: safeLocale === 'fr' ? 'fr_MA' : safeLocale === 'ar' ? 'ar_MA' : 'en_US',
      url: `${siteConfig.url}/${safeLocale}`,
      title,
      description,
      siteName: siteConfig.name,
      images: [
        { url: '/og-image.jpg', width: 1200, height: 630, alt: siteConfig.name },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-image.jpg'],
    },
    robots: {
      index: true,
      follow: true,
    },
    icons: {
      icon: [
        { url: '/favicon.svg', type: 'image/svg+xml' },
        { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      ],
      apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
    },
    manifest: '/manifest.webmanifest',
  };
}

export const viewport: Viewport = {
  themeColor: '#5b722c',
  width: 'device-width',
  initialScale: 1,
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const messages = await getMessages();
  const meta = localeMeta[locale as Locale];
  const t = await getTranslations({ locale, namespace: 'nav' });

  return (
    <html
      lang={meta.htmlLang}
      dir={meta.dir}
      className={`${inter.variable} ${fraunces.variable} ${notoArabic.variable}`}
    >
      <head>
        {/* Mark JS available before first paint. Enables scroll-reveal animations
            without flashing invisible content for non-JS / pre-hydration users. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js');`,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-cream-50 text-olive-900 font-sans antialiased">
        <a href="#main" className="skip-link">{t('skipToContent')}</a>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Navigation />
          <main id="main" className="flex-1 flex flex-col">
            {children}
          </main>
          <Footer />
          <WhatsAppButton />
          <OrganizationJsonLd locale={locale as Locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
