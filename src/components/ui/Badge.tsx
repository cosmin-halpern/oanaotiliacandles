import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "success" | "warning" | "danger" | "info";

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-cream-dark text-warm-brown border border-amber/20",
  success: "bg-sage/15 text-sage border border-sage/30",
  warning: "bg-amber/15 text-amber-dark border border-amber/30",
  danger: "bg-terracotta/15 text-terracotta border border-terracotta/30",
  info: "bg-blue-50 text-blue-700 border border-blue-200",
};

interface BadgeProps {
  variant?: BadgeVariant;
  className?: string;
  children: React.ReactNode;
}

export function Badge({ variant = "default", className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}