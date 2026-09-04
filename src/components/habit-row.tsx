import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors, habitPalette } from "@/theme/colors";
import { fonts } from "@/theme/typography";
import type { Habit } from "@/types/habit";

export function HabitRow({
  habit,
  onToggle,
  onOpenDetail,
}: {
  habit: Habit;
  onToggle: () => void;
  onOpenDetail: () => void;
}) {
  const p = habitPalette[habit.color];

  return (
    <Pressable
      onPress={onToggle}
      style={({ pressed }) => [
        styles.row,
        {
          backgroundColor: habit.done ? p.tint : colors.card,
          borderColor: habit.done ? "transparent" : colors.cardBorder,
          transform: [{ scale: pressed ? 0.985 : 1 }],
        },
      ]}
    >
      <View
        style={[
          styles.mark,
          { backgroundColor: habit.done ? p.solid : "#f5f1e8" },
        ]}
      >
        <Text style={[styles.markText, { color: habit.done ? "#fff" : colors.labelFaint }]}>
          {habit.done ? "✓" : String(habit.id).padStart(2, "0")}
        </Text>
      </View>

      <View style={styles.body}>
        <Text style={[styles.name, { color: habit.done ? p.fg : colors.ink }]}>{habit.name}</Text>
        <Text style={styles.meta}>
          {habit.time}  ·  {habit.streak} gün seri
        </Text>
      </View>

      <Pressable onPress={onOpenDetail} hitSlop={8} style={styles.chevron}>
        <Text style={styles.chevronText}>›</Text>
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    padding: 15,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderCurve: "continuous",
  },
  mark: {
    width: 40,
    height: 40,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    borderCurve: "continuous",
  },
  markText: { fontFamily: fonts.monoMedium, fontSize: 14 },
  body: { flex: 1 },
  name: { fontFamily: fonts.sansRegular, fontSize: 15, letterSpacing: -0.1 },
  meta: { fontFamily: fonts.sansRegular, fontSize: 12, color: colors.label, marginTop: 3 },
  chevron: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.03)",
  },
  chevronText: { fontFamily: fonts.sansRegular, fontSize: 16, color: colors.labelMuted },
});
