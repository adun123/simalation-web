import type { Metadata } from "next";
import { materiData } from "@/data/materi";
import Accordion from "@/components/materi/Accordion";
import SectionHeading from "@/components/ui/SectionHeading";
import { getIcon } from "@/lib/icons";

export const metadata: Metadata = {
  title: "Materi Pembelajaran",
  description:
    "Kumpulan materi tata letak kantor: pengertian, tujuan, jenis, dan fungsi divisi.",
};

export default function MateriPage() {
  return (
    <section className="relative">
      <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" />
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <SectionHeading
          eyebrow="Materi"
          title="Pelajari Tata Letak Kantor"
          subtitle="Empat topik inti yang harus kamu pahami sebelum masuk ke simulasi interaktif."
        />

        {/* Quick info cards */}
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {materiData.map((m) => {
            const Icon = getIcon(m.icon);
            return (
              <a
                key={m.id}
                href={`#${m.id}`}
                className="group rounded-2xl glass p-5 hover:shadow-glass-lg transition-all hover:-translate-y-0.5"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-gradient grid place-items-center text-white">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="mt-3 text-sm font-bold text-slate-900 dark:text-white group-hover:text-brand-700 dark:group-hover:text-brand-300 transition">
                  {m.title}
                </h4>
              </a>
            );
          })}
        </div>

        <div id={materiData[0]?.id} className="mt-12">
          <Accordion items={materiData} />
        </div>
      </div>
    </section>
  );
}
