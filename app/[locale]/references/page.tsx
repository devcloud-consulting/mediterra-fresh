import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { Container, Section, Eyebrow, Button, Pill } from '@/components/ui';
import { Reveal } from '@/components/Reveal';
import { Link } from '@/i18n/navigation';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'references' });
  return { title: t('title'), description: t('subtitle') };
}

const SEGMENTS = [
  { key: 'hotels', image: '/images/process/process-coldroom.jpg' },
  { key: 'riads', image: '/images/categories/cat-herbes.jpg' },
  { key: 'restaurants', image: '/images/categories/cat-fruits-saison.jpg' },
  { key: 'patisseries', image: '/images/categories/cat-fruits-rouges.jpg' },
  { key: 'juiceBars', image: '/images/categories/cat-agrumes.jpg' },
  { key: 'catering', image: '/images/process/process-delivery.jpg' },
] as const;

export default async function ReferencesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('references');
  const tCta = await getTranslations('cta');

  const benefits = (t.raw('pilotBenefits') as string[]) ?? [];
  const commitments =
    (t.raw('commitments') as { value: string; label: string }[]) ?? [];

  return (
    <>
      {/* Editorial header */}
      <section className="relative bg-paper">
        <Container className="py-16 sm:py-20">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <Reveal className="lg:col-span-7">
              <Eyebrow>{t('subtitle')}</Eyebrow>
              <h1 className="headline-lg mt-5 text-olive-900">{t('title')}</h1>
              <p className="mt-7 text-lg text-olive-700/85 leading-relaxed max-w-xl">
                {t('empty')}
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Button as={Link} href="/contact" variant="warm" size="lg">
                  {tCta('becomeClient')}
                  <span aria-hidden>→</span>
                </Button>
                <Button as={Link} href="/catalogue" variant="secondary" size="lg">
                  {tCta('browseCatalog')}
                </Button>
              </div>
            </Reveal>
            <Reveal delay={1} className="lg:col-span-5">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-olive-100">
                <Image
                  src="/images/hero/harvest-hands.jpg"
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

      {/* Segments grid */}
      <Section tone="cream">
        <Container>
          <Reveal className="max-w-2xl mb-14">
            <Eyebrow>{t('segmentsTitle')}</Eyebrow>
            <p className="mt-6 text-2xl sm:text-3xl font-display text-olive-900 leading-snug">
              {t('segmentsBody')}
            </p>
          </Reveal>

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {SEGMENTS.map((segment, i) => (
              <Reveal
                as="li"
                key={segment.key}
                delay={((i % 3) + 1) as 1 | 2 | 3}
              >
                <article className="group relative h-full rounded-3xl overflow-hidden bg-olive-100 aspect-[5/6]">
                  <Image
                    src={segment.image}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                    className="object-cover tile-image"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-olive-950/85 via-olive-950/35 to-transparent"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7 text-cream-50">
                    <p className="text-xs font-semibold tabular-nums tracking-[0.2em] text-cream-200/70">
                      0{i + 1}
                    </p>
                    <h3 className="mt-2 font-display text-xl sm:text-2xl leading-tight">
                      {t(`segments.${segment.key}.title`)}
                    </h3>
                    <p className="mt-3 text-sm text-cream-100/85 leading-relaxed">
                      {t(`segments.${segment.key}.body`)}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Pilot program — full-bleed dark */}
      <section className="relative bg-olive-950 text-cream-50 overflow-hidden">
        <div aria-hidden className="absolute inset-0 opacity-15">
          <Image
            src="/images/process/process-orchard.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-olive-950 via-olive-950/90 to-olive-950/70"
        />
        <Container className="relative py-20 sm:py-24 lg:py-28">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <Reveal className="lg:col-span-6">
              <Pill className="border-cream-100/30 text-cream-100/85">
                {t('pilotEyebrow')}
              </Pill>
              <h2 className="headline-lg mt-6 text-cream-50">{t('pilotTitle')}</h2>
              <p className="mt-7 text-lg text-cream-100/85 leading-relaxed max-w-xl">
                {t('pilotBody')}
              </p>
              <div className="mt-10">
                <Button as={Link} href="/contact" variant="inverse" size="lg">
                  {t('pilotCta')}
                  <span aria-hidden>→</span>
                </Button>
              </div>
            </Reveal>

            <Reveal delay={1} className="lg:col-span-6 lg:pl-12">
              <ul className="space-y-1">
                {benefits.map((benefit, i) => (
                  <li
                    key={i}
                    className="flex items-baseline gap-5 py-5 border-b border-cream-100/15"
                  >
                    <span className="text-cream-200/40 text-xs font-medium tabular-nums shrink-0 w-8">
                      0{i + 1}
                    </span>
                    <span className="text-cream-100/95 text-base sm:text-lg leading-relaxed">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Verifiable commitments */}
      <Section tone="paper">
        <Container>
          <Reveal className="max-w-2xl mb-14">
            <Eyebrow>{t('commitmentsEyebrow')}</Eyebrow>
            <h2 className="headline-md mt-6 text-olive-900">
              {t('commitmentsTitle')}
            </h2>
          </Reveal>

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-olive-100 rounded-3xl overflow-hidden border border-olive-100">
            {commitments.map((c, i) => (
              <Reveal
                as="li"
                key={i}
                delay={((i % 3) + 1) as 1 | 2 | 3}
                className="bg-paper p-7 sm:p-8 flex flex-col gap-4 min-h-[14rem]"
              >
                <p className="font-display text-4xl sm:text-5xl text-olive-900 tracking-tight">
                  {c.value}
                </p>
                <p className="text-sm text-olive-700/85 leading-relaxed">
                  {c.label}
                </p>
              </Reveal>
            ))}
          </ul>

          <Reveal className="mt-16 flex flex-wrap items-center gap-4">
            <Button as={Link} href="/contact" variant="warm" size="lg">
              {t('pilotCta')}
              <span aria-hidden>→</span>
            </Button>
            <Button as={Link} href="/pourquoi-nous" variant="ghost" size="lg">
              {tCta('browseCatalog')}
            </Button>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
