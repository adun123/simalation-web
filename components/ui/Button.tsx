"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm rounded-xl",
  md: "px-6 py-3 text-sm rounded-2xl",
  lg: "px-8 py-4 text-base rounded-2xl",
};

const variants: Record<Variant, string> = {
  primary:
    "text-white bg-brand-gradient shadow-glow hover:shadow-glass-lg hover:-translate-y-0.5",
  ghost:
    "text-brand-700 dark:text-brand-300 bg-white/60 dark:bg-white/5 backdrop-blur border border-brand-200/60 dark:border-white/10 hover:bg-white",
  outline:
    "text-brand-700 dark:text-brand-300 border border-brand-300 dark:border-brand-700 hover:bg-brand-50 dark:hover:bg-white/5",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-300 active:scale-95",
          sizes[size],
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
export default Button;
