import React from "react";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";
export default function Home() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={s.c}>
        <Text style={s.title}>mybrainsafe</Text>
        <Text style={s.sub}>Router aktiv. Nächster Schritt: Features & Automatisierung.</Text>
      </View>
    </SafeAreaView>
  );
}
const s = StyleSheet.create({ c: { flex: 1, alignItems: "center", justifyContent: "center", padding: 24 }, title: { fontSize: 28, fontWeight: "700", marginBottom: 8 }, sub: { fontSize: 14, opacity: 0.7, textAlign: "center" } });
