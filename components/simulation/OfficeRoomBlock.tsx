"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import type { OfficeRoom } from "@/types";
import { cn } from "@/lib/utils";
import { getIcon } from "@/lib/icons";

const colorMap: Record<OfficeRoom["color"], string> = {
  brand: "from-brand-600 to-brand-400",
  sky: "from-sky-500 to-sky-400",
  indigo: "from-indigo-600 to-brand-500",
  cyan: "from-cyan-500 to-sky-400",
  blue: "from-brand-700 via-brand-500 to-brand-400",
  teal: "from-teal-500 to-cyan-400",
};

const glowMap: Record<OfficeRoom["color"], string> = {
  brand: "shadow-[0_0_20px_rgba(37,99,235,0.4)]",
  sky: "shadow-[0_0_20px_rgba(14,165,233,0.4)]",
  indigo: "shadow-[0_0_20px_rgba(99,102,241,0.4)]",
  cyan: "shadow-[0_0_20px_rgba(6,182,212,0.4)]",
  blue: "shadow-[0_0_20px_rgba(29,78,216,0.4)]",
  teal: "shadow-[0_0_20px_rgba(20,184,166,0.4)]",
};

interface Props {
  room: OfficeRoom;
  active: boolean;
  visited?: boolean;
  hovered?: boolean;
  onClick: () => void;
  onHover?: (hovered: boolean) => void;
  index: number;
}

export default function OfficeRoomBlock({ room, active, visited, onClick, onHover, index }: Props) {
  const Icon = getIcon(room.icon);

  return (
    <motion.button
      type="button"
      onClick={onClick}
      onMouseEnter={() => onHover?.(true)}
      onMouseLeave={() => onHover?.(false)}
      style={{ gridArea: room.gridArea }}
      initial={{ opacity: 0, scale: 0.88, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.97 }}
      className={cn(
        "relative group rounded-2xl p-3 sm:p-4 text-left overflow-hidden",
        "bg-gradient-to-br text-white transition-all duration-300",
        colorMap[room.color],
        active && `ring-4 ring-white/80 dark:ring-white/40 ${glowMap[room.color]}`,
        !active && "shadow-glass hover:shadow-glass-lg",
        visited && !active && "ring-2 ring-emerald-400/50"
      )}
      aria-label={`Lihat detail ${room.name}`}
    >
      {/* Animated shine sweep */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      </div>

      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,white_1px,transparent_1px)] bg-[length:12px_12px]" />

      <div className="relative flex items-start gap-2.5">
        <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm grid place-items-center shrink-0 group-hover:bg-white/30 transition-colors">
          <Icon className="w-5 h-5" />
        </div>
        <div className="min-w-0">
          <p className="font-bold text-sm sm:text-base leading-tight drop-shadow-sm">
            {room.name}
          </p>
          <p className="text-[11px] sm:text-xs text-white/80 line-clamp-2 mt-0.5">
            {room.function}
          </p>
        </div>
      </div>

      {/* Status indicators */}
      <div className="absolute right-3 top-3 flex items-center gap-1.5">
        {visited && (
          <span className="w-4 h-4 rounded-full bg-emerald-400/90 grid place-items-center">
            <Check className="w-2.5 h-2.5 text-white" />
          </span>
        )}
        {!visited && (
          <span className="w-2.5 h-2.5 rounded-full bg-white/80 animate-pulse" />
        )}
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/30 group-hover:bg-white/60 transition-colors" />
    </motion.button>
  );
}
