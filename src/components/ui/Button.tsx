import { cn } from "@/lib/utils";
import { type ButtonHTMLAttributes, forwardRef } from "react";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}

export const buttonVariants = (
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  className?: string
) =>
  cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 cursor-pointer",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    {
      primary: "bg-amber text-white hover:bg-amber-dark shadow-sm",
      secondary: "bg-cream-dark text-warm-brown hover:bg-amber/10 border border-amber/20",
      outline: "border border-amber text-amber hover:bg-amber hover:text-white",
      ghost: "text-warm-brown hover:bg-amber/10",
      danger: "bg-terracotta text-white hover:bg-terracotta-light",
    }[variant],
    {
      sm: "px-3 py-1.5 text-sm",
      md: "px-5 py-2.5 text-sm",
      lg: "px-7 py-3.5 text-base",
    }[size],
    className
  );

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", loading = false, disabled, className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={buttonVariants(variant, size, className)}
        {...props}
      >
        {loading && (
          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";