import LiquidEther from "./LiquidEther";

export default function Hero({ onApply }: { onApply: () => void }) {
  return (
    <section id="top" className="relative overflow-hidden bg-[#fafaf8] px-6 py-16 md:py-20">
      <div className="absolute inset-0">
        <LiquidEther
          colors={["#b11c24", "#ff7a45", "#f6d3a7"]}
          backgroundColor="#fafaf8"
          lightMode
          mouseForce={18}
          cursorSize={110}
          resolution={0.5}
          autoDemo
          autoSpeed={0.4}
          autoIntensity={1.8}
          autoResumeDelay={2500}
          autoRampDuration={0.8}
        />
      </div>
      <div className="relative mx-auto max-w-5xl">
        <h1 className="max-w-3xl text-4xl font-semibold tracking-[-0.045em] text-neutral-950 sm:text-5xl">
          We turn ideas into works of art that redefine real estate.
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-neutral-600">
          Join Futé Services to bridge craft, technology, and strategy, shaping 3D experiences, software, and solutions for the real estate industry.
        </p>
        <div className="mt-7 flex items-center gap-4">
          <a href="#positions" className="rounded-full bg-neutral-950 px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#b11c24]">
            Explore roles
          </a>
          <button type="button" onClick={onApply} className="text-xs font-semibold text-neutral-700 transition-colors hover:text-[#b11c24]">
            Send a general application →
          </button>
        </div>
      </div>
    </section>
  );
}
