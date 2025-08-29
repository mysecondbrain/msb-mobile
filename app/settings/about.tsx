import React from "react";
import { SafeAreaView, View, Text } from "react-native";
import { useTheme } from "../../src/theme";
import Logo from "../../src/Logo";

export default function About() {
  const t = useTheme();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: t.colors.bg }}>
      <View style={{ padding: 16, gap: 12, alignItems: "center" }}>
        <Logo />
        <Text style={{ color: t.colors.text, fontSize: 20, fontWeight: "800" }}>mybrainsafe</Text>
        <Text style={{ color: t.colors.sub }}>Datenschutzfreundliche Notizen – lokal zuerst.</Text>
      </View>
    </SafeAreaView>
  );
}