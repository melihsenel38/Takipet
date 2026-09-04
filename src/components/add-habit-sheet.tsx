import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

import { colors, habitPalette, type HabitColor } from "@/theme/colors";
import { fonts } from "@/theme/typography";

const FREQUENCIES = ["Her gün", "Hafta içi", "Haftada 3"];

export function AddHabitSheet({
  name,
  color,
  freq,
  onChangeName,
  onChangeColor,
  onChangeFreq,
  onCreate,
  onCancel,
}: {
  name: string;
  color: HabitColor;
  freq: string;
  onChangeName: (v: string) => void;
  onChangeColor: (v: HabitColor) => void;
  onChangeFreq: (v: string) => void;
  onCreate: () => void;
  onCancel: () => void;
}) {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Yeni alışkanlık</Text>

      <Text style={styles.label}>İsim</Text>
      <TextInput
        value={name}
        onChangeText={onChangeName}
        placeholder="ör. Akşam yürüyüşü"
        placeholderTextColor={colors.labelMuted}
        style={styles.input}
      />

      <Text style={styles.label}>Renk</Text>
      <View style={styles.colorRow}>
        {(Object.keys(habitPalette) as HabitColor[]).map((key) => {
          const selected = color === key;
          return (
            <Pressable
              key={key}
              onPress={() => onChangeColor(key)}
              style={[
                styles.swatch,
                { backgroundColor: habitPalette[key].solid },
                selected && styles.swatchSelected,
              ]}
            />
          );
        })}
      </View>

      <Text style={styles.label}>Sıklık</Text>
      <View style={styles.freqRow}>
        {FREQUENCIES.map((f) => {
          const selected = freq === f;
          return (
            <Pressable
              key={f}
              onPress={() => onChangeFreq(f)}
              style={[styles.freqPill, selected ? styles.freqPillOn : styles.freqPillOff]}
            >
              <Text style={[styles.freqText, { color: selected ? colors.darkText : colors.link }]}>{f}</Text>
            </Pressable>
          );
        })}
      </View>

      <Pressable onPress={onCreate} style={styles.createButton}>
        <Text style={styles.createText}>Alışkanlığı ekle</Text>
      </Pressable>
      <Pressable onPress={onCancel} style={styles.cancelButton}>
        <Text style={styles.cancelText}>Vazgeç</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: { fontFamily: fonts.sansRegular, fontSize: 21, color: colors.ink, marginBottom: 18 },
  label: {
    fontFamily: fonts.monoMedium,
    fontSize: 10,
    letterSpacing: 1.4,
    textTransform: "uppercase",
    color: colors.label,
    marginBottom: 8,
  },
  input: {
    width: "100%",
    padding: 15,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    backgroundColor: colors.card,
    fontFamily: fonts.sansRegular,
    fontSize: 15,
    color: colors.ink,
    marginBottom: 18,
  },
  colorRow: { flexDirection: "row", gap: 10, marginBottom: 18 },
  swatch: { width: 38, height: 38, borderRadius: 13, borderCurve: "continuous" },
  swatchSelected: { boxShadow: `0 0 0 2px ${colors.background}, 0 0 0 4px ${colors.ink}` },
  freqRow: { flexDirection: "row", gap: 8, marginBottom: 24 },
  freqPill: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: "center",
    borderWidth: 1,
    borderCurve: "continuous",
  },
  freqPillOn: { backgroundColor: colors.ink, borderColor: colors.ink },
  freqPillOff: { backgroundColor: colors.card, borderColor: colors.inputBorder },
  freqText: { fontFamily: fonts.sansRegular, fontSize: 13 },
  createButton: { padding: 16, borderRadius: 18, backgroundColor: colors.ink, alignItems: "center", borderCurve: "continuous" },
  createText: { fontFamily: fonts.sansMedium, fontSize: 14, color: colors.darkText },
  cancelButton: { padding: 14, alignItems: "center" },
  cancelText: { fontFamily: fonts.sansRegular, fontSize: 13, color: colors.label },
});
