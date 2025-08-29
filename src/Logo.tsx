import React from "react";
import Svg, { Path, Circle } from "react-native-svg";

export default function Logo({ size = 72 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Circle cx="50" cy="50" r="48" fill="#2a9d8f" opacity="0.15" />
      <Path d="M20 55 C30 35, 70 35, 80 55" stroke="#2a9d8f" strokeWidth="8" fill="none" strokeLinecap="round" />
      <Path d="M35 60 L50 75 L65 60" stroke="#2a9d8f" strokeWidth="8" fill="none" strokeLinecap="round" />
    </Svg>
  );
}