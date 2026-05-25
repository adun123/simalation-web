"use client";

import * as Icons from "lucide-react";
import type { OfficeRoom } from "@/types";
import Badge from "@/components/ui/Badge";

export default function RoomDetail({ room }: { room: OfficeRoom }) {
  const Icon = (Icons[room.icon as keyof typeof Icons] ??
    Icons.Building2) as React.ComponentType<{ className?: string }>;

  return (
    <div>
      <div className="flex items-center gap-3 -mt-1">
        <div className="w-12 h-12 rounded-2xl bg-brand-gradient grid place-items-center text-white shadow-glow">
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400">
            Ruangan
          </p>
          <h3 className="text-2xl font-extrabold text-gradient leading-none">
            {room.name}
          </h3>
        </div>
      </div>

      <div className="mt-5 space-y-4">
        <div>
          <Badge tone="brand">Fungsi</Badge>
          <p className="mt-2 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {room.function}
          </p>
        </div>
        <div>
          <Badge tone="sky">Deskripsi</Badge>
          <p className="mt-2 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {room.description}
          </p>
        </div>
        <div>
          <Badge tone="success">Aktivitas Kantor</Badge>
          <ul className="mt-2 space-y-1.5">
            {room.activities.map((a, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300"
              >
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0" />
                {a}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
