"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Send } from "lucide-react";
import { quizQuestions } from "@/data/quiz";
import QuizCard from "@/components/quiz/QuizCard";
import QuizResultModal from "@/components/quiz/QuizResultModal";
import SectionHeading from "@/components/ui/SectionHeading";
import ProgressBar from "@/components/ui/ProgressBar";
import Button from "@/components/ui/Button";
import { formatScore } from "@/lib/utils";
import { saveQuizResult } from "@/lib/supabase/queries";
import { useLocalProgress } from "@/hooks/useLocalProgress";
import { useSound } from "@/hooks/useSound";

export default function QuizPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showAnswer, setShowAnswer] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const { update } = useLocalProgress();
  const { play } = useSound();

  const total = quizQuestions.length;
  const current = quizQuestions[step];
  const selected = answers[current.id];

  const correct = useMemo(
    () =>
      quizQuestions.filter((q) => answers[q.id] === q.correctIndex).length,
    [answers]
  );
  const score = formatScore(correct, total);
  const progressPercent = Math.round(((step + (showAnswer ? 1 : 0)) / total) * 100);

  useEffect(() => {
    if (showResult) {
      update("quiz", score);
      // fire and forget
      saveQuizResult({ score, correct, total }).catch(() => {});
    }
  }, [showResult, score, correct, total, update]);

  function selectOption(i: number) {
    if (showAnswer) return;
    play("click");
    setAnswers((prev) => ({ ...prev, [current.id]: i }));
  }

  function check() {
    if (selected === undefined) return;
    setShowAnswer(true);
    play(selected === current.correctIndex ? "success" : "error");
  }

  function next() {
    if (step < total - 1) {
      setStep(step + 1);
      setShowAnswer(false);
      play("click");
    } else {
      setShowResult(true);
    }
  }

  function prev() {
    if (step > 0) {
      setStep(step - 1);
      setShowAnswer(false);
      play("click");
    }
  }

  function retry() {
    setStep(0);
    setAnswers({});
    setShowAnswer(false);
    setShowResult(false);
  }

  return (
    <section className="relative">
      <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" />
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <SectionHeading
          eyebrow="Quiz"
          title="Uji Pemahamanmu"
          subtitle="Jawab pertanyaan berikut. Skor dan feedback akan muncul di akhir."
        />

        <div className="mt-8">
          <ProgressBar value={progressPercent} label="Progress quiz" />
        </div>

        <div className="mt-6">
          <AnimatePresence mode="wait">
            <QuizCard
              key={current.id}
              question={current}
              index={step}
              total={total}
              selected={selected}
              onSelect={selectOption}
              showAnswer={showAnswer}
            />
          </AnimatePresence>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <Button variant="ghost" size="sm" onClick={prev} disabled={step === 0}>
            <ArrowLeft className="w-4 h-4" />
            Sebelumnya
          </Button>

          <div className="flex items-center gap-2">
            {!showAnswer ? (
              <Button onClick={check} disabled={selected === undefined}>
                Periksa Jawaban
              </Button>
            ) : step < total - 1 ? (
              <Button onClick={next}>
                Soal Berikutnya
                <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button onClick={next}>
                <Send className="w-4 h-4" />
                Selesaikan
              </Button>
            )}
          </div>
        </div>
      </div>

      <QuizResultModal
        open={showResult}
        onClose={() => setShowResult(false)}
        score={score}
        correct={correct}
        total={total}
        onRetry={retry}
      />
    </section>
  );
}
