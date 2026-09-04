import { StyleSheet, Text, View } from "react-native";

import { colors } from "@/theme/colors";
import { fonts } from "@/theme/typography";
import { weekdayLabel } from "@/utils/date";

export function WeekBarChart({ values, todayIndex, max }: { values: number[]; todayIndex: number; max: number }) {
  return (
    <View style={styles.row}>
      {values.map((v, i) => {
        const isToday = i === todayIndex;
        const h = Math.round((18 + (v / max) * 82) * 10) / 10;
        return (
          <View key={i} style={styles.col}>
            <Text style={[styles.value, { color: isToday ? colors.ink : colors.labelMuted }]}>{v}</Text>
            <View style={styles.track}>
              <View
                style={[
                  styles.bar,
                  { height: `${h}%`, backgroundColor: isToday ? colors.ink : colors.cardBorder },
                ]}
              />
            </View>
            <Text style={[styles.label, { color: isToday ? colors.ink : colors.labelMuted }]}>
              {weekdayLabel(i)}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "flex-end", gap: 8, height: 118 },
  col: { flex: 1, alignItems: "center", gap: 8, height: "100%", justifyContent: "flex-end" },
  value: { fontFamily: fonts.monoMedium, fontSize: 10 },
  track: { width: "100%", flex: 1, justifyContent: "flex-end" },
  bar: { width: "100%", borderRadius: 8 },
  label: { fontFamily: fonts.monoMedium, fontSize: 10 },
});
