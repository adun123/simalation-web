import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <section className="min-h-[60vh] grid place-items-center px-4">
      <div className="text-center max-w-md">
        <div className="text-7xl font-extrabold text-gradient">404</div>
        <h1 className="mt-2 text-2xl font-bold">Halaman tidak ditemukan</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Sepertinya kamu salah lorong di kantor kami. Yuk kembali ke beranda.
        </p>
        <Link href="/" className="btn-primary mt-6 inline-flex">
          <Home className="w-4 h-4" />
          Kembali ke Beranda
        </Link>
      </div>
    </section>
  );
}
