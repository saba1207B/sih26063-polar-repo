"use client";

import { useEffect, useRef, useState } from "react";

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

/**
 * A lightweight IntersectionObserver hook for scroll-triggered animations.
 * Respects prefers-reduced-motion automatically.
 */
export function useScrollAnimation<T extends Element = HTMLDivElement>(
  options: UseScrollAnimationOptions = {}
) {
  const { threshold = 0.12, rootMargin = "0px 0px -40px 0px", once = true } =
    options;

  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    // Detect prefers-reduced-motion
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      const timer = setTimeout(() => {
        setPrefersReduced(true);
        setIsVisible(true);
      }, 0);
      return () => clearTimeout(timer);
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, isVisible, prefersReduced };
}

/**
 * Returns staggered inline style for a child element.
 */
export function staggerStyle(
  index: number,
  isVisible: boolean,
  baseDelay = 0.06
): React.CSSProperties {
  return {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0) scale(1)" : "translateY(20px) scale(0.98)",
    transition: `opacity 0.65s cubic-bezier(0.22, 1, 0.36, 1) ${index * baseDelay}s, transform 0.65s cubic-bezier(0.22, 1, 0.36, 1) ${index * baseDelay}s`,
  };
}
