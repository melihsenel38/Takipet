import React, { createContext, use, useCallback, useMemo, useState } from "react";

import type { HabitColor } from "@/theme/colors";
import type { Habit } from "@/types/habit";
import { mondayIndex } from "@/utils/date";

const today = mondayIndex(new Date());

function seedHabits(): Habit[] {
  const base: (Omit<Habit, "week"> & { week: number[] })[] = [
    { id: 1, name: "Sabah meditasyonu", color: "sage", goal: "Her gün", time: "07:00", streak: 12, done: true, week: [1, 1, 1, 1, 1, 1, 0], hist: [4, 5, 6, 5, 7, 6, 7, 6, 5, 7, 7, 6] },
    { id: 2, name: "5.000 adım", color: "clay", goal: "Her gün", time: "18:30", streak: 5, done: false, week: [1, 1, 0, 1, 1, 0, 0], hist: [3, 4, 4, 5, 4, 6, 5, 6, 6, 5, 6, 7] },
    { id: 3, name: "20 sayfa okuma", color: "sand", goal: "Her gün", time: "22:00", streak: 23, done: true, week: [1, 1, 1, 1, 1, 1, 1], hist: [6, 6, 7, 7, 7, 6, 7, 7, 7, 7, 6, 7] },
    { id: 4, name: "2 litre su", color: "slate", goal: "Her gün", time: "Gün boyu", streak: 3, done: false, week: [1, 0, 1, 1, 0, 1, 0], hist: [3, 3, 4, 4, 5, 4, 5, 5, 4, 5, 5, 6] },
    { id: 5, name: "Ekransız akşam", color: "plum", goal: "Hafta içi", time: "21:30", streak: 8, done: false, week: [0, 1, 1, 1, 1, 0, 0], hist: [2, 3, 3, 4, 4, 5, 4, 5, 5, 6, 5, 6] },
  ];
  return base.map((h) => ({
    ...h,
    week: h.week.map((v, i) => (i === today ? (h.done ? 1 : 0) : v)) as Habit["week"],
  }));
}

export type SheetKind = "detail" | "add" | null;

interface Draft {
  name: string;
  color: HabitColor;
  freq: string;
}

interface HabitsContextValue {
  habits: Habit[];
  todayIndex: number;
  toggleHabit: (id: number) => void;
  addHabit: (draft: Draft) => void;

  sheet: SheetKind;
  detailId: number | null;
  openDetail: (id: number) => void;
  openAdd: () => void;
  closeSheet: () => void;

  draft: Draft;
  setDraftName: (name: string) => void;
  setDraftColor: (color: HabitColor) => void;
  setDraftFreq: (freq: string) => void;
}

const HabitsContext = createContext<HabitsContextValue | null>(null);

const DEFAULT_DRAFT: Draft = { name: "", color: "sage", freq: "Her gün" };

export function HabitsProvider({ children }: { children: React.ReactNode }) {
  const [habits, setHabits] = useState<Habit[]>(seedHabits);
  const [sheet, setSheet] = useState<SheetKind>(null);
  const [detailId, setDetailId] = useState<number | null>(null);
  const [draft, setDraft] = useState<Draft>(DEFAULT_DRAFT);

  const toggleHabit = useCallback((id: number) => {
    setHabits((list) =>
      list.map((h) => {
        if (h.id !== id) return h;
        const done = !h.done;
        return {
          ...h,
          done,
          streak: done ? h.streak + 1 : Math.max(0, h.streak - 1),
          week: h.week.map((v, i) => (i === today ? (done ? 1 : 0) : v)) as Habit["week"],
        };
      })
    );
  }, []);

  const addHabit = useCallback((next: Draft) => {
    setHabits((list) => [
      ...list,
      {
        id: Date.now(),
        name: next.name.trim() || "Yeni alışkanlık",
        color: next.color,
        goal: next.freq,
        time: "09:00",
        streak: 0,
        done: false,
        week: [0, 0, 0, 0, 0, 0, 0],
        hist: new Array(12).fill(0),
      },
    ]);
    setSheet(null);
    setDraft(DEFAULT_DRAFT);
  }, []);

  const openDetail = useCallback((id: number) => {
    setDetailId(id);
    setSheet("detail");
  }, []);
  const openAdd = useCallback(() => {
    setDraft(DEFAULT_DRAFT);
    setSheet("add");
  }, []);
  const closeSheet = useCallback(() => setSheet(null), []);

  const setDraftName = useCallback((name: string) => setDraft((d) => ({ ...d, name })), []);
  const setDraftColor = useCallback((color: HabitColor) => setDraft((d) => ({ ...d, color })), []);
  const setDraftFreq = useCallback((freq: string) => setDraft((d) => ({ ...d, freq })), []);

  const value = useMemo<HabitsContextValue>(
    () => ({
      habits,
      todayIndex: today,
      toggleHabit,
      addHabit,
      sheet,
      detailId,
      openDetail,
      openAdd,
      closeSheet,
      draft,
      setDraftName,
      setDraftColor,
      setDraftFreq,
    }),
    [habits, sheet, detailId, draft, toggleHabit, addHabit, openDetail, openAdd, closeSheet, setDraftName, setDraftColor, setDraftFreq]
  );

  return <HabitsContext value={value}>{children}</HabitsContext>;
}

export function useHabits() {
  const ctx = use(HabitsContext);
  if (!ctx) throw new Error("useHabits must be used within a HabitsProvider");
  return ctx;
}
