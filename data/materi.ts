import type { MateriItem } from "@/types";

export const materiData: MateriItem[] = [
  {
    id: "pengertian",
    title: "Pengertian Tata Letak Kantor",
    summary:
      "Pengaturan dan penempatan ruang, perabot, serta peralatan kantor pada area yang tersedia.",
    icon: "BookOpen",
    body: [
      "Tata letak kantor (office layout) adalah penyusunan perabot, mesin, dan perlengkapan kantor pada tempat yang tepat sehingga karyawan dapat bekerja dengan baik, nyaman, leluasa, dan bebas bergerak.",
      "Penataan yang baik membantu memperlancar arus pekerjaan, menghemat ruang, serta meningkatkan efisiensi kerja organisasi secara keseluruhan.",
      "Menurut para ahli, tata letak kantor mencakup penempatan optimal antar elemen kerja agar setiap aktivitas berlangsung sistematis.",
    ],
  },
  {
    id: "tujuan",
    title: "Tujuan Tata Letak Kantor",
    summary:
      "Memaksimalkan efisiensi, kenyamanan, dan produktivitas kerja di lingkungan kantor.",
    icon: "Target",
    body: [
      "Memanfaatkan ruangan kantor secara efisien dan efektif.",
      "Memperlancar arus pekerjaan dan komunikasi antar divisi.",
      "Memberikan kenyamanan dan keamanan bagi karyawan.",
      "Memberikan kesan profesional kepada tamu dan klien.",
      "Memudahkan pengawasan oleh pimpinan terhadap aktivitas pegawai.",
    ],
  },
  {
    id: "jenis",
    title: "Jenis Tata Letak Kantor",
    summary:
      "Tata letak terbuka, tertutup, gabungan, hingga konsep modern berbasis aktivitas.",
    icon: "LayoutGrid",
    body: [
      "Tata letak terbuka (open plan): Semua karyawan bekerja dalam satu ruangan besar tanpa sekat permanen. Memudahkan komunikasi dan pengawasan.",
      "Tata letak tertutup (closed plan): Tiap divisi memiliki ruangan sendiri yang dipisah dinding. Memberikan privasi tinggi.",
      "Tata letak gabungan (semi open): Memadukan ruang terbuka untuk kolaborasi dan ruang tertutup untuk pekerjaan yang membutuhkan konsentrasi.",
      "Tata letak berbasis aktivitas (Activity Based Working): Karyawan memilih area kerja sesuai jenis aktivitas (focus, kolaborasi, santai).",
    ],
    layouts: [
      {
        name: "Tata Letak Terbuka (Open Plan)",
        image: "/images/layouts/open-plan.jpeg",
        diagramType: "open-plan",
        description:
          "Semua karyawan bekerja dalam satu ruangan besar tanpa sekat permanen. Cocok untuk tim yang membutuhkan komunikasi intensif.",
        kelebihan: [
          "Memudahkan komunikasi dan koordinasi antar karyawan",
          "Biaya pembangunan lebih hemat (tanpa sekat)",
          "Pengawasan oleh atasan lebih mudah",
          "Fleksibel dalam penataan ulang furniture",
        ],
        kekurangan: [
          "Tingkat kebisingan tinggi",
          "Kurang privasi bagi karyawan",
          "Mudah terganggu konsentrasi",
          "Risiko penyebaran penyakit lebih tinggi",
        ],
      },
      {
        name: "Tata Letak Tertutup (Closed Plan)",
        image: "/images/layouts/close-plan.jpeg",
        diagramType: "closed-plan",
        description:
          "Tiap divisi atau individu memiliki ruangan sendiri yang dipisahkan oleh dinding permanen.",
        kelebihan: [
          "Privasi tinggi untuk pekerjaan rahasia",
          "Konsentrasi kerja lebih terjaga",
          "Mengurangi kebisingan antar ruangan",
          "Cocok untuk pekerjaan yang membutuhkan fokus tinggi",
        ],
        kekurangan: [
          "Biaya pembangunan dan perawatan lebih mahal",
          "Komunikasi antar divisi kurang lancar",
          "Pengawasan lebih sulit dilakukan",
          "Penggunaan ruang kurang efisien",
        ],
      },
      {
        name: "Tata Letak Gabungan (Semi Open)",
        image: "/images/layouts/semi-open.jpeg",
        diagramType: "semi-open",
        description:
          "Kombinasi ruang terbuka untuk kolaborasi dan ruang tertutup untuk pekerjaan yang membutuhkan konsentrasi.",
        kelebihan: [
          "Keseimbangan antara kolaborasi dan privasi",
          "Fleksibel sesuai kebutuhan aktivitas",
          "Efisiensi ruang lebih optimal",
          "Karyawan bisa memilih area sesuai kebutuhan",
        ],
        kekurangan: [
          "Perencanaan desain lebih kompleks",
          "Biaya lebih tinggi dari open plan",
          "Perlu aturan penggunaan ruang yang jelas",
          "Potensi ketimpangan fasilitas antar area",
        ],
      },
      {
        name: "Tata Letak Berbasis Aktivitas (Activity Based Working)",
        image: "/images/layouts/activity-based.jpeg",
        diagramType: "activity-based",
        description:
          "Konsep modern di mana karyawan tidak memiliki meja tetap, melainkan memilih area kerja sesuai jenis aktivitas.",
        kelebihan: [
          "Sangat fleksibel dan adaptif",
          "Mendorong kreativitas dan kolaborasi",
          "Efisiensi penggunaan ruang maksimal",
          "Cocok untuk generasi kerja modern",
        ],
        kekurangan: [
          "Karyawan tidak punya ruang personal tetap",
          "Butuh teknologi pendukung (laptop, cloud)",
          "Perlu budaya kerja yang matang",
          "Tidak cocok untuk semua jenis pekerjaan",
        ],
      },
    ],
  },
  {
    id: "fungsi-divisi",
    title: "Fungsi Tiap Divisi Kantor",
    summary:
      "Setiap divisi memiliki peran yang saling melengkapi dalam menjalankan organisasi.",
    icon: "Network",
    body: [
      "Receptionist: Pintu pertama interaksi dengan tamu, menerima telepon, dan mengarahkan pengunjung.",
      "Meeting Room: Tempat rapat, presentasi, dan diskusi strategis antar tim.",
      "HR Room: Mengelola rekrutmen, pengembangan karyawan, dan hubungan industrial.",
      "Finance Room: Mengatur keuangan, pembukuan, dan pelaporan keuangan organisasi.",
      "Workspace Area: Tempat utama karyawan menjalankan tugas operasional sehari-hari.",
      "Director Room: Ruang pimpinan untuk pengambilan keputusan strategis.",
    ],
  },
];
