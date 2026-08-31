"use client";

const clientLogos = [
  { id: 1, src: "/clients/client-1.webp", alt: "Brand Partner 1" },
  { id: 2, src: "/clients/client-2.webp", alt: "Brand Partner 2" },
  { id: 3, src: "/clients/client-3.webp", alt: "Brand Partner 3" },
  { id: 4, src: "/clients/client-4.webp", alt: "Brand Partner 4" },
  { id: 5, src: "/clients/client-5.webp", alt: "Brand Partner 5" },
  { id: 6, src: "/clients/client-6.webp", alt: "Brand Partner 6" },
  { id: 7, src: "/clients/client-7.webp", alt: "Brand Partner 7" },
  { id: 8, src: "/clients/client-8.webp", alt: "Brand Partner 8" },
  { id: 9, src: "/clients/client-9.webp", alt: "Brand Partner 9" },
  { id: 10, src: "/clients/client-10.webp", alt: "Brand Partner 10" },
  { id: 11, src: "/clients/client-11.webp", alt: "Brand Partner 11" },
  { id: 12, src: "/clients/client-12.webp", alt: "Brand Partner 12" },
  { id: 13, src: "/clients/client-13.webp", alt: "Brand Partner 13" },
  { id: 14, src: "/clients/client-14.webp", alt: "Brand Partner 14" },
  { id: 15, src: "/clients/client-15.webp", alt: "Brand Partner 15" },
  { id: 16, src: "/clients/client-16.jpg", alt: "Brand Partner 16" },
  { id: 17, src: "/clients/client-17.jpg", alt: "Brand Partner 17" },
];

export default function ClientsMarquee() {
  return (
    <section className="relative w-full overflow-hidden border-y border-neutral-100 bg-[#fafaf8] py-8">
      {/* Soft gradient edge fade */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-24 bg-gradient-to-r from-[#fafaf8] to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-24 bg-gradient-to-l from-[#fafaf8] to-transparent" />

      {/* Infinite Left to Right Scrolling Logos without any boxes */}
      <div className="animate-marquee-ltr flex items-center gap-14">
        {[...clientLogos, ...clientLogos].map((client, index) => (
          <div
            key={`${client.id}-${index}`}
            className="flex shrink-0 items-center justify-center"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={client.src}
              alt={client.alt}
              className="h-8 md:h-10 w-auto max-w-[150px] object-contain mix-blend-multiply opacity-65 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 hover:scale-110"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
