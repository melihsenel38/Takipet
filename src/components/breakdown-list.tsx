import { StyleSheet, Text, View } from "react-native";

import { colors } from "@/theme/colors";
import { fonts } from "@/theme/typography";

export interface BreakdownRow {
  name: string;
  pct: number;
  color: string;
}

export function BreakdownList({ rows }: { rows: BreakdownRow[] }) {
  return (
    <View style={{ gap: 14 }}>
      {rows.map((r, i) => (
        <View key={i}>
          <View style={styles.rowHeader}>
            <Text style={styles.name}>{r.name}</Text>
            <Text style={styles.pct}>{r.pct}%</Text>
          </View>
          <View style={styles.track}>
            <View style={[styles.fill, { width: `${r.pct}%`, backgroundColor: r.color }]} />
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  rowHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 7 },
  name: { fontFamily: fonts.sansRegular, fontSize: 13, color: colors.body },
  pct: { fontFamily: fonts.monoMedium, fontSize: 11, color: colors.label },
  track: { height: 5, borderRadius: 3, backgroundColor: colors.track, overflow: "hidden" },
  fill: { height: "100%", borderRadius: 3 },
});
