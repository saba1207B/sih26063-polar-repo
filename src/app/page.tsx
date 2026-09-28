"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { HeroSection } from "@/sections/HeroSection";
import { IntroSection } from "@/sections/IntroSection";
import { Marquee } from "@/components/Marquee";
import { ExpeditionsSection } from "@/sections/ExpeditionsSection";
import { ConnectedKnowledgeDiagram } from "@/components/ConnectedKnowledgeDiagram";
import { PolarLocationsMap } from "@/components/PolarLocationsMap";
import { Container, Button, Badge } from "@/components/ui";
import { AnimatedSection } from "@/components/AnimatedSection";
import { mockExpeditions } from "@/data/mockData";
import { PageBackground } from "@/components/PageBackground";
import {
  Compass,
  Database,
  BookOpen,
  Sparkles,
  ShieldCheck,
  Search,
  ExternalLink,
  Layers,
  ArrowRight,
  GraduationCap,
  Bot,
  Activity,
  CheckCircle2,
} from "lucide-react";

export default function HomePage() {
  const featuredExpedition = mockExpeditions[0];

  return (
    <>
      {/* 4K Glacial Canyon & Evaporating Water Stream Background — Seamless from top to bottom */}
      <PageBackground
        src="/images/ice-canyon-stream-4k.jpg"
        alt="Cinematic 4K glacial valley with evaporating mist and water flowing between ice mountains"
        overlayOpacity="light"
      />

      {/* 1. HERO — Antarctic Coastline & Polar Commons Identity */}
      <HeroSection />

      {/* 2. INTRODUCTION & 3. POLAR SCIENCE DOMAINS */}
      <IntroSection />

      {/* SCIENTIFIC TAXONOMY MARQUEE */}
      <Marquee />

      {/* 4. EXPEDITIONS — Featured Expedition Stories */}
      <ExpeditionsSection />

      {/* 5. CONNECTED KNOWLEDGE — Direct Lineage Flow Diagram */}
      <section className="py-24 sm:py-32 bg-transparent border-b border-[#0284C7]/15">
        <Container size="default">
          <AnimatedSection className="max-w-3xl mb-12 bg-white/70 backdrop-blur-md p-8 sm:p-10 rounded-3xl border border-[#0284C7]/20 shadow-xs">
            <span className="text-editorial-meta text-[#0284C7] font-bold mb-3 block tracking-widest">
              // DATA PROVENANCE ARCHITECTURE
            </span>
            <h2 className="heading-section text-3xl sm:text-4xl lg:text-5xl text-[#0B1E36] mb-4">
              CONNECTED KNOWLEDGE GRAPH
            </h2>
            <p className="text-base text-slate-700 leading-relaxed font-normal">
              Every scientific finding in Polar Commons maintains verifiable provenance. Trace how a physical expedition translates into field measurements, open sensor datasets, peer-reviewed publications, and public education.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <ConnectedKnowledgeDiagram expedition={featuredExpedition} />
          </AnimatedSection>
        </Container>
      </section>

      {/* 6. SCIENTIFIC DATA & STATIONS MAP */}
      <section className="py-24 sm:py-32 bg-transparent border-b border-[#0284C7]/15">
        <Container size="default">
          <AnimatedSection className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 bg-white/70 backdrop-blur-md p-8 sm:p-10 rounded-3xl border border-[#0284C7]/20 shadow-xs">
            <div>
              <span className="text-editorial-meta text-[#0284C7] font-bold mb-3 block tracking-widest">
                // GEOGRAPHIC & OBSERVATIONAL NETWORK
              </span>
              <h2 className="heading-section text-3xl sm:text-4xl lg:text-5xl text-[#0B1E36]">
                POLAR STATIONS & SATELLITE FEEDS
              </h2>
            </div>
            <p className="text-base text-slate-700 font-normal max-w-md">
              Long-term continuous monitoring stations spanning Maitri, Bharati, and Himadri collecting climate data across Earth&apos;s extreme polar zones.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <PolarLocationsMap />
          </AnimatedSection>

          {/* Quick Metrics Strip */}
          <AnimatedSection delay={0.2} className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: "Historical & Active Expeditions", value: "42", meta: "Since 1981" },
              { label: "Open-Access Datasets", value: "1,450+", meta: "NPDC & PANGAEA" },
              { label: "Peer-Reviewed Publications", value: "680+", meta: "100% DOI Resolved" },
              { label: "Field Media & Visual Assets", value: "3,300+", meta: "Creative Commons" },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="bg-white/90 backdrop-blur-md p-6 border border-[#0284C7]/15 rounded-2xl shadow-xs"
              >
                <div className="text-3xl sm:text-4xl font-extrabold text-[#0B1E36] tracking-tight mb-1">
                  {stat.value}
                </div>
                <div className="text-xs font-semibold text-slate-700 mb-2">{stat.label}</div>
                <div className="text-[10px] font-mono text-[#0284C7] uppercase font-bold">{stat.meta}</div>
              </div>
            ))}
          </AnimatedSection>
        </Container>
      </section>

      {/* 7. EXPLORE / SEARCH TEASER */}
      <section className="py-24 sm:py-32 bg-transparent border-b border-[#0284C7]/15">
        <Container size="default">
          <div className="bg-white/95 backdrop-blur-xl border border-[#0284C7]/20 rounded-3xl p-8 sm:p-14 shadow-lg flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="max-w-xl">
              <span className="text-editorial-meta text-[#0284C7] font-bold mb-3 block tracking-widest">
                // NATURAL LANGUAGE ARCHIVE DISCOVERY
              </span>
              <h2 className="heading-section text-3xl sm:text-4xl text-[#0B1E36] mb-4">
                EXPLORE POLAR SCIENCE KNOWLEDGE
              </h2>
              <p className="text-base text-slate-600 leading-relaxed mb-6 font-normal">
                Query across four decades of Antarctic expeditions, oceanographic CTD casts, ozone spectrophotometer logs, and research station publications using natural scientific language.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {["Maitri Station", "Prydz Bay CTD", "IndARC Mooring", "Ozone Hole Dynamics"].map((tag, idx) => (
                  <Link key={idx} href={`/explore?q=${encodeURIComponent(tag)}`}>
                    <span className="text-xs font-mono px-3 py-1.5 rounded-full bg-sky-50 text-[#0284C7] border border-sky-200 hover:bg-[#0284C7] hover:text-white transition-colors cursor-pointer">
                      &ldquo;{tag}&rdquo;
                    </span>
                  </Link>
                ))}
              </div>
              <Link href="/explore">
                <Button variant="primary" size="md" className="gap-2">
                  <Search size={16} /> Open Natural Language Search
                </Button>
              </Link>
            </div>

            <div className="w-full lg:w-96 relative h-64 sm:h-72 rounded-2xl overflow-hidden shadow-md border border-[#0284C7]/20 shrink-0">
              <Image
                src="/images/polar-aerial.jpg"
                alt="Aerial view of Antarctic plateau and ice sheet"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 384px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E36]/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white text-xs font-mono">
                <span className="text-sky-300 font-bold block">// AERIAL CRYOSPHERE ARCHIVE</span>
                <span>Central Antarctic Ice Plateau Survey</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 8. LEARN — Public Outreach & Education Preview */}
      <section className="py-24 sm:py-32 bg-transparent border-b border-[#0284C7]/15">
        <Container size="default">
          <AnimatedSection className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 bg-white/70 backdrop-blur-md p-8 sm:p-10 rounded-3xl border border-[#0284C7]/20 shadow-xs">
            <div>
              <span className="text-editorial-meta text-[#0284C7] font-bold mb-3 block tracking-widest">
                // PUBLIC SCIENCE COMMUNICATION
              </span>
              <h2 className="heading-section text-3xl sm:text-4xl lg:text-5xl text-[#0B1E36]">
                POLAR SCIENCE MADE APPROACHABLE
              </h2>
            </div>
            <Link href="/learn">
              <Button variant="outline" size="sm">
                View All Learning Modules →
              </Button>
            </Link>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 relative h-80 sm:h-96 lg:h-auto rounded-3xl overflow-hidden border border-[#0284C7]/20 shadow-sm">
              <Image
                src="/images/polar-wildlife-education.jpg"
                alt="Emperor penguin colony and glacier ice shelf in Antarctica"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E36]/90 via-[#0B1E36]/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-xs font-mono text-sky-300 uppercase tracking-widest font-bold mb-1 block">
                  BILINGUAL OUTREACH
                </span>
                <h3 className="text-xl font-bold mb-2">English & हिन्दी Modules</h3>
                <p className="text-xs text-white/85 leading-relaxed">
                  Tailored curriculum resources designed for school students, college educators, and curious citizens.
                </p>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
              {[
                {
                  title: "How Indian Ice Core Drilling Reads Past Climate",
                  audience: "Students & Teachers",
                  readTime: "6 Min Read",
                  desc: "Learn how scientists at Maitri and Bharati extract ice cylinders to decode volcanic eruptions, atmospheric greenhouse gases, and historical temperatures.",
                },
                {
                  title: "Myth vs Measurement: Is Antarctica Static Ice?",
                  audience: "General Public",
                  readTime: "4 Min Read",
                  desc: "Satellite radar reveals fast-flowing coastal ice streams moving over 800m/year. Explore the real physics behind Antarctic mass balance.",
                },
              ].map((module, idx) => (
                <div
                  key={idx}
                  className="bg-white/90 backdrop-blur-md p-6 sm:p-8 border border-[#0284C7]/15 rounded-3xl hover:border-[#0284C7]/40 hover:shadow-lg transition-all"
                >
                  <div className="flex items-center justify-between gap-4 mb-3 font-mono text-xs">
                    <span className="text-[#0284C7] bg-sky-50 px-2.5 py-0.5 rounded-full font-bold border border-sky-100">
                      {module.audience}
                    </span>
                    <span className="text-slate-500 font-medium">{module.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#0B1E36] mb-2">{module.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">{module.desc}</p>
                  <Link href="/learn" className="text-xs font-mono text-[#0284C7] font-bold hover:underline inline-flex items-center gap-1">
                    Read Educational Module <ArrowRight size={14} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* 9. RESEARCH ASSISTANT — Conversational GraphRAG Entry Point */}
      <section className="py-24 sm:py-32 bg-transparent border-b border-[#0284C7]/15">
        <Container size="default">
          <div className="bg-[#0B1E36] text-white rounded-3xl p-8 sm:p-14 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="max-w-xl z-10">
              <div className="flex items-center gap-2 mb-3">
                <Bot size={18} className="text-sky-300" />
                <span className="text-editorial-meta text-sky-300 font-bold tracking-widest text-xs">
                  GRAPHRAG CONVERSATIONAL ARCHIVE
                </span>
              </div>
              <h2 className="heading-section text-3xl sm:text-4xl text-white mb-4">
                ASK THE POLAR SCIENCE ARCHIVE
              </h2>
              <p className="text-base text-slate-300 leading-relaxed mb-6 font-normal">
                Query scientific facts, expedition timelines, or dataset metrics with instant claim-level provenance verification. Every sentence is cross-checked against official repository records.
              </p>

              <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 mb-6 space-y-2 text-xs font-mono">
                <div className="flex items-center gap-2 text-sky-200 font-bold">
                  <ShieldCheck size={16} className="text-sky-300" />
                  CLAIM-LEVEL SOURCE TRACING
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  &ldquo;Maitri station surface ozone records span from 2018 to 2023 with 10-minute continuous temporal resolution [NPDC-ANT-2023-089].&rdquo;
                </p>
              </div>

              <Link href="/assistant">
                <Button variant="primary" size="md" className="bg-[#0284C7] hover:bg-[#0369A1] text-white border-transparent gap-2 shadow-lg">
                  <Sparkles size={16} className="text-sky-200" /> Launch Research Assistant
                </Button>
              </Link>
            </div>

            <div className="w-full lg:w-96 relative h-64 sm:h-80 rounded-2xl overflow-hidden shadow-2xl border border-white/20 shrink-0 z-10">
              <Image
                src="/images/ice_cave_blue_4k.jpg"
                alt="4K crystal blue ice cave and subglacial telemetry exploration"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 384px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E36]/90 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white text-xs font-mono">
                <span className="text-sky-300 font-bold block">// SUBGLACIAL EXPLORATION & AI INTELLIGENCE</span>
                <span>4K Glacial Cryosphere Analysis</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 10. SOURCES / TRUST — Institutional Provenance Concept */}
      <section className="py-20 sm:py-28 bg-transparent">
        <Container size="default">
          <AnimatedSection className="text-center max-w-3xl mx-auto mb-12 bg-white/70 backdrop-blur-md p-8 sm:p-10 rounded-3xl border border-[#0284C7]/20 shadow-xs">
            <span className="text-editorial-meta text-[#0284C7] font-bold mb-3 block tracking-widest">
              // INSTITUTIONAL CITATION INTEGRITY
            </span>
            <h2 className="heading-section text-2xl sm:text-3xl lg:text-4xl text-[#0B1E36] mb-3">
              GROUNDED IN REPUTABLE REPOSITORIES
            </h2>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
              Polar Commons acts as a modern dissemination layer connecting official polar research institutions, international data centers, and academic archives.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "NPDC / NCPOR", role: "National Polar Data Center", coverage: "Indian Antarctic & Arctic Records" },
              { name: "PANGAEA", role: "World Data Center PANGAEA", coverage: "Southern Ocean Hydrography" },
              { name: "AADC", role: "Australian Antarctic Data Centre", coverage: "Cryosphere & Glaciological Data" },
              { name: "Zenodo / DataCite", role: "Open Science Archive", coverage: "Persistent DOI Citation Mapping" },
            ].map((repo, idx) => (
              <div
                key={idx}
                className="bg-white/90 backdrop-blur-md p-6 border border-[#0284C7]/15 rounded-2xl shadow-xs"
              >
                <div className="flex items-center gap-2 mb-2 text-[#0284C7]">
                  <CheckCircle2 size={16} />
                  <span className="font-bold text-sm text-[#0B1E36]">{repo.name}</span>
                </div>
                <div className="text-xs font-semibold text-slate-700">{repo.role}</div>
                <div className="text-[11px] text-slate-500 mt-1">{repo.coverage}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center font-mono text-xs text-slate-500">
            <span>PROVENANCE INTEGRITY: ALL STATEMENTS & FIGURES PRESERVE PERSISTENT DOIS AND ORIGINAL REPOSITORY CITATIONS</span>
          </div>
        </Container>
      </section>
    </>
  );
}
