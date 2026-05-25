"use client";

import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import type { OfficeRoom } from "@/types";
import { cn } from "@/lib/utils";

const colorMap: Record<OfficeRoom["color"], string> = {
  brand: "from-brand-600 to-brand-400",
  sky: "from-sky-500 to-sky-400",
  indigo: "from-indigo-600 to-brand-500",
  cyan: "from-cyan-500 to-sky-400",
  blue: "from-brand-700 via-brand-500 to-brand-400",
  teal: "from-teal-500 to-cyan-400",
};

interface Props {
  room: OfficeRoom;
  active: boolean;
  onClick: () => void;
  index: number;
}

export default function OfficeRoomBlock({ room, active, onClick, index }: Props) {
  const Icon = (Icons[room.icon as keyof typeof Icons] ??
    Icons.Building2) as React.ComponentType<{ className?: string }>;

  return (
    <motion.button
      type="button"
      onClick={onClick}
      style={{ gridArea: room.gridArea }}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "relative group rounded-2xl p-3 sm:p-4 text-left overflow-hidden",
        "bg-gradient-to-br text-white shadow-glass hover:shadow-glass-lg transition-all",
        colorMap[room.color],
        active && "ring-4 ring-white/70 dark:ring-white/30"
      )}
      aria-label={`Lihat detail ${room.name}`}
    >
      {/* shine */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-tr from-white/0 via-white/20 to-white/0" />

      <div className="relative flex items-start gap-2.5">
        <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur grid place-items-center shrink-0">
          <Icon className="w-5 h-5" />
        </div>
        <div className="min-w-0">
          <p className="font-bold text-sm sm:text-base leading-tight">
            {room.name}
          </p>
          <p className="text-[11px] sm:text-xs text-white/85 line-clamp-2 mt-0.5">
            {room.function}
          </p>
        </div>
      </div>

      {/* dot indicator */}
      <span className="absolute right-3 top-3 w-2 h-2 rounded-full bg-white/80 animate-pulse-soft" />
    </motion.button>
  );
}
