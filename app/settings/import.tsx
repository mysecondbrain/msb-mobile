import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useTheme } from "../../src/theme";
import { importNotesFromJson } from "../../src/backup";

export default function Import() {
  const t = useTheme();
  const [input, setInput] = React.useState("");

  const run = async () => {
    try {
      await importNotesFromJson(input);
      Alert.alert('OK', 'Datei geprüft (Demo). Import-Logik folgt.');
    } catch (e: any) {
      Alert.alert('Fehler', String(e?.message || e));
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: t.colors.bg }}>
      <View style={{ padding: 16, gap: 12 }}>
        <TextInput
          value={input}
          onChangeText={setInput}
          multiline
          placeholder="JSON hier einfügen"
          placeholderTextColor={t.colors.sub}
          style={{ minHeight: 200, borderWidth: 1, borderRadius: 12, padding: 12, color: t.colors.text, borderColor: t.colors.inputBorder, textAlignVertical: 'top' }}
        />
        <TouchableOpacity onPress={run} style={[s.btn, { backgroundColor: t.colors.primary }]}>
          <Text style={s.btnT}>Import prüfen</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const s = StyleSheet.create({ btn: { padding: 14, alignItems: 'center', borderRadius: 12 }, btnT: { color: '#fff', fontWeight: '700' } });