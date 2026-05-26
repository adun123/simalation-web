"use client";

import { useEffect, useState } from "react";
import { getQuizQuestions, upsertQuizQuestion, deleteQuizQuestion } from "@/lib/supabase/queries";
import { Plus, Pencil, Trash2, X, Loader2, CheckCircle2 } from "lucide-react";

interface QuizRow {
  id: string;
  question: string;
  options: string[];
  correct_index: number;
  explanation: string;
  sort_order: number;
}

const emptyForm: Omit<QuizRow, "id"> & { id?: string } = {
  question: "",
  options: ["", "", "", ""],
  correct_index: 0,
  explanation: "",
  sort_order: 0,
};

export default function AdminQuizPage() {
  const [items, setItems] = useState<QuizRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  async function load() {
    setLoading(true);
    const data = await getQuizQuestions();
    setItems(data as QuizRow[]);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  function openNew() {
    setForm({ ...emptyForm, sort_order: items.length });
    setShowForm(true);
  }

  function openEdit(item: QuizRow) {
    setForm({ ...item, options: [...item.options] });
    setShowForm(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await upsertQuizQuestion(form);
    setSaving(false);
    setShowForm(false);
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm("Hapus soal ini?")) return;
    await deleteQuizQuestion(id);
    load();
  }

  function updateOption(index: number, value: string) {
    const newOpts = [...form.options];
    newOpts[index] = value;
    setForm({ ...form, options: newOpts });
  }

  if (loading) return <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-slate-400" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Kelola Quiz</h1>
        <button onClick={openNew} className="flex items-center gap-2 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-lg text-sm font-medium transition-colors">
          <Plus className="w-4 h-4" /> Tambah Soal
        </button>
      </div>

      {/* List */}
      <div className="space-y-3">
        {items.map((item, i) => (
          <div key={item.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm">
                  <span className="text-slate-400 mr-2">{i + 1}.</span>
                  {item.question}
                </p>
                <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-1">
                  {item.options.map((opt, oi) => (
                    <span key={oi} className={`text-xs px-2 py-1 rounded ${oi === item.correct_index ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 font-medium" : "text-slate-500"}`}>
                      {oi === item.correct_index && <CheckCircle2 className="w-3 h-3 inline mr-1" />}
                      {opt}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-1 shrink-0">
                <button onClick={() => openEdit(item)} className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                  <Pencil className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(item.id)} className="p-1.5 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 text-red-500 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <p className="text-center text-slate-400 py-8">Belum ada soal quiz</p>
        )}
      </div>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">{form.id ? "Edit Soal" : "Tambah Soal"}</h2>
              <button onClick={() => setShowForm(false)}><X className="w-5 h-5" /></button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Pertanyaan</label>
                <textarea value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} required rows={3} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none" />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Pilihan Jawaban</label>
                <div className="space-y-2">
                  {form.options.map((opt, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setForm({ ...form, correct_index: i })}
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${i === form.correct_index ? "border-green-500 bg-green-500 text-white" : "border-slate-300 dark:border-slate-600"}`}
                      >
                        {i === form.correct_index && <CheckCircle2 className="w-4 h-4" />}
                      </button>
                      <input
                        value={opt}
                        onChange={(e) => updateOption(i, e.target.value)}
                        required
                        placeholder={`Pilihan ${String.fromCharCode(65 + i)}`}
                        className="flex-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                      />
                    </div>
                  ))}
                </div>
                <p className="text-xs text-slate-400 mt-1">Klik lingkaran untuk memilih jawaban benar</p>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Pembahasan</label>
                <textarea value={form.explanation} onChange={(e) => setForm({ ...form, explanation: e.target.value })} required rows={2} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none" />
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Sort Order</label>
                <input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })} className="w-20 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
              </div>

              <button type="submit" disabled={saving} className="w-full py-2.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                {form.id ? "Update" : "Simpan"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
