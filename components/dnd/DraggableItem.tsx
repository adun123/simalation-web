"use client";

import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Check, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { getIcon } from "@/lib/icons";

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

  const Icon = getIcon(icon);

  const style = { transform: CSS.Translate.toString(transform) };

  return (
    <button
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={cn(
        "relative w-full select-none rounded-2xl p-3 text-left transition-all duration-200 touch-none group",
        "cursor-grab active:cursor-grabbing",
        correct
          ? "bg-gradient-to-br from-emerald-500 to-teal-400 text-white shadow-[0_0_16px_rgba(16,185,129,0.3)]"
          : placed
          ? "bg-gradient-to-br from-amber-500 to-orange-400 text-white shadow-glass"
          : "bg-gradient-to-br from-brand-600 to-brand-400 text-white shadow-glass hover:shadow-glass-lg hover:-translate-y-0.5",
        isDragging && "scale-105 shadow-glass-lg z-50 opacity-90 rotate-1"
      )}
    >
      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-sm grid place-items-center shrink-0 group-hover:bg-white/30 transition-colors">
          <Icon className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-sm leading-tight">{label}</p>
          <p className="text-[10px] text-white/75 flex items-center gap-1 mt-0.5">
            {correct ? (
              <><Check className="w-2.5 h-2.5" /> Posisi ideal</>
            ) : placed ? (
              <><ArrowRight className="w-2.5 h-2.5" /> Coba posisi lain</>
            ) : (
              "Drag ke grid"
            )}
          </p>
        </div>
        <GripVertical className="w-4 h-4 text-white/50 group-hover:text-white/80 transition-colors" />
      </div>

      {/* Bottom accent */}
      {correct && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/40 rounded-b-2xl" />
      )}
    </button>
  );
}
