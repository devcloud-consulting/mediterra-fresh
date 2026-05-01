'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { Logo } from './Logo';
import { LanguageSwitcher } from './LanguageSwitcher';
import { siteConfig } from '@/lib/site';

const NAV_ITEMS = [
  { href: '/', key: 'home' },
  { href: '/catalogue', key: 'catalogue' },
  { href: '/pourquoi-nous', key: 'why' },
  { href: '/references', key: 'references' },
  { href: '/blog', key: 'blog' },
  { href: '/contact', key: 'contact' },
] as const;

export function Navigation() {
  const t = useTranslations('nav');
  const tCta = useTranslations('cta');
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when the drawer is open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isHome = pathname === '/';
  const transparent = isHome && !scrolled && !open;

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          transparent
            ? 'bg-transparent border-transparent text-cream-50'
            : 'bg-cream-50/90 backdrop-blur-md border-b border-olive-100 text-olive-900'
        }`}
      >
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <Link href="/" className="shrink-0" aria-label="Mediterra Fresh — accueil">
            <Logo variant={transparent ? 'light' : 'dark'} />
          </Link>

          <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-3.5 py-2 text-sm font-medium transition-colors ${
                    transparent
                      ? isActive
                        ? 'text-cream-50'
                        : 'text-cream-100/80 hover:text-cream-50'
                      : isActive
                        ? 'text-olive-900'
                        : 'text-olive-700 hover:text-olive-900'
                  }`}
                >
                  {t(item.key)}
                  {isActive && (
                    <span
                      aria-hidden
                      className={`absolute -bottom-0.5 left-3.5 right-3.5 h-px ${
                        transparent ? 'bg-cream-50/80' : 'bg-olive-700'
                      }`}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <LanguageSwitcher tone={transparent ? 'light' : 'dark'} />
            <Link
              href="/contact"
              className={`inline-flex items-center gap-1.5 rounded-full text-sm font-medium px-4 py-2 transition-colors ${
                transparent
                  ? 'bg-cream-50 text-olive-900 hover:bg-white'
                  : 'bg-olive-800 hover:bg-olive-900 text-white'
              }`}
            >
              {tCta('requestQuote')}
              <span aria-hidden>→</span>
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden -mr-2 rtl:-ml-2 rtl:mr-0 p-2"
            aria-expanded={open}
            aria-controls="mobile-drawer"
            aria-label={open ? t('close') : t('menu')}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              {open ? (
                <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
              ) : (
                <>
                  <path d="M4 8h16" strokeLinecap="round" />
                  <path d="M4 16h16" strokeLinecap="round" />
                </>
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile drawer — full screen, with imagery and prominent typography */}
      <div
        id="mobile-drawer"
        className={`lg:hidden fixed inset-0 z-50 transition-opacity duration-300 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!open}
      >
        {/* Background image */}
        <div
          className={`absolute inset-0 bg-olive-950 transition-transform duration-500 ${
            open ? 'translate-y-0' : '-translate-y-2'
          }`}
        >
          <div
            aria-hidden
            className="absolute inset-0 bg-[url('/images/hero/hero-flatlay.jpg')] bg-cover bg-center opacity-25"
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-olive-950/85 to-olive-950/95" />
        </div>

        <div className="relative h-full flex flex-col text-cream-50">
          {/* Top bar inside drawer (mirror of nav) */}
          <div className="h-16 flex items-center justify-between px-4 sm:px-6 border-b border-cream-100/10">
            <Link href="/" onClick={() => setOpen(false)} aria-label="Mediterra Fresh — accueil">
              <Logo variant="light" />
            </Link>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t('close')}
              className="p-2 -mr-2 rtl:-ml-2 rtl:mr-0 text-cream-100"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-6 sm:px-10 py-10" aria-label="Mobile">
            <ul className="space-y-1">
              {NAV_ITEMS.map((item, i) => {
                const isActive =
                  item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
                return (
                  <li
                    key={item.href}
                    className={`reveal transition-opacity ${open ? '' : 'opacity-0'}`}
                    data-delay={(i + 1) as 1 | 2 | 3 | 4 | 5}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="group flex items-baseline justify-between py-3 border-b border-cream-100/10"
                    >
                      <span className={`font-display text-3xl sm:text-4xl tracking-tight ${
                        isActive ? 'text-cream-50' : 'text-cream-100/85 group-hover:text-cream-50'
                      }`}>
                        {t(item.key)}
                      </span>
                      <span className="text-cream-200/40 text-xs font-medium tabular-nums">
                        0{i + 1}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="mt-10 flex flex-col gap-3">
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center rounded-full bg-terracotta-600 hover:bg-terracotta-700 text-white text-sm font-medium px-5 py-3.5"
              >
                {tCta('freeSample')}
              </Link>
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center rounded-full bg-cream-50/10 border border-cream-100/20 hover:bg-cream-50/15 text-cream-50 text-sm font-medium px-5 py-3.5"
              >
                {tCta('requestQuote')}
              </Link>
            </div>
          </nav>

          {/* Footer of drawer: language + contact info */}
          <div className="px-6 sm:px-10 py-6 border-t border-cream-100/10 flex items-center justify-between gap-4 text-sm">
            <LanguageSwitcher tone="light" />
            <a
              href={`tel:${siteConfig.phone}`}
              className="text-cream-100/85 hover:text-cream-50 font-medium tabular-nums"
            >
              {siteConfig.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
