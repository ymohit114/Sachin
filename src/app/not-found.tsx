import React from "react";
import Link from "next/link";
import { Scale, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-md w-full bg-white border border-border-subtle rounded-lg p-8 text-center space-y-6 shadow-subtle">
        <div className="w-14 h-14 bg-ivory rounded-full flex items-center justify-center mx-auto text-navy border border-border-subtle">
          <Scale className="w-7 h-7 text-gold-dark" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono font-semibold text-text-muted uppercase tracking-widest">
            Error 404
          </span>
          <h1 className="font-serif text-2xl font-bold text-navy">
            Page or Record Not Found
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
            The requested legal resource, article, or practice area page does not exist or may have been unindexed in accordance with editorial review.
          </p>
        </div>

        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-navy hover:bg-navy-light text-ivory text-xs font-semibold rounded transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Chamber Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
