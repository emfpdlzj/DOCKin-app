import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { theme } from "@/src/theme/theme";

export function EmptyState({ title = "표시할 데이터가 없습니다." }: { title?: string }) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    padding: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: theme.colors.subText,
    fontSize: 15,
  },
});

