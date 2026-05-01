import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { Container, Section, Eyebrow, Button } from '@/components/ui';
import { Reveal } from '@/components/Reveal';
import { Link } from '@/i18n/navigation';
import { siteConfig } from '@/lib/site';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'why' });
  return { title: t('title'), description: t('subtitle') };
}

const SECTIONS = [
  { key: 'coldChain', icon: '❄', image: '/images/process/process-coldroom.jpg' },
  { key: 'delivery', icon: '◷', image: '/images/process/process-delivery.jpg' },
  { key: 'moq', icon: '⚖', image: '/images/categories/cat-fruits-saison.jpg' },
  { key: 'payment', icon: '⌖', image: '/images/categories/cat-agrumes.jpg' },
  { key: 'certifications', icon: '✓', image: '/images/categories/cat-fruits-rouges.jpg' },
  { key: 'zones', icon: '◉', image: '/images/process/process-orchard.jpg' },
] as const;

export default async function WhyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('why');
  const tCta = await getTranslations('cta');

  const stats = t.raw('stats.items') as { value: string; label: string }[];

  return (
    <>
      {/* Header with hero image */}
      <section className="relative bg-paper">
        <Container className="py-16 sm:py-20">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <Reveal className="lg:col-span-7">
              <Eyebrow>{siteConfig.name}</Eyebrow>
              <h1 className="headline-lg mt-5 text-olive-900">{t('title')}</h1>
              <p className="mt-7 text-lg text-olive-700/85 leading-relaxed max-w-xl">
                {t('subtitle')}
              </p>
            </Reveal>
            <Reveal delay={1} className="lg:col-span-5">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-olive-100">
                <Image
                  src="/images/process/process-coldroom.jpg"
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

      {/* Stats */}
      <Section tone="dark" className="relative overflow-hidden">
        <Container>
          <Reveal>
            <Eyebrow tone="light">{siteConfig.name}</Eyebrow>
          </Reveal>
          <ul className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-px bg-olive-800/40">
            {stats.map((s, i) => (
              <Reveal as="li" delay={((i % 4) + 1) as 1 | 2 | 3 | 4} key={i}>
                <div className="bg-olive-900 p-8 sm:p-10 h-full">
                  <p className="font-display text-4xl sm:text-5xl text-cream-50 leading-none tabular-nums">
                    {s.value}
                  </p>
                  <p className="mt-4 text-xs uppercase tracking-[0.2em] text-cream-200/70">
                    {s.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Editorial cards with image+text alternating */}
      <Section tone="cream">
        <Container>
          <div className="space-y-24 sm:space-y-28">
            {SECTIONS.map((s, i) => {
              const flip = i % 2 === 1;
              return (
                <Reveal key={s.key}>
                  <div className={`grid lg:grid-cols-12 gap-10 items-center ${flip ? 'lg:[direction:rtl]' : ''}`}>
                    <div className="lg:col-span-5 lg:[direction:ltr]">
                      <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-olive-100">
                        <Image
                          src={s.image}
                          alt=""
                          fill
                          sizes="(max-width: 1024px) 100vw, 40vw"
                          className="object-cover tile-image"
                        />
                      </div>
                    </div>
                    <div className="lg:col-span-7 lg:[direction:ltr]">
                      <p className="font-display text-3xl text-terracotta-600/80 leading-none tabular-nums">
                        0{i + 1}
                      </p>
                      <h2 className="mt-4 headline-md text-olive-900">
                        {t(`sections.${s.key}.title`)}
                      </h2>
                      <p className="mt-5 text-olive-700/85 text-lg leading-relaxed max-w-xl">
                        {t(`sections.${s.key}.body`)}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Delivery zones */}
      <Section tone="paper">
        <Container size="narrow" className="text-center">
          <Reveal>
            <Eyebrow>{t('sections.zones.title')}</Eyebrow>
            <h2 className="headline-md mt-5 text-olive-900">{t('sections.zones.title')}</h2>
            <p className="mt-5 text-olive-700/85 leading-relaxed">{t('sections.zones.body')}</p>
            <ul className="mt-10 flex flex-wrap justify-center gap-2.5">
              {siteConfig.deliveryZones.map((z) => (
                <li
                  key={z.city}
                  className="px-4 py-2 rounded-full bg-white border border-olive-200 text-sm text-olive-800"
                >
                  <span className="font-medium">{z.city}</span>
                  {z.radiusKm > 0 ? (
                    <span className="text-olive-600/80 ms-1">· {z.radiusKm} km</span>
                  ) : z.note ? (
                    <span className="text-olive-600/80 ms-1">· {z.note}</span>
                  ) : null}
                </li>
              ))}
            </ul>
            <div className="mt-12">
              <Button as={Link} href="/contact" variant="warm" size="lg">
                {tCta('freeSample')}
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
