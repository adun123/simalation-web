"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-[2.5rem] bg-brand-gradient p-10 sm:p-16 shadow-glass-lg"
        >
          {/* decorative shapes */}
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-sky-300/20 blur-3xl" />

          <div className="relative grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                Siap menjelajahi simulasi kantormu sendiri?
              </h2>
              <p className="mt-3 text-blue-100 max-w-xl">
                Klik tombol di bawah untuk mulai eksplorasi materi, simulasi
                interaktif, hingga uji pemahaman lewat quiz.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link
                href="/simulasi"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white text-brand-700 font-semibold shadow-glass hover:shadow-glass-lg transition-all hover:-translate-y-0.5"
              >
                Mulai Simulasi
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/quiz"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/10 text-white font-semibold border border-white/30 backdrop-blur hover:bg-white/20 transition"
              >
                Coba Quiz
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
