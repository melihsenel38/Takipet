import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors, habitPalette } from "@/theme/colors";
import { fonts } from "@/theme/typography";
import type { Habit } from "@/types/habit";

export function HabitCard({ habit, onPress }: { habit: Habit; onPress: () => void }) {
  const p = habitPalette[habit.color];

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && { borderColor: colors.cardBorderStrong }]}
    >
      <View style={styles.header}>
        <View style={[styles.dot, { backgroundColor: p.solid }]} />
        <Text style={styles.name}>{habit.name}</Text>
        <Text style={styles.streak}>{habit.streak}g</Text>
      </View>

      <View style={styles.weekRow}>
        {habit.week.map((v, i) => (
          <View
            key={i}
            style={[
              styles.weekDot,
              {
                backgroundColor: v ? p.tint : colors.background,
                borderColor: v ? p.solid + "33" : "#f0eade",
              },
            ]}
          />
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {habit.goal} · {habit.time}
        </Text>
        <Text style={styles.footerText}>Detay ›</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: 22,
    padding: 17,
    paddingHorizontal: 18,
    borderCurve: "continuous",
  },
  header: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 14 },
  dot: { width: 10, height: 10, borderRadius: 3 },
  name: { flex: 1, fontFamily: fonts.sansRegular, fontSize: 15, color: colors.ink, letterSpacing: -0.1 },
  streak: { fontFamily: fonts.monoMedium, fontSize: 11, color: colors.label },
  weekRow: { flexDirection: "row", gap: 5 },
  weekDot: { flex: 1, height: 26, borderRadius: 8, borderWidth: 1 },
  footer: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
  footerText: { fontFamily: fonts.sansRegular, fontSize: 11, color: colors.labelFaint },
});
