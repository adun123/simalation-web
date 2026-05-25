import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatScore(correct: number, total: number) {
  if (total === 0) return 0;
  return Math.round((correct / total) * 100);
}

export function getScoreFeedback(score: number) {
  if (score >= 90) return { label: "Luar Biasa!", message: "Pemahamanmu sangat solid. Pertahankan!", tone: "success" as const };
  if (score >= 75) return { label: "Hebat!", message: "Kamu sudah memahami sebagian besar materi.", tone: "success" as const };
  if (score >= 60) return { label: "Cukup Baik", message: "Tinggal sedikit lagi, ulangi materi yang belum dikuasai.", tone: "warn" as const };
  return { label: "Tetap Semangat!", message: "Pelajari kembali materinya, kamu pasti bisa!", tone: "danger" as const };
}
