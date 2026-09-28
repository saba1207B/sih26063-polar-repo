'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Container, Button, Badge } from '@/components/ui';
import { AnimatedSection, AnimatedGrid } from '@/components/AnimatedSection';
import { mockDatasets } from '@/data/mockData';
import { Dataset } from '@/types';
import { MapPin, Tag, ExternalLink, X, Database, CheckCircle2, ShieldCheck, Download } from 'lucide-react';
import { SnowParticles } from '@/components/SnowParticles';
import { PageBackground } from '@/components/PageBackground';
import { getDatasets, getDatasetDownloadUrl } from '@/services/datasets';

export default function DatasetsPage() {
  const [datasets, setDatasets] = useState<Dataset[]>(mockDatasets);
  const [selectedDataset, setSelectedDataset] = useState<Dataset | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const live = await getDatasets();
        if (live && live.length > 0) {
          setDatasets(live);
        }
      } catch (e) {
        console.error('Failed to load live datasets from backend:', e);
      }
    }
    loadData();
  }, []);

  useEffect(() => {
    if (selectedDataset) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedDataset) {
        setSelectedDataset(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedDataset]);

  return (
    <div className="pt-32 pb-36 min-h-screen bg-transparent relative overflow-hidden page-enter">
      <PageBackground
        src="/images/polar-ice-core-lab.jpg"
        alt="Polar ice core research laboratory and dataset records background"
        overlayOpacity="medium"
      />
      <SnowParticles count={36} />
      <Container className="relative z-10" size="default">
        {/* Header & Photographic Hero */}
        <AnimatedSection className="mb-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <span className="text-editorial-meta text-[#0284C7] mb-3 block font-bold">
                // OPEN SCIENTIFIC REPOSITORIES & DATA CATALOG
              </span>
              <h1 className="heading-section text-4xl sm:text-6xl text-[#0B1E36] mb-6">
                POLAR DATASETS
              </h1>
              <p className="text-base sm:text-lg text-slate-600 font-normal max-w-2xl leading-relaxed">
                Access calibrated physical oceanography CTD casts, ice core geochemistry profiles, spectral albedo measurements, and automated meteorology records from Indian polar stations.
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="relative h-64 sm:h-72 w-full rounded-3xl overflow-hidden border border-[#0284C7]/20 shadow-md">
                <Image
                  src="/images/polar-instruments.jpg"
                  alt="Glaciologist measuring ice core sample with precision instruments in field lab"
                  fill
                  className="editorial-image object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  priority
                />
                <div className="absolute bottom-3 left-3 right-3 bg-[#0B1E36]/90 backdrop-blur-md px-3.5 py-2 rounded-xl text-white font-mono text-[11px] flex justify-between items-center border border-white/20">
                  <span className="font-semibold">ICE CORE STRATIGRAPHY</span>
                  <span className="text-sky-200">NPDC DATA CITATION VERIFIED</span>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Dataset List */}
        <AnimatedGrid className="space-y-6" staggerDelay={0.06}>
          {datasets.map((ds) => (
            <div
              key={ds.id}
              className="bg-white/95 backdrop-blur-md border border-[#0284C7]/20 p-6 sm:p-8 rounded-3xl shadow-sm transition-all hover:border-[#0284C7]/40 hover:shadow-md"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="space-y-3 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="glow">{ds.repository}</Badge>
                    <Badge variant="outline">{ds.status}</Badge>
                    <span className="text-xs text-slate-500 font-mono">
                      {ds.format} • {ds.size}
                    </span>
                  </div>

                  <h2
                    tabIndex={0}
                    role="button"
                    onClick={() => setSelectedDataset(ds)}
                    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSelectedDataset(ds)}
                    className="text-xl sm:text-2xl font-bold text-[#0B1E36] hover:text-[#0284C7] transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0284C7] rounded"
                  >
                    {ds.title}
                  </h2>

                  <p className="text-sm text-slate-600 leading-relaxed line-clamp-2">
                    {ds.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 pt-1">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Tag size={13} className="text-[#0284C7]" /> {ds.researchTopic}
                    </span>
                    <span className="flex items-center gap-1.5 font-medium">
                      <MapPin size={13} className="text-[#0284C7]" /> {ds.locationName}
                    </span>
                    <span className="font-mono text-slate-500">DOI: {ds.doi}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-3 shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                  <Button
                    variant="primary"
                    size="sm"
                    className="text-xs min-h-[44px] px-5 gap-2"
                    onClick={() => setSelectedDataset(ds)}
                  >
                    <Database size={14} /> View Dataset Details
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </AnimatedGrid>
      </Container>

      {/* Dataset Detail Modal */}
      {selectedDataset && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B1E36]/60 backdrop-blur-md"
          onClick={() => setSelectedDataset(null)}
          role="presentation"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="dataset-modal-title"
            aria-describedby="dataset-modal-description"
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl bg-white border border-[#0284C7]/25 p-6 sm:p-8 rounded-3xl relative max-h-[85vh] overflow-y-auto shadow-2xl"
          >
            <button
              type="button"
              onClick={() => setSelectedDataset(null)}
              aria-label="Close dataset modal"
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-500 hover:text-[#0B1E36] hover:bg-slate-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0284C7] min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <Badge variant="glow">{selectedDataset.repository}</Badge>
              <Badge variant="default">{selectedDataset.status}</Badge>
            </div>

            <h2 id="dataset-modal-title" className="text-xl sm:text-2xl font-bold text-[#0B1E36] mb-4 pr-8">
              {selectedDataset.title}
            </h2>

            <p id="dataset-modal-description" className="text-sm text-slate-600 leading-relaxed mb-6">
              {selectedDataset.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-700 mb-6 bg-[#F0F9FF] p-5 rounded-2xl border border-[#0284C7]/20">
              <div>
                <span className="text-slate-500 uppercase text-[10px] block font-mono">Research Topic</span>
                <span className="text-[#0B1E36] font-semibold text-sm">{selectedDataset.researchTopic}</span>
              </div>
              <div>
                <span className="text-slate-500 uppercase text-[10px] block font-mono">Location</span>
                <span className="text-[#0B1E36] font-semibold text-sm">{selectedDataset.locationName}</span>
              </div>
              <div>
                <span className="text-slate-500 uppercase text-[10px] block font-mono">Digital Object Identifier (DOI)</span>
                <span className="text-[#0284C7] font-mono font-semibold">{selectedDataset.doi}</span>
              </div>
              <div>
                <span className="text-slate-500 uppercase text-[10px] block font-mono">Open License</span>
                <span className="text-[#0B1E36] font-semibold">{selectedDataset.license}</span>
              </div>
              <div>
                <span className="text-slate-500 uppercase text-[10px] block font-mono">Data Format & Size</span>
                <span className="text-[#0B1E36] font-semibold">
                  {selectedDataset.format} ({selectedDataset.size})
                </span>
              </div>
              <div>
                <span className="text-slate-500 uppercase text-[10px] block font-mono">Publication Date</span>
                <span className="text-[#0B1E36] font-semibold">{selectedDataset.publicationDate}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-200">
              <a
                href={getDatasetDownloadUrl(selectedDataset.id, 'csv')}
                target="_blank"
                rel="noopener noreferrer"
                className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0284C7] rounded"
              >
                <Button variant="outline" size="sm" className="gap-2 text-xs min-h-[44px] px-4 font-mono">
                  <Download size={14} className="text-[#0284C7]" /> Download Sample (.csv)
                </Button>
              </a>

              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setSelectedDataset(null)}
                  className="min-h-[44px] px-5"
                >
                  Close
                </Button>
                <a
                  href={`https://doi.org/${selectedDataset.doi}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0284C7] rounded"
                >
                  <Button variant="primary" size="sm" className="gap-2 text-xs min-h-[44px] px-5">
                    Access via Repository <ExternalLink size={14} />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
