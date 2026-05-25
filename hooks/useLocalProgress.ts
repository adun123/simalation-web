"use client";

import { useEffect, useState, useCallback } from "react";

const KEY = "tataletak.progress.v1";

export type ProgressMap = Record<string, number>; // module -> percent

export function useLocalProgress() {
  const [progress, setProgress] = useState<ProgressMap>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setProgress(JSON.parse(raw));
    } catch {}
    setLoaded(true);
  }, []);

  const update = useCallback((module: string, percent: number) => {
    setProgress((prev) => {
      const next = { ...prev, [module]: Math.max(prev[module] ?? 0, percent) };
      try {
        localStorage.setItem(KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  const overall = Object.values(progress).length
    ? Math.round(
        Object.values(progress).reduce((a, b) => a + b, 0) /
          Math.max(1, Object.values(progress).length)
      )
    : 0;

  return { progress, update, overall, loaded };
}
