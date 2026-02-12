import { HTMLAttributes } from "react";

type BadgeVariant = "primary" | "secondary" | "accent" | "success" | "warning" | "error";

const variantStyles: Record<BadgeVariant, string> = {
  primary: "bg-primary/10 text-primary",
  secondary: "bg-secondary-light text-secondary",
  accent: "bg-accent-light text-secondary",
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning",
  error: "bg-error/10 text-error",
};

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export default function Badge({
  variant = "primary",
  className = "",
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
