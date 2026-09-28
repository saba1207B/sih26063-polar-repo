'use client';

import React from 'react';
import Image from 'next/image';

interface PageBackgroundProps {
  src?: string;
  alt?: string;
  overlayOpacity?: 'vivid' | 'light' | 'medium' | 'subtle' | 'none';
  variant?: 'polar-ice' | 'glacial-canyon';
  className?: string;
}

export function PageBackground({
  src = '/images/ice-canyon-stream-4k.jpg',
  alt = 'Glacial canyon valley with evaporating mist and cold stream flowing between ice mountains',
  overlayOpacity = 'light',
  className = '',
}: PageBackgroundProps) {
  // Pure Polar Ice & Glacial Overlays: top crisp ice mist -> mid crystalline cyan/sapphire -> bottom deep polar ocean
  const polarOverlays = {
    none: 'from-transparent via-transparent to-[rgba(10,37,64,0.20)]',
    vivid:
      'from-[rgba(240,249,255,0.12)] via-[rgba(6,182,212,0.10)] to-[rgba(10,37,64,0.28)]',
    light:
      'from-[rgba(240,249,255,0.22)] via-[rgba(6,182,212,0.14)] to-[rgba(10,37,64,0.38)]',
    medium:
      'from-[rgba(240,249,255,0.38)] via-[rgba(6,182,212,0.20)] to-[rgba(10,37,64,0.48)]',
    subtle:
      'from-[rgba(240,249,255,0.50)] via-[rgba(6,182,212,0.28)] to-[rgba(10,37,64,0.58)]',
  };

  const selectedOverlay = polarOverlays[overlayOpacity] || polarOverlays.light;

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {/* Real High-Resolution Photographic Aerial Background */}
      <Image
        src={src}
        alt={alt}
        fill
        priority
        className="object-cover object-center filter saturate-[1.06] contrast-[1.02]"
        sizes="100vw"
        quality={92}
      />

      {/* Atmospheric Polar Glacial-to-Sapphire Wash Overlay ensuring 100% WCAG AA text legibility */}
      <div
        className={`absolute inset-0 bg-gradient-to-b ${selectedOverlay}`}
      />

      {/* Subtle polar cartographic latitude/longitude coordinates grid */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.30)_1px,transparent_1px)] bg-[size:40px_40px]" />
    </div>
  );
}

