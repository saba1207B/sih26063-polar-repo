"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Container, Button, Badge } from "@/components/ui";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Search, Loader2, Sparkles, AlertTriangle, Database, BookOpen, MapPin, ExternalLink, ArrowRight } from "lucide-react";
import { mockExpeditions, mockDatasets, mockPublications } from "@/data/mockData";
import { Expedition, Dataset, Publication } from "@/types";
import Link from "next/link";
import { SnowParticles } from "@/components/SnowParticles";
import { PageBackground } from "@/components/PageBackground";
import { searchKnowledge } from "@/services/search";
import { getExpeditions } from "@/services/expeditions";
import { getDatasets } from "@/services/datasets";
import { getPublications } from "@/services/publications";

const exampleQueries = [
  "CO2 flux",
  "Maitri Station",
  "Antarctic sea ice",
  "Indian polar expeditions",
];

type SearchStatus = "idle" | "loading" | "results" | "no-results" | "error";

function StatePanel({ children, id }: { children: React.ReactNode; id: string }) {
  return (
    <div
      key={id}
      style={{
        animation: "page-enter 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      }}
    >
      {children}
    </div>
  );
}

export default function ExplorePage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<SearchStatus>("idle");
  const [allExpeditions, setAllExpeditions] = useState<Expedition[]>(mockExpeditions);
  const [allDatasets, setAllDatasets] = useState<Dataset[]>(mockDatasets);
  const [allPublications, setAllPublications] = useState<Publication[]>(mockPublications);

  const [filteredResults, setFilteredResults] = useState<{
    expeditions: Expedition[];
    datasets: Dataset[];
    publications: Publication[];
  }>({ expeditions: [], datasets: [], publications: [] });

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function loadCatalogs() {
      try {
        const [liveExp, liveDs, livePub] = await Promise.all([
          getExpeditions(),
          getDatasets(),
          getPublications(),
        ]);
        if (liveExp && liveExp.length > 0) setAllExpeditions(liveExp);
        if (liveDs && liveDs.length > 0) setAllDatasets(liveDs);
        if (livePub && livePub.length > 0) setAllPublications(livePub);
      } catch (err) {
        console.error("Failed to preload catalogs:", err);
      }
    }
    loadCatalogs();
    const t = setTimeout(() => inputRef.current?.focus(), 600);
    return () => clearTimeout(t);
  }, []);

  const handleSearch = async (searchQuery: string) => {
    const q = searchQuery.trim();
    setQuery(q);

    if (!q) {
      setStatus("idle");
      return;
    }

    if (q.toLowerCase().includes("error") || q.toLowerCase().includes("fail")) {
      setStatus("loading");
      setTimeout(() => setStatus("error"), 600);
      return;
    }

    setStatus("loading");

    try {
      const response = await searchKnowledge(q);
      const lowerQ = q.toLowerCase();

      // Match against preloaded/live data or response results
      const matchedExp = allExpeditions.filter((e) => {
        const inResults = response.results.some(
          (r) => r.type.toLowerCase() === "expedition" && (r.id === e.id || r.title === e.title || r.url.includes(e.slug))
        );
        return (
          inResults ||
          e.title.toLowerCase().includes(lowerQ) ||
          e.description?.toLowerCase().includes(lowerQ) ||
          e.location?.toLowerCase().includes(lowerQ) ||
          (e.researchFocus || []).some((f) => f.toLowerCase().includes(lowerQ))
        );
      });

      const matchedDs = allDatasets.filter((d) => {
        const inResults = response.results.some(
          (r) => r.type.toLowerCase() === "dataset" && (r.id === d.id || r.title === d.title)
        );
        return (
          inResults ||
          d.title.toLowerCase().includes(lowerQ) ||
          d.description?.toLowerCase().includes(lowerQ) ||
          d.researchTopic?.toLowerCase().includes(lowerQ) ||
          d.locationName?.toLowerCase().includes(lowerQ)
        );
      });

      const matchedPubs = allPublications.filter((p) => {
        const inResults = response.results.some(
          (r) => r.type.toLowerCase() === "publication" && (r.id === p.id || r.title === p.title)
        );
        return (
          inResults ||
          p.title.toLowerCase().includes(lowerQ) ||
          p.abstract?.toLowerCase().includes(lowerQ) ||
          p.journal?.toLowerCase().includes(lowerQ) ||
          (p.authors || []).some((a) => a.toLowerCase().includes(lowerQ))
        );
      });

      if (matchedExp.length === 0 && matchedDs.length === 0 && matchedPubs.length === 0) {
        setStatus("no-results");
      } else {
        setFilteredResults({
          expeditions: matchedExp,
          datasets: matchedDs,
          publications: matchedPubs,
        });
        setStatus("results");
      }
    } catch (err) {
      console.error("Search failed:", err);
      setStatus("error");
    }
  };

  const totalResults =
    filteredResults.expeditions.length +
    filteredResults.datasets.length +
    filteredResults.publications.length;

  return (
    <div className="pt-28 pb-24 min-h-screen bg-transparent relative overflow-hidden page-enter">
      <PageBackground src="/images/polar-aerial.jpg" alt="Antarctic aerial landscape background" overlayOpacity="medium" />
      <SnowParticles count={36} />
      <Container className="relative z-10" size="default">
        {/* Visual Context Banner with Aerial Polar Landscape */}
        <AnimatedSection className="mb-8 relative h-48 sm:h-64 rounded-3xl overflow-hidden border border-[#0284C7]/20 shadow-md">
          <Image
            src="/images/polar-aerial.jpg"
            alt="Aerial photograph of Antarctic glacier plateau and nunataks"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1E36]/90 via-[#0B1E36]/50 to-transparent" />
          <div className="absolute bottom-6 left-6 sm:left-10 max-w-lg text-white">
            <span
              className="text-xs font-mono !text-white uppercase tracking-widest font-bold block mb-1"
              style={{ color: '#ffffff' }}
            >
              // CRYOSPHERE ARCHIVE DISCOVERY
            </span>
            <h1
              className="text-2xl sm:text-3xl font-bold tracking-tight !text-white mb-2"
              style={{ color: '#ffffff' }}
            >
              NATURAL LANGUAGE DISCOVERY
            </h1>
            <p
              className="text-xs sm:text-sm !text-white line-clamp-2"
              style={{ color: '#ffffff' }}
            >
              Explore interconnected expeditions, scientific datasets, and peer-reviewed publications across Antarctica and the High Arctic.
            </p>
          </div>
        </AnimatedSection>

        {/* Accessible Search Bar */}
        <AnimatedSection delay={0.1} className="mt-8 max-w-3xl mx-auto">
          <div className="bg-white/95 backdrop-blur-xl border border-[#0284C7]/25 rounded-2xl p-2 sm:p-2.5 shadow-md focus-within:ring-2 focus-within:ring-[#0284C7]/40 focus-within:border-[#0284C7] transition-all">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch(query);
              }}
              className="flex items-center gap-3 px-3"
            >
              <label htmlFor="explore-search-input" className="sr-only">
                Search polar knowledge repository
              </label>
              <Search
                className="text-[#0284C7] shrink-0"
                size={22}
                aria-hidden="true"
              />
              <input
                id="explore-search-input"
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Escape") {
                    setQuery("");
                    setStatus("idle");
                  }
                }}
                placeholder="Ask about an expedition, dataset, discovery or research topic…"
                className="w-full bg-transparent py-3 text-[#0B1E36] placeholder:text-slate-400 text-sm sm:text-base focus:outline-none min-h-[44px] font-medium"
              />
              <Button
                type="submit"
                variant="primary"
                size="sm"
                disabled={status === "loading"}
                aria-label="Submit search query"
                className="shrink-0 min-h-[42px] px-6 text-xs font-bold"
              >
                {status === "loading" ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : (
                  "Search"
                )}
              </Button>
            </form>
          </div>

          {/* Example Queries */}
          <div className="mt-5">
            <div className="flex items-center gap-2 mb-2 text-xs tracking-wider uppercase text-slate-500 font-mono font-semibold">
              <Sparkles size={14} className="text-[#0284C7]" aria-hidden="true" />
              <span>Suggested Scientific Topics:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {exampleQueries.map((s, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setQuery(s);
                    handleSearch(s);
                  }}
                  aria-label={`Search query: ${s}`}
                  className="text-xs px-3.5 py-1.5 rounded-full bg-sky-50 text-[#0284C7] border border-sky-200 hover:bg-[#0284C7] hover:text-white transition-all text-left min-h-[38px] flex items-center font-medium shadow-2xs"
                >
                  &ldquo;{s}&rdquo;
                </button>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Results Container with Screen-Reader Live Region */}
        <div
          className="mt-12 max-w-5xl mx-auto"
          role="region"
          aria-label="Search results container"
        >
          {/* SR Announcement */}
          <div aria-live="polite" className="sr-only">
            {status === "loading"
              ? "Searching knowledge graph..."
              : status === "results"
              ? `Search complete. Found ${totalResults} matching records.`
              : status === "no-results"
              ? `No records found matching ${query}.`
              : ""}
          </div>

          {/* 1. Idle state */}
          {status === "idle" && (
            <StatePanel id="idle">
              <div className="bg-white/90 backdrop-blur-md border border-[#0284C7]/15 rounded-3xl text-center py-16 px-6 shadow-sm">
                <Database size={40} className="mx-auto text-[#0284C7] mb-3 opacity-80" aria-hidden="true" />
                <h3 className="text-xl font-bold text-[#0B1E36] mb-2">Ready to Discover Polar Knowledge</h3>
                <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                  Type a scientific question or click a suggested topic above to query across expeditions, physical datasets, and academic publications.
                </p>
              </div>
            </StatePanel>
          )}

          {/* 2. Loading state */}
          {status === "loading" && (
            <StatePanel id="loading">
              <div className="bg-white/90 backdrop-blur-md border border-[#0284C7]/15 rounded-3xl text-center py-16 px-6 shadow-sm" role="status">
                <Loader2 size={40} className="mx-auto text-[#0284C7] animate-spin mb-4" aria-hidden="true" />
                <h3 className="text-xl font-bold text-[#0B1E36] mb-2">Searching Knowledge Graph...</h3>
                <p className="text-slate-600 text-xs sm:text-sm font-mono">Traversing expeditions, datasets, and scientific literature...</p>
              </div>
            </StatePanel>
          )}

          {/* 3. Error state */}
          {status === "error" && (
            <StatePanel id="error">
              <div className="bg-white/95 border border-rose-200 rounded-3xl text-center py-16 px-6 shadow-sm" role="alert">
                <AlertTriangle size={40} className="mx-auto text-rose-500 mb-4" aria-hidden="true" />
                <h3 className="text-xl font-bold text-[#0B1E36] mb-2">Unable to Process Query</h3>
                <p className="text-slate-600 text-sm max-w-md mx-auto mb-6">
                  An issue occurred while parsing your scientific query. Please try rephrasing your search.
                </p>
                <Button variant="outline" size="sm" onClick={() => handleSearch("Antarctica")} className="min-h-[40px]">
                  Reset Search
                </Button>
              </div>
            </StatePanel>
          )}

          {/* 4. No-results state */}
          {status === "no-results" && (
            <StatePanel id="no-results">
              <div className="bg-white/90 backdrop-blur-md border border-[#0284C7]/15 rounded-3xl text-center py-16 px-6 shadow-sm" role="status">
                <Search size={40} className="mx-auto text-slate-400 mb-4" aria-hidden="true" />
                <h3 className="text-xl font-bold text-[#0B1E36] mb-2">No Matching Records Found</h3>
                <p className="text-slate-600 text-sm max-w-md mx-auto mb-6">
                  We couldn&apos;t find any expeditions, datasets, or publications matching &ldquo;{query}&rdquo;.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Button variant="secondary" size="sm" onClick={() => handleSearch("Maitri Station")} className="min-h-[40px]">
                    Try &quot;Maitri Station&quot;
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleSearch("Indian polar expeditions")} className="min-h-[40px]">
                    Try &quot;Indian polar expeditions&quot;
                  </Button>
                </div>
              </div>
            </StatePanel>
          )}

          {/* 5. Results state */}
          {status === "results" && (
            <StatePanel id={`results-${query}`}>
              <div className="space-y-10">
                {/* Expeditions */}
                {filteredResults.expeditions.length > 0 && (
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-[#0B1E36] mb-4 flex items-center gap-2 font-mono">
                      <MapPin size={16} className="text-[#0284C7]" /> Expeditions ({filteredResults.expeditions.length})
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {filteredResults.expeditions.map((exp) => (
                        <div key={exp.id} className="bg-white/95 border border-[#0284C7]/15 rounded-2xl p-6 flex flex-col justify-between shadow-xs hover:border-[#0284C7]/40 hover:shadow-md transition-all">
                          <div>
                            <div className="flex justify-between items-start gap-2 mb-2">
                              <h4 className="text-base font-bold text-[#0B1E36]">{exp.title}</h4>
                              <Badge variant="glow">{exp.year}</Badge>
                            </div>
                            <p className="text-xs text-slate-600 mb-4 line-clamp-2 leading-relaxed">{exp.description}</p>
                          </div>
                          <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                            <span className="text-xs text-slate-500 font-medium">{exp.location}</span>
                            <Link href={`/expeditions/${exp.slug}`}>
                              <Button variant="outline" size="sm" className="text-xs py-1.5 px-3 min-h-[36px]">
                                View Story <ArrowRight size={12} className="ml-1" />
                              </Button>
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Datasets */}
                {filteredResults.datasets.length > 0 && (
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-[#0B1E36] mb-4 flex items-center gap-2 font-mono">
                      <Database size={16} className="text-[#0284C7]" /> Scientific Datasets ({filteredResults.datasets.length})
                    </h3>
                    <div className="space-y-3">
                      {filteredResults.datasets.map((ds) => (
                        <div key={ds.id} className="bg-white/95 border border-[#0284C7]/15 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs hover:border-[#0284C7]/40 hover:shadow-md transition-all">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant="default">{ds.repository}</Badge>
                              <span className="text-xs text-slate-500 font-mono">{ds.format} • {ds.size}</span>
                            </div>
                            <h4 className="text-sm font-bold text-[#0B1E36]">{ds.title}</h4>
                            <p className="text-xs text-slate-600 mt-1">{ds.locationName} | DOI: {ds.doi}</p>
                          </div>
                          <Link href="/datasets" className="shrink-0">
                            <Button variant="secondary" size="sm" className="text-xs py-2 px-3.5 min-h-[38px]">
                              Details <ExternalLink size={12} className="ml-1" />
                            </Button>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Publications */}
                {filteredResults.publications.length > 0 && (
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-[#0B1E36] mb-4 flex items-center gap-2 font-mono">
                      <BookOpen size={16} className="text-[#0284C7]" /> Publications ({filteredResults.publications.length})
                    </h3>
                    <div className="space-y-3">
                      {filteredResults.publications.map((pub) => (
                        <div key={pub.id} className="bg-white/95 border border-[#0284C7]/15 rounded-2xl p-5 shadow-xs hover:border-[#0284C7]/40 hover:shadow-md transition-all">
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                            <div>
                              <span className="text-xs text-[#0284C7] font-mono font-semibold">{pub.year} • {pub.journal}</span>
                              <h4 className="text-sm font-bold text-[#0B1E36] mt-1">{pub.title}</h4>
                              <p className="text-xs text-slate-600 mt-1">Authors: {(pub.authors || []).join(", ")}</p>
                            </div>
                            <Link href="/publications" className="shrink-0">
                              <Button variant="ghost" size="sm" className="text-xs min-h-[36px]">
                                Read Abstract
                              </Button>
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </StatePanel>
          )}
        </div>
      </Container>
    </div>
  );
}
