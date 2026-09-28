'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Badge, Button } from '@/components/ui';
import { MapPin, List, Map as MapIcon, ExternalLink, Compass } from 'lucide-react';

export interface LocationItem {
  id: string;
  name: string;
  coordinates: string;
  region: 'Antarctica' | 'Arctic' | 'Southern Ocean';
  expeditionTitle: string;
  expeditionSlug: string;
  description: string;
  xPercent: number;
  yPercent: number;
}

export const polarLocations: LocationItem[] = [
  {
    id: 'maitri',
    name: 'Maitri Station',
    coordinates: '70°45\'57"S, 11°44\'09"E',
    region: 'Antarctica',
    expeditionTitle: '38th Indian Scientific Expedition to Antarctica',
    expeditionSlug: '38th-indian-antarctic-exped',
    description: "India's second permanent Antarctic research station located in Schirmacher Oasis. Operational since 1989 for ozone, atmospheric, and biological studies.",
    xPercent: 42,
    yPercent: 48,
  },
  {
    id: 'bharati',
    name: 'Bharati Station',
    coordinates: '69°24\'28"S, 76°11\'14"E',
    region: 'Antarctica',
    expeditionTitle: '40th Indian Scientific Expedition to Antarctica',
    expeditionSlug: '40th-indian-antarctic-exped',
    description: "India's third Antarctic research facility situated in Larsemann Hills. State-of-the-art oceanographic, marine biological, and atmospheric testing lab.",
    xPercent: 78,
    yPercent: 62,
  },
  {
    id: 'dakshin-gangotri',
    name: 'Dakshin Gangotri (Historical)',
    coordinates: '70°05\'37"S, 12°00\'00"E',
    region: 'Antarctica',
    expeditionTitle: 'First Indian Antarctic Expedition (1981)',
    expeditionSlug: '38th-indian-antarctic-exped',
    description: 'First permanent Indian settlement in Antarctica established during 1983-84. Currently preserved as a historical meteorological supply site.',
    xPercent: 38,
    yPercent: 52,
  },
  {
    id: 'himadri',
    name: 'Himadri Arctic Station',
    coordinates: '78°55\'N, 11°56\'E',
    region: 'Arctic',
    expeditionTitle: 'Indian Arctic Expedition to Svalbard',
    expeditionSlug: 'indian-arctic-expedition-2022',
    description: "India's first Arctic research station located at Ny-Ålesund, Svalbard, Norway. Focuses on glaciology, atmospheric chemistry, and biological aerosol tracking.",
    xPercent: 28,
    yPercent: 18,
  },
  {
    id: 'indarc',
    name: 'IndARC Underwater Observatory',
    coordinates: '78°54\'N, 11°53\'E',
    region: 'Arctic',
    expeditionTitle: 'IndARC Oceanographic Mooring Mission',
    expeditionSlug: 'indian-arctic-expedition-2022',
    description: 'Multi-sensor moored underwater observatory submerged in Kongsfjorden fjord to measure Atlantic water inflow into the Arctic ocean.',
    xPercent: 22,
    yPercent: 24,
  },
  {
    id: 'prydz-bay',
    name: 'Prydz Bay Marine Survey Track',
    coordinates: '68°45\'S, 74°10\'E',
    region: 'Southern Ocean',
    expeditionTitle: 'Southern Ocean Research Vessel Survey',
    expeditionSlug: '40th-indian-antarctic-exped',
    description: 'High-resolution CTD oceanographic transect mapping Antarctic Bottom Water formation and phytoplankton carbon uptake.',
    xPercent: 72,
    yPercent: 75,
  },
];

export function MapSection() {
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [selectedLoc, setSelectedLoc] = useState<LocationItem>(polarLocations[0]);

  return (
    <section aria-labelledby="map-section-title" className="mt-16 w-full">
      <div className="bg-white/95 backdrop-blur-xl border border-[#0284C7]/20 p-6 sm:p-8 rounded-3xl shadow-sm relative">
        {/* Header & Accessibility Mode Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6 mb-6">
          <div>
            <span className="text-xs text-[#0284C7] font-mono uppercase tracking-wider block mb-1 font-bold">
              Geospatial Location Registry
            </span>
            <h2 id="map-section-title" className="text-xl sm:text-2xl font-bold text-[#0B1E36]">
              Polar Research Stations & Expedition Locations
            </h2>
          </div>

          {/* View Mode Toggle Button Group */}
          <div
            className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-xl border border-slate-200 shrink-0"
            role="tablist"
            aria-label="Map view mode switcher"
          >
            <button
              role="tab"
              id="tab-map-view"
              aria-selected={viewMode === 'map'}
              aria-controls="panel-map-view"
              onClick={() => setViewMode('map')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0284C7] ${
                viewMode === 'map'
                  ? 'bg-white text-[#0284C7] border border-slate-200 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <MapIcon size={14} /> Map View
            </button>
            <button
              role="tab"
              id="tab-list-view"
              aria-selected={viewMode === 'list'}
              aria-controls="panel-list-view"
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0284C7] ${
                viewMode === 'list'
                  ? 'bg-white text-[#0284C7] border border-slate-200 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <List size={14} /> Text List Alternative
            </button>
          </div>
        </div>

        {/* 1. MAP VIEW */}
        {viewMode === 'map' && (
          <div id="panel-map-view" role="tabpanel" aria-labelledby="tab-map-view" className="space-y-6">
            <div className="relative w-full h-[360px] sm:h-[440px] rounded-3xl bg-gradient-to-b from-[#E0F2FE]/70 via-[#F0F9FF] to-[#EAF4FC] border border-[#0284C7]/20 overflow-hidden flex items-center justify-center shadow-inner">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(2,132,199,0.08)_0%,transparent_75%)]" />

              {polarLocations.map((loc) => {
                const isSelected = selectedLoc.id === loc.id;
                return (
                  <button
                    key={loc.id}
                    onClick={() => setSelectedLoc(loc)}
                    onFocus={() => setSelectedLoc(loc)}
                    aria-label={`Location: ${loc.name}, Region: ${loc.region}`}
                    className={`absolute p-2 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0284C7] cursor-pointer ${
                      isSelected
                        ? 'scale-125 z-20'
                        : 'opacity-80 hover:opacity-100 hover:scale-110 z-10'
                    }`}
                    style={{
                      left: `${loc.xPercent}%`,
                      top: `${loc.yPercent}%`,
                    }}
                  >
                    <div className="relative flex items-center justify-center">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          isSelected
                            ? 'bg-[#0284C7] text-white shadow-lg'
                            : 'bg-white text-[#0284C7] border border-[#0284C7]/40 shadow-xs'
                        }`}
                      >
                        <MapPin size={14} />
                      </div>
                      {isSelected && (
                        <span className="absolute -top-8 whitespace-nowrap text-[11px] font-semibold bg-[#0B1E36] text-white px-2.5 py-0.5 rounded-lg border border-slate-700 shadow-md">
                          {loc.name}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Location Card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#F8FAFC] border border-[#0284C7]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="glow">{selectedLoc.region}</Badge>
                  <span className="text-xs font-mono text-[#0284C7] font-semibold">{selectedLoc.coordinates}</span>
                </div>
                <h3 className="text-lg font-bold text-[#0B1E36]">{selectedLoc.name}</h3>
                <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">
                  {selectedLoc.description}
                </p>
                <div className="text-xs text-slate-700 font-medium mt-2 flex items-center gap-1">
                  <Compass size={14} className="text-[#0284C7]" /> Associated Expedition: {selectedLoc.expeditionTitle}
                </div>
              </div>
              <Link href={`/expeditions/${selectedLoc.expeditionSlug}`} className="shrink-0">
                <Button variant="primary" size="sm" className="text-xs min-h-[44px]">
                  Explore Expedition Story <ExternalLink size={12} className="ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        )}

        {/* 2. ACCESSIBLE TEXT LIST ALTERNATIVE */}
        {viewMode === 'list' && (
          <div id="panel-list-view" role="tabpanel" aria-labelledby="tab-list-view" className="space-y-4">
            <p className="text-xs text-slate-600 mb-4">
              Accessible text alternative for screen reader and keyboard users providing complete details on polar research stations, expeditions, and geographical descriptions.
            </p>

            <div className="overflow-x-auto rounded-2xl border border-[#0284C7]/15">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead className="bg-[#F0F9FF] text-[#0B1E36] uppercase tracking-wider text-[11px] border-b border-[#0284C7]/15">
                  <tr>
                    <th scope="col" className="p-3.5 sm:p-4">Location & Coordinates</th>
                    <th scope="col" className="p-3.5 sm:p-4">Region</th>
                    <th scope="col" className="p-3.5 sm:p-4">Associated Expedition</th>
                    <th scope="col" className="p-3.5 sm:p-4">Description</th>
                    <th scope="col" className="p-3.5 sm:p-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {polarLocations.map((loc) => (
                    <tr key={loc.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3.5 sm:p-4 font-semibold whitespace-nowrap">
                        <div className="text-[#0B1E36]">{loc.name}</div>
                        <div className="text-[11px] font-mono text-[#0284C7]">{loc.coordinates}</div>
                      </td>
                      <td className="p-3.5 sm:p-4 whitespace-nowrap">
                        <Badge variant="outline" className="text-[10px]">{loc.region}</Badge>
                      </td>
                      <td className="p-3.5 sm:p-4 font-medium text-slate-800">
                        <Link
                          href={`/expeditions/${loc.expeditionSlug}`}
                          className="hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0284C7] rounded"
                        >
                          {loc.expeditionTitle}
                        </Link>
                      </td>
                      <td className="p-3.5 sm:p-4 text-xs text-slate-600 max-w-xs leading-relaxed">
                        {loc.description}
                      </td>
                      <td className="p-3.5 sm:p-4 text-right whitespace-nowrap">
                        <Link href={`/expeditions/${loc.expeditionSlug}`}>
                          <Button variant="ghost" size="sm" className="text-xs py-1.5 px-3 min-h-[36px] sm:min-h-[44px]">
                            View Story →
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
