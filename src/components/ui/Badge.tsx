import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "glow" | "outline" | "sand" | "seafoam";
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  className,
}: BadgeProps) {
  const variants = {
    default:
      "bg-[#E0F7FA] text-[#0C5A66] border border-[#99F6E4] font-mono font-bold rounded-full",
    glow:
      "bg-[#CCFBF1] text-[#0F766E] border border-[#5EEAD4] font-mono font-bold shadow-sm rounded-full",
    outline:
      "bg-white/90 text-[#1E3E47] border border-[#527982]/30 font-mono rounded-full",
    sand:
      "bg-[#FEF3C7] text-[#B45309] border border-[#FDE68A] font-mono font-bold rounded-full shadow-xs",
    seafoam:
      "bg-[#F0FDFA] text-[#0891B2] border border-[#A7F3D0] font-mono font-bold rounded-full",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 text-editorial-meta uppercase tracking-wider text-[11px]",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
