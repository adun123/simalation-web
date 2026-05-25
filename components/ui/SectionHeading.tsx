"use client";

import { motion } from "framer-motion";

interface Props {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className={align === "center" ? "text-center max-w-2xl mx-auto" : ""}
    >
      {eyebrow && (
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-brand-100/70 dark:bg-white/5 text-brand-700 dark:text-brand-300 border border-brand-200/60 dark:border-white/10">
          {eyebrow}
        </span>
      )}
      <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight">
        <span className="text-gradient">{title}</span>
      </h2>
      {subtitle && (
        <p className="mt-3 text-slate-600 dark:text-slate-400 leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
