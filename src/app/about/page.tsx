'use client';

import React from 'react';
import Image from 'next/image';
import { Container, Badge } from '@/components/ui';
import { Compass, Globe, Users, Sparkles, Building2, ShieldCheck } from 'lucide-react';
import { SnowParticles } from '@/components/SnowParticles';
import { AnimatedSection, AnimatedGrid } from '@/components/AnimatedSection';
import { PageBackground } from '@/components/PageBackground';

export default function AboutPage() {
  return (
    <div className="pt-32 pb-36 min-h-screen bg-transparent relative overflow-hidden page-enter">
      <PageBackground
        src="/images/polar-station.jpg"
        alt="Antarctic Bharati and Maitri scientific research stations background"
        overlayOpacity="medium"
      />
      <SnowParticles count={36} />
      <Container className="relative z-10" size="default">
        {/* Header & Photographic Hero */}
        <AnimatedSection className="mb-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <span className="text-editorial-meta text-[#0284C7] mb-3 block font-bold">
                // INSTITUTIONAL MISSION & DIGITAL ARCHITECTURE
              </span>
              <h1 className="heading-section text-4xl sm:text-6xl text-[#0B1E36] mb-6">
                ABOUT POLAR COMMONS
              </h1>
              <p className="text-base sm:text-lg text-slate-600 font-normal max-w-2xl leading-relaxed">
                Bridging cold scientific repositories, ice core palaeoclimate databases, and citizen science literacy through a story-driven digital knowledge layer for Indian polar exploration.
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="relative h-64 sm:h-72 w-full rounded-3xl overflow-hidden border border-[#0284C7]/20 shadow-md">
                <Image
                  src="/images/polar-station.jpg"
                  alt="Modern Antarctic research station on stilts with satcom radome under clear polar skies"
                  fill
                  className="editorial-image object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  priority
                />
                <div className="absolute bottom-3 left-3 right-3 bg-[#0B1E36]/90 backdrop-blur-md px-3.5 py-2 rounded-xl text-white font-mono text-[11px] flex justify-between items-center border border-white/20">
                  <span className="font-semibold">BHARATI & MAITRI STATIONS</span>
                  <span className="text-sky-200">NCPOR OPERATIONAL BASE</span>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        <div className="space-y-10 max-w-4xl mx-auto">
          {/* Section 1: What the platform does */}
          <AnimatedSection delay={0.05}>
            <div className="bg-white/95 backdrop-blur-md border border-[#0284C7]/20 p-8 sm:p-10 rounded-3xl shadow-sm transition-all hover:border-[#0284C7]/40 hover:shadow-md">
              <div className="w-12 h-12 bg-[#F0F9FF] border border-[#0284C7]/20 flex items-center justify-center mb-5 rounded-2xl text-[#0284C7]">
                <Compass size={22} />
              </div>
              <h2 className="text-2xl font-bold text-[#0B1E36] mb-3">What The Platform Does</h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                The <strong>Polar Science Knowledge Repository (SIH26063)</strong> is a public-friendly, semantically connected knowledge layer built over existing national and international polar-science archives, including the National Polar Data Center (NPDC/NCPOR), PANGAEA, and the Australian Antarctic Data Centre (AADC). Rather than functioning as an inaccessible data warehouse, it integrates expeditions, in-situ field research, open datasets, peer-reviewed publications, and high-resolution media into an intuitive, narrative-driven exploration gateway.
              </p>
            </div>
          </AnimatedSection>

          {/* Section 2: Why polar knowledge matters */}
          <AnimatedSection delay={0.1}>
            <div className="bg-white/95 backdrop-blur-md border border-[#0284C7]/20 p-8 sm:p-10 rounded-3xl shadow-sm transition-all hover:border-[#0284C7]/40 hover:shadow-md">
              <div className="w-12 h-12 bg-[#F0F9FF] border border-[#0284C7]/20 flex items-center justify-center mb-5 rounded-2xl text-[#0284C7]">
                <Globe size={22} />
              </div>
              <h2 className="text-2xl font-bold text-[#0B1E36] mb-3">Why Polar Knowledge Matters</h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                The polar regions act as Earth’s primary thermodynamic thermostat, locking over 70% of planetary freshwater in the cryosphere and driving deep-water thermohaline conveyor currents. Continuous observations of Antarctic ice core stratigraphy, atmospheric ozone depletion, and Arctic sea-ice extent are foundational for predicting monsoon teleconnections and developing climate resilience models for the Indian subcontinent.
              </p>
            </div>
          </AnimatedSection>

          {/* Section 3: Target Users & SIH26063 Context */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatedSection delay={0.15}>
              <div className="bg-white/95 backdrop-blur-md border border-[#0284C7]/20 p-8 rounded-3xl shadow-sm h-full transition-all hover:border-[#0284C7]/40 hover:shadow-md">
                <div className="w-12 h-12 bg-[#F0F9FF] border border-[#0284C7]/20 flex items-center justify-center mb-5 rounded-2xl text-[#0284C7]">
                  <Users size={22} />
                </div>
                <h3 className="text-xl font-bold text-[#0B1E36] mb-3">Target User Personas</h3>
                <ul className="text-xs sm:text-sm text-slate-600 space-y-2.5">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7] mt-2 shrink-0" />
                    <span><strong className="text-[#0B1E36]">Students:</strong> Story voyages, simplified concepts & bilingual summaries.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7] mt-2 shrink-0" />
                    <span><strong className="text-[#0B1E36]">Teachers:</strong> Verified lesson modules & classroom facts.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7] mt-2 shrink-0" />
                    <span><strong className="text-[#0B1E36]">Researchers:</strong> Instant linkages between DOIs, datasets & expeditions.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7] mt-2 shrink-0" />
                    <span><strong className="text-[#0B1E36]">Public:</strong> Photographic archives & Indian polar history.</span>
                  </li>
                </ul>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="bg-white/95 backdrop-blur-md border border-[#0284C7]/20 p-8 rounded-3xl shadow-sm h-full transition-all hover:border-[#0284C7]/40 hover:shadow-md">
                <div className="w-12 h-12 bg-[#F0F9FF] border border-[#0284C7]/20 flex items-center justify-center mb-5 rounded-2xl text-[#0284C7]">
                  <Sparkles size={22} />
                </div>
                <h3 className="text-xl font-bold text-[#0B1E36] mb-3">SIH 2026 Problem Statement</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  Problem ID <strong>SIH26063</strong> challenges teams to design an engaging, intuitive digital knowledge portal that unlocks complex scientific repositories for the public and research communities while preserving full data lineage, DOI attribution, and repository integrity.
                </p>
              </div>
            </AnimatedSection>
          </div>

          {/* Section 4: Public Outreach & Research Connection */}
          <AnimatedSection delay={0.25}>
            <div className="bg-[#F0F9FF] border border-[#0284C7]/20 p-8 sm:p-10 rounded-3xl text-center shadow-xs">
              <Badge variant="glow" className="mb-3">
                RESEARCH TO OUTREACH PIPELINE
              </Badge>
              <h2 className="text-2xl font-bold text-[#0B1E36] mb-3">
                Expedition → Data → Discovery
              </h2>
              <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Every photograph, ice core stratigraphy profile, and peer-reviewed publication on this portal retains direct lineage to its originating expedition voyage and official scientific repository source record.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </Container>
    </div>
  );
}
