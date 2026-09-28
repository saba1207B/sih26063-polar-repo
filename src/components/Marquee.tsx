"use client";

import React from "react";

const concepts = [
  "ANTARCTICA",
  "ARCTIC",
  "EXPEDITIONS",
  "RESEARCH",
  "DATASETS",
  "PUBLICATIONS",
  "MEDIA",
  "EDUCATION",
];

export function Marquee() {
  const marqueeItems = [...concepts, ...concepts, ...concepts, ...concepts];

  return (
    <div className="w-full bg-white/50 backdrop-blur-md border-y border-[#0284C7]/20 overflow-hidden py-5 select-none shadow-xs">
      <div className="animate-marquee items-center gap-12 sm:gap-16">
        {marqueeItems.map((item, idx) => (
          <div key={idx} className="flex items-center gap-12 sm:gap-16 shrink-0">
            <span className="text-lg sm:text-xl font-extrabold tracking-[0.2em] text-[#0B1E36] hover:text-[#0284C7] transition-colors duration-300">
              {item}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7]/40" aria-hidden="true" />
          </div>
        ))}
      </div>
    </div>
  );
}
