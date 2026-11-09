/*
Copyright (c) 2026 Sabareesh M (saba1207B). All Rights Reserved.

This source code is proprietary and confidential.

Unauthorized copying, redistribution, modification, or use — including
any use for artificial intelligence / machine learning training —
is strictly prohibited.

See the LICENSE and COPYRIGHT files in the repository root for full terms.
*/

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
