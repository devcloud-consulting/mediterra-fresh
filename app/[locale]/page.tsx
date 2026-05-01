import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Container, Section, Eyebrow, Button, Pill } from '@/components/ui';
import { Reveal } from '@/components/Reveal';
import { siteConfig } from '@/lib/site';
import { categories } from '@/lib/products';

const PROCESS_IMAGES = [
  '/images/process/process-orchard.jpg',
  '/images/process/process-coldroom.jpg',
  '/images/process/process-delivery.jpg',
];

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('home');
  const tCat = await getTranslations('catalogue.categories');
  const tCommon = await getTranslations('cta');

  const differentiators = t.raw('differentiators.items') as { title: string; body: string }[];
  const processSteps = t.raw('process.steps') as { tag: string; title: string; body: string }[];

  return (
    <>
      {/* ────────────────────────────  HERO  ──────────────────────────── */}
      <section className="relative isolate min-h-[100svh] flex flex-col text-cream-50 -mt-16 pt-16">
        <Image
          src="/images/hero/hero-flatlay.jpg"
          alt=""
          aria-hidden="true"
          fill
          priority
          sizes="100vw"
          className="object-cover -z-10"
        />
        {/* Dual gradient: deep at the bottom for legibility, soft at the top to keep the image breathing */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-b from-olive-950/55 via-olive-950/35 to-olive-950/85"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 -z-10 h-32 bg-gradient-to-b from-olive-950/65 to-transparent"
        />

        <Container className="relative flex-1 flex flex-col justify-end pb-12 sm:pb-16 lg:pb-20">
          <div className="max-w-4xl">
            <Reveal>
              <Eyebrow tone="light">{t('hero.eyebrow')}</Eyebrow>
            </Reveal>

            <Reveal delay={1}>
              <h1 className="headline-xl mt-7 text-cream-50">
                {t('hero.title')}
              </h1>
            </Reveal>

            <Reveal delay={2}>
              <p className="mt-7 text-lg sm:text-xl text-cream-100/90 leading-relaxed max-w-2xl">
                {t('hero.subtitle')}
              </p>
            </Reveal>

            <Reveal delay={3} className="mt-10 flex flex-wrap items-center gap-3">
              <Button as={Link} href="/contact" size="lg" variant="warm">
                {t('hero.primaryCta')}
                <span aria-hidden>→</span>
              </Button>
              <Button as={Link} href="/catalogue" size="lg" variant="inverse">
                {t('hero.secondaryCta')}
              </Button>
            </Reveal>

            <Reveal delay={4} className="mt-14 flex flex-wrap gap-2.5">
              <Pill tone="light">✶ {t('hero.trustBadges.coldChain')}</Pill>
              <Pill tone="light">✶ {t('hero.trustBadges.dailyDelivery')}</Pill>
              <Pill tone="light">✶ {t('hero.trustBadges.directProducer')}</Pill>
            </Reveal>
          </div>
        </Container>

        {/* Bottom marker / scroll cue */}
        <div className="relative pb-6">
          <Container>
            <div className="flex items-center justify-between text-xs text-cream-100/70 font-medium uppercase tracking-[0.2em]">
              <span>{siteConfig.address.city} · {siteConfig.address.country}</span>
              <span aria-hidden className="hidden sm:inline">↓ {t('process.cta')}</span>
            </div>
          </Container>
        </div>
      </section>

      {/* ──────────────────────  TICKER / SEASONAL  ───────────────────── */}
      <SeasonalTicker locale={locale} />

      {/* ──────────────────────────  VALUE PROP  ──────────────────────── */}
      <Section tone="cream">
        <Container>
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <Reveal as="div" className="lg:col-span-7 order-2 lg:order-1">
              <Eyebrow>{siteConfig.name}</Eyebrow>
              <h2 className="headline-lg mt-5 text-olive-900">{t('valueProp.title')}</h2>
              <p className="mt-7 text-lg text-olive-700/90 leading-relaxed max-w-xl">
                {t('valueProp.body')}
              </p>
              <div className="mt-9 flex items-center gap-6">
                <Link
                  href="/pourquoi-nous"
                  className="text-sm font-medium text-olive-800 hover:text-olive-950 inline-flex items-center gap-1.5 group"
                >
                  <span>{t('process.cta')}</span>
                  <span aria-hidden className="transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5">→</span>
                </Link>
              </div>
            </Reveal>
            <Reveal as="div" delay={1} className="lg:col-span-5 order-1 lg:order-2">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-olive-100">
                <Image
                  src="/images/hero/harvest-hands.jpg"
                  alt={t('valueImageAlt')}
                  fill
                  sizes="(max-width: 1024px) 90vw, 40vw"
                  className="object-cover tile-image"
                />
                <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-olive-950/70 to-transparent">
                  <p className="text-cream-50 text-xs font-medium uppercase tracking-[0.2em]">
                    Souss · Maroc
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ────────────────────────  PROCESS  ─────────────────────────── */}
      <Section tone="dark" className="relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 bg-paper opacity-[0.04]" />
        <Container className="relative">
          <Reveal className="max-w-3xl">
            <Eyebrow tone="light">{t('process.eyebrow')}</Eyebrow>
            <h2 className="headline-lg mt-5 text-cream-50">{t('process.title')}</h2>
            <p className="mt-6 text-cream-100/80 text-lg max-w-2xl leading-relaxed">
              {t('process.subtitle')}
            </p>
          </Reveal>

          <ol className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {processSteps.map((step, i) => (
              <Reveal as="li" delay={(i + 1) as 1 | 2 | 3} key={i} className="group">
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-olive-800/30">
                  <Image
                    src={PROCESS_IMAGES[i]}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 90vw, 30vw"
                    className="object-cover tile-image"
                  />
                  <div className="absolute inset-0 tile-overlay" />
                  <span className="absolute top-4 start-4 text-xs font-medium uppercase tracking-[0.18em] text-cream-50/85">
                    {step.tag}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-2xl text-cream-50 leading-tight">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm text-cream-200/75 leading-relaxed">
                  {step.body}
                </p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      {/* ──────────────────────  CATEGORIES (EDITORIAL) ────────────────── */}
      <Section tone="cream">
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <Reveal>
              <Eyebrow>{t('categories.subtitle')}</Eyebrow>
              <h2 className="headline-lg mt-5 text-olive-900 max-w-xl">
                {t('categories.title')}
              </h2>
            </Reveal>
            <Reveal delay={1}>
              <Link
                href="/catalogue"
                className="text-sm font-medium text-olive-800 hover:text-olive-950 inline-flex items-center gap-1.5 group"
              >
                <span>{t('categories.viewAll')}</span>
                <span aria-hidden className="transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5">→</span>
              </Link>
            </Reveal>
          </div>

          <ul className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {categories.map((c, i) => (
              <Reveal
                as="li"
                delay={((i % 3) + 1) as 1 | 2 | 3}
                key={c.slug}
              >
                <Link
                  href={{ pathname: '/catalogue', hash: c.slug }}
                  className="group relative block aspect-[4/5] rounded-3xl overflow-hidden bg-olive-100"
                >
                  <Image
                    src={c.image}
                    alt={tCat(`${c.slug}.name` as never)}
                    fill
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                    className="object-cover tile-image"
                  />
                  <div className="absolute inset-0 tile-overlay" />
                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                    <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cream-100/80">
                      Catégorie · 0{i + 1}
                    </p>
                    <h3 className="mt-2 font-display text-2xl sm:text-[1.65rem] leading-tight text-cream-50">
                      {tCat(`${c.slug}.name` as never)}
                    </h3>
                    <p className="mt-2 text-sm text-cream-100/85 line-clamp-2 max-w-xs">
                      {tCat(`${c.slug}.description` as never)}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
            {/* Call-to-action tile */}
            <Reveal as="li" delay={1}>
              <Link
                href="/catalogue"
                className="group relative block aspect-[4/5] rounded-3xl overflow-hidden bg-olive-900 text-cream-50 p-7 flex flex-col justify-between"
              >
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cream-100/70">
                  → {t('categories.viewAll')}
                </p>
                <div>
                  <h3 className="font-display text-2xl sm:text-[1.65rem] leading-tight">
                    {t('categories.title')}
                  </h3>
                  <p className="mt-3 text-sm text-cream-100/75 max-w-xs">
                    {t('categories.subtitle')}
                  </p>
                  <span aria-hidden className="mt-6 inline-flex h-10 w-10 items-center justify-center rounded-full border border-cream-100/30 group-hover:border-cream-100/70 group-hover:bg-cream-100/10 transition-all">
                    →
                  </span>
                </div>
              </Link>
            </Reveal>
          </ul>
        </Container>
      </Section>

      {/* ─────────────────────  DIFFERENTIATORS  ───────────────────── */}
      <Section tone="paper">
        <Container>
          <Reveal className="max-w-2xl">
            <Eyebrow>{t('hero.eyebrow')}</Eyebrow>
            <h2 className="headline-lg mt-5 text-olive-900">{t('differentiators.title')}</h2>
          </Reveal>
          <ol className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            {differentiators.map((item, i) => (
              <Reveal
                as="li"
                delay={((i % 4) + 1) as 1 | 2 | 3 | 4}
                key={i}
                className="group border-t border-olive-200/60 pt-6 flex gap-5"
              >
                <span className="font-display text-3xl text-terracotta-600/80 leading-none mt-0.5 shrink-0 tabular-nums">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="font-display text-2xl text-olive-900 leading-snug">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-olive-700/85 leading-relaxed">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      {/* ─────────────────────  TESTIMONIALS / EMPTY  ─────────────────── */}
      <Section>
        <Container size="narrow" className="text-center">
          <Reveal>
            <Eyebrow>{t('testimonialsTitle')}</Eyebrow>
            <p className="mt-7 font-display text-2xl sm:text-3xl text-olive-900 leading-snug">
              &ldquo;{t('testimonialsEmpty')}&rdquo;
            </p>
            <div className="mt-10">
              <Button as={Link} href="/contact" variant="primary" size="lg">
                {tCommon('freeSample')}
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* ───────────────────────  CTA BANNER  ────────────────────────── */}
      <section className="relative overflow-hidden">
        <Image
          src="/images/process/process-orchard.jpg"
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          className="object-cover -z-10"
        />
        <div aria-hidden className="absolute inset-0 -z-10 bg-olive-950/72" />
        <Container className="py-24 sm:py-28 lg:py-32 text-cream-50">
          <Reveal className="max-w-3xl">
            <Eyebrow tone="light">Mediterra Fresh</Eyebrow>
            <h2 className="headline-lg mt-5">{t('ctaBanner.title')}</h2>
            <p className="mt-6 text-cream-100/85 text-lg max-w-xl leading-relaxed">
              {t('ctaBanner.subtitle')}
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button as={Link} href="/contact" variant="warm" size="lg">
                {t('ctaBanner.button')} <span aria-hidden>→</span>
              </Button>
              <Button
                as="a"
                href={`https://wa.me/${siteConfig.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                variant="inverse"
                size="lg"
              >
                {tCommon('whatsapp')}
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}

async function SeasonalTicker({ locale }: { locale: string }) {
  const tCat = await getTranslations({ locale, namespace: 'catalogue' });
  const tCatNames = await getTranslations({ locale, namespace: 'catalogue.categories' });
  const month = new Date().getMonth() + 1;
  const monthLabel = tCat(`months.${month}` as never);

  // pluck a representative item from each category
  const items = categories.map((c) => tCatNames(`${c.slug}.name` as never));
  // duplicate for seamless marquee loop
  const loop = [...items, ...items];

  return (
    <div className="relative bg-olive-900 text-cream-100 border-y border-olive-800/50 overflow-hidden">
      <div className="flex items-center gap-6 py-4 marquee">
        {loop.map((label, i) => (
          <span key={i} className="flex items-center gap-3 shrink-0">
            <span className="text-terracotta-300/80 font-display text-lg leading-none">✻</span>
            <span className="text-sm font-medium tracking-wide whitespace-nowrap">
              {label} <span className="text-cream-200/55 ms-2 uppercase tracking-[0.18em] text-[11px]">{monthLabel}</span>
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
