"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui";
import { Menu, X, Compass, Sparkles, Languages, Eye, Compass as PolarCompass } from "lucide-react";

const navLinks = [
  { label: "Explore", href: "/explore" },
  { label: "Expeditions", href: "/expeditions" },
  { label: "Research", href: "/research" },
  { label: "Datasets", href: "/datasets" },
  { label: "Publications", href: "/publications" },
  { label: "Media", href: "/media" },
  { label: "Learn", href: "/learn" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [language, setLanguage] = useState<"EN" | "HI">("EN");
  const [highContrast, setHighContrast] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open & handle Escape key
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileOpen) {
        setMobileOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        {/* Top Utility Strip — Institutional Indian Polar Research Context */}
        <div className="bg-[#0B1E36] text-white border-b border-white/10 text-[11px] font-mono py-1.5 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 truncate">
              <span className="inline-block w-2 h-2 rounded-full bg-[#0284C7] shrink-0 animate-pulse" />
              <span className="font-semibold tracking-wider text-sky-100 truncate">
                भारत सरकार • राष्ट्रीय ध्रुवीय अनुसंधान | INDIAN POLAR SCIENCE ARCHIVE & OUTREACH
              </span>
            </div>

            <div className="flex items-center gap-4 shrink-0">
              {/* Bilingual Switcher */}
              <button
                type="button"
                onClick={() => setLanguage(language === "EN" ? "HI" : "EN")}
                className="flex items-center gap-1.5 px-2 py-0.5 rounded border border-white/20 hover:border-sky-300 hover:text-sky-200 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-sky-400"
                aria-label={`Switch language to ${language === "EN" ? "Hindi" : "English"}`}
              >
                <Languages size={12} className="text-sky-300" />
                <span className="font-bold">{language === "EN" ? "हिन्दी" : "EN"}</span>
              </button>

              {/* Accessibility Quick Toggle */}
              <button
                type="button"
                onClick={() => setHighContrast(!highContrast)}
                className={cn(
                  "hidden sm:flex items-center gap-1 px-2 py-0.5 rounded border transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-sky-400",
                  highContrast
                    ? "bg-[#0284C7] text-white border-[#0284C7]"
                    : "border-white/20 text-white/80 hover:text-white hover:border-white/40"
                )}
                title="Toggle Contrast"
                aria-label="Toggle High Contrast Mode"
              >
                <Eye size={12} />
                <span className="text-[10px]">A11Y</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Navigation Header */}
        <div
          className={cn(
            "transition-all duration-300 relative",
            scrolled
              ? "bg-white/95 backdrop-blur-xl shadow-md py-2.5 border-b border-[#0891B2]/20"
              : "bg-white/90 backdrop-blur-md py-3.5 border-b border-teal-900/10"
          )}
        >
          {/* Oceanic Turquoise to Coastal Gold Accent Line */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#0891B2] via-[#E5983A] to-transparent opacity-85" />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            {/* Polar Commons Institutional Branding */}
            <Link
              href="/"
              className="flex items-center gap-3 group rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0891B2]"
              aria-label="Polar Commons Home"
            >
              <div className="relative w-9 h-9 flex items-center justify-center bg-gradient-to-br from-[#092B34] to-[#0C5A66] rounded-xl shadow-sm border border-[#0891B2]/30 text-white">
                <PolarCompass size={20} className="text-teal-300 group-hover:rotate-45 transition-transform duration-500" />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-extrabold tracking-wider uppercase text-[#0A2B33]">
                  POLAR COMMONS
                </span>
                <span className="text-[10px] font-mono tracking-widest text-[#0891B2] uppercase -mt-0.5 font-semibold">
                  India's Polar Science Gateway
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav aria-label="Main Navigation" className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(link.href + "/"));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "relative px-3.5 py-2 text-xs font-semibold tracking-wider uppercase transition-all duration-200 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0891B2] min-h-[40px] flex items-center",
                      isActive
                        ? "text-[#0C5A66] bg-teal-50 font-bold shadow-xs"
                        : "text-[#1E3E47] hover:text-[#0891B2] hover:bg-slate-50"
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-gradient-to-r from-[#0891B2] to-[#E5983A]" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Assistant CTA Action */}
            <div className="hidden lg:flex items-center gap-3">
              <Link href="/assistant">
                <Button
                  variant="primary"
                  size="sm"
                  className="gap-2 shadow-sm font-semibold tracking-wider text-xs px-4 min-h-[40px]"
                >
                  <Sparkles size={14} className="text-sky-200 animate-pulse" />
                  Ask Assistant
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              className="lg:hidden p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center text-[#0B1E36] hover:text-[#0284C7] transition-colors rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0284C7]"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation-overlay"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Accessible Drawer */}
      <div
        id="mobile-navigation-overlay"
        aria-hidden={!mobileOpen}
        className={cn(
          "fixed inset-0 z-40 lg:hidden transition-all duration-300",
          mobileOpen
            ? "opacity-100 pointer-events-auto bg-[#0B1E36]/70 backdrop-blur-xl"
            : "opacity-0 pointer-events-none"
        )}
      >
        <div
          className="absolute inset-0"
          onClick={() => setMobileOpen(false)}
        />

        <div
          className={cn(
            "absolute top-24 left-4 right-4 bg-white border border-[#0284C7]/20 rounded-3xl p-6 shadow-2xl transition-all duration-300 flex flex-col gap-4 max-h-[80vh] overflow-y-auto",
            mobileOpen ? "translate-y-0 scale-100" : "-translate-y-4 scale-95"
          )}
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="text-xs font-mono uppercase font-bold text-[#0284C7]">
              // POLAR COMMONS NAVIGATION
            </span>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="p-1 rounded-lg text-slate-500 hover:text-slate-800"
              aria-label="Close navigation"
            >
              <X size={18} />
            </button>
          </div>

          <nav aria-label="Mobile Navigation Links" className="flex flex-col gap-1.5">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href + "/"));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "text-sm font-semibold tracking-wider uppercase px-4 py-3 min-h-[44px] flex items-center rounded-xl transition-colors",
                    isActive
                      ? "bg-sky-50 text-[#0284C7] font-bold border border-sky-200"
                      : "text-slate-700 hover:bg-slate-50 hover:text-[#0284C7]"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
            <Link href="/assistant" onClick={() => setMobileOpen(false)}>
              <Button variant="primary" size="md" className="w-full gap-2 text-xs min-h-[44px]">
                <Sparkles size={16} /> Ask Research Assistant
              </Button>
            </Link>
            <div className="flex items-center justify-between text-xs text-slate-500 font-mono px-2 pt-1">
              <span>LANGUAGE:</span>
              <button
                type="button"
                onClick={() => setLanguage(language === "EN" ? "HI" : "EN")}
                className="text-[#0284C7] font-bold hover:underline"
              >
                {language === "EN" ? "SWITCH TO हिन्दी" : "SWITCH TO ENGLISH"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
