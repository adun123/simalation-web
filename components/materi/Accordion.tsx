"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import * as Icons from "lucide-react";
import type { MateriItem } from "@/types";
import { cn } from "@/lib/utils";

interface Props {
  items: MateriItem[];
}

export default function Accordion({ items }: Props) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div className="space-y-4">
      {items.map((item, idx) => {
        const Icon = (Icons[item.icon as keyof typeof Icons] ??
          Icons.BookOpen) as React.ComponentType<{ className?: string }>;
        const isOpen = openId === item.id;
        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            className="rounded-3xl glass overflow-hidden"
          >
            <button
              onClick={() => setOpenId(isOpen ? null : item.id)}
              className="w-full flex items-center gap-4 p-5 sm:p-6 text-left"
              aria-expanded={isOpen}
            >
              <div className="w-12 h-12 rounded-2xl bg-brand-gradient grid place-items-center text-white shadow-glow shrink-0">
                <Icon className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 truncate sm:whitespace-normal">
                  {item.summary}
                </p>
              </div>
              <ChevronDown
                className={cn(
                  "w-5 h-5 text-brand-600 dark:text-brand-300 transition-transform duration-300 shrink-0",
                  isOpen && "rotate-180"
                )}
              />
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 sm:px-6 pb-6 -mt-1 space-y-3 text-sm sm:text-[0.95rem] text-slate-700 dark:text-slate-300">
                    {item.body.map((p, i) => (
                      <p key={i} className="leading-relaxed pl-16">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand-500 mr-2 align-middle" />
                        {p}
                      </p>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
