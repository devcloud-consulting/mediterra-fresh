import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { Container, Section, Eyebrow, Button } from '@/components/ui';
import { Reveal } from '@/components/Reveal';
import { Link } from '@/i18n/navigation';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'export' });
  return { title: t('title'), description: t('subtitle') };
}

const PRODUCTS = [
  { key: 'tomato', icon: '🍅' },
  { key: 'cherry', icon: '🍒' },
  { key: 'cucumber', icon: '🥒' },
  { key: 'pepper', icon: '🌶' },
  { key: 'orange', icon: '🍊' },
  { key: 'avocado', icon: '🥑' },
] as const;

const COMMITMENTS = [
  { key: 'minOrder', icon: '🚛' },
  { key: 'coldChain', icon: '❄' },
  { key: 'compliance', icon: '✓' },
  { key: 'docs', icon: '📑' },
] as const;

const MARKETS = ['france', 'belgium', 'spain', 'netherlands', 'germany', 'uk'] as const;

export default async function ExportPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('export');
  const tCta = await getTranslations('cta');

  return (
    <>
      {/* Hero */}
      <section className="relative bg-paper">
        <Container className="py-16 sm:py-20">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <Reveal className="lg:col-span-7">
              <Eyebrow>{t('eyebrow')}</Eyebrow>
              <h1 className="headline-lg mt-5 text-olive-900">{t('title')}</h1>
              <p className="mt-7 text-lg text-olive-700/85 leading-relaxed max-w-xl">
                {t('subtitle')}
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Button as={Link} href="/contact?type=export" variant="primary">
                  {t('cta.primary')}
                </Button>
                <Button as={Link} href="/catalogue" variant="ghost">
                  {t('cta.secondary')}
                </Button>
              </div>
            </Reveal>
            <Reveal delay={1} className="lg:col-span-5">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-olive-100">
                <Image
                  src="/images/products/tomate-cerise-allongee.jpg"
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                  priority
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Seasonality strip */}
      <Section tone="cream">
        <Container>
          <Reveal>
            <Eyebrow>{t('season.eyebrow')}</Eyebrow>
            <h2 className="headline-md mt-4 max-w-2xl text-olive-900">
              {t('season.title')}
            </h2>
            <p className="mt-4 max-w-2xl text-olive-700/85 leading-relaxed">
              {t('season.body')}
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* Priority products */}
      <Section>
        <Container>
          <Reveal>
            <Eyebrow>{t('products.eyebrow')}</Eyebrow>
            <h2 className="headline-md mt-4 max-w-2xl text-olive-900">
              {t('products.title')}
            </h2>
          </Reveal>
          <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PRODUCTS.map((p, i) => (
              <Reveal key={p.key} delay={(i % 3) as 0 | 1 | 2}>
                <li className="rounded-2xl border border-olive-100 bg-white p-6 h-full">
                  <div className="text-2xl">{p.icon}</div>
                  <h3 className="mt-3 font-display text-xl text-olive-900">
                    {t(`products.items.${p.key}.title`)}
                  </h3>
                  <p className="mt-2 text-sm text-olive-700/85 leading-relaxed">
                    {t(`products.items.${p.key}.body`)}
                  </p>
                </li>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Commitments */}
      <Section tone="cream">
        <Container>
          <Reveal>
            <Eyebrow>{t('commitments.eyebrow')}</Eyebrow>
            <h2 className="headline-md mt-4 max-w-2xl text-olive-900">
              {t('commitments.title')}
            </h2>
          </Reveal>
          <ul className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
            {COMMITMENTS.map((c, i) => (
              <Reveal key={c.key} delay={(i % 3) as 0 | 1 | 2}>
                <li className="rounded-2xl border border-olive-100 bg-white p-6 h-full flex gap-4">
                  <div className="text-3xl shrink-0">{c.icon}</div>
                  <div>
                    <h3 className="font-display text-xl text-olive-900">
                      {t(`commitments.items.${c.key}.title`)}
                    </h3>
                    <p className="mt-2 text-sm text-olive-700/85 leading-relaxed">
                      {t(`commitments.items.${c.key}.body`)}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Target markets */}
      <Section>
        <Container>
          <Reveal>
            <Eyebrow>{t('markets.eyebrow')}</Eyebrow>
            <h2 className="headline-md mt-4 max-w-2xl text-olive-900">
              {t('markets.title')}
            </h2>
            <p className="mt-4 max-w-2xl text-olive-700/85 leading-relaxed">
              {t('markets.body')}
            </p>
          </Reveal>
          <ul className="mt-8 flex flex-wrap gap-2">
            {MARKETS.map((m) => (
              <li
                key={m}
                className="px-4 py-2 rounded-full bg-olive-50 text-olive-800 text-sm font-medium border border-olive-100"
              >
                {t(`markets.list.${m}`)}
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* CTA */}
      <Section tone="dark">
        <Container>
          <Reveal className="text-center max-w-2xl mx-auto">
            <h2 className="headline-md text-cream-50">{t('ctaSection.title')}</h2>
            <p className="mt-4 text-cream-100/85 leading-relaxed">
              {t('ctaSection.body')}
            </p>
            <div className="mt-8">
              <Button as={Link} href="/contact?type=export" variant="primary">
                {tCta('requestQuote')}
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
