"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { layoutConfigs, type LayoutMode } from "@/data/rooms";
import OfficeRoomBlock from "@/components/simulation/OfficeRoomBlock";
import Minimap from "@/components/simulation/Minimap";
import RoomDetail from "@/components/simulation/RoomDetail";
import Modal from "@/components/ui/Modal";
import SectionHeading from "@/components/ui/SectionHeading";
import Badge from "@/components/ui/Badge";
import { useLocalProgress } from "@/hooks/useLocalProgress";
import { useSound } from "@/hooks/useSound";
import {
  CheckCircle2,
  Eye,
  Layers,
  MousePointerClick,
  Compass,
} from "lucide-react";

const modes: { id: LayoutMode; label: string }[] = [
  { id: "open-plan", label: "Open Plan" },
  { id: "closed-plan", label: "Closed Plan" },
  { id: "semi-open", label: "Semi Open" },
  { id: "activity-based", label: "Activity Based" },
];

export default function SimulasiPage() {
  const [mode, setMode] = useState<LayoutMode>("open-plan");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [visited, setVisited] = useState<Set<string>>(new Set());
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const { update } = useLocalProgress();
  const { play } = useSound();

  const config = layoutConfigs[mode];
  const rooms = config.rooms;
  const active = rooms.find((r) => r.id === activeId) ?? null;
  const totalRooms = rooms.length;
  const visitedCount = visited.size;
  const percent = Math.round((visitedCount / totalRooms) * 100);

  useEffect(() => {
    update("simulasi", percent);
  }, [percent, update]);

  // Reset visited when mode changes
  useEffect(() => {
    setVisited(new Set());
    setActiveId(null);
  }, [mode]);

  const handleSelect = (id: string) => {
    play("click");
    setActiveId(id);
    setVisited((s) => new Set(s).add(id));
  };

  return (
    <section className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-brand-500/10 dark:bg-brand-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <SectionHeading
          eyebrow="Simulasi Interaktif"
          title="Jelajahi Tata Letak Kantor"
          subtitle="Pilih jenis tata letak, lalu klik tiap ruangan untuk melihat fungsi dan aktivitasnya."
        />

        {/* Mode Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mt-8 flex flex-wrap gap-2 justify-center"
        >
          {modes.map((m) => (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                mode === m.id
                  ? "bg-brand-600 text-white shadow-glow"
                  : "glass text-slate-700 dark:text-slate-300 hover:bg-brand-50 dark:hover:bg-white/10"
              }`}
            >
              {m.label}
            </button>
          ))}
        </motion.div>

        {/* Layout description */}
        <motion.p
          key={mode}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-3 text-center text-sm text-slate-500 dark:text-slate-400"
        >
          {config.description}
        </motion.p>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3"
        >
          <StatCard icon={<Eye className="w-4 h-4" />} label="Dijelajahi" value={`${visitedCount}/${totalRooms}`} color="brand" />
          <StatCard icon={<Layers className="w-4 h-4" />} label="Total Ruangan" value={String(totalRooms)} color="sky" />
          <StatCard icon={<Compass className="w-4 h-4" />} label="Progress" value={`${percent}%`} color="indigo" />
          <StatCard icon={<CheckCircle2 className="w-4 h-4" />} label="Status" value={percent === 100 ? "Selesai!" : "Menjelajah"} color="teal" />
        </motion.div>

        {/* Achievement */}
        <AnimatePresence>
          {percent === 100 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-yellow-500/10 to-orange-500/10 border border-amber-300/30 dark:border-amber-500/20 text-center"
            >
              <p className="text-sm font-bold text-amber-700 dark:text-amber-300">
                🏆 Achievement Unlocked: Office Explorer — Semua ruangan telah dijelajahi!
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Floor Plan + Minimap */}
        <div className="mt-8 grid lg:grid-cols-[1fr_200px] gap-4 items-start">
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-[2rem] glass-strong p-4 sm:p-6 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-brand-400/30 rounded-tl-[2rem] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-brand-400/30 rounded-br-[2rem] pointer-events-none" />

            <div className="flex justify-between items-center mb-5 px-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-brand-gradient grid place-items-center text-white shadow-glow">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                    {config.name}
                  </p>
                  <p className="text-[10px] text-slate-400">{rooms.length} Ruangan • Skala Ilustratif</p>
                </div>
              </div>
              <Badge tone="brand">
                <MousePointerClick className="w-3 h-3" />
                Interaktif
              </Badge>
            </div>

            <div
              className="relative grid gap-2.5 sm:gap-3 rounded-2xl p-3 sm:p-4 border border-brand-200/40 dark:border-white/10 bg-gradient-to-br from-slate-50/80 via-brand-50/40 to-sky-50/60 dark:from-white/[0.03] dark:via-brand-950/20 dark:to-sky-950/10"
              style={{
                gridTemplateColumns: `repeat(${config.gridCols}, minmax(0, 1fr))`,
                gridTemplateRows: `repeat(${config.gridRows}, minmax(72px, auto))`,
              }}
            >
              <div className="absolute -top-3 left-6 px-3 py-1 rounded-full text-[10px] font-bold bg-white dark:bg-ink-700 border border-brand-300 dark:border-brand-600 text-brand-700 dark:text-brand-300 shadow-glass flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Pintu Masuk
              </div>

              {rooms.map((r, i) => (
                <OfficeRoomBlock
                  key={r.id}
                  room={r}
                  active={activeId === r.id}
                  visited={visited.has(r.id)}
                  hovered={hoveredId === r.id}
                  onClick={() => handleSelect(r.id)}
                  onHover={(h) => setHoveredId(h ? r.id : null)}
                  index={i}
                />
              ))}
            </div>

            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
              Klik ruangan untuk membuka detail lengkap
            </div>
          </motion.div>

          {/* Sidebar */}
          <div className="space-y-4">
            <Minimap rooms={rooms} activeId={activeId} visited={visited} onSelect={handleSelect} />
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="rounded-2xl glass p-4"
            >
              <p className="text-[10px] uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400 mb-3">
                Legenda
              </p>
              <div className="space-y-2">
                {rooms.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => handleSelect(r.id)}
                    className="flex items-center gap-2 w-full text-left group"
                  >
                    <span className={`w-2.5 h-2.5 rounded-sm shrink-0 ${colorDot(r.color)}`} />
                    <span className="text-[11px] text-slate-600 dark:text-slate-400 group-hover:text-brand-600 dark:group-hover:text-brand-300 transition-colors truncate">
                      {r.name}
                    </span>
                    {visited.has(r.id) && (
                      <CheckCircle2 className="w-3 h-3 text-emerald-500 ml-auto shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <Modal open={!!active} onClose={() => setActiveId(null)} title={undefined}>
        {active && <RoomDetail room={active} />}
      </Modal>
    </section>
  );
}

function StatCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: string }) {
  const gradients: Record<string, string> = {
    brand: "from-brand-600 to-brand-400",
    sky: "from-sky-500 to-sky-400",
    indigo: "from-indigo-600 to-brand-500",
    teal: "from-teal-500 to-cyan-400",
  };
  return (
    <div className="rounded-2xl glass p-4 group hover:shadow-glass-lg transition-all">
      <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${gradients[color]} grid place-items-center text-white mb-2 shadow-glow group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <p className="text-lg font-extrabold text-slate-800 dark:text-white">{value}</p>
      <p className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-medium">{label}</p>
    </div>
  );
}

function colorDot(color: string) {
  const map: Record<string, string> = {
    brand: "bg-brand-500",
    sky: "bg-sky-500",
    indigo: "bg-indigo-500",
    cyan: "bg-cyan-500",
    blue: "bg-brand-700",
    teal: "bg-teal-500",
  };
  return map[color] ?? "bg-slate-400";
}
