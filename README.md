# Simulasi Interaktif Tata Letak Kantor

> Media pembelajaran modern untuk memahami konsep **tata letak kantor** melalui simulasi interaktif berbasis web.

---

## DAFTAR ISI

1. [Gambaran Umum](#gambaran-umum)
2. [Teknologi yang Digunakan](#teknologi-yang-digunakan)
3. [Struktur Folder & Penjelasan Per File](#struktur-folder--penjelasan-per-file)
4. [Alur Kerja Aplikasi](#alur-kerja-aplikasi)
5. [Alur Data (Database)](#alur-data-database)
6. [Cara Menjalankan](#cara-menjalankan)
7. [Panduan Admin Panel](#panduan-admin-panel)
8. [Materi Presentasi](#materi-presentasi)

---

## Gambaran Umum

Aplikasi ini adalah website pembelajaran interaktif tentang **tata letak kantor** (office layout). Pengguna bisa:
- Membaca materi tentang pengertian, tujuan, jenis tata letak kantor
- Melihat simulasi denah kantor interaktif (klik ruangan untuk lihat detail)
- Bermain drag & drop menyusun ruangan kantor
- Mengerjakan quiz untuk menguji pemahaman
- Admin bisa mengelola materi dan quiz lewat halaman admin

---

## Teknologi yang Digunakan

| Teknologi | Fungsi | Penjelasan Sederhana |
|-----------|--------|---------------------|
| **Next.js 14** | Framework utama | "Mesin" yang menjalankan website |
| **TypeScript** | Bahasa pemrograman | JavaScript yang lebih aman (ada pengecekan tipe data) |
| **Tailwind CSS** | Styling/tampilan | Cara cepat membuat tampilan cantik tanpa menulis CSS manual |
| **Framer Motion** | Animasi | Membuat elemen bergerak halus (fade in, slide, dll) |
| **@dnd-kit** | Drag & Drop | Library untuk fitur seret-dan-lepas |
| **Supabase** | Database online | Tempat menyimpan data materi, quiz, dan hasil quiz |
| **Lucide React** | Ikon | Kumpulan ikon cantik (buku, target, dll) |
| **next-themes** | Dark mode | Fitur ganti tema gelap/terang |

---

## Struktur Folder & Penjelasan Per File

### 📁 `app/` — Halaman-halaman Website

| File | Fungsi |
|------|--------|
| `app/layout.tsx` | **Kerangka utama** — mengatur font, tema, dan menentukan kapan Navbar/Footer tampil |
| `app/page.tsx` | **Halaman utama (Landing Page)** — halaman pertama yang dilihat pengunjung |
| `app/globals.css` | **Styling global** — warna, efek kaca (glassmorphism), gradient |
| `app/loading.tsx` | **Animasi loading** — muncul saat halaman sedang dimuat |
| `app/not-found.tsx` | **Halaman 404** — muncul kalau URL tidak ditemukan |
| `app/materi/page.tsx` | **Halaman Materi** — menampilkan accordion materi dari database |
| `app/simulasi/page.tsx` | **Halaman Simulasi** — denah kantor interaktif, klik ruangan untuk lihat detail |
| `app/drag-drop/page.tsx` | **Halaman Drag & Drop** — susun ruangan kantor dengan seret-lepas |
| `app/quiz/page.tsx` | **Halaman Quiz** — soal pilihan ganda dengan skor dan pembahasan |

### 📁 `app/admin/` — Halaman Admin (Khusus Pengelola)

| File | Fungsi |
|------|--------|
| `app/admin/layout.tsx` | **Kerangka admin** — sidebar navigasi + cek login (kalau belum login, redirect ke login) |
| `app/admin/login/page.tsx` | **Halaman Login Admin** — form email & password |
| `app/admin/page.tsx` | **Dashboard Admin** — statistik: total materi, total soal, jumlah pengerjaan quiz, rata-rata skor |
| `app/admin/materi/page.tsx` | **Kelola Materi** — tambah, edit, hapus materi pembelajaran |
| `app/admin/quiz/page.tsx` | **Kelola Quiz** — tambah, edit, hapus soal quiz |

### 📁 `components/` — Komponen (Bagian-bagian Kecil yang Bisa Dipakai Ulang)

| Folder/File | Fungsi |
|-------------|--------|
| `components/layout/Navbar.tsx` | **Menu navigasi atas** — link ke Materi, Simulasi, Quiz |
| `components/layout/Footer.tsx` | **Footer** — informasi di bagian bawah halaman |
| `components/layout/LayoutShell.tsx` | **Pengatur tampilan** — menyembunyikan Navbar/Footer di halaman admin |
| `components/landing/Hero.tsx` | **Bagian hero** — judul besar dan tombol CTA di landing page |
| `components/landing/Features.tsx` | **Bagian fitur** — kartu-kartu fitur di landing page |
| `components/landing/AnimatedOffice.tsx` | **Ilustrasi kantor animasi** — gambar SVG bergerak |
| `components/materi/Accordion.tsx` | **Accordion** — materi yang bisa dibuka-tutup (klik judul → isi muncul) |
| `components/simulation/OfficeRoomBlock.tsx` | **Blok ruangan** — kotak ruangan di denah yang bisa diklik |
| `components/simulation/RoomDetail.tsx` | **Detail ruangan** — popup/modal info ruangan (fungsi, aktivitas) |
| `components/simulation/Minimap.tsx` | **Peta kecil** — minimap denah kantor |
| `components/dnd/DraggableItem.tsx` | **Item yang bisa diseret** — blok ruangan di fitur drag & drop |
| `components/dnd/DropCell.tsx` | **Area tempat meletakkan** — kotak grid tempat menjatuhkan item |
| `components/quiz/QuizCard.tsx` | **Kartu soal** — menampilkan pertanyaan dan pilihan jawaban |
| `components/quiz/QuizResultModal.tsx` | **Popup hasil quiz** — skor akhir dan motivasi |
| `components/ui/Button.tsx` | **Tombol** — tombol yang dipakai di seluruh aplikasi |
| `components/ui/Modal.tsx` | **Popup** — jendela popup yang muncul di tengah layar |
| `components/ui/ProgressBar.tsx` | **Bar progress** — menunjukkan sejauh mana progress quiz |
| `components/ui/SectionHeading.tsx` | **Judul section** — judul dengan eyebrow text dan subtitle |
| `components/ui/ThemeToggle.tsx` | **Tombol tema** — ganti mode gelap/terang |
| `components/providers/ThemeProvider.tsx` | **Provider tema** — mengatur sistem dark mode |

### 📁 `data/` — Data Statis (Cadangan/Fallback)

| File | Fungsi |
|------|--------|
| `data/materi.ts` | Data materi pembelajaran (dipakai kalau database tidak tersedia) |
| `data/rooms.ts` | Data ruangan kantor untuk simulasi & drag-drop |
| `data/quiz.ts` | Data soal quiz (cadangan kalau database kosong) |
| `data/features.ts` | Data fitur untuk landing page |

### 📁 `lib/` — Fungsi Pembantu & Koneksi Database

| File | Fungsi |
|------|--------|
| `lib/utils.ts` | **Fungsi utilitas** — penggabung class CSS (`cn()`), hitung skor |
| `lib/icons.ts` | **Mapping ikon** — menghubungkan nama ikon (teks) ke komponen ikon visual |
| `lib/supabase/client.ts` | **Koneksi database** — membuat koneksi ke Supabase |
| `lib/supabase/queries.ts` | **Query database** — semua fungsi baca/tulis data (login, CRUD materi, CRUD quiz, simpan hasil) |
| `lib/supabase/schema.sql` | **Struktur tabel** — SQL untuk membuat tabel di database |

### 📁 `hooks/` — Custom Hooks (Fungsi Khusus React)

| File | Fungsi |
|------|--------|
| `hooks/useLocalProgress.ts` | **Tracking progress** — menyimpan progress belajar di browser (localStorage) |
| `hooks/useSound.ts` | **Efek suara** — bunyi klik, benar, salah saat quiz |

### 📁 `types/` — Definisi Tipe Data

| File | Fungsi |
|------|--------|
| `types/index.ts` | Mendefinisikan bentuk data (MateriItem, QuizQuestion, OfficeRoom, dll) |

### 📄 File Konfigurasi (Root)

| File | Fungsi |
|------|--------|
| `package.json` | Daftar library yang dipakai + perintah menjalankan aplikasi |
| `tailwind.config.ts` | Konfigurasi warna, font, dan tema Tailwind CSS |
| `tsconfig.json` | Konfigurasi TypeScript |
| `next.config.mjs` | Konfigurasi Next.js |
| `.env.local` | **Rahasia** — URL dan key database (TIDAK boleh dibagikan) |

---

## Alur Kerja Aplikasi

### Alur Pengguna (User)

```
Buka Website
    │
    ▼
┌─────────────────┐
│  Landing Page   │  ← Lihat fitur, klik tombol mulai
└────────┬────────┘
         │
    ┌────┴────┬──────────┬──────────┐
    ▼         ▼          ▼          ▼
┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐
│ Materi │ │Simulasi│ │Drag&Drop│ │  Quiz  │
│        │ │        │ │        │ │        │
│Baca    │ │Klik    │ │Seret   │ │Jawab   │
│materi  │ │ruangan │ │ruangan │ │soal    │
│accordion│ │lihat   │ │ke posisi│ │lihat   │
│        │ │detail  │ │yang tepat│ │skor   │
└────────┘ └────────┘ └────────┘ └────────┘
```

### Alur Admin

```
Buka /admin/login
    │
    ▼
┌─────────────────┐
│  Login (Email   │
│  + Password)    │
└────────┬────────┘
         │ (berhasil)
         ▼
┌─────────────────┐
│   Dashboard     │  ← Lihat statistik
└────────┬────────┘
         │
    ┌────┴────┐
    ▼         ▼
┌────────┐ ┌────────┐
│ Kelola │ │ Kelola │
│ Materi │ │  Quiz  │
│        │ │        │
│Tambah  │ │Tambah  │
│Edit    │ │Edit    │
│Hapus   │ │Hapus   │
└────────┘ └────────┘
```

---

## Alur Data (Database)

```
┌──────────────────────────────────────────────────┐
│                  SUPABASE (Cloud)                  │
│                                                    │
│  ┌──────────┐  ┌───────────────┐  ┌───────────┐ │
│  │  materi  │  │ quiz_questions│  │quiz_results│ │
│  │          │  │               │  │            │ │
│  │- slug    │  │- question     │  │- score     │ │
│  │- title   │  │- options[]    │  │- correct   │ │
│  │- summary │  │- correct_index│  │- total     │ │
│  │- body[]  │  │- explanation  │  │- created_at│ │
│  │- icon    │  │- sort_order   │  │            │ │
│  └──────────┘  └───────────────┘  └───────────┘ │
│                                                    │
│  ┌──────────────┐                                 │
│  │user_progress │                                 │
│  │- module      │                                 │
│  │- completed   │                                 │
│  │- progress_%  │                                 │
│  └──────────────┘                                 │
└──────────────────────────────────────────────────┘
         ▲                    │
         │ (Admin tulis)      │ (User baca)
         │                    ▼
┌────────────────┐    ┌────────────────┐
│  Admin Panel   │    │ Halaman User   │
│  /admin/*      │    │ /materi, /quiz │
└────────────────┘    └────────────────┘
```

**Catatan penting:** Kalau database tidak tersedia (belum setup Supabase), aplikasi tetap jalan menggunakan data cadangan dari folder `data/`.

---

## Cara Menjalankan

### Prasyarat
- **Node.js** versi 18 atau lebih baru (download di nodejs.org)
- **npm** (otomatis terinstall bersama Node.js)

### Langkah-langkah

1. **Buka terminal/command prompt** di folder project

2. **Install dependencies** (library yang dibutuhkan):
   ```bash
   npm install
   ```

3. **Jalankan di mode development:**
   ```bash
   npm run dev
   ```

4. **Buka browser** → ketik `http://localhost:3000`

### Setup Database (Opsional)

1. Buat akun di [supabase.com](https://supabase.com)
2. Buat project baru
3. Buka **SQL Editor** → paste isi file `lib/supabase/schema.sql` → klik **Run**
4. Buka **Authentication** → **Users** → **Add User** (buat akun admin)
5. Copy URL dan Anon Key dari **Settings** → **API**
6. Buat file `.env.local` di root project:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
   ```
7. Restart dev server

---

## Panduan Admin Panel

1. Buka `http://localhost:3000/admin/login`
2. Masukkan email dan password yang sudah dibuat di Supabase
3. Setelah login, kamu bisa:
   - **Dashboard** — lihat statistik (total materi, soal, pengerjaan quiz)
   - **Materi** — tambah/edit/hapus materi pembelajaran
   - **Quiz** — tambah/edit/hapus soal quiz

### Menambah Materi Baru:
1. Klik tombol **+ Tambah**
2. Isi: Slug (id unik), Title, Icon (pilih dari dropdown), Summary, Body (paragraf-paragraf)
3. Klik **Simpan**

### Menambah Soal Quiz:
1. Klik tombol **+ Tambah Soal**
2. Isi pertanyaan, 4 pilihan jawaban
3. Klik lingkaran hijau di samping jawaban yang benar
4. Isi pembahasan
5. Klik **Simpan**

---

## Materi Presentasi

### Slide 1: Judul
```
SIMULASI INTERAKTIF TATA LETAK KANTOR
Media Pembelajaran Berbasis Web
[Nama Kelompok / Nama Mahasiswa]
[Mata Kuliah] — [Tahun]
```

### Slide 2: Latar Belakang
```
Masalah:
• Pembelajaran tata letak kantor masih berbasis teori (buku/slide)
• Mahasiswa sulit membayangkan penerapan nyata
• Tidak ada media interaktif untuk praktik langsung

Solusi:
• Website simulasi interaktif
• Bisa diklik, diseret, dan dicoba langsung
• Dilengkapi quiz untuk evaluasi pemahaman
```

### Slide 3: Tujuan
```
1. Membuat media pembelajaran interaktif tentang tata letak kantor
2. Membantu mahasiswa memahami fungsi tiap ruangan
3. Memberikan pengalaman menyusun layout kantor secara virtual
4. Menyediakan evaluasi pemahaman melalui quiz
```

### Slide 4: Fitur Utama
```
┌─────────────────────────────────────────┐
│ 1. MATERI        → Accordion interaktif │
│ 2. SIMULASI      → Denah kantor klik    │
│ 3. DRAG & DROP   → Susun ruangan        │
│ 4. QUIZ          → Uji pemahaman        │
│ 5. ADMIN PANEL   → Kelola konten        │
│ 6. DARK MODE     → Nyaman di mata       │
└─────────────────────────────────────────┘
```

### Slide 5: Teknologi
```
• Next.js 14 — Framework web modern
• TypeScript — Bahasa pemrograman yang aman
• Tailwind CSS — Styling cepat dan responsif
• Framer Motion — Animasi halus
• Supabase — Database cloud gratis
• Vercel — Hosting gratis
```

### Slide 6: Arsitektur Sistem
```
[Browser User] ←→ [Next.js App] ←→ [Supabase Database]
                        ↑
               [Browser Admin] (kelola konten)
```

### Slide 7: Demo Aplikasi
```
(Tampilkan live demo atau screenshot)
1. Landing Page
2. Halaman Materi (accordion)
3. Simulasi (klik ruangan)
4. Drag & Drop (susun layout)
5. Quiz (jawab soal)
6. Admin Panel (kelola konten)
```

### Slide 8: Halaman Admin
```
• Login dengan email & password
• Dashboard statistik
• CRUD Materi (Tambah, Edit, Hapus)
• CRUD Quiz (Tambah, Edit, Hapus soal)
• Data langsung tampil di halaman user
```

### Slide 9: Database
```
Tabel di Supabase:
┌──────────────────┬────────────────────────────┐
│ materi           │ Menyimpan materi pelajaran │
│ quiz_questions   │ Menyimpan soal quiz        │
│ quiz_results     │ Menyimpan hasil quiz user  │
│ user_progress    │ Tracking progress belajar  │
└──────────────────┴────────────────────────────┘
```

### Slide 10: Kelebihan
```
✓ Interaktif — bukan sekadar baca, tapi praktik langsung
✓ Responsif — bisa diakses dari HP maupun laptop
✓ Modern — tampilan premium dengan animasi halus
✓ Mudah dikelola — admin bisa update konten tanpa coding
✓ Gratis hosting — deploy di Vercel tanpa biaya
✓ Fallback — tetap jalan walau tanpa database
```

### Slide 11: Kesimpulan
```
• Berhasil membuat media pembelajaran interaktif tata letak kantor
• Mahasiswa bisa belajar sambil praktik menyusun layout
• Admin bisa mengelola konten secara mandiri
• Aplikasi siap digunakan dan di-deploy online
```

### Slide 12: Terima Kasih & QnA
```
Terima Kasih!

Link Demo: [URL Vercel]
Repository: [URL GitHub]

Ada pertanyaan?
```

---

## Catatan Tambahan

### Warna yang Digunakan
| Warna | Kode | Dipakai untuk |
|-------|------|---------------|
| Biru tua | `#1D4ED8` | Tombol hover |
| Biru utama | `#2563EB` | Warna utama (primary) |
| Biru muda | `#3B82F6` | Gradient |
| Biru langit | `#60A5FA` | Aksen |
| Gelap | `#0F172A` | Background dark mode |

### Ikon yang Tersedia (untuk Admin)
BookOpen, Target, LayoutGrid, Network, Building2, Users, Laptop2, Presentation, Coffee, Crown, Lightbulb, GraduationCap, Trophy, Sparkles, Heart, Activity, Archive, ConciergeBell, Eye, MessageCircle, Phone, Printer, Server, Wallet, Wrench

---

## License

Educational use — UAS Project.
