"use client";

interface Props {
  type: "open-plan" | "closed-plan" | "semi-open" | "activity-based";
}

const Room = ({ label, className }: { label: string; className?: string }) => (
  <div
    className={`flex items-center justify-center text-[10px] sm:text-xs font-medium text-center leading-tight p-1 ${className}`}
  >
    {label}
  </div>
);

function OpenPlan() {
  return (
    <div className="relative w-full aspect-[16/9] border-2 border-slate-300 dark:border-slate-600 rounded-xl p-2 bg-blue-50/50 dark:bg-blue-950/20">
      {/* One big open room */}
      <div className="w-full h-full border border-dashed border-blue-300 dark:border-blue-700 rounded-lg flex flex-wrap items-center justify-center gap-2 sm:gap-3 p-2">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="w-6 h-6 sm:w-8 sm:h-8 rounded bg-brand-200 dark:bg-brand-800 border border-brand-300 dark:border-brand-700"
            title="Meja kerja"
          />
        ))}
      </div>
      <span className="absolute top-2 left-3 text-[10px] font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wide">
        Open Area
      </span>
    </div>
  );
}

function ClosedPlan() {
  return (
    <div className="w-full aspect-[16/9] border-2 border-slate-300 dark:border-slate-600 rounded-xl p-2 bg-blue-50/50 dark:bg-blue-950/20 grid grid-cols-3 grid-rows-2 gap-1.5">
      <Room label="Direktur" className="bg-indigo-100 dark:bg-indigo-900/40 border border-indigo-300 dark:border-indigo-700 rounded-lg" />
      <Room label="HRD" className="bg-sky-100 dark:bg-sky-900/40 border border-sky-300 dark:border-sky-700 rounded-lg" />
      <Room label="Finance" className="bg-teal-100 dark:bg-teal-900/40 border border-teal-300 dark:border-teal-700 rounded-lg" />
      <Room label="Marketing" className="bg-purple-100 dark:bg-purple-900/40 border border-purple-300 dark:border-purple-700 rounded-lg" />
      <Room label="Meeting" className="bg-amber-100 dark:bg-amber-900/40 border border-amber-300 dark:border-amber-700 rounded-lg" />
      <Room label="IT" className="bg-emerald-100 dark:bg-emerald-900/40 border border-emerald-300 dark:border-emerald-700 rounded-lg" />
    </div>
  );
}

function SemiOpen() {
  return (
    <div className="w-full aspect-[16/9] border-2 border-slate-300 dark:border-slate-600 rounded-xl p-2 bg-blue-50/50 dark:bg-blue-950/20 grid grid-cols-3 grid-rows-2 gap-1.5">
      {/* Closed rooms top-left */}
      <Room label="Direktur" className="bg-indigo-100 dark:bg-indigo-900/40 border border-indigo-300 dark:border-indigo-700 rounded-lg" />
      <Room label="Meeting" className="bg-amber-100 dark:bg-amber-900/40 border border-amber-300 dark:border-amber-700 rounded-lg" />
      {/* Open area spans */}
      <div className="row-span-2 border border-dashed border-blue-300 dark:border-blue-700 rounded-lg flex flex-col items-center justify-center gap-1 p-1">
        <span className="text-[9px] sm:text-[10px] font-bold text-brand-600 dark:text-brand-400 uppercase">Open</span>
        <div className="flex flex-wrap gap-1 justify-center">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="w-4 h-4 sm:w-5 sm:h-5 rounded bg-brand-200 dark:bg-brand-800 border border-brand-300 dark:border-brand-700" />
          ))}
        </div>
      </div>
      <Room label="HRD" className="bg-sky-100 dark:bg-sky-900/40 border border-sky-300 dark:border-sky-700 rounded-lg" />
      <Room label="Finance" className="bg-teal-100 dark:bg-teal-900/40 border border-teal-300 dark:border-teal-700 rounded-lg" />
    </div>
  );
}

function ActivityBased() {
  return (
    <div className="w-full aspect-[16/9] border-2 border-slate-300 dark:border-slate-600 rounded-xl p-2 bg-blue-50/50 dark:bg-blue-950/20 grid grid-cols-4 grid-rows-2 gap-1.5">
      <div className="col-span-2 border border-dashed border-emerald-300 dark:border-emerald-700 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center">
        <span className="text-[10px] sm:text-xs font-bold text-emerald-600 dark:text-emerald-400">🤝 Kolaborasi</span>
      </div>
      <div className="col-span-2 border border-dashed border-violet-300 dark:border-violet-700 rounded-lg bg-violet-50 dark:bg-violet-950/30 flex items-center justify-center">
        <span className="text-[10px] sm:text-xs font-bold text-violet-600 dark:text-violet-400">🎯 Fokus</span>
      </div>
      <div className="col-span-1 border border-dashed border-amber-300 dark:border-amber-700 rounded-lg bg-amber-50 dark:bg-amber-950/30 flex items-center justify-center">
        <span className="text-[10px] sm:text-xs font-bold text-amber-600 dark:text-amber-400">☕ Lounge</span>
      </div>
      <div className="col-span-2 border border-dashed border-sky-300 dark:border-sky-700 rounded-lg bg-sky-50 dark:bg-sky-950/30 flex items-center justify-center">
        <span className="text-[10px] sm:text-xs font-bold text-sky-600 dark:text-sky-400">📞 Meeting</span>
      </div>
      <div className="col-span-1 border border-dashed border-rose-300 dark:border-rose-700 rounded-lg bg-rose-50 dark:bg-rose-950/30 flex items-center justify-center">
        <span className="text-[10px] sm:text-xs font-bold text-rose-600 dark:text-rose-400">🧘 Quiet</span>
      </div>
    </div>
  );
}

const diagrams: Record<Props["type"], () => JSX.Element> = {
  "open-plan": OpenPlan,
  "closed-plan": ClosedPlan,
  "semi-open": SemiOpen,
  "activity-based": ActivityBased,
};

export default function LayoutDiagram({ type }: Props) {
  const Diagram = diagrams[type];
  if (!Diagram) return null;
  return <Diagram />;
}
