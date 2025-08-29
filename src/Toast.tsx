import React from "react";
import { Animated, StyleSheet, Text } from "react-native";

export default function Toast({ message = "", visible }: { message?: string; visible: boolean }) {
  const [opacity] = React.useState(new Animated.Value(0));

  React.useEffect(() => {
    if (visible) {
      Animated.timing(opacity, { toValue: 1, duration: 200, useNativeDriver: true }).start();
    } else {
      Animated.timing(opacity, { toValue: 0, duration: 200, useNativeDriver: true }).start();
    }
  }, [visible]);

  return (
    <Animated.View pointerEvents="none" style={[s.wrap, { opacity }] }>
      <Text style={s.text}>{message}</Text>
    </Animated.View>
  );
}

const s = StyleSheet.create({
  wrap: { position: "absolute", bottom: 32, left: 24, right: 24, backgroundColor: "rgba(0,0,0,0.85)", padding: 12, borderRadius: 10 },
  text: { color: "#fff", textAlign: "center", fontWeight: "600" },
});