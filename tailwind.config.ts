import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#EFF6FF",
          100: "#DBEAFE",
          200: "#BFDBFE",
          300: "#93C5FD",
          400: "#60A5FA",
          500: "#3B82F6",
          600: "#2563EB",
          700: "#1D4ED8",
          800: "#1E40AF",
          900: "#1E3A8A",
        },
        sky: {
          400: "#38BDF8",
          500: "#0EA5E9",
        },
        ink: {
          900: "#0F172A",
          800: "#111827",
          700: "#1E293B",
        },
      },
      backgroundImage: {
        "brand-gradient":
          "linear-gradient(135deg, #2563EB 0%, #3B82F6 50%, #60A5FA 100%)",
        "sky-gradient":
          "linear-gradient(135deg, #0EA5E9 0%, #38BDF8 100%)",
        "soft-light":
          "linear-gradient(180deg, #EFF6FF 0%, #FFFFFF 60%, #DBEAFE 100%)",
        "soft-dark":
          "linear-gradient(180deg, #0F172A 0%, #111827 60%, #1E293B 100%)",
      },
      boxShadow: {
        glass: "0 8px 32px rgba(37, 99, 235, 0.12)",
        "glass-lg": "0 20px 60px rgba(37, 99, 235, 0.18)",
        glow: "0 0 40px rgba(59, 130, 246, 0.45)",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "pulse-soft": "pulseSoft 3s ease-in-out infinite",
        "gradient": "gradient 8s ease infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.8" },
          "50%": { opacity: "1" },
        },
        gradient: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
