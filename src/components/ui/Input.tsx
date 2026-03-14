import { cn } from "@/lib/utils";
import { type InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, className, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-warm-brown"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-warm-brown",
            "placeholder:text-warm-gray/60 transition-colors duration-200",
            "focus:outline-none focus:ring-2 focus:ring-amber focus:border-transparent",
            error
              ? "border-terracotta focus:ring-terracotta"
              : "border-amber/20 hover:border-amber/40",
            className
          )}
          {...props}
        />
        {hint && !error && (
          <p className="text-xs text-warm-gray">{hint}</p>
        )}
        {error && (
          <p className="text-xs text-terracotta">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";