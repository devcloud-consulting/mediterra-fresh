'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { routing, localeMeta, type Locale } from '@/i18n/routing';

type Props = { tone?: 'light' | 'dark' };

export function LanguageSwitcher({ tone = 'dark' }: Props) {
  const t = useTranslations('nav');
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function changeLocale(next: Locale) {
    if (next === locale) return;
    const segments = (pathname || '/').split('/');
    if (segments.length > 1 && (routing.locales as readonly string[]).includes(segments[1])) {
      segments[1] = next;
    } else {
      segments.splice(1, 0, next);
    }
    const nextPath = segments.join('/') || `/${next}`;
    startTransition(() => {
      router.replace(nextPath);
    });
  }

  const isLight = tone === 'light';

  return (
    <div
      className={`inline-flex items-center text-xs ${
        isLight ? 'text-cream-100/85' : 'text-olive-700'
      }`}
      role="group"
      aria-label={t('switchLanguage')}
    >
      {routing.locales.map((l, i) => {
        const isActive = l === locale;
        return (
          <span key={l} className="flex items-center">
            {i > 0 && (
              <span aria-hidden className={`mx-1.5 ${isLight ? 'text-cream-100/40' : 'text-olive-300'}`}>·</span>
            )}
            <button
              type="button"
              onClick={() => changeLocale(l)}
              disabled={isPending && !isActive}
              aria-pressed={isActive}
              className={`uppercase font-medium tracking-wider transition-colors ${
                isActive
                  ? isLight
                    ? 'text-cream-50'
                    : 'text-olive-900'
                  : isLight
                    ? 'text-cream-200/70 hover:text-cream-50'
                    : 'text-olive-600 hover:text-olive-900'
              }`}
              title={localeMeta[l].label}
            >
              {l}
            </button>
          </span>
        );
      })}
    </div>
  );
}
