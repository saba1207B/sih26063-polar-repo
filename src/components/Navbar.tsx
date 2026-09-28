"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui";
import { Sparkles, Languages, Eye, Compass as PolarCompass, Menu, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const navLinks = [
  { key: "nav_explore", labelEn: "Explore", labelHi: "अन्वेषण", href: "/explore" },
  { key: "nav_expeditions", labelEn: "Expeditions", labelHi: "अभियान", href: "/expeditions" },
  { key: "nav_research", labelEn: "Research", labelHi: "अनुसंधान", href: "/research" },
  { key: "nav_datasets", labelEn: "Datasets", labelHi: "डेटासेट", href: "/datasets" },
  { key: "nav_publications", labelEn: "Publications", labelHi: "प्रकाशन", href: "/publications" },
  { key: "nav_media", labelEn: "Media", labelHi: "मीडिया", href: "/media" },
  { key: "nav_learn", labelEn: "Learn", labelHi: "शिक्षा", href: "/learn" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();
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
                {t('gov_title', 'भारत सरकार • राष्ट्रीय ध्रुवीय अनुसंधान | INDIAN POLAR SCIENCE ARCHIVE & OUTREACH')}
              </span>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              {/* Bilingual Switcher Button */}
              <button
                type="button"
                id="language-translator-toggle"
                onClick={toggleLanguage}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-sky-400/40 bg-sky-950/60 hover:bg-sky-900/80 hover:border-sky-300 text-sky-100 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 cursor-pointer shadow-xs"
                aria-label={`Switch language to ${language === "EN" ? "Hindi" : "English"}`}
                title={`Click to switch to ${language === "EN" ? "Hindi (हिन्दी)" : "English"}`}
              >
                <Languages size={13} className="text-sky-300" />
                <span className="font-bold text-xs tracking-wide">
                  {language === "EN" ? "हिन्दी" : "English"}
                </span>
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
                  {t('brand_title', 'POLAR COMMONS')}
                </span>
                <span className="text-[10px] font-mono tracking-widest text-[#0891B2] uppercase -mt-0.5 font-semibold">
                  {t('brand_subtitle', "India's Polar Science Gateway")}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav aria-label="Main Navigation" className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(link.href + "/"));
                const label = language === "HI" ? link.labelHi : link.labelEn;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "relative px-3.5 py-2 text-xs font-semibold tracking-wider uppercase transition-all duration-200 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0891B2] min-h-[40px] flex items-center",
                      isActive
                        ? "text-[#0891B2] bg-teal-50/80 font-bold"
                        : "text-[#1E3E47] hover:text-[#0891B2] hover:bg-slate-50"
                    )}
                  >
                    {label}
                  </Link>
                );
              })}
            </nav>

            {/* Action Button: AI Research Assistant */}
            <div className="hidden lg:flex items-center gap-3">
              <Link href="/assistant">
                <Button
                  variant="primary"
                  size="sm"
                  className="gap-2 shadow-sm font-semibold tracking-wider text-xs px-4 min-h-[40px] bg-[#0C5A66] hover:bg-[#0891B2] border-[#073842]"
                >
                  <Sparkles size={14} className="text-sky-200 animate-pulse" />
                  {t('nav_assistant', 'Ask Assistant')}
                </Button>
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center text-[#0B1E36] hover:text-[#0284C7] transition-colors rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0284C7]"
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation-overlay"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Accessible Mobile Menu Modal */}
      <div
        id="mobile-navigation-overlay"
        aria-hidden={!mobileOpen}
        className={cn(
          "fixed inset-0 z-40 lg:hidden transition-all duration-300",
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        <div
          className="absolute inset-0 bg-[#0B1E36]/40 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={cn(
            "absolute top-24 left-4 right-4 bg-white border border-[#0284C7]/20 rounded-3xl p-6 shadow-2xl transition-all duration-300 flex flex-col gap-4 max-h-[80vh] overflow-y-auto",
            mobileOpen
              ? "translate-y-0 scale-100 opacity-100"
              : "-translate-y-4 scale-95 opacity-0"
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
              const label = language === "HI" ? link.labelHi : link.labelEn;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "text-sm font-semibold tracking-wider uppercase px-4 py-3 min-h-[44px] flex items-center rounded-xl transition-colors",
                    isActive
                      ? "text-[#0284C7] bg-[#F0F9FF] font-bold"
                      : "text-slate-700 hover:bg-slate-50 hover:text-[#0284C7]"
                  )}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
            <Link href="/assistant" onClick={() => setMobileOpen(false)}>
              <Button variant="primary" size="md" className="w-full gap-2 text-xs min-h-[44px]">
                <Sparkles size={16} /> {t('nav_assistant', 'Ask Research Assistant')}
              </Button>
            </Link>
            <div className="flex items-center justify-between text-xs text-slate-700 font-mono px-2 pt-2 bg-slate-50 rounded-xl p-2">
              <span className="font-semibold">LANGUAGE / भाषा:</span>
              <button
                type="button"
                onClick={toggleLanguage}
                className="text-[#0284C7] font-bold hover:underline flex items-center gap-1.5"
              >
                <Languages size={14} />
                {language === "EN" ? "SWITCH TO हिन्दी" : "SWITCH TO ENGLISH"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
