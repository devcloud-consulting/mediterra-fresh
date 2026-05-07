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
  const t = await getTranslations({ locale, namespace: 'blog' });
  return { title: t('title'), description: t('subtitle') };
}

const PLACEHOLDER_POSTS = [
  {
    slug: 'calendrier-saisonnier-printemps',
    image: '/images/categories/cat-fruits.jpg',
    category: 'seasonality',
    minutes: 6,
    fr: {
      title: 'Calendrier saisonnier — printemps au Maroc',
      excerpt:
        'Fraises de Larache, asperges du Gharb, premières mangues : ce que vos chefs devraient mettre à la carte ce printemps.',
    },
    en: {
      title: 'Seasonal calendar — spring in Morocco',
      excerpt:
        'Larache strawberries, Gharb asparagus, first mangoes: what your chefs should put on the menu this spring.',
    },
    ar: {
      title: 'تقويم الموسم — الربيع بالمغرب',
      excerpt:
        'فراولة العرائش، هليون الغرب، أول موجة مانجو: ما يجب على طهاتك إدراجه في القائمة هذا الربيع.',
    },
  },
  {
    slug: 'haute-saison-touristique-marrakech',
    image: '/images/process/process-coldroom.jpg',
    category: 'supply',
    minutes: 8,
    fr: {
      title: 'Haute saison à Marrakech : préparer ses approvisionnements',
      excerpt:
        "Comment lisser les pics de demande pendant Pâques, mai et la rentrée 2025 sans rupture en cuisine.",
    },
    en: {
      title: 'High season in Marrakech: getting your supply right',
      excerpt:
        'How to smooth out demand peaks during Easter, May, and the autumn rebound without a kitchen stockout.',
    },
    ar: {
      title: 'الموسم العالي في مراكش: التحضير للتوريد',
      excerpt: 'كيف نخفف ذروات الطلب خلال عيد الفصح وماي والدخول دون نفاد في المطبخ.',
    },
  },
  {
    slug: 'calibres-pour-petit-dejeuner-riad',
    image: '/images/categories/cat-fruits.jpg',
    category: 'calibres',
    minutes: 5,
    fr: {
      title: 'Quel calibre choisir pour les buffets de petit-déjeuner ?',
      excerpt:
        'Le bon calibre par produit pour vos plateaux : visuel impeccable, perte minimale, coût matière maîtrisé.',
    },
    en: {
      title: 'Which calibres for your breakfast buffet?',
      excerpt:
        'The right calibre by product for your platters: pristine visual, minimal waste, controlled food cost.',
    },
    ar: {
      title: 'أي مقاس لفطور الفطور؟',
      excerpt: 'المقاس المناسب لكل منتج: مظهر ممتاز، خسارة أقل، كلفة مواد مضبوطة.',
    },
  },
] as const;

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const safeLocale = locale as 'fr' | 'en' | 'ar';

  const t = await getTranslations('blog');
  const tCta = await getTranslations('cta');

  return (
    <>
      {/* Editorial header */}
      <section className="relative bg-paper">
        <Container className="py-16 sm:py-20">
          <Reveal className="max-w-3xl">
            <Eyebrow>{t('subtitle')}</Eyebrow>
            <h1 className="headline-lg mt-5 text-olive-900">{t('title')}</h1>
          </Reveal>
        </Container>
      </section>

      {/* Posts grid */}
      <Section tone="cream" className="pt-12 sm:pt-16">
        <Container>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {PLACEHOLDER_POSTS.map((post, i) => (
              <Reveal as="li" delay={((i % 3) + 1) as 1 | 2 | 3} key={post.slug}>
                <article className="group h-full flex flex-col">
                  <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-olive-100">
                    <Image
                      src={post.image}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 90vw, 30vw"
                      className="object-cover tile-image"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-olive-950/30 to-transparent opacity-50 group-hover:opacity-25 transition-opacity"
                    />
                    <div className="absolute top-4 start-4">
                      <Pill tone="light">
                        {t(`categories.${post.category}` as never)}
                      </Pill>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center gap-3 text-xs uppercase tracking-[0.18em] font-medium text-olive-600/80">
                    <span className="text-terracotta-600">{t('comingSoon')}</span>
                    <span aria-hidden className="text-olive-300">·</span>
                    <span className="tabular-nums text-olive-700">
                      {post.minutes} {t('minutes')}
                    </span>
                  </div>

                  <h2 className="mt-3 font-display text-[1.55rem] sm:text-[1.7rem] text-olive-900 leading-tight">
                    {post[safeLocale].title}
                  </h2>
                  <p className="mt-4 text-sm sm:text-base text-olive-700/85 leading-relaxed flex-1">
                    {post[safeLocale].excerpt}
                  </p>
                </article>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Newsletter callout */}
      <section className="relative bg-olive-950 text-cream-50 overflow-hidden">
        <div aria-hidden className="absolute inset-0 opacity-15">
          <Image
            src="/images/categories/cat-legumes.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-olive-950 via-olive-950/90 to-olive-950/60"
        />
        <Container className="relative py-20 sm:py-24">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <Reveal className="lg:col-span-7">
              <Pill className="border-cream-100/30 text-cream-100/85">
                {t('comingSoon')}
              </Pill>
              <h2 className="headline-md mt-6 text-cream-50">
                {t('newsletterTitle')}
              </h2>
              <p className="mt-6 text-lg text-cream-100/85 leading-relaxed max-w-xl">
                {t('newsletterBody')}
              </p>
            </Reveal>
            <Reveal delay={1} className="lg:col-span-5">
              <div className="flex flex-col sm:flex-row gap-3">
                <Button as={Link} href="/contact" variant="inverse" size="lg" className="grow">
                  {tCta('becomeClient')}
                  <span aria-hidden>→</span>
                </Button>
              </div>
              <p className="mt-4 text-xs text-cream-200/70 tracking-wide">
                Conformité Loi 09-08 · désinscription en un clic.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
