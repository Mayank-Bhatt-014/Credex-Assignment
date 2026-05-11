# Development Log

**Project Assigned:** Evening of 2026-05-06  
**Submission Deadline:** 2026-05-13  


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

## Day 3 — 2026-05-08

**Hours worked:** 3

**What I did:** Built the entire Express backend.
Created MongoDB schemas for Audit and Lead models.
Built all routes: POST /api/audit, GET /api/audit/:id,
POST /api/leads. Built anthropicService with Gemini/
fallback summary, emailService with Resend, and 
rate limiter middleware. Connected MongoDB Atlas.
Server running on port 5000.

**Blockers / what I'm stuck on:** Frontend showing 
"cannot get" — likely because the audit result is 
not being saved to backend yet, frontend still 
reading from localStorage only. Will fix tomorrow
by connecting frontend API calls to backend.

**Plan for tomorrow:** Connect frontend to backend —
save audit on form submit, fetch summary from 
backend, fix lead capture modal API call, deploy 
both frontend on Vercel and backend on Render.

## Day 4 — 2026-05-09

**Hours worked:** 4

**What I did:** Connected frontend to backend 
completely. Fixed hydration error in 
useFormPersistence by loading localStorage only 
inside useEffect. Fixed Next.js 15 params.await 
issue in audit results page. Created 
client/.env.local with NEXT_PUBLIC_API_URL. 
Updated SpendForm to save audit to backend, 
AuditResults to fetch summary from backend, 
LeadCaptureModal to post leads to backend.
Replaced Anthropic API with Gemini API and 
renamed anthropicService to geminiService.
Removed Tailwind config files and globals.css 
Tailwind imports that were breaking Vercel build.
Fixed package.json by removing invalid test 
dependency. Deployed backend on Render and 
frontend on Vercel. Tested full end to end flow 
on live URL — audit runs, results show, leads 
save to MongoDB, emails arriving in Gmail via 
Resend.

**What I learned:** Vercel requires env variables 
to be set in dashboard and redeployed to take 
effect. Next.js create-next-app adds Tailwind 
config files even when you don't select Tailwind 
— these cause build errors if Tailwind packages 
are removed.

**Blockers / what I'm stuck on:** Vercel env 
variable took multiple attempts to get working. 
Tailwind config files left over from project 
setup caused unexpected build failures.

**Plan for tomorrow:** Write all required markdown 
files — README, ARCHITECTURE, PRICING_DATA, 
PROMPTS, TESTS, GTM, ECONOMICS, LANDING_COPY, 
METRICS, REFLECTION. Run Lighthouse audit on 
live URL. Final commit and submit Google Form.

## Day 5 — 2026-05-10

**Hours worked:** 3

**What I did:** Fixed CI workflow by setting up 
tests folder with proper package.json and 
babel.config.cjs. All 5 audit engine tests 
passing. CI showing green checkmark on GitHub 
Actions. Wrote all required markdown files — 
PRICING_DATA.md with latest May 2026 prices in 
USD and INR, PROMPTS.md with Gemini prompt 
reasoning, TESTS.md, ARCHITECTURE.md with 
Mermaid system diagram, GTM.md with specific 
channels and first 100 users plan, ECONOMICS.md 
with unit economics and $1M ARR math, 
LANDING_COPY.md with hero copy and FAQ, 
METRICS.md with north star metric and input 
metrics. Improved UI with navbar, column headers 
for tool rows, and card wrapper around form.

**What I learned:** Writing GTM and ECONOMICS 
documents forces you to think like a founder 
not just a developer. Unit economics math even 
with rough estimates reveals whether a product 
makes sense as a business.

**Blockers / what I'm stuck on:** README and 
REFLECTION.md still pending — will complete 
tomorrow after taking screenshots of live app.

**Plan for tomorrow:** Write README with 
screenshots, write REFLECTION.md with honest 
answers to all 5 questions, final commit, 
submit Google Form.

## Day 6 — 2026-05-11

**Hours worked:** 2

**What I did:** Wrote REFLECTION.md with detailed and honest answers about the development process, technical challenges, AI usage, and self-evaluation. Documented the Jest ES Module debugging issue, frontend-backend integration challenges in Next.js, deployment learnings, and decisions around postponing JWT authentication due to time constraints. Also reflected on problem-solving, discipline, code quality, and entrepreneurial thinking during the build process.

**What I learned:** Writing reflections properly helps in understanding not just what was built, but also why certain technical and product decisions were made. I also realized how important debugging skills and clear thinking are during backend integration and debugging.

**Blockers / what I'm stuck on:** README.md is still pending because of college workload and time constraints. Need to organize screenshots and finalize project documentation later.

**Plan for tomorrow:** Complete the README.md with proper project overview, setup instructions, screenshots, and technical details. Review all files and prepare the final submission.