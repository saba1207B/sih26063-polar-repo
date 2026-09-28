"use client";

import React from "react";
import { Container } from "@/components/ui";
import { AnimatedSection, AnimatedGrid } from "@/components/AnimatedSection";
import {
  Thermometer,
  Mountain,
  Waves,
  Wind,
  Leaf,
  Clock,
} from "lucide-react";

const scienceAreas = [
  {
    icon: Thermometer,
    title: "Climate Systems",
    description:
      "Understanding global climate mechanics through high-latitude temperature records, ice sheet energy balance, and long-term atmospheric monitoring.",
    stat: "40+ Years",
    statLabel: "Continuous Data",
  },
  {
    icon: Mountain,
    title: "Glaciology & Ice",
    description:
      "Studying continental ice sheets, sea ice extent, ice velocity dynamics, and paleoclimate signals trapped deep within ice cores.",
    stat: "4.8 km",
    statLabel: "Deepest Core",
  },
  {
    icon: Waves,
    title: "Polar Oceanography",
    description:
      "Investigating Southern and Arctic ocean circulation, deep water formation, sea surface salinity, and marine biogeochemical cycles.",
    stat: "−1.8°C",
    statLabel: "Freezing Point",
  },
  {
    icon: Wind,
    title: "Atmospheric Physics",
    description:
      "Monitoring stratospheric ozone dynamics, aerosol radiative forcing, space weather interactions, and polar vortex stability.",
    stat: "−89.2°C",
    statLabel: "Extreme Record",
  },
  {
    icon: Leaf,
    title: "Polar Ecosystems",
    description:
      "Exploring microbial extremophiles, benthic flora, and marine fauna adapted to survive extreme cold and prolonged polar darkness.",
    stat: "1,200+",
    statLabel: "Species Catalogued",
  },
  {
    icon: Clock,
    title: "Paleoclimatology",
    description:
      "Reconstructing Earth's past climate conditions through ice core gas extraction, ocean sediment proxy records, and bed rock geology.",
    stat: "800K Years",
    statLabel: "Climate Archive",
  },
];

export function IntroSection() {
  return (
    <section
      id="intro-section"
      className="relative py-24 sm:py-32 border-b border-[#0284C7]/15 bg-transparent"
    >
      <Container size="default">
        {/* Large Centered Editorial Intro Statement */}
        <AnimatedSection className="text-center max-w-4xl mx-auto mb-16 sm:mb-24 bg-white/70 backdrop-blur-md p-8 sm:p-12 rounded-3xl border border-[#0284C7]/20 shadow-xs">
          <span className="text-editorial-meta text-[#0284C7] font-bold mb-3 block tracking-widest">
            // SIH26063 — KNOWLEDGE REPOSITORY & OUTREACH
          </span>
          <h2 className="heading-section text-3xl sm:text-4xl lg:text-5xl text-[#0B1E36] mb-6 leading-[1.15]">
            A unified digital gateway to India's polar science.
          </h2>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal max-w-2xl mx-auto">
            Unifying decades of Antarctic and Arctic expeditions, open satellite and field datasets, peer-reviewed publications, and interactive scientific outreach into one modern platform.
          </p>
        </AnimatedSection>

        {/* Science Domains Grid */}
        <AnimatedGrid
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          staggerDelay={0.08}
        >
          {scienceAreas.map((area) => {
            const Icon = area.icon;
            return (
              <div
                key={area.title}
                className="bg-white/90 backdrop-blur-md p-8 border border-[#0284C7]/15 rounded-3xl flex flex-col justify-between group transition-all duration-300 hover:border-[#0284C7]/40 hover:bg-white hover:shadow-xl shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3 border border-sky-100 bg-sky-50 text-[#0284C7] group-hover:bg-[#0284C7] group-hover:text-white transition-colors rounded-2xl shadow-xs">
                      <Icon size={22} strokeWidth={1.75} />
                    </div>
                    <span className="text-editorial-meta text-[#0369A1] font-bold bg-sky-50/80 px-2.5 py-1 rounded-full border border-sky-100 text-[10px]">
                      RESEARCH DOMAIN
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#0B1E36] mb-3">
                    {area.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed mb-8">
                    {area.description}
                  </p>
                </div>

                <div className="pt-5 border-t border-slate-100 flex items-baseline justify-between">
                  <span className="text-xl font-extrabold text-[#0284C7] tracking-tight">
                    {area.stat}
                  </span>
                  <span className="text-editorial-meta text-slate-500 text-[10px] font-semibold">
                    {area.statLabel}
                  </span>
                </div>
              </div>
            );
          })}
        </AnimatedGrid>
      </Container>
    </section>
  );
}
