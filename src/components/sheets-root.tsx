import { AddHabitSheet } from "@/components/add-habit-sheet";
import { HabitDetailSheet } from "@/components/habit-detail-sheet";
import { SheetOverlay } from "@/components/sheet-overlay";
import { useHabits } from "@/context/habits-context";

export function SheetsRoot() {
  const {
    habits,
    sheet,
    detailId,
    closeSheet,
    toggleHabit,
    draft,
    setDraftName,
    setDraftColor,
    setDraftFreq,
    addHabit,
  } = useHabits();

  if (!sheet) return null;

  if (sheet === "detail") {
    const habit = habits.find((h) => h.id === detailId) ?? habits[0];
    return (
      <SheetOverlay onClose={closeSheet}>
        <HabitDetailSheet habit={habit} onToggle={() => toggleHabit(habit.id)} onClose={closeSheet} />
      </SheetOverlay>
    );
  }

  return (
    <SheetOverlay onClose={closeSheet}>
      <AddHabitSheet
        name={draft.name}
        color={draft.color}
        freq={draft.freq}
        onChangeName={setDraftName}
        onChangeColor={setDraftColor}
        onChangeFreq={setDraftFreq}
        onCreate={() => addHabit(draft)}
        onCancel={closeSheet}
      />
    </SheetOverlay>
  );
}
