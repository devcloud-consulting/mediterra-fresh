import Image from 'next/image';
import { Suspense } from 'react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { Container, Section, Eyebrow, Card } from '@/components/ui';
import { Reveal } from '@/components/Reveal';
import { ContactForm } from '@/components/ContactForm';
import { siteConfig } from '@/lib/site';
import type { Locale } from '@/i18n/routing';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });
  return { title: t('title'), description: t('subtitle') };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const safeLocale = locale as Locale;

  const t = await getTranslations('contact');

  const waMessage = encodeURIComponent(
    "Bonjour, je viens du site et j'aimerais en savoir plus sur vos produits."
  );
  const waHref = `https://wa.me/${siteConfig.whatsapp}?text=${waMessage}`;

  const { lat, lon } = siteConfig.geo;
  const bbox = `${lon - 0.02},${lat - 0.012},${lon + 0.02},${lat + 0.012}`;
  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lon}`;

  return (
    <>
      <section className="relative bg-paper">
        <Container className="py-16 sm:py-20">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <Reveal className="lg:col-span-7">
              <Eyebrow>{t('subtitle')}</Eyebrow>
              <h1 className="headline-lg mt-5 text-olive-900">{t('title')}</h1>
            </Reveal>
            <Reveal delay={1} className="lg:col-span-5">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-olive-100">
                <Image
                  src="/images/process/process-delivery.jpg"
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover tile-image"
                  priority
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <Section className="pt-12 sm:pt-16">
        <Container>
          <div className="grid lg:grid-cols-12 gap-10">
            <Reveal className="lg:col-span-5 space-y-3">
              <ChannelCard
                icon={<WhatsAppIcon />}
                title={t('channels.whatsapp')}
                action={
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#1da851] font-medium hover:underline break-all"
                  >
                    {siteConfig.phoneDisplay}
                  </a>
                }
              />
              <ChannelCard
                icon={<PhoneIcon />}
                title={t('channels.phone')}
                action={
                  <a href={`tel:${siteConfig.phone}`} className="text-olive-800 font-medium hover:underline">
                    {siteConfig.phoneDisplay}
                  </a>
                }
              />
              <ChannelCard
                icon={<MailIcon />}
                title={t('channels.email')}
                action={
                  <a href={`mailto:${siteConfig.email}`} className="text-olive-800 font-medium hover:underline break-all">
                    {siteConfig.email}
                  </a>
                }
              />
              <ChannelCard
                icon={<PinIcon />}
                title={t('channels.address')}
                action={
                  <p className="text-olive-700 text-sm leading-relaxed">
                    {siteConfig.address.street}<br />
                    {siteConfig.address.postal} {siteConfig.address.city}<br />
                    {siteConfig.hours[safeLocale]}
                  </p>
                }
              />
            </Reveal>

            <Reveal delay={1} className="lg:col-span-7">
              <Card>
                <h2 className="font-display text-2xl text-olive-900">{t('form.title')}</h2>
                <p className="mt-1 text-sm text-olive-700/85">{t('form.subtitle')}</p>
                <div className="mt-6">
                  <Suspense fallback={null}>
                    <ContactForm />
                  </Suspense>
                </div>
              </Card>
            </Reveal>
          </div>

          <Reveal delay={1} className="mt-16 rounded-3xl overflow-hidden border border-olive-100 aspect-[16/8] bg-olive-50">
            <iframe
              src={mapSrc}
              title="Carte"
              className="w-full h-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Reveal>
        </Container>
      </Section>
    </>
  );
}

function ChannelCard({
  icon,
  title,
  action,
}: {
  icon: React.ReactNode;
  title: string;
  action: React.ReactNode;
}) {
  return (
    <Card className="flex gap-4 items-start">
      <div className="h-10 w-10 shrink-0 rounded-full bg-olive-50 text-olive-700 flex items-center justify-center">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs uppercase tracking-[0.18em] font-semibold text-olive-700">{title}</p>
        <div className="mt-1.5">{action}</div>
      </div>
    </Card>
  );
}

const iconProps = {
  width: 18,
  height: 18,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

function WhatsAppIcon() {
  return <svg {...iconProps} aria-hidden="true"><path d="M21 11.5a8.4 8.4 0 0 1-1.27 4.45L21 21l-5.05-1.27a8.4 8.4 0 1 1 5.05-8.23z"/><path d="M9 9.5c0 4 2.5 5.5 4 6 1 .3 2-.5 1.5-1.5L13 12l1-1-1-1c-.5 0-1 .5-1.5.5A2.5 2.5 0 0 1 9.5 9c0-.5.5-1 .5-1.5L9 6.5c-1-.5-2 .5-2 1.5 0 .5.5 1 .5 1.5"/></svg>;
}
function PhoneIcon() {
  return <svg {...iconProps} aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.91.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>;
}
function MailIcon() {
  return <svg {...iconProps} aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>;
}
function PinIcon() {
  return <svg {...iconProps} aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>;
}
