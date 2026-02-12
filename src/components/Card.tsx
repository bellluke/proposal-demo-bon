import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export default function Card({
  hover = false,
  className = "",
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={`rounded-xl border border-surface-dark bg-white p-6 ${
        hover ? "transition-shadow hover:shadow-lg" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
