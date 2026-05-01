# Domain warm-up — 4-week schedule (5 → 30 emails/day)

> Sending from a brand-new domain straight at 30/day = spam folder for 90 %
> of your sends, in 48 h. The 4-week warm-up is non-negotiable.

## Setup before day 1

- [ ] DNS green (`03-dns-setup-spf-dkim-dmarc.md` complete).
- [ ] 3 inboxes provisioned: `salim@`, `commercial@`, `hello@`.
- [ ] Each inbox has a real-looking signature (name, role, phone, address,
      website).
- [ ] Smartlead workspace created; each inbox connected.
- [ ] Smartlead "Email warmup" toggled ON for each inbox with these settings:

  | Setting | Value |
  |---------|-------|
  | Daily warmup volume | **start 5, ramp +5 every 4 days, cap at 40** |
  | Reply rate | 25 % |
  | Open rate | 70 % |
  | Spam-save rate | 5 % |
  | Schedule | Mon–Sat 8:00–17:00 (Africa/Casablanca) |
  | Random delay between sends | 8–22 minutes |

- [ ] Add 2 colleagues' real Gmail/Outlook accounts as "warm-up partners"
      (Smartlead pools handle this automatically too).

## Schedule overview

```
Week 1: Warm-up only. NO cold sends. Ramp 5 → 15 warm-up emails/day.
Week 2: Warm-up only. Ramp 15 → 25 warm-up emails/day.
Week 3: Warm-up continues. + 10 cold/day per inbox (5★ Marrakech segment only).
Week 4: Warm-up continues. + 20 cold/day per inbox. Open all segments.
Week 5+: Warm-up at 25/day, cold capped at 30/day per inbox. Continue
        warm-up forever (lower volume).
```

## Day-by-day plan

### Week 1 — silence + warm-up

| Day | Activity | Cold sends | Warm-up sends |
|-----|----------|-----------:|--------------:|
| Mon (D1) | Confirm DNS green. Smartlead warm-up ON for all 3 inboxes. | 0 | 5 / inbox |
| Tue (D2) | Open Postmaster Tools, request domain verification. | 0 | 5 |
| Wed (D3) | Run mail-tester. Target 9.5+. | 0 | 5 |
| Thu (D4) | Bump warm-up to 8/day. | 0 | 8 |
| Fri (D5) | Send 1 personal email between inboxes (not via Smartlead) — open it, reply, mark "important". | 0 | 8 |
| Sat (D6) | Same as D5. | 0 | 8 |
| Sun | Pause warm-up (looks more human if Sunday is empty). | 0 | 0 |

### Week 2 — keep building reputation

| Day | Cold sends | Warm-up sends |
|-----|-----------:|--------------:|
| Mon (D8) | 0 | 12 / inbox |
| Tue (D9) | 0 | 12 |
| Wed (D10) | 0 | 15 |
| Thu (D11) | 0 | 15 |
| Fri (D12) | 0 | 18 |
| Sat (D13) | 0 | 18 |

Mid-week 2 health check:
- Open Postmaster Tools — domain reputation should appear, target = HIGH.
- Mail-tester re-run = same 9.5+.
- Smartlead "deliverability" tab = all green inboxes.

### Week 3 — first cold sends, 5★ Marrakech only

| Day | Cold sends (per inbox) | Warm-up sends (per inbox) |
|-----|----------:|--------------:|
| Mon (D15) | 5 | 18 |
| Tue (D16) | 5 | 18 |
| Wed (D17) | 8 | 18 |
| Thu (D18) | 8 | 20 |
| Fri (D19) | 10 | 20 |
| Sat (D20) | 10 | 20 |

Use **only `salim@`** for cold this week, keeping `commercial@` and `hello@`
in pure warm-up. Target list: 35 5★ hotels in Marrakech only.

End-of-week-3 gate (do all three before scaling):
1. Bounce rate this week ≤ 5 %.
2. Reply rate ≥ 3 %.
3. Glockapps test placement = primary inbox ≥ 75 %.

If any fails → freeze, drop volume to 5/day, fix the underlying issue
(usually list quality, not infrastructure).

### Week 4 — open all 3 inboxes for cold

| Day | Cold (each of 3 inboxes) | Warm-up (each) | Total cold/day |
|-----|----------:|--------------:|----------:|
| Mon (D22) | 12 | 18 | 36 |
| Tue (D23) | 14 | 18 | 42 |
| Wed (D24) | 16 | 20 | 48 |
| Thu (D25) | 18 | 20 | 54 |
| Fri (D26) | 20 | 20 | 60 |
| Sat (D27) | 20 | 20 | 60 |

End of week 4 = warm-up done. Stay at 30/day per inbox max.

### Steady state (week 5+)

```
Per inbox: 25 cold / day max, plus 15 warm-up / day, Mon–Sat.
Across 3 inboxes: 75 cold / day max.
Per recipient: 1 sequence (init + 2 follow-ups), max 3 emails total.
Cooldown: same recipient cannot enter another sequence for 6 months.
```

## Health metrics — measure weekly

| Metric | Healthy | Warning | Stop |
|--------|---------|---------|------|
| Bounce rate | < 3 % | 3–5 % | > 5 % |
| Spam complaint rate | < 0.05 % | 0.05–0.1 % | > 0.1 % |
| Reply rate | > 5 % | 2–5 % | < 2 % (list quality issue) |
| Domain reputation (Postmaster) | High | Medium | Low |
| IP reputation (Postmaster) | High | — | Bad |
| Mail-tester score | ≥ 9.0 | 8.0–9.0 | < 8.0 |

If any metric hits "stop":
1. Pause **all** cold sends from that inbox immediately.
2. Switch the inbox back to warm-up only for 7 days.
3. Audit: list quality (most common cause), spam-trigger words in the
   template, broken unsubscribe link, missing physical address.
4. Re-run mail-tester and Glockapps. Resume only when both are green.

## Recovery plan if you land in spam

1. Stop all sends for 7 days.
2. Drop warm-up to 3/day.
3. Manually email 5 friends, ask them to reply with a real message.
4. Run Postmaster check: if "low" reputation, you need 4 more weeks of
   warm-up before retrying cold.
5. If after 4 weeks reputation hasn't recovered → burn the domain. Buy a
   new one (`mediterrafreshma.com`, `mediterrafresh.io`), redo DNS, redo
   warm-up. **Do not** retry from the same domain — recovery is rarely
   complete and you'll waste 2 months.

## Forever rules (after warm-up)

- **Never** stop the warm-up entirely. Run 10–15/day in perpetuity.
- **Never** send on Sundays from an outreach domain in Morocco — looks
  inauthentic to F&B managers (who don't work Sundays).
- **Always** send 8:30 → 11:30 (Africa/Casablanca) — Marrakech F&B managers
  read mail before service prep.
- **Never** include images or tracking pixels in week 3–6 — they add a spam
  signal while reputation is fragile. Pixels back ON in month 3.
- **Always** keep the unsubscribe link AS PLAIN TEXT, not behind a logo or
  small font. Spam filters scan for this.
- **Pause immediately** during Ramadan's last 2 weeks (replies tank, spam
  reports rise — in our market, F&B managers mark high-volume mail as spam
  during Ramadan as a coping mechanism).
