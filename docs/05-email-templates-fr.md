# Email templates — French (primary) + English fallback

> Rules baked in: < 100 words body, < 50-char subject lines, no images, plain
> text only during warm-up + first 60 days, working unsubscribe, postal
> address in signature (legally required under Law 09-08).
>
> Personalisation tokens (`{{first_name}}`, `{{venue}}`, `{{specific_detail}}`,
> etc.) match the master sheet column names from `02-contact-list-workflow.md`.

## Universal signature (paste into every template)

### FR (default)

```
{{sender_name}}
Conseiller commercial — Mediterra Fresh
+212 6 00 00 00 00 (WhatsApp)
mediterra-fresh.com

Mediterra Fresh — Zone industrielle Sidi Ghanem, 40000 Marrakech, Maroc.
Pour ne plus recevoir nos messages : {{unsubscribe_link}}
```

### EN (international hotels)

```
{{sender_name}}
Account Manager — Mediterra Fresh
+212 6 00 00 00 00 (WhatsApp)
mediterra-fresh.com

Mediterra Fresh — Zone industrielle Sidi Ghanem, 40000 Marrakech, Morocco.
To unsubscribe: {{unsubscribe_link}}
```

> The physical address + unsubscribe link satisfy **Law 09-08 (Morocco) +
> CAN-SPAM (US, for parent companies) + GDPR Art. 13/21 (for EU-owned
> hotels)**. Don't omit either.

---

## Subject line tests (rotate, A/B)

| # | Subject (FR) | Use for |
|---|------|------|
| 1 | `Fraîcheur du Souss pour {{venue}} ?` | Hôtels, restos, riads |
| 2 | `Vos fruits du matin, livrés à 7h` | Pâtisseries, cafés petit-déj |
| 3 | `{{first_name}}, panier d'échantillons ?` | Tous (personnalisé) |
| 4 | `Souss → {{city}}, en 18 heures` | F&B managers |
| 5 | `Fraises de Larache pour la pâtisserie ?` | Pâtisseries |
| 6 | `{{venue}} — un test cette semaine ?` | Direct, fonctionne très bien |

| # | Subject (EN) | Use for |
|---|------|------|
| 1 | `Souss freshness for {{venue}}?` | International chains |
| 2 | `Daily morning produce, 6 to 10 AM` | Resorts |
| 3 | `{{first_name}}, sample basket this week?` | All segments |

> **Avoid** in any subject: 🌿 / FREE / GRATUIT / GRATUITS / OFFRE / PROMO /
> URGENT / !!! / all-caps. These trip Moroccan ISP filters (Inwi, Maroc
> Telecom) more aggressively than EU/US filters.

---

## Template 1 — Hôtel 5 ★ (FR, primary)

**Subject:** `Fraîcheur du Souss pour {{venue}} ?`

```
Bonjour {{first_name}},

Je suis {{sender_name}} de Mediterra Fresh, fournisseur B2B de fruits et
légumes frais à Marrakech.

Je vois que {{venue}} sert {{specific_detail — ex: "un buffet petit-déjeuner
de standing dans la Palmeraie"}}. Nous livrons quotidiennement, entre 6h et
10h, des produits récoltés la veille dans le Souss : oranges Maroc Late,
fraises de Larache, herbes du Haouz, calibres sur mesure.

Voulez-vous que je vous fasse parvenir un panier d'échantillons gratuit
cette semaine ? Cinq minutes suffisent à votre chef pour juger.

Bien à vous,
{{sender_name}}
```

**Word count:** 88. Reply rate target: 7–10 %.

## Template 1B — same in EN (international chains: Accor, Marriott, Four Seasons)

**Subject:** `Souss freshness for {{venue}}?`

```
Hello {{first_name}},

{{sender_name}} from Mediterra Fresh, a B2B fresh-produce supplier in
Marrakech and Agadir.

{{venue}} sets a high bar on the breakfast and à-la-carte side
({{specific_detail}}). We deliver between 6 and 10 AM, six days a week,
produce picked the day before in the Souss: Maroc Late oranges, Larache
strawberries, custom calibres for your spec sheet.

Could we drop a sample basket at the venue this week? No commitment —
five minutes for your Executive Chef to judge.

Best,
{{sender_name}}
```

## Template 2 — Pâtisserie / boulangerie premium (FR)

**Subject:** `Fraises de Larache pour {{venue}} ?`

```
Bonjour {{first_name}},

Je vois sur Instagram que {{venue}} travaille beaucoup les fruits rouges
({{specific_detail — ex: "vos tartes aux fraises sont reconnaissables
entre mille"}}).

Nous sommes basés à Marrakech, en lien direct avec les producteurs de
Larache pour les fraises et de Tata pour les framboises. Calibres
constants, livraison en barquette 250g, prix producteur sans intermédiaire.

Un test la semaine prochaine ? Je dépose deux barquettes au labo, vous me
direz.

Bonne journée,
{{sender_name}}
```

**Word count:** 76.

## Template 3 — Riad medina avec restaurant (FR — short, casual, Marrakech tone)

**Subject:** `{{venue}} — un test cette semaine ?`

```
Bonjour {{first_name}},

Je suis voisin — Mediterra Fresh, basé à Sidi Ghanem. On livre les fruits
et légumes frais des riads de la médina entre 6h et 9h, à partir de
800 MAD HT par commande, sans engagement.

Je peux passer demain matin avec un petit panier d'échantillons (oranges,
herbes, salades). Vous me dites si ça correspond à ce que vous cherchez ?

Salim
+212 6 00 00 00 00 (WhatsApp)
```

**Word count:** 64. Use `salim@` from-name.

## Template 4 — Restaurant gastronomique (FR)

**Subject:** `Souss → {{city}}, en 18 heures`

```
Bonjour Chef,

{{sender_name}} de Mediterra Fresh, à Marrakech.

Vos confrères chefs nous reprochent souvent les calibres aléatoires des
grossistes locaux. On travaille différemment : récolte commandée la veille,
calibre validé à la palette, livraison entre 6h et 9h.

Je peux passer cette semaine avec votre fiche technique en main et vous
préparer un échantillon ciblé sur 5 références. C'est gratuit et ça prend
quinze minutes.

Bien cordialement,
{{sender_name}}
```

**Word count:** 81.

---

## Follow-up #1 — D+4 after the initial send

**Subject:** Reply to the original thread (don't change subject — keeps the
same conversation in the inbox, looks human).

```
Bonjour {{first_name}},

Petit rappel — pas de réponse, donc je ne sais pas si l'idée du panier
vous intéresse ou si ce n'est juste pas le bon moment.

Si pas le moment : aucun souci, je relance dans quelques mois.

Si oui : un mot et je passe demain matin.

{{sender_name}}
```

**Word count:** 41.

## Follow-up #2 — D+8 (final touch, then cooldown)

**Subject:** Reply to same thread.

```
Bonjour {{first_name}},

Dernière relance promise. Si je n'ai pas de retour, je sors {{venue}} de
ma liste pour 6 mois.

Pour info, voici le calendrier de saison de février, des fois que ça
ouvre une discussion : mediterra-fresh.com/catalogue

Bonne journée,
{{sender_name}}
```

**Word count:** 41.

> After follow-up #2 with no reply → mark `status = no_reply` in the sheet,
> set `next_action_date = +180 days`. Resume in 6 months with a different
> hook (new SKU, season change, etc.).

---

## Reply-to-positive-reply playbook (used 80 % of the time)

When someone replies with interest, **switch immediately to WhatsApp**.

> Bonjour {{first_name}},
>
> Merci pour votre retour ! Pour aller plus vite, je vous propose qu'on
> continue sur WhatsApp : +212 6 00 00 00 00. Je peux passer demain à 8h30
> avec le panier — ça vous va ?
>
> {{sender_name}}

This is **the** Morocco-specific tactic that doubles your conversion.
Email opens the door; WhatsApp closes the meeting.

---

## Reply-to-negative-reply playbook

| Reply type | Response |
|------------|----------|
| **"Pas intéressé"** | One-liner thank you. Mark `status = not_interested`, blacklist 24 months. Don't argue. |
| **"On a déjà un fournisseur"** | "Compréhensible. Si vous voulez tester en backup pour les ruptures, garde mon numéro. Bonne journée." Mark `status = backup_potential`, follow up in 3 months. |
| **"Désinscrivez-moi"** | Apologise, confirm removal in writing, blacklist permanently. Honour the request <24 h. |

---

## Templates to NEVER use

These all look like spam to a Marrakech F&B manager:

- "I hope this email finds you well" → translated literally is jarring in FR.
- "Just checking in" → "Je reviens vers vous" — has a bad reputation now.
- "Quick question:" → "Petite question :" — overused by spam tools.
- Anything with a calendar link in the first email (Calendly etc.) — at
  this stage, asking the prospect to do work is the conversion killer.
  Suggest a time yourself.

---

## French native checklist before any send

- [ ] No tutoiement. Always vouvoyer, even with chefs, until they ask
      otherwise.
- [ ] "Madame / Monsieur" → use only when first name is unknown and impossible
      to find. Otherwise use the first name; using formal Madame/Monsieur to
      a French-Moroccan executive feels distant.
- [ ] Currency in MAD HT, never in € unless the recipient is at an EU-owned
      hotel and writes back in €.
- [ ] Times in 24h format ("8h30", not "8:30 AM").
- [ ] No emojis in week 1–60. After: max one in subject.
- [ ] Address always written: `Sidi Ghanem, 40000 Marrakech, Maroc.` — full,
      with comma between city and country, postal code first.
