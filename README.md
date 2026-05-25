# Simulasi Interaktif Tata Letak Kantor

> Media pembelajaran modern untuk memahami konsep **tata letak kantor** melalui simulasi interaktif berbasis web. Proyek UAS dengan UI premium, glassmorphism, dan animasi halus.

![Tech](https://img.shields.io/badge/Next.js-14-000?logo=next.js)
![TS](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![Tailwind](https://img.shields.io/badge/TailwindCSS-3-38BDF8?logo=tailwindcss)
![FM](https://img.shields.io/badge/Framer%20Motion-11-FF0080)

## Fitur

- **Landing page** dengan hero, ilustrasi kantor animatif (SVG + Framer Motion), dan section fitur
- **Materi page** dengan accordion expandable (Pengertian, Tujuan, Jenis, Fungsi Divisi)
- **Simulasi Interaktif** — denah kantor dengan 6 ruangan yang bisa diklik (Receptionist, Meeting, HR, Finance, Workspace, Director). Tiap ruangan menampilkan modal detail (fungsi, deskripsi, aktivitas)
- **Drag & Drop Layout** dengan `@dnd-kit` — snap-to-grid + feedback edukatif (mis. _“Posisi ruang meeting terlalu jauh dari workspace.”_)
- **Quiz** pilihan ganda dengan skor, pembahasan, hasil akhir + modal feedback motivasional
- **Dark mode** (next-themes) dengan blue gradient palette
- **Sound interaction** ringan (WebAudio, tanpa file aset)
- **Progress bar & achievement badges** (per modul)
- **Office layout minimap** di halaman simulasi
- **Supabase integration** — sudah disiapkan tabel `quiz_results` & `user_progress` (skema SQL terlampir). App tetap jalan tanpa Supabase (fallback ke dummy data + localStorage).
- Responsif desktop & mobile, SEO-friendly, accessible (semantic HTML, ARIA labels, keyboard support)

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion**
- **@dnd-kit/core**
- **next-themes** (dark mode)
- **lucide-react** (icons)
- **Supabase** (opsional — siap diintegrasikan)

## Color Palette

| Token            | Hex        | Pakai untuk              |
| ---------------- | ---------- | ------------------------ |
| brand-700        | `#1D4ED8`  | aksen gelap, button hover |
| **brand-600**    | `#2563EB`  | primary                  |
| **brand-500**    | `#3B82F6`  | gradient mid             |
| **brand-400**    | `#60A5FA`  | gradient end             |
| **sky-500**      | `#0EA5E9`  | accent                   |
| **sky-400**      | `#38BDF8`  | accent                   |
| ink-900 / 800 / 700 | `#0F172A` / `#111827` / `#1E293B` | dark mode |

## Project Structure

```
simulasi-tata-letak-kantor/
├── app/
│   ├── layout.tsx           # Root layout + ThemeProvider + Navbar/Footer
│   ├── page.tsx             # Landing
│   ├── globals.css          # Tailwind + glass utilities
│   ├── not-found.tsx
│   ├── materi/page.tsx
│   ├── simulasi/page.tsx    # Interactive office simulation
│   ├── drag-drop/page.tsx   # Drag & drop layout
│   └── quiz/page.tsx
├── components/
│   ├── layout/              # Navbar, Footer
│   ├── landing/             # Hero, Features, CTASection, AnimatedOffice
│   ├── materi/              # Accordion
│   ├── simulation/          # OfficeRoomBlock, RoomDetail, Minimap
│   ├── dnd/                 # DraggableItem, DropCell
│   ├── quiz/                # QuizCard, QuizResultModal
│   ├── providers/           # ThemeProvider
│   └── ui/                  # Button, Card, Modal, Badge, ProgressBar, ThemeToggle, SectionHeading
├── data/
│   ├── materi.ts            # Materi pembelajaran
│   ├── rooms.ts             # Office rooms + draggable blocks
│   ├── quiz.ts              # Pertanyaan quiz
│   └── features.ts
├── hooks/
│   ├── useLocalProgress.ts  # Tracking progress (localStorage)
│   └── useSound.ts          # Sound feedback (WebAudio)
├── lib/
│   ├── utils.ts             # cn(), score helpers
│   └── supabase/
│       ├── client.ts
│       ├── queries.ts
│       └── schema.sql       # Tabel quiz_results & user_progress
├── types/
│   └── index.ts
├── tailwind.config.ts
├── tsconfig.json
└── next.config.mjs
```

## Setup

### 1. Install dependencies

```bash
npm install
# atau
yarn install
# atau
pnpm install
```

### 2. (Opsional) Konfigurasi Supabase

Salin `.env.example` jadi `.env.local`:

```bash
cp .env.example .env.local
```

Isi:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
```

Buka **Supabase → SQL Editor**, tempel isi `lib/supabase/schema.sql`, lalu **Run**. Tabel `quiz_results` & `user_progress` siap digunakan.

> Tanpa env tersebut, aplikasi tetap berjalan menggunakan dummy data.

### 3. Jalankan dev server

```bash
npm run dev
```

Buka `http://localhost:3000`.

### 4. Production build

```bash
npm run build
npm start
```

## Deploy ke Vercel

1. Push repo ini ke GitHub.
2. Buka [vercel.com](https://vercel.com/) → **New Project** → import repo.
3. Vercel otomatis mendeteksi Next.js. Klik **Deploy**.
4. (Opsional) Tambahkan env var di **Project Settings → Environment Variables**:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Selesai. URL produksi siap dibagikan.

Atau pakai Vercel CLI:

```bash
npm i -g vercel
vercel
vercel --prod
```

## Roadmap / Bonus Ideas

- [x] Dark mode
- [x] Sound interaction
- [x] Progress bar
- [x] Office layout minimap
- [x] Achievement badges (Office Explorer, Layout Master)
- [ ] Multi-floor simulation
- [ ] Auth (Supabase)
- [ ] Leaderboard quiz

## License

Educational use — UAS Project.
