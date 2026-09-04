import { StyleSheet, View } from "react-native";

import { heatmapShades } from "@/theme/colors";

const COLUMNS = 18;

export function Heatmap({ days = 90 }: { days?: number }) {
  const cells = Array.from({ length: days }, (_, i) => {
    const lv = ((i * 37) % 11) / 10;
    return heatmapShades[Math.min(4, Math.floor(lv * 5))];
  });

  const rows: string[][] = [];
  for (let i = 0; i < cells.length; i += COLUMNS) {
    rows.push(cells.slice(i, i + COLUMNS));
  }

  return (
    <View style={{ gap: 4 }}>
      {rows.map((row, r) => (
        <View key={r} style={styles.row}>
          {row.map((bg, i) => (
            <View key={i} style={[styles.cell, { backgroundColor: bg }]} />
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", gap: 4 },
  cell: { flex: 1, aspectRatio: 1, borderRadius: 3 },
});
