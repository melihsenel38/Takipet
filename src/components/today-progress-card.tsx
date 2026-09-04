import { StyleSheet, Text, View } from "react-native";

import { colors } from "@/theme/colors";
import { fonts } from "@/theme/typography";

export function TodayProgressCard({ done, total }: { done: number; total: number }) {
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);
  const note = pct === 100 ? "gün tamam" : `${total - done} tanesi kaldı`;

  return (
    <View style={styles.card}>
      <View style={styles.top}>
        <View>
          <Text style={styles.label}>Bugünün ilerlemesi</Text>
          <Text style={styles.count}>
            {done}
            <Text style={styles.countTotal}>/{total}</Text>
          </Text>
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <Text style={styles.pct}>{pct}%</Text>
          <Text style={styles.note}>{note}</Text>
        </View>
      </View>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${pct}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.dark,
    borderRadius: 26,
    padding: 24,
    paddingBottom: 22,
    borderCurve: "continuous",
  },
  top: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end" },
  label: {
    fontFamily: fonts.monoMedium,
    fontSize: 10,
    letterSpacing: 1.4,
    textTransform: "uppercase",
    color: colors.darkLabel,
    marginBottom: 12,
  },
  count: { fontFamily: fonts.sansLight, fontSize: 44, color: colors.darkText },
  countTotal: { fontFamily: fonts.sansLight, fontSize: 22, color: colors.darkFaint },
  pct: { fontFamily: fonts.sansMedium, fontSize: 26, color: colors.gold },
  note: { fontFamily: fonts.sansRegular, fontSize: 11, color: colors.darkMuted, marginTop: 6 },
  track: { height: 6, borderRadius: 3, backgroundColor: colors.darkTrack, marginTop: 20, overflow: "hidden" },
  fill: { height: "100%", borderRadius: 3, backgroundColor: colors.gold },
});
