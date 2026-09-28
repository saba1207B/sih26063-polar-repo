'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Container, Button, Badge } from '@/components/ui';
import { AnimatedSection, AnimatedGrid } from '@/components/AnimatedSection';
import { mockPublications, mockExpeditions } from '@/data/mockData';
import { Publication, Expedition } from '@/types';
import { BookOpen, ExternalLink, X, Users, ArrowUpRight } from 'lucide-react';
import { SnowParticles } from '@/components/SnowParticles';
import { PageBackground } from '@/components/PageBackground';
import { getPublications } from '@/services/publications';
import { getExpeditions } from '@/services/expeditions';

export default function PublicationsPage() {
  const [publications, setPublications] = useState<Publication[]>(mockPublications);
  const [expeditions, setExpeditions] = useState<Expedition[]>(mockExpeditions);
  const [selectedPub, setSelectedPub] = useState<Publication | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [livePubs, liveExpeds] = await Promise.all([
          getPublications(),
          getExpeditions(),
        ]);
        if (livePubs && livePubs.length > 0) setPublications(livePubs);
        if (liveExpeds && liveExpeds.length > 0) setExpeditions(liveExpeds);
      } catch (e) {
        console.error('Failed to load publications from backend:', e);
      }
    }
    loadData();
  }, []);

  useEffect(() => {
    if (selectedPub) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedPub) {
        setSelectedPub(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedPub]);

  return (
    <div className="pt-32 pb-36 min-h-screen bg-transparent relative overflow-hidden page-enter">
      <PageBackground
        src="/images/polar-scientists-fieldwork.jpg"
        alt="Polar scientists conducting fieldwork research for publications background"
        overlayOpacity="medium"
      />
      <SnowParticles count={36} />
      <Container className="relative z-10" size="default">
        {/* Header & Photographic Hero */}
        <AnimatedSection className="mb-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <span className="text-editorial-meta text-[#0284C7] mb-3 block font-bold">
                // PEER-REVIEWED LITERATURE & MONOGRAPHS
              </span>
              <h1 className="heading-section text-4xl sm:text-6xl text-[#0B1E36] mb-6">
                SCIENTIFIC PUBLICATIONS
              </h1>
              <p className="text-base sm:text-lg text-slate-600 font-normal max-w-2xl leading-relaxed">
                Discover peer-reviewed articles, expedition scientific reports, and monographs authored by Indian researchers spanning Antarctic cryosphere dynamics, polar genomics, and Arctic sea-ice change.
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="relative h-64 sm:h-72 w-full rounded-3xl overflow-hidden border border-[#0284C7]/20 shadow-md">
                <Image
                  src="/images/polar-underwater-iceberg.jpg"
                  alt="Massive polar iceberg submerged keel scientific study"
                  fill
                  className="editorial-image object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  priority
                />
                <div className="absolute bottom-3 left-3 right-3 bg-[#0B1E36]/90 backdrop-blur-md px-3.5 py-2 rounded-xl text-white font-mono text-[11px] flex justify-between items-center border border-white/20">
                  <span className="font-semibold">GLACIAL ARCHIVE</span>
                  <span className="text-sky-200">100% DOI GROUNDED</span>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Publications List */}
        <AnimatedGrid className="space-y-6" staggerDelay={0.06}>
          {publications.map((pub) => {
            const relatedExp = expeditions.find(
              (e) => e.id === pub.relatedExpeditionId || (pub.relatedExpeditionId && e.slug.includes(pub.relatedExpeditionId))
            );

            return (
              <div
                key={pub.id}
                className="bg-white/95 backdrop-blur-md border border-[#0284C7]/20 p-6 sm:p-8 rounded-3xl shadow-sm transition-all hover:border-[#0284C7]/40 hover:shadow-md"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="space-y-3 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="glow">{pub.year}</Badge>
                      <span className="text-xs text-[#0369A1] font-mono font-semibold bg-[#E0F2FE] px-2.5 py-0.5 rounded-full border border-[#0284C7]/20">
                        {pub.journal}
                      </span>
                    </div>

                    <h2
                      tabIndex={0}
                      role="button"
                      onClick={() => setSelectedPub(pub)}
                      onKeyDown={(e) =>
                        (e.key === 'Enter' || e.key === ' ') && setSelectedPub(pub)
                      }
                      className="text-xl sm:text-2xl font-bold text-[#0B1E36] hover:text-[#0284C7] transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0284C7] rounded"
                    >
                      {pub.title}
                    </h2>

                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <Users size={14} className="text-[#0284C7] shrink-0" />
                      <span className="font-medium">{(pub.authors || []).join(', ')}</span>
                    </div>

                    <p className="text-sm text-slate-600 leading-relaxed line-clamp-2">
                      {pub.abstract || pub.description}
                    </p>

                    {relatedExp && (
                      <div className="pt-1 text-xs text-slate-600 flex items-center gap-1.5">
                        <span className="text-slate-400 font-mono">Related Expedition:</span>
                        <Link
                          href={`/expeditions/${relatedExp.slug}`}
                          className="text-[#0284C7] hover:underline font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0284C7] rounded"
                        >
                          {relatedExp.title} →
                        </Link>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-3 shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                    <span className="text-[11px] font-mono text-slate-500">DOI: {pub.doi}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs min-h-[44px] px-5 gap-2"
                      onClick={() => setSelectedPub(pub)}
                    >
                      <BookOpen size={14} /> Read Abstract
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </AnimatedGrid>
      </Container>

      {/* Abstract Modal */}
      {selectedPub && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B1E36]/60 backdrop-blur-md"
          onClick={() => setSelectedPub(null)}
          role="presentation"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="pub-modal-title"
            aria-describedby="pub-modal-abstract"
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl bg-white border border-[#0284C7]/25 p-6 sm:p-8 rounded-3xl relative max-h-[85vh] overflow-y-auto shadow-2xl"
          >
            <button
              type="button"
              onClick={() => setSelectedPub(null)}
              aria-label="Close publication details modal"
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-500 hover:text-[#0B1E36] hover:bg-slate-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0284C7] min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <Badge variant="glow">{selectedPub.year}</Badge>
              <span className="text-xs text-[#0369A1] font-mono font-semibold bg-[#E0F2FE] px-2.5 py-0.5 rounded-full border border-[#0284C7]/20">
                {selectedPub.journal}
              </span>
            </div>

            <h2 id="pub-modal-title" className="text-xl sm:text-2xl font-bold text-[#0B1E36] mb-3 pr-8">
              {selectedPub.title}
            </h2>

            <div className="text-xs text-slate-600 mb-6 bg-slate-50 p-3 rounded-xl border border-slate-200">
              <strong className="text-[#0B1E36]">Authors:</strong> {(selectedPub.authors || []).join(', ')}
            </div>

            <h3 className="text-xs font-bold uppercase tracking-wider text-[#0284C7] mb-2 font-mono">
              Scientific Abstract
            </h3>
            <p id="pub-modal-abstract" className="text-sm text-slate-700 leading-relaxed mb-6 font-normal">
              {selectedPub.abstract || selectedPub.description}
            </p>

            <div className="p-4 rounded-2xl bg-[#F0F9FF] border border-[#0284C7]/20 text-xs text-slate-700 space-y-2 mb-6 font-mono">
              <div>
                <strong className="text-[#0B1E36]">Repository Archive:</strong> {selectedPub.repository}
              </div>
              <div>
                <strong className="text-[#0B1E36]">Digital Object Identifier:</strong>{' '}
                <span className="text-[#0284C7] font-semibold">{selectedPub.doi}</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setSelectedPub(null)}
                className="min-h-[44px] px-5"
              >
                Close
              </Button>
              <a
                href={selectedPub.doi?.startsWith('http') ? selectedPub.doi : `https://doi.org/${selectedPub.doi}`}
                target="_blank"
                rel="noopener noreferrer"
                className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0284C7] rounded"
              >
                <Button variant="primary" size="sm" className="gap-2 text-xs min-h-[44px] px-5">
                  Publisher DOI Link <ExternalLink size={14} />
                </Button>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
