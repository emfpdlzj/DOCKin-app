import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { theme } from "@/src/theme/theme";

type Props = React.ComponentProps<typeof TextInput> & {
  label: string;
  error?: string | null;
};

export function AppInput({ label, error, style, ...props }: Props) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        placeholderTextColor="#B0B7C3"
        {...props}
        style={[styles.input, style]}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: 8,
  },
  label: {
    fontSize: 15,
    fontWeight: "800",
    color: theme.colors.text,
  },
  input: {
    minHeight: 58,
    borderRadius: 16,
    backgroundColor: "#F4F4F4",
    paddingHorizontal: 18,
    fontSize: 16,
    color: theme.colors.text,
  },
  error: {
    color: theme.colors.danger,
    fontSize: 13,
  },
});
