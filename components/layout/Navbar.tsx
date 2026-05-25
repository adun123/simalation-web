"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import ThemeToggle from "@/components/ui/ThemeToggle";

const links = [
  { href: "/", label: "Beranda" },
  { href: "/materi", label: "Materi" },
  { href: "/simulasi", label: "Simulasi" },
  { href: "/drag-drop", label: "Drag & Drop" },
  { href: "/quiz", label: "Quiz" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="absolute inset-0 bg-white/70 dark:bg-ink-900/70 backdrop-blur-xl border-b border-white/40 dark:border-white/5" />
      <nav className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative w-9 h-9 rounded-xl bg-brand-gradient grid place-items-center shadow-glow">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <div className="hidden sm:block leading-tight">
            <p className="text-sm font-bold text-gradient">TataLetak.id</p>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 -mt-0.5">
              Interactive Office Learning
            </p>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={cn("nav-link", active && "nav-link-active")}
              >
                {l.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl
                       bg-white/60 dark:bg-white/5 backdrop-blur border border-brand-200/60
                       dark:border-white/10"
            onClick={() => setOpen((s) => !s)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="md:hidden relative bg-white/90 dark:bg-ink-900/90 backdrop-blur-xl border-b border-white/40 dark:border-white/5"
          >
            <div className="px-4 py-3 space-y-1">
              {links.map((l) => {
                const active = pathname === l.href;
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block px-4 py-2 rounded-xl text-sm font-medium",
                      active
                        ? "bg-brand-50 dark:bg-white/5 text-brand-700 dark:text-brand-300"
                        : "text-slate-700 dark:text-slate-300 hover:bg-brand-50/60 dark:hover:bg-white/5"
                    )}
                  >
                    {l.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
