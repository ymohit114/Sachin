"use client";

import React from "react";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-[#F7F3EA] text-[#202936] min-h-screen flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white border border-[#E5E0D7] p-8 rounded-lg shadow-lg text-center space-y-4">
          <h1 className="font-serif text-2xl font-bold text-[#10243A]">
            Critical Application Notice
          </h1>
          <p className="text-sm text-[#596579]">
            The application encountered a critical runtime exception. Please reload or contact the chamber administrator.
          </p>
          <button
            onClick={() => reset()}
            className="px-4 py-2 bg-[#10243A] text-[#F7F3EA] text-sm font-semibold rounded hover:bg-[#183654] transition-colors"
          >
            Reload Page
          </button>
        </div>
      </body>
    </html>
  );
}
