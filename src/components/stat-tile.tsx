import { StyleSheet, Text, View } from "react-native";

import { colors } from "@/theme/colors";
import { fonts } from "@/theme/typography";

export function StatTile({
  label,
  value,
  unit,
  note,
  variant = "light",
}: {
  label: string;
  value: string | number;
  unit?: string;
  note?: string;
  variant?: "light" | "dark";
}) {
  const dark = variant === "dark";
  return (
    <View style={[styles.card, dark ? styles.dark : styles.light]}>
      <Text style={[styles.label, { color: dark ? colors.darkLabel : colors.label }]}>{label}</Text>
      <Text style={[styles.value, { color: dark ? colors.darkText : colors.ink }]}>
        {value}
        {unit ? <Text style={[styles.unit, { color: dark ? colors.darkMuted : colors.label }]}>{unit}</Text> : null}
      </Text>
      {note ? <Text style={[styles.note, { color: dark ? colors.darkMuted : colors.success }]}>{note}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { flex: 1, borderRadius: 20, padding: 16, paddingBottom: 14, borderCurve: "continuous" },
  light: { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.cardBorder },
  dark: { backgroundColor: colors.dark },
  label: { fontFamily: fonts.monoMedium, fontSize: 10, letterSpacing: 1.3, textTransform: "uppercase" },
  value: { fontFamily: fonts.sansLight, fontSize: 32, marginTop: 10 },
  unit: { fontFamily: fonts.sansLight, fontSize: 16 },
  note: { fontFamily: fonts.sansRegular, fontSize: 11, marginTop: 4 },
});
