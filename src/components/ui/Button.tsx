import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "gold" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs tracking-wider uppercase",
    md: "px-4 py-2 text-sm tracking-wide",
    lg: "px-6 py-3 text-base tracking-wide",
  };

  const variantStyles = {
    primary: "bg-navy text-ivory hover:bg-navy-light focus:ring-navy border border-navy",
    secondary: "bg-ivory text-navy hover:bg-ivory-dark focus:ring-navy border border-border-subtle",
    gold: "bg-gold text-navy font-semibold hover:bg-gold-light focus:ring-gold border border-gold-dark",
    outline: "bg-transparent text-navy hover:bg-ivory border border-border-subtle focus:ring-navy",
    ghost: "bg-transparent text-navy hover:bg-ivory focus:ring-navy",
    danger: "bg-red-700 text-white hover:bg-red-800 focus:ring-red-600 border border-red-800",
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span>Processing...</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
}
