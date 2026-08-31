"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PositionsList from "@/components/PositionsList";
import CultureQuote from "@/components/CultureQuote";
import ClientsMarquee from "@/components/ClientsMarquee";
import ApplicationForm, { type Prefill } from "@/components/ApplicationForm";
import Footer from "@/components/Footer";
import type { Position } from "@/data/positions";

export default function Home() {
  const [prefill, setPrefill] = useState<Prefill>({});

  function applyTo(position?: Position) {
    if (position) {
      setPrefill({ department: position.department, roleId: position.id });
    } else {
      setPrefill({});
    }
    setTimeout(() => {
      document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-neutral-900 selection:bg-neutral-900 selection:text-white">
      {/* Top Navbar */}
      <Navbar onApplyClick={() => applyTo()} />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onApply={() => applyTo()}
        />

        <PositionsList onApply={applyTo} />

        <CultureQuote />

        {/* Clean Logo-only Marquee */}
        <ClientsMarquee />

        {/* Interactive Application Form */}
        <ApplicationForm key={prefill.roleId ?? "general"} prefill={prefill} />
      </main>

      {/* Multi-column Untitled UI Footer */}
      <Footer />
    </div>
  );
}
