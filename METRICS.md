# Metrics

## North Star Metric

**Audits completed per week**

Why: An audit completed means a user got real 
value from the tool. It's the moment the product 
works. Everything upstream (traffic, form 
completion) and downstream (email capture, 
consultation bookings) flows from this number. 
DAU would be wrong — this is a tool people use 
once a quarter, not daily. "Audits completed" 
captures genuine engagement, not just visits.

---

## 3 Input Metrics That Drive the North Star

**1. Form completion rate**
(audits completed / landing page visitors)

Target: 30%+
If this drops: hero copy isn't converting, 
form is too complex, or traffic quality is low.
Fix lever: simplify form, improve headline, 
add social proof above the fold.

**2. Shareable URL click rate**
(clicks on shared audit URLs / audits completed)

Target: 15%+
This is the viral loop. Every shared audit is 
free distribution. If nobody shares, the tool 
doesn't grow organically and we're dependent 
on paid/owned channels forever.
Fix lever: make savings numbers bigger and more 
shareable, add "Share my audit" prompt more 
prominently on results page.

**3. Email capture rate**
(emails submitted / audits completed)

Target: 20%+
Email is the bridge between free tool user and 
Credex consultation. Without email we can't 
follow up on high-savings users.
Fix lever: move email gate earlier (but still 
after results shown), improve email CTA copy.

---

## What To Instrument First

In order of priority:

1. **Audit completion event** — fire when 
   runAudit() returns a result and user lands 
   on results page. This is the north star.

2. **Landing page → form start** — did user 
   check at least one tool checkbox?

3. **Email capture submission** — successful 
   POST to /api/leads

4. **Shareable URL visit** — GET /audit/:id 
   from a different session than creator

5. **Credex CTA click** — did high-savings 
   users click "Book a consultation"?

Tool: Use Vercel Analytics (already built in) 
for page views. Add simple custom events via 
fetch to a lightweight analytics endpoint for 
the above five events.

---

## What Number Triggers a Pivot Decision

**If form completion rate stays below 10% 
after 500 visitors** — the value proposition 
is not landing on the landing page. Pivot the 
hero copy or simplify the form to fewer fields.

**If email capture rate stays below 5% after 
100 audits completed** — users are getting 
value but not trusting us with their email. 
Add more explicit privacy messaging or change 
the email gate trigger.

**If zero Credex consultation requests after 
50 high-savings audits** — the Credex CTA is 
not compelling enough or users don't trust the 
savings numbers. Revisit audit logic and CTA 
copy.

---

## Why Not DAU/MAU

This tool solves a problem people have once 
a quarter — when they review their software 
spend. High DAU would actually be a red flag 
suggesting users aren't getting clear enough 
results and are returning confused. The right 
retention metric is "did the user come back 
after 3 months when their team size changed" 
— not daily engagement.