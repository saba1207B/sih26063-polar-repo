'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Container, Button } from '@/components/ui';
import { mockMediaAssets, mockExpeditions } from '@/data/mockData';
import { Camera, Video, MapPin, ShieldCheck, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { SnowParticles } from '@/components/SnowParticles';
import { AnimatedSection, AnimatedGrid } from '@/components/AnimatedSection';
import { PageBackground } from '@/components/PageBackground';

export default function MediaPage() {
  const [filter, setFilter] = useState<'all' | 'image' | 'video'>('all');

  const filteredMedia = mockMediaAssets.filter((m) =>
    filter === 'all' ? true : m.type === filter
  );

  return (
    <div className="pt-32 pb-36 min-h-screen bg-transparent relative overflow-hidden page-enter">
      <PageBackground
        src="/images/polar-underwater-iceberg.jpg"
        alt="Submerged crystalline Antarctic iceberg background"
        overlayOpacity="medium"
      />
      <SnowParticles count={36} />
      <Container className="relative z-10" size="default">
        {/* Header */}
        <AnimatedSection className="mb-12">
          <span className="text-editorial-meta text-[#0284C7] mb-3 block font-bold">
            // VISUAL ARCHIVE & DIGITAL ASSET MANAGEMENT
          </span>
          <h1 className="heading-section text-4xl sm:text-6xl text-[#0B1E36] mb-6">
            MEDIA EXPLORER
          </h1>
          <p className="text-base sm:text-lg text-slate-600 font-normal max-w-2xl leading-relaxed">
            High-resolution documentary photography, aerial mapping scans, and expedition video footage capturing Indian polar station logistics, ice shelf topography, and marine research voyages.
          </p>
        </AnimatedSection>

        {/* Filter Controls */}
        <AnimatedSection delay={0.05} className="mb-12">
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`px-4 py-2.5 border transition-all rounded-xl ${
                filter === 'all'
                  ? 'bg-[#003B6D] text-white border-[#003B6D] font-bold shadow-sm'
                  : 'bg-white/90 text-slate-700 border-slate-200 hover:border-[#0284C7]/40 hover:text-[#0B1E36]'
              }`}
            >
              ALL ASSETS ({mockMediaAssets.length})
            </button>
            <button
              type="button"
              onClick={() => setFilter('image')}
              className={`flex items-center gap-2 px-4 py-2.5 border transition-all rounded-xl ${
                filter === 'image'
                  ? 'bg-[#003B6D] text-white border-[#003B6D] font-bold shadow-sm'
                  : 'bg-white/90 text-slate-700 border-slate-200 hover:border-[#0284C7]/40 hover:text-[#0B1E36]'
              }`}
            >
              <Camera size={14} /> PHOTOGRAPHS
            </button>
            <button
              type="button"
              onClick={() => setFilter('video')}
              className={`flex items-center gap-2 px-4 py-2.5 border transition-all rounded-xl ${
                filter === 'video'
                  ? 'bg-[#003B6D] text-white border-[#003B6D] font-bold shadow-sm'
                  : 'bg-white/90 text-slate-700 border-slate-200 hover:border-[#0284C7]/40 hover:text-[#0B1E36]'
              }`}
            >
              <Video size={14} /> VIDEOS & TIME-LAPSES
            </button>
          </div>
        </AnimatedSection>

        {/* Disciplined Editorial Media Grid */}
        <AnimatedGrid className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10" staggerDelay={0.08}>
          {filteredMedia.map((med) => {
            const relatedExp = mockExpeditions.find((e) => e.id === med.expeditionId);

            return (
              <div
                key={med.id}
                className="bg-white/95 backdrop-blur-md border border-[#0284C7]/20 rounded-3xl overflow-hidden shadow-sm flex flex-col justify-between group transition-all hover:border-[#0284C7]/40 hover:shadow-md"
              >
                <div>
                  <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-slate-100">
                    <Image
                      src={med.url}
                      alt={med.title}
                      fill
                      className="editorial-image object-cover object-center"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute top-4 right-4 z-10">
                      <span className="text-white bg-[#0B1E36]/90 border border-white/20 px-3 py-1 font-bold rounded-full font-mono text-[10px] backdrop-blur-md shadow-sm">
                        {med.type.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 sm:p-8">
                    <h2 className="text-xl sm:text-2xl font-bold text-[#0B1E36] mb-3 group-hover:text-[#0284C7] transition-colors">
                      {med.title}
                    </h2>

                    <div className="flex items-center gap-2 text-xs text-slate-600 font-mono mb-5">
                      <MapPin size={14} className="text-[#0284C7] shrink-0" />
                      <span>{med.locationName}</span>
                    </div>

                    <div className="p-4 bg-[#F0F9FF] border border-[#0284C7]/20 font-mono text-xs text-slate-700 space-y-1.5 rounded-2xl">
                      <div className="flex items-center gap-1.5 text-[#0369A1] font-bold">
                        <ShieldCheck size={14} /> {med.license}
                      </div>
                      <div>Source: {med.source}</div>
                      <div className="italic text-[11px] text-slate-500">{med.credit}</div>
                    </div>
                  </div>
                </div>

                {relatedExp && (
                  <div className="px-6 sm:px-8 py-4 bg-slate-50/70 border-t border-[#0284C7]/15 flex items-center justify-between font-mono text-xs text-slate-700">
                    <span className="line-clamp-1 font-medium">Expedition: {relatedExp.title}</span>
                    <Link
                      href={`/expeditions/${relatedExp.slug}`}
                      className="text-[#0284C7] hover:text-[#003B6D] hover:underline flex items-center gap-1 font-bold shrink-0 ml-2"
                    >
                      Voyage Record <ArrowUpRight size={14} />
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </AnimatedGrid>
      </Container>
    </div>
  );
}
