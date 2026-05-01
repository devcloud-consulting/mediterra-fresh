'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Button } from './ui';

type FormState = 'idle' | 'sending' | 'success' | 'error';

export function ContactForm() {
  const t = useTranslations('contact.form');
  const [state, setState] = useState<FormState>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const searchParams = useSearchParams();

  // Prefill the message field if the user arrives from a product page
  // with /contact?product=<slug>
  const productSlug = searchParams?.get('product') ?? '';
  const productMessage = productSlug
    ? `Je souhaite recevoir un devis pour la référence : ${productSlug.replace(/-/g, ' ')}.\n\nVolume estimé : \nFréquence : `
    : '';

  // We have to keep prefill text in state so React can hydrate it after the
  // searchParams come from the client.
  const [messagePrefill, setMessagePrefill] = useState(productMessage);
  useEffect(() => {
    setMessagePrefill(productMessage);
  }, [productMessage]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState('sending');
    setErrorMessage(null);
    const fd = new FormData(e.currentTarget);

    // Honeypot — bots fill hidden fields. Pretend to succeed but discard.
    if (fd.get('company_website')) {
      setState('success');
      return;
    }

    const payload = {
      name: String(fd.get('name') || ''),
      company: String(fd.get('company') || ''),
      role: String(fd.get('role') || ''),
      city: String(fd.get('city') || ''),
      phone: String(fd.get('phone') || ''),
      email: String(fd.get('email') || ''),
      message: String(fd.get('message') || ''),
      productSlug,
      locale:
        typeof document !== 'undefined'
          ? document.documentElement.lang || 'fr'
          : 'fr',
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setErrorMessage(data?.error ?? null);
        setState('error');
        return;
      }
      setState('success');
    } catch {
      setState('error');
    }
  }

  if (state === 'success') {
    return (
      <div
        role="status"
        className="rounded-2xl border border-olive-200 bg-olive-50/80 p-7 text-olive-800"
      >
        <p className="font-display text-xl text-olive-900">Merci.</p>
        <p className="mt-2 text-olive-700">{t('success')}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6">
        <Field name="name" label={t('name')} required autoComplete="name" />
        <Field
          name="company"
          label={t('company')}
          required
          autoComplete="organization"
        />
        <Field name="role" label={t('role')} autoComplete="organization-title" />
        <Field name="city" label={t('city')} autoComplete="address-level2" />
        <Field name="phone" label={t('phone')} type="tel" autoComplete="tel" />
        <Field
          name="email"
          label={t('email')}
          type="email"
          required
          autoComplete="email"
        />
      </div>

      <Field
        as="textarea"
        name="message"
        label={t('message')}
        required
        rows={5}
        defaultValue={messagePrefill}
      />

      <div className="hidden" aria-hidden="true">
        <label>
          Company website
          <input type="text" name="company_website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <label className="flex items-start gap-3 text-xs text-olive-700/85 cursor-pointer">
        <span className="relative mt-0.5 inline-flex shrink-0">
          <input
            id="consent"
            name="consent"
            type="checkbox"
            required
            className="peer h-4 w-4 appearance-none rounded border border-olive-300 bg-white checked:border-olive-700 checked:bg-olive-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-olive-500/30"
          />
          <svg
            aria-hidden
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="3"
            className="absolute inset-0 m-auto h-3 w-3 opacity-0 peer-checked:opacity-100 transition-opacity"
          >
            <path d="M5 12l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <span className="leading-relaxed">{t('consent')}</span>
      </label>

      <div className="flex flex-wrap items-center gap-3 pt-2">
        <Button type="submit" variant="warm" size="lg" disabled={state === 'sending'}>
          {state === 'sending' ? '…' : t('submit')}
          {state !== 'sending' && <span aria-hidden>→</span>}
        </Button>
        {state === 'error' && (
          <p className="text-sm text-terracotta-700">{errorMessage ?? t('error')}</p>
        )}
      </div>
    </form>
  );
}

type FieldProps = {
  name: string;
  label: string;
  required?: boolean;
  autoComplete?: string;
} & (
  | { as?: 'input'; type?: string; rows?: never; defaultValue?: string }
  | { as: 'textarea'; type?: never; rows?: number; defaultValue?: string }
);

function Field({
  name,
  label,
  required,
  autoComplete,
  as = 'input',
  type = 'text',
  rows = 4,
  defaultValue,
}: FieldProps) {
  const baseInput =
    'peer block w-full bg-transparent border-0 border-b border-olive-200 px-0 pt-7 pb-2 text-base text-olive-900 placeholder-transparent focus:border-olive-700 focus:outline-none focus:ring-0 transition-colors';

  return (
    <div className="relative">
      {as === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          required={required}
          rows={rows}
          placeholder={label}
          defaultValue={defaultValue}
          className={baseInput + ' resize-y min-h-[6rem]'}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          required={required}
          autoComplete={autoComplete}
          placeholder={label}
          defaultValue={defaultValue}
          className={baseInput}
        />
      )}
      <FloatingLabel name={name} required={required}>
        {label}
      </FloatingLabel>
    </div>
  );
}

function FloatingLabel({
  name,
  required,
  children,
}: {
  name: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <label
      htmlFor={name}
      className="absolute start-0 top-7 origin-[0_0] text-base text-olive-500 pointer-events-none transition-all
                 peer-placeholder-shown:top-7 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-olive-400/80
                 peer-focus:top-1 peer-focus:scale-[0.78] peer-focus:text-olive-700
                 peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:scale-[0.78] peer-[:not(:placeholder-shown)]:text-olive-700
                 uppercase tracking-[0.18em] text-xs font-medium"
    >
      {children}
      {required && <span className="text-terracotta-600 ms-1">*</span>}
    </label>
  );
}
