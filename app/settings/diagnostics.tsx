import React from "react";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import { useTheme } from "../../src/theme";

export default function Diagnostics() {
  const t = useTheme();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: t.colors.bg }}>
      <View style={{ padding: 16, gap: 8 }}>
        <Text style={{ color: t.colors.text, fontSize: 16, fontWeight: "700" }}>Diagnostik</Text>
        <Text style={{ color: t.colors.sub }}>Einfacher Platzhalter – erweiterte Statistiken folgen.</Text>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({});