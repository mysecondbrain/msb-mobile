import React from "react";
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, Switch, Linking } from "react-native";
import { useTheme } from "../../src/theme";
import { allDone, loadOnboarding, saveOnboarding } from "../../src/onboarding";
import { useRouter } from "expo-router";

export default function Onboarding() {
  const t = useTheme();
  const router = useRouter();
  const [state, setState] = React.useState({ terms: false, privacy: false, aiOptIn: false });
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      const s = await loadOnboarding();
      setState(s); setLoading(false);
    })();
  }, []);

  const toggle = (k: keyof typeof state) => setState(v => ({ ...v, [k]: !v[k] }));

  const proceed = async () => {
    await saveOnboarding(state);
    router.replace("/");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: t.colors.bg }}>
      <View style={{ padding: 16, gap: 16 }}>
        <Text style={{ color: t.colors.text, fontSize: 20, fontWeight: "800" }}>Willkommen zu mybrainsafe</Text>
        <Row title="AGB akzeptieren" value={state.terms} onChange={() => toggle('terms')} />
        <Row title="Datenschutz akzeptieren" value={state.privacy} onChange={() => toggle('privacy')} />
        <Row title="KI-Features aktivieren (optional)" value={state.aiOptIn} onChange={() => toggle('aiOptIn')} />
        <Text style={{ color: t.colors.sub }}>Mit Tippen auf die Links öffnest du die Inhalte:</Text>
        <Text onPress={() => Linking.openURL("https://example.com/terms")} style={{ color: t.colors.primary }}>AGB ansehen</Text>
        <Text onPress={() => Linking.openURL("https://example.com/privacy")} style={{ color: t.colors.primary }}>Datenschutz ansehen</Text>
        <TouchableOpacity disabled={!allDone(state)} onPress={proceed} style={[s.btn, { backgroundColor: allDone(state) ? t.colors.primary : '#94a3b8' }]}>
          <Text style={s.btnT}>Los geht's</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function Row({ title, value, onChange }: { title: string; value: boolean; onChange: () => void }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent:'space-between' }}>
      <Text style={{ fontSize: 16 }}>{title}</Text>
      <Switch value={value} onValueChange={onChange} />
    </View>
  );
}

const s = StyleSheet.create({
  btn: { padding: 14, borderRadius: 12, alignItems: "center", marginTop: 8 },
  btnT: { color: "#fff", fontWeight: "700" },
});