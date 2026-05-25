"use client";

import { motion } from "framer-motion";

/**
 * Pure-SVG animated office illustration in the brand-blue gradient palette.
 * No external assets — fast, crisp, and themeable.
 */
export default function AnimatedOffice() {
  return (
    <div className="relative w-full max-w-xl aspect-[5/4] mx-auto">
      {/* Glow halo */}
      <div className="absolute inset-0 -z-10 blur-3xl opacity-60 bg-brand-gradient rounded-full" />

      <svg viewBox="0 0 500 400" className="w-full h-full">
        <defs>
          <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="50%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#60A5FA" />
          </linearGradient>
          <linearGradient id="g2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0EA5E9" />
            <stop offset="100%" stopColor="#38BDF8" />
          </linearGradient>
          <linearGradient id="g3" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#DBEAFE" />
            <stop offset="100%" stopColor="#BFDBFE" />
          </linearGradient>
        </defs>

        {/* Floor plan base */}
        <motion.rect
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          x="40"
          y="40"
          width="420"
          height="320"
          rx="22"
          fill="url(#g3)"
          stroke="#93C5FD"
          strokeWidth="2"
        />

        {/* Grid lines */}
        {[1, 2, 3].map((i) => (
          <line
            key={`v${i}`}
            x1={40 + i * 105}
            y1="40"
            x2={40 + i * 105}
            y2="360"
            stroke="#BFDBFE"
            strokeDasharray="4 6"
            opacity="0.6"
          />
        ))}
        {[1, 2].map((i) => (
          <line
            key={`h${i}`}
            x1="40"
            y1={40 + i * 107}
            x2="460"
            y2={40 + i * 107}
            stroke="#BFDBFE"
            strokeDasharray="4 6"
            opacity="0.6"
          />
        ))}

        {/* Receptionist */}
        <motion.g
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <rect x="55" y="55" width="120" height="80" rx="12" fill="url(#g2)" />
          <text x="115" y="100" textAnchor="middle" fill="white" fontSize="13" fontWeight="700">
            Reception
          </text>
        </motion.g>

        {/* Meeting Room */}
        <motion.g
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <rect x="190" y="55" width="160" height="80" rx="12" fill="url(#g1)" />
          <text x="270" y="100" textAnchor="middle" fill="white" fontSize="13" fontWeight="700">
            Meeting Room
          </text>
        </motion.g>

        {/* Director */}
        <motion.g
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <rect x="365" y="55" width="80" height="80" rx="12" fill="#1D4ED8" />
          <text x="405" y="100" textAnchor="middle" fill="white" fontSize="11" fontWeight="700">
            Director
          </text>
        </motion.g>

        {/* HR */}
        <motion.g
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.5 }}
        >
          <rect x="55" y="150" width="100" height="90" rx="12" fill="#0EA5E9" />
          <text x="105" y="200" textAnchor="middle" fill="white" fontSize="13" fontWeight="700">
            HR
          </text>
        </motion.g>

        {/* Workspace */}
        <motion.g
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <rect x="170" y="150" width="200" height="90" rx="12" fill="url(#g1)" opacity="0.92" />
          <text x="270" y="200" textAnchor="middle" fill="white" fontSize="13" fontWeight="700">
            Workspace
          </text>
          {/* Desks */}
          {[0, 1, 2, 3].map((i) => (
            <motion.circle
              key={i}
              cx={195 + i * 50}
              cy="220"
              r="6"
              fill="white"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ delay: 0.6 + i * 0.15, duration: 2.4, repeat: Infinity }}
            />
          ))}
        </motion.g>

        {/* Finance */}
        <motion.g
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.5 }}
        >
          <rect x="385" y="150" width="60" height="90" rx="12" fill="#0891B2" />
          <text x="415" y="200" textAnchor="middle" fill="white" fontSize="11" fontWeight="700">
            Finance
          </text>
        </motion.g>

        {/* Lounge / corridor */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <rect x="55" y="255" width="390" height="90" rx="12" fill="#BFDBFE" opacity="0.7" />
          <text x="250" y="305" textAnchor="middle" fill="#1E40AF" fontSize="13" fontWeight="700">
            Lounge & Corridor
          </text>
        </motion.g>

        {/* Floating tags */}
        <motion.g
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <rect x="370" y="270" width="68" height="22" rx="11" fill="white" stroke="#3B82F6" />
          <text x="404" y="285" textAnchor="middle" fill="#1D4ED8" fontSize="10" fontWeight="700">
            +12 staff
          </text>
        </motion.g>
        <motion.g
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
        >
          <rect x="60" y="270" width="80" height="22" rx="11" fill="white" stroke="#0EA5E9" />
          <text x="100" y="285" textAnchor="middle" fill="#0369A1" fontSize="10" fontWeight="700">
            Open Plan
          </text>
        </motion.g>
      </svg>
    </div>
  );
}
