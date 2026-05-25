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
        "relative rounded-2xl border-2 border-dashed transition-all duration-200 min-h-[96px] flex items-center justify-center p-2",
        isOver
          ? "border-brand-500 bg-brand-100/70 dark:bg-brand-500/15 scale-[1.02] shadow-[0_0_12px_rgba(59,130,246,0.2)]"
          : "border-slate-300/60 dark:border-white/10 bg-white/40 dark:bg-white/[0.03] hover:border-brand-300 dark:hover:border-brand-700 hover:bg-brand-50/30 dark:hover:bg-brand-950/10"
      )}
      data-row={row}
      data-col={col}
    >
      {!children && (
        <div className="flex flex-col items-center gap-1">
          <div className={cn(
            "w-6 h-6 rounded-lg grid place-items-center transition-colors",
            isOver ? "bg-brand-200/60 dark:bg-brand-800/30" : "bg-slate-100/60 dark:bg-white/5"
          )}>
            <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500">
              {row},{col}
            </span>
          </div>
        </div>
      )}
      {children}

      {/* Hover indicator dots */}
      {isOver && (
        <>
          <span className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
          <span className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
        </>
      )}
    </div>
  );
}
