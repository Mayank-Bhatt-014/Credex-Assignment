# Prompts

## AI Summary Generation Prompt

Used in: `server/src/services/geminiService.js`

### The Prompt
You are a helpful financial advisor. Write a
100-word personalized summary for a startup
based on this AI tool audit result. Be specific
about the tools and savings amounts. Be friendly
and actionable.
Audit data: [JSON.stringify(auditResult)]

### Why I Wrote It This Way

- **"Financial advisor" role** — gives the model 
  a professional frame so it stays factual and 
  specific rather than generic
- **"100-word"** — keeps the summary scannable, 
  not overwhelming for a results page
- **"Be specific about tools and savings"** — 
  prevents vague output like "you could save money" 
  and forces it to mention actual tool names and 
  dollar amounts
- **"Friendly and actionable"** — the user just 
  saw their audit, they need motivation to act, 
  not a lecture
- **JSON audit data injected directly** — gives 
  the model all the context it needs without 
  extra explanation

### What I Tried That Didn't Work

- **No role specified** — output was too generic, 
  didn't mention specific tools or amounts
- **"Write a summary of this audit"** — too vague, 
  model wrote a paragraph about AI tools in general 
  rather than the user's specific situation
- **Asking for bullet points** — looked wrong on 
  the results page, prose felt more natural and 
  trustworthy

### Fallback Behavior

If the Gemini API call fails for any reason 
(network error, quota exceeded, invalid key), 
the service falls back to this templated summary:
"Based on your audit, you could save
$[totalMonthlySavings]/month by optimising
your AI tool subscriptions. Review the
recommendations above to get started."

This ensures the results page never shows a 
broken or empty summary section regardless of 
API status.

### Model Used

Google Gemini 2.0 Flash via Gemini API.
Fast, cheap, and sufficient for 100-word 
summaries. Did not use a larger model because 
this is a simple summarization task — knowing 
when not to use a heavy model is part of good 
engineering judgment.