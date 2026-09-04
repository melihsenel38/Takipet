import { Pressable, StyleSheet, View } from "react-native";
import Animated, { FadeIn, FadeOut, SlideInDown, SlideOutDown } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors } from "@/theme/colors";

export function SheetOverlay({ onClose, children }: { onClose: () => void; children: React.ReactNode }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
      <Animated.View entering={FadeIn.duration(200)} exiting={FadeOut.duration(150)} style={StyleSheet.absoluteFill}>
        <Pressable style={[StyleSheet.absoluteFill, styles.backdrop]} onPress={onClose} />
      </Animated.View>
      <Animated.View
        entering={SlideInDown.duration(320)}
        exiting={SlideOutDown.duration(220)}
        style={[styles.sheet, { paddingBottom: Math.max(insets.bottom, 20) + 10, maxHeight: "78%" }]}
      >
        <View style={styles.grabber} />
        {children}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: { backgroundColor: "rgba(28,26,23,0.38)" },
  sheet: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.background,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: 12,
    paddingHorizontal: 24,
    borderCurve: "continuous",
  },
  grabber: { width: 38, height: 4, borderRadius: 2, backgroundColor: colors.cardBorderStrong, alignSelf: "center", marginBottom: 20 },
});
