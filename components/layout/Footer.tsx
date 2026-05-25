import Link from "next/link";
import { Building2, Github, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-white/40 dark:border-white/5 bg-white/40 dark:bg-ink-900/40 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid md:grid-cols-3 gap-8">
        <div>
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-brand-gradient grid place-items-center shadow-glow">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-gradient">TataLetak.id</span>
          </Link>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Media pembelajaran modern untuk memahami konsep tata letak kantor
            melalui simulasi interaktif berbasis web.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-slate-900 dark:text-white">
            Pelajari
          </h4>
          <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <li>
              <Link href="/materi" className="hover:text-brand-600 dark:hover:text-brand-300">
                Materi
              </Link>
            </li>
            <li>
              <Link href="/simulasi" className="hover:text-brand-600 dark:hover:text-brand-300">
                Simulasi Kantor
              </Link>
            </li>
            <li>
              <Link href="/drag-drop" className="hover:text-brand-600 dark:hover:text-brand-300">
                Drag & Drop
              </Link>
            </li>
            <li>
              <Link href="/quiz" className="hover:text-brand-600 dark:hover:text-brand-300">
                Quiz
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-slate-900 dark:text-white">
            Kontak
          </h4>
          <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4" /> uas@kampus.ac.id
            </li>
            <li className="flex items-center gap-2">
              <Github className="w-4 h-4" /> github.com/uas-project
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/40 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-xs text-slate-500 dark:text-slate-400 flex flex-col sm:flex-row justify-between gap-2">
          <p>© {new Date().getFullYear()} TataLetak.id — Proyek UAS.</p>
          <p>Built with Next.js, Tailwind & Framer Motion.</p>
        </div>
      </div>
    </footer>
  );
}
