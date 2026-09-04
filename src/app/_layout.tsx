import { DMMono_400Regular, DMMono_500Medium } from "@expo-google-fonts/dm-mono";
import {
  DMSans_300Light,
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_700Bold,
} from "@expo-google-fonts/dm-sans";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { Tabs, TabList, TabSlot, TabTrigger } from "expo-router/ui";
import { StyleSheet, View } from "react-native";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";

import { TABS, TabButton, tabBarStyles } from "@/components/bottom-tab-bar";
import { SheetsRoot } from "@/components/sheets-root";
import { HabitsProvider } from "@/context/habits-context";
import { colors } from "@/theme/colors";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    DMSans_300Light,
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
    DMMono_400Regular,
    DMMono_500Medium,
  });

  if (!fontsLoaded) {
    return <View style={styles.loading} />;
  }

  return (
    <SafeAreaProvider>
      <HabitsProvider>
        <View style={styles.root}>
          <AppTabs />
          <SheetsRoot />
        </View>
        <StatusBar style="dark" />
      </HabitsProvider>
    </SafeAreaProvider>
  );
}

function AppTabs() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs style={styles.root}>
      <TabSlot />
      <TabList style={[tabBarStyles.bar, { paddingBottom: Math.max(insets.bottom, 12) }]}>
        {TABS.map((tab) => (
          <TabTrigger key={tab.name} name={tab.name} href={tab.href} asChild>
            <TabButton glyph={tab.glyph} label={tab.label} />
          </TabTrigger>
        ))}
      </TabList>
    </Tabs>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  loading: { flex: 1, backgroundColor: colors.background },
});
