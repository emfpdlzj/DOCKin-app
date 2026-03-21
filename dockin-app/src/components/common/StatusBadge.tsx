import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { theme } from "@/src/theme/theme";

type Props = {
  label: string;
  tone?: "blue" | "green" | "orange" | "red" | "gray";
};

export function StatusBadge({ label, tone = "blue" }: Props) {
  return (
    <View style={[styles.badge, styles[`${tone}Bg`]]}>
      <Text style={[styles.text, styles[`${tone}Text`]]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: theme.radius.pill,
    alignSelf: "flex-start",
  },
  text: {
    fontSize: 12,
    fontWeight: "700",
  },
  blueBg: { backgroundColor: "#E1EEFF" },
  greenBg: { backgroundColor: "#DDF8E8" },
  orangeBg: { backgroundColor: "#FFF0D8" },
  redBg: { backgroundColor: "#FFE1E1" },
  grayBg: { backgroundColor: "#ECEEF1" },
  blueText: { color: theme.colors.primary },
  greenText: { color: theme.colors.success },
  orangeText: { color: theme.colors.accent },
  redText: { color: theme.colors.danger },
  grayText: { color: theme.colors.subText },
});

