import type { QuizQuestion } from "@/types";

export const quizQuestions: QuizQuestion[] = [
  {
    id: "q1",
    question: "Apa yang dimaksud dengan tata letak kantor?",
    options: [
      "Sistem keamanan kantor",
      "Penyusunan perabot, mesin, dan perlengkapan kantor pada tempat yang tepat",
      "Daftar inventaris perusahaan",
      "Struktur organisasi karyawan",
    ],
    correctIndex: 1,
    explanation:
      "Tata letak kantor adalah penyusunan perabot dan perlengkapan agar pekerjaan berjalan efisien.",
  },
  {
    id: "q2",
    question: "Manakah berikut ini yang BUKAN tujuan tata letak kantor?",
    options: [
      "Memperlancar arus pekerjaan",
      "Memberikan kenyamanan karyawan",
      "Meningkatkan harga jual produk",
      "Memudahkan pengawasan pimpinan",
    ],
    correctIndex: 2,
    explanation:
      "Harga jual produk tidak berkaitan langsung dengan tata letak kantor.",
  },
  {
    id: "q3",
    question: "Tata letak kantor di mana semua karyawan berada dalam satu ruangan besar tanpa sekat permanen disebut?",
    options: ["Closed plan", "Open plan", "Hybrid plan", "Modular plan"],
    correctIndex: 1,
    explanation: "Open plan memungkinkan komunikasi mudah dan pengawasan terbuka.",
  },
  {
    id: "q4",
    question: "Ruangan apa yang sebaiknya berada paling dekat dengan pintu masuk kantor?",
    options: ["Director Room", "Finance Room", "Receptionist", "Meeting Room"],
    correctIndex: 2,
    explanation: "Receptionist menjadi titik pertama interaksi tamu sehingga harus dekat pintu masuk.",
  },
  {
    id: "q5",
    question: "Mengapa Finance Room sebaiknya memiliki tingkat privasi yang tinggi?",
    options: [
      "Agar nyaman bagi tamu",
      "Karena menyimpan data dan dokumen keuangan rahasia",
      "Karena ruangannya kecil",
      "Agar dekat dengan workspace",
    ],
    correctIndex: 1,
    explanation: "Finance menangani data keuangan sensitif yang memerlukan keamanan ekstra.",
  },
  {
    id: "q6",
    question: "Konsep Activity Based Working (ABW) memungkinkan karyawan untuk?",
    options: [
      "Bekerja dari rumah saja",
      "Memiliki meja tetap di satu tempat",
      "Memilih area kerja sesuai aktivitasnya",
      "Tidak mengikuti rapat",
    ],
    correctIndex: 2,
    explanation: "ABW memberi fleksibilitas memilih area sesuai jenis pekerjaan saat itu.",
  },
  {
    id: "q7",
    question: "Manakah pernyataan yang BENAR tentang Meeting Room?",
    options: [
      "Sebaiknya jauh dari workspace",
      "Idealnya dekat dengan workspace agar tim mudah berkumpul",
      "Harus selalu di lantai berbeda",
      "Tidak memerlukan layar presentasi",
    ],
    correctIndex: 1,
    explanation: "Akses cepat dari workspace meningkatkan efisiensi rapat.",
  },
  {
    id: "q8",
    question: "Keuntungan utama tata letak terbuka (open plan) adalah?",
    options: [
      "Privasi karyawan tinggi",
      "Kebisingan lebih rendah",
      "Komunikasi & kolaborasi lebih mudah",
      "Setiap karyawan punya ruangan pribadi",
    ],
    correctIndex: 2,
    explanation: "Open plan memudahkan komunikasi langsung antar karyawan.",
  },
];
