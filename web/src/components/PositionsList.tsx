"use client";

import { useState } from "react";
import { departmentGroups, positions, type Position } from "@/data/positions";

export default function PositionsList({ onApply }: { onApply: (position: Position) => void }) {
  const [selectedDepartment, setSelectedDepartment] = useState<"All" | Position["department"]>("All");
  const visiblePositions = positions.filter((position) => selectedDepartment === "All" || position.department === selectedDepartment);

  return (
    <section id="positions" className="bg-[#fafaf8] px-6 pb-20 md:pb-24">
      <div className="mx-auto max-w-5xl border-t border-neutral-200 pt-8">
        <div className="flex flex-wrap gap-2">
          {(["All", ...departmentGroups] as const).map((department) => (
            <button
              key={department}
              type="button"
              onClick={() => setSelectedDepartment(department)}
              className={`rounded-full border px-3 py-1.5 text-[10px] font-semibold transition-colors ${selectedDepartment === department ? "border-neutral-950 bg-neutral-950 text-white" : "border-neutral-300 bg-white text-neutral-600 hover:border-neutral-950 hover:text-neutral-950"}`}
            >
              {department === "All" ? "All roles" : department}
            </button>
          ))}
        </div>

        <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {visiblePositions.map((position) => (
            <article
              key={position.id}
              onClick={() => onApply(position)}
              className="group flex cursor-pointer flex-col justify-between rounded-xl border border-[#f5d0d6] bg-[#fdf1f3] p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#ad151c] hover:bg-[#fce5ea] hover:shadow-sm"
            >
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#a84452] transition-colors group-hover:text-[#ad151c]">
                  {position.department}
                </span>
                <h2 className="mt-1 text-sm font-semibold leading-snug tracking-tight text-neutral-950">
                  {position.title}
                </h2>
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-[#f5d0d6]/70 pt-2.5">
                <span className="text-[11px] font-medium text-neutral-600">Open Role</span>
                <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-neutral-950 transition-colors group-hover:text-[#ad151c]">
                  Apply <span className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
