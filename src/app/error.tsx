"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log sanitized error report server-side or to monitoring
    console.error("[Chamber Application Error]", error.message);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-md w-full bg-white border border-border-subtle rounded-lg p-8 text-center space-y-6 shadow-subtle">
        <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mx-auto text-red-700 border border-red-200">
          <AlertTriangle className="w-7 h-7" />
        </div>

        <div className="space-y-2">
          <h1 className="font-serif text-2xl font-bold text-navy">
            Service Temporarily Unavailable
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
            An unexpected error occurred while processing your request. Sensitive application diagnostics have been logged internally for technical review.
          </p>
          {error.digest && (
            <p className="font-mono text-[11px] text-text-muted">
              Reference Code: {error.digest}
            </p>
          )}
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => reset()}
            className="inline-flex items-center gap-2 px-4 py-2 bg-navy hover:bg-navy-light text-ivory text-xs font-semibold rounded transition-colors w-full sm:w-auto justify-center"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-ivory hover:bg-ivory-dark text-navy border border-border-subtle text-xs font-semibold rounded transition-colors w-full sm:w-auto justify-center"
          >
            <span>Return to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
