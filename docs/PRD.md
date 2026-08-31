# PRD — Futé Services Careers Page

## Problem
Futé Services needs a public careers page where candidates can browse open roles and submit an application, replacing the existing prototype at fute-careers.futeservices-4564.chatgpt.site.

## Goals
- Present the company's hiring pitch ("careers without borders") and open positions.
- Let a candidate apply without leaving the site.
- Keep the data footprint minimal — collect only what recruiting needs.

## Non-goals
- Applicant tracking / recruiter dashboard (out of scope for v1).
- Multi-language support.
- Account creation / candidate login.

## Users
- **Candidates**: browse roles, filter by department, submit an application.
- **Recruiting team** (not a UI user in v1): receives applications via email/webhook.

## Feature scope (v1)
1. **Hero** — tagline "Your next chapter can start anywhere.", CTAs to view positions or apply directly.
2. **Departments** — CREATE (Design, Film, 3D), BUILD (Technology, Product), GROW (Sales, People, Operations).
3. **Open positions list** — grouped by department (Visualization, Creative, Technology, People & Operations, Growth), each with title, short description, and an "Apply" action that deep-links into the form pre-selecting that role.
4. **Application form** (`#apply`), 3 steps:
   - Step 1 — Candidate details: name, email, phone, location, salary expectation, notice period.
   - Step 2 — Work profile: department, role applied for, short pitch/expectations.
   - Step 3 — Resume upload: PDF/DOC/DOCX, max 10MB.
5. **Privacy notice**: "Your details are used only for recruitment and candidate evaluation."
6. **Footer**: tagline "Build what moves people."

## Success metrics
- Application submitted without error (form completion rate).
- Time-to-apply < 3 minutes.

## Constraints
- Static/low-infra hosting (Vercel) — no ATS integration in v1.
- Resume storage must not exceed 10MB per file and must be handled per privacy notice.

See [TRD.md](./TRD.md) for technical design and [USERFLOW.md](./USERFLOW.md) for the candidate journey.
