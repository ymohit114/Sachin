"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Scale } from "lucide-react";
import { BCI_DISCLAIMER_TEXT } from "@/lib/constants/site-defaults";

const STORAGE_KEY = "bci_disclaimer_accepted_2026_v1";

export function DisclaimerModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const hasAccepted = localStorage.getItem(STORAGE_KEY);
      if (!hasAccepted) {
        setIsOpen(true);
      }
    } catch {
      // If localStorage is unavailable, do not block view
      setIsOpen(false);
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // Ignore storage errors
    }
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/80 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="disclaimer-title"
    >
      <div className="bg-white border border-border-subtle max-w-2xl w-full rounded-lg shadow-2xl p-6 sm:p-8 space-y-5 text-text-primary">
        <div className="flex items-center gap-3 border-b border-border-subtle pb-4">
          <div className="p-2.5 bg-ivory text-navy rounded border border-border-subtle">
            <Scale className="w-6 h-6 text-navy" aria-hidden="true" />
          </div>
          <div>
            <h2 id="disclaimer-title" className="font-serif text-xl sm:text-2xl font-bold text-navy">
              Bar Council of India Disclaimer
            </h2>
            <p className="text-xs text-text-secondary tracking-wide uppercase">
              Compliance with Rule 36, Bar Council of India Rules
            </p>
          </div>
        </div>

        <div className="text-xs sm:text-sm text-text-secondary space-y-3 leading-relaxed max-h-60 overflow-y-auto pr-2">
          {BCI_DISCLAIMER_TEXT.full.map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </div>

        <div className="border-t border-border-subtle pt-4 flex flex-col sm:flex-row justify-between items-center gap-3">
          <span className="text-[11px] text-text-muted text-center sm:text-left">
            By clicking &quot;I Acknowledge &amp; Proceed&quot;, you confirm your voluntary visit.
          </span>
          <Button onClick={handleAccept} variant="gold" size="md" className="w-full sm:w-auto">
            I Acknowledge &amp; Proceed
          </Button>
        </div>
      </div>
    </div>
  );
}
