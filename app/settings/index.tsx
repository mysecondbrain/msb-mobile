import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { useTheme } from "../../src/theme";
import { Ionicons } from "@expo/vector-icons";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  const t = useTheme();
  return (
    <View style={{ marginBottom: 24 }}>
      <Text style={[s.sectionTitle, { color: t.colors.sub }]}>{title}</Text>
      <View style={{ gap: 10 }}>{children}</View>
    </View>
  );
}

function Row({ title, to, icon }: { title: string; to: string; icon: keyof typeof Ionicons.glyphMap }) {
  const t = useTheme();
  return (
    <Link href={to} asChild>
      <TouchableOpacity
        accessibilityRole="button"
        style={[s.row, { backgroundColor: t.colors.card, borderColor: t.colors.border }]}
        activeOpacity={0.7}
      >
        <View style={s.rowLeft}>
          <Ionicons name={icon} size={20} color={t.colors.sub} style={{ marginRight: 12 }} />
          <Text style={[s.title, { color: t.colors.text }]}>{title}</Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color={t.colors.sub} />
      </TouchableOpacity>
    </Link>
  );
}

export default function Settings() {
  const t = useTheme();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: t.colors.bg }}>
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 32 }}>
        <Section title="Daten & Backup">
          <Row title="Export" to="/settings/export" icon="download-outline" />
          <Row title="Import" to="/settings/import" icon="upload-outline" />
          <Row title="Zurücksetzen" to="/settings/reset" icon="trash-outline" />
        </Section>
        <Section title="App & Info">
          <Row title="Rechtliches" to="/settings/legal-view" icon="document-text-outline" />
          <Row title="Diagnostik" to="/settings/diagnostics" icon="speedometer-outline" />
          <Row title="Über" to="/settings/about" icon="information-circle-outline" />
        </Section>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  sectionTitle: { fontSize: 13, fontWeight: "700", textTransform: 'uppercase', letterSpacing: 0.4, marginBottom: 8 },
  row: {
    minHeight: 52,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  rowLeft: { flexDirection: 'row', alignItems: 'center', flexShrink: 1 },
  title: { fontSize: 16, fontWeight: "600" },
});