"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { officeRooms } from "@/data/rooms";
import OfficeRoomBlock from "@/components/simulation/OfficeRoomBlock";
import Minimap from "@/components/simulation/Minimap";
import RoomDetail from "@/components/simulation/RoomDetail";
import Modal from "@/components/ui/Modal";
import SectionHeading from "@/components/ui/SectionHeading";
import ProgressBar from "@/components/ui/ProgressBar";
import Badge from "@/components/ui/Badge";
import { useLocalProgress } from "@/hooks/useLocalProgress";
import { useSound } from "@/hooks/useSound";
import { CheckCircle2, MousePointerClick } from "lucide-react";

export default function SimulasiPage() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [visited, setVisited] = useState<Set<string>>(new Set());
  const { update } = useLocalProgress();
  const { play } = useSound();

  const active = officeRooms.find((r) => r.id === activeId) ?? null;
  const totalRooms = officeRooms.length;
  const visitedCount = visited.size;
  const percent = Math.round((visitedCount / totalRooms) * 100);

  useEffect(() => {
    update("simulasi", percent);
  }, [percent, update]);

  const handleSelect = (id: string) => {
    play("click");
    setActiveId(id);
    setVisited((s) => new Set(s).add(id));
  };

  return (
    <section className="relative">
      <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <SectionHeading
          eyebrow="Simulasi Interaktif"
          title="Jelajahi Tata Letak Kantor"
          subtitle="Klik tiap ruangan untuk melihat fungsi, deskripsi, dan aktivitas yang berlangsung di dalamnya."
        />

        {/* Toolbar */}
        <div className="mt-10 grid lg:grid-cols-[1fr_auto] gap-4 items-end">
          <div className="rounded-3xl glass p-5">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <Badge tone="brand">
                <MousePointerClick className="w-3 h-3" />
                Interaktif
              </Badge>
              <Badge tone="success">
                <CheckCircle2 className="w-3 h-3" />
                {visitedCount}/{totalRooms} ruangan dijelajahi
              </Badge>
              {percent === 100 && (
                <Badge tone="warn">🏆 Achievement: Office Explorer</Badge>
              )}
            </div>
            <ProgressBar value={percent} label="Progress eksplorasi" />
          </div>
          <Minimap rooms={officeRooms} activeId={activeId} onSelect={handleSelect} />
        </div>

        {/* Floor plan */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-6 rounded-[2rem] glass-strong p-4 sm:p-6"
        >
          <div className="flex justify-between items-center mb-4 px-2">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              🏢 Floor Plan — Lantai 1
            </p>
            <p className="text-[10px] text-slate-400">Skala: ilustratif</p>
          </div>

          <div
            className="relative grid gap-2 sm:gap-3 bg-brand-50/60 dark:bg-white/5 rounded-2xl p-3 sm:p-4 border border-brand-200/50 dark:border-white/10"
            style={{
              gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
              gridTemplateRows: "repeat(4, minmax(64px, auto))",
            }}
          >
            {/* dotted entry indicator */}
            <div className="absolute -top-3 left-6 px-2 py-0.5 rounded-full text-[10px] font-bold bg-white dark:bg-ink-700 border border-brand-300 text-brand-700 dark:text-brand-300 shadow-glass">
              Pintu Masuk ↓
            </div>

            {officeRooms.map((r, i) => (
              <OfficeRoomBlock
                key={r.id}
                room={r}
                active={activeId === r.id}
                onClick={() => handleSelect(r.id)}
                index={i}
              />
            ))}
          </div>

          <p className="mt-4 text-center text-xs text-slate-500 dark:text-slate-400">
            💡 Klik tiap ruangan untuk membuka detail. Semakin banyak ruangan
            yang kamu jelajahi, semakin banyak yang kamu pelajari.
          </p>
        </motion.div>
      </div>

      <Modal
        open={!!active}
        onClose={() => setActiveId(null)}
        title={undefined}
      >
        {active && <RoomDetail room={active} />}
      </Modal>
    </section>
  );
}
