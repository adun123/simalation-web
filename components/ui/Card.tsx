"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLMotionProps<"div"> {
  hover?: boolean;
}

export default function Card({
  className,
  hover = true,
  children,
  ...props
}: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -4 } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        "rounded-3xl p-6 glass transition-all duration-300",
        hover && "hover:shadow-glass-lg",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
