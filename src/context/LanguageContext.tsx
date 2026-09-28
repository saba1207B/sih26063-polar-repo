'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'EN' | 'HI';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string, defaultText?: string) => string;
}

const translations: Record<string, { EN: string; HI: string }> = {
  // Top Strip & Brand
  gov_title: {
    EN: 'भारत सरकार • राष्ट्रीय ध्रुवीय अनुसंधान | INDIAN POLAR SCIENCE ARCHIVE & OUTREACH',
    HI: 'भारत सरकार • राष्ट्रीय ध्रुवीय अनुसंधान संस्थान | ध्रुवीय एवं महासागर अनुसंधान',
  },
  brand_title: {
    EN: 'POLAR COMMONS',
    HI: 'ध्रुवीय ज्ञान केंद्र',
  },
  brand_subtitle: {
    EN: "India's Polar Science Gateway",
    HI: 'भारत का ध्रुवीय विज्ञान प्रवेश द्वार',
  },

  // Navigation Links
  nav_explore: {
    EN: 'Explore',
    HI: 'अन्वेषण',
  },
  nav_expeditions: {
    EN: 'Expeditions',
    HI: 'वैज्ञानिक अभियान',
  },
  nav_research: {
    EN: 'Research',
    HI: 'अनुसंधान',
  },
  nav_datasets: {
    EN: 'Datasets',
    HI: 'डेटासेट',
  },
  nav_publications: {
    EN: 'Publications',
    HI: 'शोध प्रकाशन',
  },
  nav_media: {
    EN: 'Media',
    HI: 'मीडिया व दृश्य',
  },
  nav_learn: {
    EN: 'Learn',
    HI: 'शिक्षा व ज्ञान',
  },
  nav_assistant: {
    EN: 'Ask Assistant',
    HI: 'अनुसंधान सहायक (AI)',
  },

  // Hero Section
  hero_badge: {
    EN: 'INDIAN POLAR & OCEAN RESEARCH',
    HI: 'भारतीय ध्रुवीय एवं महासागर अनुसंधान',
  },
  hero_tagline: {
    EN: 'EXPEDITIONS • RESEARCH • DATA',
    HI: 'अभियान • अनुसंधान • खुला डेटा',
  },
  hero_subtag: {
    EN: 'COASTAL TO POLE',
    HI: 'तटीय से ध्रुवीय क्षेत्र तक',
  },
  hero_title_1: {
    EN: 'EXPLORE THE',
    HI: 'ध्रुवीय सीमाओं का',
  },
  hero_title_2: {
    EN: 'POLAR FRONTIER',
    HI: 'गहन अन्वेषण',
  },
  hero_desc: {
    EN: "Discover India's scientific expeditions, oceanographic datasets, ice core palaeoclimate records, and peer-reviewed literature unified through one modern digital science gateway.",
    HI: 'भारत के ऐतिहासिक ध्रुवीय वैज्ञानिक अभियानों, महासागरीय डेटासेटों, हिम कोर जलवायु अभिलेखों और सहकर्मी-समीक्षित शोध पत्रों का अन्वेषण एक आधुनिक डिजिटल विज्ञान मंच पर करें।',
  },
  hero_cta_explore: {
    EN: 'EXPLORE POLAR SCIENCE →',
    HI: 'ध्रुवीय विज्ञान खोजें →',
  },
  hero_cta_assistant: {
    EN: 'ASK AI ASSISTANT',
    HI: 'एआई सहायक से पूछें',
  },
  hero_cta_expeditions: {
    EN: 'View 42 Expeditions →',
    HI: '42 वैज्ञानिक अभियान देखें →',
  },

  // Expeditions Section
  expeditions_meta: {
    EN: '// NATIONAL ARCHIVE & RECORD OF MISSIONS',
    HI: '// राष्ट्रीय अभिलेखागार एवं मिशन रिकॉर्ड',
  },
  expeditions_heading: {
    EN: 'SCIENTIFIC EXPEDITIONS',
    HI: 'प्रमुख ध्रुवीय अभियान',
  },
  expeditions_desc: {
    EN: "Over four decades of continuous Indian presence in Antarctica, the Arctic, and the Southern Ocean. Explore verified operational logs, leadership, and multi-disciplinary breakthroughs.",
    HI: 'अंटार्कटिका, आर्कटिक और दक्षिणी महासागर में भारत की चार दशकों से अधिक की निरंतर वैज्ञानिक उपस्थिति। सत्यापित संचालन लॉग और अनुसंधानों का अन्वेषण करें।',
  },

  // Interactive Pillars / Features
  pillar_1_title: {
    EN: 'Antarctic Expeditions',
    HI: 'अंटार्कटिक अभियान',
  },
  pillar_1_desc: {
    EN: 'Scientific operations at Maitri, Bharati, and Dakshin Gangotri tracking polar climate.',
    HI: 'मैत्री, भारती और दक्षिण गंगोत्री स्टेशनों पर ध्रुवीय जलवायु का अध्ययन करने वाले वैज्ञानिक अभियान।',
  },
  pillar_2_title: {
    EN: 'Arctic & Svalbard',
    HI: 'आर्कटिक एवं स्वालबार्ड',
  },
  pillar_2_desc: {
    EN: 'Himadri Research Station long-term atmospheric and glacial monitoring at Ny-Ålesund.',
    HI: 'हिमाद्री अनुसंधान स्टेशन पर दीर्घकालिक वायुमंडलीय एवं हिमनद निगरानी।',
  },
  pillar_3_title: {
    EN: 'Open Data Repositories',
    HI: 'खुले डेटा भंडार',
  },
  pillar_3_desc: {
    EN: 'FAIR-compliant open access polar datasets from NPDC, PANGAEA, and NCPOR archives.',
    HI: 'एनपीडीसी, पेंजिया और एनसीपीओआर से फेयर-अनुपालक खुले वैज्ञानिक डेटासेट।',
  },

  // Footer & Common
  footer_text: {
    EN: 'Polar Commons. Built for Smart India Hackathon 2026. Inspired by the National Centre for Polar and Ocean Research (NCPOR) ecosystem.',
    HI: 'ध्रुवीय ज्ञान केंद्र (Polar Commons)। स्मार्ट इंडिया हैकथॉन 2026 के लिए निर्मित। राष्ट्रीय ध्रुवीय एवं महासागर अनुसंधान केंद्र (NCPOR) से प्रेरित।',
  },
  loading: {
    EN: 'LOADING SCIENTIFIC RECORD...',
    HI: 'वैज्ञानिक रिकॉर्ड लोड हो रहा है...',
  },
  not_found: {
    EN: 'RECORD NOT FOUND',
    HI: 'रिकॉर्ड नहीं मिला',
  },
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'EN',
  setLanguage: () => {},
  toggleLanguage: () => {},
  t: (key: string, defaultText?: string) => defaultText || key,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('EN');

  // Load persisted language from localStorage on client mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('polar_language') as Language;
      if (saved === 'EN' || saved === 'HI') {
        setLanguageState(saved);
      }
    } catch {
      // LocalStorage access might be restricted in some sandboxes
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('polar_language', lang);
    } catch {}
  };

  const toggleLanguage = () => {
    const next = language === 'EN' ? 'HI' : 'EN';
    setLanguage(next);
  };

  const t = (key: string, defaultText?: string): string => {
    const item = translations[key];
    if (item && item[language]) {
      return item[language];
    }
    return defaultText || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  return context;
}
