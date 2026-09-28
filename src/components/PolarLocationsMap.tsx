'use client';

import React, { useState } from 'react';
import { GlassPanel, Button, Badge } from '@/components/ui';
import { MapPin, Compass, List, Map, ExternalLink, Globe } from 'lucide-react';
import Link from 'next/link';

interface StationLocation {
  id: string;
  name: string;
  region: string;
  coordinates: string;
  expedition: string;
  expeditionSlug: string;
  description: string;
  xPercent: number;
  yPercent: number;
}

export const polarLocations: StationLocation[] = [
  {
    id: 'maitri',
    name: 'Maitri Research Station',
    region: 'Antarctica (Schirmacher Oasis)',
    coordinates: '70°45′S 11°44′E',
    expedition: 'ISEA-38 (38th Indian Scientific Expedition to Antarctica)',
    expeditionSlug: '38th-indian-antarctic-exped',
    description: 'India’s second permanent Antarctic station. Established in 1989, hosting continuous atmospheric ozone, meteorology, geomagnetic, and glaciological observations.',
    xPercent: 48,
    yPercent: 44,
  },
  {
    id: 'bharati',
    name: 'Bharati Research Station',
    region: 'Antarctica (Larsemann Hills)',
    coordinates: '69°24′S 76°11′E',
    expedition: 'ISEA-40 (40th Indian Scientific Expedition to Antarctica)',
    expeditionSlug: '40th-indian-antarctic-exped',
    description: 'State-of-the-art automated polar research station opened in 2012. Specializes in marine biology, oceanography, Prydz Bay coastal dynamics, and satellite ground telemetry.',
    xPercent: 68,
    yPercent: 50,
  },
  {
    id: 'dakshin-gangotri',
    name: 'Dakshin Gangotri Archive',
    region: 'Antarctica (Queen Maud Land)',
    coordinates: '70°05′S 12°00′E',
    expedition: 'First Indian Antarctic Expedition (1981)',
    expeditionSlug: '38th-indian-antarctic-exped',
    description: 'India’s pioneer Antarctic station commissioned during the historic 1981 voyage. Currently preserved as a historical landmark and core meteorological supply base.',
    xPercent: 44,
    yPercent: 40,
  },
  {
    id: 'himadri',
    name: 'Himadri Station',
    region: 'Arctic (Ny-Ålesund, Svalbard)',
    coordinates: '78°55′N 11°56′E',
    expedition: 'Arctic Expedition 2022 (IndARC Mooring Deployment)',
    expeditionSlug: 'indian-arctic-expedition-2022',
    description: 'India’s flagship Arctic laboratory situated in Svalbard, Norway. Focuses on fjord oceanography, aerosol radiative forcing, microbe genomics, and sea-ice mass balance.',
    xPercent: 52,
    yPercent: 18,
  },
];

export function PolarLocationsMap() {
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [selectedLocation, setSelectedLocation] = useState<StationLocation>(polarLocations[0]);

  return (
    <div className="bg-white/95 backdrop-blur-xl border border-[#0284C7]/20 p-6 sm:p-8 rounded-3xl shadow-sm">
      {/* Header & Accessibility Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Globe className="text-[#0284C7]" size={20} />
            <h3 className="text-xl font-bold text-[#0B1E36]">Polar Stations & Observatories Explorer</h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-600">
            Interactive geographic mapping of India's research facilities across Antarctica and the Arctic with full keyboard accessibility.
          </p>
        </div>

        {/* Accessible View Toggle */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 border border-slate-200 shrink-0 rounded-xl" role="tablist" aria-label="Location View Alternatives">
          <button
            type="button"
            role="tab"
            aria-selected={viewMode === 'map'}
            aria-controls="location-map-view"
            onClick={() => setViewMode('map')}
            className={`min-h-[40px] px-3.5 py-1.5 text-xs font-semibold uppercase font-mono flex items-center gap-1.5 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0284C7] rounded-lg ${
              viewMode === 'map'
                ? 'bg-white text-[#0284C7] shadow-xs font-bold border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Map size={14} /> Map View
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={viewMode === 'list'}
            aria-controls="location-list-view"
            onClick={() => setViewMode('list')}
            className={`min-h-[40px] px-3.5 py-1.5 text-xs font-semibold uppercase font-mono flex items-center gap-1.5 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0284C7] rounded-lg ${
              viewMode === 'list'
                ? 'bg-white text-[#0284C7] shadow-xs font-bold border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <List size={14} /> Text-List Alternative
          </button>
        </div>
      </div>

      {/* ── MODE 1: VISUAL SCIENTIFIC POLAR MAP VIEW ── */}
      {viewMode === 'map' && (
        <div id="location-map-view" role="tabpanel" aria-label="Interactive Map View" className="space-y-6">
          <div className="relative w-full h-[320px] sm:h-[420px] overflow-hidden border border-[#0284C7]/20 bg-gradient-to-b from-[#E0F2FE]/70 via-[#F0F9FF] to-[#EAF4FC] flex items-center justify-center rounded-3xl shadow-inner">
            {/* Cartographic Coordinate Grid */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(2,132,199,0.08)_0%,transparent_75%)]" />
            <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,rgba(2,132,199,0.3)_1px,transparent_1px),linear-gradient(to_bottom,rgba(2,132,199,0.3)_1px,transparent_1px)] bg-[size:36px_36px]" />

            {/* Region Labels */}
            <div className="absolute top-4 left-4 text-[10px] uppercase font-mono tracking-widest text-[#0369A1] bg-white/90 px-3 py-1 border border-sky-200 rounded-full shadow-xs">
              Arctic Laboratory (78°N)
            </div>
            <div className="absolute bottom-4 left-4 text-[10px] uppercase font-mono tracking-widest text-[#0369A1] bg-white/90 px-3 py-1 border border-sky-200 rounded-full shadow-xs">
              Antarctic Stations (70°S)
            </div>

            {/* Interactive Pins */}
            {polarLocations.map((loc) => {
              const isSelected = selectedLocation.id === loc.id;

              return (
                <button
                  key={loc.id}
                  type="button"
                  onClick={() => setSelectedLocation(loc)}
                  onFocus={() => setSelectedLocation(loc)}
                  aria-label={`Select ${loc.name}, located in ${loc.region}`}
                  aria-expanded={isSelected}
                  style={{ top: `${loc.yPercent}%`, left: `${loc.xPercent}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full transition-all duration-300 group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0284C7] ${
                    isSelected
                      ? 'z-20 bg-[#0284C7] text-white ring-4 ring-[#0284C7]/25 scale-110 shadow-lg'
                      : 'z-10 bg-white text-[#0284C7] hover:scale-110 border-2 border-[#0284C7] shadow-sm'
                  }`}
                >
                  <MapPin size={20} />
                  <span className="sr-only">{loc.name}</span>
                  {/* Tooltip badge */}
                  <span className={`absolute left-1/2 -translate-x-1/2 bottom-full mb-2 whitespace-nowrap text-[10px] font-mono uppercase tracking-wider py-1 px-2.5 bg-[#0B1E36] text-white border border-slate-700 shadow-lg pointer-events-none transition-opacity rounded-lg ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                    {loc.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Pin Detail Card */}
          <div className="p-5 sm:p-6 bg-[#F8FAFC] border border-[#0284C7]/15 rounded-2xl shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
              <div>
                <span className="text-xs font-mono text-[#0284C7] uppercase tracking-wider font-semibold">
                  {selectedLocation.coordinates} • {selectedLocation.region}
                </span>
                <h4 className="text-lg sm:text-xl font-bold text-[#0B1E36] mt-0.5">{selectedLocation.name}</h4>
              </div>
              <Badge variant="glow">{selectedLocation.expedition.split(' ')[0]}</Badge>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">{selectedLocation.description}</p>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-200">
              <span className="text-xs text-slate-700"><strong>Associated Mission:</strong> {selectedLocation.expedition}</span>
              <Link href={`/expeditions/${selectedLocation.expeditionSlug}`}>
                <Button variant="outline" size="sm" className="text-xs py-1.5 px-3 min-h-[38px]">
                  Expedition Details <ExternalLink size={12} className="ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ── MODE 2: ACCESSIBLE TEXT-LIST ALTERNATIVE ── */}
      {viewMode === 'list' && (
        <div id="location-list-view" role="tabpanel" aria-label="Text List Location Alternative" className="space-y-4">
          <p className="text-xs sm:text-sm text-slate-600 mb-4">
            Accessible text list providing complete information for each polar scientific station, including geographic coordinates, associated expedition, and research focus.
          </p>
          <div className="space-y-4">
            {polarLocations.map((loc) => (
              <article key={loc.id} className="p-5 bg-[#F8FAFC] border border-slate-200 rounded-2xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <h4 className="text-base font-bold text-[#0B1E36] flex items-center gap-2">
                    <MapPin size={16} className="text-[#0284C7] shrink-0" />
                    {loc.name}
                  </h4>
                  <span className="text-xs font-mono text-[#0369A1] bg-[#F0F9FF] px-2.5 py-0.5 border border-sky-200 w-fit rounded-full font-semibold">
                    {loc.coordinates}
                  </span>
                </div>

                <dl className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs mt-3 pt-3 border-t border-slate-200">
                  <div>
                    <dt className="text-slate-500 uppercase text-[10px] font-mono tracking-wider">Location / Region</dt>
                    <dd className="text-slate-800 font-semibold mt-0.5">{loc.region}</dd>
                  </div>
                  <div>
                    <dt className="text-slate-500 uppercase text-[10px] font-mono tracking-wider">Associated Expedition</dt>
                    <dd className="text-slate-800 font-semibold mt-0.5">{loc.expedition}</dd>
                  </div>
                  <div className="md:col-span-3">
                    <dt className="text-slate-500 uppercase text-[10px] font-mono tracking-wider">Description & Scientific Role</dt>
                    <dd className="text-slate-700 leading-relaxed mt-1">{loc.description}</dd>
                  </div>
                </dl>

                <div className="mt-4 pt-3 border-t border-slate-200 flex justify-end">
                  <Link href={`/expeditions/${loc.expeditionSlug}`}>
                    <Button variant="secondary" size="sm" className="text-xs py-1.5 px-3 min-h-[38px]">
                      View Expedition Story <Compass size={12} className="ml-1" />
                    </Button>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
