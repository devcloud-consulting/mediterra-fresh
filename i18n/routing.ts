import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['fr', 'en', 'ar'] as const,
  defaultLocale: 'fr',
  localePrefix: 'always',
});

export type Locale = (typeof routing.locales)[number];

export function hasLocale(locales: readonly string[], value: unknown): value is Locale {
  return typeof value === 'string' && locales.includes(value);
}

export const localeMeta: Record<Locale, { label: string; dir: 'ltr' | 'rtl'; htmlLang: string }> = {
  fr: { label: 'Français', dir: 'ltr', htmlLang: 'fr-MA' },
  en: { label: 'English', dir: 'ltr', htmlLang: 'en' },
  ar: { label: 'العربية', dir: 'rtl', htmlLang: 'ar-MA' },
};
