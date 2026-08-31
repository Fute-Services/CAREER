"use client";

import Image from "next/image";

export default function Navbar({ onApplyClick }: { onApplyClick: () => void }) {
  return (
    <header className="border-b border-neutral-100 bg-white px-6 py-4 text-neutral-950">
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        <a href="#top" className="flex items-center" aria-label="Futé Services careers">
          <Image
            src="/fute-services-logo.png"
            alt="Futé Services"
            width={252}
            height={80}
            priority
            className="h-11 w-auto object-contain"
          />
        </a>
        <nav className="hidden items-center gap-6 text-[10px] font-semibold uppercase tracking-[0.12em] text-neutral-500 md:flex">
          <a href="#top" className="transition-colors hover:text-neutral-950">Home</a>
          <a href="#positions" className="transition-colors hover:text-neutral-950">Open roles</a>
          <a href="#apply" className="transition-colors hover:text-neutral-950">Apply</a>
        </nav>
        <button type="button" onClick={onApplyClick} className="rounded-full bg-neutral-950 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.11em] text-white transition-colors hover:bg-[#b11c24]">
          Join Futé now
        </button>
      </div>
    </header>
  );
}
