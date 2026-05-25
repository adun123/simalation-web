import {
  Activity,
  BookOpen,
  Building2,
  ConciergeBell,
  Crown,
  GraduationCap,
  Laptop2,
  LayoutGrid,
  Lightbulb,
  Move3d,
  Network,
  Presentation,
  Sparkles,
  Square,
  Target,
  Trophy,
  Users,
  Wallet,
} from "lucide-react";
import type { ComponentType } from "react";

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  Activity,
  BookOpen,
  Building2,
  ConciergeBell,
  Crown,
  GraduationCap,
  Laptop2,
  LayoutGrid,
  Lightbulb,
  Move3d,
  Network,
  Presentation,
  Sparkles,
  Square,
  Target,
  Trophy,
  Users,
  Wallet,
};

export function getIcon(name: string): ComponentType<{ className?: string }> {
  return iconMap[name] ?? Building2;
}
