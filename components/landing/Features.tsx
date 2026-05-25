"use client";

import { motion } from "framer-motion";
import { features } from "@/data/features";
import SectionHeading from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";
import { getIcon } from "@/lib/icons";

const toneBg: Record<string, string> = {
  brand: "from-brand-500 to-brand-700",
  sky: "from-sky-400 to-sky-600",
  indigo: "from-indigo-500 to-brand-700",
  cyan: "from-cyan-400 to-sky-600",
};

export default function Features() {
  return (
    <section className="relative py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Fitur Unggulan"
          title="Belajar lebih asik dan tidak membosankan"
          subtitle="Setiap fitur dirancang untuk membantu kamu memahami tata letak kantor dengan cara yang menyenangkan."
        />

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => {
            const Icon = getIcon(f.icon);
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                whileHover={{ y: -6 }}
                className="group rounded-3xl p-6 glass hover:shadow-glass-lg transition-all duration-300"
              >
                <div
                  className={cn(
                    "w-12 h-12 rounded-2xl grid place-items-center bg-gradient-to-br shadow-glow text-white",
                    toneBg[f.tone]
                  )}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {f.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
