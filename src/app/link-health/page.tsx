'use client';

import React, { useState, useEffect } from 'react';
import { Container, Badge, Button } from '@/components/ui';
import { ShieldCheck, Activity, RefreshCw, CheckCircle2, Globe, ExternalLink, AlertTriangle, XCircle, Archive, Loader2 } from 'lucide-react';
import { SnowParticles } from '@/components/SnowParticles';
import { AnimatedSection, AnimatedGrid } from '@/components/AnimatedSection';
import { PageBackground } from '@/components/PageBackground';
import { getLinkHealth, triggerLiveLinkCheck } from '@/services/link-health';
import { LinkHealthResult } from '@/types';

export default function LinkHealthPage() {
  const [records, setRecords] = useState<LinkHealthResult[]>([]);
  const [isProbing, setIsProbing] = useState<boolean>(false);
  const [lastProbeTime, setLastProbeTime] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      const data = await getLinkHealth();
      setRecords(data);
    }
    loadData();
  }, []);

  const handleLiveProbe = async () => {
    setIsProbing(true);
    try {
      const liveData = await triggerLiveLinkCheck();
      setRecords(liveData);
      setLastProbeTime(new Date().toLocaleTimeString());
    } catch (err) {
      console.error('Probe failed:', err);
    } finally {
      setIsProbing(false);
    }
  };

  const healthyCount = records.filter(r => r.status === 'Healthy').length;
  const uptimePercent = records.length > 0 ? Math.round((healthyCount / records.length) * 100) : 98.4;
  const uniqueRepos = new Set(records.map(r => r.repository)).size;

  const renderStatusBadge = (status: LinkHealthResult['status']) => {
    switch (status) {
      case 'Healthy':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-300 font-bold text-xs rounded-full shadow-xs">
            <CheckCircle2 size={13} className="text-emerald-600" /> HEALTHY
          </span>
        );
      case 'Degraded':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-800 border border-amber-300 font-bold text-xs rounded-full shadow-xs">
            <AlertTriangle size={13} className="text-amber-600" /> DEGRADED
          </span>
        );
      case 'Offline':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-50 text-rose-800 border border-rose-300 font-bold text-xs rounded-full shadow-xs">
            <XCircle size={13} className="text-rose-600" /> OFFLINE
          </span>
        );
      case 'Archived':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-sky-50 text-sky-800 border border-sky-300 font-bold text-xs rounded-full shadow-xs">
            <Archive size={13} className="text-sky-600" /> ARCHIVED
          </span>
        );
    }
  };

  return (
    <div className="pt-32 pb-36 min-h-screen bg-transparent relative overflow-hidden page-enter">
      <PageBackground
        src="/images/polar-satellite-telemetry.jpg"
        alt="Polar satellite telemetry network and remote station monitoring background"
        overlayOpacity="medium"
      />
      <SnowParticles count={36} />
      <Container className="relative z-10" size="default">
        {/* Header & Controls */}
        <AnimatedSection className="mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-editorial-meta text-[#0284C7] mb-3 block font-bold">
                // REPOSITORY CONNECTIVITY & DOI RESOLVER DIAGNOSTICS
              </span>
              <h1 className="heading-section text-4xl sm:text-6xl text-[#0B1E36] mb-4">
                LINK HEALTH MONITOR
              </h1>
              <p className="text-base sm:text-lg text-slate-600 font-normal max-w-2xl leading-relaxed">
                Live endpoint availability, DOI resolver latency, and automated harvest health for national and international polar science archives.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
              <Button
                variant="primary"
                onClick={handleLiveProbe}
                disabled={isProbing}
                className="gap-2 shadow-sm font-semibold"
              >
                {isProbing ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Pinging Repositories...</span>
                  </>
                ) : (
                  <>
                    <RefreshCw size={16} />
                    <span>Run Live Probe</span>
                  </>
                )}
              </Button>
              {lastProbeTime && (
                <span className="text-xs font-mono text-slate-500">
                  Last checked: {lastProbeTime}
                </span>
              )}
            </div>
          </div>
        </AnimatedSection>

        {/* Status Overview Cards */}
        <AnimatedGrid className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12" staggerDelay={0.06}>
          <div className="bg-white/95 backdrop-blur-md border border-[#0284C7]/20 p-6 rounded-3xl text-center shadow-sm">
            <CheckCircle2 size={36} className="mx-auto text-emerald-600 mb-2" />
            <div className="text-3xl font-bold text-[#0B1E36] font-mono">{uptimePercent}%</div>
            <div className="text-xs font-semibold text-slate-600 mt-1">Repository Endpoint Uptime</div>
          </div>

          <div className="bg-white/95 backdrop-blur-md border border-[#0284C7]/20 p-6 rounded-3xl text-center shadow-sm">
            <Activity size={36} className="mx-auto text-[#0284C7] mb-2" />
            <div className="text-3xl font-bold text-[#0B1E36] font-mono">{uniqueRepos || 3} Endpoints</div>
            <div className="text-xs font-semibold text-slate-600 mt-1">NPDC, PANGAEA, AADC & Archives</div>
          </div>

          <div className="bg-white/95 backdrop-blur-md border border-[#0284C7]/20 p-6 rounded-3xl text-center shadow-sm">
            <RefreshCw size={36} className="mx-auto text-[#0369A1] mb-2" />
            <div className="text-3xl font-bold text-[#0B1E36] font-mono">Real-Time</div>
            <div className="text-xs font-semibold text-slate-600 mt-1">On-Demand HTTP & TLS Probing</div>
          </div>
        </AnimatedGrid>

        {/* Source Records List */}
        <AnimatedSection delay={0.1}>
          <h3 className="text-xl font-bold text-[#0B1E36] mb-6 flex items-center gap-2">
            <ShieldCheck size={20} className="text-[#0284C7]" /> Harvested Source Record Endpoints ({records.length})
          </h3>

          <div className="space-y-4">
            {records.map((src) => (
              <div
                key={src.id}
                className="bg-white/95 backdrop-blur-md border border-[#0284C7]/20 p-6 rounded-2xl shadow-sm transition-all hover:border-[#0284C7]/40 hover:shadow-md"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <Badge variant="glow">{src.repository}</Badge>
                      <span className="text-xs text-slate-500 font-mono">ID: {src.id}</span>
                      {src.httpCode ? (
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                          HTTP {src.httpCode}
                        </span>
                      ) : null}
                    </div>
                    <div className="text-xs sm:text-sm font-semibold text-slate-800 font-mono flex items-center gap-1.5 break-all">
                      <Globe size={13} className="text-[#0284C7] shrink-0" />
                      <a
                        href={src.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[#0284C7] hover:underline flex items-center gap-1"
                      >
                        {src.url}
                        <ExternalLink size={12} className="opacity-70" />
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs shrink-0 font-mono">
                    {src.responseTimeMs ? (
                      <div className="text-left md:text-right">
                        <div className="text-slate-400 text-[10px] uppercase font-bold">Latency</div>
                        <div className="text-slate-700 font-bold">{src.responseTimeMs} ms</div>
                      </div>
                    ) : null}
                    <div className="text-left md:text-right">
                      <div className="text-slate-400 text-[10px] uppercase font-bold">Last Synced</div>
                      <div className="text-slate-600">
                        {src.lastChecked ? src.lastChecked.replace('T', ' ').slice(0, 19) : 'Just now'} UTC
                      </div>
                    </div>
                    <div>
                      {renderStatusBadge(src.status)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </Container>
    </div>
  );
}
