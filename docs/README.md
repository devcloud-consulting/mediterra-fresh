# Mediterra Fresh — Playbook (site + outreach)

This folder contains the operational documents that complement the website code.
They are written for **Marrakech / Agadir B2B** specifics: WhatsApp dominance,
French as the business language, hotel/riad/pâtisserie ecosystem, Moroccan
payment norms, Ramadan + tourism seasonality.

| # | File | What it covers |
|---|------|----------------|
| **00** | [`00-architecture-two-systems.md`](./00-architecture-two-systems.md) | **Read first.** Why the website (System 1, brand domain) and the cold outreach campaign (System 2, separate `.co` domain) live apart and never share infrastructure |
| 01 | [`01-6-week-plan.md`](./01-6-week-plan.md) | Week-by-week execution from kick-off to first 10 paying clients |
| 02 | [`02-contact-list-workflow.md`](./02-contact-list-workflow.md) | Building a clean B2B list (legal sources only) — Marrakech + Agadir |
| 03 | [`03-dns-setup-spf-dkim-dmarc.md`](./03-dns-setup-spf-dkim-dmarc.md) | Step-by-step DNS for the **outreach** domain `mediterra-fresh.co` (Google Workspace example) |
| 04 | [`04-domain-warmup-schedule.md`](./04-domain-warmup-schedule.md) | 4-week ramp from 5 → 30 emails/day, with health checks |
| 05 | [`05-email-templates-fr.md`](./05-email-templates-fr.md) | French templates for 4 ICP segments + 2 follow-ups + Hôtel-FR variant |
| 06 | [`06-whatsapp-and-parallel-tactics.md`](./06-whatsapp-and-parallel-tactics.md) | WhatsApp Business, sample baskets, IG/FB, GBP, SIAM/Horeca |
| 07 | [`07-compliance-09-08-and-gdpr.md`](./07-compliance-09-08-and-gdpr.md) | CNDP declaration, B2B exemption nuance, GDPR for EU-owned hotels |
| 08 | [`08-contact-form-resend.md`](./08-contact-form-resend.md) | Wiring the **inbound** website contact form to Resend on the **brand** domain `mediterra-fresh.com` (System 1, separate from outreach) |

## Recommended stack (chosen, not asked)

| Concern | Tool | Domain |
|---------|------|--------|
| Website + inbound form (System 1) | Next.js + **Resend** transactional API | `mediterra-fresh.com` |
| Cold outreach campaign (System 2) | **Smartlead** (default) / Instantly / Lemlist + Google Workspace | `mediterra-fresh.co` |
| Email list verification | **NeverBounce** before each batch import | — |
| CRM | Google Sheets first 90 days (template in doc 02) | — |
| Deliverability monitoring | Glockapps (one paid test/month) + Google Postmaster Tools | both, separately |

Why **Smartlead** for outreach: best inbox-rotation + price ratio for Morocco.
Why **Resend** for the form: cleanest API, generous free tier, easy domain
verification. The two **must not** share a domain — see doc 00.

> The site code itself contains the contact form (Law 09-08-compliant consent
> checkbox), the legal pages, JSON-LD LocalBusiness schema, the hreflang tags,
> and the WhatsApp Business CTA — all aligned with the playbook below.

## Key Morocco-specific decisions baked in

- WhatsApp is treated as the **primary** conversion channel; email is the
  cold-opening channel only.
- French is canonical, English fallback for international hotel groups
  (Accor, Marriott, Four Seasons, Mandarin), Arabic for medina riads and
  Souss B2B.
- Sample basket drop-off is the **lead conversion ritual** — every email
  template ends on it.
- Sending volume kept **below 30/day per inbox** to stay safe.
- Ramadan + Aid windows treated as **pause/relaunch** moments in the plan.
