export interface Feature {
  title: string;
  description: string;
  icon: string;
  tone: "brand" | "sky" | "indigo" | "cyan";
}

export const features: Feature[] = [
  {
    title: "Materi Komprehensif",
    description:
      "Pelajari konsep tata letak kantor dengan bahasa yang mudah dipahami dan terstruktur.",
    icon: "BookOpen",
    tone: "brand",
  },
  {
    title: "Simulasi Visual Kantor",
    description:
      "Eksplorasi denah kantor secara interaktif. Klik tiap ruangan untuk pelajari fungsinya.",
    icon: "Building2",
    tone: "sky",
  },
  {
    title: "Drag & Drop Layout",
    description:
      "Susun layout kantor sendiri dengan grid snap dan dapatkan feedback edukatif secara langsung.",
    icon: "Move3d",
    tone: "indigo",
  },
  {
    title: "Quiz Interaktif",
    description:
      "Uji pemahaman dengan pertanyaan pilihan ganda dan dapatkan skor + feedback motivasional.",
    icon: "Trophy",
    tone: "cyan",
  },
  {
    title: "Progress Tracking",
    description:
      "Pantau kemajuan belajarmu dengan progress bar dan achievement badge.",
    icon: "Activity",
    tone: "brand",
  },
  {
    title: "Tema Light & Dark",
    description:
      "Tampilan elegan dengan dukungan dark mode yang nyaman di mata.",
    icon: "Sparkles",
    tone: "sky",
  },
];
