import { StyleSheet, View, type ViewStyle } from "react-native";

import { colors } from "@/theme/colors";

export function Panel({ children, style }: { children: React.ReactNode; style?: ViewStyle }) {
  return <View style={[styles.panel, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  panel: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: 22,
    padding: 18,
    borderCurve: "continuous",
  },
});
