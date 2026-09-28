"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Expedition } from "@/types";
import { ArrowUpRight, MapPin, Calendar, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface ExpeditionCardProps {
  expedition: Expedition;
  index: number;
}

export function ExpeditionCard({ expedition, index }: ExpeditionCardProps) {
  const cardBorderClass = "rounded-[28px] sm:rounded-[36px]";
  const imageBorderClass = "rounded-2xl sm:rounded-3xl";

  return (
    <Link
      href={`/expeditions/${expedition.slug}`}
      className={cn(
        "group relative flex flex-col justify-between bg-white/90 backdrop-blur-md border border-[#0284C7]/18 overflow-hidden p-6 sm:p-8 transition-all duration-300 hover:bg-white hover:border-[#0284C7]/50 hover:shadow-xl shadow-sm text-slate-800",
        cardBorderClass
      )}
    >
      <div>
        {/* Card Header Metadata & Arrow Indicator */}
        <div className="flex items-center justify-between mb-6 z-10 relative">
          <div className="flex items-center gap-3">
            <span className="text-editorial-meta text-[#0284C7] bg-[#F0F9FF] border border-[#BAE6FD] px-3 py-1 font-bold rounded-full">
              {expedition.year}
            </span>
            <span className="text-editorial-meta text-slate-500 font-semibold hidden sm:inline text-[11px]">
              EXPEDITION // 0{index + 1}
            </span>
          </div>

          <div className="w-10 h-10 border border-[#0284C7]/20 bg-sky-50 text-[#0284C7] group-hover:bg-[#0284C7] group-hover:text-white transition-all rounded-full flex items-center justify-center shadow-xs">
            <ArrowUpRight size={18} />
          </div>
        </div>

        {/* Editorial Curved Image Container */}
        <div
          className={cn(
            "relative w-full h-64 sm:h-80 overflow-hidden mb-6 bg-slate-100 shadow-inner",
            imageBorderClass
          )}
        >
          <Image
            src={expedition.coverImage || "/images/polar-station.jpg"}
            alt={expedition.title}
            fill
            className="editorial-image object-cover object-center group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E36]/40 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity duration-700" />
        </div>

        {/* Title */}
        <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B1E36] mb-3 line-clamp-2 leading-tight group-hover:text-[#0284C7] transition-colors">
          {expedition.title}
        </h3>

        {/* Location & Leader */}
        <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs sm:text-sm text-slate-600 mb-4">
          <div className="flex items-center gap-1.5 font-medium">
            <MapPin size={14} className="text-[#0284C7] shrink-0" />
            <span>{expedition.location}</span>
          </div>
          {expedition.leader && (
            <div className="flex items-center gap-1.5 font-medium">
              <User size={14} className="text-[#0284C7] shrink-0" />
              <span>{expedition.leader}</span>
            </div>
          )}
        </div>

        {/* Description / Summary */}
        <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 mb-6 font-normal">
          {expedition.description}
        </p>

        {/* Research Focus / Activities */}
        <div className="flex flex-wrap gap-2 mb-6">
          {(expedition.researchFocus || []).map((focus, idx) => (
            <span
              key={idx}
              className="text-editorial-meta text-[10px] text-[#0369A1] bg-[#F0F9FF] border border-[#BAE6FD] px-2.5 py-1 font-semibold rounded-full"
            >
              {focus}
            </span>
          ))}
        </div>
      </div>

      {/* Card Footer Metadata */}
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span className="flex items-center gap-1.5 font-mono">
          <Calendar size={13} className="text-[#0284C7]" />
          <span>{expedition.dates}</span>
        </span>
        <span className="text-editorial-meta text-[#0284C7] font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
          VIEW EXPEDITION STORY →
        </span>
      </div>
    </Link>
  );
}
