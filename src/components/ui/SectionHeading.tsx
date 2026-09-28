import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}

export function SectionHeading({
  label,
  title,
  description,
  align = "center",
  light = false,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-4xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {label && (
        <span
          className={cn(
            "inline-block mb-3 text-editorial-meta font-bold tracking-widest",
            light ? "text-sky-200" : "text-[#0284C7]"
          )}
        >
          {label}
        </span>
      )}
      <h2
        className={cn(
          "heading-section text-3xl sm:text-4xl md:text-5xl lg:text-6xl",
          light ? "text-white drop-shadow-md" : "text-[#0B1E36]"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-base sm:text-lg leading-relaxed max-w-3xl",
            align === "center" && "mx-auto",
            light ? "text-white/90" : "text-[#475569]"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
