"use client";

import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import * as Icons from "lucide-react";
import { GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  id: string;
  label: string;
  icon: string;
  placed?: boolean;
  correct?: boolean;
}

export default function DraggableItem({ id, label, icon, placed, correct }: Props) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id });

  const Icon = (Icons[icon as keyof typeof Icons] ??
    Icons.Square) as React.ComponentType<{ className?: string }>;

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <button
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={cn(
        "relative w-full select-none rounded-2xl p-3 text-left transition-all touch-none",
        "bg-gradient-to-br shadow-glass cursor-grab active:cursor-grabbing",
        correct
          ? "from-emerald-500 to-emerald-400 text-white"
          : placed
          ? "from-amber-500 to-orange-400 text-white"
          : "from-brand-600 to-brand-400 text-white hover:shadow-glass-lg",
        isDragging && "scale-105 shadow-glass-lg z-50 opacity-90"
      )}
    >
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-white/20 grid place-items-center shrink-0">
          <Icon className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-sm leading-tight">{label}</p>
          <p className="text-[10px] text-white/80">
            {correct ? "✓ Posisi ideal" : placed ? "Coba posisi lain" : "Drag ke grid"}
          </p>
        </div>
        <GripVertical className="w-4 h-4 text-white/70" />
      </div>
    </button>
  );
}
