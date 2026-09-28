"use client";

import React from "react";
import { Expedition } from "@/types";

interface ConnectedKnowledgeDiagramProps {
  expedition: Expedition;
}

export function ConnectedKnowledgeDiagram({ expedition }: ConnectedKnowledgeDiagramProps) {
  const researchCount = expedition.researchActivities?.length || 0;
  const datasetCount = expedition.datasets?.length || 0;
  const publicationCount = expedition.publications?.length || 0;
  const mediaCount = expedition.media?.length || 0;

  const nodes = [
    {
      label: "EXPEDITION",
      title: expedition.title,
      meta: `${expedition.year} • ${expedition.location}`,
    },
    {
      label: "RESEARCH",
      title: researchCount > 0 ? expedition.researchActivities![0].title : "Field Monitoring",
      meta: `${researchCount} Active Domain${researchCount !== 1 ? 's' : ''}`,
    },
    {
      label: "DATASET",
      title: datasetCount > 0 ? expedition.datasets![0].title : "Raw Sensor Feeds",
      meta: `${datasetCount} Open Dataset${datasetCount !== 1 ? 's' : ''}`,
    },
    {
      label: "PUBLICATION",
      title: publicationCount > 0 ? expedition.publications![0].title : "Peer-Reviewed Paper",
      meta: `${publicationCount} Publication${publicationCount !== 1 ? 's' : ''}`,
    },
    {
      label: "MEDIA",
      title: mediaCount > 0 ? `${mediaCount} Visual Assets` : "Field Photography",
      meta: `${mediaCount} Media Record${mediaCount !== 1 ? 's' : ''}`,
    },
  ];

  return (
    <div className="bg-white/95 backdrop-blur-xl p-8 sm:p-10 border border-[#0284C7]/20 shadow-md rounded-3xl my-8 transition-all duration-300 hover:border-[#0284C7]/40 hover:shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-slate-100 mb-6 gap-3 font-mono text-xs uppercase tracking-widest">
        <span className="font-bold text-[#0284C7]">// CONNECTED KNOWLEDGE GRAPH</span>
        <span className="text-slate-500 font-medium">FIG 1.0 — PROVENANCE LINEAGE FLOW</span>
      </div>

      {/* Horizontal Flow Diagram (Desktop: Flex Row, Mobile: Flex Column) */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-5 lg:gap-3 relative">
        {nodes.map((node, idx) => (
          <React.Fragment key={node.label}>
            {/* Diagram Node */}
            <div className="flex-1 bg-[#F8FAFC] border border-[#0284C7]/15 p-5 rounded-2xl flex flex-col justify-between min-h-[140px] hover:border-[#0284C7]/40 hover:bg-[#F0F9FF] transition-all shadow-xs group">
              <div>
                <div className="flex items-center justify-between mb-2.5 font-mono text-[10px] uppercase tracking-widest text-[#0284C7]">
                  <span className="font-bold">0{idx + 1}. {node.label}</span>
                  <span className="bg-sky-50 text-[#0369A1] px-1.5 py-0.5 rounded border border-sky-100">NODE</span>
                </div>
                <h4 className="font-bold text-sm text-[#0B1E36] line-clamp-2 leading-snug mb-2 group-hover:text-[#0284C7] transition-colors">
                  {node.title}
                </h4>
              </div>
              <div className="pt-3 border-t border-slate-100 font-mono text-[10px] text-slate-500 uppercase font-medium">
                {node.meta}
              </div>
            </div>

            {/* Connecting Arrow Line */}
            {idx < nodes.length - 1 && (
              <div className="flex lg:flex-col items-center justify-center shrink-0 py-2 lg:py-0 lg:px-1">
                <div className="hidden lg:block w-6 h-px bg-[#0284C7]/40 relative">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 border-t border-r border-[#0284C7] rotate-45" />
                </div>
                <div className="lg:hidden h-5 w-px bg-[#0284C7]/40 relative">
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 border-b border-r border-[#0284C7] rotate-45" />
                </div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-slate-100 font-mono text-[11px] text-slate-500 flex flex-col sm:flex-row justify-between gap-2">
        <span>RELATIONSHIP: DIRECT PRIMARY PROVENANCE (NCPOR / NPDC)</span>
        <span className="text-[#0284C7] font-semibold">REPOSITORY RECORD: {expedition.id}</span>
      </div>
    </div>
  );
}
