import React from "react";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  helperText?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, id, className = "", required, rows = 4, ...props }, ref) => {
    const textareaId = id || `textarea-${label.toLowerCase().replace(/\s+/g, "-")}`;
    const errorId = `${textareaId}-error`;
    const helperId = `${textareaId}-helper`;

    return (
      <div className="w-full">
        <label htmlFor={textareaId} className="block text-sm font-medium text-navy mb-1.5">
          {label} {required && <span className="text-red-700">*</span>}
        </label>
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? errorId : helperText ? helperId : undefined}
          required={required}
          className={`w-full px-3.5 py-2.5 bg-white border rounded text-text-primary placeholder:text-text-muted text-sm focus:outline-none focus:ring-2 focus:ring-navy focus:border-navy transition-colors ${
            error ? "border-red-600 focus:ring-red-600" : "border-border-subtle"
          } ${className}`}
          {...props}
        />
        {helperText && !error && (
          <p id={helperId} className="mt-1 text-xs text-text-secondary">
            {helperText}
          </p>
        )}
        {error && (
          <p id={errorId} className="mt-1 text-xs text-red-700 font-medium" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
