import { ScrollView, StyleSheet, Text, View } from "react-native";

import { BreakdownList } from "@/components/breakdown-list";
import { Heatmap } from "@/components/heatmap";
import { Panel } from "@/components/panel";
import { SectionLabel } from "@/components/section-label";
import { StatTile } from "@/components/stat-tile";
import { WeekBarChart } from "@/components/week-bar-chart";
import { useHabits } from "@/context/habits-context";
import { colors, habitPalette } from "@/theme/colors";
import { fonts } from "@/theme/typography";

// Demo weekly completion counts, matching the design's static sample data.
const WEEK_SAMPLE = [4, 5, 3, 5, 4, 2];

export default function StatsScreen() {
  const { habits, todayIndex } = useHabits();
  const total = habits.length;
  const done = habits.filter((h) => h.done).length;

  const bestStreakHabit = habits.reduce((a, b) => (b.streak > a.streak ? b : a), habits[0]);
  const weekBars = [...WEEK_SAMPLE.slice(0, todayIndex), done, ...WEEK_SAMPLE.slice(todayIndex)].slice(0, 7);

  // Demo per-habit completion percentages, matching the design's sample data.
  const samplePct = [93, 71, 97, 64, 78];
  const breakdown = habits.map((h, i) => ({
    name: h.name,
    pct: samplePct[i % samplePct.length],
    color: habitPalette[h.color].solid,
  }));

  return (
    <ScrollView
      style={styles.screen}
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={styles.content}
    >
      <SectionLabel style={{ marginBottom: 8 }}>Son 30 gün</SectionLabel>
      <Text style={styles.title}>Analitikler</Text>

      <View style={styles.tileRow}>
        <StatTile label="Tutarlılık" value={82} unit="%" note="↑ geçen aya göre +8" />
        <StatTile label="En uzun seri" value={bestStreakHabit.streak} unit=" gün" note={bestStreakHabit.name} variant="dark" />
      </View>

      <Panel style={{ marginTop: 12 }}>
        <View style={styles.panelHeader}>
          <Text style={styles.panelTitle}>Haftalık tamamlama</Text>
          <Text style={styles.panelHint}>/ {total} alışkanlık</Text>
        </View>
        <WeekBarChart values={weekBars} todayIndex={todayIndex} max={total} />
      </Panel>

      <Panel style={{ marginTop: 12 }}>
        <Text style={styles.panelTitle}>Yıl ısı haritası</Text>
        <Text style={styles.panelSub}>Her kare bir gün · koyu = daha çok tamamlanan</Text>
        <View style={{ marginTop: 16 }}>
          <Heatmap />
        </View>
      </Panel>

      <Panel style={{ marginTop: 12 }}>
        <Text style={[styles.panelTitle, { marginBottom: 16 }]}>Alışkanlık kırılımı</Text>
        <BreakdownList rows={breakdown} />
      </Panel>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: 22, paddingBottom: 100 },
  title: { fontFamily: fonts.sansLight, fontSize: 30, color: colors.ink, letterSpacing: -0.5, marginBottom: 22 },
  tileRow: { flexDirection: "row", gap: 10 },
  panelHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "baseline", marginBottom: 16 },
  panelTitle: { fontFamily: fonts.sansRegular, fontSize: 14, color: colors.ink },
  panelHint: { fontFamily: fonts.monoMedium, fontSize: 10, color: colors.label },
  panelSub: { fontFamily: fonts.sansRegular, fontSize: 11, color: colors.label, marginTop: 4 },
});
