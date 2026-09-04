import { StyleSheet, Text, type TextStyle } from "react-native";

import { colors } from "@/theme/colors";
import { fonts } from "@/theme/typography";

export function SectionLabel({
  children,
  color = colors.label,
  style,
}: {
  children: React.ReactNode;
  color?: string;
  style?: TextStyle;
}) {
  return <Text style={[styles.label, { color }, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  label: {
    fontFamily: fonts.monoMedium,
    fontSize: 11,
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
});
