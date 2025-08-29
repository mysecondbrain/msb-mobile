import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default class ErrorBoundary extends React.Component<React.PropsWithChildren, { error?: Error }> {
  constructor(props: any) {
    super(props);
    this.state = { error: undefined };
  }
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  componentDidCatch(error: Error, info: any) {
    console.warn("ErrorBoundary caught", error, info);
  }
  render() {
    if (this.state.error) {
      return (
        <View style={s.wrap}>
          <Text style={s.title}>Unerwarteter Fehler</Text>
          <Text style={s.msg}>{this.state.error.message}</Text>
          <Text style={s.sub}>Bitte App neu starten.</Text>
        </View>
      );
    }
    return this.props.children as any;
  }
}

const s = StyleSheet.create({
  wrap: { flex: 1, alignItems: "center", justifyContent: "center", padding: 24 },
  title: { fontSize: 18, fontWeight: "800", marginBottom: 8 },
  msg: { textAlign: "center", marginBottom: 6 },
  sub: { opacity: 0.7 },
});