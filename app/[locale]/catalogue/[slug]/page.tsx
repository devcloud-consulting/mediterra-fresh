import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { Container, Section, Eyebrow, Button, Pill } from '@/components/ui';
import { Reveal } from '@/components/Reveal';
import { Link } from '@/i18n/navigation';
import { ProductCard } from '@/components/ProductCard';
import {
  products,
  getProduct,
  relatedProducts,
  categoryImage,
  type Locale,
} from '@/lib/products';
import { routing } from '@/i18n/routing';
import { siteConfig } from '@/lib/site';

export async function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    products.map((product) => ({ locale, slug: product.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: 'Produit introuvable' };

  const safeLocale = locale as Locale;
  const tCat = await getTranslations({ locale, namespace: 'catalogue' });
  const categoryName = tCat(`categories.${product.category}.name` as never);

  const description = `${product.name[safeLocale]} — ${categoryName} · ${product.origin[safeLocale]}. ${siteConfig.tagline[safeLocale]}.`;

  return {
    title: product.name[safeLocale],
    description,
    alternates: {
      canonical: `/${safeLocale}/catalogue/${slug}`,
      languages: {
        'fr-MA': `/fr/catalogue/${slug}`,
        en: `/en/catalogue/${slug}`,
        'ar-MA': `/ar/catalogue/${slug}`,
        'x-default': `/fr/catalogue/${slug}`,
      },
    },
    openGraph: {
      title: `${product.name[safeLocale]} — ${siteConfig.name}`,
      description,
      images: [{ url: categoryImage(product.category) }],
    },
  };
}

const MONTH_KEYS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const;

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const product = getProduct(slug);
  if (!product) notFound();

  const safeLocale = locale as Locale;
  const t = await getTranslations('catalogue');
  const tDetail = await getTranslations('catalogue.detail');
  const tCta = await getTranslations('cta');

  const category = product.category;
  const categoryName = t(`categories.${category}.name` as never);
  const story = t(`categories.${category}.story` as never);
  const uses = t(`categories.${category}.uses` as never);
  const handling = t(`categories.${category}.handling` as never);

  const currentMonth = new Date().getMonth() + 1;
  const isInSeason = product.seasonality.includes(currentMonth);
  const productImage = categoryImage(category);
  const related = relatedProducts(product, 3);
  const accent = product.accent ?? '#5b722c';

  // Build a contact URL with the product reference prefilled in the message field.
  const quoteUrl = `/contact?product=${encodeURIComponent(product.slug)}`;

  // JSON-LD product schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name[safeLocale],
    category: categoryName,
    countryOfOrigin: 'MA',
    brand: { '@type': 'Organization', name: siteConfig.name },
    offers: {
      '@type': 'Offer',
      availability: isInSeason
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      priceCurrency: 'MAD',
      seller: { '@type': 'Organization', name: siteConfig.legalName },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <div className="bg-paper border-b border-olive-100/70">
        <Container className="py-4">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs text-olive-600 tracking-[0.14em] uppercase font-medium"
          >
            <Link href="/catalogue" className="hover:text-olive-900 transition-colors">
              {tDetail('backToCatalogue')}
            </Link>
            <span aria-hidden className="text-olive-300">/</span>
            <span className="text-olive-700">{categoryName}</span>
          </nav>
        </Container>
      </div>

      {/* Hero */}
      <section className="relative bg-paper">
        <Container className="py-12 sm:py-16 lg:py-20">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <Reveal className="lg:col-span-7 order-2 lg:order-1">
              <div className="flex items-center gap-2 flex-wrap">
                <Pill>{categoryName}</Pill>
                {isInSeason ? (
                  <Pill tone="warm">{tDetail('inSeasonNow')}</Pill>
                ) : null}
                {product.organic ? (
                  <Pill className="bg-emerald-50 border-emerald-100 text-emerald-800">
                    {t('labels.organic')}
                  </Pill>
                ) : null}
                {product.globalgap ? (
                  <Pill>{t('labels.globalgap')}</Pill>
                ) : null}
              </div>
              <h1 className="mt-6 font-display text-[2.5rem] sm:text-[3.25rem] lg:text-[4rem] leading-[1.05] text-olive-900 tracking-tight">
                {product.name[safeLocale]}
              </h1>
              <p className="mt-6 text-lg text-olive-700/85 leading-relaxed max-w-xl">
                {story}
              </p>

              <div className="mt-10 flex flex-wrap gap-3">
                <Button as={Link} href={quoteUrl} variant="warm" size="lg">
                  {tDetail('quoteThisProduct')}
                  <span aria-hidden>→</span>
                </Button>
                <Button
                  as="a"
                  href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
                    `Bonjour, je souhaite un devis pour : ${product.name.fr} (${product.slug}).`,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="secondary"
                  size="lg"
                >
                  {tCta('whatsapp')}
                </Button>
              </div>
            </Reveal>

            <Reveal delay={1} className="lg:col-span-5 order-1 lg:order-2">
              <div
                className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-olive-100"
                style={{ ['--accent-color' as string]: accent }}
              >
                <Image
                  src={productImage}
                  alt={product.name[safeLocale]}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover tile-image"
                  priority
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-olive-950/30 to-transparent"
                />
                <span
                  aria-hidden
                  className="absolute top-0 inset-x-0 h-1"
                  style={{ background: 'var(--accent-color)' }}
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Specs + content blocks */}
      <Section tone="cream" className="pt-12 sm:pt-16">
        <Container>
          <div className="grid lg:grid-cols-12 gap-12">
            {/* Sticky spec card */}
            <Reveal className="lg:col-span-4">
              <div className="lg:sticky lg:top-24">
                <div className="rounded-3xl border border-olive-100 bg-white p-7 sm:p-8 shadow-sm shadow-olive-900/[0.04]">
                  <p className="eyebrow text-olive-600">{tDetail('specs')}</p>
                  <dl className="mt-6 divide-y divide-olive-100">
                    <SpecRow label={t('labels.origin')} value={product.origin[safeLocale]} />
                    <SpecRow label={t('labels.calibres')} value={product.calibres.join(' · ')} />
                    <SpecRow label={t('labels.packaging')} value={product.packaging[safeLocale]} />
                    <SpecRow
                      label={tDetail('seasonality')}
                      value={product.seasonality
                        .map((m) => t(`months.${m}` as never))
                        .join(' · ')}
                    />
                  </dl>

                  <div className="mt-7 pt-6 border-t border-olive-100">
                    <p className="eyebrow text-olive-600 mb-3">
                      {tDetail('seasonality')}
                    </p>
                    <SeasonalityCalendar
                      months={product.seasonality}
                      currentMonth={currentMonth}
                      labels={MONTH_KEYS.map((m) =>
                        t(`months.${m}` as never).charAt(0),
                      )}
                    />
                  </div>

                  <Button
                    as={Link}
                    href={quoteUrl}
                    variant="primary"
                    className="mt-8 w-full"
                    size="lg"
                  >
                    {tDetail('quoteThisProduct')}
                    <span aria-hidden>→</span>
                  </Button>
                </div>
              </div>
            </Reveal>

            {/* Long-form content */}
            <div className="lg:col-span-8 space-y-14">
              <Reveal>
                <ContentBlock title={tDetail('uses')} body={uses} index={1} />
              </Reveal>
              <Reveal delay={1}>
                <ContentBlock title={tDetail('handling')} body={handling} index={2} />
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* Related products */}
      {related.length > 0 && (
        <Section tone="paper">
          <Container>
            <Reveal className="mb-10">
              <Eyebrow>{categoryName}</Eyebrow>
              <h2 className="headline-md mt-5 text-olive-900">
                {tDetail('related')}
              </h2>
            </Reveal>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {related.map((rel, i) => (
                <Reveal as="li" key={rel.slug} delay={((i % 3) + 1) as 1 | 2 | 3}>
                  <ProductCard
                    product={rel}
                    locale={safeLocale}
                    currentMonth={currentMonth}
                    index={i}
                  />
                </Reveal>
              ))}
            </ul>
          </Container>
        </Section>
      )}
    </>
  );
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="py-3 first:pt-0 last:pb-0">
      <dt className="text-[10px] uppercase tracking-[0.18em] font-semibold text-olive-600/85">
        {label}
      </dt>
      <dd className="mt-1 text-sm text-olive-800 leading-relaxed">{value}</dd>
    </div>
  );
}

function ContentBlock({
  title,
  body,
  index,
}: {
  title: string;
  body: string;
  index: number;
}) {
  return (
    <div className="border-t border-olive-200 pt-8">
      <p className="text-xs tracking-[0.22em] uppercase font-medium tabular-nums text-olive-600/80">
        0{index} — {title}
      </p>
      <p className="mt-5 text-xl sm:text-2xl font-display text-olive-900 leading-snug max-w-2xl">
        {body}
      </p>
    </div>
  );
}

function SeasonalityCalendar({
  months,
  currentMonth,
  labels,
}: {
  months: number[];
  currentMonth: number;
  labels: string[];
}) {
  return (
    <>
      <div className="grid grid-cols-12 gap-px overflow-hidden rounded-md">
        {MONTH_KEYS.map((m) => {
          const active = months.includes(m);
          const isCurrent = m === currentMonth;
          return (
            <div
              key={m}
              className={`h-3 ${
                active
                  ? isCurrent
                    ? 'bg-terracotta-500'
                    : 'bg-olive-500'
                  : 'bg-olive-100'
              }`}
            />
          );
        })}
      </div>
      <div className="grid grid-cols-12 gap-px mt-1.5 text-[10px] text-olive-600/80 text-center font-medium">
        {labels.map((label, i) => (
          <span key={i}>{label}</span>
        ))}
      </div>
    </>
  );
}
