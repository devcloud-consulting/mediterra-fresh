import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { siteConfig } from '@/lib/site';
import { products } from '@/lib/products';

const ROUTES = [
  '',
  '/catalogue',
  '/pourquoi-nous',
  '/references',
  '/blog',
  '/contact',
  '/mentions-legales',
  '/politique-confidentialite',
  '/cgv',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const buildAlternates = (route: string) => ({
    languages: Object.fromEntries(
      routing.locales.map((l) => [l, `${siteConfig.url}/${l}${route}`]),
    ),
  });

  const staticEntries = routing.locales.flatMap((locale) =>
    ROUTES.map((route) => ({
      url: `${siteConfig.url}/${locale}${route}`,
      lastModified: now,
      changeFrequency: route === '' ? ('weekly' as const) : ('monthly' as const),
      priority: route === '' ? 1 : 0.7,
      alternates: buildAlternates(route),
    })),
  );

  const productEntries = routing.locales.flatMap((locale) =>
    products.map((product) => ({
      url: `${siteConfig.url}/${locale}/catalogue/${product.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
      alternates: buildAlternates(`/catalogue/${product.slug}`),
    })),
  );

  return [...staticEntries, ...productEntries];
}
