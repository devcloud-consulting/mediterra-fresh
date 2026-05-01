# Compliance — Law 09-08 (Morocco), CNDP, and GDPR for EU-owned hotels

> Disclaimer: I'm an AI, not your lawyer. This document maps the practical
> obligations as of 2025; before launch, have a 30-min call with a CNDP-aware
> lawyer (a one-page validation costs ~1 500 MAD and saves you a 300 000 MAD
> fine).

## Quick mental model

Morocco's data protection law is **Law 09-08 (2009)**, enforced by the
**CNDP** (Commission Nationale de contrôle de la Protection des Données à
caractère Personnel). It's loosely modelled on the European Directive 95/46
(pre-GDPR) and is *less strict than GDPR* — but you cannot ignore it.

GDPR enters the picture **only** when you contact someone whose data
processing falls under EU jurisdiction. In our context:

- An EU resident's email (e.g., a hotel owner based in France).
- An employee email of an EU-owned hotel chain (Accor, Marriott EU
  subsidiaries) — in practice you should treat them as GDPR-protected.
- Any processing carried out *in* the EU (not your case here).

When in doubt: apply the **stricter** of the two rules (usually GDPR) and
you are by definition compliant with both.

---

## Law 09-08 essentials for our use case

### 1. CNDP declaration (the form you must file)

For your business as defined here, you process personal data:

- Site contact form (prospect data).
- Cold outreach contact list.
- Customer accounts (orders, invoices).
- Employee data (HR — small but real).

Each constitutes a **traitement** (a "processing"). Each must be declared.

**Declaration types:**

| Declaration | When | Cost | Lead time |
|-------------|------|------|-----------|
| **Déclaration ordinaire** | Routine processings (CRM, contact form, marketing list) | Free | 24-48 h online |
| **Déclaration simplifiée** | Pre-approved categories — generic prospection + customer management fall here | Free | Same-day automatic |
| **Demande d'autorisation** | Sensitive data, biometric, transfer outside Morocco | Free but slow | 30–90 days |

**Steps to declare** (do this in week 1):

1. Create an account at <https://www.cndp.ma/fr/declaration-en-ligne>.
2. Fill the **déclaration simplifiée** (most likely your case):
   - Catégorie 1: Gestion commerciale + relation client.
   - Catégorie 2: Prospection commerciale B2B.
3. Save the receipt PDF — it contains your declaration number
   (`D-XXX/2025` format). Update `lib/site.ts` → `siteConfig.legal.cndp`.

### 2. Data subject rights

Under 09-08, individuals (including B2B contacts whose personal email or
direct line you've used) can request:

| Right | Response time |
|-------|---------------|
| Access (« droit d'accès ») — see what data you hold | 30 days |
| Rectification | 30 days |
| Opposition / opt-out | Immediately, < 24 h is best practice |
| Deletion | 30 days (unless you have a legal obligation to retain — e.g., invoices) |

The privacy policy page (`/politique-confidentialite`) already lists the
contact email and refers to the CNDP. That's the legal minimum.

### 3. The B2B "exemption" nuance

A persistent myth: "B2B emails don't need consent under 09-08."

**Truth:**
- 09-08 protects "données à caractère personnel," which includes a
  professional first name + last name + email (e.g., `karim.elidrissi@royalmansour.com`).
- A *generic* email (`info@`, `contact@`) is generally **not** personal data
  → outside 09-08.
- A *named* email **is** personal data, even on a corporate domain.

So your cold outreach to `karim.elidrissi@royalmansour.com` does process
personal data under 09-08. The legal basis is **legitimate interest** in
B2B prospection, NOT consent.

**Conditions to legally rely on legitimate interest:**

1. There is a clear B2B context (the recipient is targeted in their
   professional capacity — F&B Manager, Chef, etc.).
2. The product/service is *plausibly relevant* to their job (yes — fruit
   for an F&B manager is by definition).
3. You provide a working opt-out in every email + your address + your
   identity.
4. You honour opt-outs immediately and permanently.

If you fail any of these, you fall back to needing **prior consent**, which
you don't have for cold outreach. The 4 checks above are non-negotiable.

### 4. Penalties (current scale)

| Offence | Fine |
|---------|------|
| Non-declaration of a processing | 10 000 – 100 000 MAD |
| Refusal of a data subject right | 20 000 – 200 000 MAD |
| Sending unsolicited messages without opt-out | 1 000 – 100 000 MAD per offence |
| Aggravated cases (recidivism, sensitive data) | up to 300 000 MAD + criminal liability |

Real CNDP enforcement is occasional but *increasing* every year, especially
against email senders. Don't be the test case.

---

## GDPR mini-add-on for EU hotels

If you contact:
- A French-owned hotel group HQ in Paris/Lyon.
- A Marriott EMEA hub.
- An Accor subsidiary registered in France.
- An owner whose email is on a `.fr` / `.de` / `.es` domain.

Apply these on top:

1. **Lawful basis = legitimate interest** (Art. 6(1)(f) GDPR), provided you
   pass a **balancing test** documented in writing:
   - Purpose: B2B prospection.
   - Necessity: cannot achieve the purpose with less personal data.
   - Balance: the recipient's expectation in a professional context permits
     this contact.
   - Safeguards: clear identification, easy opt-out, no profiling beyond
     "F&B manager at venue X".
2. **Information notice** — the email itself satisfies Art. 13 because:
   - You name the controller (`Mediterra Fresh`).
   - You name the purpose (commercial prospection).
   - You give an opt-out (unsubscribe link).
   - You point to the privacy policy (`mediterra-fresh.com/politique-confidentialite`).
3. **DPA / data processing agreements** with your subprocessors (Smartlead,
   Hunter, NeverBounce). All three publish standard DPAs — sign and store
   them in `/legal/dpa/` (don't commit to git).
4. **Data transfer to the US** (Smartlead is US-hosted) — relies on **EU-US
   Data Privacy Framework** (DPF, valid since July 2023). Smartlead is on
   the DPF list. Document this in your Record of Processing Activities
   (RoPA).

If you ever contact a UK-owned hotel: same as GDPR, with UK ICO replacing
the EU supervisory authority.

---

## Record of Processing Activities (RoPA) — minimum viable

Keep a single Google Sheet, one tab `RoPA`. Fill these columns:

```
A  processing_id      (PA-001, PA-002...)
B  processing_name    (e.g., "Cold outreach campaign")
C  controller         (Mediterra Fresh)
D  purpose            (B2B commercial prospection)
E  legal_basis        (legitimate interest, art. 6(1)(f) GDPR / 09-08 art. 4)
F  data_categories    (name, professional email, phone, role, venue)
G  data_subjects      (F&B Managers, Chefs, Owners — B2B contacts)
H  recipients         (internal sales team, Smartlead, Hunter, NeverBounce)
I  retention          (3 years from last contact)
J  transfer_outside_morocco (yes — US, under DPF)
K  security_measures  (HTTPS, MFA on workspace, encrypted backups)
L  cndp_declaration   (D-XXX/2025)
M  last_updated       (date)
```

Mandatory fields under 09-08: A, B, C, D, F, G, I, K, L. Add the rest for
GDPR completeness.

---

## Practical checklist before first cold send

- [ ] CNDP déclaration filed; declaration number (`D-XXX/2025`) entered in
      `lib/site.ts`.
- [ ] Privacy policy + legal notice published at `/fr/politique-confidentialite`,
      `/en/...`, `/ar/...`. Already done by the site code. ✓
- [ ] DPA signed with Smartlead, Hunter, NeverBounce (download from each
      vendor; store offline).
- [ ] Each cold-email template includes: physical address, sender real
      name, working unsubscribe link, link to privacy policy.
- [ ] Opt-out mailbox (`unsubscribe@mediterra-fresh.co`) set up + checked
      daily.
- [ ] A "blacklist" tab in your CRM sheet, with auto-suppression on import
      (Smartlead supports this — set it up in Settings → Suppression list).
- [ ] RoPA sheet filled for at least 3 processings: site contact form,
      cold outreach, customer management.

## When NOT to send (legal hard stops)

- The recipient has previously asked to be removed (any channel, any time).
- You don't have a basic plausible reason to think this person handles
  fruit/vegetable purchasing.
- The recipient is at a venue you've already pitched in the last 6 months.
- The recipient's email is on a generic Yahoo/Gmail/Hotmail (not B2B
  context) **and** you don't have other evidence they're a professional
  buyer (LinkedIn profile, IG bio, business card).
- During Ramadan's last 10 days — not a legal stop, but a reputation stop.

---

## When you grow past 5 000 contacts

You'll cross thresholds that change obligations. Plan to revisit:

- 10 000+ contacts → consider naming a "responsable de la protection des
  données" (Moroccan equivalent of a DPO; not yet mandatory, but optical).
- Moving to a "déclaration ordinaire" (vs. simplified) becomes useful when
  you scale segmentation and add automated profiling.
- For full GDPR compliance with EU clients, a real DPO appointment is
  triggered when you "regularly and systematically monitor" data subjects —
  unlikely in the short term.

Stay below the radar by being **clean**, **small-volume**, and
**well-documented**. CNDP and EU regulators target sloppy operators, not
small B2B suppliers with a real product.
