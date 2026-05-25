"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  const isDark = (resolvedTheme ?? theme) === "dark";

  return (
    <button
      type="button"
      aria-label="Toggle dark mode"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative inline-flex items-center justify-center w-10 h-10 rounded-xl
                 bg-white/60 dark:bg-white/5 backdrop-blur border border-brand-200/60
                 dark:border-white/10 hover:shadow-glass transition-all"
    >
      {mounted && (
        <motion.div
          key={isDark ? "moon" : "sun"}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 90, opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {isDark ? (
            <Moon className="w-5 h-5 text-brand-300" />
          ) : (
            <Sun className="w-5 h-5 text-brand-600" />
          )}
        </motion.div>
      )}
    </button>
  );
}
