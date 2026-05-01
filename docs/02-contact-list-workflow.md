# Contact list — building a clean B2B list (Morocco)

> Premise: a small, clean, well-segmented list outperforms a 5 000-line
> scraped one. Sender reputation is destroyed in 48 h by the latter.

## Sources allowed

| Source | Use for | Cost | Legal status |
|--------|---------|------|--------------|
| **Google Places API** | Hotel + bakery names, websites, phone, address | $17/1000 results | Legal — paid Google product, ToS-compliant |
| **LinkedIn Sales Navigator** | F&B Managers, Chefs Exécutifs, Pâtissiers, Achats hôtellerie | 700 MAD/mo trial | Legal — manual lookups only, no scraping |
| **FNIH directory** | Classified hotels (★) — names + classification + region | Free download | Legal — public institutional data |
| **Chambre de Commerce Marrakech / Agadir** | SARL/SA registered F&B businesses | Free on-site, 50 MAD copy | Legal — public records |
| **Hunter.io / Apollo.io** | Email pattern discovery + verification | 49 USD/mo | Legal — only run on domains you've identified manually |
| **Pages Jaunes Maroc** | Pâtisseries, traiteurs, juice bars | Free | Legal |
| **Hotel websites — team / "Notre équipe" pages** | First names, sometimes emails | Free | Legal — public published info |
| **Booking.com / Tripadvisor** (read-only) | Hotel/riad classification + "good for breakfast" filtering | Free | Legal — manual reading only |

## Sources forbidden

- Scraping **Google Maps / Google Business Profile** — violates Google ToS
  AND the resulting lists average 60 % bounce, which kills sender reputation
  in week 1.
- Buying lists from "ProspectMaroc" or any local list seller — they recycle
  scraped data; everyone in the country gets the same emails on Tuesday morning.
- Facebook public group scraping — also forbidden under Meta's ToS.

## ICP definitions (Ideal Customer Profile)

| ICP | Volume target | Frequency | Decision-maker | Local title |
|-----|--------------:|-----------|----------------|-------------|
| **Hôtel 5 ★ Marrakech (medina, Palmeraie, Hivernage)** | 30–80 kg fruits/day | Daily | F&B Manager | "Directeur Restauration" |
| **Hôtel 5 ★ Agadir bay** | 50–150 kg fruits/day | Daily | F&B Manager + Chef Exécutif | "F&B Manager" |
| **Resort 4 ★ Agadir / Taghazout** | 40–100 kg/day | 5×/week | F&B + Achats | "Responsable Achats F&B" |
| **Riad medina avec restaurant** | 5–15 kg/day | 3–5×/week | Owner/Manager | "Gérant" |
| **Pâtisserie / boulangerie premium** | 15–60 kg fruits + herbs/week | 2–3×/week | Owner or Chef Pâtissier | "Chef Pâtissier" |
| **Restaurant gastronomique** | 8–25 kg/day | Daily | Chef Exécutif | "Chef" |
| **Juice bar / health concept** | 30–80 kg fruits/week | 4–5×/week | Owner | "Gérant" |
| **Traiteur événementiel** | Variable | On contract | Chef + Achats | "Responsable Achats" |

## Master sheet structure

Create a single Google Sheet, one tab named `master`, with these columns:

```
A  segment           (hotel-5, hotel-4, riad, patisserie, resto, juice, traiteur)
B  city              (marrakech, agadir, essaouira, taroudant)
C  zone              (medina, palmeraie, hivernage, bay, founty, etc.)
D  venue_name
E  venue_website
F  contact_first_name
G  contact_last_name
H  contact_role       (fnb_manager, chef_exec, chef_patissier, owner, achats)
I  email
J  email_verification (valid, accept-all, invalid, unknown — from NeverBounce)
K  phone
L  whatsapp           (yes/no/unknown)
M  source             (linkedin, fnih, hunter, website, pagesjaunes, etc.)
N  notes              (e.g. "Booking 9.1, 230 rooms, breakfast buffet on roof")
O  status             (queued, sent_1, sent_2, sent_3, replied, meeting, client, unsubscribed)
P  campaign           (campaign name, e.g. "marrakech-5star-2025-01")
Q  inbox_used         (salim@, commercial@, hello@)
R  last_contact_date
S  next_action_date
T  consent_basis      (legitimate_interest_b2b, opt_in_form, ground_meeting)
U  unsubscribe_date
```

Sample rows:

```
hotel-5 | marrakech | hivernage | Royal Mansour | royalmansour.com | Karim | El Idrissi | fnb_manager | k.elidrissi@royalmansour.com | valid | +212524808080 | yes | linkedin+website | "Mandarin-style ultra-luxury, breakfast 7-11" | queued | marrakech-5star-2025-01 |  |  |  | legitimate_interest_b2b |
patisserie | marrakech | gueliz | Pâtisserie Al Jawda | aljawda.ma | Hicham | (unknown) | owner | hicham@aljawda.ma | valid | +212524430000 | yes | hunter+website | "Premium FR pâtisserie, fraises + framboises year-round" | queued | marrakech-pat-2025-01 |  |  |  | legitimate_interest_b2b |
```

## 4-step legal verification before any send

For each row, run this gate. If a row fails, move it to the `cold-storage`
tab — never delete (you may use the row in 2 years).

1. **Domain ownership matches the venue** — the email domain matches the
   venue's website domain. Generic `@gmail.com`, `@yahoo.fr`, `@hotmail.com`
   = remove from B2B campaign (move to "WhatsApp-only" tab; cold email to
   personal addresses is the fastest way to hit the spam button).
2. **NeverBounce status = `valid` or `accept-all`**. Discard `invalid` and
   `unknown`.
3. **B2B legitimate-interest test** — can you write one sentence explaining
   why this person specifically would benefit from your offer? If no →
   discard. If yes, paste it in column N.
4. **Opt-out memory** — cross-reference against `unsubscribed` tab before
   adding. If on it → blacklist for 24 months minimum.

## Volume targets by city + segment (week 2)

| Segment | Marrakech | Agadir | Total |
|---------|----------:|-------:|------:|
| Hôtels 5 ★ | 35 | 25 | 60 |
| Hôtels 4 ★ | 35 | 30 | 65 |
| Riads avec restaurant | 50 | — | 50 |
| Pâtisseries premium | 25 | 15 | 40 |
| Restaurants gastronomiques | 15 | 10 | 25 |
| Juice bars / health | 5 | 5 | 10 |
| **Total** | **165** | **85** | **250** |

## Workflow timeline (week 1–2)

```
Day 1 (Mon): Build the sheet, scrape FNIH directory, list 80 5★ Marrakech
Day 2 (Tue): Pages Jaunes — pâtisseries + boulangeries
Day 3 (Wed): LinkedIn — F&B Managers + Chefs Exécutifs (manual, 1h sessions)
Day 4 (Thu): Booking.com — riads with restaurant rating ≥ 8.5
Day 5 (Fri): Hunter.io domain runs on ~50 venues missing emails
Day 6 (Sat): NeverBounce batch verification on the entire list
Day 7 (Sun): Manual cleanup, segmentation, campaign tagging — DONE
```

## Tools shortlist (chosen)

| Need | Tool | Cost (Morocco-priced) | Why |
|------|------|----------------------|-----|
| Email finding | **Hunter.io** | $49/mo (Starter) | Best Morocco data; verifies on the fly |
| Email verification | **NeverBounce** | $10 / 1000 (pay-as-you-go) | Reliable, no subscription lock-in |
| LinkedIn discovery | **LinkedIn Sales Navigator** | trial then $99/mo | Manual lookups, no automation |
| Sending (sequencer) | **Smartlead** | $39/mo per inbox-set | Best inbox rotation; under-30/day caps built in |
| Light CRM | **Google Sheets** | free | Sufficient for 90 days; switch to Folk or Pipedrive after |

> **Do not** use Apollo.io for sending in Morocco; their default From-domain
> reputation has been cooked by overuse. They're fine for *finding*; never
> for *sending*.

## What "good" looks like at end of week 2

- 250 verified rows in `master` tab.
- ≤ 8 % marked `accept-all` (riskier — send last, after warm-up).
- 100 % have a 1-sentence "why this venue" justification in column N.
- 100 % have at least 2 of (email, phone, website).
- A `marrakech-5star-2025-01` campaign of 35 rows queued for week 3.
