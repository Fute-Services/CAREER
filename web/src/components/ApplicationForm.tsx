"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { positions, type Department } from "@/data/positions";

const departments: Department[] = ["Visualisation", "Creative", "Technology", "People & Operations", "Growth"];
const MAX_RESUME_BYTES = 10 * 1024 * 1024;

export interface Prefill {
  department?: Department;
  roleId?: string;
}

export default function ApplicationForm({ prefill }: { prefill: Prefill }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [department, setDepartment] = useState<Department | "">(prefill.department ?? "");
  const [roleId, setRoleId] = useState(prefill.roleId ?? "");
  const [profile, setProfile] = useState("");
  const [resume, setResume] = useState<File | null>(null);
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const selectedRole = positions.find((position) => position.id === roleId);

  function selectRole(nextRoleId: string) {
    setRoleId(nextRoleId);
    const nextRole = positions.find((position) => position.id === nextRoleId);
    if (nextRole) setDepartment(nextRole.department);
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!name.trim() || !/^\S+@\S+\.\S+$/.test(email) || !phone.trim() || !location.trim() || !department || !profile.trim()) {
      setError("Please complete all required fields.");
      return;
    }
    if (!resume) {
      setError("Please upload your résumé.");
      return;
    }
    if (!/\.(pdf|doc|docx)$/i.test(resume.name) || resume.size > MAX_RESUME_BYTES) {
      setError("Upload a PDF, DOC, or DOCX file up to 10 MB.");
      return;
    }
    if (!consent) {
      setError("Please confirm the recruitment privacy notice.");
      return;
    }
    setError("");
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <section id="apply" className="bg-white px-6 py-20 md:py-28">
        <div className="mx-auto max-w-xl border border-neutral-200 p-9 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ad151c]">Application received</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-neutral-950">Thank you, {name}.</h2>
          <p className="mt-4 text-sm leading-relaxed text-neutral-600">
            Your application{selectedRole ? ` for ${selectedRole.title}` : ""} has been recorded for the Futé Services recruitment team.
          </p>
        </div>
      </section>
    );
  }

  const roleOptions = [
    { value: "", label: "General application" },
    ...positions
      .filter((position) => !department || position.department === department)
      .map((position) => ({ value: position.id, label: position.title })),
  ];

  const departmentOptions = [
    { value: "", label: "Select department" },
    ...departments.map((item) => ({ value: item, label: item })),
  ];

  return (
    <section id="apply" className="bg-white px-6 py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-[.85fr_1.15fr] lg:gap-16">
        <div className="flex flex-col space-y-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ad151c]">Hiring Process</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
              Your path to joining Futé.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600">
              Our evaluation is structured, fast, and respectful of your time. Here is the step-by-step roadmap from application to offer.
            </p>
          </div>

          {/* Vertical Timeline Roadmap */}
          <div className="relative space-y-6 pl-8 before:absolute before:bottom-3 before:left-[13px] before:top-3 before:w-0.5 before:bg-gradient-to-b before:from-[#ad151c] before:via-[#ad151c]/40 before:to-neutral-200">
            {/* Step 1 */}
            <div className="group relative rounded-xl border border-neutral-100 bg-[#fafaf8] p-4 transition-all hover:border-[#ad151c]/40 hover:bg-white hover:shadow-sm">
              <span className="absolute -left-8 top-4 flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#ad151c] bg-white text-[11px] font-bold text-[#ad151c] shadow-xs transition-colors group-hover:bg-[#ad151c] group-hover:text-white">
                01
              </span>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-neutral-950">Application Submission</h3>
                <span className="rounded-full bg-[#ad151c]/10 px-2.5 py-0.5 text-[10px] font-semibold text-[#ad151c]">Day 1</span>
              </div>
              <p className="mt-1 text-xs leading-relaxed text-neutral-600">
                Share your details, select your target role or general interest, and attach your latest résumé/portfolio.
              </p>
            </div>

            {/* Step 2 */}
            <div className="group relative rounded-xl border border-neutral-100 bg-[#fafaf8] p-4 transition-all hover:border-[#ad151c]/40 hover:bg-white hover:shadow-sm">
              <span className="absolute -left-8 top-4 flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#ad151c]/70 bg-white text-[11px] font-bold text-[#ad151c] shadow-xs transition-colors group-hover:bg-[#ad151c] group-hover:text-white">
                02
              </span>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-neutral-950">Portfolio & Profile Review</h3>
                <span className="rounded-full bg-neutral-200/70 px-2.5 py-0.5 text-[10px] font-semibold text-neutral-700">Day 2–3</span>
              </div>
              <p className="mt-1 text-xs leading-relaxed text-neutral-600">
                Our domain leads review your skills, craftsmanship, and problem-solving mindset for the role.
              </p>
            </div>

            {/* Step 3 */}
            <div className="group relative rounded-xl border border-neutral-100 bg-[#fafaf8] p-4 transition-all hover:border-[#ad151c]/40 hover:bg-white hover:shadow-sm">
              <span className="absolute -left-8 top-4 flex h-7 w-7 items-center justify-center rounded-full border-2 border-neutral-300 bg-white text-[11px] font-bold text-neutral-700 shadow-xs transition-colors group-hover:border-[#ad151c] group-hover:text-[#ad151c]">
                03
              </span>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-neutral-950">Interactive Discussion</h3>
                <span className="rounded-full bg-neutral-200/70 px-2.5 py-0.5 text-[10px] font-semibold text-neutral-700">Day 4–5</span>
              </div>
              <p className="mt-1 text-xs leading-relaxed text-neutral-600">
                A 1-on-1 technical or creative discussion to understand your workflow, vision, tools, and mutual fit.
              </p>
            </div>

            {/* Step 4 */}
            <div className="group relative rounded-xl border border-neutral-100 bg-[#fafaf8] p-4 transition-all hover:border-[#ad151c]/40 hover:bg-white hover:shadow-sm">
              <span className="absolute -left-8 top-4 flex h-7 w-7 items-center justify-center rounded-full border-2 border-neutral-300 bg-white text-[11px] font-bold text-neutral-700 shadow-xs transition-colors group-hover:border-[#ad151c] group-hover:text-[#ad151c]">
                04
              </span>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-neutral-950">Offer & Onboarding</h3>
                <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-800">Final Step</span>
              </div>
              <p className="mt-1 text-xs leading-relaxed text-neutral-600">
                Formal offer rollout and structured onboarding to start creating high-impact real estate solutions.
              </p>
            </div>
          </div>

          {/* Perks / Culture Highlight Pills */}
          <div className="rounded-2xl border border-neutral-200/90 bg-[#fafaf8] p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500">Why Build with Us</p>
            <div className="mt-3 grid grid-cols-2 gap-2 text-xs font-medium text-neutral-800">
              <div className="flex items-center gap-2.5 rounded-lg border border-neutral-200/60 bg-white p-2.5 shadow-xs">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#ad151c]" />
                <span>High-Impact Projects</span>
              </div>
              <div className="flex items-center gap-2.5 rounded-lg border border-neutral-200/60 bg-white p-2.5 shadow-xs">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#ad151c]" />
                <span>Fast Career Growth</span>
              </div>
              <div className="flex items-center gap-2.5 rounded-lg border border-neutral-200/60 bg-white p-2.5 shadow-xs">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#ad151c]" />
                <span>Modern Toolstack</span>
              </div>
              <div className="flex items-center gap-2.5 rounded-lg border border-neutral-200/60 bg-white p-2.5 shadow-xs">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#ad151c]" />
                <span>17+ Years Legacy</span>
              </div>
            </div>
            <div className="mt-3.5 flex items-center gap-2 border-t border-neutral-200/60 pt-3 text-[11px] text-neutral-500">
              <span className="font-semibold text-[#ad151c]">Fast Response Guarantee:</span>
              <span>Every applicant receives a status update.</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="rounded-2xl border border-[#990f1b] bg-[#800913] p-6 text-white shadow-xl sm:p-9">
          <div className="flex items-start justify-between gap-6 border-b border-white/15 pb-6">
            <div>
              <h3 className="text-xl font-semibold text-white">Candidate details</h3>
              <p className="mt-1 text-sm text-white/70">All fields marked * are required.</p>
            </div>
            {selectedRole && <span className="hidden text-right text-xs font-medium text-white/90 sm:block">Applying for<br /><span className="font-semibold text-white">{selectedRole.title}</span></span>}
          </div>

          <div className="mt-7 grid gap-5 sm:grid-cols-2">
            <Field label="Full name *"><input className="input" value={name} onChange={(event) => setName(event.target.value)} placeholder="Enter your full name" /></Field>
            <Field label="Mobile number *"><input className="input" value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="e.g. +91 98765 43210" /></Field>
            <Field label="Email address *"><input className="input" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="name@email.com" /></Field>
            <Field label="Current location *"><input className="input" value={location} onChange={(event) => setLocation(event.target.value)} placeholder="City, State / Country" /></Field>
          </div>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <Field label="Department *">
              <AppleSelect
                value={department}
                placeholder="Select department"
                options={departmentOptions}
                onChange={(val) => {
                  setDepartment(val as Department);
                  setRoleId("");
                }}
              />
            </Field>
            <Field label="Role (optional)">
              <AppleSelect
                value={roleId}
                placeholder="General application"
                options={roleOptions}
                onChange={(val) => selectRole(val)}
              />
            </Field>
          </div>

          <div className="mt-5">
            <Field label="Work profile *"><textarea className="input min-h-32 resize-y" value={profile} onChange={(event) => setProfile(event.target.value)} placeholder="Tell us about your experience, skills, tools, and the kind of role you are looking for." /></Field>
          </div>

          <div className="mt-5">
            <span className="text-xs font-semibold uppercase tracking-wider text-white/90">Upload your résumé *</span>
            <input ref={fileInputRef} type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={(event) => setResume(event.target.files?.[0] ?? null)} />
            <button type="button" onClick={() => fileInputRef.current?.click()} className="mt-2 flex w-full items-center justify-between rounded-lg border border-dashed border-white/40 bg-white/10 px-4 py-3.5 text-left text-sm text-white transition-colors hover:border-white hover:bg-white/15">
              <span className={resume ? "font-medium text-white" : "text-white/70"}>{resume?.name ?? "PDF, DOC or DOCX · maximum 10 MB"}</span>
              <span className="rounded bg-white/20 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-white">Browse</span>
            </button>
          </div>

          <label className="mt-6 flex items-start gap-3 text-xs leading-relaxed text-white/80">
            <input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} className="mt-0.5 accent-[#d90c13]" />
            <span>I confirm that the information provided is accurate and consent to Futé Services using it for recruitment purposes.</span>
          </label>
          {error && <p className="mt-4 rounded-lg bg-white/95 px-3.5 py-2 text-sm font-semibold text-[#800913]">{error}</p>}
          <button type="submit" className="mt-7 inline-flex items-center justify-center rounded-xl bg-white px-7 py-3.5 text-xs font-bold uppercase tracking-[0.13em] text-[#800913] shadow-md transition-all hover:bg-neutral-100 hover:shadow-lg">Submit application <span className="ml-3 text-base leading-none">→</span></button>
          <p className="mt-5 text-xs text-white/60">Your details are used only for recruitment and candidate evaluation.</p>
        </form>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><span className="text-xs font-semibold uppercase tracking-wider text-white/90">{label}</span><div className="mt-2">{children}</div></label>;
}

interface AppleSelectProps {
  value: string;
  placeholder: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}

function AppleSelect({ value, placeholder, options, onChange }: AppleSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Apple-style Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-xl border border-neutral-200 bg-white px-3.5 py-2.5 text-left text-sm text-neutral-900 shadow-sm transition-all hover:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-white/40"
      >
        <span className={value ? "font-medium text-neutral-900" : "text-neutral-400"}>
          {selectedOption && selectedOption.value !== "" ? selectedOption.label : placeholder}
        </span>
        <svg
          className={`ml-2 h-4 w-4 text-neutral-400 transition-transform duration-200 ${isOpen ? "rotate-180 text-neutral-800" : ""}`}
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
        >
          <path d="M6 8l4 4 4-4" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Apple-style Glassmorphism Popover Menu */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full z-50 mt-1.5 max-h-60 overflow-y-auto rounded-xl border border-neutral-200/90 bg-white/95 p-1.5 shadow-2xl backdrop-blur-xl transition-all">
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <button
                key={option.value || "default"}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                  isSelected
                    ? "bg-[#800913]/10 font-semibold text-[#800913]"
                    : "text-neutral-800 hover:bg-neutral-100/90"
                }`}
              >
                <span>{option.label}</span>
                {isSelected && (
                  <svg className="h-4 w-4 text-[#800913]" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
