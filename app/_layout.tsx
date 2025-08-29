import React from "react";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
export default function Layout() {
  const scheme = useColorScheme();
  return (
    <Stack screenOptions={{
      headerStyle: { backgroundColor: scheme === 'dark' ? '#0b132b' : '#ffffff' },
      headerTintColor: scheme === 'dark' ? '#ffffff' : '#0b132b',
      contentStyle: { backgroundColor: scheme === 'dark' ? '#0b132b' : '#f7f7f7' },
    }}>
      <Stack.Screen name="index" options={{ title: "mybrainsafe" }} />
    </Stack>
  );
}
