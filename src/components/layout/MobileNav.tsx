"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

interface NavLink {
  href: string;
  label: string;
}

const navLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "Advocate Profile" },
  { href: "/practice-areas", label: "Practice Areas" },
  { href: "/legal-articles", label: "Legal Articles" },
  { href: "/contact", label: "Office & Contact" },
];

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Close mobile drawer on route change
    setIsOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-ivory hover:text-gold focus:outline-none focus:ring-2 focus:ring-gold rounded"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-navy/95 backdrop-blur-sm flex flex-col pt-20 px-6 animate-fadeIn"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex justify-between items-center mb-8 border-b border-navy-light pb-4">
            <span className="font-serif text-lg tracking-wider text-ivory font-semibold">
              CHAMBER NAVIGATION
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-ivory hover:text-gold focus:outline-none focus:ring-2 focus:ring-gold rounded"
              aria-label="Close navigation menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-lg font-medium py-2 px-3 rounded transition-colors ${
                    isActive
                      ? "text-gold bg-navy-light/60 font-semibold border-l-2 border-gold pl-3"
                      : "text-ivory hover:text-gold hover:bg-navy-light/30"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto mb-10 pt-6 border-t border-navy-light text-xs text-text-muted space-y-2">
            <p className="font-medium text-ivory/80">Gurugram & Delhi NCR Practice</p>
            <p>Informational legal platform conforming to Bar Council of India standards.</p>
          </div>
        </div>
      )}
    </div>
  );
}
