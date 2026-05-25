"use client";

import { useEffect, useMemo, useState } from "react";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lightbulb,
  RotateCcw,
  Sparkles,
  Target,
  Trophy,
  Grid3X3,
  CheckCircle2,
} from "lucide-react";
import { draggableBlocks } from "@/data/rooms";
import DraggableItem from "@/components/dnd/DraggableItem";
import DropCell from "@/components/dnd/DropCell";
import SectionHeading from "@/components/ui/SectionHeading";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { useLocalProgress } from "@/hooks/useLocalProgress";
import { useSound } from "@/hooks/useSound";

const ROWS = 3;
const COLS = 4;

type Placement = Record<string, { row: number; col: number }>;

function cellId(row: number, col: number) {
  return `cell-${row}-${col}`;
}

export default function DragDropPage() {
  const [placement, setPlacement] = useState<Placement>({});
  const [feedback, setFeedback] = useState<{
    text: string;
    tone: "success" | "warn" | "danger";
  } | null>(null);
  const { update } = useLocalProgress();
  const { play } = useSound();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const correctIds = useMemo(
    () =>
      new Set(
        draggableBlocks
          .filter((b) => {
            const p = placement[b.id];
            return p && p.row === b.ideal.row && p.col === b.ideal.col;
          })
          .map((b) => b.id)
      ),
    [placement]
  );

  const placedCount = Object.keys(placement).length;
  const correctCount = correctIds.size;
  const total = draggableBlocks.length;
  const percent = Math.round((correctCount / total) * 100);

  useEffect(() => {
    update("drag-drop", percent);
  }, [percent, update]);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;
    const overId = String(over.id);
    if (!overId.startsWith("cell-")) return;
    const [, r, c] = overId.split("-");
    const row = Number(r);
    const col = Number(c);

    const occupant = Object.entries(placement).find(
      ([id, pos]) => pos.row === row && pos.col === col && id !== active.id
    );
    if (occupant) {
      play("error");
      setFeedback({
        text: "Sel ini sudah terisi. Pindahkan blok yang ada terlebih dahulu.",
        tone: "warn",
      });
      return;
    }

    const block = draggableBlocks.find((b) => b.id === active.id);
    if (!block) return;

    const isCorrect = block.ideal.row === row && block.ideal.col === col;
    setPlacement((prev) => ({ ...prev, [block.id]: { row, col } }));

    if (isCorrect) {
      play("success");
      setFeedback({
        text: `✅ ${block.label} — Posisi ideal! ${block.hint}`,
        tone: "success",
      });
    } else {
      play("click");
      setFeedback({
        text: `⚠️ ${block.label} — Belum tepat. ${block.hint}`,
        tone: "warn",
      });
    }
  }

  function reset() {
    setPlacement({});
    setFeedback(null);
    play("click");
  }

  const remaining = draggableBlocks.filter((b) => !placement[b.id]);

  return (
    <section className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-sky-500/10 dark:bg-sky-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <SectionHeading
          eyebrow="Drag & Drop"
          title="Susun Layout Kantor Idealmu"
          subtitle="Tarik blok ruangan ke posisi yang paling tepat. Sistem memberi feedback edukatif untuk setiap penempatan."
        />

        {/* Score Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 rounded-2xl glass-strong p-4 sm:p-5"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <Badge tone="brand">
                <Target className="w-3 h-3" />
                {correctCount}/{total} ideal
              </Badge>
              <Badge tone="sky">
                <Grid3X3 className="w-3 h-3" />
                {placedCount}/{total} ditempatkan
              </Badge>
              {percent === 100 && (
                <Badge tone="success">
                  <Trophy className="w-3 h-3" />
                  Layout Master!
                </Badge>
              )}
            </div>
            <Button variant="ghost" size="sm" onClick={reset}>
              <RotateCcw className="w-4 h-4" />
              Reset
            </Button>
          </div>

          {/* Progress visualization */}
          <div className="mt-4 relative h-3 rounded-full bg-slate-200/60 dark:bg-white/10 overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-brand-600 via-brand-500 to-sky-400"
              initial={{ width: 0 }}
              animate={{ width: `${percent}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse opacity-50" />
          </div>
          <p className="mt-2 text-[11px] text-slate-500 dark:text-slate-400 text-right font-medium">
            {percent}% posisi ideal tercapai
          </p>
        </motion.div>

        {/* Achievement Banner */}
        <AnimatePresence>
          {percent === 100 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10 border border-emerald-300/30 dark:border-emerald-500/20 text-center"
            >
              <p className="text-sm font-bold text-emerald-700 dark:text-emerald-300">
                🏆 Achievement Unlocked: Layout Master — Semua ruangan di posisi ideal!
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
          <div className="mt-6 grid lg:grid-cols-[1fr_260px] gap-5">
            {/* Floor Grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="rounded-[2rem] glass-strong p-4 sm:p-6 relative overflow-hidden"
            >
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-sky-400/30 rounded-tl-[2rem] pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-sky-400/30 rounded-br-[2rem] pointer-events-none" />

              <div className="flex items-center justify-between mb-4 px-1">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-sky-gradient grid place-items-center text-white">
                    <Grid3X3 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-700 dark:text-slate-200">
                      Blueprint Grid
                    </p>
                    <p className="text-[10px] text-slate-400">{ROWS}×{COLS} • Snap-to-grid</p>
                  </div>
                </div>
                <p className="text-[10px] text-slate-400 font-medium">
                  Drag blok ke sini →
                </p>
              </div>

              <div
                className="grid gap-3"
                style={{
                  gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`,
                  gridTemplateRows: `repeat(${ROWS}, minmax(0, 1fr))`,
                }}
              >
                {Array.from({ length: ROWS }).map((_, row) =>
                  Array.from({ length: COLS }).map((_, col) => {
                    const cId = cellId(row, col);
                    const placed = Object.entries(placement).find(
                      ([, p]) => p.row === row && p.col === col
                    );
                    const block = placed
                      ? draggableBlocks.find((b) => b.id === placed[0])
                      : null;
                    return (
                      <DropCell key={cId} id={cId} row={row} col={col}>
                        {block && (
                          <DraggableItem
                            id={block.id}
                            label={block.label}
                            icon={block.icon}
                            placed
                            correct={correctIds.has(block.id)}
                          />
                        )}
                      </DropCell>
                    );
                  })
                )}
              </div>
            </motion.div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* Available blocks */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="rounded-2xl glass p-5"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-lg bg-brand-gradient grid place-items-center text-white">
                    <Sparkles className="w-3 h-3" />
                  </div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Blok Tersedia
                  </p>
                </div>
                <div className="space-y-2">
                  {remaining.length === 0 ? (
                    <div className="text-center py-4">
                      <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Semua blok sudah ditempatkan!
                      </p>
                    </div>
                  ) : (
                    remaining.map((b) => (
                      <DraggableItem
                        key={b.id}
                        id={b.id}
                        label={b.label}
                        icon={b.icon}
                      />
                    ))
                  )}
                </div>
              </motion.div>

              {/* Feedback */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="rounded-2xl glass p-5"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-xl bg-sky-gradient grid place-items-center text-white">
                    <Lightbulb className="w-3.5 h-3.5" />
                  </div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Feedback
                  </p>
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={feedback?.text ?? "idle"}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className={`text-sm leading-relaxed rounded-xl p-3 ${
                      feedback?.tone === "success"
                        ? "bg-emerald-50/60 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-300 border border-emerald-200/40 dark:border-emerald-800/30"
                        : feedback?.tone === "warn"
                        ? "bg-amber-50/60 dark:bg-amber-950/20 text-amber-700 dark:text-amber-300 border border-amber-200/40 dark:border-amber-800/30"
                        : "bg-slate-50/60 dark:bg-white/5 text-slate-600 dark:text-slate-400 border border-slate-200/40 dark:border-white/10"
                    }`}
                  >
                    {feedback?.text ??
                      "Mulai dengan menarik blok dari panel ke grid. Setiap penempatan akan dievaluasi."}
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </DndContext>
      </div>
    </section>
  );
}
