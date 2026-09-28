'use client';

import React from 'react';
import Link from 'next/link';
import { Container, Button, Badge } from '@/components/ui';
import { FileText, Database, BookOpen, Camera, Video, Building2, ArrowRight } from 'lucide-react';
import { PolarLocationsMap } from '@/components/PolarLocationsMap';
import { SnowParticles } from '@/components/SnowParticles';
import { AnimatedSection, AnimatedGrid } from '@/components/AnimatedSection';
import { PageBackground } from '@/components/PageBackground';

const knowledgeCategories = [
  {
    icon: FileText,
    title: 'Expedition Reports',
    count: '42 REPORTS',
    description:
      'Official voyage logs, daily field records, and end-of-mission scientific summaries from Indian Antarctic & Arctic expeditions.',
    href: '/expeditions',
    badge: 'NPDC ARCHIVE',
  },
  {
    icon: Database,
    title: 'Scientific Datasets',
    count: '1,450 DATASETS',
    description:
      'Open-access time series, oceanographic CTD profiles, atmospheric sensor records, and ice core physical chemistry data.',
    href: '/datasets',
    badge: 'PANGAEA & NPDC',
  },
  {
    icon: BookOpen,
    title: 'Publications',
    count: '680+ PAPERS',
    description:
      'Peer-reviewed journal articles, conference papers, and monograph chapters published by Indian polar scientists.',
    href: '/publications',
    badge: 'PEER REVIEWED',
  },
  {
    icon: Camera,
    title: 'Photographs',
    count: '3,200 PHOTOS',
    description:
      'High-resolution field photography covering station construction, ice core sampling, wildlife, and polar landscapes.',
    href: '/media',
    badge: 'OPEN LICENSE',
  },
  {
    icon: Video,
    title: 'Videos',
    count: '140+ VIDEOS',
    description:
      'Expedition video footage, underwater ROV recordings, airborne drone mapping, and polar science documentaries.',
    href: '/media',
    badge: 'VIDEO ARCHIVE',
  },
  {
    icon: Building2,
    title: 'Institutional Activities',
    count: '12 ORGANIZATIONS',
    description:
      'Collaborative programs involving NCPOR, ISRO, Survey of India, Geological Survey of India, and university labs.',
    href: '/research',
    badge: 'MULTI-INSTITUTIONAL',
  },
];

export default function KnowledgePage() {
  return (
    <div className="pt-32 pb-36 min-h-screen bg-transparent relative overflow-hidden page-enter">
      <PageBackground
        src="/images/polar-knowledge-aurora.jpg"
        alt="Aurora Australis over polar research observatory background"
        overlayOpacity="medium"
      />
      <SnowParticles count={36} />
      <Container className="relative z-10" size="default">
        {/* Header */}
        <AnimatedSection className="mb-14">
          <span className="text-editorial-meta text-[#0284C7] mb-3 block font-bold">
            // KNOWLEDGE GRAPH TAXONOMY & DIRECTORY
          </span>
          <h1 className="heading-section text-4xl sm:text-6xl text-[#0B1E36] mb-6">
            RESOURCE DIRECTORY
          </h1>
          <p className="text-base sm:text-lg text-slate-600 font-normal max-w-2xl leading-relaxed">
            Explore the connected scientific repository of polar science assets organized across six core knowledge and observational domains.
          </p>
        </AnimatedSection>

        {/* Polar Station Map */}
        <AnimatedSection delay={0.05} className="mb-14">
          <PolarLocationsMap />
        </AnimatedSection>

        {/* Categories Grid */}
        <AnimatedGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8" staggerDelay={0.06}>
          {knowledgeCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.title}
                className="bg-white/95 backdrop-blur-md border border-[#0284C7]/20 p-8 rounded-3xl shadow-sm flex flex-col justify-between group transition-all hover:border-[#0284C7]/40 hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3 border border-[#0284C7]/20 bg-[#F0F9FF] text-[#0284C7] group-hover:bg-[#0284C7] group-hover:text-white transition-colors rounded-2xl shadow-xs">
                      <Icon size={22} strokeWidth={1.8} />
                    </div>
                    <span className="text-editorial-meta text-[#0369A1] bg-[#E0F2FE] border border-[#0284C7]/25 px-3 py-1 rounded-full font-bold">
                      {cat.badge}
                    </span>
                  </div>

                  <span className="text-editorial-meta text-[#0284C7] font-bold block mb-2">{cat.count}</span>
                  <h2 className="text-2xl font-bold text-[#0B1E36] mb-3 group-hover:text-[#0284C7] transition-colors">
                    {cat.title}
                  </h2>
                  <p className="text-sm text-slate-600 leading-relaxed mb-8 font-normal">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-5 border-t border-slate-100">
                  <Link href={cat.href}>
                    <Button variant="outline" size="sm" className="w-full justify-center gap-1.5">
                      Explore Category <ArrowRight size={14} />
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </AnimatedGrid>
      </Container>
    </div>
  );
}
