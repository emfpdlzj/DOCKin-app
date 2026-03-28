import React from "react";
import { StyleSheet, View, type ViewStyle } from "react-native";
import { theme } from "@/src/theme/theme";

type Props = {
  children: React.ReactNode;
  style?: ViewStyle;
};

export function AppCard({ children, style }: Props) {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: 22,
    padding: theme.spacing.lg,
    ...theme.shadow.card,
  },
});
