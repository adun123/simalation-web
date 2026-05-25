"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { QuizQuestion } from "@/types";

interface Props {
  question: QuizQuestion;
  index: number;
  total: number;
  selected?: number;
  onSelect: (i: number) => void;
  showAnswer?: boolean;
}

export default function QuizCard({
  question,
  index,
  total,
  selected,
  onSelect,
  showAnswer,
}: Props) {
  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.35 }}
      className="rounded-3xl glass-strong p-6 sm:p-8"
    >
      <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
        <span>
          Soal {index + 1} dari {total}
        </span>
        <span className="text-brand-700 dark:text-brand-300">
          {Math.round(((index + 1) / total) * 100)}%
        </span>
      </div>
      <h3 className="mt-3 text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-snug">
        {question.question}
      </h3>

      <div className="mt-5 grid sm:grid-cols-2 gap-3">
        {question.options.map((opt, i) => {
          const isSelected = selected === i;
          const isCorrect = i === question.correctIndex;
          const reveal = showAnswer && isSelected;
          return (
            <button
              key={i}
              type="button"
              disabled={showAnswer}
              onClick={() => onSelect(i)}
              className={cn(
                "group text-left rounded-2xl px-4 py-3 border transition-all duration-200",
                "bg-white/70 dark:bg-white/5 border-brand-200/60 dark:border-white/10",
                "hover:border-brand-400 hover:shadow-glass",
                isSelected && !showAnswer &&
                  "border-brand-500 bg-brand-50 dark:bg-brand-500/10 shadow-glass",
                reveal && isCorrect &&
                  "border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10",
                reveal && !isCorrect &&
                  "border-rose-500 bg-rose-50 dark:bg-rose-500/10",
                showAnswer && !isSelected && isCorrect &&
                  "border-emerald-400 bg-emerald-50/60 dark:bg-emerald-500/5"
              )}
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "w-8 h-8 rounded-lg grid place-items-center text-xs font-bold shrink-0",
                    "bg-brand-100 dark:bg-white/10 text-brand-700 dark:text-brand-300",
                    isSelected && "bg-brand-gradient text-white",
                    reveal && isCorrect && "bg-emerald-500 text-white",
                    reveal && !isCorrect && "bg-rose-500 text-white"
                  )}
                >
                  {String.fromCharCode(65 + i)}
                </div>
                <span className="text-sm font-medium text-slate-800 dark:text-slate-200 flex-1">
                  {opt}
                </span>
                {reveal && isCorrect && <Check className="w-4 h-4 text-emerald-600" />}
                {reveal && !isCorrect && <X className="w-4 h-4 text-rose-600" />}
              </div>
            </button>
          );
        })}
      </div>

      {showAnswer && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-5 rounded-2xl bg-brand-50 dark:bg-brand-500/10 border border-brand-200/70 dark:border-brand-500/30 p-4"
        >
          <p className="text-xs font-bold text-brand-700 dark:text-brand-300 uppercase tracking-wider">
            Pembahasan
          </p>
          <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">
            {question.explanation}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
