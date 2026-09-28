'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Container, Button } from '@/components/ui';
import { AnimatedSection } from '@/components/AnimatedSection';
import { getExpedition } from '@/services/expeditions';
import { Expedition } from '@/types';
import { ConnectedKnowledgeDiagram } from '@/components/ConnectedKnowledgeDiagram';
import { PolarLocationsMap } from '@/components/PolarLocationsMap';
import { SnowParticles } from '@/components/SnowParticles';
import { PageBackground } from '@/components/PageBackground';
import {
  MapPin,
  Calendar,
  User,
  Database,
  BookOpen,
  FileText,
  ShieldCheck,
  ArrowLeft,
  ArrowUpRight,
  ExternalLink,
  Sparkles,
} from 'lucide-react';

interface ExpeditionDetailClientProps {
  slug?: string;
}

export default function ExpeditionDetailClient({ slug: propSlug }: ExpeditionDetailClientProps) {
  const params = useParams();
  const slug = propSlug || (params?.slug as string);

  const [expedition, setExpedition] = useState<Expedition | null>(null);
  const [activeTab, setActiveTab] = useState<'english' | 'hindi'>('english');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      if (!slug) return;
      const data = await getExpedition(slug);
      setExpedition(data);
      setLoading(false);
    }
    loadData();
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-32 pb-24 min-h-screen bg-transparent relative overflow-hidden flex items-center justify-center font-mono text-xs text-[#0284C7]">
        <div className="flex items-center gap-3 p-6 bg-white/90 border border-[#0284C7]/20 rounded-2xl shadow-sm">
          <div className="w-3 h-3 rounded-full bg-[#0284C7] animate-ping" />
          <p className="animate-pulse font-semibold">LOADING SCIENTIFIC RECORD...</p>
        </div>
      </div>
    );
  }

  if (!expedition) {
    return (
      <div className="pt-32 pb-24 min-h-screen bg-transparent relative overflow-hidden flex flex-col items-center justify-center">
        <div className="bg-white/95 border border-[#0284C7]/20 p-10 rounded-3xl shadow-md text-center max-w-lg">
          <h1 className="text-2xl font-bold text-[#0B1E36] mb-4">EXPEDITION RECORD NOT FOUND</h1>
          <p className="text-slate-600 text-sm mb-6">
            The requested polar voyage record does not exist in the active institutional archive.
          </p>
          <Link href="/expeditions">
            <Button variant="primary" size="sm">
              ← Return to Expeditions
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-36 min-h-screen bg-transparent relative overflow-hidden page-enter">
      <PageBackground
        src={expedition.coverImage || '/images/polar-expedition-vessel.jpg'}
        alt={`${expedition.title} background`}
        overlayOpacity="medium"
      />
      <SnowParticles count={36} />
      <Container className="relative z-10" size="default">
        {/* Navigation Back */}
        <AnimatedSection className="mb-8">
          <Link
            href="/expeditions"
            className="inline-flex items-center gap-2 text-editorial-meta text-[#0284C7] hover:text-[#003B6D] transition-colors font-bold"
          >
            <ArrowLeft size={14} /> Back to Expeditions
          </Link>
        </AnimatedSection>

        {/* 1. Meta Label & Massive Title */}
        <AnimatedSection delay={0.05} className="mb-12">
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs mb-4">
            <span className="text-[#0369A1] bg-[#E0F2FE] border border-[#0284C7]/25 px-3 py-1 font-bold rounded-full">
              EXPEDITION // {expedition.year}
            </span>
            <span className="text-slate-700 bg-white/90 border border-slate-200 px-3 py-1 rounded-full">
              LOCATION: {expedition.location}
            </span>
          </div>

          <h1 className="heading-display text-4xl sm:text-6xl lg:text-7xl text-[#0B1E36] max-w-5xl leading-tight mb-8">
            {expedition.title}
          </h1>

          <div className="flex flex-wrap items-center gap-8 font-mono text-xs text-slate-700 border-t border-b border-[#0284C7]/15 py-4">
            <span className="flex items-center gap-2">
              <Calendar size={15} className="text-[#0284C7]" /> {expedition.dates}
            </span>
            <span className="flex items-center gap-2">
              <User size={15} className="text-[#0284C7]" /> LEADER: {expedition.leader}
            </span>
            <span className="flex items-center gap-2">
              <MapPin size={15} className="text-[#0284C7]" /> REGION: {expedition.location}
            </span>
          </div>
        </AnimatedSection>

        {/* 2. Hero Image */}
        {expedition.coverImage && (
          <AnimatedSection delay={0.1} className="mb-16">
            <div className="relative w-full h-[50vh] sm:h-[65vh] min-h-[400px] border border-[#0284C7]/20 overflow-hidden bg-slate-100 rounded-3xl shadow-lg">
              <Image
                src={expedition.coverImage}
                alt={expedition.title}
                fill
                className="editorial-image object-cover object-center rounded-3xl"
                priority
                sizes="100vw"
              />
              <div className="absolute bottom-4 left-4 right-4 z-10 font-mono text-xs text-white bg-[#0B1E36]/90 backdrop-blur-md p-3.5 border border-white/20 flex justify-between items-center rounded-2xl shadow-md">
                <span className="font-semibold">ARCHIVE LOG: {expedition.title}</span>
                <span className="hidden sm:inline text-sky-200">OFFICIAL NCPOR PHOTOGRAPHY</span>
              </div>
            </div>
          </AnimatedSection>
        )}

        {/* 3. Overview & Narrative Summary */}
        <AnimatedSection delay={0.15} className="mb-16">
          <div className="bg-white/95 backdrop-blur-md border border-[#0284C7]/20 p-8 sm:p-12 rounded-3xl shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 mb-8 gap-4">
              <h2 className="text-2xl font-bold text-[#0B1E36] flex items-center gap-3">
                <FileText size={22} className="text-[#0284C7]" /> Expedition Overview
              </h2>
              {/* Bilingual Controls */}
              <div className="flex items-center gap-1.5 border border-[#0284C7]/20 p-1 bg-[#F0F9FF] font-mono text-xs rounded-xl">
                <button
                  onClick={() => setActiveTab('english')}
                  aria-pressed={activeTab === 'english'}
                  className={`px-3 py-1.5 font-bold transition-all rounded-lg ${
                    activeTab === 'english'
                      ? 'bg-[#003B6D] text-white shadow-sm'
                      : 'text-slate-600 hover:text-[#0B1E36]'
                  }`}
                >
                  ENGLISH
                </button>
                <button
                  onClick={() => setActiveTab('hindi')}
                  aria-pressed={activeTab === 'hindi'}
                  className={`px-3 py-1.5 font-bold transition-all rounded-lg ${
                    activeTab === 'hindi'
                      ? 'bg-[#003B6D] text-white shadow-sm'
                      : 'text-slate-600 hover:text-[#0B1E36]'
                  }`}
                >
                  हिन्दी (HINDI)
                </button>
              </div>
            </div>

            {activeTab === 'english' ? (
              <p className="text-base sm:text-lg text-slate-700 font-normal leading-relaxed">
                {expedition.englishSummary}
              </p>
            ) : (
              <p className="text-base sm:text-lg text-slate-700 font-normal leading-relaxed font-sans">
                {expedition.hindiSummary}
              </p>
            )}
          </div>
        </AnimatedSection>

        {/* 4. CONNECTED KNOWLEDGE DIAGRAM */}
        <AnimatedSection delay={0.2} className="mb-16">
          <ConnectedKnowledgeDiagram expedition={expedition} />
        </AnimatedSection>

        {/* 5. Research Activities */}
        {expedition.researchActivities && expedition.researchActivities.length > 0 && (
          <AnimatedSection delay={0.25} className="mb-16">
            <div className="mb-8">
              <span className="text-editorial-meta text-[#0284C7] mb-2 block font-bold">
                // SCIENTIFIC DISCIPLINES
              </span>
              <h2 className="heading-section text-3xl font-bold text-[#0B1E36]">
                RESEARCH ACTIVITIES
              </h2>
            </div>

            <div className="space-y-6">
              {expedition.researchActivities.map((res) => (
                <div
                  key={res.id}
                  className="bg-white/95 backdrop-blur-md border border-[#0284C7]/20 p-8 rounded-3xl shadow-sm transition-all hover:border-[#0284C7]/40 hover:shadow-md"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-4 font-mono text-xs">
                    <span className="text-[#0369A1] bg-[#E0F2FE] border border-[#0284C7]/25 px-3 py-1 font-bold rounded-full">
                      {res.domain}
                    </span>
                    <span className="text-slate-600">LEAD: {res.leadResearcher}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-[#0B1E36] mb-3">{res.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">{res.description}</p>
                  <Link href="/research" className="inline-block">
                    <Button variant="outline" size="sm">
                      Explore Domain →
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </AnimatedSection>
        )}

        {/* 6. Datasets & Publications Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Connected Datasets */}
          {expedition.datasets && expedition.datasets.length > 0 && (
            <AnimatedSection delay={0.3}>
              <div className="mb-6">
                <span className="text-editorial-meta text-[#0284C7] mb-2 block font-bold">
                  // OPEN DATA ASSETS
                </span>
                <h2 className="heading-section text-2xl font-bold text-[#0B1E36]">
                  CONNECTED DATASETS
                </h2>
              </div>

              <div className="space-y-4">
                {expedition.datasets.map((ds) => (
                  <div
                    key={ds.id}
                    className="bg-white/95 backdrop-blur-md border border-[#0284C7]/20 p-6 rounded-2xl shadow-sm transition-all hover:border-[#0284C7]/40 hover:shadow-md"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="text-[#0369A1] font-mono text-xs block mb-1 font-semibold">
                          {ds.repository}
                        </span>
                        <h3 className="text-lg font-bold text-[#0B1E36] mb-2">{ds.title}</h3>
                        <p className="text-xs text-slate-600 font-mono">DOI: {ds.doi}</p>
                      </div>
                      <Link href="/datasets" className="shrink-0">
                        <Button variant="outline" size="sm" aria-label={`View dataset ${ds.title}`}>
                          <ArrowUpRight size={16} />
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          )}

          {/* Connected Publications */}
          {expedition.publications && expedition.publications.length > 0 && (
            <AnimatedSection delay={0.35}>
              <div className="mb-6">
                <span className="text-editorial-meta text-[#0284C7] mb-2 block font-bold">
                  // LITERATURE
                </span>
                <h2 className="heading-section text-2xl font-bold text-[#0B1E36]">
                  CONNECTED PUBLICATIONS
                </h2>
              </div>

              <div className="space-y-4">
                {expedition.publications.map((pub) => (
                  <div
                    key={pub.id}
                    className="bg-white/95 backdrop-blur-md border border-[#0284C7]/20 p-6 rounded-2xl shadow-sm transition-all hover:border-[#0284C7]/40 hover:shadow-md"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="text-[#0369A1] font-mono text-xs block mb-1 font-semibold">
                          {pub.year} • {pub.journal}
                        </span>
                        <h3 className="text-lg font-bold text-[#0B1E36] mb-2">{pub.title}</h3>
                        <p className="text-xs text-slate-600 font-mono">AUTHORS: {pub.authors?.join(', ')}</p>
                      </div>
                      <Link href="/publications" className="shrink-0">
                        <Button variant="outline" size="sm" aria-label={`View publication ${pub.title}`}>
                          <ArrowUpRight size={16} />
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          )}
        </div>

        {/* 7. Media */}
        {expedition.media && expedition.media.length > 0 && (
          <AnimatedSection delay={0.4} className="mb-16">
            <div className="mb-8">
              <span className="text-editorial-meta text-[#0284C7] mb-2 block font-bold">
                // PHOTOGRAPHY & FOOTAGE
              </span>
              <h2 className="heading-section text-3xl font-bold text-[#0B1E36]">
                EXPEDITION MEDIA
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {expedition.media.map((med) => (
                <div
                  key={med.id}
                  className="bg-white/95 backdrop-blur-md border border-[#0284C7]/20 overflow-hidden p-0 rounded-3xl shadow-sm transition-all hover:border-[#0284C7]/40 hover:shadow-md"
                >
                  <div className="relative h-64 w-full bg-slate-100">
                    <Image src={med.url} alt={med.title} fill className="editorial-image object-cover object-center" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-[#0B1E36] mb-2">{med.title}</h3>
                    <p className="text-xs text-slate-500 font-mono">{med.credit}</p>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        )}

        {/* 8. Location & Map */}
        <AnimatedSection delay={0.45} className="mb-16">
          <div className="mb-8">
            <span className="text-editorial-meta text-[#0284C7] mb-2 block font-bold">
              // GEOGRAPHIC DEPLOYMENT
            </span>
            <h2 className="heading-section text-3xl font-bold text-[#0B1E36]">
              LOCATION & FIELD STATIONS
            </h2>
          </div>

          <div className="bg-white/95 backdrop-blur-md border border-[#0284C7]/20 p-8 mb-8 rounded-3xl shadow-sm">
            <PolarLocationsMap />
          </div>

          {/* Accessible Text Equivalent */}
          <div className="bg-white/95 backdrop-blur-md border border-[#0284C7]/20 p-8 rounded-2xl shadow-sm font-mono text-xs text-slate-700">
            <span className="text-[#0284C7] block mb-4 font-bold text-sm">
              ACCESSIBLE LOCATION SUMMARY
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <span className="text-slate-500 block mb-1">STATION / REGION</span>
                <span className="text-[#0B1E36] font-bold text-sm">{expedition.location}</span>
              </div>
              <div>
                <span className="text-slate-500 block mb-1">OPERATIONAL TIMELINE</span>
                <span className="text-[#0B1E36] font-bold text-sm">{expedition.dates}</span>
              </div>
              <div>
                <span className="text-slate-500 block mb-1">LEAD INSTITUTION</span>
                <span className="text-[#0B1E36] font-bold text-sm">{expedition.leader}</span>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* 9. Educational Content (Myth vs Scientific Measurement) */}
        {expedition.mythVsMeasurement && expedition.mythVsMeasurement.length > 0 && (
          <AnimatedSection delay={0.5} className="mb-16">
            <div className="mb-8">
              <span className="text-editorial-meta text-[#0284C7] mb-2 block font-bold">
                // SCIENTIFIC RIGOR
              </span>
              <h2 className="heading-section text-3xl font-bold text-[#0B1E36]">
                MYTH VS. MEASURED REALITY
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {expedition.mythVsMeasurement.map((m, idx) => (
                <div
                  key={idx}
                  className="bg-white/95 backdrop-blur-md border border-[#0284C7]/20 p-8 rounded-3xl shadow-sm"
                >
                  <div className="mb-6">
                    <span className="text-rose-800 bg-rose-100/80 border border-rose-300 text-xs font-bold px-3 py-1 rounded-full inline-block">
                      COMMON MISCONCEPTION
                    </span>
                    <h3 className="text-lg font-bold text-[#0B1E36] mt-4">“{m.myth}”</h3>
                  </div>
                  <div className="pt-6 border-t border-slate-200">
                    <span className="text-sky-800 bg-[#E0F2FE] border border-[#0284C7]/30 text-xs font-bold px-3 py-1 inline-block mb-3 rounded-full">
                      MEASURED SCIENTIFIC REALITY
                    </span>
                    <p className="text-sm text-slate-700 font-medium leading-relaxed mb-4">{m.measurement}</p>
                    <p className="text-xs text-slate-500 font-mono italic">{m.scientificContext}</p>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        )}

        {/* 10. Sources & Data Provenance */}
        {expedition.sources && expedition.sources.length > 0 && (
          <AnimatedSection delay={0.55}>
            <div className="bg-white/95 backdrop-blur-md border border-[#0284C7]/20 p-8 rounded-3xl shadow-sm">
              <span className="text-editorial-meta text-[#0284C7] block mb-2 font-bold">
                // DATA PROVENANCE & ARCHIVE SOURCES
              </span>
              <h3 className="text-2xl font-bold text-[#0B1E36] mb-6 flex items-center gap-2">
                <ShieldCheck size={22} className="text-[#0284C7]" /> Verified Repositories
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-mono text-xs">
                {expedition.sources.map((src) => (
                  <div
                    key={src.id}
                    className="p-6 bg-[#F8FAFC] border border-[#0284C7]/15 rounded-2xl"
                  >
                    <div className="font-bold text-[#0B1E36] text-sm mb-1">{src.repository}</div>
                    <div className="text-slate-600">{src.externalId}</div>
                    <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] text-slate-500 flex justify-between">
                      <span className="font-semibold text-[#0369A1]">STATUS: {src.status}</span>
                      <span>SYNCED: {src.lastSynced?.slice(0, 10)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        )}
      </Container>
    </div>
  );
}
