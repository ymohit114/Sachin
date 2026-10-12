import React from "react";
import Link from "next/link";
import { BCI_DISCLAIMER_TEXT } from "@/lib/constants/site-defaults";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-900 border-t border-navy-light text-ivory/80 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12 pb-10 border-b border-navy-light/60">
          {/* Identity & Practice Jurisdiction */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex flex-col">
              <span className="font-serif text-xl font-bold tracking-wide text-ivory">
                CHAMBER OF ADVOCATE SACHIN
              </span>
              <span className="text-xs uppercase tracking-widest text-gold font-medium mt-1">
                Gurugram, Haryana &bull; Delhi NCR
              </span>
            </div>
            <p className="text-xs leading-relaxed text-text-muted max-w-md">
              Independent advocate handling civil disputes, commercial litigation, Haryana RERA proceedings,
              and criminal defense across Gurugram District Courts, Punjab &amp; Haryana High Court, and Delhi NCR tribunals.
            </p>
            <div className="text-[11px] text-text-muted/80">
              <span>Jurisdiction: District &amp; Sessions Court Gurugram | High Court of Punjab &amp; Haryana</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="font-serif text-xs font-semibold uppercase tracking-wider text-gold">
              Navigation
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-gold transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-gold transition-colors">
                  Advocate Profile
                </Link>
              </li>
              <li>
                <Link href="/practice-areas" className="hover:text-gold transition-colors">
                  Areas of Practice
                </Link>
              </li>
              <li>
                <Link href="/legal-articles" className="hover:text-gold transition-colors">
                  Legal Articles &amp; Insights
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gold transition-colors">
                  Office &amp; Contact Details
                </Link>
              </li>
            </ul>
          </div>

          {/* Regulatory & Administrative */}
          <div className="space-y-3">
            <h3 className="font-serif text-xs font-semibold uppercase tracking-wider text-gold">
              Legal &amp; Compliance
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/disclaimer" className="hover:text-gold transition-colors">
                  Professional Disclaimer (BCI Rule 36)
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-gold transition-colors">
                  Privacy Policy &amp; Data Handling
                </Link>
              </li>
              <li className="pt-2 border-t border-navy-light/40">
                <Link href="/admin/login" className="text-text-muted hover:text-gold transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold/60 inline-block"></span>
                  Administrator Portal
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Regulatory Disclaimer Text */}
        <div className="py-6 border-b border-navy-light/40 space-y-2 text-[11px] text-text-muted leading-relaxed">
          <p className="font-semibold text-ivory/70 uppercase tracking-wider">
            Mandatory Bar Council of India Notice:
          </p>
          <p>{BCI_DISCLAIMER_TEXT.short}</p>
        </div>

        {/* Copyright & Technical attribution */}
        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-text-muted gap-4">
          <p>&copy; {currentYear} Advocate Sachin. All rights reserved. For informational purposes only.</p>
          <p className="text-[11px]">Strict compliance with Advocates Act, 1961.</p>
        </div>
      </div>
    </footer>
  );
}
