## Day 1 — 2026-05-06

**Hours worked:** 2

**What I did:** Set up the full project structure.
Initialized git repo, created Next.js client with 
JavaScript, set up Express server folder, installed 
React Bootstrap. Created all required markdown files 
at root. Set up GitHub Actions CI workflow. Pushed 
everything to GitHub. Also created MongoDB Atlas 
account, Resend account, and Anthropic API account 
for later use. Conducted 1 user interview with 
Arjun (freelance content writer) and started 
writing USER_INTERVIEWS.md.

**What I learned:** Next.js App Router is different 
from regular React — no static index.html, layout.js 
acts as the HTML shell, and components are server-side 
by default unless you add "use client".

**Blockers / what I'm stuck on:** Nothing major, 
took some time understanding the difference between 
server and client components in Next.js App Router.

**Plan for tomorrow:** Conduct remaining user 
interviews then build the spend input form, 
audit engine, all result components, and write tests.

---

## Day 2 — 2026-05-07

**Hours worked:** 3

**What I did:** In the afternoon conducted 2 user 
interviews — Aakash (legal professional using 
Harvey AI, Claude, ChatGPT) and Purnima (corporate 
employee with company-paid ChatGPT). Wrote up all 
3 interviews in USER_INTERVIEWS.md. In the evening 
built the entire frontend — pricingData.js, 
auditEngine.js with 5 rules, all components 
(SpendForm, ToolRow, SavingsHero, ToolBreakdown, 
AuditResults, LeadCaptureModal), useFormPersistence 
hook, landing page, and audit results page with 
Open Graph meta tags. Wrote 5 Jest tests for the 
audit engine, all passing.

**What I learned:** Jest doesn't support ES modules 
by default — need babel-jest as a transformer and 
babel.config.cjs (not .js) when package.json has 
"type": "module". Also learned that "use client" is 
needed for any component using useState or useEffect 
in Next.js App Router.

**Blockers / what I'm stuck on:** Jest ES module 
error took significant time to debug. Fix was 
renaming babel.config.js to babel.config.cjs because 
"type": "module" in package.json was treating the 
babel config itself as an ES module.

**Plan for tomorrow:** Build Express backend with 
MongoDB. Set up audit save route, lead capture route, 
and Anthropic API summary route. Deploy backend on 
Render and frontend on Vercel.

