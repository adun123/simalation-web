"use client";

import type { OfficeRoom } from "@/types";
import { cn } from "@/lib/utils";
import { Map } from "lucide-react";

interface Props {
  rooms: OfficeRoom[];
  activeId?: string | null;
  visited?: Set<string>;
  onSelect: (id: string) => void;
}

const colorMap: Record<OfficeRoom["color"], string> = {
  brand: "bg-brand-500",
  sky: "bg-sky-500",
  indigo: "bg-indigo-500",
  cyan: "bg-cyan-500",
  blue: "bg-brand-700",
  teal: "bg-teal-500",
};

export default function Minimap({ rooms, activeId, visited, onSelect }: Props) {
  return (
    <div className="rounded-2xl glass p-4">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-6 h-6 rounded-lg bg-brand-gradient grid place-items-center text-white">
          <Map className="w-3 h-3" />
        </div>
        <p className="text-[10px] uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400">
          Minimap
        </p>
      </div>
      <div
        className="grid gap-1 aspect-[3/2] rounded-lg bg-slate-100/60 dark:bg-white/5 p-1.5 border border-slate-200/50 dark:border-white/10"
        style={{
          gridTemplateColumns: "repeat(12, 1fr)",
          gridTemplateRows: "repeat(4, 1fr)",
        }}
      >
        {rooms.map((r) => (
          <button
            key={r.id}
            onClick={() => onSelect(r.id)}
            style={{ gridArea: r.gridArea }}
            className={cn(
              "rounded transition-all relative",
              colorMap[r.color],
              activeId === r.id
                ? "ring-2 ring-white scale-105 brightness-110"
                : "opacity-70 hover:opacity-100 hover:scale-[1.02]",
              visited?.has(r.id) && activeId !== r.id && "ring-1 ring-emerald-400/60"
            )}
            aria-label={r.name}
          >
            {visited?.has(r.id) && (
              <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-emerald-400" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
