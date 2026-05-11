1. The hardest bug I hit this week, and how I debugged it

One of the hardest bugs I faced this week was a Jest ES Module configuration issue. Since the project used "type": "module" in package.json, Babel.config.js was being treated as an ES Module, which Jest was not handling properly.

After debugging the module loading behavior, I fixed it by renaming Babel.config.js to Babel.config.cjs. The .cjs extension stands for CommonJS, which forces Node.js to treat the file as a CommonJS module. After that, Jest loaded the Babel config correctly and the issue was resolved.

I also faced challenges connecting the frontend and backend while working with Next.js, as I am still early in my experience with the framework. I had issues with API integration, audit saving, lead capture flow, and fetching summaries from the backend. I solved them by debugging API routes, checking request/response handling, fixing environment variables, and properly configuring deployment on Vercel and Render.

2. A decision I reversed mid-week, and what made me reverse it

Initially, I planned to implement a complete login, authentication, and authorization system using JWT-based authentication. However, due to time limitations, backend deadlines, and multiple debugging issues during development, I decided to postpone it for now and focus on completing the core functionality first.

3. What I would build in week 2 if I had it

If I had an extra week, I would definitely implement a complete JWT (JSON Web Token)-based authentication and authorization system using tools like Passport.js. This would include secure login, protected routes, and proper user session handling for the application.

4. How I used AI tools

I used Claude’s free version and GitHub Copilot extensively during development in a spec-driven format. Whenever I faced a problem, I described the inputs, outputs, constraints, and expected state clearly, which helped the AI generate more accurate assistance.

I mainly used AI for debugging, backend integration help, deployment fixes, and understanding framework-specific issues. AI also helped me set up and troubleshoot CI/CD pipelines and deployment configurations for Vercel and Render.

However, I did not fully trust AI-generated code blindly. I always reviewed the logic and verified whether the solution matched the actual project requirements before using it.

5. Self-rating
-Discipline — 9/10
    I was highly consistent throughout the week. It has been 6 continuous days of committing code daily and following the planned workflow seriously.
-Code Quality — 9/10
    I maintained good code quality by using GitHub Copilot and Codex in a spec-driven development format, clearly defining inputs, outputs, constraints, and expected behavior before implementation.
-Design Sense — 7/10
    I focused more on backend architecture, functionality, and overall system flow rather than UI/UX polish, which is why I rated myself slightly lower in design.
-Problem Solving — 8/10
    I faced multiple technical issues during development, but I was able to solve them using a combination of AI assistance, debugging, and my own logical thinking.
-Entrepreneurial Thinking — 8/10
    On the first day itself, I interviewed three of my close friends to understand what features users would actually need in the application and which ideas would provide the most value from a client perspective.