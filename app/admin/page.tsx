"use client";

import { useEffect, useState } from "react";
import { getMateriList, getQuizQuestions, getRecentQuizResults, getQuizResultsCount } from "@/lib/supabase/queries";
import { BookOpen, HelpCircle, Users, TrendingUp, Loader2 } from "lucide-react";
import type { QuizResult } from "@/types";

interface Stats {
  materiCount: number;
  quizCount: number;
  totalAttempts: number;
  avgScore: number;
  recentResults: QuizResult[];
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    async function load() {
      const [materi, quiz, results, count] = await Promise.all([
        getMateriList(),
        getQuizQuestions(),
        getRecentQuizResults(5),
        getQuizResultsCount(),
      ]);
      const avg = results.length > 0
        ? Math.round(results.reduce((s, r) => s + r.score, 0) / results.length)
        : 0;
      setStats({
        materiCount: materi.length,
        quizCount: quiz.length,
        totalAttempts: count,
        avgScore: avg,
        recentResults: results,
      });
    }
    load();
  }, []);

  if (!stats) return <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-slate-400" /></div>;

  const cards = [
    { label: "Total Materi", value: stats.materiCount, icon: BookOpen, color: "bg-blue-500" },
    { label: "Total Soal Quiz", value: stats.quizCount, icon: HelpCircle, color: "bg-indigo-500" },
    { label: "Quiz Attempts", value: stats.totalAttempts, icon: Users, color: "bg-teal-500" },
    { label: "Rata-rata Skor", value: `${stats.avgScore}%`, icon: TrendingUp, color: "bg-green-500" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <div key={card.label} className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg ${card.color} flex items-center justify-center`}>
                <card.icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold">{card.value}</p>
                <p className="text-xs text-slate-500">{card.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Quiz Results */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 p-4">
        <h2 className="font-semibold mb-3">Hasil Quiz Terbaru</h2>
        {stats.recentResults.length === 0 ? (
          <p className="text-sm text-slate-400">Belum ada data</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-500">
                  <th className="pb-2 font-medium">Waktu</th>
                  <th className="pb-2 font-medium">Skor</th>
                  <th className="pb-2 font-medium">Benar</th>
                  <th className="pb-2 font-medium">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                {stats.recentResults.map((r) => (
                  <tr key={r.id}>
                    <td className="py-2 text-slate-500">{r.created_at ? new Date(r.created_at).toLocaleString("id-ID") : "-"}</td>
                    <td className="py-2 font-medium">{r.score}%</td>
                    <td className="py-2">{r.correct}</td>
                    <td className="py-2">{r.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
