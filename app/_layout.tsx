import React from "react";
import { Stack, Redirect } from "expo-router";
import { useColorScheme, ActivityIndicator, View } from "react-native";
import ErrorBoundary from "../src/ErrorBoundary";
import { allDone, loadOnboarding } from "../src/onboarding";

export default function Layout() {
  const scheme = useColorScheme();
  const [ready, setReady] = React.useState(false);
  const [done, setDone] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const s = await loadOnboarding();
      setDone(allDone(s));
      setReady(true);
    })();
  }, []);

  if (!ready) {
    return (
      <View style={{ flex:1, alignItems:'center', justifyContent:'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  if (!done) return <Redirect href="/onboarding" />;

  return (
    <ErrorBoundary>
      <Stack screenOptions={{
        headerStyle: { backgroundColor: scheme === 'dark' ? '#0b132b' : '#ffffff' },
        headerTintColor: scheme === 'dark' ? '#ffffff' : '#0b132b',
        contentStyle: { backgroundColor: scheme === 'dark' ? '#0b132b' : '#f7f7f7' },
      }}>
        <Stack.Screen name="index" options={{ title: "mybrainsafe" }} />
      </Stack>
    </ErrorBoundary>
  );
}