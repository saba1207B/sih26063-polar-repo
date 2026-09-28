"use client";

import React, { useEffect } from "react";

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

/**
 * Smooth scroll provider using native scroll with CSS scroll-behavior
 * and an event-driven, throttled CSS custom property update.
 * Only updates variables when actual scroll happens to prevent idle style invalidation.
 */
export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return; // Use native scroll for reduced-motion users

    let ticking = false;
    let lastY = -1;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY === lastY) return;

      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          lastY = currentScrollY;
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          const progress = docHeight > 0 ? currentScrollY / docHeight : 0;

          document.documentElement.style.setProperty("--scroll-y", `${currentScrollY}`);
          document.documentElement.style.setProperty(
            "--scroll-progress",
            `${progress.toFixed(4)}`
          );
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return <>{children}</>;
}
