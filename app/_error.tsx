import React from "react";
import { View, Text } from "react-native";

export default function ErrorScreen({ error }: { error: Error }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: 24 }}>
      <Text style={{ fontSize: 18, fontWeight: "800", marginBottom: 8 }}>Fehler</Text>
      <Text style={{ textAlign: "center" }}>{error?.message}</Text>
    </View>
  );
}