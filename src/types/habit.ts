import type { HabitColor } from "@/theme/colors";

export interface Habit {
  id: number;
  name: string;
  color: HabitColor;
  goal: string;
  time: string;
  streak: number;
  done: boolean;
  /** Mon..Sun completion flags for the current week */
  week: [number, number, number, number, number, number, number];
  /** Last 12 weeks' completion counts (0-7), oldest first */
  hist: number[];
}
