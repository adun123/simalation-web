"use client";

import type { OfficeRoom } from "@/types";
import { cn } from "@/lib/utils";

interface Props {
  rooms: OfficeRoom[];
  activeId?: string | null;
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

export default function Minimap({ rooms, activeId, onSelect }: Props) {
  return (
    <div className="rounded-2xl glass p-3 w-full sm:w-44">
      <p className="text-[10px] uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400 mb-2 px-1">
        Minimap
      </p>
      <div
        className="grid gap-1 aspect-[3/2]"
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
              "rounded-md transition-all",
              colorMap[r.color],
              activeId === r.id ? "ring-2 ring-white scale-105" : "opacity-80 hover:opacity-100"
            )}
            aria-label={r.name}
          />
        ))}
      </div>
    </div>
  );
}
