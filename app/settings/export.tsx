import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useTheme } from "../../src/theme";
import { exportNotesToJson } from "../../src/backup";

export default function Export() {
  const t = useTheme();
  const [path, setPath] = React.useState<string | null>(null);
  const [content, setContent] = React.useState<string | null>(null);

  const run = async () => {
    const { path, content } = await exportNotesToJson();
    setPath(path); setContent(content);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: t.colors.bg }}>
      <View style={{ padding: 16, gap: 12 }}>
        <TouchableOpacity onPress={run} style={[s.btn, { backgroundColor: t.colors.primary }]}>
          <Text style={s.btnT}>Als JSON exportieren</Text>
        </TouchableOpacity>
        {path && <Text style={{ color: t.colors.sub }}>Gespeichert unter: {path}</Text>}
        <ScrollView style={{ maxHeight: 280 }}>
          {content && <Text style={{ color: t.colors.text }}>{content}</Text>}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
const s = StyleSheet.create({ btn: { padding: 14, alignItems: 'center', borderRadius: 12 }, btnT: { color: '#fff', fontWeight: '700' } });