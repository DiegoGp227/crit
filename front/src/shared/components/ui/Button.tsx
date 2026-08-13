import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/src/shared/utils/cn";

type Variant = "primary" | "ghost" | "surface";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-cta text-cta-ink hover:opacity-90",
  ghost: "bg-transparent text-text-muted hover:bg-surface hover:text-text-primary",
  surface: "bg-surface-raised text-text-primary",
};

const sizes: Record<Size, string> = {
  sm: "px-5 py-2",
  md: "px-6 py-3",
  lg: "px-10 py-3",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export default function Button({
  className,
  variant = "primary",
  size = "md",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex cursor-pointer select-none items-center justify-center rounded-2xl text-sm font-semibold transition-all duration-500 disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
}
