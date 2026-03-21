import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { theme } from "@/src/theme/theme";

export function LoadingState() {
  return (
    <View style={styles.wrap}>
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    padding: 32,
    alignItems: "center",
    justifyContent: "center",
  },
});

