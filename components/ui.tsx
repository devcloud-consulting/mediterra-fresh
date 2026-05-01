import { type ReactNode, type ElementType, type ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';

export function Container({
  children,
  className,
  size = 'default',
}: {
  children: ReactNode;
  className?: string;
  size?: 'default' | 'narrow' | 'wide';
}) {
  return (
    <div
      className={clsx(
        'mx-auto px-4 sm:px-6 lg:px-8',
        size === 'narrow' && 'max-w-3xl',
        size === 'default' && 'max-w-7xl',
        size === 'wide' && 'max-w-8xl',
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Section({
  children,
  className,
  tone = 'default',
  id,
}: {
  children: ReactNode;
  className?: string;
  tone?: 'default' | 'cream' | 'paper' | 'olive' | 'dark';
  id?: string;
}) {
  return (
    <section
      id={id}
      className={clsx(
        'py-20 sm:py-24 lg:py-32',
        tone === 'cream' && 'bg-cream-50',
        tone === 'paper' && 'bg-paper',
        tone === 'olive' && 'bg-olive-50/60',
        tone === 'dark' && 'bg-olive-900 text-cream-100',
        className,
      )}
    >
      {children}
    </section>
  );
}

export function Eyebrow({
  children,
  className,
  tone = 'default',
}: {
  children: ReactNode;
  className?: string;
  tone?: 'default' | 'light';
}) {
  return (
    <p
      className={clsx(
        'eyebrow section-rule',
        tone === 'default' ? 'text-terracotta-600' : 'text-cream-200/85',
        className,
      )}
    >
      {children}
    </p>
  );
}

type ButtonProps<T extends ElementType> = {
  as?: T;
  variant?: 'primary' | 'secondary' | 'ghost' | 'warm' | 'inverse';
  size?: 'md' | 'lg';
  className?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className'>;

export function Button<T extends ElementType = 'button'>({
  as,
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...rest
}: ButtonProps<T>) {
  const Component = (as || 'button') as ElementType;
  return (
    <Component
      className={clsx(
        'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-60 disabled:cursor-not-allowed',
        size === 'md' && 'text-sm px-5 py-2.5',
        size === 'lg' && 'text-[0.95rem] px-7 py-3.5',
        variant === 'primary' &&
          'bg-olive-800 text-white hover:bg-olive-900 focus-visible:outline-olive-700',
        variant === 'secondary' &&
          'bg-transparent text-olive-900 border border-olive-300 hover:bg-olive-50 hover:border-olive-500 focus-visible:outline-olive-700',
        variant === 'warm' &&
          'bg-terracotta-600 text-white hover:bg-terracotta-700 focus-visible:outline-terracotta-600',
        variant === 'inverse' &&
          'bg-cream-50 text-olive-900 hover:bg-white focus-visible:outline-white',
        variant === 'ghost' &&
          'text-olive-800 hover:bg-olive-50 focus-visible:outline-olive-700',
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}

export function Card({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        'rounded-3xl border border-olive-100 bg-white p-7 shadow-sm shadow-olive-900/[0.03]',
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Pill({
  children,
  className,
  tone = 'default',
}: {
  children: ReactNode;
  className?: string;
  tone?: 'default' | 'light' | 'warm';
}) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-wider',
        tone === 'default' && 'bg-olive-50 text-olive-700 border border-olive-100',
        tone === 'light' && 'bg-white/12 text-cream-50 backdrop-blur-md border border-white/20',
        tone === 'warm' && 'bg-terracotta-50 text-terracotta-700 border border-terracotta-100',
        className,
      )}
    >
      {children}
    </span>
  );
}
