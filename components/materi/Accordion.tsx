"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, CheckCircle2, XCircle } from "lucide-react";
import type { MateriItem } from "@/types";
import { cn } from "@/lib/utils";
import { getIcon } from "@/lib/icons";
import LayoutDiagram from "./LayoutDiagram";

interface Props {
  items: MateriItem[];
}

export default function Accordion({ items }: Props) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div className="space-y-4">
      {items.map((item, idx) => {
        const Icon = getIcon(item.icon);
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

                    {/* Layout sub-items */}
                    {item.layouts && (
                      <div className="mt-6 space-y-6 pl-0 sm:pl-16">
                        {item.layouts.map((layout, i) => (
                          <div
                            key={i}
                            className="rounded-2xl bg-white/50 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 p-4 sm:p-5 space-y-4"
                          >
                            <h4 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                              {layout.name}
                            </h4>

                            {/* Diagram denah */}
                            <LayoutDiagram type={layout.diagramType} />

                            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                              {layout.description}
                            </p>

                            {/* Kelebihan & Kekurangan */}
                            <div className="grid sm:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <h5 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                                  Kelebihan
                                </h5>
                                <ul className="space-y-1.5">
                                  {layout.kelebihan.map((k, ki) => (
                                    <li key={ki} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                      <span>{k}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div className="space-y-2">
                                <h5 className="text-xs font-bold uppercase tracking-wider text-red-500 dark:text-red-400">
                                  Kekurangan
                                </h5>
                                <ul className="space-y-1.5">
                                  {layout.kekurangan.map((k, ki) => (
                                    <li key={ki} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                                      <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                                      <span>{k}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
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
