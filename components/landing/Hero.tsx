"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, PlayCircle } from "lucide-react";
import AnimatedOffice from "./AnimatedOffice";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-grid opacity-[0.7] pointer-events-none" />
      <div className="absolute -top-32 -right-20 w-[480px] h-[480px] rounded-full bg-brand-300/30 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-20 w-[480px] h-[480px] rounded-full bg-sky-300/30 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 sm:pt-24 sm:pb-28 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-semibold text-brand-700 dark:text-brand-300"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Media Pembelajaran Interaktif · UAS Project
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]"
          >
            Belajar{" "}
            <span className="text-gradient">Tata Letak Kantor</span>{" "}
            Secara Interaktif
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-5 text-lg text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed"
          >
            Media pembelajaran modern untuk memahami konsep tata letak kantor
            melalui simulasi interaktif berbasis web.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link href="/materi" className="btn-primary group">
              Mulai Belajar
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link href="/simulasi" className="btn-ghost">
              <PlayCircle className="w-4 h-4" />
              Lihat Simulasi
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-10 grid grid-cols-3 gap-4 max-w-md"
          >
            {[
              { v: "6+", l: "Ruangan" },
              { v: "8", l: "Soal Quiz" },
              { v: "100%", l: "Interaktif" },
            ].map((s) => (
              <div
                key={s.l}
                className="rounded-2xl glass px-4 py-3 text-center"
              >
                <p className="text-2xl font-extrabold text-gradient">{s.v}</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">{s.l}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative"
        >
          <div className="rounded-[2rem] glass-strong p-6 sm:p-8 animate-float">
            <AnimatedOffice />
          </div>
          {/* floating chip */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="absolute -bottom-4 left-6 sm:left-12 rounded-2xl glass-strong px-4 py-3 flex items-center gap-3 shadow-glass-lg"
          >
            <div className="w-9 h-9 rounded-xl bg-sky-gradient grid place-items-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div className="leading-tight">
              <p className="text-xs text-slate-500 dark:text-slate-400">Live preview</p>
              <p className="text-sm font-bold">Office Layout v1.0</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
