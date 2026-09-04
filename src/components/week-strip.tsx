import { StyleSheet, Text, View } from "react-native";

import { colors } from "@/theme/colors";
import { fonts } from "@/theme/typography";
import { currentWeekDayNumbers, weekdayLabel } from "@/utils/date";

export function WeekStrip({ todayIndex }: { todayIndex: number }) {
  const dayNumbers = currentWeekDayNumbers(new Date());

  return (
    <View style={styles.row}>
      {dayNumbers.map((num, i) => {
        const isToday = i === todayIndex;
        const past = i < todayIndex;
        return (
          <View key={i} style={styles.col}>
            <Text style={styles.dayName}>{weekdayLabel(i)}</Text>
            <View
              style={[
                styles.pill,
                {
                  backgroundColor: isToday ? colors.ink : "transparent",
                  borderColor: isToday ? colors.ink : colors.cardBorder,
                },
              ]}
            >
              <Text
                style={[
                  styles.dayNum,
                  { color: isToday ? colors.darkText : past ? colors.body : colors.labelDim },
                ]}
              >
                {num}
              </Text>
            </View>
            <View
              style={[
                styles.dot,
                { backgroundColor: isToday ? colors.gold : past ? colors.dashedBorder : "transparent" },
              ]}
            />
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", gap: 6 },
  col: { flex: 1, alignItems: "center", gap: 8 },
  dayName: { fontFamily: fonts.monoMedium, fontSize: 10, letterSpacing: 0.6, color: colors.label },
  pill: {
    width: "100%",
    maxWidth: 38,
    aspectRatio: 1,
    borderRadius: 13,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    borderCurve: "continuous",
  },
  dayNum: { fontFamily: fonts.sansMedium, fontSize: 13 },
  dot: { width: 4, height: 4, borderRadius: 2 },
});
