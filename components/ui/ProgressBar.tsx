"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number; // 0..100
  label?: string;
  className?: string;
}

export default function ProgressBar({ value, label, className }: ProgressBarProps) {
  const v = Math.max(0, Math.min(100, value));
  return (
    <div className={cn("w-full", className)}>
      {label && (
        <div className="flex justify-between text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">
          <span>{label}</span>
          <span>{v}%</span>
        </div>
      )}
      <div className="h-2.5 w-full rounded-full bg-brand-100/80 dark:bg-white/5 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${v}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-full rounded-full bg-brand-gradient shadow-glow"
        />
      </div>
    </div>
  );
}
