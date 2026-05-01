import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';
import { siteConfig } from '@/lib/site';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// In-memory rate limiter — simple, per-IP, resets on cold start.
// For production traffic above a few hundred submissions per day, swap to
// Upstash Redis or another durable store.
const buckets = new Map<string, { count: number; first: number }>();
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS = 5;

function rateLimit(ip: string) {
  const now = Date.now();
  const bucket = buckets.get(ip);
  if (!bucket || now - bucket.first > WINDOW_MS) {
    buckets.set(ip, { count: 1, first: now });
    return { ok: true };
  }
  if (bucket.count >= MAX_REQUESTS) {
    return {
      ok: false,
      retryAfter: Math.ceil((WINDOW_MS - (now - bucket.first)) / 1000),
    };
  }
  bucket.count += 1;
  return { ok: true };
}

const ContactSchema = z.object({
  name: z.string().trim().min(2).max(120),
  company: z.string().trim().min(2).max(160),
  role: z.string().trim().max(120).optional().default(''),
  city: z.string().trim().max(120).optional().default(''),
  phone: z.string().trim().max(40).optional().default(''),
  email: z.string().trim().email().max(160),
  message: z.string().trim().min(10).max(4000),
  productSlug: z.string().trim().max(80).optional().default(''),
  locale: z.enum(['fr', 'en', 'ar']).optional().default('fr'),
});

function escapeHtml(input: string) {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function buildEmail(data: z.infer<typeof ContactSchema>) {
  const subject = `[Site] Demande de ${data.company || data.name}${
    data.productSlug ? ` — ${data.productSlug}` : ''
  }`;

  const lines = [
    ['Nom', data.name],
    ['Établissement', data.company],
    ['Fonction', data.role],
    ['Ville', data.city],
    ['Téléphone', data.phone],
    ['Email', data.email],
    ['Locale', data.locale],
    ['Référence produit', data.productSlug || '—'],
  ];

  const text =
    lines.map(([k, v]) => `${k}: ${v || '—'}`).join('\n') +
    '\n\nMessage:\n' +
    data.message;

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 640px; margin: 0 auto; color: #1f2a13;">
      <div style="border-bottom: 4px solid #5b722c; padding-bottom: 16px; margin-bottom: 24px;">
        <h1 style="margin: 0; font-size: 20px; color: #3a4720;">Nouvelle demande — Mediterra Fresh</h1>
        <p style="margin: 6px 0 0; color: #6b7156; font-size: 13px;">${escapeHtml(subject)}</p>
      </div>
      <table cellpadding="0" cellspacing="0" style="width: 100%; font-size: 14px; border-collapse: collapse;">
        ${lines
          .map(
            ([k, v]) => `
            <tr>
              <td style="padding: 8px 12px 8px 0; color: #6b7156; text-transform: uppercase; font-size: 11px; letter-spacing: 0.06em; vertical-align: top; width: 38%;">${escapeHtml(k as string)}</td>
              <td style="padding: 8px 0; color: #1f2a13;">${escapeHtml((v as string) || '—')}</td>
            </tr>
          `,
          )
          .join('')}
      </table>
      <div style="margin-top: 24px; padding: 18px 20px; background: #f8f5ec; border-radius: 12px; border: 1px solid #e7e2d4;">
        <p style="margin: 0 0 8px; font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; color: #6b7156;">Message</p>
        <p style="margin: 0; white-space: pre-wrap; line-height: 1.55; color: #1f2a13;">${escapeHtml(
          data.message,
        )}</p>
      </div>
    </div>
  `;

  return { subject, text, html };
}

export async function POST(req: Request) {
  // Rate-limit
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown';
  const rl = rateLimit(ip);
  if (!rl.ok) {
    return NextResponse.json(
      { error: 'Trop de tentatives. Merci de réessayer plus tard.' },
      { status: 429, headers: { 'Retry-After': String(rl.retryAfter ?? 60) } },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
  }

  const parsed = ContactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Champs invalides', issues: parsed.error.flatten() },
      { status: 422 },
    );
  }
  const data = parsed.data;

  const apiKey = process.env.RESEND_API_KEY;
  const from =
    process.env.CONTACT_EMAIL_FROM ?? `Mediterra Fresh <hello@${new URL(siteConfig.url).hostname}>`;
  const to = process.env.CONTACT_EMAIL_TO ?? siteConfig.email;

  if (!apiKey) {
    // Soft failure mode — keep the form working in local dev / preview while
    // surfacing the misconfiguration in server logs.
    console.warn(
      '[contact] RESEND_API_KEY is not set. Logging payload instead of sending.',
      data,
    );
    return NextResponse.json({ ok: true, transport: 'console' });
  }

  const resend = new Resend(apiKey);
  const { subject, text, html } = buildEmail(data);

  try {
    const result = await resend.emails.send({
      from,
      to: [to],
      replyTo: data.email,
      subject,
      text,
      html,
    });
    if (result.error) {
      console.error('[contact] Resend error:', result.error);
      return NextResponse.json(
        { error: "Une erreur s'est produite à l'envoi. Merci de réessayer." },
        { status: 502 },
      );
    }
    return NextResponse.json({ ok: true, id: result.data?.id });
  } catch (err) {
    console.error('[contact] Unexpected error:', err);
    return NextResponse.json(
      { error: 'Erreur inattendue. Merci de réessayer plus tard.' },
      { status: 500 },
    );
  }
}
