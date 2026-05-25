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
import { Lightbulb, RotateCcw, Sparkles, Target } from "lucide-react";
import { draggableBlocks } from "@/data/rooms";
import DraggableItem from "@/components/dnd/DraggableItem";
import DropCell from "@/components/dnd/DropCell";
import SectionHeading from "@/components/ui/SectionHeading";
import ProgressBar from "@/components/ui/ProgressBar";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { useLocalProgress } from "@/hooks/useLocalProgress";
import { useSound } from "@/hooks/useSound";

const ROWS = 3;
const COLS = 4;

type Placement = Record<string, { row: number; col: number }>; // blockId -> cell

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

    // ensure the cell is empty (or occupied by the same block)
    const occupant = Object.entries(placement).find(
      ([id, pos]) => pos.row === row && pos.col === col && id !== active.id
    );
    if (occupant) {
      play("error");
      setFeedback({
        text: "Sel ini sudah terisi. Coba pindahkan blok yang sudah ada terlebih dahulu.",
        tone: "warn",
      });
      return;
    }

    const block = draggableBlocks.find((b) => b.id === active.id);
    if (!block) return;

    const isCorrect = block.ideal.row === row && block.ideal.col === col;
    setPlacement((prev) => ({
      ...prev,
      [block.id]: { row, col },
    }));

    if (isCorrect) {
      play("success");
      setFeedback({
        text: `✅ ${block.label} ditempatkan di posisi ideal! ${block.hint}`,
        tone: "success",
      });
    } else {
      play("click");
      setFeedback({
        text: `⚠️ ${block.label} belum di posisi ideal. ${block.hint}`,
        tone: "warn",
      });
    }
  }

  function reset() {
    setPlacement({});
    setFeedback(null);
    play("click");
  }

  // remaining (un-placed) blocks for the side panel
  const remaining = draggableBlocks.filter((b) => !placement[b.id]);

  return (
    <section className="relative">
      <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <SectionHeading
          eyebrow="Drag & Drop"
          title="Susun Layout Kantor Idealmu"
          subtitle="Tarik tiap blok ruangan ke posisi yang menurutmu paling tepat. Sistem akan memberi feedback edukatif."
        />

        <div className="mt-8 flex flex-wrap items-center gap-3 justify-between">
          <div className="flex flex-wrap gap-2 items-center">
            <Badge tone="brand">
              <Target className="w-3 h-3" />
              {correctCount}/{total} posisi ideal
            </Badge>
            <Badge tone="sky">{placedCount}/{total} ditempatkan</Badge>
            {percent === 100 && (
              <Badge tone="success">
                <Sparkles className="w-3 h-3" />
                🏆 Layout Master
              </Badge>
            )}
          </div>
          <Button variant="ghost" size="sm" onClick={reset}>
            <RotateCcw className="w-4 h-4" />
            Reset
          </Button>
        </div>

        <div className="mt-3">
          <ProgressBar value={percent} label="Progress layout ideal" />
        </div>

        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
          <div className="mt-8 grid lg:grid-cols-[1fr_280px] gap-6">
            {/* Floor grid */}
            <div className="rounded-3xl glass-strong p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4 px-1">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Floor Grid {ROWS}×{COLS}
                </p>
                <p className="text-[10px] text-slate-400">Snap-to-grid</p>
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
            </div>

            {/* Side: tray + feedback */}
            <div className="space-y-4">
              <div className="rounded-3xl glass p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                  Blok yang tersedia
                </p>
                <div className="space-y-2">
                  {remaining.length === 0 ? (
                    <p className="text-sm text-slate-500 dark:text-slate-400 italic">
                      Semua blok sudah ditempatkan.
                    </p>
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
              </div>

              <div className="rounded-3xl glass p-5">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-xl bg-sky-gradient grid place-items-center text-white">
                    <Lightbulb className="w-4 h-4" />
                  </div>
                  <p className="text-sm font-bold">Feedback Edukatif</p>
                </div>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={feedback?.text ?? "idle"}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed"
                  >
                    {feedback?.text ??
                      "Mulai dengan menarik blok dari panel di samping ke grid. Setiap penempatan akan dievaluasi secara otomatis."}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </DndContext>
      </div>
    </section>
  );
}
