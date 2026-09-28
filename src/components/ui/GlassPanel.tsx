import React from "react";
import { cn } from "@/lib/utils";

interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "subtle" | "card";
  children: React.ReactNode;
}

export function GlassPanel({
  variant = "default",
  className,
  children,
  ...props
}: GlassPanelProps) {
  // Mapping existing variants to the new editorial classes
  const variants = {
    default: "editorial-panel-dark",
    subtle: "editorial-panel-transparent",
    card: "editorial-panel-light",
  };

  return (
    <div
      className={cn("rounded-2xl p-6 md:p-8", variants[variant], className)}
      {...props}
    >
      {children}
    </div>
  );
}
