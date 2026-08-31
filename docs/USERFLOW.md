# User Flow — Futé Services Careers Page

## Primary flow: Apply to a specific role
1. Candidate lands on `/` → sees hero ("Your next chapter can start anywhere.") with two CTAs: **View Positions** and **Apply Now**.
2. Candidate clicks **View Positions** → scrolls to Departments (CREATE / BUILD / GROW) → scrolls to grouped position list.
3. Candidate finds a role (e.g. "Full-Stack Developer" under Technology) and clicks **Apply**.
4. Page scrolls to `#apply`; the application form opens with department + role pre-filled.
5. **Step 1 — Candidate details**: name, email, phone, location, salary expectation, notice period. Candidate clicks Next (blocked until required fields are valid).
6. **Step 2 — Work profile**: department (pre-filled, editable), role, short pitch. Candidate clicks Next.
7. **Step 3 — Resume upload**: drag-and-drop or file picker, PDF/DOC/DOCX ≤ 10MB. Privacy notice shown. Candidate clicks Submit.
8. Success state: confirmation message replaces the form ("We've received your application — the team will be in touch.").

## Secondary flow: General application (no specific role)
1. Candidate clicks **Apply Now** from the hero without browsing positions.
2. Form opens at Step 1; Step 2's role field is optional, department still required.
3. Same Steps 2–3 and success state as above.

## Error handling
- Required-field validation runs per-step; candidate cannot advance with missing/invalid data — inline error text under each field.
- Resume rejected (wrong type or >10MB) → inline error, upload blocked, candidate stays on Step 3.
- Submission failure (network/server) → error banner on Step 3 with a Retry action; entered data is preserved.

## Navigation
- Sticky header link "Careers" / logo scrolls to top; "Apply" link jumps to `#apply`.
- Back button on Steps 2–3 returns to the previous step without losing entered data.
