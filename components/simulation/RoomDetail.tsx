"use client";

import { motion } from "framer-motion";
import { Briefcase, FileText, Zap } from "lucide-react";
import type { OfficeRoom } from "@/types";
import { getIcon } from "@/lib/icons";

export default function RoomDetail({ room }: { room: OfficeRoom }) {
  const Icon = getIcon(room.icon);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center gap-4">
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="w-14 h-14 rounded-2xl bg-brand-gradient grid place-items-center text-white shadow-glow"
        >
          <Icon className="w-7 h-7" />
        </motion.div>
        <div>
          <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400">
            Ruangan Kantor
          </p>
          <h3 className="text-2xl font-extrabold text-gradient leading-tight">
            {room.name}
          </h3>
        </div>
      </div>

      {/* Info Cards */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-xl bg-brand-50/60 dark:bg-brand-950/20 border border-brand-200/40 dark:border-brand-800/30 p-4"
      >
        <div className="flex items-center gap-2 mb-2">
          <Briefcase className="w-4 h-4 text-brand-600 dark:text-brand-400" />
          <p className="text-xs font-bold uppercase tracking-wider text-brand-700 dark:text-brand-300">
            Fungsi Utama
          </p>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          {room.function}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-xl bg-sky-50/60 dark:bg-sky-950/20 border border-sky-200/40 dark:border-sky-800/30 p-4"
      >
        <div className="flex items-center gap-2 mb-2">
          <FileText className="w-4 h-4 text-sky-600 dark:text-sky-400" />
          <p className="text-xs font-bold uppercase tracking-wider text-sky-700 dark:text-sky-300">
            Deskripsi
          </p>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          {room.description}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/40 dark:border-emerald-800/30 p-4"
      >
        <div className="flex items-center gap-2 mb-2">
          <Zap className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
            Aktivitas
          </p>
        </div>
        <ul className="space-y-2">
          {room.activities.map((a, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 + i * 0.08 }}
              className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300"
            >
              <span className="mt-1.5 w-2 h-2 rounded-full bg-gradient-to-br from-emerald-500 to-teal-400 shrink-0" />
              {a}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}
