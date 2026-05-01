# DNS setup — SPF, DKIM, DMARC for `mediterra-fresh.co`

> Setting these three records correctly is the difference between landing in
> Inbox and the Spam folder. Do this **on day 1** of week 1, then leave the
> warm-up to do its job.

## Pre-requisites

- You bought `mediterra-fresh.co` (Namecheap, OVH, or Cloudflare are all fine).
- You created a Google Workspace account on `mediterra-fresh.co` (or Microsoft
  365 — Google is recommended for cold-outreach reliability in Morocco).
- You own the DNS zone (you can edit records).

## Concept in 30 seconds

| Record | Question it answers | Where it lives |
|--------|--------------------|-----------------|
| **SPF** | Which servers are *allowed* to send mail from this domain? | TXT at `@` |
| **DKIM** | Was this email *cryptographically signed* by my domain's key? | TXT at `google._domainkey` (or vendor-prefixed) |
| **DMARC** | What should the receiver do if SPF or DKIM fails? Where do I want reports? | TXT at `_dmarc` |

You also need an **MX** record so the domain can *receive* mail (replies,
unsubscribes, bounces). Receivers heavily distrust send-only domains.

---

## Step 1 — MX (receive mail via Google Workspace)

| Type | Host | Value | Priority | TTL |
|------|------|-------|----------|-----|
| MX | `@` | `smtp.google.com` | 1 | 3600 |

(Google moved everyone off `aspmx.l.google.com` to a single-host setup in
2023. If your registrar UI still asks for the legacy 5 records, the legacy
also works — but `smtp.google.com` is preferred.)

## Step 2 — SPF

Exactly **one** SPF record. If you already have one, *merge*, don't add
a second (multiple SPF records = soft fail at most receivers).

For Google Workspace alone:

| Type | Host | Value | TTL |
|------|------|-------|-----|
| TXT | `@` | `v=spf1 include:_spf.google.com ~all` | 3600 |

If you also send through Smartlead's relay (recommended for outreach) — they
typically use Amazon SES, but **Smartlead by default sends *through* your
own Workspace inbox via OAuth/SMTP**, so no SPF change needed. You only need
to extend SPF if you adopt a relay-mode tool. Verify with your tool support.

If you also use SendGrid or Brevo for transactional, add their `include` and
keep one record:

```
v=spf1 include:_spf.google.com include:sendgrid.net ~all
```

> Use `~all` (soft fail), not `-all` (hard fail), during the first 90 days.
> Switch to `-all` later when you're confident.

## Step 3 — DKIM (Google Workspace)

1. Go to <https://admin.google.com> → **Apps → Google Workspace → Gmail →
   Authenticate email**.
2. Generate a new 2048-bit key (default is 1024 — pick 2048).
3. You'll receive a value like:

   ```
   Hostname:  google._domainkey
   Value:     v=DKIM1; k=rsa; p=MIGfMA0GCSqG... (long key)
   ```

4. Add the DNS TXT:

   | Type | Host | Value | TTL |
   |------|------|-------|-----|
   | TXT | `google._domainkey` | (paste full value) | 3600 |

5. Wait 30–60 minutes for propagation, then go back to Admin Console and
   click **Start authentication**.

## Step 4 — DMARC

Start in **report-only** mode for 14 days, then ratchet up.

Phase 1 — observe (week 1–2):

| Type | Host | Value | TTL |
|------|------|-------|-----|
| TXT | `_dmarc` | `v=DMARC1; p=none; rua=mailto:dmarc@mediterra-fresh.co; ruf=mailto:dmarc@mediterra-fresh.co; pct=100; aspf=r; adkim=r; sp=none; fo=1` | 3600 |

Create the `dmarc@mediterra-fresh.co` mailbox (or alias) before publishing,
or use a free DMARC reporting service like **Postmark DMARC Digests**
(<https://dmarc.postmarkapp.com>) — recommended; saves you parsing XML.

Phase 2 — quarantine 25 % (week 3):

```
v=DMARC1; p=quarantine; pct=25; rua=mailto:...; ruf=mailto:...; aspf=r; adkim=r; sp=quarantine; fo=1
```

Phase 3 — quarantine 100 % (week 6):

```
v=DMARC1; p=quarantine; pct=100; rua=mailto:...; aspf=r; adkim=r; sp=quarantine; fo=1
```

Phase 4 — reject (month 4+, only after no surprises):

```
v=DMARC1; p=reject; pct=100; rua=mailto:...; aspf=s; adkim=s; sp=reject; fo=1
```

> **Don't** jump to `p=reject` on day 1. You'll silently kill legitimate
> calendar invites or third-party sends you forgot about, and not know it
> for a week.

## Step 5 — `MTA-STS` and `TLS-RPT` (optional but classy)

Adds 2 % deliverability boost for free. Skip during week 1, do it month 2.

| Type | Host | Value | TTL |
|------|------|-------|-----|
| TXT | `_mta-sts` | `v=STSv1; id=20250101000000Z` | 3600 |
| TXT | `_smtp._tls` | `v=TLSRPTv1; rua=mailto:tls-reports@mediterra-fresh.co` | 3600 |

Then publish a `mta-sts.txt` file at `https://mta-sts.mediterra-fresh.co/.well-known/mta-sts.txt`:

```
version: STSv1
mode: enforce
mx: smtp.google.com
max_age: 604800
```

## Step 6 — Set the visible "From" name

Inside Google Workspace, set each user's "Send-as name" to a real human in FR:

| Inbox | Send-as name |
|-------|--------------|
| salim@mediterra-fresh.co | Salim Bennani — Mediterra Fresh |
| commercial@mediterra-fresh.co | Yasmine Kabbaj — Mediterra Fresh |
| hello@mediterra-fresh.co | Équipe Mediterra Fresh |

> Do not use generic `info@` or `noreply@` for cold outreach. Real names get
> 2–3× the reply rate in Morocco.

## Step 7 — Verify everything is green

Run all 4 of these tools after DNS propagation (4–6 hours after publishing):

1. **MXToolbox** — <https://mxtoolbox.com/SuperTool.aspx> →
   `mediterra-fresh.co` → check MX, SPF, DKIM, DMARC. All green.
2. **Mail-tester.com** — send a test email to the unique address they give
   you. Target: **9.5/10 or above**. Anything below 8 = stop and fix.
3. **Google Postmaster Tools** — <https://postmaster.google.com> → add and
   verify `mediterra-fresh.co`. Even if data takes 5–7 days to populate, you
   need this set up before warm-up starts.
4. **DMARC reports** — wait 48 h after publishing DMARC, then read the first
   report in Postmark DMARC Digests. Expect 100 % SPF + DKIM pass.

## Quick reference summary

| Record | Host | Value (summary) | Phase |
|--------|------|-----------------|-------|
| MX | `@` | `smtp.google.com` (priority 1) | Day 1 |
| TXT (SPF) | `@` | `v=spf1 include:_spf.google.com ~all` | Day 1 |
| TXT (DKIM) | `google._domainkey` | (value from Workspace, 2048-bit) | Day 1 |
| TXT (DMARC) | `_dmarc` | `p=none → quarantine → reject` over 6 weeks | Day 1, then ratchet |
| TXT (MTA-STS) | `_mta-sts` | `v=STSv1; id=...` | Month 2 |
| TXT (TLS-RPT) | `_smtp._tls` | `v=TLSRPTv1; rua=...` | Month 2 |

## Common Morocco-specific gotchas

- **OVH Maroc** registrar: their DNS UI mangles long DKIM keys; always paste
  in their "Mode expert" or use Cloudflare as the DNS host instead and keep
  registration at OVH.
- **Genious Communication** DNS: same UX issue. Solution: switch nameservers
  to Cloudflare (free), keep domain at Genious.
- **CNDP**: the `dmarc@` mailbox receives metadata about email flows. This
  is technically processing of metadata that may include sender info; in
  practice, this is exempt from CNDP declaration as a security/anti-fraud
  measure (similar to access logs). Document it in your processing register
  anyway.
