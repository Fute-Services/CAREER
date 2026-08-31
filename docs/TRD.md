# TRD — Futé Services Careers Page

## Stack
- **Framework**: Next.js 15 (App Router), TypeScript, Tailwind CSS.
- **Hosting**: Vercel (Fluid Compute, default Node.js runtime).
- **Form submission**: Next.js Server Action → API route that emails/forwards the payload (provider TBD — start with a Vercel-compatible email API; swap in an ATS webhook later without changing the UI).
- **File upload**: Resume handled as `multipart/form-data` via the server action, validated server-side (type: pdf/doc/docx, size ≤ 10MB) before forwarding — never trust client-side validation alone.

## Folder structure
```
web/
  src/
    app/
      page.tsx              # careers landing page (hero, departments, positions, footer)
      layout.tsx
      globals.css
      apply/
        actions.ts           # server action: validate + forward application
    components/
      Hero.tsx
      Departments.tsx
      PositionsList.tsx
      ApplicationForm.tsx     # 3-step form, client component
    data/
      positions.ts            # static list of open roles (title, dept, description)
public/
docs/
  PRD.md
  TRD.md
  USERFLOW.md
```

## Data model
```ts
type Department = "Visualization" | "Creative" | "Technology" | "People & Operations" | "Growth"

interface Position {
  id: string
  title: string
  department: Department
  summary: string
}

interface Application {
  name: string
  email: string
  phone: string
  location: string
  salaryExpectation?: string
  noticePeriod?: string
  department: Department
  roleId?: string
  pitch?: string
  resume: File // pdf | doc | docx, <= 10MB
}
```

## Validation rules
- Required: name, email, phone, department, resume.
- Email: standard RFC pattern via `zod`'s `.email()` (or plain regex if no new dependency is warranted).
- Resume: MIME/type check (`application/pdf`, `application/msword`, `application/vnd.openxmlformats-officedocument.wordprocessingml.document`) and size ≤ 10MB, enforced both client-side (fast feedback) and server-side (trust boundary).

## State management
- Form is a client component holding step index + form state in local `useState`; no global state library needed (YAGNI).
- Positions data is static at build time (no CMS in v1) — sourced from `data/positions.ts`.

## Security / privacy
- No resume persistence beyond forwarding to the recruiting inbox/webhook unless a storage requirement is added later (would use Vercel Blob private storage).
- No PII logged to console/analytics.

## Open questions (resolve before wiring real submission)
- Which email/ATS endpoint receives applications in production? (placeholder API route stubbed until provided.)
