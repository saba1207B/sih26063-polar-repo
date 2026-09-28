import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui";
import { Compass, ShieldCheck, ExternalLink, Globe } from "lucide-react";

const footerLinks = {
  "Scientific Archive": [
    { label: "Expeditions", href: "/expeditions" },
    { label: "Research Activities", href: "/research" },
    { label: "Open Datasets", href: "/datasets" },
    { label: "Publications", href: "/publications" },
    { label: "Explore Archive", href: "/explore" },
  ],
  "Outreach & Education": [
    { label: "Learning Modules", href: "/learn" },
    { label: "Media Gallery", href: "/media" },
    { label: "Stations Map", href: "/expeditions" },
    { label: "Knowledge Graph", href: "/knowledge" },
    { label: "Bilingual Content (हिन्दी)", href: "/learn" },
  ],
  "System & Trust": [
    { label: "About Platform", href: "/about" },
    { label: "Impact Analytics", href: "/analytics" },
    { label: "Link Health Monitor", href: "/link-health" },
    { label: "Research Assistant (AI)", href: "/assistant" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-[#0B1E36] text-white border-t border-sky-900/50 relative z-20">
      <Container className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand & Institutional Context */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 group rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0284C7]"
              aria-label="Polar Commons Home"
            >
              <div className="w-8 h-8 rounded-lg bg-[#0284C7] flex items-center justify-center text-white">
                <Compass size={18} />
              </div>
              <span className="text-base font-extrabold tracking-wider uppercase text-white">
                POLAR COMMONS
              </span>
            </Link>
            <p className="mt-4 text-xs sm:text-sm text-slate-300 leading-relaxed max-w-sm">
              India&apos;s digital gateway to polar science — connecting decades of Antarctic and Arctic expeditions, open-access physical datasets, peer-reviewed monographs, and bilingual educational outreach.
            </p>
            <div className="mt-4 p-3 bg-white/5 border border-white/10 rounded-xl text-[11px] font-mono text-slate-300 leading-normal max-w-sm">
              <span className="text-sky-300 font-bold block mb-1">SIH 2026 • PROBLEM ID SIH26063</span>
              Inspiring scientific literacy through verifiable repository provenance (NCPOR, NPDC, PANGAEA, AADC).
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-xs font-bold tracking-[0.15em] uppercase text-sky-200 mb-4 font-mono">
                {heading}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-xs sm:text-sm text-slate-300 hover:text-sky-200 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0284C7] rounded py-0.5 inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar: Institutional disclaimer, Provenance, Copyright */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs text-slate-400">
          <p className="text-[11px] text-center md:text-left">
            &copy; {new Date().getFullYear()} Polar Commons. Built for Smart India Hackathon 2026. Inspired by the National Centre for Polar and Ocean Research (NCPOR) ecosystem.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 text-[10px] tracking-wider uppercase text-slate-300">
            <span className="text-sky-300 font-bold">REPOSITORIES:</span>
            <span>NPDC</span> • <span>NCPOR</span> • <span>PANGAEA</span> • <span>AADC</span> • <span>DATACITE</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
