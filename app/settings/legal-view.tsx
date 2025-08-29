import React from "react";
import { SafeAreaView, ScrollView, RefreshControl, Text } from "react-native";
import { useTheme } from "../../src/theme";

const TEXT = `Platzhalter-Rechtstext. Offline-Cache folgt (hier vereinfachte Version).`;

export default function LegalView() {
  const t = useTheme();
  const [refreshing, setRefreshing] = React.useState(false);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: t.colors.bg }}>
      <ScrollView style={{ padding: 16 }} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); setTimeout(() => setRefreshing(false), 500); }} />}>
        <Text style={{ color: t.colors.text, lineHeight: 20 }}>{TEXT}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}