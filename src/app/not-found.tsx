'use client';

import React from 'react';
import Link from 'next/link';
import { Container, Button } from '@/components/ui';
import { PageBackground } from '@/components/PageBackground';
import { SnowParticles } from '@/components/SnowParticles';
import { Compass, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="pt-36 pb-36 min-h-screen bg-transparent relative overflow-hidden flex items-center justify-center page-enter">
      <PageBackground
        src="/images/polar-aerial.jpg"
        alt="Polar glacier plateau 404 background"
        overlayOpacity="medium"
      />
      <SnowParticles count={30} />
      <Container size="narrow" className="relative z-10 text-center">
        <div className="bg-white/95 backdrop-blur-md border border-[#0284C7]/20 p-10 sm:p-12 rounded-3xl shadow-lg max-w-lg mx-auto">
          <div className="w-16 h-16 bg-[#F0F9FF] border border-[#0284C7]/20 flex items-center justify-center mx-auto mb-6 rounded-2xl text-[#0284C7]">
            <Compass size={32} />
          </div>
          <span className="text-editorial-meta text-[#0284C7] font-bold block mb-2">
            // 404 NAVIGATION ERROR
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#0B1E36] mb-4">
            CHARTED BEYOND THE ICE SHELF
          </h1>
          <p className="text-slate-600 text-sm leading-relaxed mb-8">
            The coordinates or page you requested could not be found within the polar knowledge repository archive.
          </p>
          <Link href="/">
            <Button variant="primary" size="md" className="gap-2 inline-flex items-center">
              <ArrowLeft size={16} />
              Return to Repository Gateway
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  );
}
