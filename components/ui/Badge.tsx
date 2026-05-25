import { cn } from "@/lib/utils";

type Tone = "brand" | "sky" | "success" | "warn" | "danger";

const tones: Record<Tone, string> = {
  brand:
    "bg-brand-100/70 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300 border border-brand-200/60 dark:border-brand-500/30",
  sky: "bg-sky-100/70 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300 border border-sky-200/60 dark:border-sky-500/30",
  success:
    "bg-emerald-100/70 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-500/30",
  warn: "bg-amber-100/70 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300 border border-amber-200/60 dark:border-amber-500/30",
  danger:
    "bg-rose-100/70 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300 border border-rose-200/60 dark:border-rose-500/30",
};

export default function Badge({
  children,
  tone = "brand",
  className,
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
