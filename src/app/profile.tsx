import { useState } from "react";
import { ScrollView, StyleSheet, Switch, Text, View } from "react-native";

import { Panel } from "@/components/panel";
import { SectionLabel } from "@/components/section-label";
import { useHabits } from "@/context/habits-context";
import { colors } from "@/theme/colors";
import { fonts } from "@/theme/typography";

const INITIAL_SETTINGS = [
  { key: "reminder", label: "Günlük hatırlatıcı", on: true },
  { key: "weekly", label: "Haftalık özet", on: true },
  { key: "dark", label: "Koyu tema", on: false },
  { key: "streak", label: "Seri koruma", on: true },
];

export default function ProfileScreen() {
  const { habits } = useHabits();
  const [settings, setSettings] = useState(INITIAL_SETTINGS);
  const bestStreak = Math.max(...habits.map((h) => h.streak));

  const toggleSetting = (key: string) =>
    setSettings((list) => list.map((s) => (s.key === key ? { ...s, on: !s.on } : s)));

  return (
    <ScrollView
      style={styles.screen}
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={styles.content}
    >
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>A</Text>
        </View>
        <View>
          <Text style={styles.name}>Ada Yılmaz</Text>
          <Text style={styles.since}>128 gündür buradasın</Text>
        </View>
      </View>

      <View style={styles.statsRow}>
        <ProfileStat value={128} label="Toplam gün" />
        <ProfileStat value={bestStreak} label="En iyi seri" />
        <ProfileStat value="82%" label="Tutarlılık" />
      </View>

      <SectionLabel style={{ marginBottom: 10 }}>Ayarlar</SectionLabel>
      <Panel style={{ padding: 0, overflow: "hidden" }}>
        {settings.map((s, i) => (
          <View key={s.key} style={[styles.settingRow, i < settings.length - 1 && styles.settingDivider]}>
            <Text style={styles.settingLabel}>{s.label}</Text>
            <Switch
              value={s.on}
              onValueChange={() => toggleSetting(s.key)}
              trackColor={{ false: "#e0d8c8", true: colors.ink }}
              thumbColor="#fff"
            />
          </View>
        ))}
        <View style={styles.settingRow}>
          <Text style={[styles.settingLabel, { color: colors.labelFaint }]}>Verileri dışa aktar</Text>
        </View>
      </Panel>
    </ScrollView>
  );
}

function ProfileStat({ value, label }: { value: string | number; label: string }) {
  return (
    <View style={styles.statTile}>
      <Text style={styles.statValue}>{value}</Text>
      <SectionLabel style={{ fontSize: 9, marginTop: 8 }}>{label}</SectionLabel>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: 22, paddingBottom: 100 },
  header: { flexDirection: "row", alignItems: "center", gap: 14, marginBottom: 24 },
  avatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "#efe9dd",
    borderWidth: 1,
    borderColor: colors.cardBorder,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { fontFamily: fonts.sansRegular, fontSize: 20, color: colors.link },
  name: { fontFamily: fonts.sansRegular, fontSize: 20, color: colors.ink },
  since: { fontFamily: fonts.sansRegular, fontSize: 12, color: colors.label, marginTop: 3 },
  statsRow: { flexDirection: "row", gap: 8, marginBottom: 22 },
  statTile: {
    flex: 1,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: 18,
    padding: 14,
    paddingHorizontal: 12,
    alignItems: "center",
    borderCurve: "continuous",
  },
  statValue: { fontFamily: fonts.sansLight, fontSize: 24, color: colors.ink },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 16,
    paddingHorizontal: 18,
  },
  settingDivider: { borderBottomWidth: 1, borderBottomColor: colors.divider },
  settingLabel: { flex: 1, fontFamily: fonts.sansRegular, fontSize: 14, color: colors.body },
});
