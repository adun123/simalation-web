"use client";

import { motion } from "framer-motion";
import { Award, RefreshCcw, Trophy } from "lucide-react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { getScoreFeedback } from "@/lib/utils";

interface Props {
  open: boolean;
  onClose: () => void;
  score: number;
  correct: number;
  total: number;
  onRetry: () => void;
}

export default function QuizResultModal({
  open,
  onClose,
  score,
  correct,
  total,
  onRetry,
}: Props) {
  const fb = getScoreFeedback(score);

  return (
    <Modal open={open} onClose={onClose}>
      <div className="text-center -mt-2">
        <motion.div
          initial={{ scale: 0.6, rotate: -20, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 220, damping: 16 }}
          className="mx-auto w-20 h-20 rounded-3xl bg-brand-gradient grid place-items-center shadow-glow"
        >
          {score >= 75 ? (
            <Trophy className="w-10 h-10 text-white" />
          ) : (
            <Award className="w-10 h-10 text-white" />
          )}
        </motion.div>
        <p className="mt-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Hasil Quiz
        </p>
        <h3 className="mt-1 text-3xl sm:text-4xl font-extrabold text-gradient">
          {fb.label}
        </h3>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          {fb.message}
        </p>

        {/* Score circle */}
        <div className="mt-6 flex items-center justify-center gap-6">
          <div className="text-center">
            <p className="text-xs text-slate-500 dark:text-slate-400">Skor</p>
            <p className="text-5xl font-extrabold text-gradient">{score}</p>
          </div>
          <div className="h-14 w-px bg-brand-200/70 dark:bg-white/10" />
          <div className="text-center">
            <p className="text-xs text-slate-500 dark:text-slate-400">Benar</p>
            <p className="text-5xl font-extrabold text-slate-800 dark:text-slate-100">
              {correct}
              <span className="text-base text-slate-400 font-medium">
                /{total}
              </span>
            </p>
          </div>
        </div>

        <div className="mt-7 flex gap-3 justify-center">
          <Button variant="primary" onClick={onRetry}>
            <RefreshCcw className="w-4 h-4" />
            Coba Lagi
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Tutup
          </Button>
        </div>
      </div>
    </Modal>
  );
}
