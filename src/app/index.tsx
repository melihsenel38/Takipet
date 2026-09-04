import { ScrollView, StyleSheet, Text, View } from "react-native";

import { AddHabitButton } from "@/components/add-habit-button";
import { HabitRow } from "@/components/habit-row";
import { SectionLabel } from "@/components/section-label";
import { TodayProgressCard } from "@/components/today-progress-card";
import { WeekStrip } from "@/components/week-strip";
import { useHabits } from "@/context/habits-context";
import { colors } from "@/theme/colors";
import { fonts } from "@/theme/typography";
import { todayLabel } from "@/utils/date";

function greeting(hour: number) {
  if (hour < 6) return "İyi geceler";
  if (hour < 12) return "Günaydın";
  if (hour < 18) return "İyi günler";
  return "İyi akşamlar";
}

export default function HomeScreen() {
  const { habits, todayIndex, toggleHabit, openDetail, openAdd } = useHabits();
  const done = habits.filter((h) => h.done).length;

  return (
    <ScrollView
      style={styles.screen}
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={styles.content}
    >
      <View style={styles.header}>
        <View>
          <SectionLabel style={{ marginBottom: 8 }}>{todayLabel(new Date())}</SectionLabel>
          <Text style={styles.title}>
            {greeting(new Date().getHours())}, <Text style={styles.titleName}>Ada</Text>
          </Text>
        </View>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>A</Text>
        </View>
      </View>

      <WeekStrip todayIndex={todayIndex} />

      <View style={{ height: 24 }} />
      <TodayProgressCard done={done} total={habits.length} />

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Alışkanlıklar</Text>
        <SectionLabel>dokun · tamamla</SectionLabel>
      </View>

      <View style={{ gap: 10 }}>
        {habits.map((h) => (
          <HabitRow key={h.id} habit={h} onToggle={() => toggleHabit(h.id)} onOpenDetail={() => openDetail(h.id)} />
        ))}
      </View>

      <AddHabitButton onPress={openAdd} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: 22, paddingBottom: 100, gap: 0 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 22 },
  title: { fontFamily: fonts.sansLight, fontSize: 30, color: colors.ink, letterSpacing: -0.5 },
  titleName: { fontFamily: fonts.sansMedium },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#efe9dd",
    borderWidth: 1,
    borderColor: colors.cardBorder,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { fontFamily: fonts.sansMedium, fontSize: 14, color: colors.link },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginTop: 26,
    marginBottom: 14,
  },
  sectionTitle: { fontFamily: fonts.sansMedium, fontSize: 15, color: colors.ink, letterSpacing: -0.1 },
});
