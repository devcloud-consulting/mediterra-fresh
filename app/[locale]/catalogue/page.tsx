import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { Container, Section, Eyebrow, Button } from '@/components/ui';
import { Reveal } from '@/components/Reveal';
import { ProductCard } from '@/components/ProductCard';
import { Link } from '@/i18n/navigation';
import { categories, productsByCategory } from '@/lib/products';
import type { Locale } from '@/i18n/routing';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'catalogue' });
  return {
    title: t('title'),
    description: t('subtitle'),
  };
}

export default async function CataloguePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const safeLocale = locale as Locale;

  const t = await getTranslations('catalogue');
  const tCta = await getTranslations('cta');
  const tCat = await getTranslations('catalogue.categories');

  const currentMonth = new Date().getMonth() + 1;

  return (
    <>
      {/* Header — image on the right, copy on the left */}
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
                  src="/images/hero/hero-flatlay.jpg"
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
          {/* Sticky in-page nav */}
          <nav
            aria-label="Catégories"
            className="sticky top-16 z-20 -mx-4 sm:mx-0 mb-16 bg-cream-50/92 backdrop-blur-md border-y sm:border border-olive-100 sm:rounded-full px-4 sm:px-3 py-2.5"
          >
            <ul className="flex gap-1 overflow-x-auto scroll-smooth no-scrollbar">
              {categories.map((c) => (
                <li key={c.slug} className="shrink-0">
                  <a
                    href={`#${c.slug}`}
                    className="inline-block whitespace-nowrap text-sm font-medium px-3.5 py-1.5 rounded-full text-olive-700 hover:bg-olive-50 hover:text-olive-900"
                  >
                    {tCat(`${c.slug}.name` as never)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-24">
            {categories.map((c, ci) => {
              const items = productsByCategory(c.slug);
              return (
                <section key={c.slug} id={c.slug} className="scroll-mt-28">
                  <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-10">
                    <Reveal className="lg:col-span-5">
                      <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-olive-100">
                        <Image
                          src={c.image}
                          alt={tCat(`${c.slug}.name` as never)}
                          fill
                          sizes="(max-width: 1024px) 100vw, 40vw"
                          className="object-cover tile-image"
                        />
                        <div aria-hidden className="absolute inset-0 tile-overlay" />
                        <div className="absolute inset-x-0 bottom-0 p-5">
                          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-cream-100/85">
                            Catégorie · 0{ci + 1}
                          </p>
                        </div>
                      </div>
                    </Reveal>
                    <Reveal delay={1} className="lg:col-span-7">
                      <h2 className="headline-md text-olive-900">
                        {tCat(`${c.slug}.name` as never)}
                      </h2>
                      <p className="mt-4 text-olive-700/85 leading-relaxed max-w-xl">
                        {tCat(`${c.slug}.description` as never)}
                      </p>
                      <p className="mt-3 text-xs uppercase tracking-[0.2em] text-olive-600/70 font-medium">
                        {items.length}{' '}
                        {locale === 'fr' ? 'références' : locale === 'ar' ? 'مرجعاً' : 'SKUs'}
                      </p>
                    </Reveal>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-6">
                    {items.map((p, i) => (
                      <Reveal key={p.slug} delay={((i % 4) + 1) as 1 | 2 | 3 | 4}>
                        <ProductCard
                          product={p}
                          locale={safeLocale}
                          currentMonth={currentMonth}
                          index={i}
                        />
                      </Reveal>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>

          <Reveal className="mt-24 rounded-3xl bg-olive-900 text-cream-50 p-10 sm:p-14 lg:p-16 relative overflow-hidden">
            <Image
              src="/images/process/process-orchard.jpg"
              alt=""
              aria-hidden="true"
              fill
              sizes="100vw"
              className="object-cover -z-10 opacity-25"
            />
            <div aria-hidden className="absolute inset-0 -z-10 bg-olive-950/55" />
            <div className="relative max-w-2xl">
              <Eyebrow tone="light">Mediterra Fresh</Eyebrow>
              <h2 className="headline-lg mt-5">{t('title')}</h2>
              <p className="mt-5 text-cream-100/85 max-w-xl text-lg leading-relaxed">
                {t('subtitle')}
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button as={Link} href="/contact" variant="warm" size="lg">
                  {tCta('freeSample')}
                </Button>
                <Button as={Link} href="/contact" variant="inverse" size="lg">
                  {tCta('requestQuote')}
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
