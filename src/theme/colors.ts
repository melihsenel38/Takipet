// Design tokens extracted from the "Alışkanlık Takip" Claude Design canvas.
export const colors = {
  // Screen
  background: "#faf8f4",
  backgroundSoft: "#f2efe8",

  // Text
  ink: "#2b251c",
  body: "#3d3529",
  label: "#a99e8b",
  labelMuted: "#bdb2a0",
  labelFaint: "#b3a794",
  labelDim: "#c3b8a5",
  link: "#7a6a52",
  linkHover: "#3d3529",

  // Cards
  card: "#ffffff",
  cardBorder: "#ece5d8",
  cardBorderStrong: "#ddd3c0",
  track: "#f2ede3",

  // Dark hero card (today's progress)
  dark: "#2b251c",
  darkText: "#f5f1e8",
  darkLabel: "#a3987f",
  darkMuted: "#8b8170",
  darkFaint: "#7d735f",
  darkTrack: "#3f3931",

  // Accent (progress bar, streaks)
  gold: "#c9b98f",
  goldLight: "#e3d5ae",

  // Add-habit dashed button
  dashedBorder: "#d8cfbd",
  dashedBorderHover: "#b9a686",

  // Misc
  success: "#7a9a80",
  divider: "#f4efe5",
  inputBorder: "#e5ddcd",
} as const;

// Per-habit accent colors
export const habitPalette = {
  sage: { tint: "#e4ebe2", fg: "#4c6b52", solid: "#4c6b52" },
  clay: { tint: "#f2e4dd", fg: "#a4634a", solid: "#a4634a" },
  sand: { tint: "#f0e8d6", fg: "#8a7442", solid: "#8a7442" },
  slate: { tint: "#e2e6ec", fg: "#4f5f74", solid: "#4f5f74" },
  plum: { tint: "#ece2ea", fg: "#71506a", solid: "#71506a" },
} as const;

export type HabitColor = keyof typeof habitPalette;

export const heatmapShades = [
  "#f2ede3",
  "#e2dbc9",
  "#c9bd9d",
  "#a3906a",
  "#6f5f42",
] as const;
