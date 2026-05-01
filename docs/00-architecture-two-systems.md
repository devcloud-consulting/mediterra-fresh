# Architecture — two systems, two domains

> **Read this before touching anything email-related.** The most common — and
> most destructive — mistake new operators make is conflating the **website's
> inbound contact form** with the **cold outreach campaign**. They are not the
> same. They live on different domains, use different tools, and follow
> different rules.

## TL;DR

```
┌─────────────────────────────────────┐    ┌─────────────────────────────────────┐
│  SYSTEM 1 — WEBSITE (this repo)     │    │  SYSTEM 2 — COLD OUTREACH (docs/)   │
│                                     │    │                                     │
│  Domain:   mediterra-fresh.com      │    │  Domain:   mediterra-fresh.co       │
│            (registered)             │    │            (to register)            │
│  Direction: inbound (we receive)    │    │  Direction: outbound (we send)      │
│  Tool:     Resend API               │    │  Tool:     Instantly / Smartlead    │
│  Volume:   ~10/month                │    │  Volume:   30–60/day per inbox      │
│  Setup:    30 min                   │    │  Setup:    3–4 weeks (warm-up)      │
└─────────────────────────────────────┘    └─────────────────────────────────────┘
              │                                            │
              ▼                                            ▼
       contact@mediterra-fresh.com         karim@mediterra-fresh.co
       hello@mediterra-fresh.com           yasmine@mediterra-fresh.co
       (transactional, kept clean)         (sacrificial, warmed up)
```

---

## System 1 — the website (this Next.js app)

**What it does.** Hosts the public showcase site at
`https://mediterra-fresh.com`, shows the catalogue and product pages, and
exposes an HTTP form at `/contact` that lets prospects send you a message.

**The email it sends.** Exactly one transactional email **per form submission**,
addressed to your business inbox (`contact@mediterra-fresh.com`). The visitor's
own email is set as `Reply-To`, so when you click "Reply" you reply to them.

**Where it lives in the codebase.**
- `app/api/contact/route.ts` — the API handler
- `components/ContactForm.tsx` — the form
- `docs/08-contact-form-resend.md` — Resend setup guide
- `docs/09-deploy-vps.md` — VPS deployment runbook (Hetzner / Cloudshare /
  generic Ubuntu)
- `.env.example` — environment variables

**Tool: Resend** (or any transactional provider — Postmark, AWS SES). Resend
was chosen for the modern API and free tier. The brand domain
`mediterra-fresh.com` is verified once with DKIM/SPF/DMARC and **stays clean**
for the next 10 years.

**You can launch this on day 1.** It's safe. Volume is tiny, recipients have
opted in by submitting a form, complaint risk is essentially zero.

---

## System 2 — the cold outreach campaign

**What it does.** Sends personalised, low-volume **cold emails** to hotels,
riads, restaurants, pâtisseries, and bars that have never heard of you, with
the goal of booking a sample-basket meeting and converting them to clients.

**The email it sends.** 30–60 emails/day **per mailbox**, across 2–4 mailboxes,
in sequences of 2–3 follow-ups, hand-personalised to ICP segments.

**Where it lives.** Not in this codebase. The campaign is run from a SaaS
sending tool (**Instantly** or **Smartlead**) connected to Google Workspace
mailboxes on a **separate domain** — `mediterra-fresh.co` (recommended;
register once you reach the outreach phase, see doc 03).

**The playbook is in `docs/`:**
- `01-6-week-plan.md` — week-by-week execution
- `02-contact-list-workflow.md` — building a clean B2B list
- `03-dns-setup-spf-dkim-dmarc.md` — DNS for `mediterra-fresh.co`
- `04-domain-warmup-schedule.md` — 4-week warm-up before any real send
- `05-email-templates-fr.md` — FR templates per ICP segment
- `06-whatsapp-and-parallel-tactics.md` — non-email parallel channels
- `07-compliance-09-08-and-gdpr.md` — Loi 09-08, B2B legitimate-interest, GDPR

**You cannot launch this on day 1.** A new domain that suddenly sends 30
emails/day **will land in spam**, your sender reputation will be torched, and
recovery takes weeks. Hence the warm-up phase.

---

## Why two domains is non-negotiable

### Reputation contagion

Mailbox providers (Gmail, Outlook, Yahoo) maintain a **per-domain reputation
score**. They don't distinguish between `noreply@`, `karim@`, and the form
notification — it's all `mediterra-fresh.com`. One spam complaint pulls the
whole domain down.

### Cold outreach is *inherently* risky

Even with perfect copy, perfect targeting, and perfect compliance:

- Some recipients will mark "Spam" instead of "Unsubscribe" because it's
  faster.
- Some will silently archive — Gmail reads silent low engagement as a weak
  spam signal.
- A few will bounce because the contact data was stale.

These signals **must not contaminate** the brand domain that handles real
customer transactional mail (order confirmations, invoices, support replies,
form notifications).

### The cost of conflation

A real example from a Moroccan B2B startup that mixed both:

> Week 1: started cold outreach from `contact@brand.com`. Volume: 25/day.
> Week 3: 4 spam complaints. Brand domain reputation drops to "Bad" on
>         Google Postmaster Tools.
> Week 4: order confirmations to actual paying clients land in spam. CEO has
>         to call each client to apologise.
> Week 6: domain de-listed from Outlook. Two paying clients drop them
>         because invoices stop arriving.
> Recovery: 4 months and a domain migration.

You don't want to live this. The `mediterra-fresh.co` cost is **~12 €/year**.
That's the cheapest insurance you'll ever buy.

---

## What you should do, in order

1. **Register both domains.**
   - `mediterra-fresh.com` ✅ already registered (your brand).
   - `mediterra-fresh.co` — register before you start outreach (Namecheap,
     Cloudflare, OVH all fine).

2. **Wire System 1.** Verify `mediterra-fresh.com` in Resend, set the env
   vars on the host (Vercel or VPS), and the contact form is live. See
   [`08-contact-form-resend.md`](./08-contact-form-resend.md) and
   [`09-deploy-vps.md`](./09-deploy-vps.md).

3. **In parallel, start System 2's warm-up.** Buy `mediterra-fresh.co`,
   create Google Workspace, set DNS per
   [`03-dns-setup-spf-dkim-dmarc.md`](./03-dns-setup-spf-dkim-dmarc.md),
   and start the 4-week warm-up per
   [`04-domain-warmup-schedule.md`](./04-domain-warmup-schedule.md).
   You will not send a real cold email for 21–28 days. That's normal.

4. **Never mix mailboxes.**
   - Replies from prospects who answered cold outreach: come into the `.co`
     mailboxes — handle them there, then move conversations to the `.com`
     domain only **after** the prospect has explicitly engaged (asked for a
     quote, scheduled a meeting). Move with care: e.g.
     *"Je vous écris depuis notre boîte commerciale pour la suite. Nos
     factures et confirmations partiront depuis @mediterra-fresh.com."*
   - Customer transactional and support: only ever from `.com`.

5. **Monitor both domains** in Google Postmaster Tools and on
   <https://dmarc.postmarkapp.com>. Different graphs, different action plans.

If you ever feel tempted to just "send the campaign from the brand domain
to save €12" — re-read the cost-of-conflation section above.
