# 6-week execution plan — site + first 10 paying clients

Goal: site live + first 10 paying B2B clients within 6 weeks of kick-off.

## Pre-week 0 — supply readiness gate

Do **not** start outreach until you can answer YES to all of these. Lying to
yourself here is what kills supplier startups in Morocco.

- [ ] At least 25 of the 80 catalogue SKUs are sourced and priced (signed
      offtake or verbal agreement with at least 3 producers).
- [ ] Cold storage: minimum 4 m² walk-in or commercial fridge at 4 °C, plus a
      freezer for berries.
- [ ] Delivery: 1 refrigerated van or contracted route in Marrakech intra-muros
      and 1 in Agadir bay (or a credible plan to subcontract via Chronoglob /
      Eolis Maroc / a local frigo).
- [ ] WhatsApp Business activated, professional answering script ready in FR /
      EN / AR.
- [ ] One person can take, confirm, and dispatch an order between 16:00 and
      20:00 the same day.

If any line is NO, fix it before week 1. Outreach to a 5-star hotel that you
then can't supply consistently is worse than no outreach at all.

---

## Week 1 — foundations

### Brand + legal
- [ ] Register `mediterra-fresh.com` (CNDP-friendly, Morocco-resident host).
- [ ] Register `mediterra-fresh.co` (outreach domain, isolated reputation).
- [ ] Register the company at the Centre Régional d'Investissement (CRI)
      Marrakech. Get RC, ICE, IF, patente, CNSS numbers; update `lib/site.ts`.
- [ ] Open a business bank account (Attijariwafa, BMCE, or CIH — Attijari has
      best F&B loyalty programme onboarding).
- [ ] Pre-declare data processing at CNDP (declaration "ordinaire" for a B2B
      contact form is enough at this stage; ~20 min online form).

### Tech
- [ ] Deploy this Next.js site to Vercel **or** any Moroccan host that
      supports Node 20+ (LWS Cloud, Genious Cloud Hosting). Deployment guide:
      `docs/deployment.md` if you need it generated.
- [ ] Buy SSL (free via Let's Encrypt on either host).
- [ ] Set up Google Search Console + Plausible Analytics (privacy-friendly,
      no cookie banner needed under Law 09-08 if anonymised).
- [ ] Create Google Business Profile (in French) with the Sidi Ghanem address.
- [ ] Open Instagram + Facebook business accounts; reserve LinkedIn company
      page.

### Outreach plumbing (start now, results in week 3)
- [ ] Configure DNS for `mediterra-fresh.co` per
      `03-dns-setup-spf-dkim-dmarc.md`. **SPF, DKIM, DMARC = same day.**
- [ ] Create 3 outreach inboxes on Google Workspace:
      `salim@`, `commercial@`, `hello@` on `mediterra-fresh.co`.
- [ ] Sign up Smartlead, NeverBounce trial, Hunter.io trial.
- [ ] Start the 4-week warm-up immediately
      (`04-domain-warmup-schedule.md`) — these inboxes need 14–28 days
      before any cold mail.

**Week 1 deliverable**: domain bought, DNS green, warm-up running, GBP claimed,
site deployed at a staging URL.

---

## Week 2 — content + first prospects

### Site
- [ ] Replace placeholders in `lib/site.ts` (real phone, email, RC, ICE, GPS,
      address, CNDP number).
- [ ] Take or commission **20 product photos** (one per top SKU) and 6
      lifestyle shots (van loading, cold room, packing). Drop into
      `/public/images/products/<slug>.jpg`. Avoid stock — chefs spot it.
- [ ] Replace hero placeholders in the Home `HeroVisual` component with the
      real lifestyle shots.
- [ ] Translate the catalogue product names if you've added new SKUs.
- [ ] Final QA on all 3 languages (especially Arabic — direction, line breaks,
      hours format).

### List building (week 2 = research, week 3 = send)
- [ ] Build the master Google Sheet with the columns from
      `02-contact-list-workflow.md`.
- [ ] Source list 1: **Marrakech hotels 4–5 ★** — target 80 venues from FNIH
      directory + Booking.com filtering + Pages Jaunes.
- [ ] Source list 2: **Agadir hotels 4–5 ★ + resorts** — target 50 venues.
- [ ] Source list 3: **Pâtisseries premium Marrakech + Agadir** — target 40
      venues from Pages Jaunes + Instagram.
- [ ] Source list 4: **Riads with restaurant service in the Marrakech medina**
      — target 60 venues from Booking + Riad listings.
- [ ] Verify all emails through NeverBounce. Discard anything not "valid" or
      "accept-all".

**Week 2 deliverable**: ~200–230 verified contacts in the sheet, segmented by
ICP and city.

---

## Week 3 — first sends (warm) + parallel ground game

### Email
- [ ] Day 15 of warm-up: switch one inbox (`salim@`) to live cold sends, max
      15 emails/day to **5-star Marrakech hotels** (highest-stakes segment
      first while volume is low).
- [ ] Templates from `05-email-templates-fr.md` — segment "Hôtel 5 ★ FR".
- [ ] Follow-up #1 scheduled at D+4.
- [ ] Pause sends for any inbox with bounce rate > 5 % during the day.

### Ground game (parallel)
- [ ] Print **15 sample-basket cards** with QR code → `mediterra-fresh.com/contact`.
- [ ] Drop physical sample baskets to **5 Marrakech hotels** (handed to the
      F&B Manager or sous-chef in person — never security/reception). Bring a
      paper catalogue.
- [ ] Post 3 Instagram Reels (van loading, cold room tour, harvest day at a
      partner farm). Tag the producer.

**Week 3 deliverable**: 75 emails sent, 5 sample baskets dropped, 3 IG Reels
live. Expect 1–3 WhatsApp replies and 1–2 in-person meeting requests.

---

## Week 4 — scale up to all segments

### Email
- [ ] Add `commercial@` and `hello@` to live sends (warm-up complete on day
      28).
- [ ] Total cap: 60 emails/day across the 3 inboxes (still well below 30/day
      per inbox max).
- [ ] Open the other 3 segments: pâtisseries, riads with restaurant, Agadir
      4–5 ★.
- [ ] Follow-up #2 (D+8) on the week 3 batch.
- [ ] First Glockapps deliverability test (€5). If primary placement < 70 %,
      pause and read `04-domain-warmup-schedule.md` § "Recovery".

### Ground game
- [ ] Drop 5 more Marrakech baskets + 5 Agadir baskets.
- [ ] First WhatsApp Broadcast of the week's catalogue to opted-in contacts
      (see `06-whatsapp-and-parallel-tactics.md`).
- [ ] LinkedIn message to **10 Chefs Exécutifs** in Marrakech who replied
      visiting your IG profile.

**Week 4 deliverable**: 250 cumulative emails sent, 15 baskets delivered, 4–8
qualified replies, 2–3 first orders likely.

---

## Week 5 — convert + stabilise

### Email
- [ ] Continue rolling new contacts into the sequence (rotate inboxes daily).
- [ ] Refine templates based on actual reply data — A/B subject lines.
- [ ] Tag every replier in the sheet with status (`hot`, `warm`, `not now`,
      `unsubscribe`).

### Sales
- [ ] Convert WhatsApp / email replies into 1 in-person meeting per day.
- [ ] Pricing: present a **standard tariff sheet** + a **"Welcome 4-week"
      tariff sheet** (5 % discount on first 4 weeks, no commitment beyond) —
      this is what closes Marrakech F&B managers in our market.
- [ ] Sign **5 first paying clients** by end of week 5. Offer 4-week pilot,
      not annual contract. Moroccan F&B managers don't sign annuals on month
      one.

**Week 5 deliverable**: 5 paying clients onboarded, recurring weekly orders
booked into the route plan.

---

## Week 6 — second wave + retention

### Operations
- [ ] Stabilise daily route. Measure on-time delivery rate; target ≥ 95 %.
- [ ] Set Net Promoter Score check at day 14 of each new client (WhatsApp
      message — never email — gets 80 % response in our market).
- [ ] Collect first written testimonials with permission for `/references`.

### Outreach
- [ ] 2nd wave of 50 emails to a fresh list (juice bars, health concepts,
      catering).
- [ ] Apply to **Horeca Morocco** + check **SIAM** dates.
- [ ] Second IG month plan: 12 posts, 2 Reels/week, behind-the-scenes.

**Week 6 deliverable**: 10+ paying clients, 2 written testimonials, 1
event/trade-show booked.

---

## Pause windows (do NOT send during these)

| Window | Why | Action |
|--------|-----|--------|
| **Ramadan (last 2 weeks)** | F&B managers swamped, replies tank | Pause cold sends, double down on WhatsApp catalogue broadcasts |
| **Aid Al-Adha week** | Country shut down | Pause everything |
| **Mid-July → mid-August** (Marrakech only) | Many F&B managers leave the city | Refocus on Agadir |
| **Christmas–New Year** | International chains busy | Schedule mailings for January 6 |

## Success metrics by week 6

| Metric | Target |
|--------|--------|
| Verified contacts in CRM | ≥ 250 |
| Emails sent | ≥ 600 |
| Reply rate | ≥ 5 % |
| Bounce rate | ≤ 3 % |
| Spam complaint rate | ≤ 0.05 % |
| Sample baskets delivered | ≥ 25 |
| WhatsApp inbound conversations | ≥ 30 |
| Paying clients | ≥ 10 |
| MRR | ≥ 60 000 MAD |
