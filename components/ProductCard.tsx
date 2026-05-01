import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { categoryImage, type Product, type Locale } from '@/lib/products';

type Props = {
  product: Product;
  locale: Locale;
  currentMonth: number;
  index?: number;
  /** When false, the card is rendered without a link wrapper (for nested-link contexts). */
  linked?: boolean;
};

export function ProductCard({
  product,
  locale,
  currentMonth,
  index = 0,
  linked = true,
}: Props) {
  const t = useTranslations('catalogue');
  const isInSeason = product.seasonality.includes(currentMonth);
  const accent = product.accent ?? '#5b722c';
  const image = categoryImage(product.category);

  return (
    <article
      className="group relative rounded-3xl border border-olive-100 bg-white overflow-hidden shadow-sm shadow-olive-900/[0.03] hover:border-olive-200 hover:shadow-[0_18px_40px_-18px_rgba(58,71,32,0.25)] hover:-translate-y-0.5 transition-all duration-300 flex flex-col"
      style={{ ['--accent-color' as string]: accent }}
    >
      <span
        aria-hidden
        className="absolute top-0 inset-x-0 h-[3px] origin-left rtl:origin-right scale-x-0 group-hover:scale-x-100 group-focus-within:scale-x-100 transition-transform duration-500 ease-out z-10"
        style={{ background: 'var(--accent-color)' }}
      />
      {linked && (
        <Link
          href={`/catalogue/${product.slug}`}
          className="absolute inset-0 z-10 rounded-3xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive-700"
          aria-label={product.name[locale]}
        >
          <span className="sr-only">{product.name[locale]}</span>
        </Link>
      )}
      <div
        className="aspect-[4/3] relative overflow-hidden bg-olive-100"
      >
        {image ? (
          <Image
            src={image}
            alt={product.name[locale]}
            fill
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 25vw"
            className="object-cover tile-image"
            // category images repeat across products — only prioritise the first 4 viewable.
            priority={index < 4}
          />
        ) : (
          <div className="absolute inset-0 product-placeholder" aria-hidden="true" />
        )}
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-olive-950/35 to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
        <div className="absolute top-3 end-3 flex flex-col gap-1.5 items-end">
          {isInSeason && (
            <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-full bg-olive-700/95 text-white backdrop-blur">
              {t('labels.availableNow')}
            </span>
          )}
          {product.organic && (
            <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-full bg-emerald-700/95 text-white backdrop-blur">
              {t('labels.organic')}
            </span>
          )}
          {product.globalgap && (
            <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-full bg-cream-50/95 text-olive-800 backdrop-blur">
              {t('labels.globalgap')}
            </span>
          )}
        </div>
      </div>

      <div className="p-6 flex flex-col gap-3 flex-1">
        <h3 className="font-display text-[1.25rem] text-olive-900 leading-snug">
          {product.name[locale]}
        </h3>

        <dl className="grid grid-cols-1 gap-1.5 text-xs">
          <Row label={t('labels.origin')} value={product.origin[locale]} />
          <Row label={t('labels.calibres')} value={product.calibres.join(' · ')} />
          <Row label={t('labels.packaging')} value={product.packaging[locale]} />
        </dl>

        <SeasonalityBar months={product.seasonality} currentMonth={currentMonth} />
      </div>
    </article>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-3">
      <dt className="text-olive-600/80 font-medium uppercase tracking-wider text-[10px] mt-0.5 shrink-0 w-20">
        {label}
      </dt>
      <dd className="text-olive-800">{value}</dd>
    </div>
  );
}

function SeasonalityBar({ months, currentMonth }: { months: number[]; currentMonth: number }) {
  const t = useTranslations('catalogue');
  return (
    <div className="mt-2">
      <p className="text-[10px] uppercase tracking-wider text-olive-600/80 font-medium mb-1.5">
        {t('labels.seasonality')}
      </p>
      <div className="grid grid-cols-12 gap-px overflow-hidden rounded-md">
        {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => {
          const active = months.includes(m);
          const isCurrent = m === currentMonth;
          return (
            <div
              key={m}
              className={`h-2.5 ${
                active
                  ? isCurrent
                    ? 'bg-terracotta-500'
                    : 'bg-olive-500'
                  : 'bg-olive-100'
              }`}
              title={`${t(`months.${m}` as never)}${active ? ' ✓' : ''}`}
            />
          );
        })}
      </div>
      <div className="grid grid-cols-12 gap-px mt-1 text-[9px] text-olive-600/70 text-center font-medium">
        {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
          <span key={m}>{t(`months.${m}` as never).charAt(0)}</span>
        ))}
      </div>
    </div>
  );
}
