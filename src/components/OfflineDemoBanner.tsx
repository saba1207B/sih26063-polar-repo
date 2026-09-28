'use client';

import { useState, useEffect } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function OfflineDemoBanner() {
  const [dismissed, setDismissed] = useState(false);
  const isOffline = typeof window !== 'undefined' ? !process.env.NEXT_PUBLIC_API_BASE_URL : true;
  const isVisible = isOffline && !dismissed;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          className="fixed top-2 left-4 right-4 z-[100] max-w-5xl mx-auto rounded-2xl bg-amber-500/90 backdrop-blur-md text-white px-5 py-2.5 flex items-center justify-between shadow-xl border border-amber-400/30"
        >
          <div className="flex items-center gap-3">
            <AlertTriangle size={18} />
            <p className="text-sm font-medium">
              <strong>Offline Demo Mode:</strong> You are viewing mock data. The application is disconnected from the FastAPI backend and AI services.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setDismissed(true)}
            className="p-1.5 hover:bg-amber-600/50 rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-polar-night"
            aria-label="Dismiss banner"
          >
            <X size={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
