'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Container, Button } from '@/components/ui';
import { mockEducationalContent } from '@/data/mockData';
import { Languages, Clock, CheckCircle2, Sparkles, BookOpen } from 'lucide-react';
import { SnowParticles } from '@/components/SnowParticles';
import { AnimatedSection, AnimatedGrid } from '@/components/AnimatedSection';
import { PageBackground } from '@/components/PageBackground';

import { useLanguage } from '@/context/LanguageContext';

export default function LearnPage() {
  const { language, setLanguage } = useLanguage();
  const lang = language === 'HI' ? 'Hindi' : 'English';
  const setLang = (target: 'English' | 'Hindi') => setLanguage(target === 'Hindi' ? 'HI' : 'EN');
  const [audienceFilter, setAudienceFilter] = useState<'All' | 'Students' | 'Teachers' | 'Everyone'>('All');

  const filteredContent = mockEducationalContent.filter((item) =>
    audienceFilter === 'All' ? true : item.targetAudience === audienceFilter
  );

  return (
    <div className="pt-32 pb-36 min-h-screen bg-transparent relative overflow-hidden page-enter">
      <PageBackground
        src="/images/polar-wildlife-education.jpg"
        alt="Polar wildlife and Antarctic ecosystem background"
        overlayOpacity="medium"
      />
      <SnowParticles count={36} />
      <Container className="relative z-10" size="default">
        {/* Header & Photographic Hero */}
        <AnimatedSection className="mb-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <span className="text-editorial-meta text-[#0284C7] mb-3 block font-bold">
                // OUTREACH, CITIZEN SCIENCE & CURRICULUM
              </span>
              <h1 className="heading-section text-4xl sm:text-6xl text-[#0B1E36] mb-6">
                SCIENCE MADE SIMPLE.
              </h1>
              <p className="text-base sm:text-lg text-slate-600 font-normal max-w-2xl leading-relaxed">
                Curated polar learning modules, myth-busting scientific measurements, and interactive guides designed for students, educators, and science communicators.
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="relative h-64 sm:h-72 w-full rounded-3xl overflow-hidden border border-[#0284C7]/20 shadow-md">
                <Image
                  src="/images/polar-wildlife-education.jpg"
                  alt="Emperor penguin colony on Antarctic ice shelf demonstrating polar ecosystem adaptation"
                  fill
                  className="editorial-image object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  priority
                />
                <div className="absolute bottom-3 left-3 right-3 bg-[#0B1E36]/90 backdrop-blur-md px-3.5 py-2 rounded-xl text-white font-mono text-[11px] flex justify-between items-center border border-white/20">
                  <span className="font-semibold">ECOSYSTEM ADAPTATION</span>
                  <span className="text-sky-200">OUTREACH MODULE</span>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Controls: Language & Audience Filter */}
        <AnimatedSection delay={0.05} className="mb-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 font-mono text-xs border-b border-[#0284C7]/15 pb-8">
            {/* Audience Filter */}
            <div className="flex flex-wrap items-center gap-2">
              {(['All', 'Students', 'Teachers', 'Everyone'] as const).map((aud) => (
                <button
                  key={aud}
                  type="button"
                  onClick={() => setAudienceFilter(aud)}
                  className={`px-4 py-2.5 border transition-all rounded-xl ${
                    audienceFilter === aud
                      ? 'bg-[#003B6D] text-white border-[#003B6D] font-bold shadow-sm'
                      : 'bg-white/90 text-slate-700 border-slate-200 hover:border-[#0284C7]/40 hover:text-[#0B1E36]'
                  }`}
                >
                  {aud.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Bilingual Toggle */}
            <div className="flex items-center gap-1.5 border border-[#0284C7]/20 p-1 bg-[#F0F9FF] rounded-xl">
              <Languages size={16} className="text-[#0284C7] ml-2" />
              <button
                onClick={() => setLang('English')}
                aria-pressed={lang === 'English'}
                className={`px-3 py-1.5 font-bold transition-all rounded-lg ${
                  lang === 'English'
                    ? 'bg-[#003B6D] text-white shadow-sm'
                    : 'text-slate-600 hover:text-[#0B1E36]'
                }`}
              >
                ENGLISH
              </button>
              <button
                onClick={() => setLang('Hindi')}
                aria-pressed={lang === 'Hindi'}
                className={`px-3 py-1.5 font-bold transition-all rounded-lg ${
                  lang === 'Hindi'
                    ? 'bg-[#003B6D] text-white shadow-sm'
                    : 'text-slate-600 hover:text-[#0B1E36]'
                }`}
              >
                हिन्दी (HINDI)
              </button>
            </div>
          </div>
        </AnimatedSection>

        {/* Modules Grid */}
        <AnimatedGrid className="grid grid-cols-1 md:grid-cols-3 gap-8" staggerDelay={0.07}>
          {filteredContent.map((item) => (
            <div
              key={item.id}
              className="bg-white/95 backdrop-blur-md border border-[#0284C7]/20 p-8 rounded-3xl shadow-sm flex flex-col justify-between h-full transition-all hover:border-[#0284C7]/40 hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between mb-4 font-mono text-xs">
                  <span className="text-[#0369A1] bg-[#E0F2FE] border border-[#0284C7]/25 px-3 py-1 font-bold rounded-full">
                    {(item.targetAudience || 'GENERAL').toUpperCase()}
                  </span>
                  <span className="text-slate-500 flex items-center gap-1">
                    <Clock size={13} className="text-[#0284C7]" /> {item.readingTime}
                  </span>
                </div>

                <span className="text-[#0284C7] font-mono text-xs font-bold block mb-2 uppercase">
                  {item.category}
                </span>
                <h2 className="text-2xl font-bold text-[#0B1E36] mb-4">{item.title}</h2>

                {lang === 'English' ? (
                  <p className="text-sm text-slate-600 leading-relaxed font-normal mb-8">
                    {item.description}
                  </p>
                ) : (
                  <p className="text-sm text-slate-600 leading-relaxed font-normal mb-8 font-sans">
                    {item.summaryHindi || item.description}
                  </p>
                )}

                {/* Key Insights */}
                <div className="space-y-3 pt-6 border-t border-slate-100">
                  <span className="text-[#0B1E36] font-mono text-xs block font-bold uppercase tracking-wider">
                    KEY SCIENTIFIC INSIGHTS
                  </span>
                  {(item.keyTakeaways || []).map((k, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 font-normal">
                      <CheckCircle2 size={15} className="text-[#0284C7] shrink-0 mt-0.5" />
                      <span>{k}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100">
                <Button variant="outline" size="sm" className="w-full gap-2">
                  <BookOpen size={14} />
                  {lang === 'English' ? 'Read Full Module →' : 'पूरा मॉडल पढ़ें →'}
                </Button>
              </div>
            </div>
          ))}
        </AnimatedGrid>
      </Container>
    </div>
  );
}
