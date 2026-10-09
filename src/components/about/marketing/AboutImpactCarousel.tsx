"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

type Slide = { quote: string; attribution: string; role: string };

type Props = {
  slides: Slide[];
};

export function AboutImpactCarousel({ slides }: Props) {
  const [index, setIndex] = useState(0);
  const total = slides.length;
  const current = slides[index] ?? slides[0];

  if (!current) return null;

  return (
    <div>
      <span className="text-6xl font-serif leading-none text-[#FF6600]" aria-hidden>&ldquo;</span>
      <blockquote className="-mt-2 max-w-2xl text-base font-semibold leading-snug text-white sm:text-xl md:text-2xl">
        {current.quote}
      </blockquote>
      <p className="mt-6 text-sm font-bold uppercase tracking-[0.2em] text-[#FF6600]">{current.role}</p>
      <p className="mt-1 text-sm text-white/80">{current.attribution}</p>
      <div className="mt-10 flex items-center justify-end gap-4">
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={cn(
                "h-2 w-2 rounded-full transition",
                i === index ? "bg-[#FF6600]" : "bg-white/40",
              )}
            />
          ))}
        </div>
        <button
          type="button"
          aria-label="Previous"
          onClick={() => setIndex((i) => (i - 1 + total) % total)}
          className="tap-target flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white hover:border-[#FF6600]"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          aria-label="Next"
          onClick={() => setIndex((i) => (i + 1) % total)}
          className="tap-target flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white hover:border-[#FF6600]"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
