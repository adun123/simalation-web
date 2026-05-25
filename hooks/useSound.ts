"use client";

import { useCallback, useRef } from "react";

/**
 * Tiny WebAudio-based sound feedback (no external assets).
 * Plays subtle UI sounds. Auto-skips on environments without AudioContext.
 */
export function useSound() {
  const ctxRef = useRef<AudioContext | null>(null);

  const ensureCtx = () => {
    if (typeof window === "undefined") return null;
    if (!ctxRef.current) {
      const C =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!C) return null;
      ctxRef.current = new C();
    }
    return ctxRef.current;
  };

  const play = useCallback(
    (type: "click" | "success" | "error" = "click") => {
      const ctx = ensureCtx();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const map = {
        click: { freq: 660, dur: 0.07, type: "triangle" as OscillatorType },
        success: { freq: 880, dur: 0.18, type: "sine" as OscillatorType },
        error: { freq: 200, dur: 0.16, type: "square" as OscillatorType },
      };
      const cfg = map[type];
      osc.type = cfg.type;
      osc.frequency.value = cfg.freq;
      gain.gain.setValueAtTime(0.0001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + cfg.dur);
      osc.connect(gain).connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + cfg.dur);
    },
    []
  );

  return { play };
}
