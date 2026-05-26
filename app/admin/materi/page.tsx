"use client";

import { useEffect, useState } from "react";
import { getMateriList, upsertMateri, deleteMateri } from "@/lib/supabase/queries";
import { Plus, Pencil, Trash2, X, Loader2 } from "lucide-react";

const iconOptions = [
  "BookOpen", "Target", "LayoutGrid", "Network", "Building2", "Users",
  "Laptop2", "Presentation", "Coffee", "Crown", "Lightbulb", "GraduationCap",
  "Trophy", "Sparkles", "Heart", "Activity", "Archive", "ConciergeBell",
  "Eye", "MessageCircle", "Phone", "Printer", "Server", "Wallet", "Wrench",
];

interface MateriRow {
  id: string;
  slug: string;
  title: string;
  summary: string;
  icon: string;
  body: string[];
  sort_order: number;
}

const emptyForm: Omit<MateriRow, "id"> & { id?: string } = {
  slug: "",
  title: "",
  summary: "",
  icon: "BookOpen",
  body: [""],
  sort_order: 0,
};

export default function AdminMateriPage() {
  const [items, setItems] = useState<MateriRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  async function load() {
    setLoading(true);
    const data = await getMateriList();
    setItems(data as MateriRow[]);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  function openNew() {
    setForm({ ...emptyForm, sort_order: items.length });
    setShowForm(true);
  }

  function openEdit(item: MateriRow) {
    setForm({ ...item });
    setShowForm(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await upsertMateri(form);
    setSaving(false);
    setShowForm(false);
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm("Hapus materi ini?")) return;
    await deleteMateri(id);
    load();
  }

  function updateBody(index: number, value: string) {
    const newBody = [...form.body];
    newBody[index] = value;
    setForm({ ...form, body: newBody });
  }

  function addBodyItem() {
    setForm({ ...form, body: [...form.body, ""] });
  }

  function removeBodyItem(index: number) {
    setForm({ ...form, body: form.body.filter((_, i) => i !== index) });
  }

  if (loading) return <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-slate-400" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Kelola Materi</h1>
        <button onClick={openNew} className="flex items-center gap-2 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-lg text-sm font-medium transition-colors">
          <Plus className="w-4 h-4" /> Tambah
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 dark:bg-slate-800">
            <tr>
              <th className="text-left px-4 py-3 font-medium">#</th>
              <th className="text-left px-4 py-3 font-medium">Title</th>
              <th className="text-left px-4 py-3 font-medium">Slug</th>
              <th className="text-left px-4 py-3 font-medium">Summary</th>
              <th className="text-right px-4 py-3 font-medium">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
            {items.map((item, i) => (
              <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="px-4 py-3">{i + 1}</td>
                <td className="px-4 py-3 font-medium">{item.title}</td>
                <td className="px-4 py-3 text-slate-500">{item.slug}</td>
                <td className="px-4 py-3 text-slate-500 max-w-xs truncate">{item.summary}</td>
                <td className="px-4 py-3 text-right space-x-2">
                  <button onClick={() => openEdit(item)} className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="p-1.5 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 text-red-500 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-slate-400">Belum ada materi</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">{form.id ? "Edit Materi" : "Tambah Materi"}</h2>
              <button onClick={() => setShowForm(false)}><X className="w-5 h-5" /></button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Slug</label>
                  <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} required className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Icon</label>
                  <select value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500">
                    {iconOptions.map((name) => (
                      <option key={name} value={name}>{name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Title</label>
                <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Summary</label>
                <textarea value={form.summary} onChange={(e) => setForm({ ...form, summary: e.target.value })} required rows={2} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none" />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-sm font-medium">Body (paragraf)</label>
                  <button type="button" onClick={addBodyItem} className="text-xs text-brand-600 hover:underline">+ Tambah paragraf</button>
                </div>
                <div className="space-y-2">
                  {form.body.map((item, i) => (
                    <div key={i} className="flex gap-2">
                      <textarea value={item} onChange={(e) => updateBody(i, e.target.value)} rows={2} className="flex-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none" />
                      {form.body.length > 1 && (
                        <button type="button" onClick={() => removeBodyItem(i)} className="text-red-400 hover:text-red-600 self-start mt-2">
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
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
