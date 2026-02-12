import { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost" | "accent";

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-primary text-white hover:bg-primary-dark active:bg-primary-dark",
  secondary:
    "bg-secondary-light text-secondary hover:bg-secondary-light/80 border border-secondary/20",
  ghost:
    "bg-transparent text-text-secondary hover:bg-surface hover:text-text",
  accent:
    "bg-accent text-white hover:bg-accent/90",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: "sm" | "md" | "lg";
}

export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-sm",
    lg: "px-7 py-3 text-base",
  };

  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:opacity-50 disabled:cursor-not-allowed ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
