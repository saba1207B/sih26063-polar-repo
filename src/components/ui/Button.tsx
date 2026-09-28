"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline" | "sand";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const base =
    "relative inline-flex items-center justify-center font-bold tracking-wider uppercase transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0891B2] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none overflow-hidden active:scale-[0.98] cursor-pointer";

  const variants = {
    primary:
      "bg-[#0C5A66] hover:bg-[#0891B2] text-white border border-[#073842] hover:border-[#0891B2] shadow-sm",
    secondary:
      "bg-[#E0F7FA] text-[#0C5A66] border border-[#99F6E4] hover:bg-[#CCFBF1] hover:border-[#2DD4BF] shadow-sm",
    ghost:
      "bg-transparent text-[#0C5A66] hover:bg-[#F0FDFA] hover:text-[#0891B2]",
    outline:
      "bg-white/85 backdrop-blur-sm border border-[#0891B2] text-[#0891B2] hover:bg-[#0891B2] hover:text-white shadow-sm",
    sand:
      "bg-[#E5983A] hover:bg-[#D97706] text-white border border-[#B45309] shadow-sm",
  };

  const sizes = {
    sm: "px-4 py-2 text-xs gap-1.5",
    md: "px-6 py-3 text-sm gap-2",
    lg: "px-8 py-4 text-sm gap-2.5",
  };

  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-[inherit]">
        {children}
      </span>
    </button>
  );
}
