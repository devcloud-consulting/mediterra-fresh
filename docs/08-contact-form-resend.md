# Contact form — Resend transport (System 1, brand domain only)

> **Scope.** This document covers **only** the website's inbound contact
> form on `mediterra-fresh.com` (System 1). It is **not** about the cold
> outreach campaign. If you have not yet read
> [`00-architecture-two-systems.md`](./00-architecture-two-systems.md), read
> it before this one — confusing the two domains is the most damaging
> mistake you can make at this stage.

## What this is

When a visitor submits the form at `/contact`, the API route
`app/api/contact/route.ts` validates the payload and asks Resend to send a
**single transactional email** to `contact@mediterra-fresh.com`, with the
visitor's address as `Reply-To`. That's it.

Volume: roughly 5–20 emails per month at steady state. Engagement: excellent
(every send is requested by a human filling a form). Spam complaint risk:
essentially zero. The brand domain stays clean for as long as you keep
*outbound campaign* sending off it (see doc 00).

## What this is NOT

This is **not** the tool you use to send cold outreach to hotels, riads,
restaurants, or anyone else who hasn't asked to hear from you.

- For cold outreach, use **Instantly** or **Smartlead** connected to
  Google Workspace mailboxes on the **separate** `mediterra-fresh.co`
  domain — see [`03-dns-setup-spf-dkim-dmarc.md`](./03-dns-setup-spf-dkim-dmarc.md)
  and [`04-domain-warmup-schedule.md`](./04-domain-warmup-schedule.md).
- Resend is a transactional API. Sending cold campaigns through it would
  (a) violate Resend's TOS and (b) torch the reputation of `mediterra-fresh.com`
  for everyone — including the customers who are paying you.

## Why Resend (for System 1)

- Modern, developer-first transactional email API.
- Free tier: **3 000 emails/month, 100/day** — comfortably enough for the
  early-stage volume we expect from the contact form.
- Native domain verification flow with DKIM/SPF/DMARC instructions.
- Excellent deliverability when the domain is correctly authenticated.
- Drop-in alternatives if needed later: **Postmark** (better for *purely*
  transactional pricing), **AWS SES** (cheapest at scale, more setup).

## One-time setup

### 1. Create the Resend account

1. Sign up at <https://resend.com> using `contact@mediterra-fresh.com`.
2. Enable 2-factor authentication on the account.

### 2. Add and verify the sending domain

1. In **Domains → Add Domain**, type `mediterra-fresh.com`.
2. Resend gives you 3 to 4 DNS records to add at your registrar / DNS host:
   - `MX` record for the bounce processing (Return-Path) sub-domain.
   - `TXT` record for SPF (`v=spf1 include:amazonses.com ~all`-style).
   - `TXT` record for DKIM (`resend._domainkey.mediterra-fresh.com`).
   - Optional: `TXT` record for DMARC (`_dmarc.mediterra-fresh.com`).
3. Wait until each record shows **Verified** in the Resend UI.
4. (Recommended) Enable **Click Tracking: Off** and **Open Tracking: Off** —
   we want clean, transactional headers, not marketing pixels.

> **DMARC.** Use `v=DMARC1; p=none; rua=mailto:dmarc@mediterra-fresh.com; aspf=s;`
> on the first 30 days, then upgrade to `p=quarantine` once you confirm there
> are no false positives.

### 3. Generate the API key

1. **API Keys → Create API Key**.
2. Permission: **Sending access** (not full access).
3. Domain: `mediterra-fresh.com` (single-domain key — least privilege).
4. Copy the key once — you cannot see it again.

### 4. Set the environment variables

Locally:

```bash
cp .env.example .env.local
# then fill RESEND_API_KEY and the addresses
```

On Vercel (or any host):

| Key | Value |
|-----|-------|
| `NEXT_PUBLIC_SITE_URL` | `https://mediterra-fresh.com` |
| `RESEND_API_KEY` | `re_…` (from the step above) |
| `CONTACT_EMAIL_TO` | `contact@mediterra-fresh.com` |
| `CONTACT_EMAIL_FROM` | `Mediterra Fresh <hello@mediterra-fresh.com>` |

Set them on **Production**, **Preview** and **Development** environments.
After updating env vars on Vercel, **redeploy** (env changes only take effect
on the next build for static parts; the API route picks them up immediately).

## Behaviour

| Scenario | Response |
|----------|----------|
| Honeypot (`company_website`) was filled | `200 OK`, but discarded (no email sent). |
| Validation failed (Zod) | `422` with `{ error, issues }`. |
| Same IP > 5 submissions in 10 minutes | `429` with `Retry-After`. |
| `RESEND_API_KEY` missing | `200 OK`, payload logged to `console.warn` (dev mode fallback). |
| Resend returns an error | `502` with a generic message; full error logged server-side. |
| Success | `200 OK` with the Resend message id. |

The response is always JSON. The client `ContactForm` shows a success state on
2xx and an error message on the rest.

## Operational checklist

- **Monitor deliverability**: check Resend dashboard once a week for bounces /
  complaints. Anything > 1% bounce or > 0.1% complaint is a problem.
- **Forward `dmarc@…` reports** to a shared inbox or to a tool like
  Postmark's free DMARC monitor (<https://dmarc.postmarkapp.com>).
- **Test the form monthly** by submitting a real (non-spam) message from a
  personal address and verifying the email arrives in < 30 s.
- **Spam triage**: if you start receiving form spam despite the honeypot,
  enable a hCaptcha or Cloudflare Turnstile gate — both have free tiers and
  add ~5 lines of client + server code.

## Switching transports later

The route handler in `app/api/contact/route.ts` is the only place that knows
about Resend. To swap to **Postmark** or **AWS SES**, replace the `Resend`
client with the corresponding SDK and adjust the `from` / `to` payload shape.
The schema, rate-limit and HTML template stay identical.
