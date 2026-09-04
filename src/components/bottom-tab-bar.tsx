import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors } from "@/theme/colors";
import { fonts } from "@/theme/typography";

export const TABS = [
  { name: "index", href: "/", glyph: "◍", label: "Bugün" },
  { name: "stats", href: "/stats", glyph: "◫", label: "Analitik" },
  { name: "habits", href: "/habits", glyph: "≡", label: "Alışkanlık" },
  { name: "profile", href: "/profile", glyph: "◐", label: "Profil" },
] as const;

export function TabButton({
  glyph,
  label,
  isFocused,
  ...props
}: {
  glyph: string;
  label: string;
  isFocused?: boolean;
  [key: string]: any;
}) {
  const color = isFocused ? colors.ink : colors.labelMuted;
  return (
    <Pressable {...props} style={tabBarStyles.tab}>
      <Text style={[tabBarStyles.glyph, { color }]}>{glyph}</Text>
      <Text style={[tabBarStyles.label, { color }]}>{label}</Text>
      <View style={[tabBarStyles.indicator, { backgroundColor: isFocused ? colors.gold : "transparent" }]} />
    </Pressable>
  );
}

export const tabBarStyles = StyleSheet.create({
  bar: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "rgba(250,248,244,0.93)",
    borderTopWidth: 1,
    borderTopColor: colors.cardBorder,
    paddingTop: 12,
    paddingHorizontal: 14,
  },
  tab: { flex: 1, alignItems: "center", gap: 7, paddingVertical: 6 },
  glyph: { fontFamily: fonts.monoMedium, fontSize: 15 },
  label: { fontFamily: fonts.sansMedium, fontSize: 10, letterSpacing: 0.4 },
  indicator: { width: 16, height: 2, borderRadius: 2 },
});
