// Shared types for the educational app

export type Tone = "brand" | "sky" | "success" | "warn" | "danger";

export interface MateriItem {
  id: string;
  title: string;
  summary: string;
  icon: string;
  body: string[];
}

export interface OfficeRoom {
  id: string;
  name: string;
  function: string;
  description: string;
  activities: string[];
  // grid coordinates for the floor plan (12-col grid)
  gridArea: string; // e.g. "1 / 1 / span 2 / span 3"
  color: "brand" | "sky" | "indigo" | "cyan" | "blue" | "teal";
  icon: string;
}

export interface DraggableBlock {
  id: string;
  label: string;
  ideal: { row: number; col: number };
  hint: string;
  icon: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface QuizResult {
  id?: string;
  score: number;
  total: number;
  correct: number;
  created_at?: string;
}

export interface UserProgress {
  id?: string;
  module: "materi" | "simulasi" | "drag-drop" | "quiz";
  completed: boolean;
  progress_percent: number;
  updated_at?: string;
}
