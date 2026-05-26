import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import LayoutShell from "@/components/layout/LayoutShell";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Simulasi Interaktif Tata Letak Kantor",
    template: "%s | Simulasi Tata Letak Kantor",
  },
  description:
    "Media pembelajaran modern untuk memahami konsep tata letak kantor melalui simulasi interaktif berbasis web.",
  keywords: [
    "tata letak kantor",
    "simulasi kantor",
    "pembelajaran interaktif",
    "office layout",
    "UAS",
  ],
  authors: [{ name: "UAS Project" }],
  openGraph: {
    title: "Simulasi Interaktif Tata Letak Kantor",
    description:
      "Belajar tata letak kantor secara interaktif dengan simulasi modern.",
    type: "website",
    locale: "id_ID",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#EFF6FF" },
    { media: "(prefers-color-scheme: dark)", color: "#0F172A" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning className={inter.variable}>
      <body className="min-h-screen flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <LayoutShell>{children}</LayoutShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
