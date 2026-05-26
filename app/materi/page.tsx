import type { Metadata } from "next";
import { materiData } from "@/data/materi";
import Accordion from "@/components/materi/Accordion";
import SectionHeading from "@/components/ui/SectionHeading";
import { getIcon } from "@/lib/icons";
import { getMateriList } from "@/lib/supabase/queries";
import type { MateriItem } from "@/types";

export const metadata: Metadata = {
  title: "Materi Pembelajaran",
  description:
    "Kumpulan materi tata letak kantor: pengertian, tujuan, jenis, dan fungsi divisi.",
};

export const revalidate = 60; // ISR: revalidate setiap 60 detik

async function getMateri(): Promise<MateriItem[]> {
  try {
    const data = await getMateriList();
    if (data.length > 0) {
      return data.map((d: Record<string, unknown>) => ({
        id: (d.slug as string) || (d.id as string),
        title: d.title as string,
        summary: d.summary as string,
        icon: d.icon as string,
        body: d.body as string[],
        layouts: d.layouts as MateriItem["layouts"],
      }));
    }
  } catch {}
  return materiData;
}

export default async function MateriPage() {
  const items = await getMateri();

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
          {items.map((m) => {
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

        <div id={items[0]?.id} className="mt-12">
          <Accordion items={items} />
        </div>
      </div>
    </section>
  );
}
