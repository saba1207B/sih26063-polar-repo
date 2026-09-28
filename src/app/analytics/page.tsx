'use client';

import React from 'react';
import { Container, Badge } from '@/components/ui';
import { BarChart3, Database, Globe, BookOpen, Layers, Activity } from 'lucide-react';
import { SnowParticles } from '@/components/SnowParticles';
import { AnimatedSection, AnimatedGrid } from '@/components/AnimatedSection';
import { PageBackground } from '@/components/PageBackground';

const stats = [
  { label: 'Total Expeditions Catalogued', value: '42', change: '+3 THIS YEAR', icon: Globe },
  { label: 'Open Data Repositories Synced', value: '3 MAJOR', change: 'NPDC, PANGAEA, AADC', icon: Database },
  { label: 'Scientific Publications Linked', value: '680+', change: '100% DOI MAPPED', icon: BookOpen },
  { label: 'High-Res Media Assets', value: '3,340', change: 'CREATIVE COMMONS', icon: Layers },
];

export default function AnalyticsPage() {
  return (
    <div className="pt-32 pb-36 min-h-screen bg-transparent relative overflow-hidden page-enter">
      <PageBackground
        src="/images/polar-instruments.jpg"
        alt="Polar atmospheric telemetry instruments and cryosphere observatories background"
        overlayOpacity="medium"
      />
      <SnowParticles count={36} />
      <Container className="relative z-10" size="default">
        {/* Header */}
        <AnimatedSection className="mb-14">
          <span className="text-editorial-meta text-[#0284C7] mb-3 block font-bold">
            // REPOSITORY IMPACT & DATA INVENTORY METRICS
          </span>
          <h1 className="heading-section text-4xl sm:text-6xl text-[#0B1E36] mb-6">
            ANALYTICS & METRICS
          </h1>
          <p className="text-base sm:text-lg text-slate-600 font-normal max-w-2xl leading-relaxed">
            High-level overview of polar science observational data volumes, institutional repository coverage, and scientific citation lineage.
          </p>
        </AnimatedSection>

        {/* Stats Grid */}
        <AnimatedGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12" staggerDelay={0.06}>
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="bg-white/95 backdrop-blur-md border border-[#0284C7]/20 p-6 rounded-3xl shadow-sm transition-all hover:border-[#0284C7]/40 hover:shadow-md"
              >
                <div className="w-12 h-12 bg-[#F0F9FF] border border-[#0284C7]/20 flex items-center justify-center mb-4 rounded-2xl text-[#0284C7]">
                  <Icon size={22} />
                </div>
                <div className="text-3xl font-bold text-[#0B1E36] tracking-tight font-mono">{s.value}</div>
                <div className="text-xs font-semibold text-slate-700 mt-1">{s.label}</div>
                <div className="text-[10px] text-[#0369A1] bg-[#E0F2FE] px-2.5 py-0.5 rounded-full inline-block mt-3 font-mono font-bold uppercase border border-[#0284C7]/20">
                  {s.change}
                </div>
              </div>
            );
          })}
        </AnimatedGrid>

        {/* Domain Distribution & Data Growth */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatedSection delay={0.1}>
            <div className="bg-white/95 backdrop-blur-md border border-[#0284C7]/20 p-8 rounded-3xl shadow-sm h-full">
              <h3 className="text-xl font-bold text-[#0B1E36] mb-4 flex items-center gap-2">
                <Activity size={20} className="text-[#0284C7]" aria-hidden="true" /> Research Domain Coverage
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-6 font-normal">
                Relative distribution of archived datasets and active scientific missions across primary disciplines.
              </p>
              <div
                className="space-y-4 text-xs"
                role="img"
                aria-label="Bar chart showing research domain coverage: Atmospheric Science 35%, Glaciology 28%, Oceanography 22%, Geology 15%"
              >
                <div>
                  <div className="flex justify-between text-slate-700 mb-1.5 font-mono">
                    <span className="font-semibold text-[#0B1E36]">ATMOSPHERIC SCIENCE</span>
                    <span className="font-bold text-[#0284C7]">35%</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 border border-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-[#0284C7] w-[35%] rounded-full" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-700 mb-1.5 font-mono">
                    <span className="font-semibold text-[#0B1E36]">GLACIOLOGY & MASS BALANCE</span>
                    <span className="font-bold text-[#0284C7]">28%</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 border border-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-[#0284C7] w-[28%] rounded-full" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-700 mb-1.5 font-mono">
                    <span className="font-semibold text-[#0B1E36]">OCEANOGRAPHY & MARINE BIOLOGY</span>
                    <span className="font-bold text-[#0284C7]">22%</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 border border-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-[#0891B2] w-[22%] rounded-full" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-700 mb-1.5 font-mono">
                    <span className="font-semibold text-[#0B1E36]">GEOLOGY & PALAEOCLIMATOLOGY</span>
                    <span className="font-bold text-[#0284C7]">15%</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 border border-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-[#0369A1] w-[15%] rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <div className="bg-white/95 backdrop-blur-md border border-[#0284C7]/20 p-8 rounded-3xl shadow-sm h-full">
              <h3 className="text-xl font-bold text-[#0B1E36] mb-4 flex items-center gap-2">
                <BarChart3 size={20} className="text-[#0284C7]" aria-hidden="true" /> Repository Data Growth
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-6 font-normal">
                Total volume of digitized polar observation records harvested across NPDC/NCPOR and international partner archives over time.
              </p>
              <div
                className="flex items-end justify-between gap-3 h-44 pt-4 border-b border-slate-200 px-2"
                role="img"
                aria-label="Column chart displaying repository data growth from 2020 to 2024"
              >
                {[
                  { year: '2020', height: 'h-12', label: '1.2 TB' },
                  { year: '2021', height: 'h-16', label: '2.8 TB' },
                  { year: '2022', height: 'h-24', label: '5.4 TB' },
                  { year: '2023', height: 'h-32', label: '9.1 TB' },
                  { year: '2024', height: 'h-40', label: '14.6 TB' },
                ].map((bar, bIdx) => (
                  <div key={bIdx} className="flex flex-col items-center gap-2 flex-1 group">
                    <span className="text-[10px] text-slate-400 font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                      {bar.label}
                    </span>
                    <div
                      className={`w-full ${bar.height} bg-[#0284C7] rounded-t-xl group-hover:bg-[#003B6D] transition-colors shadow-xs`}
                    />
                    <span className="text-[11px] text-slate-600 font-mono font-medium">{bar.year}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </Container>
    </div>
  );
}
