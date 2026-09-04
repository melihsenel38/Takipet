import { ScrollView, StyleSheet, Text, View } from "react-native";

import { AddHabitButton } from "@/components/add-habit-button";
import { HabitCard } from "@/components/habit-card";
import { SectionLabel } from "@/components/section-label";
import { useHabits } from "@/context/habits-context";
import { colors } from "@/theme/colors";
import { fonts } from "@/theme/typography";

export default function HabitsScreen() {
  const { habits, openDetail, openAdd } = useHabits();

  return (
    <ScrollView
      style={styles.screen}
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={styles.content}
    >
      <SectionLabel style={{ marginBottom: 8 }}>{habits.length} aktif</SectionLabel>
      <Text style={styles.title}>Alışkanlıklarım</Text>

      <View style={{ gap: 10 }}>
        {habits.map((h) => (
          <HabitCard key={h.id} habit={h} onPress={() => openDetail(h.id)} />
        ))}
      </View>

      <AddHabitButton label="+ Yeni alışkanlık ekle" onPress={openAdd} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: 22, paddingBottom: 100 },
  title: { fontFamily: fonts.sansLight, fontSize: 30, color: colors.ink, letterSpacing: -0.5, marginBottom: 20 },
});
