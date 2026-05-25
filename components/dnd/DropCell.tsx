"use client";

import { useDroppable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";

interface Props {
  id: string;
  row: number;
  col: number;
  children?: React.ReactNode;
}

export default function DropCell({ id, row, col, children }: Props) {
  const { isOver, setNodeRef } = useDroppable({ id });
  return (
    <div
      ref={setNodeRef}
      className={cn(
        "relative rounded-2xl border-2 border-dashed transition-all min-h-[88px] flex items-center justify-center p-2",
        isOver
          ? "border-brand-500 bg-brand-100/60 dark:bg-brand-500/10"
          : "border-brand-200/70 dark:border-white/10 bg-white/50 dark:bg-white/5"
      )}
      data-row={row}
      data-col={col}
    >
      {!children && (
        <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
          {row}-{col}
        </span>
      )}
      {children}
    </div>
  );
}
