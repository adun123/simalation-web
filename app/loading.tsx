export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-full border-3 border-brand-200 border-t-brand-600 animate-spin" />
        <p className="text-sm text-slate-500 dark:text-slate-400 animate-pulse">
          Memuat halaman...
        </p>
      </div>
    </div>
  );
}
