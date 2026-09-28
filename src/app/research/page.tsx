'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Container, Button } from '@/components/ui';
import { mockResearchActivities, mockExpeditions, mockDatasets, mockPublications } from '@/data/mockData';
import { User, Database, BookOpen, Tag, Compass, ArrowUpRight } from 'lucide-react';
import { SnowParticles } from '@/components/SnowParticles';
import { AnimatedSection } from '@/components/AnimatedSection';
import { PageBackground } from '@/components/PageBackground';

export default function ResearchPage() {
  return (
    <div className="pt-32 pb-36 min-h-screen bg-transparent relative overflow-hidden page-enter">
      <PageBackground
        src="/images/polar-aerial.jpg"
        alt="Polar cryosphere glacial landscape and research field background"
        overlayOpacity="medium"
      />
      <SnowParticles count={36} />
      <Container className="relative z-10" size="default">
        {/* Header & Photographic Hero */}
        <AnimatedSection className="mb-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <span className="text-editorial-meta text-[#0284C7] mb-3 block font-bold">
                // SCIENTIFIC DISCIPLINES & EXPERIMENTS
              </span>
              <h1 className="heading-section text-4xl sm:text-6xl text-[#0B1E36] mb-6">
                RESEARCH ACTIVITIES
              </h1>
              <p className="text-base sm:text-lg text-slate-600 font-normal max-w-2xl leading-relaxed">
                Multi-disciplinary scientific programs spanning Antarctic ice sheet mass balance, Southern Ocean hydrography, cryosphere geochemistry, and Arctic atmospheric physics.
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="relative h-64 sm:h-72 w-full rounded-3xl overflow-hidden border border-[#0284C7]/20 shadow-md">
                <Image
                  src="/images/polar-scientists-fieldwork.jpg"
                  alt="Polar scientists deploying automated weather station and ice radar"
                  fill
                  className="editorial-image object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  priority
                />
                <div className="absolute bottom-3 left-3 right-3 bg-[#0B1E36]/90 backdrop-blur-md px-3.5 py-2 rounded-xl text-white font-mono text-[11px] flex justify-between items-center border border-white/20">
                  <span className="font-semibold">FIELD CRYOSPHERE LAB</span>
                  <span className="text-sky-200">IN-SITU OBSERVATION</span>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Research List */}
        <div className="space-y-8">
          {mockResearchActivities.map((res) => {
            const relatedExped = mockExpeditions.find((e) => e.id === res.expeditionId);
            const relatedDs = mockDatasets.filter((d) => (res.datasetIds || []).includes(d.id));
            const relatedPubs = mockPublications.filter((p) => (res.publicationIds || []).includes(p.id));

            return (
              <AnimatedSection key={res.id}>
                <div className="bg-white/95 backdrop-blur-md border border-[#0284C7]/20 p-8 sm:p-10 rounded-3xl shadow-sm transition-all hover:border-[#0284C7]/40 hover:shadow-md">
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-4 font-mono text-xs">
                    <div className="flex items-center gap-2.5">
                      <span className="text-[#0369A1] bg-[#E0F2FE] border border-[#0284C7]/25 px-3 py-1 font-bold rounded-full">
                        {res.domain}
                      </span>
                      <span className="text-slate-700 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-full">
                        STATUS: {res.status}
                      </span>
                    </div>
                    <span className="text-slate-600 flex items-center gap-1.5 font-sans font-medium">
                      <User size={14} className="text-[#0284C7]" /> Lead: {res.leadResearcher}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-bold text-[#0B1E36] mb-4">{res.title}</h2>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal mb-8">
                    {res.description}
                  </p>

                  {/* Topics */}
                  <div className="flex flex-wrap items-center gap-2 mb-8 font-mono text-xs">
                    <span className="text-[#0284C7] flex items-center gap-1 font-bold mr-1">
                      <Tag size={13} /> TOPICS:
                    </span>
                    {(res.topics || []).map((t, idx) => (
                      <span
                        key={idx}
                        className="text-[#0369A1] bg-[#F0F9FF] border border-[#0284C7]/20 px-3 py-1 rounded-full"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Grid for Connected Expedition, Datasets & Publications */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-[#0284C7]/15 font-mono text-xs">
                    {/* Expedition */}
                    <div>
                      <span className="text-[#0284C7] block mb-2 font-bold flex items-center gap-1">
                        <Compass size={13} /> ASSOCIATED EXPEDITION
                      </span>
                      {relatedExped ? (
                        <Link
                          href={`/expeditions/${relatedExped.slug}`}
                          className="font-bold text-[#0B1E36] hover:text-[#0284C7] hover:underline flex items-center gap-1 line-clamp-2"
                        >
                          {relatedExped.title} <ArrowUpRight size={14} className="shrink-0" />
                        </Link>
                      ) : (
                        <span className="text-slate-500">General Long-Term Monitoring</span>
                      )}
                    </div>

                    {/* Datasets */}
                    <div>
                      <span className="text-[#0284C7] block mb-2 font-bold flex items-center gap-1">
                        <Database size={13} /> PRODUCED DATASETS ({relatedDs.length})
                      </span>
                      <ul className="space-y-1.5">
                        {relatedDs.map((d) => (
                          <li key={d.id}>
                            <Link
                              href="/datasets"
                              className="text-[#0B1E36] hover:text-[#0284C7] hover:underline line-clamp-1 block"
                            >
                              {d.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Publications */}
                    <div>
                      <span className="text-[#0284C7] block mb-2 font-bold flex items-center gap-1">
                        <BookOpen size={13} /> RESULTING PAPERS ({relatedPubs.length})
                      </span>
                      <ul className="space-y-1.5">
                        {relatedPubs.map((p) => (
                          <li key={p.id}>
                            <Link
                              href="/publications"
                              className="text-[#0B1E36] hover:text-[#0284C7] hover:underline line-clamp-1 block"
                            >
                              {p.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
