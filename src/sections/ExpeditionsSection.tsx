"use client";

import React from "react";
import Link from "next/link";
import { Container, Button } from "@/components/ui";
import { AnimatedSection, AnimatedGrid } from "@/components/AnimatedSection";
import { ExpeditionCard } from "@/components/ExpeditionCard";
import { mockExpeditions } from "@/data/mockData";
import { useLanguage } from "@/context/LanguageContext";

export function ExpeditionsSection() {
  const { t } = useLanguage();

  return (
    <section className="py-24 sm:py-32 bg-transparent border-b border-[#0284C7]/15">
      <Container size="default">
        {/* Section Header */}
        <AnimatedSection className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <span className="text-editorial-meta text-[#0284C7] mb-3 block font-bold tracking-widest">
              {t('expeditions_meta', '// SCIENTIFIC MISSIONS')}
            </span>
            <h2 className="heading-section text-3xl sm:text-4xl lg:text-5xl text-[#0B1E36]">
              {t('expeditions_heading', 'FEATURED POLAR EXPEDITIONS')}
            </h2>
          </div>
          <p className="text-base text-slate-600 font-normal max-w-md">
            {t('expeditions_desc', 'Narrative-led field operations, continuous environmental sampling, and deep ice core recoveries across Antarctica and the High Arctic.')}
          </p>
        </AnimatedSection>

        {/* 2 Column Editorial Grid (Desktop: 2 cols, Mobile: 1 col) */}
        <AnimatedGrid
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10"
          staggerDelay={0.1}
        >
          {mockExpeditions.map((exped, idx) => (
            <ExpeditionCard key={exped.id} expedition={exped} index={idx} />
          ))}
        </AnimatedGrid>

        {/* View All CTA */}
        <AnimatedSection delay={0.3} className="mt-14 text-center">
          <Link href="/expeditions">
            <Button variant="outline" size="lg" className="border-[#0284C7] text-[#0284C7] hover:bg-[#0284C7] hover:text-white">
              {t('hero_cta_expeditions', 'VIEW ALL EXPEDITIONS →')}
            </Button>
          </Link>
        </AnimatedSection>
      </Container>
    </section>
  );
}
