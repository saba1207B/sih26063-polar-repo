'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Container, Button, Badge } from '@/components/ui';
import { AnimatedSection } from '@/components/AnimatedSection';
import {
  Send,
  Database,
  ArrowRight,
  ShieldCheck,
  ShieldAlert,
  Archive,
  GitBranch,
  ExternalLink,
  WifiOff,
  Loader2,
  Bot,
  User,
  Sparkles,
} from 'lucide-react';
import { askPolarArchive } from '@/services/assistant';
import type { Claim, AssistantResponse, SourceRecord } from '@/types';
import { SnowParticles } from '@/components/SnowParticles';
import { PageBackground } from '@/components/PageBackground';

interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
  claims?: Claim[];
  sources?: SourceRecord[];
  mode?: AssistantResponse['mode'];
}

const statusBadgeStyles: Record<
  string,
  { label: string; icon: React.ElementType; className: string }
> = {
  'SOURCE VERIFIED': {
    label: 'SOURCE VERIFIED',
    icon: ShieldCheck,
    className: 'bg-emerald-50 text-emerald-800 border-emerald-300',
  },
  'UNVERIFIED OFFLINE': {
    label: 'UNVERIFIED (OFFLINE)',
    icon: WifiOff,
    className: 'bg-slate-100 text-slate-700 border-slate-300',
  },
  'STALE SOURCE': {
    label: 'STALE SOURCE',
    icon: ShieldAlert,
    className: 'bg-amber-50 text-amber-800 border-amber-300',
  },
  'ARCHIVED COPY AVAILABLE': {
    label: 'ARCHIVED COPY',
    icon: Archive,
    className: 'bg-sky-50 text-sky-800 border-sky-300',
  },
};

export default function AssistantPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'bot',
      text: 'Greetings! I am the Polar Science Research Assistant. You can ask me about Indian Antarctic and Arctic expeditions, continuous scientific observations at Maitri and Bharati stations, ice core palaeoclimate records, or Southern Ocean CTD hydrography. Every answer claim is verified against official repository records.',
      mode: 'OFFLINE_DEMO',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) {
      setErrorMessage('Please type a scientific question before submitting.');
      return;
    }

    setErrorMessage(null);
    const userMsg = input.trim();
    setMessages((prev) => [...prev, { sender: 'user', text: userMsg }]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await askPolarArchive(userMsg);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: response.answer,
          claims: response.claims,
          sources: response.sources,
          mode: response.mode,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: 'An issue occurred while traversing the polar knowledge graph. Please rephrase your query or try again.',
          mode: 'ERROR',
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="pt-32 pb-36 min-h-screen bg-transparent relative overflow-hidden page-enter">
      <PageBackground
        src="/images/ice_cave_blue_4k.jpg"
        alt="4K crystal blue ice cave and subglacial cryosphere background"
        overlayOpacity="light"
      />
      <SnowParticles count={36} />
      <Container className="relative z-10" size="default">
        {/* Header & Photographic Hero */}
        <AnimatedSection className="mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <span
                className="text-editorial-meta !text-white mb-3 block font-bold"
                style={{ color: '#ffffff' }}
              >
                // CONVERSATIONAL EVIDENCE LAYER & GRAPHRAG EVALUATOR
              </span>
              <h1
                className="heading-section text-4xl sm:text-6xl !text-white mb-5"
                style={{ color: '#ffffff' }}
              >
                POLAR RESEARCH ASSISTANT
              </h1>
              <p
                className="text-base sm:text-lg !text-white font-normal max-w-2xl leading-relaxed"
                style={{ color: '#ffffff' }}
              >
                Scientific inquiry grounded in verified polar research repositories, ice core data catalogs, and peer-reviewed literature citations.
              </p>
            </div>

            <div className="lg:col-span-4">
              <div className="relative h-44 sm:h-48 w-full rounded-3xl overflow-hidden border border-[#0284C7]/20 shadow-md">
                <Image
                  src="/images/ice_cave_blue_4k.jpg"
                  alt="4K crystal blue ice cave with subglacial cryosphere telemetry"
                  fill
                  className="editorial-image object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 30vw"
                  priority
                />
                <div className="absolute bottom-2 left-2 right-2 bg-[#0B1E36]/90 backdrop-blur-md px-3 py-1.5 rounded-xl text-white font-mono text-[10px] flex justify-between items-center border border-white/20">
                  <span className="font-semibold">CRYOSPHERE AI</span>
                  <span className="text-sky-200">PROVENANCE TRACKED</span>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Research Terminal Console */}
        <AnimatedSection delay={0.1} className="max-w-4xl mx-auto">
          <div className="bg-white/95 backdrop-blur-md border border-[#0284C7]/25 rounded-3xl overflow-hidden flex flex-col h-[720px] max-h-[82vh] shadow-xl">
            {/* Console Header */}
            <div className="px-6 py-4 border-b border-[#0284C7]/20 bg-[#0B1E36] flex items-center justify-between font-mono text-xs text-white">
              <div className="flex items-center gap-2.5">
                <Bot size={18} className="text-sky-300" aria-hidden="true" />
                <span className="font-bold tracking-wide">KNOWLEDGE GRAPH INQUIRY SYSTEM</span>
              </div>
              <span className="hidden sm:inline font-mono text-sky-200 text-[11px]">
                GRAPH-RAG EVALUATOR V2.4
              </span>
            </div>

            {/* Messages Log */}
            <div
              className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 focus:outline-none bg-[#F8FAFC]/50"
              role="log"
              aria-label="Scientific Query Log"
              aria-live="polite"
            >
              {messages.map((m, idx) => (
                <div key={idx} className="space-y-4">
                  {m.sender === 'user' ? (
                    /* User Query Block */
                    <div className="flex justify-end">
                      <div className="max-w-[85%] bg-[#003B6D] text-white p-4 sm:p-5 rounded-2xl rounded-tr-none shadow-sm">
                        <div className="flex items-center gap-2 mb-1.5 text-[10px] uppercase font-mono text-sky-200 tracking-wider font-semibold">
                          <User size={12} aria-hidden="true" /> User Query #{idx + 1}
                        </div>
                        <p className="text-sm font-medium leading-relaxed">{m.text}</p>
                      </div>
                    </div>
                  ) : (
                    /* Assistant Scientific Answer Block */
                    <div className="flex justify-start">
                      <div className="max-w-[95%] bg-[#F0F9FF] border border-[#0284C7]/20 p-5 sm:p-6 rounded-2xl rounded-tl-none shadow-sm space-y-5">
                        <div className="flex items-center justify-between border-b border-[#0284C7]/15 pb-3">
                          <div className="flex items-center gap-2 font-mono text-xs">
                            <Badge variant="glow" className="text-[10px]">
                              RESEARCH ANSWER
                            </Badge>
                            {m.mode && (
                              <Badge variant="outline" className="text-[10px]">
                                MODE: {m.mode}
                              </Badge>
                            )}
                          </div>
                          <span className="text-[10px] font-mono text-slate-500 font-semibold">
                            #REC-0{idx}
                          </span>
                        </div>

                        <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-normal">
                          {m.text}
                        </p>

                        {/* Claim Verification & Evidence Trail */}
                        {m.claims && m.claims.length > 0 && (
                          <div className="pt-4 border-t border-[#0284C7]/15 space-y-4">
                            <div className="text-xs font-bold uppercase tracking-wider text-[#0B1E36] flex items-center gap-1.5 font-mono">
                              <ShieldCheck size={15} className="text-[#0284C7]" /> Evidence & Claim Verification ({m.claims.length}):
                            </div>

                            {m.claims.map((claim) => {
                              const status =
                                statusBadgeStyles[claim.verificationStatus] ||
                                statusBadgeStyles['UNVERIFIED OFFLINE'];
                              const StatusIcon = status.icon;

                              return (
                                <div
                                  key={claim.id}
                                  className="p-4 rounded-2xl bg-white border border-[#0284C7]/20 space-y-3 font-mono text-xs shadow-xs"
                                >
                                  {/* Claim Header & Status */}
                                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
                                    <span
                                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-mono font-bold ${status.className}`}
                                    >
                                      <StatusIcon size={12} /> {status.label}
                                    </span>
                                    {claim.lastCheckedAt && (
                                      <span className="text-slate-500 text-[10px]">
                                        VERIFIED: {new Date(claim.lastCheckedAt).toLocaleDateString()}
                                      </span>
                                    )}
                                  </div>

                                  {/* Claim Text */}
                                  <p className="text-slate-800 text-xs sm:text-sm font-sans italic leading-relaxed">
                                    &ldquo;{claim.text}&rdquo;
                                  </p>

                                  {/* Source Metadata */}
                                  {(claim.repository || claim.doi || claim.landingUrl) && (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-600 text-[11px] pt-1">
                                      {claim.repository && (
                                        <div className="flex items-center gap-1.5">
                                          <Database size={12} className="text-[#0284C7]" />
                                          <span className="font-semibold text-slate-700">REPO: {claim.repository}</span>
                                        </div>
                                      )}
                                      {claim.doi && (
                                        <div className="flex items-center gap-1.5">
                                          <ExternalLink size={12} className="text-[#0284C7]" />
                                          <span className="text-[#0284C7] font-mono font-medium">DOI: {claim.doi}</span>
                                        </div>
                                      )}
                                      {claim.landingUrl && (
                                        <div className="flex items-center gap-1.5 col-span-1 sm:col-span-2">
                                          <ExternalLink size={12} className="text-[#0284C7]" />
                                          <a
                                            href={claim.landingUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[#0284C7] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0284C7] rounded line-clamp-1"
                                          >
                                            {claim.landingUrl}
                                          </a>
                                        </div>
                                      )}
                                    </div>
                                  )}

                                  {/* Evidence Provenance Trail */}
                                  <div className="pt-3 border-t border-slate-100">
                                    <span className="text-[10px] font-bold text-[#0B1E36] uppercase tracking-wider block mb-2 flex items-center gap-1">
                                      <GitBranch size={12} className="text-[#0284C7]" /> PROVENANCE TRAIL:
                                    </span>
                                    {claim.provenancePath ? (
                                      <div className="flex flex-wrap items-center gap-1.5">
                                        {claim.provenancePath.steps.map((step, sIdx) => (
                                          <React.Fragment key={sIdx}>
                                            <span className="px-2.5 py-0.5 rounded-full bg-[#E0F2FE] border border-[#0284C7]/20 text-[#0369A1] font-mono text-[10px] font-semibold">
                                              {step}
                                            </span>
                                            {sIdx < claim.provenancePath!.steps.length - 1 && (
                                              <ArrowRight size={10} className="text-slate-400" />
                                            )}
                                          </React.Fragment>
                                        ))}
                                      </div>
                                    ) : (
                                      <div className="flex flex-wrap items-center gap-1.5">
                                        <span className="px-2.5 py-0.5 rounded-full bg-[#E0F2FE] border border-[#0284C7]/20 text-[#0369A1] text-[10px] font-semibold">
                                          CLAIM
                                        </span>
                                        <ArrowRight size={10} className="text-slate-400" />
                                        <span className="px-2.5 py-0.5 rounded-full bg-[#E0F2FE] border border-[#0284C7]/20 text-[#0369A1] text-[10px] font-semibold">
                                          RESEARCH
                                        </span>
                                        <ArrowRight size={10} className="text-slate-400" />
                                        <span className="px-2.5 py-0.5 rounded-full bg-[#E0F2FE] border border-[#0284C7]/20 text-[#0369A1] text-[10px] font-semibold">
                                          DATASET
                                        </span>
                                        <ArrowRight size={10} className="text-slate-400" />
                                        <span className="px-2.5 py-0.5 rounded-full bg-[#E0F2FE] border border-[#0284C7]/20 text-[#0369A1] text-[10px] font-semibold">
                                          PUBLICATION
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Typing / Processing State */}
              {isTyping && (
                <div
                  className="p-4 rounded-2xl bg-[#E0F2FE]/70 border border-[#0284C7]/25 flex items-center gap-3 text-xs font-mono text-[#0369A1]"
                  role="status"
                  aria-live="polite"
                >
                  <Loader2 size={18} className="animate-spin text-[#0284C7]" />
                  <span className="font-semibold">Traversing polar knowledge graph & verifying citations...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Error Alert */}
            {errorMessage && (
              <div
                className="mx-4 sm:mx-6 mb-2 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-mono"
                role="alert"
              >
                {errorMessage}
              </div>
            )}

            {/* Query Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-4 sm:p-5 border-t border-[#0284C7]/15 flex items-center gap-3 bg-white"
            >
              <label htmlFor="assistant-input" className="sr-only">
                Enter scientific question about polar research
              </label>
              <input
                id="assistant-input"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about expeditions, ice core findings, or station datasets…"
                aria-label="Enter scientific question about polar research"
                className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-[#0B1E36] placeholder:text-slate-400 focus:outline-none focus:border-[#0284C7] focus:ring-2 focus:ring-[#0284C7]/20 min-h-[44px]"
              />
              <Button
                type="submit"
                variant="primary"
                size="sm"
                disabled={isTyping}
                aria-label="Submit query to Polar Assistant"
                className="shrink-0 min-h-[44px] px-5 gap-2 text-xs"
              >
                <Send size={14} /> Send
              </Button>
            </form>
          </div>
        </AnimatedSection>
      </Container>
    </div>
  );
}
