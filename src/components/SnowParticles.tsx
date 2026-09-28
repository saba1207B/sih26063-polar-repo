"use client";

import React, { useMemo } from "react";

interface SnowParticlesProps {
  count?: number;
  className?: string;
}

// 1. Classic V-Branch (Image Row 1, Column 1)
function SnowflakeClassic() {
  return (
    <svg
      viewBox="-16 -16 32 32"
      className="w-full h-full text-white"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <g key={deg} transform={`rotate(${deg})`}>
          <line x1="0" y1="0" x2="0" y2="-14" />
          <line x1="0" y1="-8.5" x2="-4" y2="-12.5" />
          <line x1="0" y1="-8.5" x2="4" y2="-12.5" />
        </g>
      ))}
    </svg>
  );
}

// 2. Double V-Branch (Image Row 1, Column 2)
function SnowflakeDoubleV() {
  return (
    <svg
      viewBox="-16 -16 32 32"
      className="w-full h-full text-white"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <g key={deg} transform={`rotate(${deg})`}>
          <line x1="0" y1="0" x2="0" y2="-14" />
          <line x1="0" y1="-5.5" x2="-3" y2="-8.5" />
          <line x1="0" y1="-5.5" x2="3" y2="-8.5" />
          <line x1="0" y1="-10" x2="-4" y2="-13" />
          <line x1="0" y1="-10" x2="4" y2="-13" />
        </g>
      ))}
    </svg>
  );
}

// 3. Ornate Central Ring (Image Row 2, Column 2)
function SnowflakeOrnate() {
  return (
    <svg
      viewBox="-16 -16 32 32"
      className="w-full h-full text-white"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="0" cy="0" r="2.2" strokeWidth="1.5" />
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <g key={deg} transform={`rotate(${deg})`}>
          <line x1="0" y1="-2.2" x2="0" y2="-14" />
          <line x1="0" y1="-5" x2="-2.5" y2="-7" />
          <line x1="0" y1="-5" x2="2.5" y2="-7" />
          <line x1="0" y1="-9" x2="-3.5" y2="-11.5" />
          <line x1="0" y1="-9" x2="3.5" y2="-11.5" />
          <line x1="0" y1="-12" x2="-2" y2="-13.8" />
          <line x1="0" y1="-12" x2="2" y2="-13.8" />
        </g>
      ))}
    </svg>
  );
}

// 4. Starburst Rays (Image Row 2, Column 4)
function SnowflakeStarburst() {
  return (
    <svg
      viewBox="-16 -16 32 32"
      className="w-full h-full text-white"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <g key={deg} transform={`rotate(${deg})`}>
          <line x1="0" y1="0" x2="0" y2="-14" />
          <line x1="0" y1="-7.5" x2="-3.5" y2="-11" />
          <line x1="0" y1="-7.5" x2="3.5" y2="-11" />
        </g>
      ))}
      {[30, 90, 150, 210, 270, 330].map((deg) => (
        <g key={deg} transform={`rotate(${deg})`}>
          <line x1="0" y1="0" x2="0" y2="-9" />
          <line x1="0" y1="-5.5" x2="-2" y2="-7.5" />
          <line x1="0" y1="-5.5" x2="2" y2="-7.5" />
        </g>
      ))}
    </svg>
  );
}

// 5. Chevron Rib Lattice (Image Row 1, Column 3)
function SnowflakeLattice() {
  return (
    <svg
      viewBox="-16 -16 32 32"
      className="w-full h-full text-white"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <g key={deg} transform={`rotate(${deg})`}>
          <line x1="0" y1="0" x2="0" y2="-14" />
          <path d="M -3.5 -5 L 0 -3 L 3.5 -5" />
          <path d="M -5 -9 L 0 -6.5 L 5 -9" />
          <path d="M -3 -12 L 0 -10.5 L 3 -12" />
        </g>
      ))}
    </svg>
  );
}

const SNOWFLAKE_COMPONENTS = [
  SnowflakeClassic,
  SnowflakeDoubleV,
  SnowflakeOrnate,
  SnowflakeStarburst,
  SnowflakeLattice,
];

export function SnowParticles({ count = 25, className }: SnowParticlesProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const particles = useMemo(() => {
    // Deterministic random seeded by index to ensure stable SSR/CSR
    const seededRand = (seed: number, offset = 0) => {
      const x = Math.sin(seed * 9301 + offset * 49297 + 233) * 43758.5453;
      return x - Math.floor(x);
    };

    return Array.from({ length: count }, (_, i) => {
      const randType = seededRand(i, 0);
      const sizeClass = randType < 0.4 ? "fine" : randType < 0.8 ? "mid" : "large";
      
      const size =
        sizeClass === "fine"
          ? seededRand(i, 1) * 4 + 14 // 14 - 18px
          : sizeClass === "mid"
          ? seededRand(i, 1) * 6 + 20 // 20 - 26px
          : seededRand(i, 1) * 10 + 28; // 28 - 38px

      const fallDuration =
        sizeClass === "fine"
          ? seededRand(i, 4) * 6 + 16 // 16 - 22s (delicate drift)
          : sizeClass === "mid"
          ? seededRand(i, 4) * 6 + 12 // 12 - 18s
          : seededRand(i, 4) * 4 + 9;  // 9 - 13s

      const spinDirection = seededRand(i, 9) > 0.5 ? 1 : -1;
      const spinAngle = (seededRand(i, 10) * 180 + 90) * spinDirection;

      return {
        id: i,
        Component: SNOWFLAKE_COMPONENTS[i % SNOWFLAKE_COMPONENTS.length],
        left: `${seededRand(i, 2) * 98 + 1}%`,
        size,
        opacity:
          sizeClass === "fine"
            ? seededRand(i, 3) * 0.2 + 0.5
            : sizeClass === "mid"
            ? seededRand(i, 3) * 0.2 + 0.65
            : seededRand(i, 3) * 0.15 + 0.8,
        fallDuration,
        driftDuration: seededRand(i, 5) * 4 + 6,
        // Negative delay so flakes are immediately distributed from top to bottom
        delay: -(seededRand(i, 6) * fallDuration),
        driftDelay: -(seededRand(i, 7) * 5),
        driftAmplitude: seededRand(i, 8) * 35 + 15,
        spinMid: `${spinAngle * 0.5}deg`,
        spinEnd: `${spinAngle}deg`,
      };
    });
  }, [count]);

  if (!mounted) {
    return (
      <div
        className={className || "absolute inset-0 overflow-hidden pointer-events-none"}
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      className={className || "absolute inset-0 overflow-hidden pointer-events-none"}
      aria-hidden="true"
    >
      {particles.map((p) => {
        const SnowflakeIcon = p.Component;
        return (
          <div
            key={p.id}
            className="snow-fall-wrapper"
            style={{
              left: p.left,
              animationName: "snow-fall",
              animationDuration: `${p.fallDuration}s`,
              animationDelay: `${p.delay}s`,
              animationTimingFunction: "linear",
              animationIterationCount: "infinite",
            }}
          >
            <div
              className="snow-flake"
              style={{
                width: `${p.size}px`,
                height: `${p.size}px`,
                opacity: p.opacity,
                animationName: "snow-drift-spin",
                animationDuration: `${p.driftDuration}s`,
                animationDelay: `${p.driftDelay}s`,
                animationTimingFunction: "ease-in-out",
                animationIterationCount: "infinite",
                ["--drift-x" as string]: `${p.driftAmplitude}px`,
                ["--spin-mid" as string]: p.spinMid,
                ["--spin-end" as string]: p.spinEnd,
              }}
            >
              <SnowflakeIcon />
            </div>
          </div>
        );
      })}
    </div>
  );
}
