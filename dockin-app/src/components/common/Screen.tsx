import React from "react";
import { ScrollView, StyleSheet, View, type ScrollViewProps, type ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "@/src/theme/theme";
import { AppShell } from "@/src/components/common/AppShell";

type Props = ScrollViewProps & {
  children: React.ReactNode;
  scrollable?: boolean;
  contentStyle?: ViewStyle;
  useGradient?: boolean;
};

export function Screen({ children, scrollable = true, contentStyle, useGradient = false, ...props }: Props) {
  const body = scrollable ? (
    <ScrollView
      {...props}
      contentContainerStyle={[styles.content, contentStyle]}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  ) : (
    <View style={[styles.content, contentStyle]}>{children}</View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      {useGradient ? <AppShell>{body}</AppShell> : body}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.md,
    gap: theme.spacing.md,
    paddingBottom: 32,
  },
});
