'use client';

import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  staggerIndex?: number;
  direction?: 'up' | 'down' | 'none';
  distance?: number;
}

/**
 * ScrollReveal Component
 * Lightweight IntersectionObserver-driven reveal & stagger animation.
 * Efficiently triggers CSS opacity & translateY transitions without heavy continuous scroll event listeners.
 * Respects prefers-reduced-motion.
 */
export function ScrollReveal({
  children,
  className = '',
  staggerIndex = 0,
  direction = 'up',
  distance = 20,
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reducedMotionMq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reducedMotionMq.matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const getInitialTransform = () => {
    if (direction === 'up') return `translateY(${distance}px)`;
    if (direction === 'down') return `translateY(-${distance}px)`;
    return 'none';
  };

  return (
    <div
      ref={elementRef}
      className={`transition-all duration-700 ease-editorial ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0px)' : getInitialTransform(),
        transitionDelay: `${staggerIndex * 0.12}s`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {children}
    </div>
  );
}
