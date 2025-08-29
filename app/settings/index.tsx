import React from "react";
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "../../src/theme";
import { Link } from "expo-router";

function Row({ title, to }: { title: string; to: string }) {
  const t = useTheme();
  return (
    <Link href={to} asChild>
      <TouchableOpacity style={[s.row, { backgroundColor: t.colors.card, borderColor: t.colors.border }]}>
        <Text style={[s.title, { color: t.colors.text }]}>{title}</Text>
      </TouchableOpacity>
    </Link>
  );
}

export default function Settings() {
  const t = useTheme();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: t.colors.bg }}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <View style={{ gap: 12 }}>
          <Row title="Rechtliches" to="/settings/legal-view" />
          <Row title="Export" to="/settings/export" />
          <Row title="Import" to="/settings/import" />
          <Row title="Diagnostik" to="/settings/diagnostics" />
          <Row title="Zurücksetzen" to="/settings/reset" />
          <Row title="Über" to="/settings/about" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  row: { padding: 16, borderRadius: 12, borderWidth: StyleSheet.hairlineWidth },
  title: { fontSize: 16, fontWeight: "600" },
});