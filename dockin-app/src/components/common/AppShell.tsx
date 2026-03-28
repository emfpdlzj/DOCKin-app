import React from "react";
import { StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

type Props = {
  children: React.ReactNode;
};

export function AppShell({ children }: Props) {
  return (
    <LinearGradient colors={["#FFFFFF", "#E7F2FF"]} style={styles.background}>
      <View style={styles.glowTop} />
      <View style={styles.glowBottom} />
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  glowTop: {
    position: "absolute",
    top: 120,
    left: -40,
    width: 220,
    height: 220,
    borderRadius: 999,
    backgroundColor: "rgba(117, 176, 244, 0.10)",
  },
  glowBottom: {
    position: "absolute",
    bottom: 80,
    right: -30,
    width: 220,
    height: 220,
    borderRadius: 999,
    backgroundColor: "rgba(117, 176, 244, 0.12)",
  },
});
