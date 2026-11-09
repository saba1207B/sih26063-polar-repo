/*
Copyright (c) 2026 Sabareesh M (saba1207B). All Rights Reserved.

This source code is proprietary and confidential.

Unauthorized copying, redistribution, modification, or use — including
any use for artificial intelligence / machine learning training —
is strictly prohibited.

See the LICENSE and COPYRIGHT files in the repository root for full terms.
*/

'use client';

import React, { useEffect, useRef, useState } from 'react';

interface TextRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // in seconds
  as?: React.ElementType;
}

/**
 * TextReveal Component
 * Masked span text reveal transition (translateY(100%) -> translateY(0))
 * Duration ~1s with cubic-bezier(0.16, 1, 0.3, 1) timing.
 * Respects prefers-reduced-motion.
 */
export function TextReveal({
  children,
  className = '',
  delay = 0,
  as: Component = 'div',
}: TextRevealProps) {
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
      { threshold: 0.15 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <Component ref={elementRef} className={`overflow-hidden ${className}`}>
      <span
        className="block transition-transform duration-1000 ease-editorial"
        style={{
          transform: isVisible ? 'translateY(0%)' : 'translateY(100%)',
          transitionDelay: `${delay}s`,
          transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {children}
      </span>
    </Component>
  );
}
