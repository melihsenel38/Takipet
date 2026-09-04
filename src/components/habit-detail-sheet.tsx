import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { colors, habitPalette } from "@/theme/colors";
import { fonts } from "@/theme/typography";
import type { Habit } from "@/types/habit";

export function HabitDetailSheet({ habit, onToggle, onClose }: { habit: Habit; onToggle: () => void; onClose: () => void }) {
  const p = habitPalette[habit.color];
  const thisWeek = habit.week.filter(Boolean).length;
  const ratio = Math.round((habit.hist.reduce((a, b) => a + b, 0) / (habit.hist.length * 7)) * 100);
  const maxHist = Math.max(1, ...habit.hist);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={[styles.dot, { backgroundColor: p.solid }]} />
        <Text style={styles.name}>{habit.name}</Text>
      </View>

      <View style={styles.statsRow}>
        <Stat value={habit.streak} label="Seri" />
        <Stat value={`${thisWeek}/7`} label="Bu hafta" />
        <Stat value={`${ratio}%`} label="Oran" />
      </View>

      <Text style={styles.trendLabel}>12 haftalık eğilim</Text>
      <View style={styles.trendRow}>
        {habit.hist.map((v, i) => (
          <View
            key={i}
            style={[
              styles.trendBar,
              {
                height: `${12 + (v / maxHist) * 88}%`,
                backgroundColor: i === habit.hist.length - 1 ? p.solid : p.tint,
              },
            ]}
          />
        ))}
      </View>

      <Pressable
        onPress={onToggle}
        style={[styles.actionButton, { backgroundColor: habit.done ? colors.track : p.solid }]}
      >
        <Text style={[styles.actionText, { color: habit.done ? colors.link : "#fff" }]}>
          {habit.done ? "Bugünü geri al" : "Bugün için tamamla"}
        </Text>
      </Pressable>
      <Pressable onPress={onClose} style={styles.closeButton}>
        <Text style={styles.closeText}>Kapat</Text>
      </Pressable>
    </ScrollView>
  );
}

function Stat({ value, label }: { value: string | number; label: string }) {
  return (
    <View style={styles.statTile}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 20 },
  dot: { width: 12, height: 12, borderRadius: 4 },
  name: { flex: 1, fontFamily: fonts.sansRegular, fontSize: 21, color: colors.ink, letterSpacing: -0.1 },
  statsRow: { flexDirection: "row", gap: 8, marginBottom: 20 },
  statTile: {
    flex: 1,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: 16,
    padding: 13,
    paddingHorizontal: 12,
    alignItems: "center",
    borderCurve: "continuous",
  },
  statValue: { fontFamily: fonts.sansLight, fontSize: 22, color: colors.ink },
  statLabel: {
    fontFamily: fonts.monoMedium,
    fontSize: 9,
    letterSpacing: 1,
    textTransform: "uppercase",
    color: colors.label,
    marginTop: 7,
  },
  trendLabel: {
    fontFamily: fonts.monoMedium,
    fontSize: 10,
    letterSpacing: 1.4,
    textTransform: "uppercase",
    color: colors.label,
    marginBottom: 12,
  },
  trendRow: { flexDirection: "row", alignItems: "flex-end", gap: 5, height: 74, marginBottom: 22 },
  trendBar: { flex: 1, borderRadius: 5 },
  actionButton: { padding: 16, borderRadius: 18, alignItems: "center", borderCurve: "continuous" },
  actionText: { fontFamily: fonts.sansMedium, fontSize: 14 },
  closeButton: { padding: 14, alignItems: "center" },
  closeText: { fontFamily: fonts.sansRegular, fontSize: 13, color: colors.label },
});
