"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui";
import { Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

/**
 * HeroSection — Bright Antarctic Science Experience with Bilingual Support.
 */
export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const bgLayerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const t = setTimeout(() => setIsMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const heroHeight = heroRef.current?.offsetHeight ?? window.innerHeight;

        if (scrollY > heroHeight) {
          ticking = false;
          return;
        }

        if (bgLayerRef.current) {
          const translateY = scrollY * 0.15;
          bgLayerRef.current.style.transform = `translateY(${translateY}px)`;
        }

        if (contentRef.current) {
          const progress = Math.min(scrollY / (heroHeight * 0.8), 1);
          contentRef.current.style.opacity = `${Math.max(0, 1 - progress)}`;
          contentRef.current.style.transform = `translateY(${scrollY * 0.1}px)`;
        }

        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const transitionStr = "transform 0.9s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1)";

  return (
    <section
      ref={heroRef}
      className="relative w-full min-h-[92vh] flex flex-col justify-end overflow-hidden pb-12 sm:pb-24 pt-32"
      aria-label="Hero — Polar Science Knowledge Repository"
    >
      {/* ── Background Photographic Layer ── */}
      <div ref={bgLayerRef} className="absolute inset-0 z-0 will-change-transform" aria-hidden="true">
        <Image
          src="/images/ice-canyon-stream-4k.jpg"
          alt="Cinematic 4K glacial valley with evaporating mist and water flowing between towering ice mountains"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center brightness-105 contrast-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E36]/85 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1E36]/75 via-[#0B1E36]/25 to-transparent" />
      </div>

      {/* ── Content in Frosted UI Framing ── */}
      <div
        ref={contentRef}
        className="relative z-10 mx-auto w-full max-w-[1600px] px-6 sm:px-8 lg:px-12 will-change-transform"
      >
        <div className="max-w-3xl py-8 sm:py-12 bg-white/15 backdrop-blur-xl border border-white/30 rounded-3xl p-8 sm:p-12 shadow-2xl">
          {/* Metadata */}
          <div className="overflow-hidden mb-4">
            <div
              className="flex flex-wrap items-center gap-3 text-editorial-meta text-sky-200 font-bold"
              style={{
                transform: isMounted ? "translateY(0)" : "translateY(100%)",
                transition: transitionStr,
                transitionDelay: "0.1s",
              }}
            >
              <span className="bg-[#0891B2]/50 text-white px-2.5 py-0.5 rounded-full border border-cyan-300/40 text-[11px]">
                {t('hero_badge', 'INDIAN POLAR & OCEAN RESEARCH')}
              </span>
              <span className="w-4 h-px bg-white/40" />
              <span className="text-white text-[11px]">
                {t('hero_tagline', 'EXPEDITIONS • RESEARCH • DATA')}
              </span>
              <span className="w-4 h-px bg-white/40 hidden sm:inline" />
              <span className="text-[#FBBF24] text-[11px] hidden sm:inline font-mono font-bold">
                {t('hero_subtag', 'COASTAL TO POLE')}
              </span>
            </div>
          </div>

          {/* Headline */}
          <h1 className="heading-display text-white mb-6">
            <div className="overflow-hidden">
              <span
                className="block text-white font-extrabold drop-shadow-lg tracking-tight"
                style={{
                  fontSize: "clamp(2.8rem, 6vw, 6.2rem)",
                  transform: isMounted ? "translateY(0)" : "translateY(100%)",
                  transition: transitionStr,
                  transitionDelay: "0.2s",
                }}
              >
                {t('hero_title_1', 'EXPLORE THE')}
              </span>
            </div>
            <div className="overflow-hidden">
              <span
                className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-white to-amber-200 font-extrabold drop-shadow-lg tracking-tight"
                style={{
                  fontSize: "clamp(2.8rem, 6vw, 6.2rem)",
                  transform: isMounted ? "translateY(0)" : "translateY(100%)",
                  transition: transitionStr,
                  transitionDelay: "0.3s",
                }}
              >
                {t('hero_title_2', 'POLAR FRONTIER')}
              </span>
            </div>
          </h1>

          {/* Description */}
          <div className="overflow-hidden mb-8 max-w-2xl">
            <p
              className="text-base sm:text-lg text-white/95 leading-relaxed font-normal drop-shadow-sm"
              style={{
                transform: isMounted ? "translateY(0)" : "translateY(100%)",
                transition: transitionStr,
                transitionDelay: "0.4s",
              }}
            >
              {t('hero_desc', "Discover India's scientific expeditions, oceanographic datasets, ice core palaeoclimate records, and peer-reviewed literature unified through one modern digital science gateway.")}
            </p>
          </div>

          {/* CTAs */}
          <div className="overflow-hidden">
            <div
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
              style={{
                transform: isMounted ? "translateY(0)" : "translateY(100%)",
                transition: transitionStr,
                transitionDelay: "0.5s",
              }}
            >
              <Link href="/explore">
                <Button variant="primary" size="lg" className="w-full sm:w-auto bg-[#0891B2] hover:bg-[#0C5A66] text-white border-transparent shadow-lg text-xs font-bold tracking-wider">
                  {t('hero_cta_explore', 'EXPLORE POLAR SCIENCE →')}
                </Button>
              </Link>
              <Link href="/assistant">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto bg-white/95 hover:bg-white text-[#0284C7] hover:text-[#003B6D] border-2 border-[#0284C7]/50 hover:border-[#0284C7] shadow-lg text-xs font-extrabold tracking-wider transition-all duration-200"
                >
                  <Sparkles size={16} className="text-[#0284C7] shrink-0" />
                  <span className="text-[#0284C7] hover:text-[#003B6D] font-extrabold">
                    {t('hero_cta_assistant', 'ASK AI ASSISTANT')}
                  </span>
                </Button>
              </Link>
              <Link href="/expeditions" className="sm:ml-auto">
                <span className="text-xs text-sky-200 hover:text-white font-mono uppercase tracking-wider underline flex items-center justify-center gap-1 min-h-[44px]">
                  {t('hero_cta_expeditions', 'View 42 Expeditions →')}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
