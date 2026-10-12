import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "verified" | "unverified" | "draft" | "published" | "neutral";
  size?: "sm" | "md";
  className?: string;
}

export function Badge({ children, variant = "neutral", size = "sm", className = "" }: BadgeProps) {
  const sizeStyles = {
    sm: "px-2 py-0.5 text-xs font-medium tracking-wide",
    md: "px-2.5 py-1 text-xs font-semibold tracking-wide",
  };

  const variantStyles = {
    verified: "bg-emerald-50 text-emerald-800 border border-emerald-300",
    unverified: "bg-amber-50 text-amber-800 border border-amber-300",
    draft: "bg-stone-100 text-stone-700 border border-stone-300",
    published: "bg-sky-50 text-sky-800 border border-sky-300",
    neutral: "bg-ivory text-text-secondary border border-border-subtle",
  };

  return (
    <span className={`inline-flex items-center rounded ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
}
