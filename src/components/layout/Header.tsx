import React from "react";
import Link from "next/link";
import { MobileNav } from "@/components/layout/MobileNav";

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-navy border-b border-border-dark text-ivory">
      {/* Top micro bar with compliance note */}
      <div className="border-b border-navy-light/60 bg-navy-900 py-1.5 px-4 sm:px-6 lg:px-8 text-center text-[11px] text-text-muted tracking-wide">
        Factual information platform under Bar Council of India standards | Non-advertising legal resource
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Identity */}
          <Link href="/" className="group flex flex-col focus:outline-none focus:ring-2 focus:ring-gold rounded p-1">
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-wide text-ivory group-hover:text-gold transition-colors">
              VIPIN KHATANA
            </span>
            <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-gold font-medium">
              Advocate &bull; Distt Court Gurugram &amp; Sub-Divisional Court Sohna
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-3" aria-label="Main Navigation">
            <Link
              href="/"
              className="px-3 py-2 text-sm font-medium text-ivory/90 hover:text-gold hover:bg-navy-light/40 rounded transition-colors"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="px-3 py-2 text-sm font-medium text-ivory/90 hover:text-gold hover:bg-navy-light/40 rounded transition-colors"
            >
              Advocate Profile
            </Link>
            <Link
              href="/practice-areas"
              className="px-3 py-2 text-sm font-medium text-ivory/90 hover:text-gold hover:bg-navy-light/40 rounded transition-colors"
            >
              Practice Areas
            </Link>
            <Link
              href="/legal-articles"
              className="px-3 py-2 text-sm font-medium text-ivory/90 hover:text-gold hover:bg-navy-light/40 rounded transition-colors"
            >
              Legal Articles
            </Link>
            <Link
              href="/contact"
              className="ml-2 px-4 py-2 text-sm font-medium text-navy bg-gold hover:bg-gold-light rounded transition-colors shadow-sm"
            >
              Office &amp; Contact
            </Link>
          </nav>

          {/* Mobile menu trigger */}
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
