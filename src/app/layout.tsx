import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { OfflineDemoBanner } from "@/components/OfflineDemoBanner";
import { SnowParticles } from "@/components/SnowParticles";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Polar Science Knowledge Repository — SIH26063",
  description:
    "Explore expeditions, scientific research, datasets, publications and stories from India's polar regions. A knowledge repository for students, teachers and researchers.",
  keywords: [
    "polar science",
    "antarctica",
    "arctic",
    "NCPOR",
    "NPDC",
    "PANGAEA",
    "Indian polar research",
    "SIH 2026",
    "expeditions",
    "datasets",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} antialiased`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-screen flex flex-col font-sans relative">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {/* Atmospheric continuous background snowfall all the way from top to bottom */}
        <div
          className="fixed inset-0 pointer-events-none z-20 overflow-hidden transform-gpu"
          style={{ contain: "strict" }}
          aria-hidden="true"
        >
          <SnowParticles count={25} className="absolute inset-0" />
        </div>
        <OfflineDemoBanner />
        <SmoothScrollProvider>
          <Navbar />
          <main id="main-content" className="flex-1 relative z-10" tabIndex={-1}>
            {children}
          </main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}

