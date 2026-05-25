import type { OfficeRoom, DraggableBlock } from "@/types";

export const officeRooms: OfficeRoom[] = [
  {
    id: "receptionist",
    name: "Receptionist",
    function: "Menerima tamu dan mengarahkan pengunjung.",
    description:
      "Area depan kantor yang menjadi titik pertama interaksi tamu. Ditempatkan dekat pintu masuk untuk memudahkan akses.",
    activities: [
      "Menerima tamu dan klien",
      "Menjawab telepon masuk",
      "Mengelola buku tamu dan jadwal kunjungan",
    ],
    gridArea: "1 / 1 / span 2 / span 3",
    color: "sky",
    icon: "ConciergeBell",
  },
  {
    id: "meeting",
    name: "Meeting Room",
    function: "Tempat rapat dan diskusi tim.",
    description:
      "Ruang rapat dengan meja besar dan layar presentasi. Diletakkan dekat workspace agar tim mudah berkumpul.",
    activities: [
      "Rapat koordinasi mingguan",
      "Presentasi proyek kepada klien",
      "Brainstorming antar divisi",
    ],
    gridArea: "1 / 4 / span 2 / span 4",
    color: "brand",
    icon: "Presentation",
  },
  {
    id: "director",
    name: "Director Room",
    function: "Ruang pimpinan untuk keputusan strategis.",
    description:
      "Ruangan eksklusif pimpinan, biasanya berada di ujung dengan privasi tinggi dan akses ke meeting room.",
    activities: [
      "Pengambilan keputusan strategis",
      "Pertemuan dengan stakeholder",
      "Review kinerja perusahaan",
    ],
    gridArea: "1 / 8 / span 2 / span 5",
    color: "indigo",
    icon: "Crown",
  },
  {
    id: "hr",
    name: "HR Room",
    function: "Mengelola karyawan & rekrutmen.",
    description:
      "Ruang untuk wawancara, konseling karyawan, dan administrasi SDM. Memerlukan privasi yang baik.",
    activities: [
      "Wawancara kandidat baru",
      "Onboarding karyawan",
      "Konseling & evaluasi",
    ],
    gridArea: "3 / 1 / span 2 / span 3",
    color: "cyan",
    icon: "Users",
  },
  {
    id: "workspace",
    name: "Workspace Area",
    function: "Area kerja utama karyawan.",
    description:
      "Area terbuka tempat karyawan menjalankan tugas harian. Biasanya menjadi area paling luas di kantor.",
    activities: [
      "Pekerjaan operasional harian",
      "Kolaborasi tim kecil",
      "Komunikasi antar pegawai",
    ],
    gridArea: "3 / 4 / span 2 / span 6",
    color: "blue",
    icon: "Laptop2",
  },
  {
    id: "finance",
    name: "Finance Room",
    function: "Mengatur keuangan & pembukuan.",
    description:
      "Ruangan untuk tim finance dengan keamanan ekstra. Idealnya dekat dengan ruang direktur untuk pelaporan.",
    activities: [
      "Pembukuan & jurnal harian",
      "Rekonsiliasi rekening",
      "Pelaporan keuangan bulanan",
    ],
    gridArea: "3 / 10 / span 2 / span 3",
    color: "teal",
    icon: "Wallet",
  },
];

// For the drag & drop simulation: simpler block layout on a 4x4 grid
export const draggableBlocks: DraggableBlock[] = [
  {
    id: "receptionist",
    label: "Receptionist",
    ideal: { row: 0, col: 0 },
    hint: "Receptionist sebaiknya di dekat pintu masuk (pojok depan).",
    icon: "ConciergeBell",
  },
  {
    id: "meeting",
    label: "Meeting Room",
    ideal: { row: 0, col: 2 },
    hint: "Meeting Room idealnya berdekatan dengan workspace agar tim mudah berkumpul.",
    icon: "Presentation",
  },
  {
    id: "workspace",
    label: "Workspace",
    ideal: { row: 1, col: 1 },
    hint: "Workspace ditempatkan di tengah agar arus kerja efisien dan mudah diakses semua divisi.",
    icon: "Laptop2",
  },
  {
    id: "hr",
    label: "HR Room",
    ideal: { row: 1, col: 0 },
    hint: "HR Room sebaiknya tidak terlalu jauh dari receptionist untuk wawancara kandidat.",
    icon: "Users",
  },
  {
    id: "finance",
    label: "Finance",
    ideal: { row: 2, col: 3 },
    hint: "Finance memerlukan privasi & keamanan, letakkan agak terpisah.",
    icon: "Wallet",
  },
  {
    id: "director",
    label: "Director",
    ideal: { row: 0, col: 3 },
    hint: "Director Room ideal di pojok dengan privasi tinggi dan dekat meeting room.",
    icon: "Crown",
  },
];
