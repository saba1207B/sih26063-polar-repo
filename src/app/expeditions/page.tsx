'use client';

import React, { useState, useEffect } from 'react';
import { Container, SectionHeading } from '@/components/ui';
import { AnimatedSection, AnimatedGrid } from '@/components/AnimatedSection';
import { mockExpeditions } from '@/data/mockData';
import { Expedition } from '@/types';
import { SnowParticles } from '@/components/SnowParticles';
import { PolarLocationsMap } from '@/components/PolarLocationsMap';
import { ExpeditionCard } from '@/components/ExpeditionCard';
import { PageBackground } from '@/components/PageBackground';
import { getExpeditions } from '@/services/expeditions';

export default function ExpeditionsPage() {
  const [expeditions, setExpeditions] = useState<Expedition[]>(mockExpeditions);

  useEffect(() => {
    async function loadData() {
      try {
        const live = await getExpeditions();
        if (live && live.length > 0) {
          setExpeditions(live);
        }
      } catch (e) {
        console.error('Failed to load expeditions from backend:', e);
      }
    }
    loadData();
  }, []);

  return (
    <div className="pt-28 pb-24 min-h-screen bg-transparent page-enter relative overflow-hidden">
      <PageBackground
        src="/images/polar-expedition-vessel.jpg"
        alt="Polar expedition icebreaker vessel in sea ice background"
        overlayOpacity="medium"
      />
      <SnowParticles count={36} />
      <Container size="default" className="relative z-10">
        <AnimatedSection>
          <SectionHeading
            label="Historic & Modern Voyages"
            title="POLAR EXPEDITIONS"
            description="Explore India's scientific missions to the Antarctic and Arctic regions. Discover narrative-led accounts, research findings, and open datasets."
            light={true}
          />
        </AnimatedSection>

        {/* Polar Station Map */}
        <AnimatedSection delay={0.1} className="mt-12">
          <PolarLocationsMap />
        </AnimatedSection>

        {/* 2-Column Desktop Editorial Expedition Cards Grid */}
        <AnimatedGrid
          className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
          staggerDelay={0.075}
        >
          {expeditions.map((exped, idx) => (
            <ExpeditionCard key={exped.id} expedition={exped} index={idx} />
          ))}
        </AnimatedGrid>
      </Container>
    </div>
  );
}
