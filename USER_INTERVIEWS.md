# User Interviews

## Interview 1 – May 6, 2026
**Name:** Vaibhavi Shah
**Role:** Freelance Content Writer since January
**Company Stage:** Individual, without a team
**Length of Interview:** ~16 minutes

### Tools They Currently Use
- ChatGPT Plus (costing ₹1999/month)
- Occasionally uses Claude free tier

### Important Quotes
- "I'm spending ₹1999/month on ChatGPT Plus but half 
  the time the free version will do for what I need"
- "I was totally unaware of Claude's free tier being 
  much more suitable for writing tasks"
- "Subscribed to it simply because everyone else was, 
  never did any comparative research"

### Most Surprising Point
Vaibhavi primarily subscribes to ChatGPT Plus 
for ₹1600/month for image generation capabilities, 
yet he has used it for this purpose no more than 3 
times in a month. All other uses were purely text 
based and could be done using the free version.

### How This Interview Influenced My Design
Included user activity frequency in the audit tool 
design – not merely subscribing to a specific plan, 
but the frequency with which they use the tools' 
premium functionalities. If someone is subscribing 
to ChatGPT Plus and rarely utilizes GPT-4o/image 
generation tools, then it’s immediately flagged.


## Interview 2 — May 7, 2026
**Name:** Aakash T. (anonymized)
**Role:** Legal Professional / Law Firm Worker
**Company Stage:** Professional services firm
**Duration:** ~12 minutes

### What They Currently Use
- ChatGPT (personal + daily tasks)
- Claude (deep research and assignments)
- Harvey AI (paralegal and legal work)

### Key Quotes
- "Harvey AI is like a great servant for us 
  in legal work, it understands the context 
  of law better than general tools"
- "Sometimes I use GPT to check fake laws 
  that were never passed by the Supreme Court 
  — it actually helps me verify what's real"
- "We had a big Harvey AI meeting in Mumbai 
  recently, firms are taking it seriously now"
- "I use Claude for deep research and 
  assignments, it gives more structured 
  and reliable answers"

### What They Use Each Tool For
| Tool | Use Case |
|------|----------|
| ChatGPT | Daily personal tasks, image generation |
| Claude | Deep research, product work, assignments |
| Harvey AI | Paralegal work, legal document drafting |

### Most Surprising Thing
He uses three separate AI subscriptions for 
three completely different purposes and sees 
no overlap between them. Most people assume 
one tool can replace another — but in legal 
work, Harvey AI is so specialized that ChatGPT 
or Claude cannot replace it at all. The audit 
tool should NOT flag specialized tools like 
Harvey as redundant just because a general 
tool exists.

### What It Changed In My Design
Added a "use case" category to the audit logic. 
If someone is using a domain-specific tool 
(legal, medical, finance), the engine should 
not recommend replacing it with a general 
purpose AI. Only flag overlap when tools 
genuinely serve the same purpose.

---

## Interview 3 — May 7, 2026
**Name:** Purnima B. (anonymized)
**Role:** Professional (company-paid subscription)
**Company Stage:** Mid-size company, team usage
**Duration:** ~10 minutes

### What They Currently Use
- ChatGPT (yearly plan, company paid)

### Current Pricing Context
- ChatGPT Plus: $20/month or ~$240/year
- Claude Pro: $20/month

### Key Quotes
- "Sometimes it does not give final work, 
  wrong interpretations, mathematical errors 
  as well"
- "It has more features and token limit so 
  I switched to the paid plan"
- "I don't really think about the cost, 
  kyuki company is paying na"
- "It sounds fishy that they will do all 
  that for free — raises a question on 
  quality or they will share my personal data"

### Most Surprising Thing
She raised a trust concern unprompted — her 
first reaction to a "free audit tool" was 
suspicion about data privacy and quality. 
She didn't ask about features or accuracy, 
she immediately questioned the business model. 
This is a real objection that many users will 
have and the landing page needs to address 
it directly.

### What It Changed In My Design
Two things:
1. Added a clear "we don't store your data 
   without permission" message on the form 
   page — before they even start filling it
2. Added a FAQ entry on the landing page: 
   "Why is this free?" with a honest answer 
   explaining the Credex business model. 
   Transparency builds trust here.