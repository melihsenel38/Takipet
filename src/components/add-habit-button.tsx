import { Pressable, StyleSheet, Text } from "react-native";

import { colors } from "@/theme/colors";
import { fonts } from "@/theme/typography";

export function AddHabitButton({ label = "+ Yeni alışkanlık", onPress }: { label?: string; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    >
      <Text style={styles.text}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 12,
    padding: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: colors.dashedBorder,
    alignItems: "center",
    borderCurve: "continuous",
  },
  pressed: { borderColor: colors.dashedBorderHover },
  text: { fontFamily: fonts.sansMedium, fontSize: 13, color: colors.link },
});
