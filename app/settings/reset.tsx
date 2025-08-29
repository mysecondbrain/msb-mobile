import React from "react";
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useTheme } from "../../src/theme";
import { deleteAllNotes } from "../../src/db";

export default function Reset() {
  const t = useTheme();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: t.colors.bg }}>
      <View style={{ padding: 16, gap: 12 }}>
        <Text style={{ color: t.colors.text, fontWeight: "700", fontSize: 16 }}>Zurücksetzen</Text>
        <TouchableOpacity
          style={[s.btn, { backgroundColor: t.colors.danger }]}
          onPress={() => {
            Alert.alert("Alle Notizen löschen?", "Dies kann nicht rückgängig gemacht werden.", [
              { text: "Abbrechen", style: "cancel" },
              { text: "Löschen", style: "destructive", onPress: async () => { await deleteAllNotes(); Alert.alert("Erfolg", "Alle Notizen gelöscht."); } },
            ]);
          }}
        >
          <Text style={s.btnT}>Alle Notizen löschen</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  btn: { padding: 14, borderRadius: 12, alignItems: "center" },
  btnT: { color: "#fff", fontWeight: "700" },
});