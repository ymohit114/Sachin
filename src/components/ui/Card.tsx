import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "default" | "ivory" | "navy" | "bordered";
  className?: string;
}

export function Card({ children, variant = "default", className = "", ...props }: CardProps) {
  const variantStyles = {
    default: "bg-white text-text-primary border border-border-subtle shadow-subtle",
    ivory: "bg-ivory text-text-primary border border-border-subtle",
    navy: "bg-navy text-ivory border border-navy-light shadow-card",
    bordered: "bg-transparent text-text-primary border border-border-subtle",
  };

  return (
    <div className={`rounded-md p-6 ${variantStyles[variant]} ${className}`} {...props}>
      {children}
    </div>
  );
}
