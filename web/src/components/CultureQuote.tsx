"use client";

import { useEffect, useState } from "react";

const quotes = [
  {
    quote: "“For 17+ years, our work has helped ideas become experiences people can see, understand, and remember.”",
    author: "Futé Services · Legacy & Craft",
  },
  {
    quote: "“We don’t just render spaces. We solve real estate’s biggest challenges through design and technology.”",
    author: "Futé Services · Vision & Strategy",
  },
  {
    quote: "“Turning complex blueprints into living, emotional, and unforgettable architectural experiences.”",
    author: "Futé Services · Visualisation Studio",
  },
  {
    quote: "“Bridging the gap between imagination and reality to build what truly moves people.”",
    author: "Futé Services · Innovation & Art",
  },
  {
    quote: "“Where craft meets code to empower developers and creators across the globe.”",
    author: "Futé Services · Digital Products",
  },
];

export default function CultureQuote() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % quotes.length);
        setIsFading(false);
      }, 350);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  function handleSelect(index: number) {
    if (index === currentIndex) return;
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsFading(false);
    }, 250);
  }

  const current = quotes[currentIndex];

  return (
    <section className="relative overflow-hidden bg-white px-6 py-20 md:py-24">
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <div className="min-h-[120px] flex items-center justify-center">
          <p
            className={`text-2xl font-semibold tracking-[-0.035em] text-neutral-950 transition-all duration-300 sm:text-3xl ${
              isFading ? "translate-y-2 opacity-0" : "translate-y-0 opacity-100"
            }`}
          >
            {current.quote}
          </p>
        </div>

        <p
          className={`mt-5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#ad151c] transition-opacity duration-300 ${
            isFading ? "opacity-0" : "opacity-100"
          }`}
        >
          {current.author}
        </p>

        {/* Indicator dots */}
        <div className="mt-8 flex items-center gap-2">
          {quotes.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelect(idx)}
              aria-label={`Go to quote ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentIndex ? "w-7 bg-[#ad151c]" : "w-1.5 bg-neutral-200 hover:bg-neutral-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
