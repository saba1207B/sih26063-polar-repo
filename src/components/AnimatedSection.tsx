"use client";

import React from "react";
import { useScrollAnimation, staggerStyle } from "@/hooks/useScrollAnimation";
import { clsx } from "clsx";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: React.ElementType;
}

/**
 * Wraps any block in a scroll-triggered fade+rise animation.
 * Respects prefers-reduced-motion.
 */
export function AnimatedSection({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: AnimatedSectionProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement>}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(22px)",
        transition: `opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s, transform 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
      }}
    >
      {children}
    </Tag>
  );
}

interface AnimatedGridProps {
  children: React.ReactNode[];
  className?: string;
  staggerDelay?: number;
}

/**
 * Wraps a list of children in a stagger-animated grid container.
 * Each child animates in with an increasing delay.
 */
export function AnimatedGrid({
  children,
  className,
  staggerDelay = 0.07,
}: AnimatedGridProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.08 });

  return (
    <div ref={ref} className={clsx(className)}>
      {React.Children.map(children, (child, i) => (
        <div key={i} style={staggerStyle(i, isVisible, staggerDelay)}>
          {child}
        </div>
      ))}
    </div>
  );
}
