import { useColorScheme } from "react-native";

export function useTheme() {
  const scheme = useColorScheme();
  const dark = scheme === "dark";
  return {
    dark,
    colors: {
      bg: dark ? "#0b132b" : "#f7f7f7",
      card: dark ? "#1b2440" : "#ffffff",
      border: dark ? "#2a3358" : "#e6e6e6",
      text: dark ? "#ffffff" : "#0b132b",
      sub: dark ? "#cbd5e1" : "#334155",
      inputBg: dark ? "#141a31" : "#ffffff",
      inputBorder: dark ? "#2a3358" : "#cbd5e1",
      primary: "#2a9d8f",
      success: "#22c55e",
      danger: "#ef4444",
    },
  };
}